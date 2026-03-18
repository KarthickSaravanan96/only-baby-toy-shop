import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HelpCircle, Heart, Star } from 'lucide-react';
import SEO from '../components/common/SEO';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setStatus(null), 5000);
        }, 1500);
    };

    const contactMethods = [
        {
            icon: <Phone className="w-5 h-5" />,
            label: "Give us a call",
            value: "+91 98765 43210",
            desc: "Mon-Sat, 9 AM - 7 PM",
            color: "text-[#5BB8F5]",
            bg: "bg-[#5BB8F5]/10"
        },
        {
            icon: <Mail className="w-5 h-5" />,
            label: "Drop an email",
            value: "hello@onlybaby.in",
            desc: "24/7 Response time",
            color: "text-[#FF1E5E]",
            bg: "bg-[#FF1E5E]/10"
        },
        {
            icon: <MessageCircle className="w-5 h-5" />,
            label: "Chat with us",
            value: "WhatsApp Chat",
            desc: "Fastest response",
            color: "text-[#4CC9A0]",
            bg: "bg-[#4CC9A0]/10"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Contact Us - Only Baby"
                description="Have questions? Reach out to Only Baby for support with your orders, products, or baby care advice."
            />

            {/* Header Section */}
            <header className="bg-[#F8FAFF] py-24 px-6 border-b border-[#EEF0F8] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <Heart className="w-64 h-64 text-[#FF1E5E]" />
                </div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div className="space-y-4">
                            <span className="inline-block px-4 py-1.5 bg-[#5BB8F5]/10 text-[#5BB8F5] text-[10px] font-black uppercase tracking-widest rounded-full">Support Central</span>
                            <h1 className="text-5xl md:text-7xl font-black text-[#1E1E2E] tracking-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
                                Connect with <span className="text-[#FF1E5E]">Joy</span>
                            </h1>
                            <p className="text-[#9898BB] font-bold text-lg max-w-xl leading-relaxed">
                                We're here to help you make your baby's journey magical. Have a question about a product or your order? We're all ears!
                            </p>
                        </div>
                        <div className="hidden lg:flex items-center gap-6">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                                        <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="Support" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex text-[#FF1E5E] mb-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#9898BB]">Trusted by 50k+ Parents</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 -mt-12 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Contact Form Support */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        <div className="bg-white rounded-[50px] border-2 border-[#EEF0F8] p-8 md:p-12 shadow-2xl shadow-[#5BB8F5]/5 relative overflow-hidden">

                            {status === 'success' && (
                                <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center text-center p-10 animate-fade-in">
                                    <div className="w-24 h-24 bg-[#4CC9A0]/10 rounded-full flex items-center justify-center text-[#4CC9A0] mb-6 animate-bounce">
                                        <Send className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-black text-[#1E1E2E] mb-2">Message Delivered!</h3>
                                    <p className="text-[#9898BB] font-bold max-w-xs">We've received your spark of joy. Our team will get back to you within 24 hours.</p>
                                    <button onClick={() => setStatus(null)} className="mt-8 text-[11px] font-black uppercase tracking-widest text-[#5BB8F5] underline">Send another message</button>
                                </div>
                            )}

                            <h2 className="text-3xl font-black text-[#1E1E2E] mb-10" style={{ fontFamily: "'Nunito', sans-serif" }}>Send us a <span className="gradient-text">Secret Message</span></h2>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#9898BB] ml-1">Parent Name</label>
                                        <input
                                            name="name" value={formData.name} onChange={handleChange} required
                                            className="w-full bg-[#F8FAFF] border border-[#EEF0F8] rounded-2xl px-6 py-4 outline-none focus:border-[#5BB8F5] focus:bg-white transition-all font-bold text-[#1E1E2E]"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#9898BB] ml-1">Email Address</label>
                                        <input
                                            name="email" type="email" value={formData.email} onChange={handleChange} required
                                            className="w-full bg-[#F8FAFF] border border-[#EEF0F8] rounded-2xl px-6 py-4 outline-none focus:border-[#5BB8F5] focus:bg-white transition-all font-bold text-[#1E1E2E]"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#9898BB] ml-1">Subject</label>
                                        <select
                                            name="subject" value={formData.subject} onChange={handleChange} required
                                            className="w-full bg-[#F8FAFF] border border-[#EEF0F8] rounded-2xl px-6 py-4 outline-none focus:border-[#5BB8F5] focus:bg-white transition-all font-bold text-[#1E1E2E] appearance-none"
                                        >
                                            <option value="">Select a topic</option>
                                            <option value="Order Tracking">Order Tracking</option>
                                            <option value="Product Question">Product Question</option>
                                            <option value="Return / Exchange">Return / Exchange</option>
                                            <option value="Collaboration">Collaboration</option>
                                            <option value="Feedback">Feedback</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#9898BB] ml-1">Order ID (optional)</label>
                                        <input
                                            name="phone" value={formData.phone} onChange={handleChange}
                                            className="w-full bg-[#F8FAFF] border border-[#EEF0F8] rounded-2xl px-6 py-4 outline-none focus:border-[#5BB8F5] focus:bg-white transition-all font-bold text-[#1E1E2E]"
                                            placeholder="#OB2024..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#9898BB] ml-1">How can we help?</label>
                                    <textarea
                                        name="message" value={formData.message} onChange={handleChange} required rows={6}
                                        className="w-full bg-[#F8FAFF] border border-[#EEF0F8] rounded-3xl px-6 py-5 outline-none focus:border-[#5BB8F5] focus:bg-white transition-all font-bold text-[#1E1E2E] resize-none"
                                        placeholder="Type your message here..."
                                    />
                                </div>

                                <button
                                    type="submit" disabled={status === 'sending'}
                                    className="btn-primary w-full md:w-auto px-12 py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
                                >
                                    {status === 'sending' ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send My Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Quick Info & Cards */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-8">

                        {/* Direct Contact Cards */}
                        <div className="space-y-4">
                            {contactMethods.map((m, i) => (
                                <div key={i} className="group bg-white p-6 rounded-[32px] border-2 border-[#EEF0F8] hover:border-[#5BB8F5]/30 transition-all flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-2xl ${m.bg} flex items-center justify-center ${m.color} group-hover:scale-110 transition-transform`}>
                                        {m.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#9898BB] mb-0.5">{m.label}</h4>
                                        <p className="font-extrabold text-[#1E1E2E] text-lg">{m.value}</p>
                                        <p className="text-[10px] text-[#9898BB] font-bold mt-0.5">{m.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Store Location */}
                        <div className="bg-[#1E1E2E] p-8 rounded-[40px] text-white space-y-6 relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 opacity-10">
                                <MapPin className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-[#5BB8F5]" />
                                </div>
                                <h3 className="text-xl font-black">Flagship Store</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="font-bold opacity-60 text-xs uppercase tracking-widest">Visit us at</p>
                                <p className="font-bold text-sm leading-relaxed">
                                    Only Baby Experience Center,<br />
                                    Level 2, Premium Plaza, Bandra West,<br />
                                    Mumbai, Maharashtra 400050
                                </p>
                            </div>
                            <div className="pt-4 flex items-center justify-between border-t border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#4CC9A0] rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Store is Open</span>
                                </div>
                                <button className="text-[10px] font-black uppercase tracking-widest text-[#5BB8F5] hover:underline">Get Directions</button>
                            </div>
                        </div>

                        {/* FAQ Card */}
                        <div className="bg-white p-8 rounded-[40px] border-2 border-[#EEF0F8] flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-[#F8FAFF] rounded-full flex items-center justify-center text-[#5BB8F5]">
                                <HelpCircle className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-[#1E1E2E]">Need Quick Answers?</h3>
                                <p className="text-sm text-[#9898BB] font-bold mt-1">Check our most common questions from parents.</p>
                            </div>
                            <button className="btn-outline w-full rounded-2xl py-3 border-[#EEF0F8] text-[#1E1E2E] hover:border-[#5BB8F5] hover:bg-[#5BB8F5] hover:text-white">View FAQs</button>
                        </div>

                    </div>
                </div>
            </main>

            {/* Support Values Section */}
            <section className="bg-[#F8FAFF] py-20 px-6 border-t border-[#EEF0F8]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <div className="flex justify-center"><Clock className="w-10 h-10 text-[#FF1E5E]" /></div>
                            <h4 className="text-xl font-black text-[#1E1E2E]">Instant Response</h4>
                            <p className="text-sm text-[#9898BB] font-bold leading-relaxed px-4">Our specialized agents are trained to give you the fastest advice for your little one.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-center"><Heart className="w-10 h-10 text-[#5BB8F5]" /></div>
                            <h4 className="text-xl font-black text-[#1E1E2E]">Expert Care</h4>
                            <p className="text-sm text-[#9898BB] font-bold leading-relaxed px-4">We are parents too. We understand the importance of quality and safety in every product.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-center"><Send className="w-10 h-10 text-[#4CC9A0]" /></div>
                            <h4 className="text-xl font-black text-[#1E1E2E]">Global Shipping</h4>
                            <p className="text-sm text-[#9898BB] font-bold leading-relaxed px-4">No matter where you are, we ensure the joy of parenting reaches your doorstep safely.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
