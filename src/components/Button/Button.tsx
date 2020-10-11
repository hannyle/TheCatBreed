import React from "react";
import "./Button.css";
import styled from "styled-components";

interface InputProps {
  buttonText: string;
  isDisabled?: boolean;
  onClick: () => void;
}

interface StyledProps {
  isDisabled?: boolean;
}

const Div = styled.div<StyledProps>`
  color: ${(props) => (props.isDisabled ? "var(--white)" : "var(--darkBrown)")};
`;

const Button: React.FC<InputProps & StyledProps> = (props) => {
  return (
    <Div
      className="button"
      isDisabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.buttonText}
    </Div>
  );
};

export default Button;
