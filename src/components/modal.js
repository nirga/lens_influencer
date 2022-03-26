import React, { useState } from "react";
import classNames from "classnames";

import VerifyForm from "./verify-form";

const Modal = (props) => {
  const background = React.createRef();
  const [visible, toggleVisibility] = useState(true);

  const handleClick = (event) => {
    event.preventDefault();
    toggleVisibility(false);
    setTimeout(props.onClose, 500);
  };

  return (
    <div
      className={classNames({
        "text-black-900 fixed inset-0 flex align-middle justify-center z-30 mx-auto transform transition-all ease-in-out duration-500 animate-opacity-0-to-1": true,
        "opacity-100": visible,
        "opacity-0": !visible,
      })}
      role="dialog"
    >
      <div
        className={classNames({
          "w-2/3 h-auto my-auto z-50 px-8 pt-2 pb-16 max-w-4xl shadow-2xl bg-white transform transition-all duration-500 ease-in-out sm:px-12 animate-translate-y-top-full-animation": true,
          "translate-y-0": visible,
          "-translate-y-full": !visible,
        })}
      >
        <button
          onClick={handleClick}
          className="block ml-auto text-5xl font-light trasnform transition-colors duration-150 active:text-blue-200 focus:outline-none hover:text-blue-500"
        >
          ×
        </button>
        <div className="mt-6">
          <VerifyForm
            contract={props.contract}
            toggleVisibility={toggleVisibility}
          />
        </div>
      </div>
      <button
        className="fixed w-full z-30 bg-grayish block inset-0 outline-none cursor-default"
        onMouseDown={handleClick}
        ref={background}
        aria-label="Close modal"
      />
    </div>
  );
};

export default Modal;
