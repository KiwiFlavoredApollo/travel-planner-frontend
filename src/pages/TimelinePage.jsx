import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField
} from "@mui/material";
import { TopAppBar } from "../components/TopAppBar.jsx";
import { useAccessTokenContext } from "../contexts/AccessTokenContext.jsx";
import { KoreanDatePicker } from "../components/KoreanDatePicker.jsx";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { api } from "../api/axios.js";
import { KoreanTimePicker } from "../components/KoreanTimePicker.jsx";
import { HttpStatusCode } from "axios";
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FoggyIcon from '@mui/icons-material/Foggy';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export const TimelinePage = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const { accessToken } = useAccessTokenContext();

  const [ travelPlan, setTravelPlan ] = useState(location.state?.travelPlan || { destinations: [] });
  const [ editingIndex, setEditingIndex ] = useState(null);
  const [ editedPlace, setEditedPlace ] = useState("");
  const [ editedDate, setEditedDate ] = useState("");
  const [ editedTime, setEditedTime ] = useState("");

  function isLoggedIn() {
    return accessToken !== null;
  }

  if (!isLoggedIn()) {
    return (
        <Navigate to="/login"></Navigate>
    );
  }

  function updateDestination(newDestination, index) {
    const destinations = [
      ...travelPlan.destinations
    ];

    destinations[index] = newDestination;

    setTravelPlan({
      ...travelPlan,
      destinations: destinations
    });
  }

  /**
   * 현재 설계된 API에 큰 결함이 있습니다.
   * 1. Request Body와 Path Variable로 여행지의 아이디를 전달하기 때문에 중복입니다.
   * 2. 백엔드 측에서 여행계획을 생성할 때와 여행계획을 수정할 때 DestionRequest를 재활용하기 때문에
   * 여행계획을 수정할 때와는 상관없는 keywards를 프론트엔드 측에서 전달해야하는 문제가 있습니다.
   *
   * @param index
   * @returns {Promise<void>}
   */
  async function saveDestination(index) {
    try {
      const destination = travelPlan.destinations[index];

      const data = {
        id: destination.id,
        place: editedPlace,
        date: editedDate,
        time: editedTime,
        weather: destination.weather,
        keywords: [ "" ],
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      const response = await api.put(`/destinations/${destination.id}`, data, config);

      if (response.status !== HttpStatusCode.Ok) {
        return;
      }

      updateDestination(data, index);
      setEditingIndex(null);

    } catch (error) {
      console.error(error);
    }
  }

  function getEditModeCard(destination, index) {
    return (
        <Card key={index}>
          <CardHeader
              title={
                <Typography variant="h6">수정</Typography>
              }
              action={
                <IconButton
                    onClick={() => saveDestination(index)}
                >
                  <SaveIcon/>
                </IconButton>
              }
          />

          <CardContent sx={{ paddingTop: 0 }}>
            <Stack spacing={2}>
              <TextField
                  label="여행지"
                  value={editedPlace}
                  onChange={(event) => setEditedPlace(event.target.value)}
              />

              <KoreanDatePicker
                  label={"날짜"}
                  value={editedDate}
                  onChange={(date) => setEditedDate(date)}
              />

              <KoreanTimePicker
                  label="시간"
                  value={editedTime}
                  onChange={(time) => setEditedTime(time)}
              />
            </Stack>
          </CardContent>
        </Card>
    );
  }

  function getWeatherIcon(weather) {
    switch (weather) {
      case "맑음":
        return <WbSunnyIcon sx={{ marginRight: 1 }}/>

      case "흐림":
        return <CloudIcon sx={{ marginRight: 1 }}/>

      case "비":
        return <UmbrellaIcon sx={{ marginRight: 1 }}/>

      case "눈":
        return <AcUnitIcon sx={{ marginRight: 1 }}/>

      case "안개":
        return <FoggyIcon sx={{ marginRight: 1 }}/>

      default:
        return <QuestionMarkIcon sx={{ marginRight: 1 }}/>
    }
  }

  function getViewModeCard(destination, index) {
    return (
        <Card key={index}>
          <CardHeader
              title={
                <Typography variant="h6">
                  {destination.place}
                </Typography>
              }
              action={
                <IconButton
                    onClick={() => {
                      setEditingIndex(index);
                      setEditedPlace(destination.place);
                      setEditedDate(destination.date);
                      setEditedTime(destination.time);
                    }}
                >
                  <EditIcon/>
                </IconButton>
              }
          />

          <CardContent sx={{ paddingTop: 0 }}>
            <Stack spacing={1}>
              <Stack direction={"row"} sx={{ alignItems: 'center' }}>
                <CalendarTodayIcon sx={{ marginRight: 1 }}/>
                <Typography variant="body2">
                  {destination.date}
                </Typography>
              </Stack>

              <Stack direction={"row"} sx={{ alignItems: 'center' }}>
                <ScheduleIcon sx={{ marginRight: 1 }}/>
                <Typography variant="body2">
                  {destination.time}
                </Typography>
              </Stack>

              <Stack direction={"row"} sx={{ alignItems: 'center' }}>
                {
                  getWeatherIcon(destination.weather)
                }
                <Typography variant="body2">
                  {destination.weather || "정보 없음"}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
    );
  }

  return (
      <Container maxWidth="sm" sx={{ paddingX: 0, height: '100vh' }}>
        <TopAppBar/>
        <Stack spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
          {
            travelPlan.destinations.map((destination, index) => (
                index === editingIndex ?
                    getEditModeCard(destination, index) :
                    getViewModeCard(destination, index)
            ))
          }
        </Stack>
      </Container>
  );
}