import ConnectWallet from "../components/element/connectWallet";

export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row container
     mx-auto px-[30px] sm:px-[70px] py-[100px] sm:py-[123px]">
      <div className="px-4 sm:px-8">
        <h1 className="text-[#282e82] sm:pb-4 text-3xl sm:text-6xl font-semibold sm:leading-normal">
          Waste Management <br />
          For the Future,
          <br />
          Right Now
        </h1>
        <div className="pt-4 pb-[60px]  sm:pt-0 pb-0">
          <ConnectWallet />
        </div>
      </div>

      <img
        alt="world-logo"
        className=" w-[270px] h-[270px] sm:w-[450px] sm:h-[450px]"
        src="src/assets/BD583E5A-C0FA-444F-989C-F8633DBF8D75.png"
      />
    </div>
  );
}
