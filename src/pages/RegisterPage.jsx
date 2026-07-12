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

  function isRequiredTextFieldEmpty() {
    return !name || !userId || !password;
  }

  async function handleRegisterButtonClick() {
    if (isRequiredTextFieldEmpty()) {
      return;
    }

    const data = {
      name: name,
      userId: userId,
      password: password,
    };

    const config = {};

    await api.post("/auth/register", data, config)
        .then((response) => {
          if (response.status !== 201) {
            return;
          }

          navigate("/login");

        })
        .catch((error) => {
          console.error(error);
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
              <Typography variant="h5">
                회원가입
              </Typography>

              <TextField
                  label="이름"
                  variant="outlined"
                  value={name}
                  required
                  onChange={handleNameChange}
              />

              <TextField
                  label="아이디"
                  variant="outlined"
                  value={userId}
                  required
                  onChange={handleUserIdChange}
              />

              <TextField
                  label="비밀번호"
                  type="password"
                  variant="outlined"
                  value={password}
                  required
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