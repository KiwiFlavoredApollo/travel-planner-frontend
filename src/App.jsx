import {useState} from 'react'
import {Box, Button, Container, Stack,} from "@mui/material";
import {DestinationCard} from "./components/DestinationCard.jsx";
import {KoreanDatePicker} from "./components/KoreanDatePicker.jsx";
import {TravelAreaSelect} from "./components/TravelAreaSelect.jsx";
import axios from "axios";

const API_URL = "http://localhost:8080";

function App() {
  const [area, setArea] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [destinations, setDestinations] = useState([
    {
      keywords: [
        "경복궁"
      ]
    },
    {
      keywords: [
        "피자",
        "경치"
      ]
    },
    {
      keywords: [
        "커피",
        "디저트"
      ]
    }
  ]);

  async function handleTravelPlanGenerateButtonClick() {
    await axios.create()
        .post(
            API_URL,
            {
              area: area,
              startDate: startDate,
              endDate: endDate,
              destinations: destinations
            },
            {}
        )
        .then(response => {
          if (response.status !== 200) {
            return;
          }

          console.log("결과페이지로 이동");
          console.log(response.data);

        })
        .catch(error => {
          console.log(error);
        });
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

  return (
      <Container maxWidth={"sm"}>
        <Box>
          <Stack spacing={2}>
            <TravelAreaSelect></TravelAreaSelect>

            <KoreanDatePicker label={"여행시작일"}></KoreanDatePicker>

            <KoreanDatePicker label={"여행종료일"}></KoreanDatePicker>

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
                onClick={handleDestinationAddButtonClick}
            >
              여행지 추가
            </Button>

            <Button
                variant={"contained"}
                onClick={handleTravelPlanGenerateButtonClick}
                sx={{display: "block"}}
            >
              여행 계획 생성
            </Button>
          </Stack>
        </Box>
      </Container>
  )
}

export default App
