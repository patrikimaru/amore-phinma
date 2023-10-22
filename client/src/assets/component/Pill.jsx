import React from "react";
import { useState } from "react";

const Pill = ({ txt, def, hover }) => {
  const [show, setShow] = useState(false);

  return (
    <pill onMouseOut={() => setShow(false)} onMouseOver={() => setShow(true)}>
      {show ? (
        <img src={hover} alt="hover" className="pill-hover" />
      ) : (
        <img src={def} alt="default" className="pill-default" />
      )}
      {txt}
    </pill>
  );
};

export default Pill;
