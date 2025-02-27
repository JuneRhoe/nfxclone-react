import React from "react";

export type ThemeType = 'lightMode' | 'darkMode'

interface ThemeInfoContextData {
  themeType: ThemeType
  setThemeType: (themeType: ThemeType) => void
}

export const ThemeInfoContext = React.createContext<ThemeInfoContextData>(
  {} as ThemeInfoContextData,
)