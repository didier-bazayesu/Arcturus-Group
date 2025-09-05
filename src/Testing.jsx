import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Papa from "papaparse";

export default function OccupationTree() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [treeData, setTreeData] = useState(null);
    const [occupationGroups, setOccupationGroups] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [hierarchy, setHierarchy] = useState([]);

    const svgRef = useRef();

    const loadCSV = async (filename) => {
        try {
            const res = await fetch(filename);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const text = await res.text();
            return new Promise((resolve, reject) => {
                Papa.parse(text, {
                    header: true,
                    skipEmptyLines: true,
                    dynamicTyping: true,
                    complete: (results) => resolve(results.data),
                    error: (err) => reject(err),
                });
            });
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    useEffect(() => {
        const loadAll = async () => {
            try {
                setLoading(true);
                const [groupsData, occupationsData, skillsData, hierarchyData] = await Promise.all([
                    loadCSV("/occupation_groups.csv"),
                    loadCSV("/occupations.csv"),
                    loadCSV("/skills.csv"),
                    loadCSV("/occupation_hierarchy.csv"),
                ]);

                setOccupationGroups(groupsData);
                setOccupations(occupationsData);
                setSkills(skillsData);
                setHierarchy(hierarchyData);

                // Create root node
                const root = { name: "Occupation Groups", type: "root", children: [], expanded: true };
                setTreeData(root);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadAll();
    }, []);

    useEffect(() => {
        if (!treeData) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 1200;
        const height = 800;
        const margin = { top: 50, right: 50, bottom: 50, left: 50 };

        svg.attr("width", width).attr("height", height);
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
        svg.call(d3.zoom().scaleExtent([0.1, 3]).on("zoom", (event) => g.attr("transform", event.transform)));

        const treeLayout = d3.tree().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);
        const root = d3.hierarchy(treeData);
        root.x0 = width / 2;
        root.y0 = 0;

        update(root);

        function update(source) {
            const tree = treeLayout(root);
            const nodes = tree.descendants();
            const links = tree.links();

            nodes.forEach(d => d.y = d.depth * 120);

            let i = 0;
            const node = g.selectAll("g.node").data(nodes, d => d.id || (d.id = ++i));

            const nodeEnter = node.enter()
                .append("g")
                .attr("class", "node")
                .attr("transform", () => `translate(${source.x0},${source.y0})`)
                .on("click", (event, d) => click(d))
                .style("cursor", "pointer");

            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", d => getNodeColor(d.data.type))
                .style("stroke", "#fff")
                .style("stroke-width", "2px");

            nodeEnter.append("text")
                .attr("dy", ".35em")
                .attr("x", d => (d.children || d._children ? -13 : 13))
                .attr("text-anchor", d => (d.children || d._children ? "end" : "start"))
                .text(d => d.data.name)
                .style("fill-opacity", 1e-6)
                .style("font-size", "12px")
                .style("font-family", "Arial, sans-serif");

            const nodeUpdate = nodeEnter.merge(node);

            nodeUpdate.transition().duration(500).attr("transform", d => `translate(${d.x},${d.y})`);
            nodeUpdate.select("circle").attr("r", d => getNodeSize(d.data.type)).style("fill", d => getNodeColor(d.data.type));
            nodeUpdate.select("text").style("fill-opacity", 1);

            node.exit().transition().duration(500).attr("transform", () => `translate(${source.x0},${source.y0})`).remove();

            const link = g.selectAll("path.link").data(links, d => d.target.id);
            const linkEnter = link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", () => diagonal(source, source))
                .style("fill", "none")
                .style("stroke", "#9CA3AF")
                .style("stroke-width", "2px");

            linkEnter.merge(link).transition().duration(500).attr("d", d => diagonal(d.source, d.target));
            link.exit().transition().duration(500).attr("d", () => diagonal(source, source)).remove();

            nodes.forEach(d => { d.x0 = d.x; d.y0 = d.y; });

            function diagonal(s, d) {
                return `M ${s.x} ${s.y} C ${(s.x + d.x) / 2} ${s.y}, ${(s.x + d.x) / 2} ${d.y}, ${d.x} ${d.y}`;
            }

            function click(d) {
                if (!d.data.expanded) {
                    const children = hierarchy
                        .filter(h => h.PARENTOBJECTTYPE.toLowerCase() === d.data.type && h.PARENTID === d.data.code)
                        .map(h => {
                            let type = h.CHILDOBJECTTYPE.toLowerCase();
                            let name = "";
                            if (type === "group") name = occupationGroups.find(g => g.CODE === h.CHILDID)?.PREFERREDLABEL;
                            else if (type === "occupation") name = occupations.find(o => o.CODE === h.CHILDID)?.PREFERREDLABEL;
                            else if (type === "skill") name = skills.find(s => s.ID === h.CHILDID)?.PREFERREDLABEL;

                            return { name, type, code: h.CHILDID, children: [], expanded: false };
                        })
                        .filter(Boolean);

                    if (children.length > 0) d.data.children = children;
                    d.data.expanded = true;
                } else {
                    d.data._children = d.data.children;
                    d.data.children = null;
                    d.data.expanded = false;
                }

                update(root);
            }

            function getNodeColor(type) {
                switch (type) {
                    case "root": return "#374151";
                    case "group": return "#4F46E5";
                    case "occupation": return "#059669";
                    case "skill": return "#F59E0B";
                    default: return "#374151";
                }
            }

            function getNodeSize(type) {
                switch (type) {
                    case "root": return 15;
                    case "group": return 12;
                    case "occupation": return 10;
                    case "skill": return 8;
                    default: return 10;
                }
            }
        }
    }, [treeData, hierarchy, occupationGroups, occupations, skills]);

    if (loading) return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="w-full h-screen flex items-center justify-center text-red-600">{error}</div>;

    return (
        <div className="w-full h-screen bg-gray-50">
            <svg ref={svgRef} className="w-full h-full"></svg>
        </div>
    );
}
