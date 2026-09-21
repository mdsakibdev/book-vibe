"use client";

import Image from "next/image";
import logo from "@/assets/book.ico";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Books",
      href: "/books",
    },
    {
      name: "Listed Books",
      href: "/listed-books",
    },
    {
      name: "Read Books",
      href: "/read-books",
    },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/90 shadow-sm backdrop-blur-md">
      <div className="navbar container mx-auto min-h-16 px-4 lg:min-h-20">

        {/* =========================
            Logo
        ========================== */}

        <div className="navbar-start">

          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square mr-1 rounded-xl"
            >
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu dropdown-content z-[60] mt-3 w-64 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-xl"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      isActive(link.href)
                        ? "active font-semibold"
                        : "font-medium"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              <div className="my-2 border-t border-base-300" />

              <li>
                <Link href="/signin">
                  Sign In
                </Link>
              </li>

              <li>
                <Link href="/signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-success/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-success/20">
              <Image
                src={logo}
                alt="Book Vibe logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight md:text-xl">
                Book <span className="text-success">Vibe</span>
              </h1>

              <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-base-content/40 sm:block">
                Your Reading Space
              </p>
            </div>
          </Link>
        </div>

        {/* =========================
            Desktop Navigation
        ========================== */}

        <div className="navbar-center hidden lg:flex">

          <ul className="menu menu-horizontal items-center gap-1 rounded-full border border-base-300 bg-base-200/50 p-1">

            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-5 py-2 font-semibold transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-success text-white shadow-sm hover:bg-success"
                      : "text-base-content/60 hover:bg-base-100 hover:text-base-content"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

          </ul>

        </div>

        {/* =========================
            Right Side
        ========================== */}

        <div className="navbar-end gap-2">

          {/* Sign In */}

          <Link
            href="/signin"
            className="btn btn-ghost hidden rounded-lg sm:flex"
          >
            Sign In
          </Link>

          {/* Sign Up */}

          <Link
            href="/signup"
            className="btn hidden rounded-lg bg-[#59C6D2] text-white shadow-sm transition-all duration-300 hover:bg-[#45b7c4] hover:shadow-md sm:flex"
          >
            Sign Up
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;