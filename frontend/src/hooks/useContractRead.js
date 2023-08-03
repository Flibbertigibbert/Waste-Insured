import { useContractRead } from "wagmi";
import WasteinsuredAbi from '../abi/wasteInsured.json'

export const useContractCall = (functionName, args, watch) => {

    const resp = useContractRead({

        address: WasteinsuredAbi.address,
        abi: WasteinsuredAbi.abi,
        functionName: functionName,
        args,
        watch,
        onError: (err) => {
            console.log({ err })
        }

    })
    
    return resp
}