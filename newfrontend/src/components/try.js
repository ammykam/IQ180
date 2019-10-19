import React  from 'react';
import { useState } from 'react';

function Try(){
    const[name, setName] = useState({firstName:'', lastName:''});
    return(
        <div>
           <form>
               <input type="text" value={name.firstName} onChange={e => setName({firstName: e.target.value})}></input>
               <input type="text" value={name.lastName} onChange={e => setName({lasttName: e.target.value})}></input>

               <h2>your first -{name.firstName}</h2>
               <h2>your last -{name.lastName}</h2>
            </form> 
        </div>
    )
}
export default Try