import React from "react";
import "./Modal.css";
export default function Modal(props) {
  return (
    <>
    {props.show ? <div className='Backdrop'></div> : null}
      <div
        className="Modal"
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? 1 : 0,
        }}
      >
        {props.children}
      </div>
    </>
  );
}
