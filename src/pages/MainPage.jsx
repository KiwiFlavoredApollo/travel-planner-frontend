import {useState, useEffect} from 'react'
import {Box, Button, Container, Stack, Snackbar, Alert} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ko.js"
import {useNavigate} from "react-router-dom";
import {KoreanDatePicker} from "../components/KoreanDatePicker.jsx";
import {TravelAreaSelect} from "../components/TravelAreaSelect.jsx";
import {DestinationCard} from "../components/DestinationCard.jsx";
import {TopAppBar} from "../components/TopAppBar.jsx";
import {api} from "../api/axios.js";
import {MainPageBottomAppBar} from "../components/MainPageBottomAppBar.jsx";
import {useAccessToken} from "../context/AccessTokenContext.jsx";

export const MainPage = () => {
  const [area, setArea] = useState("all");
  const [startDate, setStartDate] = useState(() => dayjs().locale("ko"));
  const [endDate, setEndDate] = useState(() => dayjs().locale("ko"));
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);

  const { accessToken } = useAccessToken();

  const navigate = useNavigate();

  // Redirect to login page if no access token is present
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  async function handleTravelPlanGenerateButtonClick() {
    // Validation: At least one destination keyword is required
    const formattedDestinations = destinations
      .map(d => ({
        keyword: d.keywords && d.keywords.length > 0 ? d.keywords[0] : ""
      }))
      .filter(d => d.keyword !== "");

    if (formattedDestinations.length === 0) {
      setError("최소 하나의 여행지 키워드를 입력해주세요.");
      return;
    }

    setError(null);

    try {
      const response = await api.post("/travel-planner", {
        area: area,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        destinations: formattedDestinations
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("서버 응답 오류");
      }

      navigate("/result", {
        state: {
          destinations: response.data.destinations
        }
      });
    } catch (err) {
      console.error(err);
      setError("여행 계획 생성에 실패했습니다. 다시 시도해 주세요.");
    }
  }

  function handleDestinationAddButtonClick() {
    const empty = {
      keywords: []
    };

    setDestinations(() => [...destinations, empty]);
  }

  function removeDestination(destinationIndex) {
    const copy = [...destinations];
    copy.splice(destinationIndex, 1);
    setDestinations(copy);
  }

  function removeKeyword(destinationIndex, keywordIndex) {
    const copy = [...destinations];
    copy[destinationIndex] = {
      ...copy[destinationIndex],
      keywords: [...copy[destinationIndex].keywords]
    };
    copy[destinationIndex].keywords.splice(keywordIndex, 1);
    setDestinations(copy);
  }

  function addKeyword(destinationIndex, keyword) {
    const copy = [...destinations];
    copy[destinationIndex] = {
      ...copy[destinationIndex],
      keywords: [...copy[destinationIndex].keywords, keyword]
    };
    setDestinations(copy);
  }

  return (
      <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", paddingX: 0, height: '100vh' }}>
        <TopAppBar></TopAppBar>
        <Stack spacing={2} sx={{ marginY: 2, paddingX: 2 }}>
          <TravelAreaSelect area={area} onChange={(newArea) => setArea(newArea)}></TravelAreaSelect>

          <KoreanDatePicker label={"여행시작일"} onChange={(newDate) => setStartDate(newDate)}></KoreanDatePicker>

          <KoreanDatePicker label={"여행종료일"} onChange={(newDate) => setEndDate(newDate)}></KoreanDatePicker>

          {
            destinations.map((destination, destinationIndex) => (
                <DestinationCard
                    key={destinationIndex}
                    keywords={destination.keywords}
                    onDelete={() => removeDestination(destinationIndex)}
                    onRemoveKeyword={(keywordIndex) => removeKeyword(destinationIndex, keywordIndex)}
                    onAddKeyword={(keyword) => addKeyword(destinationIndex, keyword)}
                ></DestinationCard>
            ))
          }

          <Button
              variant={"outlined"}
              size={"large"}
              onClick={handleDestinationAddButtonClick}
          >
            여행지 추가
          </Button>
        </Stack>
        <Box sx={{ flexGrow: 1 }}></Box>
        <MainPageBottomAppBar onClick={handleTravelPlanGenerateButtonClick}></MainPageBottomAppBar>

        <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </Container>
  )
}
