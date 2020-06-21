import React, { useState } from "react";

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {},
});

export default ThemeContext;

export function ThemeProvider(props) {
  // keeps state of the current theme
  const [dark, setDark] = useState(false);

  const toggle = () => {
    document.body.classList.toggle("dark-mode");
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggle,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
