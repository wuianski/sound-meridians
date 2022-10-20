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
//import returnHomePage from "../../../public/imgs/returnHomePage.png";

import { useRouter } from "next/router";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowDownSharpIcon from "@mui/icons-material/KeyboardDoubleArrowDownSharp";

/******************/
/*** stack ***/
const Item = styled(Paper)(({ theme }) => ({
  background: "none",
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "#00415E",
}));

export default function Project({ projects, useLang }) {
  const router = useRouter();
  // const query = router.query;
  // const langEN = query.useLang;
  //console.log(langEN);

  // useEffect(() => {
  //   if (langEN === true) {
  //     console.log("switch to tab1");
  //     /*** switch to tab1 ***/
  //     //setValue(0);
  //   } else if (tabState === false) {
  //     console.log("switch to tab2");
  //     /*** switch to tab2 ***/
  //     //setValue(1);
  //   }
  // }, [langEN]);

  return (
    <>
      {projects.projects.map((project, idx) => (
        <Box key={project.id}>
          <Stack
            direction={{ xs: "row", md: "row" }}
            spacing={{ xs: 0, md: 0 }}
          >
            {/*** row: return home ***/}
            <Item>
              <Link href="/">
                <Box
                  sx={{
                    position: "relative",
                    top: 0,
                    left: 0,
                    width: "92px",
                    height: "100vh",
                    cursor: "pointer",
                    zIndex: 3,
                  }}
                  ml={-2}
                  mr={-2}
                >
                  <Image
                    src="/imgs/returnHomePage.png"
                    alt="about open image"
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              </Link>
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
                    top: 40,
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
                    left: 8,
                    bottom: 40,
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
                  width: "calc(100vw - 500px)",
                  height: "100vh",
                  zIndex: 0,
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
                p={"50px 52px 27px 220px"}
                sx={{
                  height: "96vh",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                  position: "relative",
                  zIndex: 3,
                }}
              >
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
                        textTransform: "capitalize",
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
              <Box
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
              </Box>
            </Item>
            {/*** row: slider of articles ***/}
            <Item>
              <Box
                key={project.id}
                sx={{
                  backgroundColor: "#fff",
                  width: "360px",
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
