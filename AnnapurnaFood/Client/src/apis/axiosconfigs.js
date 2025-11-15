import axios from 'axios'
import React from 'react'

const instance = axios.create({ baseURL: "http://localhost:2000", });
instance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        
         console.log("API Error:", error);
          return Promise.reject(error) ;
    }
)



export default instance;