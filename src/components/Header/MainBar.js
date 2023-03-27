import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PersonIcon from "@mui/icons-material/Person";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useContext } from "react";
import Context from "../../store/context";
import ButtonGroup from "@mui/material/ButtonGroup";
import { lngs } from "../../constants/lngs";
import { useTranslation } from "react-i18next";
import { mainBarInputs } from "../../constants/mainBarInputs";

function MainBar() {
  const { t, i18n } = useTranslation();
  const ctx = useContext(Context);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoClickHandler = (event) => {
    event.preventDefault();
    history.replace("/");
  };
  const singInHandler = () => {
    history.push("/login");
    setAnchorElUser(null);
  };
  const logOutHandler = () => {
    ctx.logout();
    setAnchorElUser(null);
  };
  const profileHandler = () => {
    history.replace("/profile");
    setAnchorElUser(null);
  };

  const functions = {
    exercisesHandler: () => {
      history.push("/exercises");
      setAnchorElNav(null);
    },
    workoutsHandler: () => {
      history.push("/workouts");
      setAnchorElNav(null);
    },
    dashboardHandler: () => {
      history.push("/dashboard");
      setAnchorElNav(null);
    },
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FitnessCenterIcon fontSize={"large"} />

          <Typography
            onClick={logoClickHandler}
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Fitness Tracker
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {ctx.isLoggedIn &&
                mainBarInputs.map((el) => {
                  return (
                    <MenuItem
                      key={Math.random().toString()}
                      onClick={functions[el.handler]}
                    >
                      <Typography textAlign="center">{t(el.id)}</Typography>
                    </MenuItem>
                  );
                })}
              <MenuItem key={Math.random().toString()}>
                <ButtonGroup
                  orientation="vertical"
                  color={"inherit"}
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  {Object.keys(lngs).map((lng) => (
                    <Button
                      type={"submit"}
                      key={lng}
                      onClick={() => {
                        i18n.changeLanguage(lng);
                        window.location.reload(false);
                      }}
                      disabled={i18n.resolvedLanguage === lng}
                    >
                      {lngs[lng].nativeName}
                    </Button>
                  ))}
                </ButtonGroup>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            onClick={logoClickHandler}
            variant="h5"
            textAlign={"center"}
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Fitness Trackerr
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {ctx.isLoggedIn && (
              <React.Fragment>
                {mainBarInputs.map((el) => {
                  return (
                    <Button
                      key={Math.random().toString()}
                      sx={{ my: 2, color: "white", display: "block" }}
                      onClick={functions[el.handler]}
                    >
                      {t(el.id)}
                    </Button>
                  );
                })}
              </React.Fragment>
            )}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ButtonGroup
              color={"inherit"}
              variant="outlined"
              aria-label="outlined button group"
            >
              {Object.keys(lngs).map((lng) => (
                <Button
                  type={"submit"}
                  key={lng}
                  onClick={() => {
                    i18n.changeLanguage(lng);
                    window.location.reload(false);
                  }}
                  disabled={i18n.resolvedLanguage === lng}
                >
                  {lngs[lng].nativeName}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon fontSize={"large"} color={"action"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!ctx.isLoggedIn && (
                <MenuItem
                  key={Math.random().toString()}
                  onClick={singInHandler}
                >
                  <Typography textAlign="center">{t("signIn")}</Typography>
                </MenuItem>
              )}
              {ctx.isLoggedIn && (
                <MenuItem
                  key={Math.random().toString()}
                  onClick={profileHandler}
                >
                  <Typography textAlign="center">{t("profile")}</Typography>
                </MenuItem>
              )}
              {ctx.isLoggedIn && (
                <MenuItem
                  key={Math.random().toString()}
                  onClick={logOutHandler}
                >
                  <Typography textAlign="center">{t("logout")}</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainBar;
