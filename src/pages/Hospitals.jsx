import React, { useState } from 'react';
import './Hospitals.css'; // Ensure this path is correct

// Import images from the correct path
import srikaraImage from '../Assets/srikara.jpg';
import TulasiImage from '../Assets/Tulasi.jpeg';
import sooryaImage from '../Assets/soorya.jpg';
import jpImage from '../Assets/jp.avif'; 
import sparkImage from '../Assets/spark.jpg'; 
import ankuraImage from '../Assets/ankura.jpeg'; 
import yashodaImage from '../Assets/yashoda.jpg'; 
import kimsImage from '../Assets/kims.jpg'; 
import apolloImage from '../Assets/apollo.jpg'; 
import abhayaImage from '../Assets/abhaya.png'; 
import alroyceImage from '../Assets/alroyce.webp'; 
import signImage from '../Assets/sign.png'; 
import nakshatraImage from '../Assets/nakshatra.png';
import kamineniImage from '../Assets/kamineni.jpg';
import ozoneImage from '../Assets/ozone.jpg';
import prasadImage from '../Assets/prasad.jpg';
import remedyImage from '../Assets/remedy.jpg';
import omniImage from '../Assets/omni.jpg';
import motherhoodImage from '../Assets/motherhood.jpeg';
import rishithaImage from '../Assets/rishitha.webp';
import ramadeviImage from '../Assets/ramadevi.jpg';
import lifesaveImage from '../Assets/lifesave.jpg';
import nithinImage from '../Assets/nithin.avif';
import ssImage from '../Assets/ss.jpg';
import vijayaImage from '../Assets/vijaya.jpg';
import trinityImage from '../Assets/trinity.jpg';
import jananiImage from '../Assets/janani.jpg';
import vivekanandaImage from '../Assets/vivekananda.jpg';
import medicoverImage from '../Assets/medicover.webp';
import oxycareImage from '../Assets/oxycare.jpeg';

// Sample area data
const areaData = [
  { id: 1, name: 'ECIL' },
  { id: 2, name: 'UPPAL' },
  { id: 3, name: 'SECUNDERABAD' },
  { id: 4, name: 'RAMPALLY' },
  { id: 5, name: 'LB NAGAR' },
  { id: 6, name: 'KUKATPALLY' },
  { id: 7, name: 'MOULALI' },
  { id: 8, name: 'KEESARA' },
  { id: 9, name: 'NAGARAM' },
  { id: 10, name: 'BEGUMPET' }
];

// Updated hospitalData including the new hospitals for each area
const hospitalData = {
  1: [
    { id: 1, name: 'Srikara Hospitals', image: srikaraImage, address: '1-7-100, ECIL Cross Roads, South Kamala Nagar, Kamalanagar, Moula Ali, Secunderabad, Telangana 500062' },
    { id: 2, name: 'Tulasi Hospitals Multi Super Speciality', image: TulasiImage, address: 'ECIL Cross Roads, near by Hero showroom, Kushaiguda Industrial Area, Kushaiguda, Hyderabad, Secunderabad, Telangana 500062' },
    { id: 3, name: 'Soorya Hospitals', image: sooryaImage, address: 'B,B, SOORYA HOSPITALS, 4, 1, ECIL Main Rd, opposite Round building, North Kamala Nagar, Kushaiguda, Hyderabad, Secunderabad, Telangana 500062' }
  ],
  2: [
    { id: 4, name: 'JP Hospital', image: jpImage, address: 'Sri Sai Nagar, Canara Nagar, Peerzadiguda, Hyderabad, Telangana 500039' },
    { id: 5, name: 'Spark Hospital', image: sparkImage, address: 'Peerzadiguda Plot No. 2&3, Pillar No 51, Hyderabad - Warangal - Bhopalpatnam Hwy, opp. Hanuman Temple, beside Axis Bank, Peerzadiguda, Hyderabad, Telangana 500039' },
    { id: 6, name: 'Ankura Hospital For Women', image: ankuraImage, address: 'Metro Pillar Number 788, opposite NH65, Bagh Ameer, Sumitra Nagar Colony, Kukatpally, Hyderabad, Telangana 500072' }
  ],
  3: [
    { id: 7, name: 'Yashoda Hospital', image: yashodaImage, address: 'Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad, Telangana 500003' },
    { id: 8, name: 'KIMS Hospital', image: kimsImage, address: '1-8-31/1, Minister Rd, Krishna Nagar, Krishna Nagar Colony, Ramgopalpet, Secunderabad, Hyderabad, Telangana 500003' },
    { id: 9, name: 'Apollo Hospital', image: apolloImage, address: 'Pollicetty Towers, Regimental Bazaar, Shivaji Nagar, Secunderabad, Telangana 500025' }
  ],
  4: [
    { id: 10, name: 'Siri Abhaya Hospital', image: abhayaImage, address: 'IG Colony Rd, Sripuram Colony, NFC Employees Colony, Rampally, Ghatkesar, Secunderabad, Telangana 501301' },
    { id: 11, name: 'Sign Multi Speciality Hospital', image: signImage, address: 'H.No: 11-4/2, R.L.Nagar Main Road Rampally, Keesara Mandal, Nagaram, opposite to Reliance Delivery Smart point, Hyderabad, Telangana 501301' },
    { id: 12, name: 'Alroyce Hospital', image: alroyceImage, address: 'Plot No. 6-1, 04, Keesara Gatkesaar Road, Rampally, Secunderabad, Telangana 501301' }
  ],
  5: [
    { id: 13, name: 'Nakshatra Hospitals', image: nakshatraImage, address: 'LB Nagar - Uppal Rd, opp. Swagath Grand Hotel, East Yadav Nagar, Ramakrishnapuram, Nagole, Hyderabad, Telangana 500035' },
    { id: 14, name: 'Kamineni Hospitals', image: kamineniImage, address: 'Inner Ring Rd, Suryodaya Colony, Sarvodaya Colony, Central Bank Colony, L. B. Nagar, Hyderabad, Telangana 500068' },
    { id: 15, name: 'Ozone Hospitals', image: ozoneImage, address: '25, Rd Number 1, Narsimha Puri Colony, Huda Colony, Kothapet, Hyderabad, Telangana 500035' }
  ],
  6: [
    { id: 16, name: 'Prasad Hospitals', image: prasadImage, address: '44-617/12, IDA, behind Telephone Exchange, Nacharam, Secunderabad, Telangana 500076' },
    { id: 17, name: 'Remedy Hospital', image: remedyImage, address: 'Road No. 4, opp. Chandana Brothers Show Room, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072' },
    { id: 18, name: 'OMNI Hospital', image: omniImage, address: 'Plot No.W-11,B-9, Sy. No.9/1/A, Kothapet Rd, near SVC Cinema Theatre, opp. PVT Market Building, Dilsukhnagar, Hyderabad, Telangana 500036' }
  ],
  7: [
    { id: 19, name: 'MotherHood Hospitals', image: motherhoodImage, address: ' Moula Ali Rd, APHB Colony, Laxmi Nagar, Moula Ali, Secunderabad, Telangana 500040' },
    { id: 20, name: 'Rishitha Hospital', image: rishithaImage, address: '4-19-6/1, Chilkur Balaji Temple Rd, beside Reliance Mart & HP Petrol Bunk, Abhyudaya Nagar, Suncity, Bandlaguda Jagir, Telangana 500086' },
    { id: 21, name: 'Ramadevi Hospital', image: ramadeviImage, address: 'MIG-H-97, Ambica Towers, Moula Ali Rd, MJ Colony, Moula Ali, Secunderabad, Telangana 500040' }
  ],
  8: [
    { id: 22, name: 'LIFESAVE Multi-Speciality Hospital', image: lifesaveImage, address: 'busstop, Keesara, Hyderabad, Telangana 501301' },
    { id: 23, name: 'Nithin Hospitals', image: nithinImage, address: 'ECIL - Keesara Rd, Keesara, Secunderabad, Telangana 501301' },
    { id: 24, name: 'S.S. Hospitals', image: ssImage, address: 'H.no. 1-6-60/c, Near DEO Office, Yerra Galli, Rethibowli, Malkajgiri, Secunderabad, Telangana 500047' }
  ],
  9: [
    { id: 25, name: 'Vijaya Hospitals', image: vijayaImage, address: 'Malkajgiri, Secunderabad, Telangana 500047' },
    { id: 26, name: 'Trinity Hospitals', image: trinityImage, address: 'Buddha Nagar, Malkajgiri, Hyderabad, Telangana 500047' },
    { id: 27, name: 'Janani Hospital', image: jananiImage, address: '1-9-93, Buddha Nagar, Hyderabad, Telangana 500047' }
  ],
  10: [
    { id: 28, name: 'Vivekananda Hospital', image: vivekanandaImage, address: 'Suraram X Road, Kothapet, Hyderabad, Telangana 500059' },
    { id: 29, name: 'Medicover Hospital', image: medicoverImage, address: '3, Rd No. 10, Anandbagh, Malkajgiri, Hyderabad, Telangana 500047' },
    { id: 30, name: 'Oxycare Hospital', image: oxycareImage, address: 'Kothapet X Road, Hyderabad, Telangana 500059' }
  ]
};

const Hospitals = () => {
  const [selectedArea, setSelectedArea] = useState(null);

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  return (
    <div className="hospitals">
      <h1>Hospitals</h1>
      <label htmlFor="area-select">Select an area:</label>
      <select id="area-select" onChange={handleAreaChange}>
        <option value="">--Select Area--</option>
        {areaData.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>

      {selectedArea && (
        <div className="hospital-list">
          {hospitalData[selectedArea].map((hospital) => (
            <div key={hospital.id} className="hospital-card">
              <img src={hospital.image} alt={hospital.name} />
              <h3>{hospital.name}</h3>
              <p>{hospital.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hospitals;
