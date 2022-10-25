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
      <Box p={{ xs: "48px 8px 8px 24px", md: "104px 160px 104px 192px" }}>
        <Stack
          direction={{ xs: "column", md: "column" }}
          spacing={{ xs: 2, md: 4 }}
        >
          {/*** column: title ***/}
          <Item>
            <Box
              //mr={2.8}
              //pb={2}
              sx={{
                position: "relative",
                width: { xs: "calc(100% - 17px)", md: "calc(100% - 30px)" },
                height: { xs: "15vh", md: "15vh" },
                background: "none",
                borderBottom: "5px solid #00415E",
              }}
            >
              {useLang == true ? (
                <Box
                  className="pt"
                  sx={{
                    fontFamily: "Noto Serif JP",
                    fontWeight: 900,
                    fontSize: { xs: 22, md: 40 },
                    lineHeight: 1.2,
                    textAlign: "center",
                    width: "100%",
                    height: { xs: "15vh", md: "15vh" },
                    display: "table-cell",
                    verticalAlign: "middle",
                    marginLeft: "auto",
                    marginRight: "auto",
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
                    fontSize: { xs: 18, md: 36 },
                    lineHeight: 1.1,
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
              pr={0}
              className="scroller"
              sx={{
                position: "relative",
                height: { xs: "calc(67vh - 50px)", md: "55vh" },
                //borderTop: "5px solid #00415E",
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
              <Box pr={0} className="scrollContent">
                {useLang == true ? (
                  <Box
                    className="pt"
                    pt={0}
                    pb={{ xs: "100px", md: 0 }}
                    sx={{
                      fontFamily: "Noto Sans JP",
                      fontWeight: 300,
                      fontSize: { xs: 14, md: 16 },
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
                    pt={0}
                    pb={{ xs: "100px", md: 0 }}
                    sx={{
                      fontFamily: "Noto Sans JP",
                      fontWeight: 300,
                      fontSize: { xs: 14, md: 16 },
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
