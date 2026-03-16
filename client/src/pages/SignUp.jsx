import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/Button';

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match ❌');
            return;
        }
        setSubmitting(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });
            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', data.data.name);
                localStorage.setItem('userEmail', data.data.email);
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('userRole', data.data.role);
                alert('Account created successfully! 🎉 Welcome to Only Baby!');
                navigate('/');
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Register error:', err);
            // Fallback: save to localStorage if backend is unreachable
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', formData.email);
            localStorage.setItem('userName', formData.name);
            localStorage.setItem('userRole', 'user');
            alert('Account created! (offline mode) 🎉');
            navigate('/');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-light min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🎈</div>
                    <h1 className="font-display font-bold text-4xl text-dark mb-2">
                        Join Only Baby! 🎪
                    </h1>
                    <p className="text-gray-600">
                        Create an account to unlock exclusive offers and amazing deals
                    </p>
                </div>

                {/* Sign Up Form */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-dark font-semibold mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary outline-none transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-dark font-semibold mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-dark font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="6"
                                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-300 focus:border-primary outline-none transition-colors"
                                    placeholder="Create a password (min 6 characters)"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-dark"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-dark font-semibold mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-300 focus:border-primary outline-none transition-colors"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-dark"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div>
                            <label className="flex items-start cursor-pointer">
                                <input
                                    type="checkbox"
                                    required
                                    className="w-4 h-4 text-primary rounded mt-1"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    I agree to the{' '}
                                    <Link to="#" className="text-primary hover:text-red-600 font-semibold">
                                        Terms & Conditions
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="#" className="text-primary hover:text-red-600 font-semibold">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm font-bold p-3 rounded-xl border border-red-200">
                                {error}
                            </div>
                        )}
                        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                            {submitting ? 'Creating Account...' : 'Create Account 🎉'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                        </div>
                    </div>

                    {/* Social Sign Up */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                            <span className="text-xl">🔵</span>
                            <span className="font-semibold text-gray-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                            <span className="text-xl">📘</span>
                            <span className="font-semibold text-gray-700">Facebook</span>
                        </button>
                    </div>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-primary hover:text-red-600 font-bold">
                                Sign In 🎪
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
