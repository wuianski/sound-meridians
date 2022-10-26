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
  //console.log(myTimeline);
  return (
    <>
      <Box
        pt={{ xs: 2, md: 8 }}
        ml={{ xs: -4, md: 0 }}
        sx={{
          backgroundColor: "none",
          width: { xs: "calc(100vw - 0px)", md: "calc(100vw - 300px)" },
          height: "95vh",
        }}
      >
        <Chrono
          classNames="myChrono"
          mode="VERTICAL"
          //cardLess={true}
          //enableOutline
          items={myTimeline}
          //scrollable={{ scrollbar: false }}
          // activeItemIndex={0}
          // focusActiveItemOnLoad={true}
          // allowDynamicUpdate={true}
          //hideControls={true}
          //showAllCardsHorizontal={true}
          //mode="HORIZONTAL"
          //itemWidth={300}
          //cardHeight={400} //Sets the minimum height of the timeline card.default=200
          cardWidth={700} //Sets the maximum width of the timeline card
          //cardPositionHorizontal="BOTTOM"
          theme={{
            primary: "#00415E",
            secondary: "#000",
            cardBgColor: "#00415E",
            cardForeColor: "#fff",
            titleColor: "#00415E",
            titleColorActive: "#fff",
          }}
          // fontSizes={{
          //   title: "40px",
          // }}
          //mediaHeight={200}
        >
          {article_content.timelineTemplate_timelines &&
            article_content.timelineTemplate_timelines.map((timeline) => (
              <Box
                key={timeline.timelineInfos_id.id}
                sx={{
                  width: { xs: "100%", md: "90%" },
                }}
              >
                {useLang == true ? (
                  <Box
                    className="pt, timelineContent"
                    sx={{
                      fontFamily: "Noto Sans JP",
                      fontWeight: 300,
                      fontSize: { xs: 14, md: 20 },
                      lineHeight: { xs: 1.3, md: 1 },
                      textAlign: "left",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: timeline.timelineInfos_id.content_tw,
                    }}
                  />
                ) : (
                  <Box
                    className="pt, timelineContent"
                    sx={{
                      fontFamily: "Noto Sans JP",
                      fontWeight: 300,
                      fontSize: 20,
                      lineHeight: { xs: 1.3, md: 1 },
                      textAlign: "justify",
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
