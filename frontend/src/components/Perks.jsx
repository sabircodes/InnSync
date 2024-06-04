import React from 'react'
import perks from '../constansts'

const Perks = ({selected , onChange}) => {

    function handlecheckBox(e){
        // alert(e.target.name);
        const {checked, name}=e.target;
        if(checked){
            onChange([...selected, name]);
           

        }else{
            onChange([...selected.filter(selectedName=>selectedName !== name)])

        }
        
    }


  return (
    <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-2 gap-4'>
    {perks.map((value, index) => (
        <div key={index} className='border py-2 px-4 shadow-sm flex items-center gap-2 rounded-lg  '>
            <input type="checkbox" checked={selected.includes(value.name)} name={value.name} onChange={handlecheckBox} />
            <div>{value.icon}</div>
            <div>{value.name}</div>
        </div>

    ))
    }
</div>
  )
}

export default Perks