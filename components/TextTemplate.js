import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

/******************/
/*** stack ***/
const Item = styled(Paper)(({ theme }) => ({
  background: "none",
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "none",
  color: "#fff",
}));

export default function TextTemplate({ article_content, useLang }) {
  return (
    <>
      <Box p={13}>
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
                    fontFamily: "Noto Serif JP",
                    fontWeight: 900,
                    fontSize: 78,
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: article_content.textTemplate_title_tw,
                  }}
                />
              ) : (
                <Box
                  className="pt"
                  sx={{
                    fontFamily: "Noto Serif JP",
                    textTransform: "capitalize",
                    fontWeight: 900,
                    fontSize: 78,
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: article_content.textTemplate_title_en,
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
                height: "50vh",
                borderTop: "5px solid #00415E",
                overflowY: "scroll",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <Box>
                {useLang == true ? (
                  <Box
                    className="pt"
                    pt={2}
                    sx={{
                      fontFamily: "Noto Sans JP",
                      fontWeight: 300,
                      fontSize: 16,
                      lineHeight: 1.75,
                      textAlign: "justify",
                      letterSpacing: "-0.05em",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: article_content.textTemplate_content_tw,
                    }}
                  />
                ) : (
                  <Box
                    className="pt"
                    pt={2}
                    sx={{
                      fontFamily: "Noto Sans JP",
                      fontWeight: 300,
                      fontSize: 16,
                      lineHeight: 1.75,
                      textAlign: "justify",
                      letterSpacing: "-0.05em",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: article_content.textTemplate_content_en,
                    }}
                  />
                )}
              </Box>
            </Box>
          </Item>
        </Stack>
      </Box>
    </>
  );
}
