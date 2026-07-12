import {
  Stack,
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {api} from "../api/axios.js";
import {useAccessTokenContext} from "../contexts/AccessTokenContext.jsx";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const { setAccessToken } = useAccessTokenContext();

  const navigate = useNavigate();

  function handleSignupButtonClick() {
    navigate("/register");
  }

  function getAccessToken(response) {
    const authorization = response.headers.authorization;
    const accessToken = authorization.replace("Bearer ", "");

    return accessToken;
  }

  async function handleLoginButtonClick() {
    try {
      const data = {
        userId,
        password,
      }

      const response = await api.post("/auth/login", data);

      if (response.status !== 200) {
        return;
      }

      setAccessToken(() => getAccessToken(response));

      navigate("/");

    } catch (error) {
      console.log(error);
    }
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
                  value={userId}
                  required
                  onChange={(e) => setUserId(e.target.value)}
              />

              <TextField
                  label="비밀번호"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                  variant="contained"
                  onClick={handleLoginButtonClick}
              >
                로그인
              </Button>

              <Divider variant="inset"></Divider>

              <Button
                  variant="contained"
                  onClick={handleSignupButtonClick}
              >
                회원가입
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
  );
}