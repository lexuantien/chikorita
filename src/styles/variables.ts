export const newFonts = {
  body: {
    family: 'charter, Georgia, Cambria, "Times New Roman", Times, serif',
    weight: 400,
    boldWeight: 700,
    fontSize: {
      XS: 16,
      S: 18,
      SM: 20,
      M: 21,
    },
    lineHeight: {
      XS: 24,
      S: 28,
      SM: 32,
      M: 32,
    },
    letterSpacing: {
      XS: "0",
      S: "-0.003em",
      SM: "-0.003em",
      M: "-0.003em",
    },
    topLeadingPct: 0.375,
    bottomLeadingPct: 0.17,
  },
  detail: {
    family: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
    weight: 400,
    boldWeight: 600,
    fontSize: {
      XS: 11,
      S: 13,
      M: 14,
      L: 16,
      XL: 20,
    },
    lineHeight: {
      XS: 16,
      S: 20,
      M: 20,
      L: 24,
      XL: 28,
    },
    topLeadingPct: 0.38,
    bottomLeadingPct: 0.1,
  },
  heading: {
    family: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
    weight: 500,
    fontSize: {
      XXS: 16,
      XS: 16,
      S: 20,
      M: 22,
      L: 30,
      XL: 42,
    },
    lineHeight: {
      XXS: 20,
      XS: 20,
      S: 24,
      M: 28,
      L: 36,
      XL: 52,
    },
    letterSpacing: {
      XXS: "0",
      XS: "0",
      S: "0",
      M: "0",
      L: "0",
      XL: "0",
    },
    topLeadingPct: 0.38,
    bottomLeadingPct: 0.1,
  },
  marketing: {
    family: 'gt-super, Georgia, Cambria, "Times New Roman", Times, serif',
    weight: 400,
    fontSize: {
      XS: 18,
      S: 24,
      M: 28,
      L: 32,
      XL: 48,
      XXL: 70,
      XXXL: 85,
      XXXXL: 106,
    },
    lineHeight: {
      XS: 21,
      S: 28,
      M: 32,
      L: 36,
      XL: 52,
      XXL: 74,
      XXXL: 88,
      XXXXL: 95,
    },
    letterSpacing: {
      XS: "-0.015em",
      S: "-0.02em",
      M: "-0.03em",
      L: "-0.035em",
      XL: "-0.04em",
      XXL: "-0.05em",
      XXXL: "-0.055em",
      XXXXL: "-0.05em",
    },
    fontFeatureSettings: "'pnum' on, 'lnum' on;",
    topLeadingPct: 0.35,
    bottomLeadingPct: 0.16,
  },
  overline: {
    family: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
    weight: 400,
    fontSize: {
      XS: 10,
      S: 12,
      M: 13,
      L: 16,
    },
    lineHeight: {
      XS: 16,
      S: 16,
      M: 18,
      L: 24,
    },
    letterSpacing: {
      XS: "0.05em",
      S: "0.083em",
      M: "0.077em",
      L: "0.063em",
    },
    topLeadingPct: 0.18,
    bottomLeadingPct: 0.1,
  },
  pullQuote: {
    family: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
    weight: 300,
    fontSize: {
      S: 20,
      M: 24,
      L: 28,
    },
    lineHeight: {
      S: 28,
      M: 32,
      L: 40,
    },
    letterSpacing: {
      S: "0",
      M: "0",
      L: "-0.009em",
    },
    topLeadingPct: 0.38,
    bottomLeadingPct: 0.1,
  },
  subtitle: {
    family: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
    weight: 400,
    fontSize: {
      S: 16,
      M: 18,
      L: 22,
    },
    lineHeight: {
      S: 20,
      M: 24,
      L: 28,
    },
    topLeadingPct: 0.38,
    bottomLeadingPct: 0.1,
  },
  title: {
    family: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
    weight: 700,
    fontSize: {
      XS: 16,
      S: 22,
      M: 32,
      L: 36,
      XL: 46,
    },
    lineHeight: {
      XS: 20,
      S: 28,
      M: 40,
      L: 44,
      XL: 56,
    },
    letterSpacing: {
      XS: "0",
      S: "0",
      M: "-0.016em",
      L: "-0.014em",
      XL: "-0.011em",
    },
    topLeadingPct: 0.38,
    bottomLeadingPct: 0.1,
  },
};

export const breakpoints = {
  xs: 0,
  sm: 552,
  md: 728,
  lg: 904,
  xl: 1080,
};

export const maxWidths = {
  inset: 680,
  outset: 1192,
};

export const grid = {
  xStep: 4,
  yStep: 4,
  gutterSteps: {
    xs: 6,
    sm: 6,
    md: 7,
    lg: 8,
    xl: 8,
  },
  marginSteps: {
    xs: 6,
    sm: 6,
    md: 12,
    lg: 16,
    xl: 16,
  },
  xlMaxContentWidth: 1320,
  columnWidth: 64,
  gutterWidth: 24,
};

export const boderRadius = {
  regular: 4,
};

export const borderWidth = 1;
export const borderWidthThick = 2;
export const borderStyle = "solid";
export const backgroundColor = "rgba(255, 255, 255, 1)";

export const accentColor = {
  border: {
    light: "rgba(163, 208, 162, 1)",
    normal: "rgba(26, 137, 23, 1)",
    dark: "rgba(15, 115, 12, 1)",
    darker: "rgba(15, 115, 12, 1)",
  },
  fill: {
    light: "rgba(163, 208, 162, 1)",
    normal: "rgba(26, 137, 23, 1)",
    dark: "rgba(15, 115, 12, 1)",
  },
  fillTransparent: {
    light: "rgba(26, 137, 23, 0.3)",
  },
  text: {
    light: "rgba(26, 137, 23, 1)",
    normal: "rgba(26, 137, 23, 1)",
    dark: "rgba(15, 115, 12, 1)",
  },
  background: "rgba(255, 255, 255, 1)",
};


export const baseColor = {
  background: {
    light: "rgba(250, 250, 250, 1)",
    normal: "rgba(242, 242, 242, 1)",
    dark: "rgba(237, 237, 237, 1)",
  },
  border: {
    lighter: "rgba(230, 230, 230, 1)",
    light: "rgba(204, 204, 204, 1)",
    normal: "rgba(168, 168, 168, 1)",
    dark: "rgba(117, 117, 117, 1)",
    darker: "rgba(41, 41, 41, 1)",
  },
  text: {
    lighter: "rgba(117, 117, 117, 1)",
    light: "rgba(61, 61, 61, 1)",
    normal: "rgba(41, 41, 41, 1)",
    dark: "rgba(25, 25, 25, 1)",
    darker: "rgba(8, 8, 8, 1)",
  },
  fill: {
    lighter: "rgba(117, 117, 117, 1)",
    light: "rgba(61, 61, 61, 1)",
    normal: "rgba(41, 41, 41, 1)",
    dark: "rgba(25, 25, 25, 1)",
    darker: "rgba(8, 8, 8, 1)",
  },
  overlay: {
    lighter: "rgba(255, 255, 255, 0.2)",
    light: "rgba(255, 255, 255, 0.4)",
    normal: "rgba(255, 255, 255, 0.5)",
    dark: "rgba(255, 255, 255, 0.95)",
  },
};

export const brandColor = {
  sage: {
    light: "rgba(232, 243, 232, 1)",
    normal: "rgba(26, 137, 23, 1)",
    dark: "rgba(26, 137, 23, 1)",
  },
};

export const errorColor = "rgb(201, 74, 74)";
export const errorHoverColor = "#AB4141";
export const highlightColor = {
  light: "rgba(26, 137, 23, 0.1)",
  normal: "rgba(26, 137, 23, 0.2)",
  dark: "rgba(26, 137, 23, 0.3)",
};
