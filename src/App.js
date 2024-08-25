import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from './useFetchData';
import './App.css'; // CSS 파일 불러오기
//24 08 25 9003
const App = () => {
  const { uid, key } = useParams();
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    const calculateUnixDay = () => {
      const unixTime = Math.floor(Date.now() / 1000);
      const baseUnixTime = 946652400;
      const daysSinceBase = Math.floor((unixTime - baseUnixTime) / 86400);
      return daysSinceBase.toString();
    };

    setInputValue(calculateUnixDay());
  }, []);

  const { isMatch, safeNumber, logo, text, loading } = useFetchData(uid, key, inputValue);

  let logoSrc;
  try {
    logoSrc = require(`./Logos/${logo}.svg`);
  } catch (err) {
    console.error(`Error loading logo: ${logo}`, err);
    logoSrc = null;
  }

  return (
    <div className="container">
      <h2>MERCURIUS</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : isMatch ? (
        <div className="data">
          {logoSrc && <img src={logoSrc} alt={`${logo} Logo`} />}
          <p> {safeNumber !== null ? safeNumber : 'No SafeNumber available'}</p>
          <p> {text !== null ? text : 'No text available'}</p>
        </div>
      ) : (
        <p>Data does not match or is unavailable.</p>
      )}
    </div>
  );
};

export default App;
