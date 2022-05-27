// noinspection JSUnusedGlobalSymbols

import type { NextPage } from "next";
import Head from "next/head";
import MainView from "../src/feature/MainView";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>ばぶっち</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <MainView />
    </>
  );
};

export default Index;
