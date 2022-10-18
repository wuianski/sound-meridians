import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export default function ArticleSlider({ project, useLang }) {
  /*******************/
  /*** keen slider ***/
  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: false,
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
          backgroundColor: "#BCACA8",
          width: "480px",
          height: "100vh",
          color: "#ff0000",
          borderRight: "1px solid #000",
        }}
        ref={sliderRef}
        className="keen-slider"
        style={{ maxWidth: 480, maxHeight: "100vh" }}
      >
        {project &&
          project.articles.map((article) => (
            <Box key={article.articles_id.id} sx={{ cursor: "pointer" }}>
              <Link
                href={`/projects/${project.mainTitle_en}/${article.articles_id.slug}`}
              >
                <Box
                  className="keen-slider__slide"
                  style={{ maxWidth: 56, minWidth: 56 }}
                  sx={{ backgroundColor: "#BCACA8" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      // width: "100%",
                      height: "100vh",
                      color: "#000",
                      writingMode: "vertical-lr",
                      backgroundColor: "#BCACA8",
                      borderRight: "1px solid #000",
                      zIndex: 1,
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
                      {useLang == true ? (
                        <Box
                          className="pt"
                          sx={{
                            fontSize: 22,
                            fontFamily: "ChironSungHK-SB",
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
                          }}
                          dangerouslySetInnerHTML={{
                            __html: article.articles_id.title_en,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Link>
            </Box>
          ))}
      </Box>
    </>
  );
}
