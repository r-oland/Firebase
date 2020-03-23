// Components==============
import React from "react";
import Head from "../global-components/Layout/Head";
import Overview from "../page-components/Overview";
// =========================

export default function Index() {
  return (
    <>
      <Head
        title="Home"
        description="Page description goes here"
        keywords="content"
      />
      <Overview />
    </>
  );
}
