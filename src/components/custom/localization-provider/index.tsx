import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/lt';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CustomLocalizationProvider  = (props:{children: React.ReactNode}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="lt">
      {props.children}
    </LocalizationProvider>
  )
}

export default CustomLocalizationProvider 