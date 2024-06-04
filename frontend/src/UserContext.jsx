import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, SetUser] = useState();
    const [ready, SetReady] = useState(false);
    useEffect( ()=>{
        if(!user){
         axios.get('/profile').then(
            ({data}) =>{
                SetUser(data);
                SetReady(true);
            
            }
           )
           

        }
    },[]);
    
    return (
        <UserContext.Provider value={{user, SetUser,ready}}>
        {children}
        </UserContext.Provider>
        
    )
}