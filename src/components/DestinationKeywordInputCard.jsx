import {Box, Card, CardContent, CardHeader, Chip, IconButton, Stack, TextField, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export const DestinationKeywordInputCard = ({keywords, onDeleteDestination, onDeleteKeyword, onAddKeyword}) => {
  return (
      <Card>
        <CardHeader
            title={"여행지"}
            action={
              <IconButton
                  onClick={onDeleteDestination}
              >
                <DeleteIcon/>
              </IconButton>
            }
        ></CardHeader>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              {
                keywords.map((keyword, index) => (
                    <Chip label={keyword} key={index} onDelete={onDeleteKeyword}></Chip>
                ))
              }
            </Box>
            <TextField label={"키워드"}></TextField>
          </Stack>
        </CardContent>
      </Card>
  );
}