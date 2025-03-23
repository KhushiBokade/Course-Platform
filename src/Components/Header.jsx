import React, { useState } from 'react';
import img1 from '../assets/img-1.jpg';
import img2 from '../assets/EduVerse.png';
import './Header.css';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Handle scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Menu items
  const menuItems = [
    { label: "HOME", link: "/" },
    { label: "COURSES", link: "/courses" },
    { label: "FEATURES", link: "/features" },
    { label: "DASHBOARD", link: "/dashboard" }
  ];

  return (
    <div className={`header-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
      <div className="logo"  style={{paddingRight:'10%'}}>
          <img src={img2} alt="EduVerse Logo" className="logo-img"/>
        </div>
        
        <nav className={`nav-menu ${menuOpen ? 'menu-open' : ''}`}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="profile-pic-container">
          <img src={img1} alt="Profile" className="profile-img" />
        </div>
        
        {isMobile && (
          <div 
            className={`hamburger-menu ${menuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;