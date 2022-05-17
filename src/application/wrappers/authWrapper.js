import useAuth from "../hooks/useAuth";
import Router, { useRouter } from "next/router";
import { professorRoutes} from '../routing/routes'

import { useEffect, useState } from 'react'



const roles = {ADMIN: "admin", TEACHER: "teacher"};



export function AuthWrapper({children}) {
    const [isAuthenticated, setIsAuthenticate]  = useState(false);
    const [hasPermission, setHasPermission]  = useState(false);
    const [localStorageItems, setLocalStorageItems]  = useState({});
    const [wasRefreshed, setwasRefreshed] = useState(false);

    const route = useRouter();
    const currentRoute = route.pathname

    useEffect(() => {
        if (!wasRefreshed)
        {
            setLocalStorageItems({token:localStorage.getItem("access_token"),
                                  role:localStorage.getItem("role"),
                                  expiration: parseInt(localStorage.getItem("exp"))});
            setwasRefreshed(true)
        }       
       
        if(localStorageItems?.token){                       
            if(localStorageItems?.expiration < (Date.now() / 1000)){
                localStorage.clear() 
                return;               
            }
            else{
                setIsAuthenticate(true)

                switch(localStorageItems.role){
                    case roles.ADMIN: setHasPermission(true); break;
                    case roles.TEACHER: professorRoutes.includes(currentRoute)? setHasPermission(true): ''; break;                     
                    default:
                        setHasPermission(false)
                }

                                  
            }
        }   
        
    },[wasRefreshed]);

   return  isAuthenticated && hasPermission? children: <></>;


}