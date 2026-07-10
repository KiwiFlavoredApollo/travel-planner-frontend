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
import {useAccessToken} from "../context/AccessTokenContext.jsx";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAccessToken();

  function handleSignupButtonClick() {
    navigate("/register");
  }

  async function handleLoginButtonClick() {
    try {
      await login(userId, password);
      navigate("/");
    } catch (err) {
      alert("로그인 실패: " + err.message);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" align="center">
              로그인
            </Typography>
            <TextField
              label="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
            />
            <TextField
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleLoginButtonClick}
              fullWidth
            >
              로그인
            </Button>
            <Divider />
            <Button
              variant="text"
              onClick={handleSignupButtonClick}
              fullWidth
            >
              회원가입
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
