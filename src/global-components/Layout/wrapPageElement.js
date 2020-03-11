import React from "react";
import Layout from "./Layout";

export default function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
