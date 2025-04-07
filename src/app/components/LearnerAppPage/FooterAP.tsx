import Link from "next/link";
import { ArrowUp } from 'lucide-react';
import { Copyright } from 'lucide-react';
import Image from 'next/image';

const FooterAP = () => {
    return (
        <footer className= "bg-hero-bg text-white px-xl py-4"> {/* Footer container */}
            <div className="max-w-full mx-auto flex flex-col gap-4">
                <div className="flex justify-between items-start w-full mb-4 topSection"> {/* Combined top section */}
                    <Image src="/footer-azubi-logo.svg" alt="Client Logo" width={385} height={110} className="max-w-full h-auto" />
                    <div className="flex space-x-10">
                        
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold mb-2">Contact</h3>
                            <p className="m-0">+23341002000</p>
                            <p className="m-0">New Reiss, Ghana, Accra</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold mb-2">Social</h3>
                            <a href="#" className="text-white no-underline  hover:underline">Facebook</a>
                            <a href="#" className="text-white no-underline  hover:underline">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <hr className="border-0 h-[1px] bg-white m-0 pb-0" />
                <div className="flex justify-between items-center"> {/* Combined bottom section */}
                    <div className="text-white no-underline font-medium transition-colors duration-300 ease-in-out flex items-center m-0 px-2.5">
                    <Copyright />
                    <p className="text-white no-underline font-medium transition-colors duration-300 ease-in-out flex items-center m-0 px-2.5">copyright 2025 - G-client, All rights reserved</p>
                    </div>

                    <Link href="/login" className="text-white no-underline font-medium transition-colors duration-300 ease-in-out flex items-center m-0 px-2.5">
                    Back to top
                    <ArrowUp />
                     </Link>
                </div>
            </div>
        </footer>
    );
};

export default FooterAP;