import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import fetchData from "../lib/api";
import fetchAPI from "../lib/myapi";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { motion } from "framer-motion";

export default function Test({ projects }) {
  console.log(projects.projects_by_id);
  return (
    <Box>
      <Box>{projects.projects_by_id.id}</Box>
      <Box>{projects.projects_by_id.mainTitle_tw}</Box>
      {/* <Box>
        {projects.projects_by_id.articles.map((article) => (
          <>
            {console.log(article.id)}
            <Box key={article.id}>{article.articles_id.title_tw}</Box>
          </>
        ))}
      </Box> */}
    </Box>
  );
}

export async function getServerSideProps() {
  // Run API calls in parallel
  const [projects] = await Promise.all([
    await fetchData(
      `
      query  {
        projects_by_id(id: 1) {
          id
          mainTitle_tw, 
          mainTitle_en,
          articles{
              id
              articles_id {
                id
                title_tw
              }
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
      projects: projects.data,
    },
    //revalidate: 1,
  };
}
