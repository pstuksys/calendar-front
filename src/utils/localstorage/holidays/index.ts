import { THolidays } from "../../../components/calendar-memories";
import { LOCALSTORAGE_HOLIDAYS } from "../../app-constants";

export const SetHolidaysLocalStorage = (data:THolidays[]) =>{
    localStorage.setItem(LOCALSTORAGE_HOLIDAYS, JSON.stringify(data));
}

export const GetHolidaysLocalStorage = () => {
  const data = localStorage.getItem(LOCALSTORAGE_HOLIDAYS);
  return data ? JSON.parse(data) as THolidays[] : []
}

export const ClearHolidaysLocalStorage = () =>{
    localStorage.removeItem(LOCALSTORAGE_HOLIDAYS);
}