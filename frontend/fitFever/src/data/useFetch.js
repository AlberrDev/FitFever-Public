import { useEffect, useState } from "react"
import axios from 'axios'


export const useFetch = (url) => {

  const [state,setState]=useState({
    data:null,
    isLoading:true
  })

  const getFetch=async()=>{

    setState ({
        ...state,
        isLoading:true,
    })

    const data=await axios.get(url);

    setState ({
        data,
        isLoading:false,
    })
  }
  
  useEffect(() => {
    getFetch();
      
  }, [url])


    
  return {
    data:state.data,
    isLoading:state.isLoading,

  }
}
