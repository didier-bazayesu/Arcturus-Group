import download from '../assets/Rectangle 4.png'
import download1 from '../assets/mision.avif'
import { easeInOut, motion } from 'framer-motion';
import picture from '../assets/Clip path group.png';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

// Enhanced Interactive Navigation Map Component
const OccupationNavigationMap = () => {
  const canvasRef = useRef(null);
  const [currentLevel, setCurrentLevel] = useState('categories'); // 'categories', 'occupations', 'skills', 'market'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState(['Occupation Categories']);

  // ICT-focused hierarchical data structure
  const navigationData = {
    categories: [
      { id: 'ict', label: 'ICT (Information & Communication Technology)', x: 300, y: 225, color: '#0047AB', count: '850+ jobs' }
    ],

    occupations: {
      ict: [
        { id: 'software-developer', label: 'Software Developer', x: 120, y: 100, demand: 'Very High', salary: '$85k', growth: '+22%' },
        { id: 'systems-analyst', label: 'Systems Analyst', x: 320, y: 120, demand: 'High', salary: '$78k', growth: '+18%' },
        { id: 'network-admin', label: 'Network Administrator', x: 480, y: 140, demand: 'High', salary: '$72k', growth: '+14%' },
        { id: 'cybersecurity-specialist', label: 'Cybersecurity Specialist', x: 150, y: 220, demand: 'Very High', salary: '$95k', growth: '+35%' },
        { id: 'data-scientist', label: 'Data Scientist', x: 380, y: 200, demand: 'Very High', salary: '$98k', growth: '+31%' },
        { id: 'web-developer', label: 'Web Developer', x: 250, y: 280, demand: 'High', salary: '$68k', growth: '+16%' },
        { id: 'mobile-developer', label: 'Mobile App Developer', x: 450, y: 260, demand: 'Very High', salary: '$82k', growth: '+28%' },
        { id: 'database-admin', label: 'Database Administrator', x: 180, y: 350, demand: 'High', salary: '$76k', growth: '+12%' },
        { id: 'it-support', label: 'IT Support Specialist', x: 380, y: 320, demand: 'High', salary: '$52k', growth: '+10%' },
        { id: 'devops-engineer', label: 'DevOps Engineer', x: 100, y: 300, demand: 'Very High', salary: '$92k', growth: '+25%' },
        { id: 'ui-ux-designer', label: 'UI/UX Designer', x: 500, y: 320, demand: 'High', salary: '$74k', growth: '+19%' },
        { id: 'cloud-architect', label: 'Cloud Architect', x: 280, y: 380, demand: 'Very High', salary: '$115k', growth: '+38%' }
      ]
    },

    skills: {
      'software-developer': [
        { id: 'programming-languages', label: 'Programming Languages', x: 120, y: 80, demand: 95, trend: 'rising', marketValue: '$80k avg' },
        { id: 'version-control', label: 'Version Control (Git)', x: 280, y: 110, demand: 88, trend: 'stable', marketValue: '$75k avg' },
        { id: 'software-architecture', label: 'Software Architecture', x: 200, y: 180, demand: 82, trend: 'rising', marketValue: '$95k avg' },
        { id: 'testing-debugging', label: 'Testing & Debugging', x: 350, y: 160, demand: 85, trend: 'stable', marketValue: '$78k avg' },
        { id: 'agile-methodology', label: 'Agile Methodology', x: 150, y: 250, demand: 91, trend: 'rising', marketValue: '+$10k bonus' },
        { id: 'problem-solving', label: 'Problem Solving', x: 320, y: 240, demand: 93, trend: 'stable', marketValue: '+$15k bonus' }
      ],
      'systems-analyst': [
        { id: 'requirements-analysis', label: 'Requirements Analysis', x: 140, y: 100, demand: 89, trend: 'stable', marketValue: '$72k avg' },
        { id: 'systems-design', label: 'Systems Design', x: 300, y: 130, demand: 86, trend: 'rising', marketValue: '$78k avg' },
        { id: 'business-process', label: 'Business Process Modeling', x: 180, y: 220, demand: 83, trend: 'stable', marketValue: '$75k avg' },
        { id: 'documentation', label: 'Technical Documentation', x: 380, y: 180, demand: 79, trend: 'stable', marketValue: '$70k avg' },
        { id: 'stakeholder-management', label: 'Stakeholder Management', x: 250, y: 300, demand: 87, trend: 'rising', marketValue: '+$8k bonus' }
      ],
      'network-admin': [
        { id: 'network-protocols', label: 'Network Protocols (TCP/IP)', x: 150, y: 110, demand: 91, trend: 'stable', marketValue: '$70k avg' },
        { id: 'network-security', label: 'Network Security', x: 320, y: 140, demand: 94, trend: 'rising', marketValue: '$78k avg' },
        { id: 'server-management', label: 'Server Management', x: 200, y: 230, demand: 88, trend: 'stable', marketValue: '$72k avg' },
        { id: 'troubleshooting', label: 'Network Troubleshooting', x: 400, y: 200, demand: 89, trend: 'stable', marketValue: '$71k avg' },
        { id: 'virtualization', label: 'Virtualization Technologies', x: 280, y: 320, demand: 85, trend: 'rising', marketValue: '$75k avg' }
      ],
      'cybersecurity-specialist': [
        { id: 'threat-analysis', label: 'Threat Analysis', x: 130, y: 90, demand: 96, trend: 'rising', marketValue: '$90k avg' },
        { id: 'penetration-testing', label: 'Penetration Testing', x: 310, y: 120, demand: 93, trend: 'rising', marketValue: '$95k avg' },
        { id: 'incident-response', label: 'Incident Response', x: 190, y: 200, demand: 91, trend: 'rising', marketValue: '$88k avg' },
        { id: 'security-frameworks', label: 'Security Frameworks', x: 380, y: 170, demand: 89, trend: 'stable', marketValue: '$92k avg' },
        { id: 'risk-assessment', label: 'Risk Assessment', x: 250, y: 280, demand: 87, trend: 'rising', marketValue: '$86k avg' },
        { id: 'compliance', label: 'Compliance & Regulations', x: 420, y: 250, demand: 84, trend: 'stable', marketValue: '$85k avg' }
      ],
      'data-scientist': [
        { id: 'machine-learning', label: 'Machine Learning', x: 140, y: 100, demand: 97, trend: 'rising', marketValue: '$100k avg' },
        { id: 'statistical-analysis', label: 'Statistical Analysis', x: 320, y: 130, demand: 94, trend: 'stable', marketValue: '$95k avg' },
        { id: 'python-r', label: 'Python & R', x: 200, y: 210, demand: 96, trend: 'rising', marketValue: '$92k avg' },
        { id: 'data-visualization', label: 'Data Visualization', x: 390, y: 180, demand: 88, trend: 'rising', marketValue: '$88k avg' },
        { id: 'big-data', label: 'Big Data Technologies', x: 260, y: 300, demand: 91, trend: 'rising', marketValue: '$98k avg' },
        { id: 'sql-databases', label: 'SQL & Databases', x: 440, y: 260, demand: 89, trend: 'stable', marketValue: '$85k avg' }
      ],
      'web-developer': [
        { id: 'html-css-js', label: 'HTML/CSS/JavaScript', x: 150, y: 110, demand: 92, trend: 'stable', marketValue: '$65k avg' },
        { id: 'frontend-frameworks', label: 'Frontend Frameworks', x: 320, y: 140, demand: 89, trend: 'rising', marketValue: '$72k avg' },
        { id: 'backend-development', label: 'Backend Development', x: 200, y: 230, demand: 86, trend: 'rising', marketValue: '$75k avg' },
        { id: 'responsive-design', label: 'Responsive Design', x: 390, y: 200, demand: 84, trend: 'stable', marketValue: '$68k avg' },
        { id: 'web-apis', label: 'Web APIs & Services', x: 270, y: 320, demand: 82, trend: 'rising', marketValue: '$70k avg' }
      ],
      'mobile-developer': [
        { id: 'mobile-platforms', label: 'iOS/Android Development', x: 160, y: 100, demand: 94, trend: 'rising', marketValue: '$78k avg' },
        { id: 'cross-platform', label: 'Cross-platform Frameworks', x: 340, y: 130, demand: 88, trend: 'rising', marketValue: '$82k avg' },
        { id: 'mobile-ui', label: 'Mobile UI/UX Design', x: 220, y: 220, demand: 85, trend: 'stable', marketValue: '$75k avg' },
        { id: 'app-store', label: 'App Store Guidelines', x: 400, y: 190, demand: 79, trend: 'stable', marketValue: '$72k avg' },
        { id: 'mobile-testing', label: 'Mobile Testing', x: 280, y: 310, demand: 81, trend: 'stable', marketValue: '$74k avg' }
      ],
      'database-admin': [
        { id: 'database-design', label: 'Database Design', x: 150, y: 120, demand: 87, trend: 'stable', marketValue: '$72k avg' },
        { id: 'sql-optimization', label: 'SQL Optimization', x: 320, y: 150, demand: 89, trend: 'stable', marketValue: '$76k avg' },
        { id: 'backup-recovery', label: 'Backup & Recovery', x: 200, y: 240, demand: 91, trend: 'stable', marketValue: '$74k avg' },
        { id: 'database-security', label: 'Database Security', x: 380, y: 210, demand: 88, trend: 'rising', marketValue: '$78k avg' },
        { id: 'performance-tuning', label: 'Performance Tuning', x: 260, y: 330, demand: 84, trend: 'stable', marketValue: '$75k avg' }
      ],
      'it-support': [
        { id: 'hardware-troubleshooting', label: 'Hardware Troubleshooting', x: 160, y: 110, demand: 85, trend: 'stable', marketValue: '$48k avg' },
        { id: 'software-installation', label: 'Software Installation', x: 330, y: 140, demand: 83, trend: 'stable', marketValue: '$50k avg' },
        { id: 'user-training', label: 'User Training & Support', x: 210, y: 230, demand: 88, trend: 'stable', marketValue: '$52k avg' },
        { id: 'ticketing-systems', label: 'Ticketing Systems', x: 390, y: 200, demand: 80, trend: 'stable', marketValue: '$49k avg' },
        { id: 'remote-support', label: 'Remote Support Tools', x: 270, y: 320, demand: 86, trend: 'rising', marketValue: '$54k avg' }
      ],
      'devops-engineer': [
        { id: 'ci-cd', label: 'CI/CD Pipelines', x: 150, y: 100, demand: 95, trend: 'rising', marketValue: '$88k avg' },
        { id: 'containerization', label: 'Containerization (Docker)', x: 320, y: 130, demand: 93, trend: 'rising', marketValue: '$90k avg' },
        { id: 'infrastructure-code', label: 'Infrastructure as Code', x: 200, y: 220, demand: 91, trend: 'rising', marketValue: '$92k avg' },
        { id: 'monitoring', label: 'System Monitoring', x: 380, y: 190, demand: 89, trend: 'stable', marketValue: '$85k avg' },
        { id: 'cloud-platforms', label: 'Cloud Platforms (AWS/Azure)', x: 260, y: 310, demand: 94, trend: 'rising', marketValue: '$95k avg' }
      ],
      'ui-ux-designer': [
        { id: 'user-research', label: 'User Research', x: 160, y: 110, demand: 86, trend: 'rising', marketValue: '$70k avg' },
        { id: 'wireframing', label: 'Wireframing & Prototyping', x: 330, y: 140, demand: 89, trend: 'stable', marketValue: '$72k avg' },
        { id: 'design-tools', label: 'Design Tools (Figma, Adobe)', x: 210, y: 230, demand: 91, trend: 'stable', marketValue: '$74k avg' },
        { id: 'usability-testing', label: 'Usability Testing', x: 390, y: 200, demand: 84, trend: 'rising', marketValue: '$71k avg' },
        { id: 'design-systems', label: 'Design Systems', x: 270, y: 320, demand: 87, trend: 'rising', marketValue: '$76k avg' }
      ],
      'cloud-architect': [
        { id: 'cloud-strategy', label: 'Cloud Strategy & Planning', x: 150, y: 90, demand: 96, trend: 'rising', marketValue: '$110k avg' },
        { id: 'multi-cloud', label: 'Multi-cloud Architecture', x: 320, y: 120, demand: 92, trend: 'rising', marketValue: '$115k avg' },
        { id: 'security-compliance', label: 'Cloud Security & Compliance', x: 200, y: 200, demand: 94, trend: 'rising', marketValue: '$118k avg' },
        { id: 'cost-optimization', label: 'Cost Optimization', x: 380, y: 170, demand: 88, trend: 'stable', marketValue: '$108k avg' },
        { id: 'migration-strategy', label: 'Migration Strategies', x: 260, y: 280, demand: 90, trend: 'rising', marketValue: '$112k avg' },
        { id: 'automation', label: 'Cloud Automation', x: 420, y: 240, demand: 93, trend: 'rising', marketValue: '$116k avg' }
      ]
    }
  };

  const getCurrentData = () => {
    switch (currentLevel) {
      case 'categories':
        return navigationData.categories;
      case 'occupations':
        return navigationData.occupations[selectedCategory] || [];
      case 'skills':
        return navigationData.skills[selectedOccupation] || [];
      default:
        return [];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const data = getCurrentData();

    const drawMap = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nodes based on current level
      data.forEach(node => {
        const isHovered = hoveredNode === node.id;
        let radius, fillColor, strokeColor;

        // Different styling based on level
        switch (currentLevel) {
          case 'categories':
            radius = 40; // Increased from 35
            fillColor = isHovered ? node.color : node.color + 'CC';
            strokeColor = node.color;
            break;
          case 'occupations':
            radius = 30; // Increased from 25
            const demandColors = { 'Very High': '#10B981', 'High': '#F59E0B', 'Medium': '#6B7280' };
            fillColor = isHovered ? demandColors[node.demand] : demandColors[node.demand] + 'CC';
            strokeColor = demandColors[node.demand];
            break;
          case 'skills':
            radius = 25; // Increased from 20
            const trendColors = { 'rising': '#10B981', 'stable': '#3B82F6', 'declining': '#EF4444' };
            fillColor = isHovered ? trendColors[node.trend] : trendColors[node.trend] + 'CC';
            strokeColor = trendColors[node.trend];
            break;
        }

        // Draw node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw label
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - radius - 15);

        // Draw additional info based on level
        ctx.font = '11px Arial';
        ctx.fillStyle = '#6b7280';

        switch (currentLevel) {
          case 'categories':
            ctx.fillText(node.count, node.x, node.y - radius - 2);
            break;
          case 'occupations':
            ctx.fillText(node.salary, node.x, node.y - radius - 2);
            break;
          case 'skills':
            ctx.fillText(`${node.demand}% demand`, node.x, node.y - radius - 2);
            break;
        }

        // Draw demand/trend indicator for occupations and skills
        if (currentLevel === 'skills' && node.trend) {
          const indicatorColor = { 'rising': '#10B981', 'stable': '#3B82F6', 'declining': '#EF4444' }[node.trend];
          ctx.beginPath();
          ctx.arc(node.x + radius - 5, node.y - radius + 5, 4, 0, 2 * Math.PI);
          ctx.fillStyle = indicatorColor;
          ctx.fill();
        }
      });
    };

    drawMap();
  }, [currentLevel, selectedCategory, selectedOccupation, hoveredNode]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const data = getCurrentData();
    const clickedNode = data.find(node => {
      const radius = currentLevel === 'categories' ? 35 : currentLevel === 'occupations' ? 25 : 20;
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= radius;
    });

    if (clickedNode) {
      switch (currentLevel) {
        case 'categories':
          setSelectedCategory(clickedNode.id);
          setCurrentLevel('occupations');
          setBreadcrumb(['Occupation Categories', clickedNode.label]);
          break;
        case 'occupations':
          setSelectedOccupation(clickedNode.id);
          setCurrentLevel('skills');
          setBreadcrumb(prev => [...prev, clickedNode.label]);
          break;
        case 'skills':
          setSelectedSkill(clickedNode.id);
          // Could add market details level here
          break;
      }
    }
  };

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const data = getCurrentData();
    const hoveredNodeFound = data.find(node => {
      const radius = currentLevel === 'categories' ? 35 : currentLevel === 'occupations' ? 25 : 20;
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= radius;
    });

    setHoveredNode(hoveredNodeFound ? hoveredNodeFound.id : null);
    canvas.style.cursor = hoveredNodeFound ? 'pointer' : 'default';
  };

  const navigateBack = () => {
    switch (currentLevel) {
      case 'occupations':
        setCurrentLevel('categories');
        setSelectedCategory(null);
        setBreadcrumb(['Occupation Categories']);
        break;
      case 'skills':
        setCurrentLevel('occupations');
        setSelectedOccupation(null);
        setBreadcrumb(prev => prev.slice(0, -1));
        break;
    }
  };

  const getInfoPanelContent = () => {
    const data = getCurrentData();
    const hoveredData = data.find(node => node.id === hoveredNode);

    if (hoveredData) {
      switch (currentLevel) {
        case 'categories':
          return (
            <div>
              <h5 className="font-semibold text-lg mb-2">{hoveredData.label}</h5>
              <p className="text-sm text-gray-600 mb-2">{hoveredData.count}</p>
              <p className="text-xs text-gray-500">Click to explore occupations in this category</p>
            </div>
          );
        case 'occupations':
          return (
            <div>
              <h5 className="font-semibold text-lg mb-2">{hoveredData.label}</h5>
              <div className="space-y-1 text-sm">
                <p><strong>Salary:</strong> {hoveredData.salary}</p>
                <p><strong>Demand:</strong> {hoveredData.demand}</p>
                <p><strong>Growth:</strong> {hoveredData.growth}</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Click to explore required skills</p>
            </div>
          );
        case 'skills':
          return (
            <div>
              <h5 className="font-semibold text-lg mb-2">{hoveredData.label}</h5>
              <div className="space-y-1 text-sm">
                <p><strong>Market Demand:</strong> {hoveredData.demand}%</p>
                <p><strong>Trend:</strong> {hoveredData.trend}</p>
                <p><strong>Market Value:</strong> {hoveredData.marketValue}</p>
              </div>
            </div>
          );
      }
    }

    // Default content based on current level
    switch (currentLevel) {
      case 'categories':
        return (
          <div>
            <h5 className="font-semibold text-gray-800 mb-2">Explore by Category</h5>
            <p className="text-sm text-gray-600">Click on any category to discover specific occupations within that field.</p>
          </div>
        );
      case 'occupations':
        return (
          <div>
            <h5 className="font-semibold text-gray-800 mb-2">Career Opportunities</h5>
            <p className="text-sm text-gray-600">Each bubble shows salary, demand level, and growth projections. Click to see required skills.</p>
            <div className="mt-3 space-y-1">
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Very High Demand</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>High Demand</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                <span>Medium Demand</span>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div>
            <h5 className="font-semibold text-gray-800 mb-2">Market Skills Analysis</h5>
            <p className="text-sm text-gray-600">Skills are sized by market demand and colored by trend direction.</p>
            <div className="mt-3 space-y-1">
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Rising Trend</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Stable Trend</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Declining Trend</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#0047AB] mb-2">Navigate the World of Work</h3>
        <p className="text-gray-600 text-sm mb-4">
          Explore career paths through our interactive taxonomy: Categories → Occupations → Skills → Market Data
        </p>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumb.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="text-gray-400 mx-2">→</span>}
              <span className={index === breadcrumb.length - 1 ? "font-semibold text-[#0047AB]" : "text-gray-600"}>
                {crumb}
              </span>
            </div>
          ))}
        </div>

        {/* Back Button */}
        {currentLevel !== 'categories' && (
          <button
            onClick={navigateBack}
            className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Go Back
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Map Canvas */}
        <div className="md:col-span-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={450}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            className="border border-gray-300 rounded-lg w-full max-w-full"
            style={{ maxHeight: '450px' }}
          />
        </div>

        {/* Info Panel */}
        <div className="bg-gray-50 p-4 rounded-lg">
          {getInfoPanelContent()}
        </div>
      </div>
    </div>
  );
};

export default function AboutUs() {
  return (
    <div className="overflow-x-hidden"> {/* Add this wrapper to prevent horizontal scroll */}
      <div className="  sm:px-6  "> {/* Add consistent padding */}
        <div className="flex  flex-row  mb-6 gap-4 sm:gap-5 max-w-7xl mt-5  sm:pb-5 justify-center ">
          <img src={picture} alt="Tabiya Logo" className="w-16 h-16 sm:w-10 sm:h-10  md:h-20 md:w-20 sm:mx-0  " />
          <h1 className="font-bold text-3xl sm:text-5xl text-center sm:text-left text-[#032147]">tabiya</h1>
        </div>

      </div>

      <div className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 10 }}
          transition={{ duration: 0.5 }}
        ><br />
          <section className="relative bg-[#0047AB] text-white py-20 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl">
                Tabiya connects people, skills, and opportunities through an inclusive taxonomy that recognizes both formal and informal work.
              </p>
            </div>
          </section>
        </motion.div>

        {/* Interactive Navigation Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0047AB]">Explore Career Pathways</h2>
                <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600">
                  Navigate through occupation categories, discover specific careers, and explore the skills the market demands.
                  Each level provides deeper insights into the world of work.
                </p>
              </div>
              <OccupationNavigationMap />
            </div>
          </section>
        </motion.div>

        {/* Who We Are */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-64 md:h-80 flex items-center justify-center rounded-xl overflow-hidden">
                <img src={download} alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0047AB]">Who We Are</h2>
                <p className="mb-4 text-base md:text-lg">
                  We are dedicated to building an open data ecosystem where skills and occupations are mapped, organized, and made accessible to everyone.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#00A99D]">Our Mission</h2>
              <div className="w-fulll  text-base md:text-lg space-y-6 ">
                <p className="border border-black p-5 rounded-2xl bg-[#37b0a0] text-white ">
                  Tabiya builds open-source software and standards to unlock economic opportunity
                  for all. We partner with government employment services, NGOs, and job platforms
                  to create pathways that recognize skills from all work – including informal and
                  traditionally unseen activities.
                  Our mission is to make labor markets more efficient, equitable, and inclusive.
                </p>

                <p className="border border-black p-5 rounded-2xl bg-[#37b0a0] text-white">
                  The youth workforce is growing, especially in low-
                  and middle-income countries. Millions of people gain skills informally,
                  yet labor markets often don't often recognize their value, creating barriers
                  to participation. Technology could help, but current solutions are expensive,
                  proprietary, and create fragmented systems that overlook informal skills and
                  prevent data sharing. We're on a mission to change that.
                  At Tabiya, we're building digital public infrastructure for jobs—creating open-source
                  technology that organizations can freely adapt to create more efficient, equitable
                  labor markets.
                </p>
              </div>
            </div>
          </section>
        </motion.div>

        {/* Our Values with Image */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#FF7A00]">Our Values</h2>
                <p className="mb-4 text-base md:text-lg">
                  Inclusion, transparency, and collaboration are at the core of everything we do.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-64 md:h-80 flex items-center justify-center rounded-xl overflow-hidden">
                <img src={download1} className="w-full h-full object-cover" alt="" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <section className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0047AB]">Where We Work</h2>
              {/* Map */}
              <div className="w-full h-64 md:h-96 flex items-center justify-center rounded-xl overflow-hidden">
                <img src={download} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}