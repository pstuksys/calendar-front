import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IModalState extends OpenModalPayload{
    isOpen:boolean;
}

/**@info add your modal name here */
export interface OpenModalPayload {
    modalType: "add" | "edit" | "delete" | "view" | null;
    modalName: "reminder" | null;
    formId?:number | null;
    content: React.ReactNode;
  }

const initialState: IModalState = {
    isOpen: false,
    modalType: null,
    modalName:null,
    formId:null,
    content:null
  };

const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
    openModal: (
        state,
        action: PayloadAction<OpenModalPayload>
      ) => {
        const { modalType, modalName,formId,content } = action.payload;
        state.isOpen = true;
        state.modalType = modalType;
        state.modalName = modalName;
        state.formId = formId,
        state.content = content
      },
      closeModal: (state) => {
        state.isOpen = false;
        state.modalType = null;
        state.modalName = null;
        state.formId = null;
        state.content = null
      },
    }
});  

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;