import { useState } from 'react';

// Include Tailwind CSS via CDN for styling
const SearchOccupations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ occupation: searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Occupation not found. Please try a different term.');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 flex flex-col items-center">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900 dark:text-gray-100">
          Occupation Skills Finder
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Enter an occupation to find its required skills and related jobs.
        </p>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g., software developer"
            className="flex-grow p-4 rounded-full border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            className="p-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="text-center text-lg mt-8 animate-pulse">
          Loading data...
        </div>
      )}

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg mt-8">
          {error}
        </div>
      )}

      {results && (
        <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2 mt-8">
          {/* Occupation Details */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
              <span className="text-blue-600">Occupation:</span> {results.occupation.PREFERREDLABEL}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {results.occupation.DESCRIPTION || 'No description available.'}
            </p>
          </div>

          {/* Required Skills */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-green-600">Essential Skills</span>
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {results.requiredSkills.length > 0 ? (
                results.requiredSkills.map(skill => (
                  <li key={skill.ID} className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">{skill.PREFERREDLABEL}</span>: {skill.DESCRIPTION}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No essential skills found for this occupation.</li>
              )}
            </ul>
          </div>

          {/* Optional Skills */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-yellow-600">Optional Skills</span>
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {results.optionalSkills.length > 0 ? (
                results.optionalSkills.map(skill => (
                  <li key={skill.ID} className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">{skill.PREFERREDLABEL}</span>: {skill.DESCRIPTION}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No optional skills found for this occupation.</li>
              )}
            </ul>
          </div>
          
          {/* Related Occupations */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-purple-600">Related Occupations</span>
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {results.relatedOccupations.length > 0 ? (
                results.relatedOccupations.map(occ => (
                  <li key={occ.id} className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">{occ.label}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No related occupations found.</li>
              )}
            </ul>
          </div>

          {/* Related Skills */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-orange-600">Related Skills</span>
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {results.relatedSkills.length > 0 ? (
                results.relatedSkills.map(skill => (
                  <li key={skill.ID} className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">{skill.PREFERREDLABEL}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No related skills found.</li>
              )}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default SearchOccupations;
