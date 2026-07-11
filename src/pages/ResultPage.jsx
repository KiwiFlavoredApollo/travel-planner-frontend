import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Stack, Typography, Button, Snackbar, Alert, CircularProgress, Box } from "@mui/material";
import {
  Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem,
  TimelineOppositeContent, TimelineSeparator
} from "@mui/lab";
import { TopAppBar } from "../components/TopAppBar.jsx";
import { useAccessToken } from "../context/AccessTokenContext.jsx";
import { api } from "../api/axios";

export const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken } = useAccessToken();
  const [travelPlan, setTravelPlan] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  // Load travel plan from location state
  useEffect(() => {
    const plan = location.state?.travelPlan;
    if (plan) {
      setTravelPlan(plan);
      setDestinations(plan.destinations || []);
      setLoading(false);
    } else {
      // fallback: maybe only destinations were passed
      setDestinations(location.state?.destinations || []);
      setLoading(false);
    }
  }, [location.state, navigate]);

  const handleDeletePlan = async () => {
    if (!travelPlan || !travelPlan.id) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const response = await api.delete(`/travel-planner/${travelPlan.id}`);
      if (response.status === 200 || response.status === 204) {
        setDeleteSuccess(true);
        // Navigate back to main list after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        throw new Error("삭제 실패");
      }
    } catch (err) {
      console.error(err);
      setDeleteError("여행 계획 삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ paddingX: 0, height: '100vh' }}>
        <TopAppBar />
        <Box
          sx={{
            display: 'flex',
            height: 'calc(100vh - 64px)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ paddingX: 0, height: '100vh' }}>
        <TopAppBar />
        <Box
          sx={{
            display: 'flex',
            height: 'calc(100vh - 64px)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ paddingX: 0, height: '100vh' }}>
      <TopAppBar />
      <Box sx={{ mt: 2 }}>
        {!travelPlan ? (
          <Typography align="center">여행 계획 정보를 불러올 수 없습니다.</Typography>
        ) : (
          <>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleDeletePlan}
              disabled={deleting}
              sx={{ mb: 2 }}
            >
              {deleting ? "삭제 중..." : "여행 계획 삭제"}
            </Button>
            {deleteError && (
              <Alert severity="error">{deleteError}</Alert>
            )}
            {deleteSuccess && (
              <Alert severity="success">여행 계획이 삭제되었습니다.</Alert>
            )}
          </>
        )}
      </Box>
      <Timeline>
        {destinations.map((destination, index) => {
          const isLastElement = index === destinations.length - 1;
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
        })}
      </Timeline>
    </Container>
  );
};