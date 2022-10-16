import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import Slider from "react-slick";

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
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

export default function TextImageTemplate({ article_content, useLang }) {
  return (
    <>
      <Box p={"144px 32px 8px 32px"}>
        <Stack direction={{ xs: "row", md: "row" }} spacing={{ xs: 2, md: 2 }}>
          {/*** row: text ***/}
          <Item sx={{ width: "50%", height: "100vh" }}>
            <Stack
              direction={{ xs: "row", md: "column" }}
              spacing={{ xs: 18, md: 13 }}
            >
              {/*** column: title ***/}
              <Item>
                <Box>
                  {useLang == true ? (
                    <Box
                      className="pt"
                      sx={{
                        fontFamily: "ChironSungHK-SB",
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
                        fontFamily: "ChironSungHK-SB",
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
                    height: "55vh",
                    borderTop: "5px solid #00415E",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  {useLang == true ? (
                    <Box
                      className="pt"
                      pt={2}
                      sx={{
                        fontFamily: "ChironHeiHK-L",
                        fontWeight: 300,
                        fontSize: 20,
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
                        fontFamily: "ChironHeiHK-L",
                        fontWeight: 300,
                        fontSize: 20,
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
              </Item>
            </Stack>
          </Item>
          {/*** row: image ***/}
          <Item
            sx={{
              width: "50%",
              height: "100vh",
            }}
          >
            <Box pl={6}>
              <Slider {...settings}>
                {article_content.textImageTemplate_images &&
                  article_content.textImageTemplate_images.map((image) => (
                    <Box key={image.imageInfos_id.id}>
                      {/* <Box>{image.imageInfos_id.image.filename_disk}</Box> */}
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: 300,
                          zIndex: 0,
                        }}
                      >
                        <Image
                          src={`http://localhost:8055/assets/${image.imageInfos_id.image.filename_disk}`}
                          placeholder="blur"
                          blurDataURL={`http://localhost:8055/assets/${image.imageInfos_id.image.filename_disk}`}
                          alt=""
                          layout="fill"
                          objectFit="contain"
                        />
                      </Box>
                      <Box>
                        {useLang == true ? (
                          <Box
                            className="pt"
                            p={6}
                            sx={{
                              fontFamily: "ChironHeiHK-L",
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
                            p={6}
                            sx={{
                              fontFamily: "ChironHeiHK-L",
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
