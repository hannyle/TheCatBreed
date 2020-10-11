import React from "react";
import "./Picture.css";

interface InputProps {
  imgSrc?: string;
}

const Picture: React.FC<InputProps> = (props) => {
  return <img src={props.imgSrc} alt="Cat_picture" />;
};

export default Picture;
