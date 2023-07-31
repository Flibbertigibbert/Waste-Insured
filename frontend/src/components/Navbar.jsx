import ConnectWallet from "./element/connectWallet";
import { Link } from "react-router-dom";
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
          <Link to="/">Home</Link>
        </h3>
        <h3 className="text-slate-900 text-sm font-normal leading-none">
          <Link to="/dashboard">Dashboard</Link>
        </h3>
      </div>

      <div className="pt-[10px] ">
        <ConnectWallet />
      </div>
    </div>
  );
}
