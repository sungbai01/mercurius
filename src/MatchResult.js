// MatchResult.js
import React from 'react';

const MatchResult = ({ isMatch, logo, safeNumber, text }) => {
  return (
    <>
      {isMatch && (
        <div>
          <p><strong>Logo:</strong> {logo ? logo : 'No logo available'}</p>
          <p><strong>SafeNumber:</strong> {safeNumber !== null ? safeNumber : 'No SafeNumber available'}</p>
          <p><strong>Text:</strong> {text !== null ? text : 'No text available'}</p>
        </div>
      )}
    </>
  );
};

export default MatchResult;
