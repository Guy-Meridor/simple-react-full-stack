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
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useContext } from "react";
import ThemeContext from "./themes/ThemeContext";
import "./themes/themes.css";
import "./App.css";

export default function App() {
  const { dark } = useContext(ThemeContext);

  const theme = createTheme({
      palette: {
          type: dark ? "dark" : "light",
      },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
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
      </Router>
    </ThemeProvider>
  );
}
