import React, { useState } from "react";
import HospitalCard from "../Cards/HospitalCard";
import { useContractCall } from "../../hooks/useContractRead";

const HospitalList = () => {
  const { data } = useContractCall("getHospitalCount", [], true);

  const hospitalLength = data ? Number(data.toString()) : 0;

  const getHospitalLength = () => {
    if (!hospitalLength) return null;

    const registerPartner = [];

    for (let i = 0; i < hospitalLength; i++){
      registerPartner.push(
        <HospitalCard key={i} id={i} />
      )
    }
    return registerPartner;
  };
  return (
    <div>
      <div className=' mx-auto max-w-4xl py-5 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {getHospitalLength()}
          </div>
      </div>
    </div>
  );
};

export default HospitalList;
