import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {useState} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { TimePicker } from "@mui/x-date-pickers";

export const KoreanTimePicker = ({value, label, onChange}) => {
  const [time, setTime] = useState(value ? dayjs(value, "HH:mm").locale("ko") : null);

  const handleTimeChange = (newTime) => {
    setTime(newTime);

    if (onChange) {
      onChange(newTime ? newTime : null);
    }
  };

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
        <TimePicker
            label={label}
            value={time}
            onChange={handleTimeChange}
            format="HH:mm"
        />
      </LocalizationProvider>
  );
}