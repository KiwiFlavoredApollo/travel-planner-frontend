import { Card, CardActionArea, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PlaceIcon from '@mui/icons-material/Place';

export const TravelPlanCard = ({ travelPlan, onClick, onDelete }) => {
  return (
      <Card>
        <CardActionArea onClick={onClick}>

          <CardHeader
              title={
                <Typography variant="h6">
                  {travelPlan.destinations[0].place}
                </Typography>
              }
              action={
                <IconButton onClick={onDelete}>
                  <DeleteIcon/>
                </IconButton>
              }
          ></CardHeader>

          <CardContent sx={{ paddingTop: 0 }}>
            <Stack direction="column" spacing={1}>

              <Stack direction={"row"} sx={{ alignItems: 'center' }}>
                <PlaceIcon sx={{ marginRight: 1 }}/>
                <Typography variant="body2">
                  {travelPlan.area}
                </Typography>
              </Stack>

              <Stack direction={"row"} sx={{ alignItems: "center" }}>
                <DateRangeIcon sx={{ marginRight: 1 }}/>
                <Typography variant="body2">
                  {travelPlan.startDate} - {travelPlan.endDate}
                </Typography>
              </Stack>

            </Stack>
          </CardContent>

        </CardActionArea>
      </Card>
  );
}