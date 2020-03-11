// Components==============
import React from "react";
import { hot } from "react-hot-loader/root";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../../style/GlobalStyles";
import { Variables } from "../../style/themes";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import IEWarning from "./IE/IEWarning";
// =========================

function Layout({ children, location }) {
  // CODE ABOVE THIS LINE
  if (location.pathname === "/offline-plugin-app-shell-fallback") return null;
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

export default hot(Layout);
