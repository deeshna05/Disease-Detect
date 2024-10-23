import React, { useState } from 'react';
import axios from 'axios';
import './Symptoms.css';

const Symptoms = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [medicines, setMedicines] = useState({});
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const symptomsList = [
    'Itching', 'Skin rash', 'Nodal skin eruptions', 'dischromic patches', 'Continuous sneezing',
    'Shivering', 'Chills', 'Watering from eyes', 'Stomach pain', 'Acidity', 'Ulcers on tongue',
    'Vomiting', 'Cough', 'Chest pain', 'Yellowish skin', 'Nausea', 'Loss of appetite', 'Abdominal pain',
    'Yellowing of eyes', 'Burning micturition', 'Spotting urination', 'Passage of gases', 'Internal itching',
    'Indigestion', 'Muscle wasting', 'Patches in throat', 'High fever', 'Extra marital contacts', 'Fatigue',
    'Weight loss', 'Restlessness', 'Lethargy', 'Irregular sugar level', 'Blurred and distorted vision',
    'Obesity', 'Excessive hunger', 'Increased appetite', 'Polyuria', 'Sunken eyes', 'Dehydration', 'Diarrhoea',
    'Breathlessness', 'Family history', 'Mucoid sputum', 'Headache', 'Dizziness', 'Loss of balance',
    'Lack of concentration', 'Stiff neck', 'Depression', 'Irritability', 'Visual disturbances', 'Back pain',
    'Weakness in limbs', 'Neck pain', 'Weakness of one body side', 'Altered sensorium', 'Dark urine',
    'Sweating', 'Muscle pain', 'Mild fever', 'Swelled lymph nodes', 'Malaise', 'Red spots over body',
    'Joint pain', 'Pain behind the eyes', 'Constipation', 'Toxic look (typhos)', 'Belly pain', 'Yellow urine',
    'Receiving blood transfusion', 'Receiving unsterile injections', 'Coma', 'Stomach bleeding',
    'Acute liver failure', 'Swelling of stomach', 'Distention of abdomen', 'History of alcohol consumption',
    'Fluid overload', 'Phlegm', 'Blood in sputum', 'Throat irritation', 'Redness of eyes', 'Sinus pressure',
    'Runny nose', 'Congestion', 'Loss of smell', 'Fast heart rate', 'Rusty sputum', 'Pain during bowel movements',
    'Pain in anal region', 'Bloody stool', 'Irritation in anus', 'Cramps', 'Bruising', 'Swollen legs',
    'Swollen blood vessels', 'Prominent veins on calf', 'Weight gain', 'Cold hands and feet', 'Mood swings',
    'Puffy face and eyes', 'Enlarged thyroid', 'Brittle nails', 'Swollen extremities', 'Abnormal menstruation',
    'Muscle weakness', 'Anxiety', 'Slurred speech', 'Palpitations', 'Drying and tingling lips', 'Knee pain',
    'Hip joint pain', 'Swelling joints', 'Painful walking', 'Movement stiffness', 'Spinning movements',
    'Unsteadiness', 'Pus-filled pimples', 'Blackheads', 'Scurring', 'Bladder discomfort', 'Foul smell of urine',
    'Continuous feel of urine', 'Skin peeling', 'Small dents in nails', 'Inflammatory nails',
    'Blister', 'Red sore around nose'
  ];

  const handleCheckboxChange = (symptom) => {
    setSelectedSymptoms((prevSelected) =>
      prevSelected.includes(symptom)
        ? prevSelected.filter((s) => s !== symptom)
        : [...prevSelected, symptom]
    );
  };

  const handleDetect = async () => {
    try {
      const response = await axios.post('http://localhost:8000/ml_app/predict_disease/', {
        symptoms: selectedSymptoms,
      });

      // Check if any diseases are returned
      if (response.data.error) {
        setError(response.data.error);
        setDiseases([]);
      } else if (response.data.predictions.length === 0) {
        // No diseases found for selected symptoms
        setDiseases([]);
        setError('Unknown disease. Please visit a Doctor');
      } else {
        setDiseases(response.data.predictions);
        setError('');
        setMedicines({});
      }
    } catch (error) {
      console.error('Error detecting disease:', error.response ? error.response.data : error.message);
      setError('Error detecting disease');
    }
  };

  const handleRecommendMedicine = async () => {
    if (diseases.length === 0) {
      setError('Please detect a disease first.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/ml_app/recommend_medicine/', {
        diseases: diseases,
      });

      if (response.data.error) {
        setError(response.data.error);
        setMedicines({});
      } else {
        setMedicines(response.data.medicine);
        setError('');
      }
    } catch (error) {
      console.error('Error recommending medicine:', error.response ? error.response.data : error.message);
      setError('Error recommending medicine');
    }
  };

  const handleClearSelection = () => {
    setSelectedSymptoms([]);
    setDiseases([]);
    setMedicines({});
    setError('');
    setSearchTerm('');
  };

  const filteredSymptoms = symptomsList.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="symptoms-container">
      <h2>Select Symptoms</h2>

      <input
        type="text"
        placeholder="Search symptoms..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      <div className="symptoms-grid">
        {filteredSymptoms.map((symptom) => (
          <div key={symptom} className="symptom-item">
            <input
              type="checkbox"
              id={`symptom-${symptom}`} 
              checked={selectedSymptoms.includes(symptom)}
              onChange={() => handleCheckboxChange(symptom)}
            />
            <label htmlFor={`symptom-${symptom}`}>{symptom}</label>
          </div>
        ))}
      </div>

      {selectedSymptoms.length > 0 && (
        <div className="selected-symptoms">
          <h3>Selected Symptoms:</h3>
          <ul>
            {selectedSymptoms.map((symptom) => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="button-group">
        <button onClick={handleDetect} className="detect-button">Detect Disease</button>
        <button onClick={handleClearSelection} className="clear-button">Clear</button>
        <button onClick={handleRecommendMedicine} className="recommend-medicine-button">
          Recommend Medicine
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {diseases.length > 0 && (
        <div className="disease-results">
          <h3>Detected Diseases:</h3>
          <ul>
            {diseases.map((disease) => (
              <li key={disease}>{disease}</li>
            ))}
          </ul>
        </div>
      )}
      {Object.keys(medicines).length > 0 && (
        <div className="medicine-recommendations">
          <h3>Recommended Medicines:</h3>
          {diseases.map(disease => (
            <div key={disease}>
              <h4>{disease}:</h4>
              <ul>
                {medicines[disease].map((med) => (
                  <li key={med}>{med}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Symptoms;
