import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {Container, Stack, Typography, Button, Snackbar, Alert, CircularProgress, Box, Card, CardContent, CardHeader, TextField} from "@mui/material";
import {
  Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem,
  TimelineOppositeContent, TimelineSeparator
} from "@mui/lab";
import { TopAppBar } from "../components/TopAppBar.jsx";
import { useAccessTokenContext } from "../contexts/AccessTokenContext.jsx";

export const TimelinePage = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const { accessToken } = useAccessTokenContext();

  const travelPlan = location.state?.travelPlan || [];

  const [editingIndex, setEditingIndex] = useState(null);

  function isLoggedIn() {
    return accessToken !== null;
  }

  if (!isLoggedIn()) {
    return (
        <Navigate to="/login"></Navigate>
    );
  }

  return (
      <Container maxWidth="sm" sx={{ paddingX: 0, height: '100vh' }}>
        <TopAppBar/>
        <Stack spacing={2} sx={{ p: 2 }}>
  {travelPlan.destinations?.map((destination, index) => (
    <Card key={index}>
      <CardHeader
        title={destination.place}
        action={
          editingIndex !== index && (
            <IconButton
              onClick={() => setEditingIndex(index)}
            >
              <EditIcon />
            </IconButton>
          )
        }
      />

      <CardContent>
        {editingIndex === index ? (
          <>
            <TextField
              defaultValue={destination.place}
              fullWidth
            />

            <TextField
              defaultValue={destination.date}
              fullWidth
              sx={{ mt: 1 }}
            />

            <TextField
              defaultValue={destination.time}
              fullWidth
              sx={{ mt: 1 }}
            />

            <Button
              sx={{ mt: 1 }}
              onClick={() => setEditingIndex(null)}
            >
              저장
            </Button>
          </>
        ) : (
          <>
            <Typography>
              {destination.date}
            </Typography>

            <Typography>
              {destination.time}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  ))}
</Stack>
      </Container>
  );
}