import {AppBar, Button} from "@mui/material";

export const MainPageBottomAppBar = ({ onClick }) => {
  return (
      <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          sx={{ bottom: 0 }}
      >
        <Button
            variant={"contained"}
            size={"large"}
            onClick={() => onClick()}
            sx={{ marginY: 1 }}
        >
          여행 계획 생성
        </Button>
      </AppBar>
  );
}
