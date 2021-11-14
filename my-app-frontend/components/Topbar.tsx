import React from "react";
import { useRouter } from "next/router";

import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Fade } from "@mui/material";
import { Hidden } from "@mui/material";
import { Link } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import { withStyles } from "@mui/styles";

import { Link as RLink, animateScroll as scroll } from "react-scroll";

import { common } from "@mui/material/colors";

const styles: any = (theme: any) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: common.black,
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
    color: common.black,
  },
});
const useStyles = makeStyles(styles);

/* Menú que se visualiza en móviles */
const MobileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Link href="/about">
          <MenuItem onClick={handleClose}>About</MenuItem>
        </Link>

        {router.pathname == "/" ? (
          <RLink to="serviceSection" smooth={true} offset={-10} duration={500}>
            <MenuItem onClick={handleClose}>Services</MenuItem>
          </RLink>
        ) : (
          <Link href="/serviceSection">
            <MenuItem onClick={handleClose}>Services</MenuItem>
          </Link>
        )}

        <Link href="/register">
          <MenuItem onClick={handleClose}>Sign up</MenuItem>
        </Link>
        <Link href="/login">
          <MenuItem onClick={handleClose}>Sign in</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

const Topbar = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/home">
            <Typography variant="h6" className={classes.title}>
              PoC
            </Typography>
          </Link>

          <i className="vseparator" />

          <Hidden xsDown>
            <Link href="/about">
              <Button color="inherit" className={classes.menuButton}>
                About
              </Button>
            </Link>

            {router.pathname == "/" ? (
              <RLink
                to="serviceSection"
                smooth={true}
                offset={-10}
                duration={500}
              >
                <Button color="inherit" className={classes.menuButton}>
                  Services
                </Button>
              </RLink>
            ) : (
              <Link href="/serviceSection">
                <Button color="inherit" className={classes.menuButton}>
                  Services
                </Button>
              </Link>
            )}

            <Link href="/register">
              <Button color="inherit" className={classes.menuButton}>
                Sign up
              </Button>
            </Link>

            <Link href="/login">
              <Button color="inherit" className={classes.menuButton}>
                Sign in
              </Button>
            </Link>
          </Hidden>

          <Hidden smUp>{MobileMenu()}</Hidden>
        </Toolbar>
      </AppBar>

      <style jsx>{`
        .vseparator {
          border-right: 2px solid white;
          padding: 15px 0px;
          margin: 0px 15px 0px 25px;
        }
      `}</style>
    </div>
  );
};

export default withStyles(styles)(Topbar);
