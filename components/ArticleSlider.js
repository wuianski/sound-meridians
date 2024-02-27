import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import KeyboardArrowLeftSharpIcon from "@mui/icons-material/KeyboardArrowLeftSharp";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { motion } from "framer-motion";

/******************/
/*** stack ***/
const Item = styled(Paper)(({ theme }) => ({
  background: "none",
  boxShadow: "none",
  borderRadius: 0,
  // backgroundColor: "#00415E",
}));

export default function ArticleSlider({ project, useLang }) {
  /*******************/
  /*** keen slider ***/
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    vertical: false,
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
        nitial: 0,
        vertical: true,
        slides: { perView: 2 },
      },
    },
  });

  return (
    <>
      <Stack direction={{ xs: "row-reverse", md: "row" }} spacing={{ xs: 0, md: 0 }}>
        {/*** row: chapter nav  ***/}
        <Item>
          <Box sx={{
            display: { xs: "block", md: "block" },
            height: { xs: 100, md: "100vh" },
            width: 45,
            position: "relative",
            backgroundColor: { xs: "#fff", md: "transparent" }, //#BCACA8
            zIndex: 3,
          }}>
            {loaded && instanceRef.current && (
              <>
                <Box pt={{ xs: 0, md: 3 }} pb={{ xs: 0, md: 3 }}
                  sx={{
                    position: "absolute",
                    top: { xs: 0, md: 0 },
                    bottom: { xs: "unset", md: "unset" },
                    right: 0,
                    fontSize: 17,
                    display: "inline-flex",
                    backgroundColor: "#BCACA8",
                    borderLeft: "1px solid #000",
                    borderBottom: "1px solid #000",
                    borderRight: { xs: "1px solid #000", md: "none" },
                    borderTop: { xs: "none", md: "none" },
                    height: { xs: 100, md: "100vh" },

                  }}>
                  <Stack direction="column" spacing={{ xs: 0, md: 0 }}>
                    <Item>
                      {/*** Desktop: prev btn ***/}
                      <Box
                        sx={{
                          display: { xs: "none", md: "block" },
                          width: 45,
                          height: 30,
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={(e) =>
                          e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={currentSlide === 0}
                      >
                        <KeyboardArrowLeftSharpIcon
                          left="true"
                          sx={{
                            color: "#000",
                            fontSize: "xx-large",
                          }}
                        />
                      </Box>
                      {/*** Mobile: prev btn ***/}
                      <Box
                        sx={{
                          display: { xs: "block", md: "none" },
                          width: { xs: 45, md: 260 },
                          height: 50,
                          textAlign: "center",
                          backgroundColor: "#BCACA8",
                        }}
                        pt={1}
                        pr={1}
                      >
                        <KeyboardArrowUpSharpIcon
                          left="true"
                          onClick={(e) =>
                            e.stopPropagation() ||
                            instanceRef.current?.prev()
                          }
                          disabled={currentSlide === 0}
                          sx={{
                            cursor: "pointer",
                            color: "#000",
                            fontSize: "xx-large",
                          }}
                        />
                      </Box>
                    </Item>
                    <Item>
                      {/*** Desktop: next btn ***/}
                      <Box
                        sx={{
                          display: { xs: "none", md: "block" },
                          width: 45,
                          height: 30,
                          textAlign: "center",
                          cursor: "pointer",
                          zIndex: 3
                        }}
                        onClick={(e) =>
                          e.stopPropagation() || instanceRef.current?.next()
                        }
                        disabled={
                          currentSlide ===
                          instanceRef.current.track.details.slides.length - 1
                        }
                      >
                        <KeyboardArrowRightSharpIcon
                          sx={{
                            color: "#000",
                            fontSize: "xx-large",
                          }}
                        />
                      </Box>
                      {/*** Mobile: next btn ***/}
                      <Box
                        sx={{
                          display: { xs: "block", md: "none" },
                          width: { xs: 45, md: 260 },
                          height: 49,
                          textAlign: "center",
                          backgroundColor: "#BCACA8",
                        }}
                        pt={1}
                        pr={1}
                      >
                        <KeyboardArrowDownSharpIcon
                          onClick={(e) =>
                            e.stopPropagation() ||
                            instanceRef.current?.next()
                          }
                          disabled={
                            currentSlide ===
                            instanceRef.current.track.details.slides
                              .length -
                            1
                          }
                          sx={{
                            cursor: "pointer",
                            color: "#000",
                            fontSize: "xx-large",
                          }}
                        />
                      </Box>

                    </Item>
                    <Item>
                      <Box sx={{ display: { xs: "none", md: "block" }, width: 45, }}>
                        <Box pt={2} sx={{ writingMode: "vertical-lr", color: "#000", marginLeft: "13px", textTransform: "uppercase", fontFamily: "Noto Sans JP", fontSize: 14, }}>
                          chapter nav
                        </Box>
                      </Box>
                    </Item>
                  </Stack>
                </Box>
              </>
            )}

          </Box>
        </Item>
        {/*** row: slider of projects ***/}
        <Item>
          {/*** slider ***/}
          <Box
            sx={{
              backgroundColor: "#fff",
              width: { xs: "calc(100vw - 100px)", md: 224 },
              height: { xs: 100, md: "100vh" },
              color: "#ff0000",
              minWidth: { xs: "calc(100vw - 100px)", md: 224 },
              maxWidth: { xs: "calc(100vw - 100px)", md: 224 },
              minHeight: { xs: 100, md: "100vh" },
              maxHeight: { xs: 100, md: "100vh" },
              borderTop: { xs: "none", md: "none" },
              borderBottom: { xs: "1px solid #000", md: "none" },
            }}
            ref={sliderRef}
            className="keen-slider"
          >
            {project &&
              project.articles.map((article) => (
                <Box key={article.articles_id.id} sx={{ cursor: "pointer" }}>
                  <Link
                    href={`/projects/${project.mainTitle_en}/${article.order}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                        mass: 0.8,
                      }}
                    >
                      <Box
                        className="keen-slider__slide"
                        sx={{
                          backgroundColor: "#BCACA8",
                          borderLeft: { xs: "none", md: "1px solid #000" },
                          borderRight: { xs: "1px solid #000", md: "none" },
                          borderBottom: { xs: "1px solid #000", md: "none" },
                          minHeight: { xs: "50px !important", md: "100vh !important" },
                          maxHeight: { xs: "50px !important", md: "100vh !important" },
                          maxWidth: { xs: "calc(100vw - 100px) !important", md: "56px !important" },
                          minWidth: { xs: "calc(100vw - 100px) !important", md: "56px !important" },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: { xs: "100%", md: 56 },
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
                                  fontSize: { xs: 18, md: 22 },
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
                    </motion.div>
                  </Link>
                </Box>
              ))}
          </Box>
        </Item>
      </Stack>
    </>
  );
}
