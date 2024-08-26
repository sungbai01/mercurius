import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from './useFetchData';
import './App.css'; // CSS 파일 불러오기
import logo1011 from './Logos/1011Logo.png';

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
    <div>
            <div className="header">
                <img src={logo1011} alt="1011logo" />
                <div className="logo-text">Mercurius</div>
            </div>
            <div className="main-container">
                <div className="main-text">
                    안심번호를 통해 안전하게 연결됩니다
                </div>
                <div className="textdata">
                {text !== null ? text : 'No text available'}
                </div>
                <div className="safetynumberBox">
                <p> {safeNumber !== null ? safeNumber : 'No SafeNumber available'}</p>
                </div>
            </div>
        </div>
  );
};

export default App;
