import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { closeModal } from '../../../../redux/features/modalSlice';
import styled from 'styled-components';
import { Strings } from './strings';
import CustomTimePicker from '../../../custom/time-picker';
import { CssStyles } from '../styles';
import { Controller, useForm } from 'react-hook-form';
import { NForms } from '../../../../types/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationSchema } from './validation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const DefaultValues:NForms.TReminders = {
  about:'',
  name:'',
  date:null,
  time:null
  // date:dayjs().toDate(),
  // time:dayjs()
}

const AddOrEditReminderModal = () => {
  const store = useAppSelector((st)=>st.modal);
  const dispatch = useAppDispatch();

  const title = store.modalType === 'add' ? Strings.addTitle : Strings.editTitle;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const form = useForm<NForms.TReminders>({
    defaultValues:DefaultValues,
    mode:'onSubmit',
    reValidateMode:'onChange',
    resolver: yupResolver(ValidationSchema) as any
  })

  const handleSubmit = form.handleSubmit((values)=>{
    console.log('submited',values);
  });


  console.log({errors:form.formState.errors});

  return (
    <FormContainer id="AddOrEditReminderModal"
    onSubmit={handleSubmit}
       >
        <div className="container">
          <div className="modal_title">
            {title}
          </div>
          
          <div className="row">
            {/* <label htmlFor='name'>{Strings.name}
              <Controller 
                control={form.control}
                name='name'
                render={({field,formState})=>{
                  console.log({field,formState});
                  return(
                    <Input title={Strings.name} type='text' id='name' {...field} />
                  )
                }}
              />
            </label> */}
             <Controller 
                control={form.control}
                name='name'
                render={({field,formState})=>{
                  return(
                    <TextField
                      // required
                      {...field}
                      id="name"
                      label={Strings.name}
                      defaultValue={Strings.name}
                      error={!!formState.errors.name?.message}
                      type='text'
                    />
                  )
                }}
              />
          </div>
          
          <div className="row">
            <Controller 
                  control={form.control}
                  name='about'
                  render={({field,formState})=>{
                    return(
                      <TextField
                        // required
                        {...field}
                        id="about"
                        label={Strings.about}
                        defaultValue={Strings.about}
                        error={!!formState.errors.about?.message}
                        type='text'
                        multiline
                        onError={()=>(<div>testas</div>)}
                      />
                      // <Input multiline title={Strings.about} type='text' id='about' {...field} error={!!formState.errors.about?.message} placeholder={Strings.about} />
                    )
                  }}
                />
            {/* <label htmlFor='about'>{Strings.about}
              <Input multiline={true} type='text' id='about' />
            </label> */}
          </div>
        </div>

        <div className="row row_one">
         <CustomTimePicker 
            onChange={(val)=>{console.log(val)}}
            // onError={(err)=>setState((prev)=>({...prev,error:err}))}
            minTime={{hours:0,minutes:15}} 
            maxTime={{hours:24,minutes:0}}
            interval={1}
            title='Laikas'
   />
        </div>

        <div className="container_actions">
          <Button type='submit' disabled={!form.formState.isDirty} >{Strings.btnSubmit}</Button>
          <Button disabled={form.formState.isSubmitting} color='secondary' type='button' onClick={handleClose}>{Strings.btnClose}</Button>
        </div>
    </FormContainer>
  )
}

export default AddOrEditReminderModal

const FormContainer = styled.form`
  ${CssStyles}
`