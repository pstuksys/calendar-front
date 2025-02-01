import * as Yup from 'yup';
import { NForms, TCustomShape } from '../../../../types/forms';
import { Strings } from './strings';
import { Dayjs } from 'dayjs';


const dayjsSchema = Yup.mixed<Dayjs>()
  .test('is-dayjs', 'Invalid time format', (value) => value instanceof Object && (value as Dayjs).isValid())
  .required(Strings.requiredField);

export const ValidationSchema = Yup.object().shape<TCustomShape<NForms.TReminders>>({
    name:Yup.string().trim().required(Strings.requiredField),
    about:Yup.string().trim().required(Strings.requiredField),
    date: Yup.date().nullable(),
    time:dayjsSchema
});