import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { closeModal } from '../../../../redux/features/modalSlice';
import styled from 'styled-components';
import { Strings } from './strings';
import CustomTimePicker from '../../../custom/time-picker';
import { CssStyles } from '../styles';

const AddOrEditReminderModal = () => {
  const store = useAppSelector((st)=>st.modal);
  const dispatch = useAppDispatch();

  const title = store.modalType === 'add' ? Strings.addTitle : Strings.editTitle;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = () => {
    console.log('submited');
  };

  return (
    <FormContainer id="AddOrEditReminderModal" onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
        <div className="container">
          <div className="modal_title">
            {title}
          </div>
          
          <div className="row">
            <label htmlFor='name'>{Strings.name}
              <input type='text' id='name' />
            </label>
          </div>

          <div className="row">
            <label htmlFor='about'>{Strings.about}
              <input type='text' id='about' />
            </label>
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
          <button type='submit'>{Strings.btnSubmit}</button>
          <button type='button' onClick={handleClose}>{Strings.btnClose}</button>
        </div>
    </FormContainer>
  )
}

export default AddOrEditReminderModal

const FormContainer = styled.form`
  ${CssStyles}
`