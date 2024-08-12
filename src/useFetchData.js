// useFetchData.js
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

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
              setSafeNumber(infoData.SafeNumber);
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
