import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-between items-center bg-gray-200 h-64 mb-0 bottom-0 w-full">
      <div className="text-2xl font-bold ml-6">Pratham</div>
      <div className="text-center space-y-4 ml-6">
        <p className="text-lg text-left">Follow me on Instagram</p>
        <p className="text-lg text-left">Business email</p>
        <a href="mailto:prathambiren2618@Gmail.com" className="underline text-left text-lg">prathambiren2618@Gmail.com</a>
      </div>
      <div></div>
    </footer>
  );
};

export default Footer;