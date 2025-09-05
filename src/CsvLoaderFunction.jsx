import { useEffect, useState } from 'react';
import Papa from 'papaparse';

const filePaths = {
    occupation_groups: '/occupation_groups.csv',
    occupations: '/occupations.csv',
    skills: '/skills.csv',
    occupation_to_skill_relations: '/occupation_to_skill_relations.csv',
    occupation_hierarchy: '/occupation_hierarchy.csv'
};

export default function useCSVLoader() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCSV = async (label, path) => {
            const response = await fetch(path);
            const text = await response.text();
            return new Promise((resolve) => {
                Papa.parse(text, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => resolve({ label, data: results.data })
                });
            });
        };

        const loadAll = async () => {
            const entries = await Promise.all(
                Object.entries(filePaths).map(([label, path]) => loadCSV(label, path))
            );
            const parsed = Object.fromEntries(entries.map(({ label, data }) => [label, data]));
            setData(parsed);
            setLoading(false);
        };

        loadAll();
    }, []);

    return { data, loading };
}