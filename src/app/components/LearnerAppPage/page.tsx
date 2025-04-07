import Footer from "../LearnerPage/Footer";
import Navbar from "../LearnerPage/Navbar";
import ApplicationProfile from "./ApplicationProfile";
import Dashboard from "./Dashboard";
import JohnDoeAP from "./JohnDoeAP";
import OopsAP from "./OopsAP";
import FooterAP from "./FooterAP";
import RegisterAP from "./RegisterAP";



export default function Home() {
    return (
      <div className="overflow-x-hidden">
        <Navbar />
        <Dashboard />
        <RegisterAP />
        <FooterAP />
        
      </div>
    );
  }