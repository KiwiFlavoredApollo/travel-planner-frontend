import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {useState} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const KoreanDatePicker = ({value, label, disablePast, onChange}) => {
  const [date, setDate] = useState(value ? dayjs(value).locale("ko") : null);

  const handleDateChange = (newDate) => {
    setDate(newDate);

    if (onChange) {
      onChange(newDate ? newDate : null);
    }
  };

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
        <DatePicker
            label={label}
            value={date}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            disablePast={disablePast}
        />
      </LocalizationProvider>
  );
}