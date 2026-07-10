import {useLocation} from "react-router-dom";
import {Box, Container, Stack, Typography} from "@mui/material";
import {
  Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem,
  TimelineOppositeContent, TimelineSeparator
} from "@mui/lab";
import {TravelPlannerAppBar} from "../components/TravelPlannerAppBar.jsx";

export const ResultPage = () => {
  
  const location = useLocation();

  const destinations = location.state?.destinations || [];

  return (
      <Container maxWidth="sm" sx={{ paddingX: 0, height: '100vh' }}>
        <TravelPlannerAppBar></TravelPlannerAppBar>
        <Timeline
            position="right"
            sx={{
              "& .MuiTimelineItem-root:before": {
                flex: 0,
                padding: 0,
              },
            }}
        >
          {
            destinations.map((destination, index) => {
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
            })
          }
        </Timeline>
      </Container>
  );
}