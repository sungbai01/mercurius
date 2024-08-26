import { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// 하이픈을 자동으로 삽입하는 함수
const formatSafeNumber = (number) => {
  if (!number) return number;

  // 예시: 하이픈을 삽입하는 규칙을 정의
  // 이 예제에서는 (XXX) XXX-XXXX 형식으로 변환
  return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

const useFetchData = (uid, key, inputValue) => {
  const [isMatch, setIsMatch] = useState(null);
  const [safeNumber, setSafeNumber] = useState(null);
  const [logo, setLogo] = useState(null);
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inputValue === null) return;

    const fetchData = async () => {
      try {
        const docRef = doc(db, '1011', uid, 'private', 'HMAC');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const fieldData = data[inputValue];

          const match = fieldData === key;
          setIsMatch(match);

          if (match) {
            const infoDocRef = doc(db, '1011', uid, 'public', 'Information');
            const infoDocSnap = await getDoc(infoDocRef);

            if (infoDocSnap.exists()) {
              const infoData = infoDocSnap.data();
              setSafeNumber(formatSafeNumber(infoData.SafeNumber)); // 하이픈 삽입
              setLogo(infoData.Logo);
              setText(infoData.Text);
            } else {
              setSafeNumber(null);
              setLogo(null);
              setText(null);
            }
          } else {
            setSafeNumber(null);
            setLogo(null);
            setText(null);
          }
        } else {
          setIsMatch(false);
          setSafeNumber(null);
          setLogo(null);
          setText(null);
        }
      } catch (error) {
        console.error('Error getting document:', error);
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

  return { isMatch, safeNumber, logo, text, loading };
};

export default useFetchData;
