import { AppBar, Button, IconButton, Switch, Toolbar, Tooltip, Typography, useColorScheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useAccessTokenContext } from "../contexts/AccessTokenContext.jsx";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HistoryIcon from '@mui/icons-material/History';

export const TopAppBar = () => {
  const { accessToken, setAccessToken } = useAccessTokenContext();

  const { mode, setMode } = useColorScheme();

  const navigate = useNavigate();

  function handleLoginLogoutButtonClick() {
    setAccessToken(null);

    navigate("/login");
  }

  function handleHomeButtonClick() {
    navigate("/");
  }

  function handleHistoryButtonClick() {
    navigate("/history");
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

  function isLoggedIn() {
    return accessToken !== null;
  }

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

          <Typography
              sx={{ flexGrow: 1 }}
          >
            여행계획도우미
          </Typography>

          <IconButton
              size="large"
              color="inherit"
              onClick={handleColorSchemeModeButtonClick}
          >
            {getColorSchemeModeIcon()}
          </IconButton>

          <IconButton
              size="large"
              color="inherit"
              onClick={handleHistoryButtonClick}
          >
            <HistoryIcon/>
          </IconButton>

          <Button
              color="inherit"
              onClick={handleLoginLogoutButtonClick}
          >
            {
              isLoggedIn() ? "로그아웃" : "로그인"
            }
          </Button>
        </Toolbar>
      </AppBar>
  );
}