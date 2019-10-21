const white = "#FFFFFF";
const black = "#67605F";
const gray = "#F8F8F9";
const orange = "#F6C6A9";

const themeLight = {
  background: orange,
  body: black
};

const themeDark = {
  background: black,
  body: white
};

const theme = mode => (mode === "dark" ? themeDark : themeLight);

export default theme;