import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import { Link as RLink, animateScroll as scroll } from "react-scroll";
import { useRouter } from "next/router";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles: any = (theme: any) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "black",
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
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
        <MoreVertIcon />
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
              Site Name
            </Typography>
          </Link>

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
            <i className="vseparator" />

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
