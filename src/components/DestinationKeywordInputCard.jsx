import {Box, Card, Chip, Stack, TextField, Typography} from "@mui/material";

export const DestinationKeywordInputCard = ({keywords}) => {
  return (
      <Card
          sx={{
            padding: 2
          }}
      >
        <Stack spacing={2}>
          <Typography variant={"h5"}>여행지</Typography>
          <Box>
            {
              keywords.map((keyword, index) => (
                  <Chip label={keyword} onDelete={() => {}}></Chip>
              ))
            }
          </Box>
          <TextField label={"키워드"}></TextField>
        </Stack>
      </Card>
  );
}