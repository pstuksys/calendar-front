import { Dayjs } from "dayjs";
import * as Yup from 'yup';


// export  type CustomObjectShape<T> = {
//     [key in keyof T]: T[key] extends string
//     ? Yup.StringSchema
//     : T[key] extends number
//     ? Yup.NumberSchema
//     : T[key] extends Date
//     ? Yup.DateSchema
//     : T[key] extends Array<any>
//     ? Yup.ArraySchema<any,any>
//     : T[key] extends boolean
//     ? Yup.BooleanSchema
//     : T[key] extends object
//     ? Yup.ObjectSchema<any>
//     : any;
//   };

/**@info : https://dev.to/jpoehnelt/strongly-typed-yup-schema-in-typescript-15bc */
export type CustomObjectShape<T> = T extends string
  ? Yup.StringSchema
  : T extends number
  ? Yup.NumberSchema
  : T extends boolean
  ? Yup.BooleanSchema
  : T extends Record<any, any>
  ? Yup.AnyObjectSchema
  : T extends Array<any>
  ? Yup.ArraySchema<any, any>
  : Yup.AnySchema;

export type TCustomShape<Fields> = {
  [Key in keyof Fields]: CustomObjectShape<Fields[Key]>;
};
  
  

  /**@info for yup validation always use TCustomShape and put your generic form: CustomObjectShape<TForm> */
export namespace NForms {
    export type TReminders = {
        name:string;
        about:string;
        date:Date | null;
        time:Dayjs | null;
    }
}