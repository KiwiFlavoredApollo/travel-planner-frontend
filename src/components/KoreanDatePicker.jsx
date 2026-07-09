import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

import 'dayjs/locale/ko.js';
import dayjs from "dayjs";

export const KoreanDatePicker = ({label}) => {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
        <DatePicker label={label} defaultValue={dayjs()}></DatePicker>
      </LocalizationProvider>
  );
}