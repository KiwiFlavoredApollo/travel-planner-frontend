import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Stack, Typography, Button, Snackbar, Alert, CircularProgress, Box } from "@mui/material";
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
        <Timeline>
          {
            travelPlan.destinations?.map((destination, index) => {
              const isLastElement = index === travelPlan.destinations.length - 1;

              return (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent>
                      <Stack>
                        <Typography variant="body2">{destination.date}</Typography>
                        <Typography variant="body2">{destination.time}</Typography>
                      </Stack>
                    </TimelineOppositeContent>

                    <TimelineSeparator>
                      <TimelineDot/>
                      {!isLastElement && <TimelineConnector/>}
                    </TimelineSeparator>

                    <TimelineContent>
                      <Typography variant="h6">{destination.place}</Typography>
                    </TimelineContent>
                  </TimelineItem>
              );
            })
          }
        </Timeline>
      </Container>
  );
}