import styled from 'styled-components';
import { styles } from './styles';
import { Strings } from './strings';
import React from 'react';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { openModal } from '../../redux/features/modalSlice';
import AddOrEditReminderModal from '../modal/modal-forms/add-or-edit-reminder';
import { FetchNationalHolidays, FetchRemindersWithingYearSpan } from './query';
import { GetHolidaysLocalStorage } from '../../utils/localstorage/holidays';

const Today = new Date();
const MinDate = new Date();
const MaxDate = new Date();
MaxDate.setFullYear(new Date().getFullYear() + 1)

export type THolidays = {
  date:string;
  localName:string;
  name:string;
}

export type TRemindersData = {
  id:number;
  date:Date;
  name:string;
  about:string;
  time:string;
}

type TState = {
  value:Value;
  holidays:THolidays[];
  reminders :TRemindersData[];
}

const DefaultState:TState = {
  value:Today,
  holidays:[],
  reminders:[]
}

const CalendarMemories = () => {
  const [state, setState] = React.useState<TState>(DefaultState);

  const storageHolidaysData = GetHolidaysLocalStorage();

  const dispatch = useAppDispatch();
  const store = useAppSelector((st)=>st.modal);

  const isHoliday = (date: Date): boolean => {
    const dateString = format(date,'yyyy-MM-dd');
    return state.holidays.some(holiday => holiday.date === dateString);
  };

  const formatDay = (_locale: string | undefined, date: Date) => {
    const dateString = format(date,'yyyy-MM-dd');

    if (isHoliday(date)) {
      const holidayString = `${date.getDate()} - ${state.holidays.find((s)=>s.date === dateString)?.localName}`;
      return `${holidayString}`
    }

    return `${date.getDate()}`;
  };

  console.log({state});

  React.useEffect(()=>{
    FetchRemindersWithingYearSpan({
      onSuccess:(data)=>setState((prev)=>({...prev,reminders:data}))
    })

    if(!!storageHolidaysData.length){
      setState((prev)=>({...prev,holidays:storageHolidaysData || []}));
      return;
    }
   
    FetchNationalHolidays({
      onSuccess:(data)=> setState((prev)=>({...prev,holidays:data || []}))
    });
  },[])

  return (
    <CalendarContainer>
        <div className="title">{Strings.title}</div>
        <Calendar
         maxDetail='month'
         defaultView='month'
         onChange={(val:Value)=> {
          setState((prev)=>({...prev,value:val}));

          dispatch(openModal({modalType:"add", modalName:'reminder',content:<AddOrEditReminderModal/>, extraProps: { Date: val }}));
         }}
         value={state.value}
         className={"mCalendar"}
         defaultActiveStartDate={Today}
         maxDate={MaxDate}
         minDate={MinDate}
         formatDay={formatDay}
        />
    </CalendarContainer>
  )
}

export default CalendarMemories;

const CalendarContainer = styled.div`
   ${styles}
`