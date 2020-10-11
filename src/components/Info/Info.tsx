import React from "react";
import "./Info.css";
import styled from "styled-components";

interface InputProps {
  content: string | number;
  title?: string;
}

interface StyledProps {
  boldContent?: boolean;
  boldTitle?: boolean;
  textAlign?: string;
}

const Wrapper = styled.div<StyledProps>`
  text-align: ${(props) => props.textAlign || "left"};
`;

const Title = styled.p<StyledProps>`
  font-weight: ${(props) => (props.boldTitle ? "bold" : "normal")};
`;

const Content = styled.p<StyledProps>`
  font-weight: ${(props) => (props.boldContent ? "bold" : "normal")};
`;

const Info: React.FC<InputProps & StyledProps> = (props) => {
  return (
    <Wrapper className="info" textAlign={props.textAlign}>
      {props.title && (
        <Title boldTitle={props.boldTitle} className="title">
          {props.title}:&nbsp;
        </Title>
      )}
      <Content boldContent={props.boldContent} className="content">
        {props.content}
      </Content>
    </Wrapper>
  );
};

export default Info;
