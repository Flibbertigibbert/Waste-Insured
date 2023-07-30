import ConnectWallet from "../components/element/connectWallet";

export default function Home() {
  return (
    <div  className="flex container mx-auto px-8 py-[123px]">

      <div className="px-8">
        <h1 className="text-black w-30 text-7xl font-semibold leading-normal">
          Waste Management
          For the Future,
          <br />
          Right Now
        </h1>
        <ConnectWallet />
      </div>

      <img
        alt="world-logo"
        src="src/assets/BD583E5A-C0FA-444F-989C-F8633DBF8D75.png"
      />
    </div>
  );
}
