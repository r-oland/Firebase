// Components==============
import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../../style/GlobalStyles";
import { Variables } from "../../style/themes";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import IEWarning from "./IE/IEWarning";
// =========================

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={Variables}>
      <IEWarning />
      <Nav />
      {children}
      <Footer />
      <GlobalStyles />
    </ThemeProvider>
  );
}
