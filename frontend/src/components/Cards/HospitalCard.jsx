import React, { useCallback, useState, useEffect } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useContractCall } from "../../hooks/useContractRead";
import { truuncateAddress } from "../../utils";
import { FaCopy } from "react-icons/fa";
const HospitalCard = ({ id, setError, setLoading, clear }) => {
  const { address } = useAccount();
  // to read the data from the contract
  const { data: getHospitalInfo } = useContractCall(
    "getHospitalInfo",
    [id],
    true
  );

  const [hospital, setHospital] = useState(null);
  const [copyAddress, setCopyAddress] = useState('')

  const { openConnectModal } = useConnectModal();

  const gethospitalData = useCallback(() => {
    if (!getHospitalInfo) return null;

    setHospital({
      name: getHospitalInfo[0],
      imagehos: getHospitalInfo[1],
      locationBar: getHospitalInfo[2],
      hospitalType: getHospitalInfo[3],
      walletAddress: getHospitalInfo[4],
    });
  }, [getHospitalInfo]);

  useEffect(() => {
    gethospitalData();
  }, [gethospitalData]);

  if (!hospital) return null;

  const handleCopy = (copyAdd) => {
    setCopyAddress(copyAdd);
    navigator.clipboard.writeText(`${copyAdd}`);

  }
  return (
    <div className=" w-96 bg-[#EFAE07] text-base font-semibold rounded-xl">
      <img src={hospital.imagehos} alt="" className="" />
      <div className=" flex flex-col items-center justify-center pt-3">
        <div className=" flex flex-row gap-8 text-center">
          <span>
            <p className=" rounded-md border-1 border cursor-pointer bg-white">
              Name
            </p>
            <p className="pt-2">{hospital.name}</p>
          </span>
          <span>
            <p className="rounded-md border-1 border cursor-pointer bg-white">
              Location
            </p>
            <p  className="pt-2">{hospital.locationBar}</p>
          </span>
        </div>
        <div className=" text-center mt-4 flex flex-row gap-9 pb-5">
          <div>
            <p className="rounded-md border-1 border cursor-pointer bg-white">
              Hospital
            </p>
            <p  className="pt-2">{hospital.hospitalType}</p>
          </div>
          <div>
            <p className="rounded-md border-1 border cursor-pointer bg-white">
              Address
            </p>
            <span  className=" cursor-pointer flex flex-row justify-center items-center pt-2" onClick={() => handleCopy(hospital.walletAddress)}>
            <FaCopy width={24} height={24} />
            <p>
              {truuncateAddress(hospital.walletAddress)}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
