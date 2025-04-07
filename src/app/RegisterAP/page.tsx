"use client"; 
import Dashboard from "../components/LearnerAppPage/Dashboard";
import FooterAP from "../components/LearnerAppPage/FooterAP";
import RegisterAP from "../components/LearnerAppPage/RegisterAP";
import Navbar from "../components/LearnerPage/Navbar";

export default function Page() {
    

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Dashboard />
            <RegisterAP />
            <FooterAP />
        </div>
    );
}