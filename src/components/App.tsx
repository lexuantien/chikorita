/* eslint-disable */
// @ts-ignore
import CometStyleXSheet from "@ladifire-opensource/stylex-theme";

// // @ts-ignore
import { cometStyleXDefaultTheme } from "@styles/defaultTheme";
// // @ts-ignore
import { CometStyleXDarkTheme } from "@styles/customTheme";

import React from "react";

import stylex from "@ladifire-opensource/stylex";

import { withErrorBoundary } from "./ErrorBoundary";



const styles = stylex.create({
  root: {
    fontWeight: 700,
    color: "blue",
  },
  button: {
    borderRadius: 8,
  },
});


function App() {

  // useStaticStyles();

  // @ts-ignore
  React.useEffect(() => {
    CometStyleXSheet.rootStyleSheet.setRootTheme(cometStyleXDefaultTheme);
    CometStyleXSheet.rootStyleSheet.setCustomTheme(CometStyleXDarkTheme);
  }, []);


  return (
    <div className={stylex(styles.root)}>
      cscadasd
    </div >
  )
}

export default withErrorBoundary("App", App);