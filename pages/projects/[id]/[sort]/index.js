import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import fetchData from "../../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { motion } from "framer-motion";

import { useRouter } from "next/router";

export default function Article({ projects }) {
  //console.log(projects);
  // const router = useRouter();
  // const id = router.query.id;
  return (
    <>
      {/*** vvv articles ***/}
      {projects.projects_by_id.articles.map((article) => (
        <Box key={article.id}>
          {/*** vvv each article's title_tw ***/}
          {article.articles_id && <Box>{article.articles_id.title_tw}</Box>}
          {/*** vvv each article's contents ***/}
          {article.articles_id &&
            article.articles_id.contents.map((contents) => (
              <Box key={contents.articleContents_id.id}>
                {/*** vvv each article's content of text template ***/}
                {contents.articleContents_id.contentType == 1 && (
                  <>
                    <Box>text template</Box>
                    <Box>
                      {contents.articleContents_id.textTemplate_title_tw}
                    </Box>
                  </>
                )}
                {/*** vvv each article's content of text and image template ***/}
                {contents.articleContents_id.contentType == 3 && (
                  <>
                    <Box>text and image template</Box>
                    <Box>
                      {contents.articleContents_id.textImageTemplate_title_tw}
                    </Box>
                  </>
                )}
                {/* <Box>{contents.articleContents_id.contentType}</Box>
                <Box>{contents.articleContents_id.textTemplate_title_tw}</Box> */}
              </Box>
            ))}
        </Box>
      ))}
    </>
  );
}

// export async function getServerSideProps() {
//   //const params = 3;
//   // Run API calls in parallel
//   const [articles] = await Promise.all([
//     await fetchData(
//       `
//       query  {
//         articles_by_id(id: 1){
//           id
//           projects{
//               projects_id{
//                   id
//               }
//           }

//       }
//       `,
//       {
//         variables: {},
//       }
//     ),
//   ]);

//   return {
//     props: {
//       articles: articles?.data || {},
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ params }) {
  //console.log(params); // { id: '2', sort: '2' }
  // Run API calls in parallel
  const [projects] = await Promise.all([
    await fetchData(
      `
      query  {
        projects_by_id(id: ${params.id}) {
          id
          articles{
            id
            articles_id (filter: { sort: { _eq: ${params.sort} } }){
                id
                sort
                title_tw
                title_en
                contents{
                  id 
                  articleContents_id{
                      id
                      contentType
                      textTemplate_title_tw
                      textTemplate_title_en
                      textTemplate_content_tw
                      textTemplate_content_en
                      textImageTemplate_title_tw
                      textImageTemplate_title_en
                      textImageTemplate_content_tw
                      textImageTemplate_content_en
                      textImageTemplate_images{
                          imageInfos_id{
                              id
                              image{
                                  id
                                  filename_disk
                              }
                          }
                      }
                  }
                  
              }
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
