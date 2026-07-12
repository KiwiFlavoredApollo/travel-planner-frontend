import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export const TravelAreaSelect = ({ area, onChange }) => {
  const label = "지역";
  const areas = [
    { name: "전국", value: "all" },
    { name: "서울", value: "seoul" },
    { name: "부산", value: "busan" },
    { name: "대구", value: "daegu" },
    { name: "인천", value: "incheon" },
    { name: "광주", value: "gwangju" },
    { name: "대전", value: "daejeon" },
    { name: "울산", value: "ulsan" },
    { name: "세종", value: "sejong" },
    { name: "경기", value: "gyeonggi" },
    { name: "강원", value: "gangwon" },
    { name: "충북", value: "chungbuk" },
    { name: "충남", value: "chungnam" },
    { name: "전북", value: "jeonbuk" },
    { name: "전남", value: "jeonnam" },
    { name: "경북", value: "gyeongbuk" },
    { name: "경남", value: "gyeongnam" },
    { name: "제주", value: "jeju" }
  ];

  const label="지역";

  function handleSelectChange(event) {
    onChange(event.target.value);
  }

  return (
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select variant={"outlined"} label={label} value={area} onChange={handleSelectChange}>
          {
            areas.map((area, index) => (
                <MenuItem value={area.value} key={index}>{area.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
  );
}