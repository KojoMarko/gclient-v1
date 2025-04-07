// components/WhatNext.js
import { Lato, Inter } from 'next/font/google';
import styles from './styles/WhatNext.module.css';

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

const WhatNext = () => {
    const technologies = [
        "ReactJs", "Handlebars", "NodeJs", "Django", "MongoDB", "VueJs",
        "PowerBI", "Python", "Excel", "Tableau", "AWS", "Azure"
    ];

    const borderColors = [
        '#ffffff', // text/on-action
        '#00A3E0', // border/secondary
        '#00C853', // border/success
        '#9E9E9E', // border/disabled
        '#D32F2F', // border/error
        '#FF9800', // border/warning
        '#ffffff', // border/primary
        '#0D47A1', // surface/action
    ];

    return (
        <section className="bg-hero-bg text-white py-24 px-[210px] text-center">
            <div className="mx-auto text-center ">
                <div className="max-w-[590px] mx-auto mb-14">
                <h2 className={`${lato.className} text-[40px] leading-[48px] font-bold mb-6`}>What will be next step</h2>
                <p className={`${inter.className} text-sm sm:text-base leading-6 font-normal`}>
                        Discover our diverse stack of solutions, including software developers, data scientists and cloud experts. Sign up today and explore your talent!
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-0">
                    {technologies.map((tech, index) => (
                        <span
                        key={index}
                        className={`${inter.className} bg-transparent px-4 py-2 sm:px-6 sm:py-3 rounded border-2 text-center font-semibold text-sm sm:text-base leading-6 mb-3`}
                        style={{ borderColor: borderColors[index % borderColors.length] }}
                      >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatNext;