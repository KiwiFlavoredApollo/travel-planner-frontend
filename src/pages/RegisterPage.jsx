import {
  Container,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import {api} from "../api/axios.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegisterButtonClick() {
    if (!name || !userId || !password) {
      alert("모든 빈칸을 채워주세요.");
      return;
    }

    await api.post("/auth/register", {
      name: name,
      userId: userId,
      password: password,
    }, {})
        .then((response) => {
          if (response.status !== 201) {
            alert("회원가입에 실패했습니다.");
            return;
          }
          alert("회원가입이 완료되었습니다!");
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
          alert("회원가입 중 오류가 발생했습니다. 아이디 중복 여부를 확인해 주세요.");
        })
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleUserIdChange(event) {
    setUserId(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
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
              <Typography variant="h5" align="center">
                회원가입
              </Typography>

              <TextField
                  label="이름"
                  variant="outlined"
                  value={name}
                  onChange={handleNameChange}
              />

              <TextField
                  label="아이디"
                  variant="outlined"
                  value={userId}
                  onChange={handleUserIdChange}
              />

              <TextField
                  label="비밀번호"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
              />

              <Button variant="contained" onClick={handleRegisterButtonClick}>
                가입하기
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
  );
}
