import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";
/** react-slick css (slider) **/
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Box from "@mui/material/Box";
import { fontSize } from "@mui/system";

/*** delay ***/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [useLang, setLang] = useState(true);
  const switchToEN = async (event) => {
    console.log("switchToEN");
    setLang(false);
  };
  const switchToTW = async (event) => {
    console.log("switchToTW");
    setLang(true);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

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
          <motion.div
            variants={click_on_tw}
            initial="tw"
            animate={useLang ? "tw" : "en"}
          >
            <Box
              sx={{
                position: "fixed",
                display: "block",
                bottom: 10,
                left: 8,
                zIndex: 999,
                //color: "#00415E",
                fontFamily: "BioRhyme",
                fontSize: 22,
                lineHeight: 1.3,
                textDecoration: "underline",
                textTransform: "uppercase",
                mixBlendMode: "difference",
                cursor: "pointer",
              }}
              onClick={switchToTW}
            >
              tw
            </Box>
          </motion.div>
          <motion.div
            variants={click_on_en}
            initial="tw"
            animate={useLang ? "tw" : "en"}
          >
            <Box
              sx={{
                position: "fixed",
                display: "block",
                bottom: 10,
                left: 8,
                zIndex: 999,
                //color: "#00415E",
                fontFamily: "BioRhyme",
                fontSize: 22,
                lineHeight: 1.3,
                textDecoration: "underline",
                textTransform: "uppercase",
                mixBlendMode: "difference",
                cursor: "pointer",
              }}
              onClick={switchToEN}
            >
              en
            </Box>
          </motion.div>
          <Component
            key={router.route}
            {...pageProps}
            useLang={useLang}
          ></Component>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
