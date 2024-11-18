import React from 'react'
import { Link,useNavigate } from 'react-router-dom';

const Nextbtn = () => {
    const navigate=useNavigate();
    const handleclick=()=>{
        navigate('/products');
    }
    return (
        <div>
        
    <button onClick={handleclick} className="flex w-[170px] h-auto bg-[#1d2129] rounded-[40px] shadow-lg justify-between items-center border-none cursor-pointer mt-5">
      <span className="w-[calc(170px-45px)] h-full flex items-center justify-center text-white text-lg tracking-wide">
        Guest Mode
      </span>
      <span className="w-[45px] h-[45px] bg-[#f59aff] flex items-center justify-center rounded-full border-[3px] border-[#1d2129]">
        <svg
          width="16"
          height="19"
          viewBox="0 0 16 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-1500 ease-linear"
        >
          <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
          <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
          <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
          <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
          <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
          <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
          <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
          <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
          <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
          <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
        </svg>
      </span>
    </button>
  
        </div>
    )
        
}
export default Nextbtn;