import SideBar from "../components/SideBar";
import AddWasteModal from "../components/modals/AddWasteModal";
import SetCollectorModal from "../components/modals/SetCollectorModal";

 export default function Dashboard() {
  return (
    <div className="pt-4 py-8">
      <SideBar />
      <div className=" ml-60 text-2xl py-10">
        Waste Recorded
      </div>
    </div>
  )
}