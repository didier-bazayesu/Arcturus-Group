import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

// Fix __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory data storage
let occupations = {};
let skills = {};
let occupationToSkills = {};
let skillToSkills = {};

// Function to load CSV data and store it in memory
const loadData = async () => {
    // Helper to read and parse a single CSV
    const parseCsv = (filePath) => {
        return new Promise((resolve, reject) => {
            const results = [];
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

        console.log('All CSV data loaded successfully!');
    } catch (error) {
        console.error('Failed to load CSV data:', error);
        process.exit(1);
    }
};

// Endpoint to handle occupation search
app.post('/api/search', (req, res) => {
    const searchTerm = req.body.occupation.toLowerCase();
    const foundOccupation = Object.values(occupations).find(occ =>
        occ.PREFERREDLABEL.toLowerCase().includes(searchTerm)
    );

    if (!foundOccupation) {
        return res.status(404).json({ message: 'Occupation not found.' });
    }

    const occupationId = foundOccupation.ID;
    const occupationSkills = occupationToSkills[occupationId] || { essential: [], optional: [] };

    // Get skill details
    const requiredSkills = occupationSkills.essential.map(id => skills[id]).filter(s => s);
    const optionalSkills = occupationSkills.optional.map(id => skills[id]).filter(s => s);

    // Find related skills
    const relatedSkills = new Set();
    [...occupationSkills.essential, ...occupationSkills.optional].forEach(skillId => {
        const relatedSkillIds = skillToSkills[skillId] || [];
        relatedSkillIds.forEach(relatedId => {
            if (skills[relatedId]) {
                relatedSkills.add(skills[relatedId]);
            }
        });
    });

    // Find related occupations
    const relatedOccupations = [];
    const mainOccupationSkillIds = new Set([...occupationSkills.essential, ...occupationSkills.optional]);
    const otherOccupations = Object.values(occupations).filter(occ => occ.ID !== occupationId);

    otherOccupations.forEach(otherOcc => {
        const otherOccSkills = occupationToSkills[otherOcc.ID];
        if (otherOccSkills) {
            const sharedSkills = new Set();
            [...otherOccSkills.essential, ...otherOccSkills.optional].forEach(skillId => {
                if (mainOccupationSkillIds.has(skillId)) {
                    sharedSkills.add(skillId);
                }
            });

            if (sharedSkills.size >= 3) {
                relatedOccupations.push({
                    id: otherOcc.ID,
                    label: otherOcc.PREFERREDLABEL,
                    sharedSkillsCount: sharedSkills.size
                });
            }
        }
    });

    relatedOccupations.sort((a, b) => b.sharedSkillsCount - a.sharedSkillsCount);
    const topRelatedOccupations = relatedOccupations.slice(0, 5);

    res.json({
        occupation: foundOccupation,
        requiredSkills,
        optionalSkills,
        relatedSkills: Array.from(relatedSkills).slice(0, 10),
        relatedOccupations: topRelatedOccupations,
    });
});

// Start the server
loadData().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
