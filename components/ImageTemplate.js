import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import Slider from "react-slick";
import ReactPlayer from "react-player";

/******************/
/*** stack ***/
const Item = styled(Paper)(({ theme }) => ({
  background: "none",
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "none",
  color: "#fff",
}));
/***************************/
/*** react-slick setting ***/
function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "block",
        width: 53.7,
        height: 56,
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          right: "-50px",
        }}
      >
        <Image
          src="/imgs/nextBtn.png"
          alt="about open image"
          width={53.7}
          height={56}
        />
      </Box>
    </div>
  );
}
function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "block",
        width: 53.7,
        height: 56,
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          left: "-50px",
        }}
      >
        <Image
          src="/imgs/prevBtn.png"
          alt="about open image"
          width={53.7}
          height={56}
        />
      </Box>
    </div>
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

export default function ImageTemplate({ article_content, useLang }) {
  return (
    <>
      <Box pt={6}>
        <Stack
          direction={{ xs: "column", md: "column" }}
          spacing={{ xs: 0, md: 0 }}
        >
          {/*** column: image ***/}
          <Item>
            <Box ml={{ xs: 0, md: 4 }} p={2}>
              <Slider {...settings}>
                {article_content.imageTemplate_images &&
                  article_content.imageTemplate_images.map((image) => (
                    <Box key={image.imageInfos_id.id}>
                      {/* <Box>{image.imageInfos_id.image.filename_disk}</Box> */}
                      <Box>
                        {image.imageInfos_id.description_tw &&
                          image.imageInfos_id.videoURL == null ? (
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: { xs: 150, md: "75vh" },
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
                              height: { xs: 150, md: "75vh" },
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
                      <Box>
                        {useLang == true ? (
                          <Box
                            className="pt"
                            pt={2}
                            sx={{
                              position: "relative",
                              height: "15vh",
                              overflow: "scroll",
                              scrollbarWidth: "none",
                              "&::-webkit-scrollbar": { display: "none" },
                              fontFamily: "Noto Sans JP",
                              fontWeight: 300,
                              fontSize: 14,
                              textAlign: "center",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: image.imageInfos_id.description_tw,
                            }}
                          />
                        ) : (
                          <Box
                            className="pt"
                            pt={2}
                            sx={{
                              position: "relative",
                              height: "15vh",
                              overflow: "scroll",
                              scrollbarWidth: "none",
                              "&::-webkit-scrollbar": { display: "none" },
                              fontFamily: "Noto Sans JP",
                              fontWeight: 300,
                              fontSize: 14,
                              textAlign: "center",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: image.imageInfos_id.description_en,
                            }}
                          />
                        )}
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
