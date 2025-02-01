import dayjs from "dayjs";
import { NForms } from "../../../../types/forms";
import axios from "axios";
import { BACKEND_URL } from "../../../../utils/backend-constants";

type TData = {
    values:NForms.TReminders;
    id?:number;
    onSuccess:() => void;
    onError:()=>void;
}

export const HandleAddOrUpdateReminder = (props:TData) => {
    const {values,id,onSuccess,onError} = props;
    
    try{
        const timeInLocal = dayjs(values.time).tz("Europe/Vilnius").format("HH:mm");

        if(!id){
            axios.post(`${BACKEND_URL}/reminders`,
                {...values,time:timeInLocal})
                .then((_response)=>{
                  return onSuccess?.();
                })
                .catch(()=>{
                    onError?.();
                  
                });
        }

        if(id && id > 0){
            axios.post(`${BACKEND_URL}/reminders/${id}`,
                {...values,time:timeInLocal})
                .then((_response)=>{
                  return onSuccess?.();
                })
                .catch(()=>{
                    onError?.();
                });
        }
    } catch(err) {
        onError?.();
        console.error(`HandleAddOrUpdateReminder > error occurred!`);
    }
}