import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export default function ArticleSlider({ articles }) {
  /*******************/
  /*** keen slider ***/
  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "snap",
    rtl: false,
    slides: {
      //number: 5,
      perView: 4,
    },
  });
  return (
    <>
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
        {articles.articles &&
          articles.articles.map((article) => (
            <Box
              key={article.articles_id.id}
              className="keen-slider__slide"
              style={{ maxWidth: 56, minWidth: 56 }}
              sx={{ cursor: "pointer", backgroundColor: "#BCACA8" }}
            >
              <Link
                href={`/projects/${encodeURIComponent(
                  articles.id
                )}/${encodeURIComponent(article.articles_id.sort)}`}
              >
                <Box
                  sx={{
                    position: "relative",
                    // width: "100%",
                    height: "100vh",
                    color: "#000",
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                    backgroundColor: "#BCACA8",
                    borderRight: "1px solid #000",
                    zIndex: 1,
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
                        __html: article.articles_id.title_tw,
                      }}
                    />
                  </Box>
                </Box>
              </Link>
            </Box>
          ))}
      </Box>
    </>
  );
}
