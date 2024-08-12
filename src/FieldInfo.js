// FieldInfo.js
import React from 'react';

const FieldInfo = ({ uid, key, inputValue, fieldData, isMatch, loading }) => {
  return (
    <div>
      <p><strong>URL UID:</strong> {uid}</p>
      <p><strong>URL Key:</strong> {key}</p>
      <p><strong>Calculated Field Key (days since 2000-01-01):</strong> {inputValue}</p>
      <p><strong>Field Data:</strong> {loading ? 'Loading...' : fieldData ? fieldData : 'No data available'}</p>
      <p><strong>Match Status:</strong> {isMatch !== null ? (isMatch ? 'true' : 'false') : 'N/A'}</p>
    </div>
  );
};

export default FieldInfo;
