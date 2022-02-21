import React from 'react';
import '../assets/css/Loading.css';

function Loading() {
  return (
    <div className="lds-spinner-container">
      {/* https://loading.io/css */}
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loading;
