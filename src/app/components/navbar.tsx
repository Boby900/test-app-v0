"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react"; // Import useSession from next-auth
import { signOut } from "next-auth/react";
export default function Navbar() {
  const { status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinkClasses = (path: string) =>
    `text-sm font-semibold leading-6 ${
      pathname === path ? "text-blue-400" : "text-gray-100 hover:text-gray-300"
    }`;

  return (
    <header className="bg-gray-900">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-xl font-bold text-white">
            <Image src="/logo.svg" width={30} height={30} alt="logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/pricing" className={navLinkClasses("/pricing")}>
            Pricing
          </Link>
          <Link href="/about" className={navLinkClasses("/about")}>
            About
          </Link>
        </div>
        {status == "loading" ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <span className="text-sm font-semibold leading-6 text-gray-100">
              Loading...
            </span>
          </div>
        ) : status == "authenticated" ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={() => signOut()}
              className="text-sm font-semibold leading-6 text-gray-100 hover:text-gray-300"
            >
              Sign Out <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-100 hover:text-gray-300"
            >
              Log In<span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/pricing"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-100 hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-100 hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {status == "authenticated" ? (
              <button
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-100 hover:bg-gray-800"
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut();
                }}
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-100 hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
