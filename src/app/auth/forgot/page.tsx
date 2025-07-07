
'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [stage, setStage] = useState('request'); // Stages: request, verify, update
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate sending OTP
      alert(`OTP sent to ${email}! (Demo OTP: 123456)`);
      setStage('verify');
    } else {
      alert('Please enter a valid email.');
    }
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    // Simulate OTP verification (hardcoded OTP for demo)
    if (otp === '123456') {
      setStage('update');
    } else {
      alert('Invalid OTP. Please try again. (Demo OTP: 123456)');
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      alert('Password updated successfully! (This is a demo)');
      // Reset form and redirect to login
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setStage('request');
      window.location.href = '/login';
    } else if (!newPassword) {
      alert('Please enter a new password.');
    } else {
      alert('Passwords do not match.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {stage === 'request' && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter your email to receive an OTP.
            </p>
            <form onSubmit={handleRequestSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              <button type="submit" className="w-full btn-primary">
                Send OTP
              </button>
            </form>
          </>
        )}

        {stage === 'verify' && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Verify OTP</h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter the OTP sent to {email}.
            </p>
            <form onSubmit={handleVerifySubmit} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 input-focus"
                  placeholder="Enter the OTP"
                />
              </div>
              <button type="submit" className="w-full btn-primary">
                Verify OTP
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              <a href="#" onClick={() => setStage('request')} className="text-primary font-medium">
                Resend OTP
              </a>
            </p>
          </>
        )}

        {stage === 'update' && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Password</h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter your new password.
            </p>
            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 input-focus"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 input-focus"
                  placeholder="Confirm new password"
                />
              </div>
              <button type="submit" className="w-full btn-primary">
                Update Password
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Back to{' '}
          <a href="/login" className="text-primary font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
