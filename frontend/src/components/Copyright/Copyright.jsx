import React from "react";
import "./Copyright.css";

export default function Copyright() {
  return (
    <>
      <footer className="bg-light text-center text-lg-start copyright">
        <div className="text-center p-3" style={{ backgroundColor: "#fff" }}>
          Copyright © 2022 All Rights Reserved by{" "}
          <a
            className="text-dark"
            href="https://github.com/rendisagala"
            target={"_blank"}
          >
            @rendisagala
          </a>
        </div>
      </footer>
    </>
  );
}
