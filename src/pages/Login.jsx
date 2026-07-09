import { Stack, TextField, Button, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  function handleSignupButtonClick() {
    navigate("/signup");
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: "300px", margin: "50px auto", textAlign: "center" }}>
      <Typography variant="h5">로그인</Typography>
      <TextField label="아이디" variant="outlined" />
      <TextField label="비밀번호" type="password" variant="outlined" />
      <Button variant="contained">로그인 하기</Button>
      <Button variant="contained" onClick={handleSignupButtonClick}>회원가입하기</Button>
    </Stack>
  );
}