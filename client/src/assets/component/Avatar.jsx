import React from "react";
import { useState } from "react";

const Avatar = ({ src, alt }) => {
  const [style, setStyle] = useState();
  const select = {
    border: "3px solid #df1463",
  };

  return (
    <avatar>
      <img
        src={src}
        alt={alt}
        style={style}
        onMouseOut={() => setStyle(null)}
        onMouseOver={() => setStyle(select)}
      />
    </avatar>
  );
};

export default Avatar;
