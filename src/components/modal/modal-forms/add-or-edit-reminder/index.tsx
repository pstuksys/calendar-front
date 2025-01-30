import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { closeModal } from '../../../../redux/features/modalSlice';
import styled from 'styled-components';
import { Strings } from './strings';

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

        <div className="container_actions">
          <button type='button' onClick={handleClose}>{Strings.btnClose}</button>
          <button type='submit'>{Strings.btnSubmit}</button>
        </div>
    </FormContainer>
  )
}

export default AddOrEditReminderModal

const FormContainer = styled.form`
  width:350px;
  max-width:100%;
  overflow: hidden;
  .container{
    width:100%;
    max-width:100%;
    display: flex;
    flex-direction: column;
  }
  .modal_title {
    padding:0 0 20px 0;
    display: flex;
    font:25px/28px bold Roboto;
    align-items: center;
    justify-content: center;
  }
  .row{
    width:100%;
    max-width:100%;
    gap:20px;
    >label{
      display:flex;
      flex-direction: column;
    }
  }
  .container_actions{
    display:flex;
    gap:10px;
    flex-direction: row-reverse;
  }
`