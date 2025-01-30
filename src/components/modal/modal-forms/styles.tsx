import { css } from "styled-components";

export const CssStyles = css`
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
    overflow: hidden;
    width:100%;
    max-width:100%;
    gap:20px;
    >label{
      display:flex;
      flex-direction: column;
    }
  }
  .row_one{
    padding:20px 0 0 0;
  }
  .container_actions{
    display:flex;
    gap:10px;
    flex-direction: row-reverse;
    padding:20px 0 0 0;
  }
`