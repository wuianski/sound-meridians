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

export default function TextTemplate({ article_content }) {
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
              <Box
                className="pt"
                sx={{
                  fontFamily: "ChironSungHK-B",
                  fontWeight: 900,
                  fontSize: 108,
                  lineHeight: 1,
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{
                  __html: article_content.textTemplate_title_tw,
                }}
              ></Box>
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
                  __html: article_content.textTemplate_content_tw,
                }}
              ></Box>
            </Box>
          </Item>
        </Stack>
      </Box>
    </>
  );
}
