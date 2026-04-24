import React from "react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 0"
      }}
    >
      <div
        style={{
          width: "18px",
          height: "18px",
          border: "3px solid #ddd",
          borderTop: "3px solid #333",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />
      <span>{text}</span>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;