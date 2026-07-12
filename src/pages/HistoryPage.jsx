import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { TopAppBar } from '../components/TopAppBar.jsx';
import { useAccessTokenContext } from "../contexts/AccessTokenContext.jsx";
import { TravelPlanCard } from "../components/TravelPlanCard.jsx";

export const HistoryPage = () => {
  const { accessToken } = useAccessTokenContext();

  const navigate = useNavigate();

  const [ travelPlans, setTravelPlans ] = useState([
    {
      id: 1,
      userId: 1,
      area: "전국",
      startDate: "2026-06-06",
      endDate: "2026-06-07",
      destinations: [
        {
          place: "경복궁",
          date: "2026-06-06",
          time: "00:00:00",
        },
        {
          place: "남대문",
          date: "2026-06-06",
          time: "00:00:00",
        }
      ]
    },
    {
      id: 1,
      userId: 1,
      area: "서울",
      startDate: "2026-06-06",
      endDate: "2026-06-07",
      destinations: [
        {
          place: "롯데타워",
          date: "2026-06-06",
          time: "00:00:00",
        },
        {
          place: "남대문",
          date: "2026-06-06",
          time: "00:00:00",
        }
      ]
    },
    {
      id: 1,
      userId: 1,
      area: "경기",
      startDate: "2026-06-06",
      endDate: "2026-06-07",
      destinations: [
        {
          place: "네이버",
          date: "2026-06-06",
          time: "00:00:00",
        },
        {
          place: "남대문",
          date: "2026-06-06",
          time: "00:00:00",
        }
      ]
    },
    {
      id: 1,
      userId: 1,
      area: "강원",
      startDate: "2026-06-06",
      endDate: "2026-06-07",
      destinations: [
        {
          place: "동해",
          date: "2026-06-06",
          time: "00:00:00",
        },
        {
          place: "남대문",
          date: "2026-06-06",
          time: "00:00:00",
        }
      ]
    },
    {
      id: 1,
      userId: 1,
      area: "충청",
      startDate: "2026-06-06",
      endDate: "2026-06-07",
      destinations: [
        {
          place: "성심당",
          date: "2026-06-06",
          time: "00:00:00",
        },
        {
          place: "남대문",
          date: "2026-06-06",
          time: "00:00:00",
        }
      ]
    },
  ]);

  useEffect(() => {
    const fetchTravelPlans = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        };

        const response = await api.get('/travel-plan', config);

        if (response.status !== 200) {
          return;
        }

        setTravelPlans(response.data);

      } catch (err) {
        console.error(err);
      }
    };

    if (accessToken) {
      fetchTravelPlans();
    }
  }, [ accessToken, navigate ]);

  function isLoggedIn() {
    return accessToken !== null;
  }

  useEffect(function navigateToLoginPage() {
    if (isLoggedIn()) {
      return;
    }

    navigate('/login');
  }, [])

  const navigateToTimelinePage = (travelPlan) => {
    const options = {
      state: {
        travelPlan: travelPlan
      }
    }
    navigate('/timeline', options);
  };

  async function removeTravelPlan(index) {
    // TODO
    const toBeDeleted = travelPlans.splice(index, 1);

    if (toBeDeleted.length !== 1) {
      return;
    }

    setTravelPlans([ ...travelPlans ]);

    return;

    try {
      const toBeDeleted = travelPlans.splice(index, 1);

      if (toBeDeleted.length !== 1) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }

      const response = api.delete(`/travel-plan/${toBeDeleted.id}`, config);

      if (response !== 204) {
        return;
      }

      setTravelPlans([ ...travelPlans ]);

    } catch (error) {
      console.error(error);
    }
  }

  return (
      <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            paddingX: 0
          }}
      >
        <TopAppBar/>
        <Stack spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
          {travelPlans.map((travelPlan, index) => (
              <TravelPlanCard
                  key={index}
                  travelPlan={travelPlan}
                  onClick={() => {
                    navigateToTimelinePage(travelPlan);
                  }}
                  onDelete={(event) => {
                    event.stopPropagation();
                    removeTravelPlan(index)
                  }}
              ></TravelPlanCard>
          ))}
        </Stack>
      </Container>
  );
};