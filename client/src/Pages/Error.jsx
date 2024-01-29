import React from "react";
import styled from "styled-components";
import error from "../assets/error.png";

const Wrapper = styled.section`
  padding: 9rem 2rem;
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 3rem;
    color: #ed5ab3;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 2rem;
    }

    img {
      width: 25rem;
    }
  }
`;

const Error = () => {
  return (
    <Wrapper style={{ color: "white" }}>
      <img src={error} alt="error" />
      <h2>PAGE NOT FOUND</h2>
    </Wrapper>
  );
};

export default Error;
