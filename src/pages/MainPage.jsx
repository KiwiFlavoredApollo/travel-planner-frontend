import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Snackbar,
  Alert,
  Tooltip,
  Fab,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { useAccessToken } from '../context/AccessTokenContext.jsx';
import { TopAppBar } from '../components/TopAppBar.jsx';

export const MainPage = () => {
  const [travelPlans, setTravelPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useAccessToken();
  const navigate = useNavigate();

  // Redirect to login if no access token
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  // Fetch travel plans on mount
  useEffect(() => {
    const fetchTravelPlans = async () => {
      try {
        setLoading(true);
        const response = await api.get('/travel-planner');
        if (response.status === 200) {
          setTravelPlans(response.data);
        } else {
          throw new Error('Failed to fetch travel plans');
        }
      } catch (err) {
        console.error(err);
        setError('여행 계획 목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchTravelPlans();
    }
  }, [accessToken, navigate]);

  const handleCreatePlan = () => {
    navigate('/create');
  };

  const handlePlanClick = (plan) => {
    navigate('/result', { state: { travelPlan: plan } });
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
          <Box sx={{ width: 2, height: 2 }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'block',
                animation: 'rotate 2s linear infinite',
                border: '2px solid #ccc',
                borderTopColor: '#1976d2',
                borderRadius: '50%',
              }}
            />
          </Box>
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
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopAppBar />
      <Box sx={{ flexGrow: 1 }}>
        {travelPlans.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" align="center">
              저장된 여행 계획이 없습니다.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2} sx={{ p: 2 }}>
            {travelPlans.map((plan) => (
              <Button
                key={plan.id}
                variant="outlined"
                size="medium"
                sx={{ textAlign: 'left', width: '100%' }}
                onClick={() => handlePlanClick(plan)}
              >
                <Stack direction="row" spacing={2}>
                  <Box sx={{ minWidth: 60 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: '#1976d2',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      {plan.id}
                    </Box>
                  </Box>
                  <Stack>
                    <Typography variant="h6" fontWeight="500">
                      {plan.area}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {plan.startDate} ~ {plan.endDate}
                    </Typography>
                  </Stack>
                </Stack>
              </Button>
            ))}
          </Stack>
        )}
      </Box>
      <Box sx={{ position: 'fixed', bottom: 24, right: 24 }}>
        <Tooltip title="새 여행 계획 생성">
          <Fab
            color="primary"
            aria-label="add"
            size="large"
            onClick={handleCreatePlan}
          >
            <Box sx={{ fontSize: 28, fontWeight: 'bold', lineHeight: 1 }}>
              +
            </Box>
          </Fab>
        </Tooltip>
      </Box>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  );
};