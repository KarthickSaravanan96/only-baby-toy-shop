import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SignInNotification from '../common/SignInNotification';

const Layout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className={`flex-1 ${isHome ? '' : 'pt-[110px] lg:pt-[130px]'}`}>
                <Outlet />
            </main>
            <Footer />
            <SignInNotification />
        </div>
    );
};

export default Layout;
