import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import CustomModal from '..';
import { closeModal } from '../../../redux/features/modalSlice';

const AddOrEditReminderModal = () => {
  const store = useAppSelector((st)=>st.modal);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <CustomModal 
      isOpen={store.isOpen && store.modalName === 'reminder'}
      onClose={handleClose}
     >
        <div>testas</div>
      </CustomModal>
  )
}

export default AddOrEditReminderModal