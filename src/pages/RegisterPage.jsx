import {
  Container,
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  function handleLoginButtonClick() {
    navigate("/login");
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5">회원가입</Typography>

              <TextField
                label="이름"
                variant="outlined"
              />

              <TextField
                label="아이디"
                variant="outlined"
              />

              <TextField
                label="비밀번호"
                type="password"
                variant="outlined"
              />

              <Button variant="contained">
                가입하기
              </Button>

              <Button
                variant="outlined"
                onClick={handleLoginButtonClick}
              >
                로그인으로 이동
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}