import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";

import { Chrono } from "react-chrono";

export default function TimelineTemplate({ article_content, useLang }) {
  //console.log(article_content);
  /*****************************/
  /*** organize projects's data ***/
  const myTimeline = article_content.timelineTemplate_timelines.map((t) => {
    const result = {
      title: t.timelineInfos_id.year,
      //cardTitle: t.timelineInfos_id.content_tw,
    };

    return result;
  });
  // console.log(myTimeline);
  return (
    <>
      <Box
        pt={8}
        pb={13}
        pl={8}
        pr={4}
        ml={"auto"}
        mr={"auto"}
        //sx={{ backgroundColor: "blue", width: "calc(100vw - 200px)" }}
      >
        <Chrono
          items={myTimeline}
          activeItemIndex={0}
          focusActiveItemOnLoad={true}
          allowDynamicUpdate={true}
          //hideControls={true}
          mode="HORIZONTAL"
          itemWidth={440}
          //cardHeight={200} //Sets the minimum height of the timeline card.default=200
          //cardWidth={1200} //Sets the maximum width of the timeline card
          cardPositionHorizontal="BOTTOM"
          theme={{
            primary: "#00415E",
            secondary: "#000",
            cardBgColor: "none",
            cardForeColor: "#fff",
            titleColor: "#00415E",
            titleColorActive: "#fff",
          }}
          fontSizes={
            {
              // title: "30px",
            }
          }
          //mediaHeight={200}
          //pl={10}
        >
          {article_content.timelineTemplate_timelines &&
            article_content.timelineTemplate_timelines.map((timeline) => (
              <Box
                key={timeline.timelineInfos_id.id}
                sx={{
                  background: "none",
                  width: "100%",
                }}
              >
                {useLang == true ? (
                  <Box
                    className="pt, timelineContent"
                    pt={2}
                    pl={2}
                    sx={{
                      position: "relative",
                      left: 0,
                      width: {
                        xs: "100%",
                        md: "1000px",
                      },
                      minWidth: "1000px",
                      height: "60vh",
                      overflow: "scroll",
                      fontFamily: "Noto Sans JP",
                      fontWeight: 300,
                      fontSize: 20,
                      lineHeight: 1.75,
                      textAlign: "left",
                      letterSpacing: "-0.05em",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: timeline.timelineInfos_id.content_tw,
                    }}
                  />
                ) : (
                  <Box
                    className="pt, timelineContent"
                    pt={2}
                    sx={{
                      width: "100%",
                      height: "50vh",
                      overflow: "scroll",
                      fontFamily: "Noto Sans JP",
                      fontWeight: 300,
                      fontSize: 20,
                      lineHeight: 1.75,
                      textAlign: "justify",
                      letterSpacing: "-0.05em",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: timeline.timelineInfos_id.content_en,
                    }}
                  />
                )}
                {/* <Box
                  sx={{ width: "100%", height: "50vh", overflow: "scroll" }}
                  dangerouslySetInnerHTML={{
                    __html: timeline.timelineInfos_id.content_tw,
                  }}
                  className="timelineContent"
                /> */}
              </Box>
            ))}
        </Chrono>
      </Box>
      {/* <Box>
        {article_content.timelineTemplate_timelines &&
          article_content.timelineTemplate_timelines.map((timeline) => (
            <Box key={timeline.timelineInfos_id.id}>
              <Box>{timeline.timelineInfos_id.year}</Box>
              <Box>{timeline.timelineInfos_id.content_tw}</Box>
            </Box>
          ))}
      </Box> */}
    </>
  );
}
