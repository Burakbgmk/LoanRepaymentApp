import { createContext } from "react";

export const themes = {
    dark: {
      background: "#383838",
      color: "#fff"
    },
    light: {
      background: "#fff",
      color: "#000"
    }
  }

export const ThemeContext = createContext(themes.light);

