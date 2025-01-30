import styled from 'styled-components';
import { styles } from './styles';
import { Strings } from './strings';
import React from 'react';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { BACKEND_URL } from '../../utilities/backend-constants';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { openModal } from '../../redux/features/modalSlice';
import AddOrEditReminderModal from '../modal/modal-forms/add-or-edit-reminder';

const Today = new Date();
const MinDate = new Date();
const MaxDate = new Date();
MaxDate.setFullYear(new Date().getFullYear() + 1)

type THolidays = {
  date:string;
  localName:string;
  name:string;
}

type TState = {
  value:Value;
  holidays:THolidays[];
}

const DefaultState = {
  value:Today, holidays:[]
}

const CalendarMemories = () => {
  const [state, setState] = React.useState<TState>(DefaultState);

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

  React.useEffect(()=>{
    axios.get(`${BACKEND_URL}/holidays`)
    .then((response) => {
      const data = (response.data as THolidays[] || []).map<THolidays>((x)=>{
        return {
          date:x.date,
          localName:x.localName,
          name:x.name
        }
      });

      setState((prev)=>({...prev,holidays:data || null}))
    }).catch(()=>{})
  },[])

  return (
    <CalendarContainer>
        <div className="title">{Strings.title}</div>
        <Calendar
         onChange={(val:Value)=> {
          setState((prev)=>({...prev,value:val}));

          dispatch(openModal({modalType:"add", modalName:'reminder',content:<AddOrEditReminderModal/>}));
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