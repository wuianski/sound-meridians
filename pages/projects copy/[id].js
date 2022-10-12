import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import fetchData from "../../lib/api";
import fetchAPI from "../../lib/myapi";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { motion } from "framer-motion";

export default function Project({ projects }) {
  /** organize all articles data **/
  const myArticles = projects.projects_by_id.articles.map((articles) => {
    let result = {
      id: articles.articles_id.id,
      mainTitle_tw: articles.articles_id.mainTitle_tw,
      //mainTitle_tw: articles.articles_id.contents.map((contents) => {
      //   return article.mainTitle_tw;
      // }),
      // bookCover:
      //   !!book.cover && !!book.cover.url
      //     ? book.cover.url
      //     : "/IMGs/noBook_img.jpg",
    };

    return result;
  });
  console.log(myArticles);

  return (
    <Box key={projects.projects_by_id.id}>
      <Box>{projects.projects_by_id.id}</Box>
      <Box>{projects.projects_by_id.mainTitle_tw}</Box>
      <>
        {/*** vvv articles  ***/}
        {projects.projects_by_id.articles.map((article) => (
          /*** vvv must have key below vvv ***/
          /*** each article title ***/
          //console.log(article),
          <Box key={article.articles_id.id}>{article.articles_id.title_tw}</Box>
        ))}
      </>
      <>
        {/*** vvv articles  ***/}
        {projects.projects_by_id.articles.map((article) => (
          <Box key={article.articles_id.id}>
            {article.articles_id.contents.map((contents) => (
              <Box key={contents.articleContents_id.id}>
                {contents.articleContents_id.contentType == 1 && (
                  <>
                    <Box>text template</Box>
                    <Box>
                      {contents.articleContents_id.textTemplate_title_tw}
                    </Box>
                  </>
                )}
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
    </Box>
  );
}

export async function getServerSideProps({ params }) {
  //const params = 3;
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
