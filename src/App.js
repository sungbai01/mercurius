import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from './useFetchData';
import './App.css'; // CSS 파일 불러오기

const App = () => {
  const { uid, key } = useParams();
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    const calculateUnixDay = () => {
      const unixTime = Math.floor(Date.now() / 1000);
      const baseUnixTime = 946652400; // 2000년 01월 01일 00:00:00의 유닉스 타임 (초)
      const daysSinceBase = Math.floor((unixTime - baseUnixTime) / 86400);
      return daysSinceBase.toString();
    };

    setInputValue(calculateUnixDay());
  }, []);

  const { isMatch, safeNumber, logo, text, loading } = useFetchData(uid, key, inputValue);

  // 동적으로 logo 이미지를 불러오기
  let logoSrc;
  try {
    logoSrc = require(`./Logos/${logo}.svg`); // 로고 이미지 불러오기
  } catch (err) {
    console.error(`Error loading logo: ${logo}`, err);
    logoSrc = null; // 이미지가 없으면 null 설정
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
