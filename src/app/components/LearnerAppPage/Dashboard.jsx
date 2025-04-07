import { LayoutDashboard } from 'lucide-react'; // Import the icon
import { Lato, Inter } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-lato',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
});


const Dashboard = () => {
    return (
      <div className="flex flex-column  m-0 ">
        <div className= "bg-hero-bg flex  w-full px-xl pb-[100px] pt-9 ">
          <div className="flex items-center ">
            <LayoutDashboard className="w-[3rem] h-[3rem] mr-4 " />
            <span className={`text-[3rem] font-bold ${lato.className}`}>Dashboard</span>
          </div>
        </div>
        
    </div>
    );
  };
  
  export default Dashboard;