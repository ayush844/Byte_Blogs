import React from "react";
import styled from "styled-components";
import MainVideo from "../assets/MainVideo.mp4";

const VideoContainer = styled.section`
  margin-left: 1.5rem;
  width: 100vw;
  height: 100vh;
  position: relative;

  video {
    height: 100vh;
    object-fit: cover;
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  background-color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.5)`};
`;

const Title = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text};

  div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  h1 {
    font-family: "Black Ops One", system-ui;
    font-size: 8em;
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};
  }

  h2 {
    font-family: "Teko", sans-serif;
    font-size: ${(props) => props.theme.fontxl};
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};
    text-transform: capitalize;
    font-weight: 300;
  }

  @media (max-width: 600px) {
    div {
      margin-right: 0; // Remove margin on smaller screens
      flex-wrap: wrap;
    }
    h1 {
      font-size: 3em;
    }
    h2 {
      font-size: ${(props) => props.theme.fontmd};
    }
  }
`;

const CoverVideo = () => {
  return (
    <VideoContainer>
      <DarkOverlay />
      <Title>
        <div>
          <h1 data-scroll data-scroll-delay="0.13" data-scroll-speed="4">
            B
          </h1>
          <h1 data-scroll data-scroll-delay="0.09" data-scroll-speed="4">
            Y
          </h1>
          <h1 data-scroll data-scroll-delay="0.06" data-scroll-speed="4">
            T
          </h1>
          <h1 data-scroll data-scroll-delay="0.04" data-scroll-speed="4">
            E
          </h1>
          <h1 data-scroll data-scroll-delay="0.02" data-scroll-speed="4">
            &nbsp;
          </h1>
          <h1 data-scroll data-scroll-delay="0.005" data-scroll-speed="4">
            B
          </h1>
          <h1 data-scroll data-scroll-delay="0.003" data-scroll-speed="4">
            L
          </h1>
          <h1 data-scroll data-scroll-delay="0.001" data-scroll-speed="4">
            O
          </h1>
          <h1 data-scroll data-scroll-delay="0.0008" data-scroll-speed="4">
            G
          </h1>
          <h1 data-scroll data-scroll-delay="0.0004" data-scroll-speed="4">
            S
          </h1>
        </div>
        <h2>Insights Unveiled, Stories Explored</h2>
      </Title>

      <video
        src={MainVideo}
        type="video/mp4"
        autoPlay
        muted
        loop
        style={{ width: "100%" }}
      />
    </VideoContainer>
  );
};

export default CoverVideo;
