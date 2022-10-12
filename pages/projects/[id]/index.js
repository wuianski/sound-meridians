import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import fetchData from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { motion } from "framer-motion";
// import { useRouter } from "next/router";

import ArticleSlider from "../../../components/ArticleSlider";

import returnHomePage from "../../../public/imgs/returnHomePage.png";

import projectCover from "../../../public/imgs/2_Volksempfänger_poster.jpg";

/******************/
/*** stack ***/
const Item = styled(Paper)(({ theme }) => ({
  background: "none",
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "#00415E",
}));

export default function Project({ projects }) {
  return (
    <>
      <Stack direction={{ xs: "row", md: "row" }} spacing={{ xs: 0, md: 0 }}>
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
            >
              <Image
                src={returnHomePage}
                alt="about open image"
                layout="intrinsic"
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
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 40,
                display: "inline-flex",
              }}
            >
              <Box
                className="pt"
                sx={{ fontSize: 26 }}
                dangerouslySetInnerHTML={{
                  __html: projects.projects_by_id.mainTitle_tw,
                }}
              ></Box>
              <Box
                className="pt"
                mt={2}
                sx={{ fontSize: 19 }}
                dangerouslySetInnerHTML={{
                  __html: projects.projects_by_id.mainTitle_en,
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                bottom: 40,
                fontSize: 17,
                display: "inline-flex",
              }}
            >
              <Box
                className="pt"
                dangerouslySetInnerHTML={{
                  __html: projects.projects_by_id.nation_tw,
                }}
              ></Box>
              <Box
                className="pt"
                mt={2}
                dangerouslySetInnerHTML={{
                  __html: projects.projects_by_id.nation_en,
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
              width: "calc(100vw - 532px)",
              height: "100vh",
              zIndex: 0,
            }}
          >
            {/* <Image
              src={projectCover}
              placeholder="blur"
              alt="bg"
              layout="fill"
              objectFit="cover"
            /> */}
          </Box>
          {/*** text ***/}
          <Box
            p={"50px 52px 27px 220px"}
            sx={{
              height: "100vh",
              overflowY: "scroll",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              position: "relative",
              zIndex: 3,
            }}
          >
            <Box
              className="pt"
              sx={{
                textAlign: "left",
                fontSize: 50,
                fontWeight: 600,
                color: "#fff",
              }}
              dangerouslySetInnerHTML={{
                __html: projects.projects_by_id.introTitle_tw,
              }}
            />
            <Box
              className="pt"
              pt={5}
              sx={{
                textAlign: "left",
                fontWeight: 400,
                color: "#fff",
                fontSize: 20,
              }}
              dangerouslySetInnerHTML={{
                __html: projects.projects_by_id.introContent_tw,
              }}
            />
          </Box>
        </Item>
        {/*** row: slider of articles ***/}
        <Item>
          <Box
            key={projects.projects_by_id.id}
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
              <ArticleSlider articles={projects.projects_by_id} />
            </>
          </Box>
        </Item>
      </Stack>
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
        projects_by_id(id: ${params.id}) {
          id
          mainTitle_tw, 
          mainTitle_en,
          nation_tw,
          nation_en,
          introTitle_tw,
          introTitle_en,
          introContent_tw,
          introContent_en,
          articles{
            id     
            articles_id {
                id
                sort
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
