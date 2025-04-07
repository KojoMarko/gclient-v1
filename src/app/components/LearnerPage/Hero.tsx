// components/Hero.js
import Image from 'next/image';
import { Lato, Inter } from 'next/font/google';
import styles from './styles/Hero.module.css';

const lato = Lato({
    subsets: ['latin'],
    weight: ['700'], // Only using 700 for the heading
    variable: '--font-lato',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'], // Regular and SemiBold
    variable: '--font-inter',
});

const Hero = () => {
    return (
        <section className="px-xl bg-hero-bg flex justify-center m-0  items-center  py-lg">
            <div className={styles.heroContent}>
                <div className={styles.textContainer}>
                    <h3 className={styles.title}>Unlock Your Potential with<br />Industry-Leading Courses!</h3>
                    <p className={`${styles.description} ${inter.className}`}> {/* Apply Inter here */}
                        &quot;Join thousands of learners gaining real-world skills and advancing their careers. Our expert-led courses are designed to empower you to succeed.&quot;
                    </p>
                    <button className={`${styles.button} ${inter.className}`}>Get started</button> {/* Apply Inter here */}
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src="/hero-image.svg"
                        alt="Hero Image"
                        width={516}
                        height={382}
                        layout="responsive"
                        objectFit="contain"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;