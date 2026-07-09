import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

import 'dayjs/locale/ko.js';

export const KoreanLocaleDatePicker = ({label}) => {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
        <DatePicker label={label}></DatePicker>
      </LocalizationProvider>
  );
}