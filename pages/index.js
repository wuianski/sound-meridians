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

import { useRouter } from "next/router";

// import aboutOpen from "../public/imgs/aboutOpen.png";
// import aboutReturn from "../public/imgs/aboutReturn.png";
// import siteNameEN from "../public/imgs/siteName_en.png";
// import siteNameTW from "../public/imgs/sitename_tw.png";
// import aboutTitle from "../public/imgs/aboutTitle.png";

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
    width: "calc(100vw - 300px)",
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
    width: "calc(100vw - 540px)",
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

export default function Home({ about, projects, useLang }) {
  //console.log(useLang);
  //console.log(setLang);
  //const [useLang, setLang] = useState();
  const router = useRouter();

  /*****************************/
  /*** organize projects's data ***/
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

  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: false,
    mode: "snap",
    rtl: false,
    slides: {
      number: 4,
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
          <Box
            sx={{
              position: "relative",
              width: "60px",
              height: "100vh",
              backgroundColor: "#fff",
              borderRight: "1px solid #000",
              zIndex: 2,
            }}
          ></Box>
        </Item>
        {/*** row: about ***/}
        <Item>
          <Box sx={{ borderRight: "1px solid #000" }}>
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
                        // priority="true"
                        // as="image"
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
                          src="/imgs/aboutTitle.png"
                          //placeholder="blur"
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
        {/*** row: slider of projects ***/}
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
            {myProjects &&
              myProjects.map((project, idx) => (
                <Box
                  key={idx}
                  className={`keen-slider__slide ${styles.slider_entity}`}
                  style={{ maxWidth: 120, minWidth: 120 }}
                  sx={{ cursor: "pointer", borderRight: "1px solid #000" }}
                >
                  <Link
                    href={`/projects/${encodeURIComponent(
                      project.mainTitle_en
                    )}`}
                  >
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
                              top: 40,
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
                              // dangerouslySetInnerHTML={{
                              //   __html: project.mainTitle_tw,
                              // }}
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
                              // dangerouslySetInnerHTML={{
                              //   __html: project.mainTitle_en,
                              // }}
                            >
                              {project.mainTitle_en}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              position: "absolute",
                              left: 8,
                              bottom: 40,
                              fontSize: 17,
                              display: "inline-flex",
                            }}
                          >
                            <Box
                              //component={"span"}
                              className={`${styles.pt}`}
                              sx={{
                                fontSize: 15,
                                fontFamily: "Noto Sans JP",
                                fontWeight: 500,
                              }}
                              // dangerouslySetInnerHTML={{
                              //   __html: project.nation_tw,
                              // }}
                            >
                              {project.nation_tw}
                            </Box>
                            <Box
                              // component={"span"}
                              className={`${styles.pt}`}
                              mt={2}
                              sx={{
                                fontSize: 14,
                                textTransform: "uppercase",
                                fontFamily: "Noto Sans JP",
                                fontWeight: 500,
                              }}
                              // dangerouslySetInnerHTML={{
                              //   __html: project.nation_en,
                              // }}
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
                            width: 40,
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
                  </Link>
                </Box>
              ))}
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
            introContent_en
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
          id
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
