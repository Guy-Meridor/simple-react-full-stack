import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Header from "./Header/Header";
import AllSongs from "./pages/Songs/AllSongs";
import Song from "./pages/Songs/Song/Song";
import Words from "./pages/Words/Words";
import Groups from "./pages/Groups/Groups";
import Phrases from "./pages/Phrases/Phrases";
import Statistics from "./pages/Statistics/Statistics";
import Instances from "./pages/Instances/Instances";
import Notfound from "./pages/NotFound/NotFound";

// import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useState, useEffect } from "react";

import './themes/themes.css'
import './App.css'


export default function App() {
  const [palette, setPalette] = useState("light");
  const changePalette = () => {
    setPalette(palette == "light" ? "dark" : "light");
    document.body.classList.toggle("dark-mode");
  };

  const theme = createMuiTheme({
    palette: {
      type: palette,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header changePalette={changePalette} />
        <div >
          <Switch>
            <Route path="/words/:word?" component={Words} />
            <Route path="/groups/:group?" component={Groups} />
            <Route path="/phrases/:phrase?" component={Phrases} />
            <Route path="/songs/:id" component={Song} />
            <Route path="/statistics" component={Statistics} />
            <Route path="/Instances" component={Instances} />
            <Route path="/" exact component={AllSongs} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}
