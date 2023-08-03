export interface OnSuccess {
    message: string
}

const OnSuccessAlert = ({ message }: OnSuccess) => {
    return (
        <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert">
            <div className="flex">
                <div>
                    <p className="font-bold">Success</p>
                    <p className=" text-sm">{message}</p>
                </div>
            </div>
        </div>
    )
};

export default OnSuccessAlert;
