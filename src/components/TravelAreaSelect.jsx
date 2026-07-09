import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export const TravelAreaSelect = () => {
  const areas = [
    {
      name: "전국",
      value: "all"
    },
    {
      name: "서울",
      value: "seoul"
    },
    {
      name: "경기",
      value: "gyeonggi"
    },
    {
      name: "강원",
      value: "gangwon"
    }
  ];

  return (
      <FormControl>
        <InputLabel>지역</InputLabel>
        <Select variant={"outlined"}>
          {
            areas.map((area, index) => (
                <MenuItem value={area.value}>{area.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
  );
}