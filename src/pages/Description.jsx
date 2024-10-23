import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './Description.css'; // Import the CSS file

const Description = () => {
  const [csvData, setCsvData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch('/description.csv'); // Relative URL
      const text = await response.text();

      // Parse the CSV data
      Papa.parse(text, {
        header: true, // Set to true if your CSV has headers
        complete: (result) => {
          setCsvData(result.data); // Update state with parsed data
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    };

    fetchCSV();
  }, []); // Empty dependency array to run once on mount

  // Filter data based on search term
  const filteredData = csvData.filter(row => {
    return Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="description-container">
      <h1>Disease description</h1>
      
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredData.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              {Object.keys(filteredData[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default Description;
