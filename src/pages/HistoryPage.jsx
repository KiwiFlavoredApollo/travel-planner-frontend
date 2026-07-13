import { useState, useEffect } from 'react';
import {
  Box,
  Container, Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { TopAppBar } from '../components/TopAppBar.jsx';
import { useAccessTokenContext } from "../contexts/AccessTokenContext.jsx";
import { TravelPlanCard } from "../components/TravelPlanCard.jsx";
import { Http } from "@mui/icons-material";
import { HttpStatusCode } from "axios";

export const HistoryPage = () => {
  const { accessToken } = useAccessTokenContext();

  const navigate = useNavigate();

  const [ travelPlans, setTravelPlans ] = useState([
    {
      id: 1,
      userId: 1,
      area: "all",
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
      area: "seoul",
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
      area: "gyeonggi",
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
      area: "gangwon",
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
      area: "daejeon",
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
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const fetchTravelPlans = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        };

        const response = await api.get('/travel-plan', config);

        if (response.status !== HttpStatusCode.Ok) {
          return;
        }

        setTravelPlans(response.data);
        setIsLoading(false);

      } catch (err) {
        console.error(err);
      }
    };

    if (accessToken) {
      fetchTravelPlans();
    }
  }, [ accessToken, navigate ]);

  // TODO
  function isLoggedIn() {
    return true;
    return accessToken !== null;
  }

  if (!isLoggedIn()) {
    return (
        <Navigate to="/login"></Navigate>
    );
  }

  const navigateToTimelinePage = (travelPlan) => {
    const options = {
      state: {
        travelPlan: travelPlan
      }
    }
    navigate('/timeline', options);
  };

  async function removeTravelPlan(index) {
    try {
      const toBeDeleted = travelPlans.splice(index, 1)[0];

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }

      const response = await api.delete(`/travel-plan/${toBeDeleted.id}`, config);

      if (response.status !== HttpStatusCode.NoContent) {
        return;
      }

      setTravelPlans([ ...travelPlans ]);

    } catch (error) {
      console.error(error);
    }
  }

  // TODO
  useEffect(function setIsLoadingFalseAfterOneSecond() {
    async function setIsLoadingAfterTimeout(timeout) {
      await new Promise(resolve => setTimeout(resolve, timeout));

      setIsLoading(false);
    }

    setIsLoadingAfterTimeout(1000)
  }, [])

  function getSkeletons() {
    return [ ...Array(3) ].map((_, index) => (
        <Skeleton
            key={index}
            variant="rounded"
            sx={{ height: 136 }}
        />
    ));
  }

  function getTravelPlanCards() {
    return (
        travelPlans.map((travelPlan, index) => (
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
            )
        )
    );
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
          {
            isLoading ? getSkeletons() : getTravelPlanCards()
          }
        </Stack>
      </Container>
  );
};