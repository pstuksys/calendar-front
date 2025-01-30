import {  createTheme, Theme, ThemeProvider } from "@mui/material";
import { SxProps } from "@mui/system";
import { TimePicker, TimeValidationError } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs";
import styled from "styled-components"

export namespace NMuiProps {
  export type props =  {
    minTime?:TTime;
    maxTime?:TTime;
    defaultValue?:Dayjs | null;
    onChange:(val:Dayjs | null) => void;
    onClose?:()=>void;
    onError?:(error:TimeValidationError | null)=>void;
    customStyleProps?:SxProps<Theme>;
    interval?:number;
    value?:Dayjs | null;
    /**@default false */
    isDisabled?:boolean;
    errorMsg?:string;
    title?:string;
  }

  type TTime = {
    hours:number;
    minutes:number;
  }
  
}

/**@info couldn't change via `sx` prop so had to create theme to override it. */
const theme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            display: "none", 
          },
        },
      },
    },
  }
});

/**@Example 
 * <CustomTimePicker 
 *   onChange={(val)=>{setState((prev)=>({...prev,time:val}))}}
 *   onError={(err)=>setState((prev)=>({...prev,error:err}))}
 *   minTime={{hours:0,minutes:15}} 
 *   maxTime={{hours:24,minutes:0}}
 *  />
 */
const CustomTimePicker = (props:NMuiProps.props) => {
  const {
    minTime,
    maxTime,
    isDisabled=false,
    defaultValue = null,
    onChange,onClose,onError,
    customStyleProps,
    interval=15,
    value=null,
    errorMsg,
    title
    } = props;

  const startTime=dayjs().hour(minTime?.hours || 0).minute(minTime?.minutes || 0);
  const endTime = dayjs().hour(maxTime?.hours || 24).minute(maxTime?.hours || 0)


  return (
    <Container>
      <ThemeProvider theme={theme}>
        <TimePicker label={title || "Basic time picker"} 
          defaultValue={defaultValue}
          disableIgnoringDatePartForTimeValidation
          ampm={false} 
          minTime={startTime} 
          maxTime={endTime} 
          onChange={(e)=> onChange(e)}
          value={value}
          onClose={onClose}
          onError={(error)=> onError?.(error)}
          disabled={isDisabled}
          sx={{
            ...customStyleProps
        }}
          minutesStep={interval}
         />
         {errorMsg ? <div className="errMsg">{errorMsg}</div> : null}
      </ThemeProvider>

    </Container>
  )
}


export default CustomTimePicker

const Container = styled.div`
  /*  */
`