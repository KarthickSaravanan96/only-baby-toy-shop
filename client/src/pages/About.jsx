import React from 'react';
import { Award, Heart, Shield, Users } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-light min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-secondary py-20 px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
                        About Only Baby 🎪
                    </h1>
                    <p className="text-xl md:text-2xl">
                        Bringing smiles to children since 2020
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                        <h2 className="font-display font-bold text-4xl text-dark mb-6 text-center">
                            Our Story 📖
                        </h2>
                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                Welcome to <span className="font-bold text-primary">Only Baby</span>, where every toy tells a story
                                and every child's imagination comes to life! Founded in 2020, we started with a simple mission:
                                to bring joy, learning, and endless fun to children across the country.
                            </p>
                            <p>
                                We believe that play is not just fun—it's essential for a child's development. That's why we
                                carefully curate our collection to include toys that inspire creativity, encourage learning,
                                and most importantly, bring happiness to your little ones.
                            </p>
                            <p>
                                From action figures to educational kits, from cuddly soft toys to exciting RC vehicles,
                                we have something special for every child. Every product in our store is tested for safety
                                and quality, because we know that your child's well-being is your top priority—and ours too!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-display font-bold text-4xl text-dark mb-12 text-center">
                        Why Choose Only Baby? 🌟
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-dark mb-3">
                                100% Safe
                            </h3>
                            <p className="text-gray-600">
                                All toys are certified and tested for safety. Non-toxic materials guaranteed.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-10 h-10 text-secondary" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-dark mb-3">
                                Premium Quality
                            </h3>
                            <p className="text-gray-600">
                                We source only the best toys from trusted brands worldwide.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-accent/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-10 h-10 text-orange-600" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-dark mb-3">
                                Made with Love
                            </h3>
                            <p className="text-gray-600">
                                Every toy is selected with care, thinking of your child's happiness.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-10 h-10 text-purple-600" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-dark mb-3">
                                Happy Customers
                            </h3>
                            <p className="text-gray-600">
                                Join thousands of satisfied parents who trust Only Baby.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-r from-primary to-pink-500 rounded-3xl p-12 shadow-2xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                            <div>
                                <div className="text-5xl font-bold mb-2">50K+</div>
                                <div className="text-lg">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">1000+</div>
                                <div className="text-lg">Toys Available</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">100%</div>
                                <div className="text-lg">Safe & Certified</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">24/7</div>
                                <div className="text-lg">Customer Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Promise */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display font-bold text-4xl text-dark mb-6">
                        Our Promise to You 💝
                    </h2>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                        At Only Baby, we promise to deliver not just toys, but moments of joy, learning experiences,
                        and cherished memories. We're committed to providing exceptional quality, unbeatable prices,
                        and service that makes you smile—just like your kids do when they play with our toys!
                    </p>
                    <div className="text-6xl mb-4">🎈🎪🎁</div>
                    <p className="text-2xl font-display font-bold text-primary">
                        Thank you for being part of our Only Baby family!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
