import { useSendTransaction, usePrepareSendTransaction } from "wagmi";

export const useSendTrans = ( sendTo, sendValue) => {

    const { config } = usePrepareSendTransaction({
        to: sendTo,
        value: sendValue
    })

    const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config)
    return {data, isLoading, isSuccess, sendTransaction}
}


