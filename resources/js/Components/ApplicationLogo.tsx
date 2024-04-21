import { SVGAttributes } from 'react';
import initialLogo from '@/../../resources/img/initialLogo.png';


export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
 
           <img {...props}
           style={{width:'200px', height:'100px'}}
            
             src={initialLogo}
             alt=""
           />
    );
}
