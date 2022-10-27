import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import Slider from "react-slick";
import ReactPlayer from "react-player";

/*************/
/*** stack ***/
const Item = styled(Paper)(({ theme }) => ({
  background: "none",
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "none",
  color: "#fff",
  // marginLeft: "auto",
  // marginRight: "auto",
}));
/***************************/
/*** react-slick setting ***/
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#00415E",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#00415E",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}
const settings = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

export default function TextImageTemplate({ article_content, useLang }) {
  /*** !!adding for react-player to use ***/
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Box
        p={{ xs: "48px 8px 8px 8px", md: "104px 0px 10px 0px" }}
        sx={{
          width: "100%",
          maxWidth: { md: "60vw", lg: 800, xl: 1000 },
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 6 }}
        >
          {/*** row: text ***/}
          <Item
            sx={{
              width: { xs: "100%", md: "50%" },
              height: { xs: "40vh", md: "100vh" },
            }}
          >
            <Stack
              direction={{ xs: "column", md: "column" }}
              spacing={{ xs: 0, md: 0 }}
            >
              {/*** column: title ***/}
              <Item>
                <Box
                  ml={{ xs: 2, md: 0 }}
                  sx={{
                    position: "relative",
                    width: { xs: "calc(100% - 40px)", md: "calc(100% - 40px)" },
                    height: { xs: "10vh", md: "15vh" },
                    background: "none",
                    borderBottom: "5px solid #00415E",
                  }}
                >
                  {useLang == true ? (
                    <Box
                      className="pt"
                      sx={{
                        fontFamily: "Noto Serif JP",
                        fontWeight: 700,
                        fontSize: 30,
                        lineHeight: 1.2,
                        textAlign: "center",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: article_content.textImageTemplate_title_tw,
                      }}
                    />
                  ) : (
                    <Box
                      className="pt"
                      sx={{
                        fontFamily: "Noto Serif JP",
                        // textTransform: "capitalize",
                        fontWeight: 700,
                        fontSize: 30,
                        lineHeight: 1.2,
                        textAlign: "center",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: article_content.textImageTemplate_title_en,
                      }}
                    />
                  )}
                </Box>
              </Item>
              {/*** column: content ***/}
              <Item>
                <Box
                  sx={{
                    position: "relative",
                    //width: "100%",
                    height: { xs: "30vh", md: "55vh" },
                    //borderTop: "5px solid #00415E",
                    // overflowY: "scroll",
                    // scrollbarWidth: "1px !important",
                    // scrollbarColor: "#888 #333 !important",
                    // "&::-webkit-scrollbar": {
                    //   width: "1px",
                    // },
                    // "&::-webkit-scrollbar-thumb ": {
                    //   backgroundColor: "#888",
                    // },
                  }}
                >
                  <Box className="scrollContent">
                    {useLang == true ? (
                      <Box
                        className="pt"
                        pt={2}
                        pl={{ xs: 2, md: 0 }}
                        sx={{
                          fontFamily: "Noto Sans JP",
                          fontWeight: 300,
                          fontSize: { xs: 14, md: 16 },
                          lineHeight: 1.75,
                          textAlign: "justify",
                          letterSpacing: "-0.05em",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: article_content.textImageTemplate_content_tw,
                        }}
                      />
                    ) : (
                      <Box
                        className="pt"
                        pt={2}
                        sx={{
                          fontFamily: "Noto Sans JP",
                          fontWeight: 300,
                          fontSize: { xs: 14, md: 16 },
                          lineHeight: 1.75,
                          textAlign: "justify",
                          letterSpacing: "-0.05em",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: article_content.textImageTemplate_content_en,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Item>
            </Stack>
          </Item>
          {/*** row: image ***/}
          <Item
            sx={{
              width: { xs: "100%", md: "50%" },
              height: { xs: "40vh", md: "100vh" },
            }}
          >
            <Box pl={{ xs: 3, md: 3 }} pr={{ xs: 3, md: 0 }}>
              <Slider {...settings}>
                {article_content.textImageTemplate_images &&
                  article_content.textImageTemplate_images.map((image) => (
                    <Box
                      key={image.imageInfos_id.id}
                      sx={{
                        background: "none",
                        position: "relative",
                        height: { xs: "30vh", md: "70vh" },
                        // borderTop: "5px solid #00415E",
                        // overflowY: "scroll",
                        // scrollbarWidth: "none",
                        // "&::-webkit-scrollbar": { display: "none" },
                      }}
                    >
                      {/*** column: image ***/}
                      <Box>
                        {image.imageInfos_id.description_tw &&
                        image.imageInfos_id.videoURL == null ? (
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: { xs: 150, md: 300 },
                              zIndex: 0,
                            }}
                          >
                            <Image
                              src={`${process.env.DIRECTUS_CDN}/assets/${image.imageInfos_id.image.filename_disk}`}
                              placeholder="blur"
                              blurDataURL={`${process.env.DIRECTUS_CDN}/assets/${image.imageInfos_id.image.filename_disk}`}
                              alt=""
                              layout="fill"
                              objectFit="contain"
                            />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: { xs: 150, md: 300 },
                              zIndex: 0,
                            }}
                            className="player-wrapper"
                          >
                            <ReactPlayer
                              className="react-player"
                              url={image.imageInfos_id.videoURL}
                              width="100%"
                              height="100%"
                              controls={true}
                              config={{
                                youtube: {
                                  playerVars: {
                                    enablejsapi: 1,
                                    origin: "https://www.youtube.com",
                                  },
                                },
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                      {/*** column: image description ***/}
                      <Box
                        mt={1}
                        pl={{ xs: 2, md: 4 }}
                        sx={{
                          background: "none",
                          position: "absolute",
                          width: "100%",
                          height: {
                            xs: "calc(100% - 100px)",
                            md: "calc(100% - 260px)",
                          },
                          // overflowY: "scroll",
                          // scrollbarWidth: "1px !important",
                          // scrollbarColor: "#888 #333 !important",
                          // "&::-webkit-scrollbar": {
                          //   width: "1px",
                          //   //backgroundColor: "#333",
                          // },
                          // "&::-webkit-scrollbar-thumb ": {
                          //   backgroundColor: "#888",
                          // },
                        }}
                      >
                        <Box className="scrollContent">
                          {useLang == true ? (
                            <Box
                              className="pt"
                              p={{
                                xs: "8px 8px 64px 16px",
                                md: "24px 0px 64px 0px",
                              }}
                              sx={{
                                fontFamily: "Noto Sans JP",
                                fontWeight: 300,
                                fontSize: { xs: 12, md: 14 },
                                textAlign: "center",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: image.imageInfos_id.description_tw,
                              }}
                            />
                          ) : (
                            <Box
                              className="pt"
                              p={{
                                xs: "8px 8px 16px 8px",
                                md: "24px 0px 64px 0px",
                              }}
                              sx={{
                                fontFamily: "Noto Sans JP",
                                fontWeight: 300,
                                fontSize: { xs: 12, md: 14 },
                                textAlign: "center",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: image.imageInfos_id.description_en,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                      {/* <Box>{image.imageInfos_id.image.filename_disk}</Box> */}
                    </Box>
                  ))}
              </Slider>
            </Box>
          </Item>
        </Stack>
      </Box>
    </>
  );
}
