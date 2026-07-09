import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

export const TravelPlannerAppBar = () => {
  const navigate = useNavigate();

  function handleLogoutButtonClick() {
    navigate("/login");
  }

  function handleHomeButtonClick() {
    navigate("/");
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
          <Typography sx={{ flexGrow: 1 }}>여행게획도우미</Typography>
          <Button color="inherit" onClick={handleLogoutButtonClick}>로그아웃</Button>
        </Toolbar>
      </AppBar>
  );
}