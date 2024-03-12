"use client"
import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";


const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 z-50 p-2 bg-slate-500 text-white rounded-full cursor-pointer hover:bg-slate-400"
        aria-label="Go to top"
      >
        <MdOutlineKeyboardArrowUp size="1.5em"/>
      </button>
    )
  );
};

export default BackToTop;
