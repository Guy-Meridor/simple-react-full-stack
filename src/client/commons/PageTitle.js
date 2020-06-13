import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.primary,
    textAlign: "center",
    marginBottom: "3vh",
  },
}));

export default function PageTitle(props) {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant="h5">
      {props.children}
    </Typography>
  );
}
