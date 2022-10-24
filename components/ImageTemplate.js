import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import Slider from "react-slick";

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
            <Box ml={{ xs: 0, md: 4 }} p={1}>
              <Slider {...settings}>
                {article_content.imageTemplate_images &&
                  article_content.imageTemplate_images.map((image) => (
                    <Box key={image.imageInfos_id.id}>
                      {/* <Box>{image.imageInfos_id.image.filename_disk}</Box> */}
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "80vh",
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
