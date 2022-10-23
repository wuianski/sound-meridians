import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import SwipeLeftIcon from "@mui/icons-material/SwipeLeft";
import SwipeIcon from "@mui/icons-material/Swipe";
import KeyboardArrowLeftSharpIcon from "@mui/icons-material/KeyboardArrowLeftSharp";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";

/******************/
/*** stack ***/
const Item = styled(Paper)(({ theme }) => ({
  background: "none",
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "#00415E",
}));

export default function ArticleSlider({ project, useLang }) {
  /*******************/
  /*** keen slider ***/
  // const [sliderRef] = useKeenSlider({
  //   initial: 0,
  //   loop: false,
  //   mode: "snap",
  //   rtl: false,
  //   slides: {
  //     //number: 5,
  //     perView: 4,
  //   },
  // });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 4,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(max-width: 900px)": {
        vertical: true,
        slides: { perView: 2 },
      },
    },
  });

  return (
    <>
      <Stack
        direction="row"
        spacing={{ xs: 0, md: 0 }}
        sx={{ backgroundColor: "#BCACA8", borderTop: "1px solid #000" }}
      >
        {/*** row: slider of projects ***/}
        <Item>
          {/*** slider ***/}
          <Box
            sx={{
              backgroundColor: "#BCACA8",
              // width: "calc(100vw - 100px)",
              height: { xs: 100, md: "100vh" },
              color: "#ff0000",
              borderRight: { xs: "1px solid #000", md: "1px solid #000" },
              borderBottom: { xs: "1px solid #000", md: "none" },
              maxWidth: { xs: "calc(100vw - 100px)", md: 260 },
              maxHeight: { xs: 100, md: "100vh" },
            }}
            ref={sliderRef}
            className="keen-slider"
          >
            {project &&
              project.articles.map((article) => (
                <Box key={article.articles_id.id} sx={{ cursor: "pointer" }}>
                  <Link
                    href={`/projects/${project.mainTitle_en}/${article.articles_id.slug}`}
                  >
                    <Box
                      className="keen-slider__slide"
                      sx={{
                        backgroundColor: "#BCACA8",
                        maxWidth: { xs: "calc(100vw - 60px)", md: 56 },
                        minWidth: { xs: "calc(100vw - 60px)", md: 56 },
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "auto",
                          height: { xs: 50, md: "100vh" },
                          color: "#000",
                          writingMode: {
                            xs: "horizontal-tb",
                            md: "vertical-lr",
                          },
                          backgroundColor: "#BCACA8",
                          borderRight: { xs: "none", md: "1px solid #000" },
                          borderBottom: { xs: "1px solid #000", md: "none" },
                          zIndex: 1,
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            left: 8,
                            top: { xs: 8, md: 30 },
                            display: "inline-flex",
                          }}
                        >
                          {useLang == true ? (
                            <Box
                              className="pt"
                              sx={{
                                fontSize: { xs: 16, md: 22 },
                                fontFamily: "Noto Serif JP",
                                fontWeight: 700,
                                lineHeight: 1.4,
                                letterSpacing: { xs: "-0.05em", md: "unset" },
                                textOrientation: "upright",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: article.articles_id.title_tw,
                              }}
                            />
                          ) : (
                            <Box
                              className="pt"
                              sx={{
                                fontSize: { xs: 11, md: 13 },
                                fontFamily: "BioRhyme Expanded",
                                fontWeight: 700,
                                textOrientation: "unset",
                                textTransform: "uppercase",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: article.articles_id.title_en,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </Box>
              ))}
          </Box>
        </Item>
        <Item>
          {/*** pagination desktop ***/}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              bottom: 10,
              right: 0,
            }}
          >
            {loaded && instanceRef.current && (
              <>
                <Box
                  pl={1}
                  ml={{ xs: -2, md: -1 }}
                  sx={{ width: { xs: 60, md: 260 }, textAlign: "left" }}
                >
                  <KeyboardArrowLeftSharpIcon
                    left="true"
                    onClick={(e) =>
                      e.stopPropagation() || instanceRef.current?.prev()
                    }
                    disabled={currentSlide === 0}
                    sx={{
                      cursor: "pointer",
                      color: "#000",
                      fontSize: "xx-large",
                    }}
                  />
                </Box>
                <Box
                  mt={"-36.95px"}
                  pr={{ xs: 1.5, md: 0 }}
                  sx={{ width: { xs: 60, md: 260 }, textAlign: "right" }}
                >
                  <KeyboardArrowRightSharpIcon
                    onClick={(e) =>
                      e.stopPropagation() || instanceRef.current?.next()
                    }
                    disabled={
                      currentSlide ===
                      instanceRef.current.track.details.slides.length - 1
                    }
                    sx={{
                      cursor: "pointer",
                      color: "#000",
                      fontSize: "xx-large",
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
          {/*** pagination mobile ***/}
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              position: "absolute",
              bottom: 10,
              right: 2,
            }}
          >
            {loaded && instanceRef.current && (
              <>
                <Box sx={{ width: { xs: 60, md: 260 }, textAlign: "right" }}>
                  <KeyboardArrowUpSharpIcon
                    left="true"
                    onClick={(e) =>
                      e.stopPropagation() || instanceRef.current?.prev()
                    }
                    disabled={currentSlide === 0}
                    sx={{
                      cursor: "pointer",
                      color: "#000",
                      fontSize: "xx-large",
                    }}
                  />
                </Box>
                <Box sx={{ width: { xs: 60, md: 260 }, textAlign: "right" }}>
                  <KeyboardArrowDownSharpIcon
                    onClick={(e) =>
                      e.stopPropagation() || instanceRef.current?.next()
                    }
                    disabled={
                      currentSlide ===
                      instanceRef.current.track.details.slides.length - 1
                    }
                    sx={{
                      cursor: "pointer",
                      color: "#000",
                      fontSize: "xx-large",
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
        </Item>
      </Stack>
    </>
  );
}
