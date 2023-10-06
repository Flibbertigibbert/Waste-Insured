import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useContractSend } from "../../hooks/useContractWrite";
import ERC20 from "../../abi/erc20InstacnceAbi.json";

const AddHospitalModal = () => {

  const router = useNavigate()
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState('')
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [Location, setLocation] = useState("");
  const [hospitalType, setHospitalType] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const isFormFilled =
    name && image && Location && hospitalType && walletAddress;

  const handleClear = () => {
    setName("");
    setImage("");
    setLocation("");
    setHospitalType("");
    setWalletAddress("");
  };

  const [ debounceName ] = useDebounce(name, 500)
  const [ debounceImage ] = useDebounce(image, 500)
  const [ debounceLocation ] = useDebounce(Location, 500)
  const [ debouncehospitalType ] = useDebounce(hospitalType, 500)
  const [ debouncewalletAdd ] = useDebounce(walletAddress, 500)

  const { writeAsync: registerHospital} = useContractSend('registerPartnerHospital', [
    debounceName,
    debounceImage,
    debounceLocation,
    debouncehospitalType,
    debouncewalletAdd
  ])


  const handleHopital = async () => {
    if(!registerHospital) {
      throw "Failed To Record Waste"
    }
    setLoading("Registering")
    if(!isFormFilled) {
      toast.warn("Please fill the correct details")
      throw new Error("Please fill the correct details")
    }

    const transactTx = await registerHospital();
    setLoading("waiting for comfirmation")
    toast.loading("Waiting for comfirmation")

    await transactTx

    setToggle(false)
    handleClear()
      
  }

  const addHospital = async (e) => {
    e.preventDefault()

    try {
      await toast.promise(
        handleHopital(),
        {
          pending: "Registering Hospital",
          success: " Register partner succesfully",
          error: "Error registering the partner, You must be a waste-Insured Admin, "
        }
      )
    } catch (e) {
      console.log({ e });
      toast.error(e?.message || "Something went wrong. Contact the Admin")
    }

    router("/hospital")

  }
  return (
    <div className="flex mb-10">
      <button
        id="modalBioDate"
        type="button"
        data-bs-toggle="modalBioData"
        data-bs-target="#modalCenter"
        className=" text-white font-bold text-lg border-2 rounded-xl py-1 bg-[#06102b] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl"
        onClick={() => setToggle(true)}
      >
        Add Hospital
      </button>
      {toggle && (
        // w-[600px] rounded-2xl bg-slate-100 p-5
        <div
          id="modalBioData"
          className="flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6"
        >
          <div className="w-[600px] rounded-2xl bg-slate-100 p-5">
            <form onSubmit={addHospital}>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="hospital"
                  id="hospital"
                  placeholder="Hospital Name"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setImage(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="hospital Image"
                  id="hospital"
                  placeholder="Hospital Image"
                />
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="hospitalLocation"
                  id="hospitalLocation"
                  placeholder="Hospital Location"
                />
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setHospitalType(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="hospitalType"
                  id="hospital"
                  placeholder="Health Care or General Hospital"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="wallet"
                  id="wallet"
                  placeholder="Wallet Address"
                />
              </div>
              <div className=" flex justify-between">
                <button
                  type="submit"
                  className=" border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full"
                  disabled={!!loading || !isFormFilled || !registerHospital}
                >
                  {loading ? loading : "Register partner"}
                </button>
                <button type="button" onClick={() => setToggle(false)}>
                  <IoCloseCircle size={30} color="#06102b" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddHospitalModal;
