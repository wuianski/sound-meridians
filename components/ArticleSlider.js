import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import SwipeLeftIcon from "@mui/icons-material/SwipeLeft";
import SwipeIcon from "@mui/icons-material/Swipe";
import KeyboardArrowLeftSharpIcon from "@mui/icons-material/KeyboardArrowLeftSharp";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";

export default function ArticleSlider({ project, useLang }) {
  /*******************/
  /*** keen slider ***/
  // const [sliderRef] = useKeenSlider({
  //   initial: 0,
  //   loop: false,
  //   mode: "snap",
  //   rtl: false,
  //   slides: {
  //     //number: 5,
  //     perView: 4,
  //   },
  // });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 4,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#BCACA8",
          width: "260px",
          height: "100vh",
          color: "#ff0000",
          borderRight: "1px solid #000",
        }}
        ref={sliderRef}
        className="keen-slider"
        style={{ maxWidth: 260, maxHeight: "100vh" }}
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
                        top: 30,
                        display: "inline-flex",
                      }}
                    >
                      {useLang == true ? (
                        <Box
                          className="pt"
                          sx={{
                            fontSize: 22,
                            fontFamily: "Noto Serif JP",
                            fontWeight: 700,
                            textOrientation: "upright",
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
                  </Box>
                </Box>
              </Link>
            </Box>
          ))}
      </Box>
      <Box sx={{ position: "absolute", bottom: 0 }}>
        {/* <Box pb={0} pr={2} sx={{ width: 360, textAlign: "right" }}>
          <SwipeIcon sx={{ color: "#000" }} />
        </Box> */}
        {loaded && instanceRef.current && (
          <>
            <Box pl={1} x={{ width: 260, textAlign: "left" }}>
              <KeyboardArrowLeftSharpIcon
                left="true"
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
                sx={{ cursor: "pointer", color: "#000", fontSize: "xx-large" }}
              />
            </Box>
            <Box mt={"-36.95px"} pr={1} sx={{ width: 260, textAlign: "right" }}>
              <KeyboardArrowRightSharpIcon
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
                sx={{ cursor: "pointer", color: "#000", fontSize: "xx-large" }}
              />
            </Box>
          </>
        )}
      </Box>
      {/* {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )} */}
    </>
  );
}
