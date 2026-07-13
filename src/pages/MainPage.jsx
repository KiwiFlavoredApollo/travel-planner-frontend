import {useState, useEffect} from 'react'
import {Box, Button, Container, Stack, Snackbar, Alert, AppBar} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ko.js";
import {useNavigate} from "react-router-dom";
import {KoreanDatePicker} from "../components/KoreanDatePicker.jsx";
import {TravelAreaSelect} from "../components/TravelAreaSelect.jsx";
import {DestinationCard} from "../components/DestinationCard.jsx";
import {TopAppBar} from "../components/TopAppBar.jsx";
import {api} from "../api/axios.js";
import {useAccessTokenContext} from "../contexts/AccessTokenContext.jsx";

export const MainPage = () => {
  const [area, setArea] = useState("all");
  const [startDate, setStartDate] = useState(() => dayjs().locale("ko"));
  const [endDate, setEndDate] = useState(() => dayjs().locale("ko"));
  const [destinations, setDestinations] = useState([]);

  const {accessToken} = useAccessTokenContext();

  const navigate = useNavigate();

  async function handleTravelPlanGenerateButtonClick() {
    const data = {
      area: area,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      destinations: destinations,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }

    try {
      const response = await api.post("/travel-planner", data, config);

      if (response.status !== 200) {
        return;
      }

      const options = {
        state: {
          travelPlan: response.data
        }
      };

      navigate("/timeline", options);

    } catch (err) {
      console.error(err);
    }
  }

  function handleDestinationAddButtonClick() {
    const empty = {
      keywords: []
    };

    setDestinations(() => [...destinations, empty]);
  }

  function removeDestination(destinationIndex) {
    destinations.splice(destinationIndex, 1);
    setDestinations(() => [...destinations]);
  }

  function removeKeyword(destinationIndex, keywordIndex) {
    destinations[destinationIndex].keywords.splice(keywordIndex, 1);
    setDestinations(() => [...destinations]);
  }

  function addKeyword(destinationIndex, keyword) {
    destinations[destinationIndex].keywords.push(keyword);
    setDestinations(() => [...destinations]);
  }

  function isReadyForGeneratingTravelPlan() {
    return !isDestinationKeywordsEmpty(destinations) && isDateRangeValid(startDate, endDate);

    function isDestinationKeywordsEmpty(destinations) {
      const nonEmpty = destinations.filter(destination => destination.keywords.length !== 0);
      return nonEmpty.length === 0;
    }

    function isDateRangeValid(startDate, endDate) {
      try {
        return endDate.diff(startDate) >= 0;

      } catch (error) {
        return false;
      }
    }
  }

  return (
      <Container maxWidth="sm" sx={{display: "flex", flexDirection: "column", paddingX: 0, height: '100vh'}}>
        <TopAppBar></TopAppBar>

        <Stack spacing={2} sx={{marginY: 2, paddingX: 1}}>
          <TravelAreaSelect
              area={area}
              onChange={(newArea) => setArea(newArea)}
          ></TravelAreaSelect>

          <KoreanDatePicker
              label={"여행시작일"}
              value={startDate}
              disablePast={true}
              onChange={(newDate) => setStartDate(newDate)}
          ></KoreanDatePicker>

          <KoreanDatePicker
              label={"여행종료일"}
              value={endDate}
              disablePast={true}
              onChange={(newDate) => setEndDate(newDate)}
          ></KoreanDatePicker>

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

        <Box sx={{flexGrow: 1}}></Box>

        <AppBar
            position="sticky"
            color="transparent"
            elevation={0}
            sx={{bottom: 0, paddingX: 1}}
        >
          <Button
              variant="contained"
              size={"large"}
              onClick={handleTravelPlanGenerateButtonClick}
              disabled={!isReadyForGeneratingTravelPlan()}
              sx={{marginY: 1}}
          >
            여행계획생성
          </Button>
        </AppBar>
      </Container>
  )
}