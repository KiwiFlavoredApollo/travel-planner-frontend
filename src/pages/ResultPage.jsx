import {Box, Container, Stack, Typography} from "@mui/material";
import {
  Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem,
  TimelineOppositeContent, TimelineSeparator
} from "@mui/lab";

export const ResultPage = () => {
  const destinations = [
    { place: "경복궁", date: "2026-10-01", time: "09:30:00" },
    { place: "북촌한옥마을", date: "2026-10-01", time: "11:00:00" },
    { place: "인사동", date: "2026-10-01", time: "13:30:00" },
    { place: "익선동", date: "2026-10-01", time: "15:30:00" },
    { place: "청계천", date: "2026-10-01", time: "18:30:00" },

    { place: "창덕궁", date: "2026-10-02", time: "09:30:00" },
    { place: "창경궁", date: "2026-10-02", time: "11:30:00" },
    { place: "광장시장", date: "2026-10-02", time: "13:00:00" },
    { place: "동대문디자인플라자(DDP)", date: "2026-10-02", time: "15:30:00" },
    { place: "남산서울타워", date: "2026-10-02", time: "19:00:00" },

    { place: "국립중앙박물관", date: "2026-10-03", time: "10:00:00" },
    { place: "용산가족공원", date: "2026-10-03", time: "12:30:00" },
    { place: "이태원", date: "2026-10-03", time: "15:00:00" },
    { place: "한강공원 반포지구", date: "2026-10-03", time: "18:30:00" },

    { place: "롯데월드", date: "2026-10-04", time: "10:00:00" },
    { place: "석촌호수", date: "2026-10-04", time: "16:00:00" },
    { place: "롯데월드타워 서울스카이", date: "2026-10-04", time: "18:30:00" },

    { place: "코엑스", date: "2026-10-05", time: "10:30:00" },
    { place: "별마당도서관", date: "2026-10-05", time: "11:30:00" },
    { place: "봉은사", date: "2026-10-05", time: "14:00:00" },
    { place: "압구정 로데오거리", date: "2026-10-05", time: "17:00:00" },
    { place: "가로수길", date: "2026-10-05", time: "19:00:00" },

    { place: "서울숲", date: "2026-10-06", time: "10:00:00" },
    { place: "성수동 카페거리", date: "2026-10-06", time: "13:00:00" },
    { place: "뚝섬한강공원", date: "2026-10-06", time: "17:30:00" }
  ];

  return (
      <Container maxWidth="sm">
        <Box>
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
        </Box>
      </Container>
  );
}