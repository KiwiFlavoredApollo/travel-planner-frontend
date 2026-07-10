import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Box } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const KoreanDatePicker = ({ value, onChange, label = '날짜' }) => {
  const [date, setDate] = useState(value ? dayjs(value) : null);

  const handleChange = (newDate) => {
    setDate(newDate);
    if (onChange) {
      onChange(newDate ? newDate : null); // Pass dayjs object to parent if they expect format, or we can handle it
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Box sx={{ width: '100%' }}>
        <DatePicker
          label={label}
          value={date}
          onChange={handleChange}
          format="YYYY-MM-DD"
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
};
