import React, { useEffect, useState } from "react";
import { SeekerHome } from './SeekerHome'
import { EmployerHome } from './EmployerHome'

export const Home = props => {
  const [ userType, setUserType ] = useState()

  useEffect(() => {
    const userType = localStorage.getItem("seekr")
    setUserType(userType)
  }, [])


  return (
    <>
     { userType === 'true'
      ? <SeekerHome />
      : <EmployerHome />
     }
    </>
  )
} 
