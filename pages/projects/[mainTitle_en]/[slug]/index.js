import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import fetchData from "../../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import TextTemplate from "../../../../components/TextTemplate";
import ArticleContentSlider from "../../../../components/ArticleContentSlider";

//import returnHomePage from "../../../../public/imgs/returnHomePage.png";

/******************/
/*** stack ***/
const Item = styled(Paper)(({ theme }) => ({
  background: "none",
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "#00415E",
}));

export default function Article({ projects, useLang }) {
  //console.log(projects);
  // const router = useRouter();
  // const id = router.query.id;
  const sliderRef = useRef();
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
              <Link href={`/projects/${project.mainTitle_en}`}>
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
                    cursor: "pointer",
                    borderRight: "1px solid #000",
                    borderLeft: "1px solid #000",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        position: "absolute",
                        left: 8,
                        top: 30,
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
                </Box>
              </Link>
            </Item>
            {/*** row: article name ***/}
            <Item>
              <Box
                sx={{
                  position: "relative",
                  width: 80,
                  height: "100vh",
                  color: "#000",
                  writingMode: "vertical-lr",
                  textOrientation: "mixed",
                  backgroundColor: "#BCACA8",
                  zIndex: 3,
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
                  {project.articles &&
                    project.articles.map((article) => (
                      <Box key={article.id}>
                        {/*** article's title_tw ***/}
                        {article.articles_id && (
                          <Box>
                            {useLang == true ? (
                              <Box
                                className="pt"
                                sx={{
                                  fontSize: 22,
                                  fontFamily: "Noto Serif JP",
                                  fontWeight: 700,
                                  textOrientation: "mixed",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: article.articles_id.title_tw,
                                }}
                              />
                            ) : (
                              <Box
                                className="pt"
                                sx={{
                                  fontSize: 13,
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
                        )}
                      </Box>
                    ))}
                </Box>
              </Box>
            </Item>
            {/*** row: article content ***/}
            <Item>
              <Box
                sx={{
                  width: "calc(100vw - 220px)",
                  height: "100vh",
                  backgroundColor: "#000",
                }}
              >
                <ArticleContentSlider
                  article_content={project}
                  useLang={useLang}
                  sliderRef={sliderRef}
                />
              </Box>
            </Item>
          </Stack>
        </Box>
      ))}
    </>
  );
}

export async function getServerSideProps({ params }) {
  //console.log(params); // { id: '2', sort: '2' }
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
          articles {
            id 
            articles_id (filter: { slug: { _eq: "${params.slug}" } }){
                id
                sort
                slug
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
                              description_tw
                              description_en
                              videoURL
                          }
                      }
                      timelineTemplate_timelines{
                        id
                        timelineInfos_id{
                            id
                            year
                            content_tw
                            content_en
                        }
                      }
                      imageTemplate_images{
                        id
                        imageInfos_id{
                            id
                            image{
                                id
                                filename_disk
                            }
                            description_tw
                            description_en
                        }
                      }
                  }  
                }
                         
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
      projects: projects?.data || {},
    },
    //revalidate: 1,
  };
}
