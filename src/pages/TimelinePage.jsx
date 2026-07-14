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

export const TimelinePage = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const { accessToken } = useAccessTokenContext();

  const travelPlan = location.state?.travelPlan || [];

  const [ editingIndex, setEditingIndex ] = useState(null);

  const [destinations, setDestinations] = useState(
  travelPlan.destinations || []
  );

  const [editedPlace, setEditedPlace] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedTime, setEditedTime] = useState("");

  function isLoggedIn() {
    return true;
    return accessToken !== null;
  }

  if (!isLoggedIn()) {
    return (
        <Navigate to="/login"></Navigate>
    );
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
            </Stack>
          </CardContent>
        </Card>
    );
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
                    onClick={() => setEditingIndex(null)}
                >
                  <SaveIcon/>
                </IconButton>
              }
          />

          <CardContent sx={{ paddingTop: 0 }}>
            <Stack spacing={2}>
              <TextField
                  label="여행지"
                  defaultValue={destination.place}
              />

              <KoreanDatePicker
                  label={"날짜"}
                  value={destination.date}
              />

              // TODO
              // TimePicker 컴포넌트 사용하기
              <TextField
                  label="시간"
                  defaultValue={destination.time}
              />
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
            travelPlan.destinations?.map((destination, index) => (
                index === editingIndex ?
                    getEditModeCard(destination, index) :
                    getViewModeCard(destination, index)
            ))
          }
        </Stack>
      </Container>
  );
}