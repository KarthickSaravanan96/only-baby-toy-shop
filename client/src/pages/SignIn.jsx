import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/Button';

const SignIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', data.data.email);
                localStorage.setItem('userName', data.data.name);
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('userRole', data.data.role);

                if (data.data.role === 'admin') {
                    navigate('/admin');
                } else {
                    alert('Sign In successful! 🎉');
                    navigate('/');
                }
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(`Cannot connect to server at ${import.meta.env.VITE_API_URL || 'http://localhost:5000'}. Falling back to demo mode.`);

            // Fallback for demo
            if (formData.email === 'onlybaby7999@gmail.com' && formData.password === 'onlybaby7999') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', formData.email);
                localStorage.setItem('userName', 'Raja');
                localStorage.setItem('token', 'demo-token');
                localStorage.setItem('userRole', 'admin');
                navigate('/admin');
            } else {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', formData.email);
                localStorage.setItem('token', 'demo-token');
                localStorage.setItem('userRole', 'user');
                navigate('/');
            }
        }
    };

    return (
        <div className="bg-light min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🎪</div>
                    <h1 className="font-display font-bold text-4xl text-dark mb-2">
                        Welcome Back! 👋
                    </h1>
                    <p className="text-gray-600">
                        Sign in to access exclusive offers and track your orders
                    </p>
                </div>

                {/* Sign In Form */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-300 focus:border-primary outline-none transition-colors"
                                    placeholder="Enter your password"
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

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-primary rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link to="#" className="text-sm text-primary hover:text-red-600 font-semibold">
                                Forgot Password?
                            </Link>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm font-bold p-3 rounded-xl border border-red-200">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button type="submit" size="lg" className="w-full">
                            Sign In 🎉
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
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

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:text-red-600 font-bold">
                                Sign Up Now! 🎈
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

export default SignIn;
