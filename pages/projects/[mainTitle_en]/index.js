import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import fetchData from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import ArticleSlider from "../../../components/ArticleSlider";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";

/******************/
/*** stack ***/
const Item = styled(Paper)(({ theme }) => ({
  background: "none",
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "#000",
}));

export default function Project({ projects, useLang }) {
  const router = useRouter();
  // const query = router.query;
  // const langEN = query.useLang;
  //console.log(langEN);

  return (
    <>
      {/*** DESKTOP VERSION ***/}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {projects.projects.map((project, idx) => (
          <Box key={project.id}>
            <Stack
              direction={{ xs: "row", md: "row" }}
              spacing={{ xs: 0, md: 0 }}
            >
              {/*** row: return home ***/}
              <Item>
                <Box
                  sx={{
                    position: "relative",
                    top: 0,
                    left: 0,
                    width: "80px",
                    height: "100vh",
                    zIndex: 4,
                    backgroundColor: "#00415E",
                  }}
                >
                  <Box
                    pt={4}
                    sx={{
                      position: "relative",
                      top: 0,
                      left: 0,
                      width: "80px",
                      height: "100vh",
                      background:
                        "linear-gradient(90deg,  rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
                    }}
                  >
                    <Link href="/">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <Box
                          sx={{
                            cursor: "pointer",
                            position: "absolute",
                            zIndex: 3,
                          }}
                        >
                          <Image
                            src="/imgs/returnHomePage2.png"
                            alt="about open image"
                            width={80}
                            height={572}
                          />
                        </Box>
                      </motion.div>
                    </Link>
                  </Box>
                </Box>
              </Item>
              {/*** row: project name and country name ***/}
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
                    zIndex: 3,
                    borderRight: "1px solid #000",
                    borderLeft: "1px solid #000",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: 8,
                      top: 32,
                      display: "inline-flex",
                    }}
                  >
                    <Box
                      className="pt"
                      sx={{
                        fontSize: 22,
                        textTransform: "uppercase",
                        fontFamily: "Noto Serif JP",
                        fontWeight: 700,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: project.mainTitle_tw,
                      }}
                    ></Box>
                    <Box
                      className="pt"
                      mt={2}
                      sx={{
                        fontSize: 13,
                        textTransform: "uppercase",
                        fontFamily: "BioRhyme Expanded",
                        fontWeight: 700,
                        letterSpacing: "-0.015em",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: project.mainTitle_en,
                      }}
                    ></Box>
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
                      className="pt"
                      sx={{
                        fontSize: 15,
                        fontFamily: "Noto Sans JP",
                        fontWeight: 500,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: project.nation_tw,
                      }}
                    ></Box>
                    <Box
                      className="pt"
                      mt={2}
                      sx={{
                        fontSize: 14,
                        textTransform: "uppercase",
                        fontFamily: "Noto Sans JP",
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: project.nation_en,
                      }}
                    ></Box>
                  </Box>
                </Box>
              </Item>
              {/*** row: project intro ***/}
              <Item>
                {/*** background image ***/}
                <Box
                  sx={{
                    position: "absolute",
                    width: "calc(100vw - 400px)",
                    height: "100vh",
                    zIndex: 0,
                    opacity: 0.6,
                  }}
                >
                  <Image
                    src={`${process.env.DIRECTUS_CDN}/assets/${project.cover.filename_disk}`}
                    placeholder="blur"
                    blurDataURL={`${process.env.DIRECTUS_CDN}/assets/${project.cover.filename_disk}`}
                    alt="bg"
                    layout="fill"
                    objectFit="cover"
                    priority="true"
                    as="image"
                  />
                </Box>
                {/*** text ***/}
                <Box
                  mr={2}
                  p={"50px 68px 27px 220px"}
                  sx={{
                    height: "96vh",
                    position: "relative",
                    zIndex: 3,
                  }}
                >
                  <Box className="scrollContent">
                    {useLang == true ? (
                      <>
                        <Box
                          className="pt"
                          sx={{
                            textAlign: "left",
                            fontFamily: "Noto Sans JP",
                            fontSize: 40,
                            fontWeight: 700,
                            lineHeight: 1.4,
                            color: "#fff",
                            textShadow: "0.06em 0.06em 0.12em #000",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: project.introTitle_tw,
                          }}
                        />
                        <Box
                          className="pt"
                          pt={5}
                          sx={{
                            textAlign: "justify",
                            fontWeight: 400,
                            color: "#fff",
                            fontFamily: "Noto Sans JP",
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: 1.75,
                            letterSpacing: "-0.05em",
                            textShadow: "0.06em 0.06em 0.12em #000",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: project.introContent_tw,
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Box
                          className="pt"
                          sx={{
                            textAlign: "left",
                            fontFamily: "Noto Sans JP",
                            // textTransform: "capitalize",
                            fontSize: 40,
                            fontWeight: 700,
                            lineHeight: 1.4,
                            color: "#fff",
                            textShadow: "0.06em 0.06em 0.12em #000",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: project.introTitle_en,
                          }}
                        />
                        <Box
                          className="pt"
                          pt={5}
                          sx={{
                            textAlign: "justify",
                            fontWeight: 400,
                            color: "#fff",
                            fontFamily: "Noto Sans JP",
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: 1.75,
                            letterSpacing: "-0.05em",
                            textShadow: "0.06em 0.06em 0.12em #000",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: project.introContent_en,
                          }}
                        />
                      </>
                    )}
                  </Box>
                </Box>
                {/* <Box
                  pr={1}
                  mt={-0.5}
                  sx={{
                    zIndex: 9,
                    position: "relative",
                    textAlign: "end",
                    mixBlendMode: "difference",
                    textShadow: "0.06em 0.06em 0.12em #000",
                    color: "#fff",
                  }}
                >
                  <KeyboardDoubleArrowDownSharpIcon
                    alt="keyboard arrow down"
                    sx={{ fontSize: "xx-large" }}
                  />
                </Box> */}
              </Item>
              {/*** row: slider of articles ***/}
              <Item>
                <Box
                  key={project.id}
                  sx={{
                    backgroundColor: "#fff",
                    width: "260px",
                    height: "100vh",
                    color: "#ff0000",
                    borderRight: "1px solid #000",
                  }}
                  style={{ maxWidth: 480, maxHeight: "100vh" }}
                >
                  <>
                    <ArticleSlider project={project} useLang={useLang} />
                  </>
                </Box>
              </Item>
            </Stack>
          </Box>
        ))}
      </Box>

      {/*** MOBILE VERSION ***/}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {projects.projects.map((project, idx) => (
          <Box key={project.id}>
            <Stack
              direction={{ xs: "row", md: "row" }}
              spacing={{ xs: 0, md: 0 }}
            >
              {/*** row: return home ***/}
              <Item>
                <Box
                  sx={{
                    position: "relative",
                    top: 0,
                    left: 0,
                    width: "60px",
                    height: "100vh",
                    zIndex: 4,
                    backgroundColor: "#00415E",
                  }}
                >
                  <Box
                    pt={4}
                    sx={{
                      position: "relative",
                      top: 0,
                      left: 0,
                      width: "60px",
                      height: "100vh",
                      background:
                        "linear-gradient(90deg,  rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
                    }}
                  >
                    <Link href="/">
                      <Box sx={{ cursor: "pointer" }}>
                        <Image
                          src="/imgs/returnHomePage2.png"
                          alt="about open image"
                          width={60}
                          height={429}
                        />
                      </Box>
                    </Link>
                  </Box>
                </Box>
              </Item>

              <Item>
                <Stack
                  direction={{ xs: "column", md: "column" }}
                  spacing={{ xs: 0, md: 0 }}
                >
                  {/*** row: project intro ***/}
                  <Item>
                    {/*** background image ***/}
                    <Box
                      sx={{
                        position: "absolute",
                        width: "calc(100vw - 60px)",
                        height: "100vh",
                        zIndex: 0,
                        opacity: 0.6,
                      }}
                    >
                      <Image
                        src={`${process.env.DIRECTUS_CDN}/assets/${project.cover.filename_disk}`}
                        placeholder="blur"
                        blurDataURL={`${process.env.DIRECTUS_CDN}/assets/${project.cover.filename_disk}`}
                        alt="bg"
                        layout="fill"
                        objectFit="cover"
                        priority="true"
                        as="image"
                      />
                    </Box>
                    {/*** text ***/}
                    <Box
                      p={"48px 16px 8px 24px"}
                      sx={{
                        width: "100%",
                        height: "calc(100vh - 100px)",
                        position: "relative",
                        zIndex: 3,
                        // overflowY: "scroll",
                        // scrollbarWidth: "thin !important",
                        // scrollbarColor: "#888 #333 !important",
                        // "&::-webkit-scrollbar": {
                        //   width: "4px",
                        //   backgroundColor: "#333",
                        // },
                        // "&::-webkit-scrollbar-thumb ": {
                        //   backgroundColor: "#888",
                        // },
                      }}
                    >
                      <Box className="scrollContent">
                        {useLang == true ? (
                          <>
                            <Box
                              className="pt"
                              sx={{
                                textAlign: "left",
                                fontFamily: "Noto Sans JP",
                                fontSize: { xs: 30, md: 40 },
                                fontWeight: 700,
                                lineHeight: 1.4,
                                color: "#fff",
                                textShadow: "0.06em 0.06em 0.12em #000",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: project.introTitle_tw,
                              }}
                            />
                            <Box
                              className="pt"
                              pt={5}
                              sx={{
                                textAlign: "justify",
                                fontWeight: 400,
                                color: "#fff",
                                fontFamily: "Noto Sans JP",

                                fontSize: { xs: 14, md: 16 },
                                fontWeight: 400,
                                lineHeight: 1.75,
                                letterSpacing: "-0.05em",
                                textShadow: "0.06em 0.06em 0.12em #000",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: project.introContent_tw,
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <Box
                              className="pt"
                              sx={{
                                textAlign: "left",
                                fontFamily: "Noto Sans JP",
                                // textTransform: "capitalize",
                                fontSize: { xs: 30, md: 40 },
                                fontWeight: 700,
                                lineHeight: 1.4,
                                color: "#fff",
                                textShadow: "0.06em 0.06em 0.12em #000",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: project.introTitle_en,
                              }}
                            />
                            <Box
                              className="pt"
                              pt={5}
                              sx={{
                                textAlign: "justify",
                                fontWeight: 400,
                                color: "#fff",
                                fontFamily: "Noto Sans JP",
                                fontSize: { xs: 14, md: 16 },
                                fontWeight: 400,
                                lineHeight: 1.75,
                                letterSpacing: "-0.05em",
                                textShadow: "0.06em 0.06em 0.12em #000",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: project.introContent_en,
                              }}
                            />
                          </>
                        )}
                      </Box>
                    </Box>
                  </Item>
                  {/*** row: slider of articles ***/}
                  <Item>
                    <Box
                      key={project.id}
                      sx={{
                        backgroundColor: "#BCACA8",
                        height: { xs: 100, md: "100vh" },
                        maxWidth: { xs: "calc(100% - 0px)", md: 480 },
                        maxHeight: { xs: 100, md: "100vh" },
                      }}
                    >
                      <>
                        <ArticleSlider project={project} useLang={useLang} />
                      </>
                    </Box>
                  </Item>
                </Stack>
              </Item>
            </Stack>
          </Box>
        ))}
      </Box>
    </>
  );
}

export async function getServerSideProps({ params }) {
  // console.log(params); // { id: '2' }
  // Run API calls in parallel
  const [projects] = await Promise.all([
    await fetchData(
      `
      query  {
        projects  (filter: { mainTitle_en: { _eq: "${params.mainTitle_en}"} }){
          id
          mainTitle_tw, 
          mainTitle_en,
          nation_tw,
          nation_en,
          cover{
            id
            filename_disk
          }
          introTitle_tw,
          introTitle_en,
          introContent_tw,
          introContent_en,
          articles{
            id     
            articles_id {
                id
                sort
                slug
                title_tw
                title_en
            }
         },
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
      projects: projects?.data || {},
    },
    //revalidate: 1,
  };
}
