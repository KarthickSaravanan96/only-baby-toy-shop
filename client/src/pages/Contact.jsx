import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Button from '../components/common/Button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon. 🎉');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="bg-light min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-secondary to-blue-500 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
                        Get in Touch 📞
                    </h1>
                    <p className="text-xl md:text-2xl">
                        We'd love to hear from you! Have questions? We're here to help.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-8 shadow-lg">
                            <h2 className="font-display font-bold text-3xl text-dark mb-6">
                                Send us a Message 💌
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-dark font-semibold mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-dark font-semibold mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-dark font-semibold mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary outline-none transition-colors"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-dark font-semibold mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary outline-none transition-colors"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-dark font-semibold mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary outline-none transition-colors resize-none"
                                        placeholder="Tell us what you're thinking..."
                                    ></textarea>
                                </div>

                                <Button type="submit" size="lg" className="w-full md:w-auto flex items-center gap-2">
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* Address */}
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-lg text-dark mb-2">
                                        Visit Our Store
                                    </h3>
                                    <p className="text-gray-600">
                                        123 Toy Street, Fun Plaza<br />
                                        Mumbai, Maharashtra 400001<br />
                                        India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 p-3 rounded-full">
                                    <Phone className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-lg text-dark mb-2">
                                        Call Us
                                    </h3>
                                    <p className="text-gray-600">
                                        +91 98765 43210<br />
                                        +91 12345 67890<br />
                                        <span className="text-sm">(Mon-Sat, 9 AM - 6 PM)</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="bg-accent/30 p-3 rounded-full">
                                    <Mail className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-lg text-dark mb-2">
                                        Email Us
                                    </h3>
                                    <p className="text-gray-600">
                                        support@toyland.com<br />
                                        sales@toyland.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <Clock className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-lg text-dark mb-2">
                                        Business Hours
                                    </h3>
                                    <p className="text-gray-600">
                                        Monday - Saturday<br />
                                        9:00 AM - 6:00 PM<br />
                                        Sunday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-12">
                    <div className="bg-white rounded-3xl p-8 shadow-lg">
                        <h2 className="font-display font-bold text-3xl text-dark mb-6 text-center">
                            Find Us Here 📍
                        </h2>
                        <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">
                                    Google Map Placeholder
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                    (Map integration would go here)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
