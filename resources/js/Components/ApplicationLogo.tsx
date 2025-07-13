import { SVGAttributes } from 'react';
import initialLogo from '@/../../resources/img/banner/admintoplogo.png';


export default function ApplicationLogo({...props}) {
    return (
        <>
           <img 
           {...props}
           style={{width:'200px', height:'70px', padding:'15px'}}
            
             src={initialLogo}
             alt=""
           /> 
        </>
    );
}
