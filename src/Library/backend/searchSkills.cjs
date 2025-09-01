const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory data storage
let occupations = {};
let skills = {};
let occupationToSkills = {};
let skillToSkills = {};
let skillToOccupations = {}; // New mapping for reverse lookup

// Function to load CSV data and store it in memory
const loadData = async () => {
    // Helper to read and parse a single CSV
  const parseCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = []; // declare results
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};


    try {
        const [
            occupationsData,
            skillsData,
            occupationToSkillsData,
            skillToSkillsData
        ] = await Promise.all([
            parseCsv(path.join(__dirname, '../Tabiya (ESCO 1.1.1)_6/occupations.csv')),
            parseCsv(path.join(__dirname, '../Tabiya (ESCO 1.1.1)_6/skills.csv')),
            parseCsv(path.join(__dirname, '../Tabiya (ESCO 1.1.1)_6/occupation_to_skill_relations.csv')),
            parseCsv(path.join(__dirname, '../Tabiya (ESCO 1.1.1)_6/skill_to_skill_relations.csv')),
        ]);

        // Map data for fast lookup
        occupations = occupationsData.reduce((acc, curr) => {
            acc[curr.ID] = curr;
            return acc;
        }, {});

        skills = skillsData.reduce((acc, curr) => {
            acc[curr.ID] = curr;
            return acc;
        }, {});

        occupationToSkills = occupationToSkillsData.reduce((acc, curr) => {
            if (!acc[curr.OCCUPATIONID]) {
                acc[curr.OCCUPATIONID] = { essential: [], optional: [] };
            }
            if (curr.RELATIONTYPE === 'essential') {
                acc[curr.OCCUPATIONID].essential.push(curr.SKILLID);
            } else if (curr.RELATIONTYPE === 'optional') {
                acc[curr.OCCUPATIONID].optional.push(curr.SKILLID);
            }
            return acc;
        }, {});

        skillToSkills = skillToSkillsData.reduce((acc, curr) => {
            if (!acc[curr.REQUIRINGID]) {
                acc[curr.REQUIRINGID] = [];
            }
            acc[curr.REQUIRINGID].push(curr.REQUIREDID);
            return acc;
        }, {});

        // Build the reverse lookup for skills to occupations
        Object.keys(occupationToSkills).forEach(occId => {
            const skillList = [...occupationToSkills[occId].essential, ...occupationToSkills[occId].optional];
            skillList.forEach(skillId => {
                if (!skillToOccupations[skillId]) {
                    skillToOccupations[skillId] = [];
                }
                skillToOccupations[skillId].push(occId);
            });
        });

        console.log('All CSV data loaded successfully!');
    } catch (error) {
        console.error('Failed to load CSV data:', error);
        process.exit(1); // Exit if data loading fails
    }
};

// Endpoint to handle skill search
app.post('/api/search-skills', (req, res) => {
    const searchTerm = req.body.skill.toLowerCase();
    const foundSkill = Object.values(skills).find(s =>
        s.PREFERREDLABEL.toLowerCase().includes(searchTerm)
    );

    if (!foundSkill) {
        return res.status(404).json({ message: 'Skill not found.' });
    }

    const skillId = foundSkill.ID;

    // Get occupations that require this skill
    const occupationsRequiringSkill = (skillToOccupations[skillId] || [])
        .map(occId => occupations[occId])
        .filter(occ => occ)
        .slice(0, 10); // Limit results for a cleaner display

    // Get related skills (skills required by the searched skill)
    const relatedSkills = (skillToSkills[skillId] || [])
        .map(relatedId => skills[relatedId])
        .filter(s => s)
        .slice(0, 5); // Limit related skills for display

    // Find related occupations (by sharing common skills)
    const relatedOccupations = new Set();
    occupationsRequiringSkill.forEach(occ => {
        const occSkills = new Set([...occupationToSkills[occ.ID].essential, ...occupationToSkills[occ.ID].optional]);
        Object.keys(occupationToSkills).forEach(otherOccId => {
            // Exclude the currently found occupations
            if (occupationsRequiringSkill.some(o => o.ID === otherOccId)) {
                return;
            }

            const otherOccSkills = new Set([...occupationToSkills[otherOccId].essential, ...occupationToSkills[otherOccId].optional]);
            let sharedCount = 0;
            for (let sId of occSkills) {
                if (otherOccSkills.has(sId)) {
                    sharedCount++;
                }
            }
            // If they share at least 3 skills, consider it related
            if (sharedCount >= 3) {
                relatedOccupations.add(occupations[otherOccId]);
            }
        });
    });

    res.json({
        skill: foundSkill,
        occupationsRequiringSkill,
        relatedSkills,
        relatedOccupations: Array.from(relatedOccupations).slice(0, 5)
    });
});

// Start the server after loading the data
loadData().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
