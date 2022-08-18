import React from "react";

export default function Loading() {
  return (
    <div className="row justify-content-center d-flex p-5 mx-auto">
      <div className="spinner-grow  " role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow  " role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow  " role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
