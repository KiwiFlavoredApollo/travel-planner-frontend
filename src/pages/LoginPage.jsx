import {
  Stack,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent, Divider,
} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  function handleSignupButtonClick() {
    navigate("/register");
  }

  return (
      <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center"
          }}
      >
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography
                  variant="h5"
              >
                로그인
              </Typography>

              <TextField
                  label="아이디"
                  variant="outlined"
              />

              <TextField
                  label="비밀번호"
                  type="password"
                  variant="outlined"
              />

              <Button
                  variant="contained"
              >
                로그인 하기
              </Button>

              <Divider variant="inset"></Divider>

              <Button
                  variant="contained"
                  onClick={handleSignupButtonClick}
              >
                회원가입 하기
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
  );
}