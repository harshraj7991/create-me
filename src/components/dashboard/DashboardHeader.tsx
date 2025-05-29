// src/components/dashboard/DashboardHeader.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { RiCloseLine, RiMenu2Line } from 'react-icons/ri';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Create Post', href: '/create-post' },
  { name: 'Settings', href: '/settings' },
];

export default function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                Create Me
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8" aria-label="Main">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    pathname === item.href
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative ml-3">
              <div className="flex items-center">
                {user?.photoURL ? (
                  <Image 
                    className="h-8 w-8 rounded-full"
                    src={user.photoURL}
                    alt="User profile"
                    width={50}
                    height={80}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  className="ml-3 text-sm text-gray-700 hover:text-blue-600"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <RiCloseLine className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <RiMenu2Line className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                  pathname === item.href
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="flex items-center px-4">
              {user?.photoURL ? (
                <Image
                  className="h-8 w-8 rounded-full"
                  src={user.photoURL}
                  alt="User profile"
                  width={50}
                  height={80}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-medium">
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user?.displayName || user?.email || 'User'}
                </div>
                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 w-full text-left"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}