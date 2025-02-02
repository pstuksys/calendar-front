import  { css } from "styled-components";

export const styles = css`
    width:100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    .title{
        display: flex;
        align-items: center;
        justify-content: center;
        font:31px/35px Roboto ;
        padding: 0 0 20px 0;
    }

    /* calendar custom styling */
    .react-calendar{
        width:100%;
        height: 100%;
        font-family: Roboto;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border: none;
        
    }
    .react-calendar__navigation{
        >button{
            >span{
                font-family: Roboto;
                font-weight: bold;
            }
        }
    }
    .react-calendar__tile:disabled,
    .react-calendar__navigation button:disabled{
        cursor: not-allowed;
    }
    /* Today */
    .react-calendar__tile--now {
        background: #00FFFF;
    }
    /* Days */
    .react-calendar__month-view__days{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        width: 100%;
        background: #fff;
        :hover{
            background: #7CB9E8;
            color:#fff;
        }
        >button{
            flex: 1 0 calc(99% / 7);
            aspect-ratio: 1 / 0.8;
        }
    }

    .react-calendar__navigation{
        .react-calendar__navigation__next2-button:not(:disabled):hover,
        .react-calendar__navigation__prev2-button:not(:disabled):hover,
        .react-calendar__navigation__prev-button:not(:disabled):hover,
        .react-calendar__navigation__next-button:not(:disabled):hover  {
            background: #7CB9E8;
            color:#fff;
        }
    }
    /* comment this out for navigation through years/decades */
    .react-calendar__navigation__label{
        pointer-events: none
    }

`