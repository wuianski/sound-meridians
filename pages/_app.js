import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Box from "@mui/material/Box";

import "../styles/globals.css";
import styles from "../components/layout.module.css";
import "keen-slider/keen-slider.min.css";
/** react-slick css (slider) **/
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/** next-seo **/
import { DefaultSeo } from "next-seo";

/*** delay ***/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  // useEffect(() => {
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

  const router = useRouter();
  const [useLang, setLang] = useState(true);
  const switchToEN = async (event) => {
    //console.log("switchToEN");
    setLang(false);
  };
  const switchToTW = async (event) => {
    //console.log("switchToTW");
    setLang(true);
  };

  /*** click on tw ***/
  const click_on_tw = {
    tw: { opacity: 0 },
    en: { opacity: 1 },
  };
  /*** click on en ***/
  const click_on_en = {
    tw: { opacity: 1 },
    en: { opacity: 0 },
  };

  return getLayout(
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
        />
      </Head>
      <DefaultSeo
        title="聲經絡 Sound Meridians"
        description="聲經絡 Sound Meridians : 聲響文化製圖 Cultural Counter-mapping through Sound"
        canonical="https://soundmeridians.net/"
        openGraph={{
          type: "website",
          locale: "zh_TW",
          url: "https://soundmeridians.net/",
          site_name: "聲經絡 Sound Meridians",
          title: "聲經絡 Sound Meridians",
          description:
            "聲經絡 Sound Meridians : 聲響文化製圖 Cultural Counter-mapping through Sound",
          images: [
            {
              url: "/imgs/og.png",
              width: 1724,
              height: 836,
              alt: "Sound Meridians",
            },
          ],
        }}
      />

      {/*** !!important when use router to query value from component. Use a React key to tell React to remount the component. ***/}
      <AnimatePresence>
        <motion.div
          key={router.route}
          initial={{ opacity: 0, x: -80 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
          }}
          exit={{
            opacity: 0,
            x: -80,
            transition: { duration: 0.5 },
          }}
          className="content"
        >
          <Component
            key={router.route}
            {...pageProps}
            useLang={useLang}
          ></Component>
          <Box>
            <motion.div
              variants={click_on_en}
              initial="tw"
              animate={useLang ? "tw" : "en"}
              exit="tw"
            >
              <Box
                className={styles.switch}
                // sx={{
                //   position: "absolute",
                //   zIndex: 99,
                //   display: "block",
                //   top: 0,
                //   // top: { xs: "calc(100vh - 50px)", md: "calc(100vh - 92px)" },
                //   //left: { xs: 3, md: 13 },
                //   fontFamily: "BioRhyme",
                //   fontSize: 22,
                //   lineHeight: 1.3,
                //   textDecoration: "underline",
                //   textTransform: "uppercase",
                //   mixBlendMode: "difference",
                //   cursor: "pointer",
                // }}
                onClick={switchToEN}
              >
                en
              </Box>
            </motion.div>
          </Box>
          <Box>
            <motion.div
              variants={click_on_tw}
              initial="tw"
              animate={useLang ? "tw" : "en"}
              exit="tw"
            >
              <Box className={styles.switchT} onClick={switchToTW}>
                ch
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
