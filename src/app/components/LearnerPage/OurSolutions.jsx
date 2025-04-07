// components/OurSolutions.js
import Image from 'next/image';
import { Lato, Inter } from 'next/font/google';
import PropTypes from "prop-types";
import styles from './styles/OurSolutions.module.css';

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

const OurSolutions = ({ id }) => {
    return (
        <section id={id} className="m-0 px-xl py-20">
            <div className="m-0 align-center text-center">
                <h2 className="text-[40px] leading-[48px] font-bold p-0 my-3 text-gray-800 font-lato">Our solutions</h2>
                <p className="text-[16px] leading-[24px] text-gray-600 font-inter my-3">
                    Create your account quickly with just your social media logins, then explore a wide range
                </p>
                <div className="grid grid-cols-3 gap-[30px] mt-14">
                    <div className="bg-white p-6 rounded-lg shadow-md text-left flex flex-col items-start h-full box-border ">
                        <div className="m-0">
                            <Image src="/software-dev-icon.svg" alt="Software Development Icon" width={50} height={50} />
                        </div>
                        <h3 className="text-[20px] leading-[32px] font-semibold text-[#333] my-4">
                        Software Development</h3>
                        <p className="text-[16px] leading-[24px] font-normal text-[#666]">
                            Unlock your potential with modern software development, from coding fundamentals to building complex applications
                        </p>
                        <p className="text-gray-700 font-semibold mt-auto">Price: <span className="text-black">$350</span></p>

                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-left flex flex-col items-start h-full box-border">
                        <div className="m-0">
                            <Image src="/data-science-icon.svg" alt="Data Science Icon" width={50} height={50} />
                        </div>
                        <h3 className="text-[20px] leading-[32px] font-semibold text-[#333] my-4">Data Science Mastery</h3>
                        <p className="text-[16px] leading-[24px] font-normal text-[#666]">
                            Equip yourself with the skills to analyze and leverage data, becoming an expert in machine learning, AI, and data-driven decision-making
                        </p>
                        <p className="text-gray-700 font-semibold mt-auto">Price: <span className="text-black">$350</span></p>

                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-left flex flex-col items-start h-full box-border">
                        <div className="m-0">
                            <Image src="/cloud-computing-icon.svg" alt="Cloud Computing Icon" width={50} height={50} />
                        </div>
                        <h3 className="text-[20px] leading-[32px] font-semibold text-[#333] my-4">Cloud Computing Expertise</h3>
                        <p className="text-[16px] leading-[24px] font-normal text-[#666] mb-4">
                            Build a solid foundation in cloud architecture and deployment, preparing you to design, implement, and manage scalable cloud solutions
                        </p>
                        <p className="text-gray-700 font-semibold mt-auto">Price: <span className="text-black">$350</span></p>

                    </div>
                </div>
            </div>
        </section>
    );
};

OurSolutions.propTypes = {
    id: PropTypes.string,
};

export default OurSolutions;