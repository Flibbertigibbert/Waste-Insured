import { useContractRead } from "wagmi";
import WasteinsuredAbi from '../abi/wasteInsured.json'

export const useContractCallRead = (functionName, args, watch, from) => {
    const resp = useContractRead({
        address: WasteinsuredAbi.address,
        abi: WasteinsuredAbi.abi,
        functionName: functionName,
        args,
        watch,
        overrides: from,
        onError: (err) => {
            console.log({ err })
        }
    })

    return resp
}