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
import { CircularProgress } from '@mui/material';
import React from 'react';

const DefaultValues:NForms.TReminders = {
  about:'',
  name:'',
  date:null,
  time:null
}

const AddOrEditReminderModal = () => {
  const store = useAppSelector((st)=>st.modal);
  const dispatch = useAppDispatch();

  const selectedDate = store.extraProps as {Date:Date};

  console.log({store})

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
    // might consider adding useState for loading if the api implementation wont cause spinning.
    console.log('submited',values);
    handleClose()
  });

  React.useEffect(()=>{
    if(selectedDate.Date){
      form.reset({
        ...DefaultValues,
        date:selectedDate.Date
      })
    }
  },[selectedDate.Date])



  return (
    <FormContainer id="AddOrEditReminderModal"
    onSubmit={handleSubmit}
       >
        <div className="container">
          <div className="modal_title">
            {title}
          </div>
          
          <div className="row">
             <Controller 
                control={form.control}
                name='name'
                render={({field,formState})=>{
                  return(
                    <TextField
                      {...field}
                      id="name"
                      label={`${Strings.name}*`}
                      error={!!formState.errors.name?.message}
                      helperText={!!formState.errors.name?.message ? formState.errors.name?.message : ""}
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
                        {...field}
                        id="about"
                        label={`${Strings.about}*`}
                        error={!!formState.errors.about?.message}
                        type='text'
                        multiline
                        helperText={!!formState.errors.about?.message ? formState.errors.about?.message : ""}
                      />
                    )
                  }}
                />
          </div>
        </div>

        <div className="row row_one">
          <Controller
            control={form.control}
            name='time'
            render={({field,formState})=>{
              return (
                <CustomTimePicker 
                  {...field}
                   onChange={(val)=>{field.onChange(val)}}
                   errorMsg={formState.errors.time?.message}
                   minTime={{hours:0,minutes:15}} 
                   maxTime={{hours:24,minutes:0}}
                   interval={1}
                   title={`${Strings.time}*`}
                 />
              )
            }}
            />
        </div>

        <div className="container_actions">
          <Button startIcon={form.formState.isLoading ? <CircularProgress size={20} /> : null} type='submit' disabled={!form.formState.isDirty || form.formState.isLoading}>
           {form.formState.isLoading ? '' : Strings.btnSubmit} 
          </Button>

          <Button disabled={form.formState.isSubmitting} color='secondary' type='button' onClick={handleClose}>
            {Strings.btnClose}
          </Button>
        </div>
    </FormContainer>
  )
}

export default AddOrEditReminderModal

const FormContainer = styled.form`
  ${CssStyles}
`