'server-only'
import { LocalizationProvider, StaticDateRangePicker } from "@mui/x-date-pickers-pro"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import './styles.css'

export default function DaysToSellChart({ days }: {
    days: number
}){
    return(
      <div className='w-full flex flex-col items-center justify-center home-sidebar h-64'>
        <div className='text-lg text-center 3xl:text-xl font-bold -mb-[64px]' id='home-screen-days-chart'>
            Averaging <span className='text-cyan-600 font-bold'> {days ?? 1} </span> days to sell
            </div>
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
        >
            <StaticDateRangePicker
                value={[dayjs('2021-10-01'), dayjs(`2021-10-${days ?? 1}`)]}
                onChange={() => null}
                readOnly
                disableHighlightToday
                className='home-screen-days-chart'
            />
        </LocalizationProvider>
    </div>
    )
}