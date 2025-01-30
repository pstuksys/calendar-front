import styled from "styled-components";
import { media } from "./media";

export const Container = styled.div`
    width:100%;
    max-width:100%;
    height:100vh;
    background: #fff;
    padding:20px 20px;
    font-family: Roboto;

     ${media.tablet}{
        padding:20px 15px;
     }

     ${media.mobile}{
        padding:20px 10px;
     }
    
`