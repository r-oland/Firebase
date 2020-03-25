// Components==============
import React from "react";
import { hot } from "react-hot-loader/root";
import { ThemeProvider } from "styled-components";
import { FirebaseContext, useAuth } from "../../firebase/index";
import GlobalStyles from "../../style/GlobalStyles";
import { Variables } from "../../style/themes";
import Nav from "../Nav/Nav";
import IEWarning from "./IE/IEWarning";
// =========================

function Layout({ children, location }) {
  const { user, firebase, loading } = useAuth();

  // CODE ABOVE THIS LINE
  if (location.pathname === "/offline-plugin-app-shell-fallback") return null;
  return (
    <ThemeProvider theme={Variables}>
      <FirebaseContext.Provider value={{ user, firebase, loading }}>
        <IEWarning />
        <Nav />
        {children}
        <GlobalStyles />
      </FirebaseContext.Provider>
    </ThemeProvider>
  );
}

export default hot(Layout);
