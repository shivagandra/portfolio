import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import FluidBackground from './FluidBackground';

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-void text-white overflow-x-hidden">
      {/* Fluid Background */}
      <FluidBackground />
      
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
