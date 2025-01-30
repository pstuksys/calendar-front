/**@Example 
 *    ${media.tablet}{
 *      background: red;
 *   }

 *   ${media.mobile}{
 *      background: orange;;
 *   }
 *   ${media.custom({min:300,max:400})}{
 *      background: black;
 *   }
*/

export const media = {
    large: `@media (min-width: 1251px)`,
    tablet: `@media (min-width: 769px) and (max-width: 1250px)`, 
    mobile: `@media (max-width: 768px)`,
    custom: (prop: {min:number, max:number}) => `@media (min-width: ${prop.min}px) and (max-width: ${prop.max}px)`,
  };