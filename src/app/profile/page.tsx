'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { MdEditDocument } from "react-icons/md";
import { FaHome } from "react-icons/fa";

import { useRouter } from 'next/navigation';
import API from '@/app/utils/axios';


export default function Page() {

    const router = useRouter();

    // Simulated user data (in a real app, fetch from backend)
    const [user, setUser] = useState({
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        photo: null,
    });
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        photo: null,
    });
    const [photoPreview, setPhotoPreview] = useState(user.photo);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file });
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.username && formData.email) {
            // Simulate updating user data
            setUser({
                username: formData.username,
                email: formData.email,
                photo: formData.photo || user.photo,
            });
            alert('Profile updated successfully! (This is a demo)');
            setEditMode(false);
            if (!formData.photo) {
                setPhotoPreview(user.photo);
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        // Reset form data to current user data when entering edit mode
        if (!editMode) {
            setFormData({
                username: user.username,
                email: user.email,
                photo: null,
            });
            setPhotoPreview(user.photo);
        }
    };


    const userInfoCall = useCallback(
        async () => {
            try {
                const res = await API.get("/auth/user/userInfo")
                setUser(prev => ({
                    ...prev,
                    username: res.data.data.name,
                    email: res.data.data.email,
                }));
            }
            catch (e) {
                console.log(e)
                router.push('/auth/login');
            }
        }, [router] // 
    );

    useEffect(() => {
        userInfoCall()
    }, [userInfoCall])

    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className='flex items-center justify-between mb-6'>

                    <h2 className="text-2xl font-bold text-center text-gray-800">Your Profile</h2>


                    <div className='flex gap-3'>
                        {
                            !editMode && (
                                <button
                                    onClick={toggleEditMode}
                                    className="w-fit btn-primary cursor-pointer"
                                >
                                    < MdEditDocument className='text-lg' />
                                </button>
                            )
                        }

                        <button
                            onClick={() => router.push("/")}
                            className="w-fit btn-primary cursor-pointer"
                        >
                            <  FaHome className='text-lg' />
                        </button>

                    </div>
                </div>

                {!editMode ? (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            {photoPreview ? (
                                <Image
                                    src={photoPreview}
                                    alt="Profile preview"
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover mx-auto border-2 border-[var(--primary)]"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-[var(--primary)]">
                                    No Photo
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Username</p>
                            <p className="mt-1 text-gray-900">{user.username}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Email</p>
                            <p className="mt-1 text-gray-900">{user.email}</p>
                        </div>

                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                className="mt-1 w-full px-4 py-2 input-focus"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 w-full px-4 py-2 input-focus"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
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
                        </div>


                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="flex-1 btn-primary cursor-pointer"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={toggleEditMode}
                                className="flex-1 bg-gray-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-gray-600 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}