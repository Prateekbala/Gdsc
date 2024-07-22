'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: session } = useSession();

  return (
    
      <div className='fixed top-0 left-0 z-50 w-full text-white bg-black border-gray-600 text'>
        helloooooooooooo
      </div>
  
  );
};

export default Header;
