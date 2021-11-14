import React from "react";

import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { withStyles } from "@mui/styles";

const styles: any = (theme: any) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});
const useStyles = makeStyles(styles);

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Something here to give the footer a purpose!
      </Typography>
    </footer>
  );
};

export default withStyles(styles)(Footer);
