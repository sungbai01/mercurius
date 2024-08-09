// App.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const App = () => {
  const { uid, key } = useParams();
  const [fieldData, setFieldData] = useState(null);
  const [isMatch, setIsMatch] = useState(null);
  const [safeNumber, setSafeNumber] = useState(null); 
  const [logo, setLogo] = useState(null);
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    // 유닉스 타임을 계산하여 inputValue를 설정하는 함수
    const calculateUnixDay = () => {
      const unixTime = Math.floor(Date.now() / 1000); // 현재 유닉스 타임(초)
      const baseUnixTime = 946652400; // 2000년 01월 01일 00:00:00의 유닉스 타임 (초)
      const daysSinceBase = Math.floor((unixTime - baseUnixTime) / 86400); // 경과된 날의 수 계산
      return daysSinceBase.toString(); // 필드 키로 사용하기 위해 문자열로 변환
    };

    setInputValue(calculateUnixDay());
  }, []);

  useEffect(() => {
    if (inputValue === null) return;

    const fetchData = async () => {
      try {
        const docRef = doc(db, '1011', uid, 'private', 'HMAC');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const fieldData = data[inputValue]; // 유닉스 타임 기반 필드 접근
          setFieldData(fieldData);

          const match = fieldData === key;
          setIsMatch(match);

          if (match) {
            const infoDocRef = doc(db, '1011', uid, 'public', 'Information');
            const infoDocSnap = await getDoc(infoDocRef);

            if (infoDocSnap.exists()) {
              const infoData = infoDocSnap.data();
              setSafeNumber(infoData.SafeNumber);
              setLogo(infoData.Logo);
              setText(infoData.Text);
            } else {
              console.log('No such Information document!');
              setSafeNumber(null);
              setLogo(null);
              setText(null);
            }
          }
        } else {
          console.log('No such document!');
          setFieldData(null);
          setIsMatch(false);
          setSafeNumber(null);
          setLogo(null);
          setText(null);
        }
      } catch (error) {
        console.error('Error getting document:', error);
        setFieldData(null);
        setIsMatch(false);
        setSafeNumber(null);
        setLogo(null);
        setText(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uid, key, inputValue]);

  return (
    <div>
      <h2>test section</h2>
      <p><strong>URL UID:</strong> {uid}</p>
      <p><strong>URL Key:</strong> {key}</p>
      <p><strong>Calculated Field Key (days since 2000-01-01):</strong> {inputValue}</p>
      <p><strong>Field Data:</strong> {loading ? 'Loading...' : fieldData ? fieldData : 'No data available'}</p>
      <p><strong>Match Status:</strong> {isMatch !== null ? (isMatch ? 'true' : 'false') : 'N/A'}</p>
      {isMatch && (
        <>
          <p><strong>Logo:</strong> {logo ? logo : 'No logo available'}</p>
          <p><strong>SafeNumber:</strong> {safeNumber !== null ? safeNumber : 'No SafeNumber available'}</p>
          <p><strong>Text:</strong> {text !== null ? text : 'No text available'}</p>
        </>
      )}
    </div>
  );
};

export default App;
