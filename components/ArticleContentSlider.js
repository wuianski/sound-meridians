import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Slider from "react-slick";

import TextTemplate from "../components/TextTemplate";
import TextImageTemplate from "../components/TextImageTemplate";
import TimelineTemplate from "../components/TimelineTemplate";
import ImageTemplate from "../components/ImageTemplate";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

/*************/
/*** delay ***/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ArticleContentSlider({
  article_content,
  useLang,
  sliderRef,
}) {
  //const sliderRef = useRef();
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        //className={className}
        style={{
          ...style,
          display: "block",
          color: "#ff0000",
          position: "absolute",
          right: 0,
          top: 20,
        }}
        onClick={onClick}
      >
        next
      </div>
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        //className={className}
        style={{
          ...style,
          display: "block",
          background: "#00415E",
          borderRadius: "50%",
          color: "#ff0000",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          background: "none",
          borderRadius: "10px",
          padding: "0px",
          position: "absolute",
          bottom: "0px",
        }}
      >
        <ul>
          <Box
            sx={{
              marginBottom: "6px",
              marginLeft: { xs: "-48px", md: "-16px" },
            }}
          >
            {dots}
          </Box>
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "30px",
          height: "30px",
          color: "#fff",
          border: "0.5px #fff solid",
          borderRadius: "30px",
        }}
      >
        {i + 1}
      </div>
    ),
  };

  /*****************/
  /*** particles ***/
  const particlesInit = useCallback(async (engine) => {
    //console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    //await console.log(container);
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          borderRight: "1px solid #000",
          position: "relative",
          width: "100%",
          height: "70vh",
          top: 0,
          //overflow: "hidden",
        }}
      >
        {/*** vvv articles ***/}

        {article_content.articles &&
          article_content.articles.map((article) => (
            <Box key={article.id}>
              <Box
                sx={{
                  // backgroundColor: "#000",
                  background: "none",
                  color: "#fff",
                  // borderRight: "1px solid #000",
                  width: {
                    xs: "calc(100vw - 60px)",
                    md: "calc(100vw - 252px)",
                  },
                  //width: "calc(100vw - 252px)", //-252px will see arrow, -200px will not see
                }}
              >
                {/*** particles ***/}
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Particles
                    /* make id different */
                    id="tsparticless"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                      particles: {
                        color: {
                          value: "#ffffff",
                        },
                        links: {
                          color: "#ffffff",
                          distance: 150,
                          enable: true,
                          opacity: 0.5,
                          width: 1,
                        },
                        collisions: {
                          enable: true,
                        },
                        move: {
                          directions: "none",
                          enable: true,
                          outModes: {
                            default: "bounce",
                          },
                          random: false,
                          speed: 1,
                          straight: false,
                        },
                        number: {
                          density: {
                            enable: true,
                            area: 800,
                          },
                          value: 20,
                        },
                        opacity: {
                          value: 0.5,
                        },
                        shape: {
                          type: "circle",
                        },
                        size: {
                          value: { min: 1, max: 5 },
                        },
                      },
                      detectRetina: true,
                    }}
                  />
                </Box>
                {/*** vvv each article's contents ***/}
                <Slider {...settings} ref={sliderRef}>
                  {article.articles_id &&
                    article.articles_id.contents.map((contents) => (
                      <Box key={contents.articleContents_id.id}>
                        <Box
                          sx={{
                            width: "100%",
                            height: { xs: "calc(97vh - 100px)", md: "100vh" },
                          }}
                        >
                          {/*** vvv each article's content of text template ***/}
                          {contents.articleContents_id.contentType == 1 && (
                            <>
                              <TextTemplate
                                article_content={contents.articleContents_id}
                                useLang={useLang}
                              />
                            </>
                          )}
                          {/*** vvv each article's content of text and image template ***/}
                          {contents.articleContents_id.contentType == 3 && (
                            <>
                              <TextImageTemplate
                                article_content={contents.articleContents_id}
                                useLang={useLang}
                              />
                            </>
                          )}
                          {/*** vvv each article's content of timeline template ***/}
                          {contents.articleContents_id.contentType == 4 && (
                            <>
                              <TimelineTemplate
                                article_content={contents.articleContents_id}
                                useLang={useLang}
                              />
                            </>
                          )}
                          {/*** vvv each article's content of image template ***/}
                          {contents.articleContents_id.contentType == 2 && (
                            <>
                              <ImageTemplate
                                article_content={contents.articleContents_id}
                                useLang={useLang}
                              />
                            </>
                          )}
                        </Box>
                      </Box>
                    ))}
                </Slider>
              </Box>
            </Box>
          ))}
      </Box>

      {/* <Box sx={{ position: "absolute", bottom: 0 }}>
        <Box mt={"-36.95px"} pr={1} sx={{ width: 260, textAlign: "right" }}>
          <KeyboardArrowRightSharpIcon
            onClick={() => sliderRef.current.slickNext()}
            sx={{ cursor: "pointer", color: "#000", fontSize: "xx-large" }}
          />
        </Box>
      </Box> */}
    </>
  );
}
