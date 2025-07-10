'use client';

import API from '@/app/utils/axios';
import { useState } from 'react';

import { useRouter } from 'next/navigation';


// import Image from 'next/image';

export default function Page() {

      const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const [photo, setPhoto] = useState(null);
    // const [photoPreview, setPhotoPreview] = useState(null);


    // const handlePhotoChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setPhoto(file);
    //         setPhotoPreview(URL.createObjectURL(file));
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && email && password) {

            try {
                await API.post('/auth/user/register', {
                    name: username,
                    email:email,
                    password :password
                });

                setUsername('');
                setEmail('');
                setPassword('');
                // setPhoto(null);
                // setPhotoPreview(null);

                 router.push('/');

            }
            catch (err) {
                alert('Register failed');
                console.log(err)
            }
        }

        else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 input-focus"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label htmlFor=" Ewmail" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 input-focus"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 input-focus"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* <div>
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                            Profile Photo
                        </label>
                        <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="mt-1 w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                        {photoPreview && (
                            <div className="mt-4">
                                <Image
                                    src={photoPreview}
                                    alt="Profile preview"
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover mx-auto border-2 border-[var(--primary)]"
                                    unoptimized
                                />
                            </div>
                        )}
                    </div> */}

                    <button
                        type="submit"
                        className="w-full btn-primary cursor-pointer"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/auth/login" className="text-primary font-medium">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}