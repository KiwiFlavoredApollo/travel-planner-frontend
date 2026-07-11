import {AppBar, Button, IconButton, Switch, Toolbar, Typography, useColorScheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import {useAccessTokenContext} from "../contexts/AccessTokenContext.jsx";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import {useEffect} from "react";

export const TopAppBar = () => {
  const { accessToken, setAccessToken } = useAccessTokenContext();
  const { mode, setMode } = useColorScheme();

  const navigate = useNavigate();

  function handleLogoutButtonClick() {
    setAccessToken(null);

    navigate("/login");
  }

  function handleHomeButtonClick() {
    navigate("/");
  }

  function handleColorSchemeModeButtonClick() {
    if (mode === "dark") {
      setMode("light");

    } else if (mode === "light") {
      setMode("system");

    } else if (mode === "system") {
      setMode("dark");
    }
  }

  function getColorSchemeModeIcon() {
    if (mode === "dark") {
      return <DarkModeIcon/>;

    } else if (mode === "light") {
      return <LightModeIcon/>;

    } else if (mode === "system") {
      return <SettingsBrightnessIcon/>;
    }
  }

  useEffect(function setDefaultMode () {
    setMode("dark");
  }, [])

  return (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ marginRight: 2 }}
              onClick={handleHomeButtonClick}
          >
            <HomeIcon/>
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>여행계획도우미</Typography>
          <IconButton
              size="large"
              color="inherit"
              onClick={handleColorSchemeModeButtonClick}
          >
            {getColorSchemeModeIcon()}
          </IconButton>
          <Button color="inherit" onClick={handleLogoutButtonClick}>로그아웃</Button>
        </Toolbar>
      </AppBar>
  );
}