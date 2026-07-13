import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Stack, Typography, Button, Snackbar, Alert, CircularProgress, Box, Card, CardContent, TextField } from "@mui/material";
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
        <Stack spacing={2} sx={{ padding: 2 }}>
          {
            travelPlan.destinations?.map((destination, index) => (
              <card key={index}>
                </cardcontent>

                  {
                    editingIndex === index ? (
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
                <Typography variant="h6">
                  {destination.place}
                </Typography>

                <Typography>
                  {destination.date}
                </Typography>

                <Typography>
                  {destination.time}
                </Typography>

                <Button
                  onClick={() => setEditingIndex(index)}
                >
                  수정
                </Button>
              </>
            )
          }

        </CardContent>
      </Card>
    ))
  }
</Stack>
      </Container>
  );
}