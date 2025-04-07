'use client';

import { Lato, Inter } from 'next/font/google';
import NavbarAP from './NavbarAP';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { 
    SquareUserRound, User, Mail, MapPin, 
    GraduationCap, Accessibility, Phone, 
    Image, DollarSign 
} from 'lucide-react';

const lato = Lato({ subsets: ['latin'], weight: ['700'], variable: '--font-lato' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-inter' });

// Define TypeScript interfaces
interface FormDataState {
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    module: string;
    gender: string;
    disabled: string;
    phone: string;
    image: File | null;
    amount: string;
    description: string;
    [key: string]: string | File | null; // Index signature
}

const RegisterAP = () => {
    const router = useRouter();
    
    const [formData, setFormData] = useState<FormDataState>({
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        module: "",
        gender: "",
        disabled: "",
        phone: "",
        image: null,
        amount: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        
        setFormData({
            ...formData,
            [name]: type === "file" ? (e.target as HTMLInputElement).files?.[0] || null : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            // Create FormData object for file uploads
            const formDataToSend = new FormData();
            
            // Add all form fields to FormData
            Object.keys(formData).forEach(key => {
                // Skip null values but include empty strings
                if (formData[key] !== null) {
                    formDataToSend.append(key, formData[key] as string | Blob);
                }
            });
    
            // ✅ Convert module to match API expectations
            const programMapping: Record<string, string> = {
                "software-development": "Software Development",
                "data-science": "Data Science",
                "cloud-computing": "Cloud Computing",
            };
            
            // Use the mapped value if it exists
            const moduleValue = formData.module ? (programMapping[formData.module] || formData.module) : "";
            formDataToSend.set('module', moduleValue);
    
            console.log("📌 Submitting data...");
    
            const response = await fetch("/api/user/register", {
                method: "POST",
                body: formDataToSend,
            });
    
            const data = await response.json();
            console.log("📌 API Response:", data);
    
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }
    
            alert("Registration Successful!");
            localStorage.setItem("hasApplication", "true");
            router.push("/LearnerPage");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className={`relative top-[-80px] h-auto flex flex-col justify-center  overflow-x-hidden mx-[210px] bg-white ${lato.variable} ${inter.variable}`}>
            <div className="flex text-left">
                <NavbarAP />
            </div>

            {/* Register Form */}
            <div className="flex-1 w-full max-w-[590px] mx-auto mt-[100px]">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Register</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    
                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                            <User className="text-gray-500 w-5 h-5 mr-2" />
                            <input type="text" name="firstName" placeholder="First name" required 
                                value={formData.firstName} onChange={handleChange} 
                                className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500" />
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                            <User className="text-gray-500 w-5 h-5 mr-2" />
                            <input type="text" name="lastName" placeholder="Last name" required 
                                value={formData.lastName} onChange={handleChange} 
                                className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500" />
                        </div>
                    </div>

                    {/* Email & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                            <Mail className="text-gray-500 w-5 h-5 mr-2" />
                            <input type="email" name="email" placeholder="Email" required 
                                value={formData.email} onChange={handleChange} 
                                className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500" />
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                            <MapPin className="text-gray-500 w-5 h-5 mr-2" />
                            <input type="text" name="location" placeholder="Location" required 
                                value={formData.location} onChange={handleChange} 
                                className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500" />
                        </div>
                    </div>

                    {/* Dropdowns (Module & Gender) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                            <GraduationCap className="text-gray-500 w-5 h-5 mr-2" />
                            <select name="module" required value={formData.module} onChange={handleChange} 
                                className="w-full bg-transparent outline-none text-gray-900">
                                <option value="">Choose module</option>
                                <option value="software-development">Software Development</option>
                                <option value="data-science">Data Science</option>
                                <option value="cloud-computing">Cloud Computing</option>
                            </select>
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                            <SquareUserRound className="text-gray-500 w-5 h-5 mr-2" />
                            <select name="gender" required value={formData.gender} onChange={handleChange} 
                                className="w-full bg-transparent outline-none text-gray-900">
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    {/* Phone & Disabled */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                            <Phone className="text-gray-500 w-5 h-5 mr-2" />
                            <input type="text" name="phone" placeholder="Phone" required 
                                value={formData.phone} onChange={handleChange} 
                                className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500" />
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                            <Accessibility className="text-gray-500 w-5 h-5 mr-2" />
                            <select name="disabled" required value={formData.disabled} onChange={handleChange} 
                                className="w-full bg-transparent outline-none text-gray-900">
                                <option value="">Disabled</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    {/* Upload Image */}
                    <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                        <Image className="text-gray-500 w-5 h-5 mr-2" />
                        <input type="file" name="image" onChange={handleChange} 
                            className="w-full outline-none bg-transparent text-gray-900" aria-label="Upload Image" />
                    </div>

                    {/* Amount */}
                    <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                        <DollarSign className="text-gray-500 w-5 h-5 mr-2" />
                        <input type="number" name="amount" placeholder="Amount" required 
                            value={formData.amount} onChange={handleChange} 
                            className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500" />
                    </div>

                    {/* Description */}
                    <textarea name="description" placeholder="Description" rows={4} required 
                        value={formData.description} onChange={handleChange} 
                        className="border border-gray-300 rounded-md p-2 outline-none bg-white text-gray-900 resize-none placeholder-gray-500"></textarea>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="bg-hero-bg text-white py-2 rounded-md hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterAP;