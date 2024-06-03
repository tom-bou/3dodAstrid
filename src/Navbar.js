import React from 'react';
import { ReactComponent as Logo } from './assets/Astrid_logga_white.svg'; // Ensure the path is correct

function Navbar() {
  return (
    <nav className="bg-transparent p-4 fixed top-0 w-full z-10 flex justify-center">
      <Logo className="h-16" />
    </nav>
  );
}

export default Navbar;