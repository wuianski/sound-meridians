import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Link from "next/link";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { motion } from "framer-motion";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import styles from "../styles/Home.module.css";

import aboutOpen from "../public/imgs/aboutOpen.png";
import aboutReturn from "../public/imgs/aboutReturn.png";
import projectCover from "../public/imgs/2_Volksempfänger_poster.jpg";
import siteNameEN from "../public/imgs/siteName_en.png";
import siteNameTW from "../public/imgs/siteName_tw.png";
import aboutTitle from "../public/imgs/aboutTitle.png";

import fetchData from "../lib/api";

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
    width: "calc(100vw - 332px)",
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
    width: "calc(100vw - 572px)",
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
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
      duration: 0.2,
      delay: 0.2,
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
    left: "calc(100vw - 409px)",
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
    left: "calc(100vw - 677px)",
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
    left: "-39%",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 24,
      duration: 0.3,
      delay: 0.3,
    },
  },
};

export default function Home({ about, projects }) {
  //console.log(projects.projects[0].mainTitle_tw);
  // useEffect(() => {
  //   console.log("test");
  // }, []);

  /*****************************/
  /*** organize brand's data ***/
  const myProjects = projects.projects.map((p) => {
    const result = {
      id: p.id,
      mainTitle_tw: p.mainTitle_tw,
      mainTitle_en: p.mainTitle_en,
      nation_tw: p.nation_tw,
      nation_en: p.nation_en,
      coverPhoto:
        !!p.cover && !!p.cover.filename_disk ? p.cover.filename_disk : "",
    };

    return result;
  });
  console.log(myProjects[0].mainTitle_en);

  const [isOpen, setIsOpen] = useState(false);
  const openAbout = async (event) => {
    //console.log("click openAbout");
    setIsOpen(true);
  };
  const returnAbout = async (event) => {
    //console.log("click returnAbout");
    setIsOpen(false);
  };

  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "snap",
    rtl: false,
    slides: {
      perView: 4,
    },
  });

  return (
    <>
      <Box>
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
              zIndex: 3,
              //mixBlendMode: "lighten",
            }}
            onClick={openAbout}
          >
            <Image
              src={aboutOpen}
              alt="about open image"
              layout="intrinsic"
              objectFit="cover"
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
              src={aboutReturn}
              alt="about open image"
              layout="intrinsic"
              objectFit="cover"
            />
          </Box>
        </motion.div>
      </Box>

      <Stack direction={{ xs: "row", md: "row" }} spacing={{ xs: 0, md: 0 }}>
        <Item>
          <Box
            sx={{
              position: "relative",
              width: "92px",
              height: "100vh",
              backgroundColor: "#fff",
              borderRight: "1px solid #000",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                textAlign: "center",
                left: 0,
                bottom: 16,
              }}
            >
              EN
            </Box>
          </Box>
        </Item>
        <Item>
          <Box>
            {/*** row2 ***/}
            <motion.div
              variants={row2}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 0) 100%)",
                  height: "100vh",
                  color: "#ff0000",
                  textAlign: "center",
                  borderRight: "1px solid #000",
                }}
              >
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
                        zIndex: 0,
                        mixBlendMode: "multiply",
                      }}
                    >
                      <Image
                        src={siteNameEN}
                        placeholder="blur"
                        alt="bg"
                        layout="fill"
                        objectFit="contain"
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
                        zIndex: 0,
                        mixBlendMode: "difference",
                      }}
                    >
                      <Image
                        src={siteNameTW}
                        placeholder="blur"
                        alt="bg"
                        layout="fill"
                        objectFit="contain"
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
                        zIndex: 0,
                        color: "#00415E",
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                      }}
                    >
                      <Box sx={{ height: 40, backgroundColor: "#00415E" }} />
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: 146,
                        }}
                      >
                        <Image
                          src={aboutTitle}
                          placeholder="blur"
                          alt="bg"
                          layout="fill"
                          objectFit="contain"
                        />
                      </Box>
                      <Box sx={{ height: 40, backgroundColor: "#00415E" }} />
                      <Box
                        sx={{
                          textAlign: "justify",
                          fontSize: 20,
                          letterSpacing: "-0.05em",
                          lineHeight: 1.75,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: about.about.introContent_tw,
                        }}
                      />
                      <Box sx={{ height: 40, backgroundColor: "#00415E" }} />
                      <Box
                        sx={{ textAlign: "left", fontSize: 12 }}
                        dangerouslySetInnerHTML={{
                          __html: about.about.credit_tw,
                        }}
                      />
                      <Box sx={{ height: 40, backgroundColor: "#00415E" }} />
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Item>
        <Item>
          <Box
            sx={{
              backgroundColor: "#fff",
              width: "480px",
              height: "100vh",
              color: "#ff0000",
              borderRight: "1px solid #000",
            }}
            ref={sliderRef}
            className="keen-slider"
            style={{ maxWidth: 480, maxHeight: "100vh" }}
          >
            {/*** project a ***/}
            <Box
              className={`keen-slider__slide number-slide1 ${styles.slider_entity}`}
              style={{ maxWidth: 120, minWidth: 120 }}
            >
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
                    left: 0,
                    top: 40,
                  }}
                >
                  <Box component={"span"} sx={{ fontSize: 26 }}>
                    雨夜花
                  </Box>
                  <Box component={"span"} mt={2} sx={{ fontSize: 19 }}>
                    Rainy Night Flowers
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 40,
                    fontSize: 17,
                  }}
                >
                  <Box component={"span"}>台灣</Box>
                  <Box component={"span"} mt={2}>
                    taiwan
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 40,
                  height: "100vh",
                  zIndex: 0,
                }}
              >
                <Image
                  src={projectCover}
                  placeholder="blur"
                  alt="bg"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            </Box>
            {/*** project b ***/}
            <Box
              className={`keen-slider__slide number-slide1 ${styles.slider_entity}`}
              style={{ maxWidth: 120, minWidth: 120 }}
            >
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
                    left: 0,
                    top: 40,
                  }}
                >
                  <Box component={"span"} sx={{ fontSize: 26 }}>
                    雨夜花
                  </Box>
                  <Box component={"span"} mt={2} sx={{ fontSize: 19 }}>
                    Rainy Night Flowers
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 40,
                    fontSize: 17,
                  }}
                >
                  <Box component={"span"}>台灣</Box>
                  <Box component={"span"} mt={2}>
                    taiwan
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 40,
                  height: "100vh",
                  zIndex: 0,
                }}
              >
                <Image
                  src={projectCover}
                  placeholder="blur"
                  alt="bg"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            </Box>
            {/*** project c ***/}
            <Box
              className={`keen-slider__slide number-slide1 ${styles.slider_entity}`}
              style={{ maxWidth: 120, minWidth: 120 }}
            >
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
                    left: 0,
                    top: 40,
                  }}
                >
                  <Box component={"span"} sx={{ fontSize: 26 }}>
                    雨夜花
                  </Box>
                  <Box component={"span"} mt={2} sx={{ fontSize: 19 }}>
                    Rainy Night Flowers
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 40,
                    fontSize: 17,
                  }}
                >
                  <Box component={"span"}>台灣</Box>
                  <Box component={"span"} mt={2}>
                    taiwan
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 40,
                  height: "100vh",
                  zIndex: 0,
                }}
              >
                <Image
                  src={projectCover}
                  placeholder="blur"
                  alt="bg"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            </Box>
            {/*** project d ***/}
            <Box
              className={`keen-slider__slide number-slide1 ${styles.slider_entity}`}
              style={{ maxWidth: 120, minWidth: 120 }}
            >
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
                    left: 0,
                    top: 40,
                  }}
                >
                  <Box component={"span"} sx={{ fontSize: 26 }}>
                    雨夜花
                  </Box>
                  <Box component={"span"} mt={2} sx={{ fontSize: 19 }}>
                    Rainy Night Flowers
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 40,
                    fontSize: 17,
                  }}
                >
                  <Box component={"span"}>台灣</Box>
                  <Box component={"span"} mt={2}>
                    taiwan
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 40,
                  height: "100vh",
                  zIndex: 0,
                }}
              >
                <Image
                  src={projectCover}
                  placeholder="blur"
                  alt="bg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
            </Box>
            {/*** project e ***/}
            <Box
              className={`keen-slider__slide number-slide1 ${styles.slider_entity}`}
              style={{ maxWidth: 120, minWidth: 120 }}
            >
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
                    left: 0,
                    top: 40,
                  }}
                >
                  <Box component={"span"} sx={{ fontSize: 26 }}>
                    雨夜花
                  </Box>
                  <Box component={"span"} mt={2} sx={{ fontSize: 19 }}>
                    Rainy Night Flowers
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 40,
                    fontSize: 17,
                  }}
                >
                  <Box component={"span"}>台灣</Box>
                  <Box component={"span"} mt={2}>
                    taiwan
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 40,
                  height: "100vh",
                  zIndex: 0,
                }}
              >
                <Image
                  src={projectCover}
                  placeholder="blur"
                  alt="bg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
            </Box>
          </Box>
        </Item>
      </Stack>
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
            credit_tw
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
          mainTitle_tw, 
          mainTitle_en,
          nation_tw,
          nation_en,
          cover{
              id 
              filename_disk
          }
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
