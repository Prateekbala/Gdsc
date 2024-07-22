'use client';
import { FaUserCircle } from "react-icons/fa";
import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: session } = useSession();

  return (
    <nav className='fixed  top-0 left-0 z-10 w-full bg-white border-b border-gray-200'>
    <div className='px-3 py-3 lg:px-5 lg:pl-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start'>
          <Link href='/' className='flex ml-2 md:mr-24'>
            <span className='self-center text-xl font-semibold sm:text-2xl'>
              Project
            </span>
          </Link>
        </div>
        <div className='flex items-center'>

          <div className='relative items-center ml-3'>
            <div>
              <button
                onClick={() => setShowDropdown(prevState => !prevState)}
                type='button'
                className='flex '
              >
                <span className='sr-only'>Open user menu</span>
                <FaUserCircle className='h-5 w-5 ' />
              </button>
            </div>

            {!session ? (
              <></>
            ) : (
              showDropdown && (
                <div className='z-50 right-0 absolute my-4 text-base bg-white divide-y divide-gray-100 rounded shadow'>
                  <div className='px-4 py-3'>
                    <p className='text-sm text-gray-900'>
                      {session.user?.name}
                    </p>
                    <p className='text-sm text-gray-900 font-medium truncate'>
                      {session.user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Sign out
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Header;
