import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/*** !!important when use router to query value from component. Use a React key to tell React to remount the component. ***/}
      <AnimatePresence exitBeforeEnter>
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
          <Component key={router.route} {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
