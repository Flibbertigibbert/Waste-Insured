import ConnectWallet from "../components/element/connectWallet";

export default function Home() {
  return (
    <div  className="flex flex-col sm:flex-row container mx-auto px-[70px] py-[123px]">

      <div className="sm:px-8">
        <h1 className="text-black w-30 pb-4 text-2xl sm:text-6xl font-semibold sm:leading-normal">
          Waste Management
          For the Future,
          <br />
          Right Now
        </h1>
        <ConnectWallet />
      </div>

      <img
        alt="world-logo"
        className=" w-[200px] h-[200px] sm:w-[450px] sm:h-[450px]"
        src="src/assets/BD583E5A-C0FA-444F-989C-F8633DBF8D75.png"
      />
    </div>
  );
}
