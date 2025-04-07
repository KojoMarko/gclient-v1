'use client';

import { Lato, Inter } from 'next/font/google';
import RegisterSteps from './RegisterSteps';
import { useState } from 'react';
import { 
    SquareUserRound, User, Mail, MapPin, 
    GraduationCap, Accessibility, Phone, 
    Image, DollarSign 
} from 'lucide-react';

const lato = Lato({ subsets: ['latin'], weight: ['700'], variable: '--font-lato' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-inter' });

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        module: '',
        gender: '',
        disabled: '',
        phone: '',
        image: null,
        amount: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === 'file' ? (e.target as HTMLInputElement).files?.[0] : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Registration failed');

            console.log('Registration successful!');
            setFormData({
                firstName: '', lastName: '', email: '', location: '',
                module: '', gender: '', disabled: '', phone: '',
                image: null, amount: '', description: '',
            });

            alert("Registration Successful!");
        } catch (error) {
            console.error('Registration error:', error);
            alert("An unknown error occurred.");
        }
    };

    return (
        <section className="items-center  py-24 px-[210px] text-center font-inter ">
            <div className="flex justify-between flex-col md:flex-row space-x-0 md:space-x-8 m  rounded-lg">
                
                {/* Register Steps Section */}
                <div className="relative w-[330px] mt-[84px] mr-8">
                    <RegisterSteps />
                </div>

                {/* Register Form */}
                <div className="flex-1 w-full max-w-[590px] mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Register</h2>

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
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
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
                            <input type="file" name="image" required onChange={handleChange} 
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
                        <button type="submit" className="bg-hero-bg text-white py-2 rounded-md hover:bg-blue-700">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;
