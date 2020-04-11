// Components==============
import React from "react";
import Head from "../global-components/Layout/Head";
import { useLog, useStorage } from "../hooks";
import Comments from "../page-components/Comments";
import Overview from "../page-components/Overview";
// =========================

export default function Index(data) {
  const [state, setState] = useStorage("test", 3);

  useLog(state);

  return (
    <>
      <Head
        title="Home"
        description="Page description goes here"
        keywords="content"
      />
      <button
        onClick={() => {
          setState(state + 1);
        }}
      >
        {state}
      </button>
      <Overview />
      <Comments />
    </>
  );
}
