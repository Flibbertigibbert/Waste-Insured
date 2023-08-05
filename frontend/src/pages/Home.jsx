import ConnectWallet from "../components/element/connectWallet";
import FirstImg from '../assets/BD583E5A-C0FA-444F-989C-F8633DBF8D75.png'
import firstIcon from '../assets/first-icon.jpeg'
import secIcon from '../assets/second-icon.jpeg'
import thirdIcon from '../assets/third-icon.jpeg'

export default function Home() {
  return (
    <div className=" container
     mx-auto px-[30px] sm:px-[70px] py-[100px] sm:py-[123px]">

      <section className="flex flex-col sm:flex-row">
        <div className="px-4 sm:px-8">
          <h1 className="text-[#282e82] sm:pb-4 text-3xl sm:text-6xl font-semibold sm:leading-normal">
            Waste To Free Health<br />
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
          className=" w-[270px] h-[270px] mb-[120px] sm:mb-[90px] sm:w-[450px] sm:h-[450px]"
          src={FirstImg}
        />
      </section>

      <section className="mt-6 sm:mt-3 px-4 sm:px-8">
        <h1 className=" text-[#282e82] text-2xl sm:text-4xl 
        font-semibold leading-10"> How it works</h1>

        <div className="border-2  border-[#282e82] 
        rounded-sm  my-8 sm:grid sm:grid-cols-3">

          {/**step 1 */}
          <div className="pb-[60px] sm:pb-[100px]">
            <div className="p-[60px] flex gap-8">
              <div className="rounded-full text-white
             bg-[#282e82] w-[25px] h-[25px] sm:w-[30px]  sm:h-[30px] text-center ">1</div>
              <h3 className="text-center text-black text-base sm:text-xl font-bold leading-7">Visit Our <br /> Collection Center <br /> Around You</h3>
            </div>
            <div className="w-[150px]  sm:w-[200px] mx-[80px] ">
              <img alt="first-icon" src={firstIcon} />
            </div>
          </div>

          {/**step 2 */}
          <div className="pb-[60px] sm:pb-[100px]">
            <div className="p-[60px] flex gap-8">
            <div className="rounded-full text-white
             bg-[#282e82] w-[25px] h-[25px] sm:w-[30px]  sm:h-[30px] text-center ">2</div>
              <h3 className="text-center text-black text-base sm:text-xl font-bold leading-7">Your waste is <br /> measured and the value is <br /> recorded</h3>
            </div>
            <div className="w-[150px]  sm:w-[200px] mx-[80px] ">
              <img alt="first-icon" src={secIcon} />
            </div>
          </div>

          {/**step 3 */}
          <div className="pb-[60px] sm:pb-[100px]">
            <div className="p-[60px] flex gap-8">
              <div className="rounded-full text-white
             bg-[#282e82] w-[25px] h-[25px] sm:w-[30px]  sm:h-[30px] text-center ">3</div>
              <h3 className="text-center text-black text-base sm:text-xl font-bold leading-7">Get Paid or <br /> Get Free Health and <br /> Jollificate</h3>
            </div>
            <div className="w-[150px]  sm:w-[200px] mx-[80px] ">
              <img alt="first-icon" src={thirdIcon} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
