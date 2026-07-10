import {Card, CardContent, CardHeader, Chip, IconButton, Stack, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";

export const DestinationCard = ({
  keywords,
  onDelete,
  onRemoveKeyword,
  onAddKeyword
}) => {
  const [text, setText] = useState('');

  function handleEnterKeyDownEvent(event) {
    if (event.key !== 'Enter') return;
    if (text === '') return;
    onAddKeyword(text);
    setText('');
  }

  function handleTextFieldChange(event) {
    event.preventDefault();
    setText(event.target.value);
  }

  return (
      <Card>
        <CardHeader
            title="여행지"
            action={
              <IconButton onClick={() => onDelete()}>
                <DeleteIcon/>
              </IconButton>
            }
        ></CardHeader>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} sx={{ overflowX: "auto", height: "32px"}}>
              {
                keywords.map((keyword, keywordIndex) => (
                    <Chip
                        label={keyword}
                        key={keywordIndex}
                        onDelete={() => onRemoveKeyword(keywordIndex)}
                    ></Chip>
                ))
              }
            </Stack>
            <TextField
                label={"키워드"}
                value={text}
                onChange={handleTextFieldChange}
                onKeyDown={handleEnterKeyDownEvent}
            ></TextField>
          </Stack>
        </CardContent>
      </Card>
  );
}
