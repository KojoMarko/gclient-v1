// components/EmailResetPassword.jsx
import { Lato, Inter } from 'next/font/google';
import styles from './styles/EmailResetPassword.module.css';
import { Mail } from 'lucide-react';

const lato = Lato({
    subsets: ['latin'],
    weight: ['700'], // Or any other weight you're using
    variable: '--font-lato',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'], // Or the weights you need
    variable: '--font-inter',
});

const EmailResetPassword = () => {
    return (
        <div className={styles.resetPasswordContainer}>
            <h2 className={`${styles.title} ${lato.className}`}>Forgot password</h2>
            <p className={`${styles.instruction} ${inter.className}`}>
                Enter your email address to reset your password
            </p>
            <div className={styles.inputGroup}>
                <Mail className={styles.mailIcon} />
                <input
                    className={`${styles.input} ${inter.className}`}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                />
            </div>
            <button className={`${styles.resetButton} ${inter.className}`}>
                Reset password &gt;
            </button>
        </div>
    );
};

export default EmailResetPassword;