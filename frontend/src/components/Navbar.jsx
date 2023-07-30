import ConnectWallet from "./element/connectWallet";

export default function Navbar() {
  return (
    <div className="flex justify-between container mx-auto px-8">
      <img
        alt="logo"
        className="w-[60px] cursor-pointer"
        src="src/assets/wasteisureLogo.png"
      />

      <div className="flex cursor-pointer gap-3 pt-[20px]">
        <h3 className="text-slate-900 text-sm font-normal leading-none">
          Home
        </h3>
        <h3 className="text-slate-900 text-sm font-normal leading-none">
          Dashboard{" "}
        </h3>
      </div>

      <div className="pt-[10px] ">
        <ConnectWallet />
      </div>
    </div>
  );
}
