import React, { useState } from "react";

import Modal from "./modal";

const ModalTrigger = (props) => {
  const [isModalOpen, toggleModal] = useState(false);
  const toggle = () => toggleModal(!isModalOpen);

  return (
    <div className={props.className}>
      {React.cloneElement(props.children, {
        onClick: () => toggle(),
      })}
      {isModalOpen && (
        <Modal
          contract={props.contract}
          isOpen={isModalOpen}
          onClose={toggle}
          {...props}
        />
      )}
    </div>
  );
};

export default ModalTrigger;
