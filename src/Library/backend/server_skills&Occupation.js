const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); 
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const data = {};

// Function to read and parse a CSV file

const readCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, filePath))
      .pipe(csv())  // Correct usage: call the csv function directly
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log(`Successfully loaded ${filePath}`);
        resolve(results);
      })
      .on('error', (err) => reject(err));
  });
};

const loadData = async () => {
  try {
    const filesToLoad = [
      '../Tabiya (ESCO 1.1.1)_6/occupations.csv',
      '../Tabiya (ESCO 1.1.1)_6/skills.csv',
      '../Tabiya (ESCO 1.1.1)_6/occupation_to_skill_relations.csv',
      '../Tabiya (ESCO 1.1.1)_6/skill_to_skill_relations.csv',
      '../Tabiya (ESCO 1.1.1)_6/occupation_hierarchy.csv',
      '../Tabiya (ESCO 1.1.1)_6/skill_hierarchy.csv',
      '../Tabiya (ESCO 1.1.1)_6/occupation_groups.csv',
      '../Tabiya (ESCO 1.1.1)_6/skill_groups.csv'
    ];

    const [
      occupationsCsv,
      skillsCsv,
      occupationToSkillRelationsCsv,
      skillToSkillRelationsCsv,
      occupationHierarchyCsv,
      skillHierarchyCsv,
      occupationGroupsCsv,
      skillGroupsCsv
    ] = await Promise.all(filesToLoad.map(readCsv));

    // Create maps for quick lookups
    
    data.occupationsMap = new Map(occupationsCsv.map(o => [o.ID, o]));
    data.skillsMap = new Map(skillsCsv.map(s => [s.ID, s]));
    data.occupationGroupsMap = new Map(occupationGroupsCsv.map(g => [g.ID, g]));
    data.skillGroupsMap = new Map(skillGroupsCsv.map(g => [g.ID, g]));

    // Build the relationships

    data.occupationsToSkills = {};
    occupationToSkillRelationsCsv.forEach(relation => {
      if (!data.occupationsToSkills[relation.OCCUPATIONID]) {
        data.occupationsToSkills[relation.OCCUPATIONID] = [];
      }
      data.occupationsToSkills[relation.OCCUPATIONID].push({
        skillId: relation.SKILLID,
        relationType: relation.RELATIONTYPE
      });
    });

    data.skillsToOccupations = {};
    occupationToSkillRelationsCsv.forEach(relation => {
      if (!data.skillsToOccupations[relation.SKILLID]) {
        data.skillsToOccupations[relation.SKILLID] = [];
      }
      data.skillsToOccupations[relation.SKILLID].push({
        occupationId: relation.OCCUPATIONID,
        relationType: relation.RELATIONTYPE
      });
    });

    data.skillsToSkills = {};
    skillToSkillRelationsCsv.forEach(relation => {
      if (!data.skillsToSkills[relation.REQUIRINGID]) {
        data.skillsToSkills[relation.REQUIRINGID] = [];
      }
      data.skillsToSkills[relation.REQUIRINGID].push(relation.REQUIREDID);
    });

    data.occupationHierarchy = {};
    occupationHierarchyCsv.forEach(relation => {
        if (!data.occupationHierarchy[relation.CHILDID]) {
            data.occupationHierarchy[relation.CHILDID] = [];
        }
        data.occupationHierarchy[relation.CHILDID].push(relation.PARENTID);
    });
    
    data.skillHierarchy = {};
    skillHierarchyCsv.forEach(relation => {
        if (!data.skillHierarchy[relation.CHILDID]) {
            data.skillHierarchy[relation.CHILDID] = [];
        }
        data.skillHierarchy[relation.CHILDID].push(relation.PARENTID);
    });

    console.log('All data loaded successfully. Server is ready.');
  } catch (err) {
    console.error('Failed to load CSV files:', err);
    process.exit(1);
  }
};

// Search for occupations

app.get('/api/occupations/search', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  const results = Array.from(data.occupationsMap.values())
    .filter(o => o.PREFERREDLABEL.toLowerCase().includes(query))
    .slice(0, 20)
    .map(o => ({
      id: o.ID,
      label: o.PREFERREDLABEL,
      description: o.DEFINITION || o.DESCRIPTION
    }));
  res.json(results);
});

// Get detailed occupation information

app.get('/api/occupations/:id', (req, res) => {
  const occupation = data.occupationsMap.get(req.params.id);
  if (!occupation) {
    return res.status(404).json({ error: 'Occupation not found.' });
  }

  // Find related skills

  const skills = (data.occupationsToSkills[occupation.ID] || []).map(relation => {
    const skill = data.skillsMap.get(relation.skillId);
    return skill ? {
      id: skill.ID,
      label: skill.PREFERREDLABEL,
      type: relation.relationType
    } : null;
  }).filter(s => s !== null);

  // Find related occupations (by sharing skills)

  const relatedOccupations = Array.from(new Set(
    skills.map(s => data.skillsToOccupations[s.id] || []).flat()
    .filter(r => r.occupationId !== occupation.ID)
    .map(r => r.occupationId)
  )).slice(0, 10).map(id => {
    const relatedOcc = data.occupationsMap.get(id);
    return relatedOcc ? { id: relatedOcc.ID, label: relatedOcc.PREFERREDLABEL } : null;
  }).filter(o => o !== null);
  
  res.json({
    id: occupation.ID,
    label: occupation.PREFERREDLABEL,
    description: occupation.DEFINITION || occupation.DESCRIPTION,
    skills,
    relatedOccupations
  });
});

// Search for skills

app.get('/api/skills/search', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  const results = Array.from(data.skillsMap.values())
    .filter(s => s.PREFERREDLABEL.toLowerCase().includes(query))
    .slice(0, 20)
    .map(s => ({
      id: s.ID,
      label: s.PREFERREDLABEL,
      description: s.DESCRIPTION
    }));
  res.json(results);
});

// Get detailed skill information

app.get('/api/skills/:id', (req, res) => {
  const skill = data.skillsMap.get(req.params.id);
  if (!skill) {
    return res.status(404).json({ error: 'Skill not found.' });
  }

  // Find related occupations

  const occupations = (data.skillsToOccupations[skill.ID] || []).map(relation => {
    const occupation = data.occupationsMap.get(relation.occupationId);
    return occupation ? {
      id: occupation.ID,
      label: occupation.PREFERREDLABEL,
      type: relation.relationType
    } : null;
  }).filter(o => o !== null);

  // Find related skills

  const relatedSkills = Array.from(new Set(
    data.skillsToSkills[skill.ID] || []
  )).slice(0, 10).map(id => {
    const relatedSkill = data.skillsMap.get(id);
    return relatedSkill ? { id: relatedSkill.ID, label: relatedSkill.PREFERREDLABEL } : null;
  }).filter(s => s !== null);

  res.json({
    id: skill.ID,
    label: skill.PREFERREDLABEL,
    description: skill.DESCRIPTION,
    occupations,
    relatedSkills
  });
});

// Start the server after data is loaded

loadData().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
