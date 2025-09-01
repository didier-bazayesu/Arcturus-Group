import React, { useState, useEffect, useCallback } from 'react';

// Debounce function to limit API calls on search input
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const Skills_Occupations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('skill'); // 'skill' or 'occupation'
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to generate text using the LLM API
  const generateText = useCallback(async (text) => {
    try {
      const systemPrompt = "Act as a career advisor. Provide a concise, single-paragraph explanation of the given skill or occupation, and then suggest potential career opportunities for someone with that skill. The opportunities should be grounded in the context of real-world jobs. The response must be a single block of text.";
      const userQuery = `Based on the following skill or occupation: "${text}", provide an explanation and list three potential job opportunities.`;

      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        tools: [{ "google_search": {} }],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
      };

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate explanation.";
      return generatedText;
    } catch (e) {
      console.error("Error generating text:", e);
      return "Could not generate explanation due to an error.";
    }
  }, []);

  const fetchResults = useCallback(async (query) => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const endpoint = searchType === 'skill' ? `/api/skills/search?q=${query}` : `/api/occupations/search?q=${query}`;
      const response = await fetch(`http://localhost:5000${endpoint}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (e) {
      console.error("Fetch error:", e);
      setError("Failed to fetch data. Please ensure the backend server is running.");
    } finally {
      setLoading(false);
    }
  }, [searchType]);

  const debouncedFetch = useCallback(debounce(fetchResults, 300), [fetchResults]);

  useEffect(() => {
    debouncedFetch(searchQuery);
  }, [searchQuery, debouncedFetch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleSearchType = () => {
    setSearchType(prevType => {
      setSearchQuery('');
      setResults([]);
      setSelectedItem(null);
      return prevType === 'skill' ? 'occupation' : 'skill';
    });
  };

  const handleSelect = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    setSelectedItem(null);
    try {
      const endpoint = searchType === 'skill' ? `/api/skills/${id}` : `/api/occupations/${id}`;
      const response = await fetch(`http://localhost:5000${endpoint}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const itemData = await response.json();
      
      const generatedExplanation = await generateText(itemData.label);
      
      setSelectedItem({
        ...itemData,
        generatedText: generatedExplanation
      });
    } catch (e) {
      console.error("Fetch error:", e);
      setError("Failed to fetch details. Please ensure the backend server is running.");
    } finally {
      setLoading(false);
    }
  }, [searchType, generateText]);

  const handleBack = () => {
    setSelectedItem(null);
  };

  const isEssential = (type) => type === 'essential' ? 'text-green-500' : 'text-gray-500';

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 my-8">
        {!selectedItem ? (
          <>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <input
                type="text"
                placeholder={`Search for a ${searchType}...`}
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-grow p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                onClick={handleToggleSearchType}
                className="w-full sm:w-auto px-4 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Search by {searchType === 'skill' ? 'Occupation' : 'Skill'}
              </button>
            </div>
            
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
              <div className="space-y-4">
                {results.length > 0 ? (
                  results.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <h2 className="text-xl font-semibold text-blue-800">{item.label}</h2>
                      <p className="text-gray-600 truncate">{item.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No results found. Start typing to search.</p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="p-4 space-y-6">
            <button
              onClick={handleBack}
              className="mb-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
            >
              &larr; Back to search
            </button>
            
            <h1 className="text-3xl font-bold text-gray-800">{selectedItem.label}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{selectedItem.description}</p>
            
           

            {searchType === 'skill' && (
              <>
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Occupations</h3>
                  <div className="space-y-2">
                    {selectedItem.occupations.length > 0 ? (
                      selectedItem.occupations.map(occ => (
                        <div key={occ.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                          <span className="text-lg font-medium text-gray-800">{occ.label}</span>
                          <span className={`text-sm font-semibold capitalize ${isEssential(occ.type)}`}>
                            ({occ.type})
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No related occupations found.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.relatedSkills.length > 0 ? (
                      selectedItem.relatedSkills.map(skill => (
                        <span key={skill.id} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                          {skill.label}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No related skills found.</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {searchType === 'occupation' && (
              <>
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Required Skills</h3>
                  <div className="space-y-2">
                    {selectedItem.skills.length > 0 ? (
                      selectedItem.skills.map(skill => (
                        <div key={skill.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                          <span className="text-lg font-medium text-gray-800">{skill.label}</span>
                          <span className={`text-sm font-semibold capitalize ${isEssential(skill.type)}`}>
                            ({skill.type})
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills found for this occupation.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Occupations</h3>
                  <div className="space-y-2">
                    {selectedItem.relatedOccupations.length > 0 ? (
                      selectedItem.relatedOccupations.map(occ => (
                        <div key={occ.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                          <span className="text-lg font-medium text-gray-800">{occ.label}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No related occupations found.</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills_Occupations;
