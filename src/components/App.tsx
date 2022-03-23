import React from "react";
// import { useStaticStyles } from "./GlobalStyle";

import stylex from "@ladifire-opensource/stylex";
import { withErrorBoundary } from "@components/ErrorBoundary";

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

  return (
    <div className={stylex(styles.root)}>Component</div>
  )
}

export default withErrorBoundary("App", App);