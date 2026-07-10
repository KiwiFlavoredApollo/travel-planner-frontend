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
import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function handleSignupButtonClick() {
    navigate("/register");
  }

  async function handleLoginButtonClick() {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          userId,
          password,
        }
      );

      console.log(response.data);
      alert("로그인 성공");
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
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
                  onChange={(e) => setUserId(e.target.value)}
                />

              <TextField
                  label="비밀번호"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              <Button
                  variant="contained"
                  onClick={handleLoginButtonClick}
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