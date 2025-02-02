import axios from "axios";
import { BACKEND_URL } from "../../utils/backend-constants";
import { THolidays, TRemindersData } from ".";
import { SetHolidaysLocalStorage } from "../../utils/localstorage/holidays";

type TFetchNationalHolidays = {
    onSuccess?:(data:THolidays[])=>void;
    onError?:()=>void;
}

export const FetchNationalHolidays = async (props:TFetchNationalHolidays) =>{
    try {
        const response = await axios.get(`${BACKEND_URL}/holidays`);

        const data = ((response.data as THolidays[]) || []).map<THolidays>((x) => ({
          date: x.date,
          localName: x.localName,
          name: x.name
        }));
        
        SetHolidaysLocalStorage(data);
        props?.onSuccess?.(data);
      } catch (error:any) {
        props?.onError?.();
      }
}

type TFetchReminders = {
    onSuccess?:(data:TRemindersData[])=>void;
    onError?:()=>void;
}

export const FetchRemindersWithingYearSpan = async (props:TFetchReminders) =>{
    try{
        const response = await axios.get(`${BACKEND_URL}/reminders/active`);
        
        props?.onSuccess?.(response.data.data as TRemindersData[]);
    }catch(error:any){
        props?.onError?.();
    }
}