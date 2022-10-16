import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import TextTemplate from "../components/TextTemplate";
import TextImageTemplate from "../components/TextImageTemplate";
// import dynamic from "next/dynamic";
// const TextImageTemplate = dynamic(() =>
//   import("../components/TextImageTemplate")
// );
//   {
//     suspense: true,
//   }
// );
import TimelineTemplate from "../components/TimelineTemplate";
import ImageTemplate from "../components/ImageTemplate";

export default function ArticleContentSlider({ article_content, useLang }) {
  /*******************/
  /*** keen slider ***/
  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: false,
    mode: "snap",
    rtl: false,
    slides: {
      //number: 5,
      perView: 1,
    },
  });
  return (
    <>
      {/* <Box>ArticleContentSlider</Box> */}
      {/* <TextTemplate article_content={article_content} /> */}
      <Box>
        {/*** vvv articles ***/}
        {article_content.articles &&
          article_content.articles.map((article) => (
            <Box
              key={article.id}
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                borderRight: "1px solid #000",
              }}
              ref={sliderRef}
              className="keen-slider"
              //style={{ maxWidth: 480, maxHeight: "100vh" }}
            >
              {/*** vvv each article's contents ***/}
              {article.articles_id &&
                article.articles_id.contents.map((contents) => (
                  <Box
                    key={contents.articleContents_id.id}
                    className="keen-slider__slide"
                    sx={{ height: "100vh" }}
                    //style={{ maxWidth: 56, minWidth: 56 }}
                  >
                    {/*** vvv each article's content of text template ***/}
                    {contents.articleContents_id.contentType == 1 && (
                      <>
                        <TextTemplate
                          article_content={contents.articleContents_id}
                          useLang={useLang}
                        />
                      </>
                    )}
                    {/*** vvv each article's content of text and image template ***/}
                    {contents.articleContents_id.contentType == 3 && (
                      <>
                        <TextImageTemplate
                          article_content={contents.articleContents_id}
                          useLang={useLang}
                        />
                      </>
                    )}
                    {/*** vvv each article's content of timeline template ***/}
                    {contents.articleContents_id.contentType == 4 && (
                      <>
                        <TimelineTemplate
                          article_content={contents.articleContents_id}
                          useLang={useLang}
                        />
                      </>
                    )}
                    {/*** vvv each article's content of image template ***/}
                    {contents.articleContents_id.contentType == 2 && (
                      <>
                        <ImageTemplate
                          article_content={contents.articleContents_id}
                          useLang={useLang}
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
