import React, { useEffect, useState } from 'react';
import { SeekerHome } from './SeekerHome';
import { EmployerHome } from './EmployerHome';

export const Home = (props) => {
  const [userType, setUserType] = useState();

  useEffect(() => {
    const isSeekr = localStorage.getItem('seekr');
    setUserType(isSeekr);
  }, []);

  return (
    <>
     { userType === 'true'
       ? <SeekerHome />
       : <EmployerHome />
     }
    </>
  );
};
