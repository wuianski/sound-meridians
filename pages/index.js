import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Link from "next/link";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { motion } from "framer-motion";

// import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import styles from "../styles/Home.module.css";
import KeyboardArrowLeftSharpIcon from "@mui/icons-material/KeyboardArrowLeftSharp";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";

// import { useRouter } from "next/router";
import fetchData from "../lib/api";
import { NextSeo } from "next-seo";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

/******************/
/*** stack ***/
const Item = styled(Paper)(({ theme }) => ({
  background: "none",
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "#00415E",
}));
/*************/
/*** delay ***/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*** row2 ***/
const row2 = {
  open: {
    opacity: 1,
    width: "calc(100vw - 320px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
      duration: 0.2,
      delay: 0.2,
    },
  },
  closed: {
    opacity: 1,
    width: "calc(100vw - 620px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
      duration: 0.2,
      delay: 0.2,
    },
  },
};
/*** about open ***/
const about_open = {
  open: {
    //display: "none",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
      duration: 0.2,
      delay: 0.2,
    },
  },
  closed: {
    // opacity: 1,
    // transition: {
    //   // type: "spring",
    //   // stiffness: 200,
    //   // damping: 24,
    //   // duration: 0.2,
    //   // delay: 0.2,
    // },
    position: "absolute",
    zIndex: 4,
    opacity: [1, 0.5, 1],
    //x: [0, 10, 0],
    //mixBlendMode: [`color`, `unset`, `color`],
    transition: {
      duration: 3.8,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
    },
  },
};

/*** about return ***/
const about_return = {
  open: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
      duration: 0.2,
      delay: 0.2,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
      duration: 0.2,
      delay: 0.2,
    },
  },
};
/*** site name en ***/
const siteName_en = {
  open: {
    opacity: 1,
    position: "relative",
    left: "calc(100vw - 377px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 24,
      duration: 0.3,
      delay: 0.3,
    },
  },
  closed: {
    opacity: 1,
    position: "relative",
    left: 32,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 24,
      duration: 0.3,
      delay: 0.3,
    },
  },
};
/*** site name tw ***/
const siteName_tw = {
  open: {
    opacity: 1,
    position: "relative",
    left: "calc(100vw - 741px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 24,
      duration: 0.3,
      delay: 0.3,
    },
  },
  closed: {
    opacity: 1,
    position: "relative",
    left: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 24,
      duration: 0.3,
      delay: 0.3,
    },
  },
};
/*** about content ***/
const about_content = {
  open: {
    opacity: 1,
    position: "relative",
    left: 32,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 24,
      duration: 0.3,
      delay: 0.3,
    },
  },
  closed: {
    opacity: 1,
    position: "relative",
    left: "-38%",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 24,
      duration: 0.3,
      delay: 0.3,
    },
  },
};

export default function Home({ about, projects, useLang }) {
  //console.log(useLang);
  //console.log(setLang);
  //const [useLang, setLang] = useState();
  // const router = useRouter();

  /*****************************/
  /*** organize projects's data ***/
  const myProjects = projects.projects.map((p) => {
    const result = {
      id: p.id,
      mainTitle_tw: p.mainTitle_tw,
      mainTitle_en: p.mainTitle_en,
      nation_tw: p.nation_tw,
      nation_en: p.nation_en,
      introTitle_tw: p.introTitle_tw,
      coverPhoto:
        !!p.cover && !!p.cover.filename_disk ? p.cover.filename_disk : "",
    };

    return result;
  });
  //console.log(myProjects[0].mainTitle_en);

  const [isOpen, setIsOpen] = useState(false);
  const openAbout = async (event) => {
    //console.log("click openAbout");
    setIsOpen(true);
  };
  const returnAbout = async (event) => {
    //console.log("click returnAbout");
    setIsOpen(false);
  };

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
        initial: 0,
        vertical: true,
        slides: { perView: 2 },
      },
    },
  });

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
      {/*** DESKTOP VERSION ***/}
      <Box sx={{ display: { xs: "block", md: "block" } }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {/*** about open icon  ***/}
          <motion.div
            variants={about_open}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <Box
              sx={{
                position: "absolute",
                top: -90,
                left: 0,
                width: "443px",
                height: "443px",
                cursor: "pointer",
                zIndex: 4,
              }}
              onClick={openAbout}
            >
              <Image
                src="/imgs/aboutOpen.png"
                alt="about open image"
                layout="intrinsic"
                objectFit="cover"
                width={443}
                height={443}
                placeholder="blur"
                blurDataURL="/imgs/aboutOpen.png"
              />
            </Box>
          </motion.div>
          {/*** about return icon  ***/}
          <motion.div
            variants={about_return}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: -180,
                left: "53vw",
                width: "575px",
                height: "575px",
                cursor: "pointer",
                zIndex: 3,
              }}
              onClick={returnAbout}
            >
              <Image
                src="/imgs/aboutReturn.png"
                alt="about open image"
                layout="intrinsic"
                objectFit="cover"
                width={575}
                height={575}
                placeholder="blur"
                blurDataURL="/imgs/aboutReturn.png"
              />
            </Box>
          </motion.div>
        </Box>
        <Stack direction={{ xs: "row", md: "row" }} spacing={{ xs: 0, md: 0 }}>
          {/*** row: return home ***/}
          <Item>
            {/*** Desktop: return home img ***/}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "relative",
                width: { xs: 60, md: 80 },
                height: "100vh",
                backgroundColor: "#fff",
                borderRight: "1px solid #000",
                zIndex: 2,
              }}
            ></Box>
            {/*** Mobile: return home img ***/}
            <Box
              pt={4}
              sx={{
                display: { xs: "block", md: "none" },
                position: "relative",
                top: 0,
                left: 0,
                width: "60px",
                height: "100vh",
                background:
                  "linear-gradient(90deg,  rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
              }}
            >
              <Box>
                <Image
                  src="/imgs/returnHomePage3.png"
                  alt="about open image"
                  width={60}
                  height={429}
                />
              </Box>
            </Box>
          </Item>
          {/*** row: about ***/}
          <Item>
            <Box sx={{ borderRight: "0px solid #000" }}>
              <motion.div
                variants={row2}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    background:
                      "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 60%)",
                    height: "100vh",
                    color: "#ff0000",
                    textAlign: "center",
                  }}
                >
                  {/*** particles ***/}
                  <Particles
                    id="tsparticles"
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
                          value: 40,
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
                  {/*** site name en ***/}
                  <Box sx={{ position: "absolute" }}>
                    <motion.div
                      variants={siteName_en}
                      initial="closed"
                      animate={isOpen ? "open" : "closed"}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: 45,
                          height: "100vh",
                          zIndex: 1,
                          mixBlendMode: "multiply",
                        }}
                      >
                        <Image
                          src="/imgs/siteName_en.png"
                          alt="bg"
                          layout="fill"
                          objectFit="contain"
                          placeholder="blur"
                          blurDataURL="/imgs/siteName_en.png"
                        />
                      </Box>
                    </motion.div>
                  </Box>
                  {/*** site name tw ***/}
                  <Box sx={{ position: "absolute" }}>
                    <motion.div
                      variants={siteName_tw}
                      initial="closed"
                      animate={isOpen ? "open" : "closed"}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          left: -45,
                          width: 621,
                          height: "100vh",
                          zIndex: 1,
                          mixBlendMode: "difference",
                        }}
                      >
                        <Image
                          src="/imgs/sitename_tw.png"
                          alt="bg"
                          layout="fill"
                          objectFit="contain"
                          placeholder="blur"
                          blurDataURL="/imgs/sitename_tw.png"
                        />
                      </Box>
                    </motion.div>
                  </Box>
                  {/*** about content ***/}
                  <Box sx={{ position: "absolute" }}>
                    <motion.div
                      variants={about_content}
                      initial="closed"
                      animate={isOpen ? "open" : "closed"}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          left: 0,
                          width: "40%",
                          height: "100vh",
                          color: "#00415E",
                        }}
                      >
                        <Box className="scrollContent">
                          <Box
                            sx={{ height: 40, backgroundColor: "#00415E" }}
                          />
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: 146,
                            }}
                          >
                            <Image
                              src="/imgs/aboutTitle.png"
                              alt="bg"
                              layout="fill"
                              objectFit="contain"
                              placeholder="blur"
                              blurDataURL="/imgs/aboutTitle.png"
                            />
                          </Box>
                          <Box
                            sx={{ height: 40, backgroundColor: "#00415E" }}
                          />
                          {useLang == true ? (
                            <Box
                              sx={{
                                textAlign: "justify",
                                fontSize: 16,
                                letterSpacing: "-0.05em",
                                lineHeight: 1.75,
                                fontWeight: 400,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: about.about.introContent_tw,
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                textAlign: "justify",
                                fontSize: 16,
                                letterSpacing: "-0.05em",
                                lineHeight: 1.75,
                                fontWeight: 400,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: about.about.introContent_en,
                              }}
                            />
                          )}

                          <Box
                            sx={{ height: 40, backgroundColor: "#00415E" }}
                          />
                          {useLang == true ? (
                            <Box
                              sx={{ textAlign: "left", fontSize: 12 }}
                              dangerouslySetInnerHTML={{
                                __html: about.about.credit_tw,
                              }}
                            />
                          ) : (
                            <Box
                              sx={{ textAlign: "left", fontSize: 12 }}
                              dangerouslySetInnerHTML={{
                                __html: about.about.credit_en,
                              }}
                            />
                          )}
                          <Box
                            sx={{ height: 40, backgroundColor: "#00415E" }}
                          />
                        </Box>
                      </Box>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </Item>
          {/*** row: projects nav + slider of projects ***/}
          <Item>
            <Box>
              <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 0, md: 0 }}>
                {/*** Mobile: about content ***/}
                <Item>
                  <Box
                    pl={3}
                    sx={{
                      display: { xs: "block", md: "none" },
                      position: "relative",
                      width: "calc(100vw - 60px)",
                      height: "calc(100vh - 100px)",
                      background:
                        "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.3) 100%)",
                      zIndex: 1,
                      color: "#00415E",
                      // borderBottom: "1px solid #000"
                    }}
                  >
                    <Box className="scrollContent">
                      <Box sx={{ height: 40, backgroundColor: "#00415E" }} />
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: 146,
                        }}
                      >
                        <Image
                          src="/imgs/aboutTitle.png"
                          alt="bg"
                          layout="fill"
                          objectFit="contain"
                          placeholder="blur"
                          blurDataURL="/imgs/aboutTitle.png"
                        />
                      </Box>
                      <Box sx={{ height: 40, backgroundColor: "#00415E" }} />
                      {useLang == true ? (
                        <Box
                          sx={{
                            textAlign: "justify",
                            fontSize: 16,
                            letterSpacing: "-0.05em",
                            lineHeight: 1.75,
                            fontWeight: 400,
                          }}
                          dangerouslySetInnerHTML={{
                            __html: about.about.introContent_tw,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            textAlign: "justify",
                            fontSize: 16,
                            letterSpacing: "-0.05em",
                            lineHeight: 1.75,
                            fontWeight: 400,
                          }}
                          dangerouslySetInnerHTML={{
                            __html: about.about.introContent_en,
                          }}
                        />
                      )}
                      <Box sx={{ height: 40, backgroundColor: "#00415E" }} />
                      {useLang == true ? (
                        <Box
                          sx={{ textAlign: "left", fontSize: 12 }}
                          dangerouslySetInnerHTML={{
                            __html: about.about.credit_tw,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{ textAlign: "left", fontSize: 12 }}
                          dangerouslySetInnerHTML={{
                            __html: about.about.credit_en,
                          }}
                        />
                      )}
                      <Box sx={{ height: 40, backgroundColor: "#00415E" }} />
                    </Box>
                  </Box>
                </Item>

                <Item>
                  <Box sx={{ display: { xs: "block", md: "block" }, }}>
                    <Stack direction={{ xs: "row-reverse", md: "row" }} spacing={{ xs: 0, md: 0 }}>
                      {/*** row: projects nav  ***/}
                      <Item>
                        <Box sx={{
                          display: { xs: "block", md: "block" },
                          height: { xs: 100, md: "unset" },
                          width: 45,
                          position: "relative",
                          backgroundColor: { xs: "#fff", md: "#fff" },
                        }}>
                          {loaded && instanceRef.current && (
                            <>
                              <Box pt={{ xs: 1, md: 3 }} pb={{ xs: 0, md: 3 }}
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  bottom: { xs: 10, md: "unset" },
                                  right: 0,
                                  fontSize: 17,
                                  display: "inline-flex",
                                  backgroundColor: "#fff",
                                  borderLeft: "1px solid #000",
                                  borderBottom: "1px solid #000",
                                  borderTop: { xs: "1px solid #000", md: "none" },
                                }}>
                                <Stack direction="column" spacing={{ xs: 0, md: 0 }}>
                                  <Item>
                                    {/*** Desktop: prev btn ***/}
                                    <Box
                                      sx={{
                                        display: { xs: "none", md: "block" },
                                        width: { xs: 40, md: 40 },
                                        height: 30,
                                        textAlign: "center",
                                        cursor: "pointer",
                                        backgroundColor: "#fff",
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
                                        backgroundColor: "#fff",
                                      }}
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
                                        width: { xs: 40, md: 40 },
                                        height: 30,
                                        textAlign: "center",
                                        cursor: "pointer",
                                        zIndex: 3,
                                        backgroundColor: "#fff",
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
                                        height: 50,
                                        textAlign: "center",
                                        backgroundColor: "#fff",
                                      }}
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
                                    <Box sx={{ display: { xs: "none", md: "block" }, backgroundColor: "#fff", }}>
                                      <Box pt={2} sx={{ writingMode: "vertical-lr", color: "#000", marginLeft: "10px", textTransform: "uppercase", fontFamily: "Noto Sans JP", fontSize: 14, }}>
                                        project nav
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
                        <Box
                          sx={{
                            backgroundColor: "#fff",
                            width: { xs: "calc(100vw - 100px)", md: 500 },
                            height: { xs: 100, md: "100vh" },
                            color: "#ff0000",
                            minWidth: { xs: "calc(100vw - 100px)", md: 500 },
                            maxWidth: { xs: "calc(100vw - 100px)", md: 500 },
                            minHeight: { xs: 100, md: "100vh" },
                            maxHeight: { xs: 100, md: "100vh" },
                            borderTop: { xs: "1px solid #000", md: "none" },
                          }}
                          ref={sliderRef}
                          className="keen-slider"
                        >
                          {myProjects &&
                            myProjects.map((project, idx) => (
                              <Box
                                key={idx}
                                className={`keen-slider__slide`}
                                sx={{
                                  borderLeft: { xs: "none", md: "1px solid #000" },
                                  borderRight: { xs: "1px solid #000", md: "none" },
                                  borderBottom: { xs: "1px solid #000", md: "none" },
                                  minHeight: { xs: "50px !important", md: "100vh !important" },
                                  maxHeight: { xs: "50px !important", md: "100vh !important" },
                                  maxWidth: { xs: "calc(100vw - 100px) !important", md: "125px !important" },
                                  minWidth: { xs: "calc(100vw - 100px) !important", md: "125px !important" },
                                }}
                              >
                                {project.introTitle_tw ? (
                                  <>
                                    {/*** if has introTitle_tw then with link ***/}
                                    <Link
                                      href={`/projects/${encodeURIComponent(
                                        project.mainTitle_en
                                      )}`}
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
                                        {/*** Desktop: slider of projects ***/}
                                        <Box sx={{ display: { xs: "none", md: "block" }, }}>
                                          <Stack
                                            direction={{ xs: "column", md: "row" }}
                                            spacing={{ xs: 0, md: 0 }}
                                          >
                                            <Item>
                                              <Box
                                                sx={{
                                                  position: "relative",
                                                  width: { xs: "100%", md: 80 },
                                                  height: { xs: 100, md: "100vh" },
                                                  color: "#000",
                                                  writingMode: {
                                                    xs: "horizontal-tb",
                                                    md: "vertical-lr",
                                                  },
                                                  textOrientation: { xs: "unset", md: "mixed" },
                                                  backgroundColor: "#fff",
                                                  zIndex: 1,
                                                  cursor: "pointer"
                                                }}
                                              >
                                                <Box
                                                  sx={{
                                                    position: "absolute",
                                                    left: 8,
                                                    top: 30,
                                                    display: "inline-flex",
                                                  }}
                                                >
                                                  <Box
                                                    className={`${styles.pt}`}
                                                    sx={{
                                                      fontSize: 22,
                                                      textTransform: "uppercase",
                                                      fontFamily: "Noto Serif JP",
                                                      fontWeight: 700,
                                                    }}
                                                  >
                                                    {project.mainTitle_tw}
                                                  </Box>
                                                  <Box
                                                    className={`${styles.pt}`}
                                                    mt={2}
                                                    sx={{
                                                      fontSize: 13,
                                                      textTransform: "uppercase",
                                                      fontFamily: "BioRhyme Expanded",
                                                      fontWeight: 700,
                                                      letterSpacing: "-0.015em",
                                                    }}
                                                  >
                                                    {project.mainTitle_en}
                                                  </Box>
                                                </Box>
                                                <Box
                                                  sx={{
                                                    position: "absolute",
                                                    right: 8,
                                                    bottom: 30,
                                                    fontSize: 17,
                                                    display: "inline-flex",
                                                  }}
                                                >
                                                  <Box
                                                    className={`${styles.pt}`}
                                                    sx={{
                                                      fontSize: 15,
                                                      fontFamily: "Noto Sans JP",
                                                      fontWeight: 500,
                                                    }}
                                                  >
                                                    {project.nation_tw}
                                                  </Box>
                                                  <Box
                                                    className={`${styles.pt}`}
                                                    mt={2}
                                                    sx={{
                                                      fontSize: 14,
                                                      textTransform: "uppercase",
                                                      fontFamily: "Noto Sans JP",
                                                      fontWeight: 500,
                                                    }}
                                                  >
                                                    {project.nation_en}
                                                  </Box>
                                                </Box>
                                              </Box>
                                            </Item>
                                            <Item>
                                              <Box
                                                sx={{
                                                  position: "relative",
                                                  width: { xs: "100%", md: 45 },
                                                  height: { xs: 100, md: "100vh" },
                                                  zIndex: 0,
                                                }}
                                              >
                                                <Image
                                                  src={`${process.env.DIRECTUS_CDN}/assets/${project.coverPhoto}`}
                                                  alt=""
                                                  layout="fill"
                                                  objectFit="cover"
                                                  placeholder="blur"
                                                  blurDataURL={`${process.env.DIRECTUS_CDN}/assets/${project.coverPhoto}`}
                                                />
                                              </Box>
                                            </Item>
                                          </Stack>
                                        </Box>
                                        {/*** Mobile: slider of projects ***/}
                                        <Box sx={{ display: { xs: "block", md: "none" }, }}>
                                          <Stack
                                            direction={{ xs: "column", md: "column" }}
                                            spacing={{ xs: 0, md: 0 }}
                                          >
                                            <Item>
                                              <Box
                                                sx={{
                                                  position: "relative",
                                                  width: "100%",
                                                  height: 100,
                                                  color: "#000",
                                                  writingMode: {
                                                    xs: "horizontal-tb",
                                                    md: "vertical-lr",
                                                  },
                                                  textOrientation: "unset",
                                                  backgroundColor: "#fff",
                                                  zIndex: 1,
                                                }}
                                              >
                                                {/*** column: main title ***/}
                                                <Box
                                                  pl={1}
                                                  pr={1}
                                                  sx={{
                                                    position: "absolute",
                                                    left: 0,
                                                    top: 8,
                                                    display: "inline",
                                                    width: "100%",
                                                  }}
                                                >
                                                  {useLang == true ? (
                                                    <>
                                                      <Box
                                                        sx={{
                                                          position: "relative",
                                                          left: 0,
                                                          top: 0,
                                                          display: "flex",
                                                          // width: "100%",
                                                        }}
                                                      >
                                                        <Box
                                                          className={`${styles.pt}`}
                                                          sx={{
                                                            fontSize: 18,
                                                            lineHeight: 1.4,
                                                            textTransform:
                                                              "uppercase",
                                                            fontFamily:
                                                              "Noto Serif JP",
                                                            fontWeight: 700,
                                                            width: "100%",
                                                          }}
                                                        >
                                                          {project.mainTitle_tw}
                                                        </Box>
                                                        <Box
                                                          className={`${styles.pt}`}
                                                          sx={{
                                                            position: "absolute",
                                                            right: 8,
                                                            fontSize: 13,
                                                            fontFamily:
                                                              "Noto Sans JP",
                                                            fontWeight: 500,
                                                            lineHeight: 1.4,
                                                          }}
                                                        >
                                                          {project.nation_tw}
                                                        </Box>
                                                      </Box>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <Box
                                                        sx={{
                                                          position: "relative",
                                                          left: 0,
                                                          top: 0,
                                                          display: "flex",
                                                          // width: "100%",
                                                        }}
                                                      >
                                                        <Box
                                                          className={`${styles.pt}`}
                                                          sx={{
                                                            fontSize: 12,
                                                            lineHeight: 1.4,
                                                            textTransform:
                                                              "uppercase",
                                                            fontFamily:
                                                              "BioRhyme Expanded",
                                                            fontWeight: 700,
                                                            letterSpacing: "-0.015em",
                                                            width: "100%",
                                                            zIndex: 1,
                                                          }}
                                                        >
                                                          {project.mainTitle_en}
                                                        </Box>
                                                        <Box
                                                          className={`${styles.pt}`}
                                                          sx={{
                                                            fontSize: 12,
                                                            textTransform:
                                                              "uppercase",
                                                            fontFamily:
                                                              "Noto Sans JP",
                                                            fontWeight: 500,
                                                            lineHeight: 1.4,
                                                            //width: "30%",
                                                            zIndex: 0,
                                                          }}
                                                        >
                                                          {project.nation_en}
                                                        </Box>
                                                      </Box>
                                                    </>
                                                  )}
                                                </Box>
                                              </Box>
                                            </Item>
                                          </Stack>

                                        </Box>
                                      </motion.div>
                                    </Link>
                                  </>
                                ) : (
                                  <>
                                    {/*** else if has no introTitle_tw then with no link ***/}
                                    {/*** Desktop: slider of projects ***/}
                                    <Box sx={{ display: { xs: "none", md: "block" }, }}>
                                      <Stack
                                        direction={{ xs: "row", md: "row" }}
                                        spacing={{ xs: 0, md: 0 }}
                                      >
                                        <Item>
                                          <Box
                                            sx={{
                                              position: "relative",
                                              width: 80,
                                              height: "100vh",
                                              color: "#000",
                                              writingMode: "vertical-lr",
                                              textOrientation: "mixed",
                                              backgroundColor: "#fff",
                                              zIndex: 1,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                position: "absolute",
                                                left: 8,
                                                top: 30,
                                                display: "inline-flex",
                                              }}
                                            >
                                              <Box
                                                className={`${styles.pt}`}
                                                sx={{
                                                  fontSize: 22,
                                                  textTransform: "uppercase",
                                                  fontFamily: "Noto Serif JP",
                                                  fontWeight: 700,
                                                }}
                                              >
                                                {project.mainTitle_tw}
                                              </Box>
                                              <Box
                                                className={`${styles.pt}`}
                                                mt={2}
                                                sx={{
                                                  fontSize: 13,
                                                  textTransform: "uppercase",
                                                  fontFamily: "BioRhyme Expanded",
                                                  fontWeight: 700,
                                                  letterSpacing: "-0.015em",
                                                }}
                                              >
                                                {project.mainTitle_en}
                                              </Box>
                                            </Box>
                                            <Box
                                              sx={{
                                                position: "absolute",
                                                right: 8,
                                                bottom: 30,
                                                fontSize: 17,
                                                display: "inline-flex",
                                              }}
                                            >
                                              <Box
                                                className={`${styles.pt}`}
                                                sx={{
                                                  fontSize: 15,
                                                  fontFamily: "Noto Sans JP",
                                                  fontWeight: 500,
                                                }}
                                              >
                                                {project.nation_tw}
                                              </Box>
                                              <Box
                                                className={`${styles.pt}`}
                                                mt={2}
                                                sx={{
                                                  fontSize: 14,
                                                  textTransform: "uppercase",
                                                  fontFamily: "Noto Sans JP",
                                                  fontWeight: 500,
                                                }}
                                              >
                                                {project.nation_en}
                                              </Box>
                                            </Box>
                                          </Box>
                                        </Item>
                                        <Item>
                                          <Box
                                            sx={{
                                              position: "relative",
                                              width: 45,
                                              height: "100vh",
                                              zIndex: 0,
                                            }}
                                          >
                                            <Image
                                              src={`${process.env.DIRECTUS_CDN}/assets/${project.coverPhoto}`}
                                              alt=""
                                              layout="fill"
                                              objectFit="cover"
                                              placeholder="blur"
                                              blurDataURL={`${process.env.DIRECTUS_CDN}/assets/${project.coverPhoto}`}
                                            />
                                          </Box>
                                        </Item>
                                      </Stack>
                                    </Box>
                                    {/*** Mobile: slider of projects ***/}
                                    <Box sx={{ display: { xs: "block", md: "none" }, }}>
                                      <Stack
                                        direction={{ xs: "column", md: "column" }}
                                        spacing={{ xs: 0, md: 0 }}
                                      >
                                        <Item>
                                          <Box
                                            sx={{
                                              position: "relative",
                                              width: "100%",
                                              height: 100,
                                              color: "#000",
                                              writingMode: {
                                                xs: "horizontal-tb",
                                                md: "vertical-lr",
                                              },
                                              textOrientation: "unset",
                                              backgroundColor: "#fff",
                                              zIndex: 1,
                                            }}
                                          >
                                            {/*** column: main title ***/}
                                            <Box
                                              pl={1}
                                              pr={1}
                                              sx={{
                                                position: "absolute",
                                                left: 0,
                                                top: 8,
                                                display: "inline",
                                                width: "100%",
                                              }}
                                            >
                                              {useLang == true ? (
                                                <>
                                                  <Box
                                                    sx={{
                                                      position: "relative",
                                                      left: 0,
                                                      top: 0,
                                                      display: "flex",
                                                      // width: "100%",
                                                    }}
                                                  >
                                                    <Box
                                                      className={`${styles.pt}`}
                                                      sx={{
                                                        fontSize: 18,
                                                        lineHeight: 1.4,
                                                        textTransform:
                                                          "uppercase",
                                                        fontFamily:
                                                          "Noto Serif JP",
                                                        fontWeight: 700,
                                                        width: "100%",
                                                      }}
                                                    >
                                                      {project.mainTitle_tw}
                                                    </Box>
                                                    <Box
                                                      className={`${styles.pt}`}
                                                      sx={{
                                                        position: "absolute",
                                                        right: 8,
                                                        fontSize: 13,
                                                        fontFamily:
                                                          "Noto Sans JP",
                                                        fontWeight: 500,
                                                        lineHeight: 1.4,
                                                      }}
                                                    >
                                                      {project.nation_tw}
                                                    </Box>
                                                  </Box>
                                                </>
                                              ) : (
                                                <>
                                                  <Box
                                                    sx={{
                                                      position: "relative",
                                                      left: 0,
                                                      top: 0,
                                                      display: "flex",
                                                      // width: "100%",
                                                    }}
                                                  >
                                                    <Box
                                                      className={`${styles.pt}`}
                                                      sx={{
                                                        fontSize: 12,
                                                        lineHeight: 1.4,
                                                        textTransform:
                                                          "uppercase",
                                                        fontFamily:
                                                          "BioRhyme Expanded",
                                                        fontWeight: 700,
                                                        letterSpacing: "-0.015em",
                                                        width: "100%",
                                                        zIndex: 1,
                                                      }}
                                                    >
                                                      {project.mainTitle_en}
                                                    </Box>
                                                    <Box
                                                      className={`${styles.pt}`}
                                                      sx={{
                                                        fontSize: 12,
                                                        textTransform:
                                                          "uppercase",
                                                        fontFamily:
                                                          "Noto Sans JP",
                                                        fontWeight: 500,
                                                        lineHeight: 1.4,
                                                        //width: "30%",
                                                        zIndex: 0,
                                                      }}
                                                    >
                                                      {project.nation_en}
                                                    </Box>
                                                  </Box>
                                                </>
                                              )}
                                            </Box>
                                          </Box>
                                        </Item>
                                      </Stack>

                                    </Box>
                                  </>
                                )}
                              </Box>
                            ))}
                        </Box>
                      </Item>
                    </Stack>
                  </Box>
                </Item>


              </Stack>
            </Box>
          </Item>

        </Stack>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  // Run API calls in parallel
  const [about, projects] = await Promise.all([
    await fetchData(
      `
      query  {
          about{
            introContent_tw
            introContent_en
            credit_tw
            credit_en
          }
      }
      `,
      {
        variables: {},
      }
    ),
    await fetchData(
      `
      query  {
        projects{
          id
          mainTitle_tw, 
          mainTitle_en,
          nation_tw,
          nation_en,
          cover{
              id 
              filename_disk
          }
          introTitle_tw
        }
      }
      `,
      {
        variables: {},
      }
    ),
  ]);

  return {
    props: {
      about: about.data,
      projects: projects.data,
    },
    //revalidate: 1,
  };
}
