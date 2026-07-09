import {useState} from 'react'
import {
  Box,
  Button, Card, Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack, TextField, Typography
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/ko.js';

function App() {
  const [areas, setAreas] = useState([
    {
      name: "전국",
      value: "all"
    },
    {
      name: "서울",
      value: "seoul"
    },
    {
      name: "경기",
      value: "gyeonggi"
    },
    {
      name: "강원",
      value: "gangwon"
    }
  ]);

  return (
      <Container maxWidth={"sm"}>
        <Box>
          <Stack spacing={2}>
            <FormControl>
              <InputLabel>지역</InputLabel>
              <Select variant={"outlined"}>
                {
                  areas.map((area, index) => (
                      <MenuItem value={area.value}>{area.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
              <DatePicker label={"여행시작일"}></DatePicker>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label={"여행종료일"}></DatePicker>
            </LocalizationProvider>
            <Card
                sx={{
                  padding: 2
                }}
            >
              <Stack spacing={2}>
                <Typography variant={"h5"}>여행지</Typography>
                <Box>
                  <Chip label={"경복궁"} onDelete={() => {}}></Chip>
                </Box>
                <TextField></TextField>
              </Stack>
            </Card>
            <Card
                sx={{
                  padding: 2
                }}
            >
              <Stack spacing={2}>
                <Typography variant={"h5"}>여행지</Typography>
                <Box>
                  <Chip label={"피자"} onDelete={() => {}}></Chip>
                  <Chip label={"경치"} onDelete={() => {}}></Chip>
                </Box>
                <TextField></TextField>
              </Stack>
            </Card>
            <Card
                sx={{
                  padding: 2
                }}
            >
              <Stack spacing={2}>
                <Typography variant={"h5"}>여행지</Typography>
                <Box>
                  <Chip label={"커피"} onDelete={() => {}}></Chip>
                  <Chip label={"디저트"} onDelete={() => {}}></Chip>
                </Box>
                <TextField></TextField>
              </Stack>
            </Card>
            <Button variant={"outlined"}>여행지 추가</Button>
            <Button variant={"contained"} sx={{display: "block"}}>생성</Button>
          </Stack>
        </Box>
      </Container>
  )
}

export default App
