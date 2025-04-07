import Navbar from "../LearnerPage/Navbar";
import ApplicationProfile from "./ApplicationProfile";
import Dashboard from "./Dashboard";
import FooterAP from "./FooterAP";

export default function Home() {
    return (
      <div className="overflow-x-hidden">
        <Navbar />
        <Dashboard />
        <ApplicationProfile />
        <FooterAP />
        
      </div>
    );
  }