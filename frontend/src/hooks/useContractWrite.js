import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import WasteInsuredAbi from '../abi/wasteInsured.json';
import { BigNumber } from 'ethers';


export const useContractSendWrite = (functionName, args) => {
    // gas limit to use when sending transaction

    const gasLimit = BigNumber.from(1000000)

    const {config} = usePrepareContractWrite({
        // the address of the waste contract
        address: WasteInsuredAbi.address,
        // the abi of the contract of the waste
        abi: WasteInsuredAbi.abi,
        functionName: functionName,
        args,
        overrides: {
            gasLimit
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const {data, isSuccess, write, writeAsync, error, isLoading} = useContractWrite(config)
    return { data, isSuccess, write, writeAsync, isLoading}
}