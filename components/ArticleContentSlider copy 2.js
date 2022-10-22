import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";

import TextTemplate from "../components/TextTemplate";
import TextImageTemplate from "../components/TextImageTemplate";

export default function ArticleContentSlider({ article_content }) {
  return (
    <>
      <Box>ArticleContentSlider</Box>
      {/* <TextTemplate article_content={article_content} /> */}
      <Box>
        {/*** vvv articles ***/}
        {article_content.articles &&
          article_content.articles.map((article) => (
            <Box key={article.id}>
              {/*** vvv each article's contents ***/}
              {article.articles_id &&
                article.articles_id.contents.map((contents) => (
                  <Box key={contents.articleContents_id.id}>
                    {/*** vvv each article's content of text template ***/}
                    {contents.articleContents_id.contentType == 1 && (
                      <>
                        <TextTemplate
                          article_content={contents.articleContents_id}
                        />
                      </>
                    )}
                    {/*** vvv each article's content of text and image template ***/}
                    {contents.articleContents_id.contentType == 3 && (
                      <>
                        <TextImageTemplate
                          article_content={contents.articleContents_id}
                        />
                      </>
                    )}
                  </Box>
                ))}
            </Box>
          ))}
      </Box>
    </>
  );
}
