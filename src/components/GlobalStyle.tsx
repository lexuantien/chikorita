import { makeStaticStyles } from "@griffel/react";

export const useStaticStyles = makeStaticStyles([
  {
    body: {
      margin: 0,
      padding: 0,
      textRendering: "optimizeLegibility",
      "WebkitFontSmoothing": "antialiased",
      color: "rgba(0, 0, 0, 0.8)",
      position: "relative",
      minHeight: "100vh",
    },
  },

  "html { box-sizing: border-box; }",

  "*,*:before,*:after { box-sizing: inherit;}",

  "h1, h2, h3, h4, h5, h6, dl, dd, ol, ul, menu, figure, blockquote, p, pre, form{margin:0}",

  "menu, ol, ul{padding:0;list-style:none;list-style-image:none}",

  "main{display:block}",

  "a{color:inherit;text-decoration:none}",

  "a, button, input{-webkit-tap-highlight-color:transparent}",

  "img, svg{vertical-align:middle}",

  "button{background:transparent;overflow:visible}",

  "button, input, optgroup, select, textarea{margin:0}",

  ":root{--reach-tabs:1;--reach-menu-button:1}",

  "#speechify-root{font-family:Sohne, sans-serif}",
  
  "div[data-popper-reference-hidden='true']{visibility:hidden;pointer-events:none}"
]);

// export const useStaticStyles = makeStaticStyles('html{box-sizing:border-box}*, *:before, *:after{box-sizing:inherit}body{margin:0;padding:0;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;color:rgba(0,0,0,0.8);position:relative;min-height:100vh}h1, h2, h3, h4, h5, h6, dl, dd, ol, ul, menu, figure, blockquote, p, pre, form{margin:0}menu, ol, ul{padding:0;list-style:none;list-style-image:none}main{display:block}a{color:inherit;text-decoration:none}a, button, input{-webkit-tap-highlight-color:transparent}img, svg{vertical-align:middle}button{background:transparent;overflow:visible}button, input, optgroup, select, textarea{margin:0}:root{--reach-tabs:1;--reach-menu-button:1}#speechify-root{font-family:Sohne, sans-serif}div[data-popper-reference-hidden="true"]{visibility:hidden;pointer-events:none}');