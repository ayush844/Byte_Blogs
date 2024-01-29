/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { dark } from "./Styles/Theme";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import CoverVideo from "../Components/CoverVideo";
import LocomotiveScroll from "locomotive-scroll";
import { TbBrandGithubFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const Home = () => {
  const containerRef = useRef(null);

  const scroll = new LocomotiveScroll();

  return (
    <ThemeProvider theme={dark}>
      <LocomotiveScrollProvider
        options={{
          smooth: true,
          // ... all available Locomotive Scroll instance options
        }}
        watch={
          [
            //..all the dependencies you want to watch to update the scroll.
            //  Basicaly, you would want to watch page/location changes
            //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
          ]
        }
        containerRef={containerRef}
      >
        <main data-scroll-container className="App" ref={containerRef}>
          <Section data-scroll-section>
            <CoverVideo />
          </Section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="https://github.com/ayush844">
              <TbBrandGithubFilled
                style={{ fontSize: "2rem", color: "#ED5AB3" }}
              />
            </Link>
          </div>
        </main>
      </LocomotiveScrollProvider>
    </ThemeProvider>
  );
};

export default Home;
