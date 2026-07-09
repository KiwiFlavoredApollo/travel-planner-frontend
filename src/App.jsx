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
import {DestinationKeywordInputCard} from "./components/DestinationKeywordInputCard.jsx";

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

  const [destinations, setDestinations] = useState([
    {
      keywords: [
        "경복궁"
      ]
    },
    {
      keywords: [
        "피자",
        "경치"
      ]
    },
    {
      keywords: [
        "커피",
        "디저트"
      ]
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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
              <DatePicker label={"여행종료일"}></DatePicker>
            </LocalizationProvider>
            {
              destinations.map((destination, index) => (
                  <DestinationKeywordInputCard keywords={destination.keywords}></DestinationKeywordInputCard>
              ))
            }
            <Button variant={"outlined"}>여행지 추가</Button>
            <Button variant={"contained"} sx={{display: "block"}}>여행 계획 생성</Button>
          </Stack>
        </Box>
      </Container>
  )
}

export default App
