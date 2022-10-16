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
        p={13}
        ml={"auto"}
        mr={"auto"}
        //sx={{ width: "100%", height: "50vh" }}
      >
        <Chrono
          items={myTimeline}
          activeItemIndex={0}
          focusActiveItemOnLoad={true}
          allowDynamicUpdate={true}
          //hideControls={true}
          mode="HORIZONTAL"
          itemWidth={370}
          //cardHeight={200} //Sets the minimum height of the timeline card.default=200
          //cardWidth={} //Sets the maximum width of the timeline card
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
        >
          {article_content.timelineTemplate_timelines &&
            article_content.timelineTemplate_timelines.map((timeline) => (
              <Box key={timeline.timelineInfos_id.id}>
                {useLang == true ? (
                  <Box
                    className="pt"
                    pt={2}
                    sx={{
                      width: "100%",
                      height: "50vh",
                      overflow: "scroll",
                      fontFamily: "ChironHeiHK-L",
                      fontWeight: 300,
                      fontSize: 20,
                      lineHeight: 1.75,
                      textAlign: "justify",
                      letterSpacing: "-0.05em",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: timeline.timelineInfos_id.content_tw,
                    }}
                  />
                ) : (
                  <Box
                    className="pt"
                    pt={2}
                    sx={{
                      width: "100%",
                      height: "50vh",
                      overflow: "scroll",
                      fontFamily: "ChironHeiHK-L",
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
