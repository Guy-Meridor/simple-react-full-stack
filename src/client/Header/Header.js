import React from "react";
import { Link, NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Links from "./Links.json";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: "2vh",
    "& a": {
      textDecoration: "none",
      color: theme.palette.text.primary,
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontSize: "16px",
    },
  },
  toolbar: {
    minHeight: "48px",
  },
  rightToolbar: {
    marginLeft: "auto",
    "& a": {
      marginLeft: "3vw",
    },
  },
  homeLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& img": {
      height: "50px",
      width: "50px",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="sticky">
      <Toolbar className={classes.toolbar}>
        <section>
          <Link className={classes.homeLinks} to="/">
            <img className={classes.logo} src="/assets/logo.png"></img>
            <span>Song Analyzer</span>
          </Link>
        </section>
        <section className={classes.rightToolbar}>
          {Links.map((link) => (
            <NavLink
              key={link.route}
              to={link.route}
              activeClassName={classes.activeLink}
            >
              {link.text}
            </NavLink>
          ))}
        </section>
        <section>
          <Button onClick={props.changePalette}>
            dark mode
          </Button>
        </section>
      </Toolbar>
    </AppBar>
  );
}
