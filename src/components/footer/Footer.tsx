import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/book.ico";
import { PiMapPin } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";

const Footer = () => {
  const navigationLinks = [
    {
      name: "Home",
      href: "/",
    },
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

  const usefulLinks = [
    {
      name: "About Us",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Privacy Policy",
      href: "/privacy",
    },
    {
      name: "Terms & Conditions",
      href: "/terms",
    },
  ];

  return (
    <footer className="bg-[#0f172a] text-white">
      {/* =========================
          Main Footer
      ========================== */}

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* =========================
              Brand Section
          ========================== */}

          <div className="sm:col-span-2 lg:col-span-1">

            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white/10 transition duration-300 group-hover:scale-105">
                <Image
                  src={logo}
                  alt="Book Vibe logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Book <span className="text-[#23BE0A]">Vibe</span>
                </h2>

                <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Your Reading Space
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Discover amazing books, keep track of your reading journey,
              and build your personal collection with Book Vibe.
            </p>

          </div>

          {/* =========================
              Navigation
          ========================== */}

          <div>
            <h3 className="mb-5 text-base font-bold">
              Navigation
            </h3>

            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-[#23BE0A]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              Useful Links
          ========================== */}

          <div>
            <h3 className="mb-5 text-base font-bold">
              Useful Links
            </h3>

            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-[#23BE0A]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              Contact
          ========================== */}

          <div>
            <h3 className="mb-5 text-base font-bold">
              Stay Connected
            </h3>

            <p className="text-sm leading-6 text-white/60">
              Have a question or suggestion? Wed love to hear from you.
            </p>

            <div className="mt-5 space-y-3">

              <div className="flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <TfiEmail />
                </span>

                <span className="text-white/70">
                  abdurrazzaqsakib@gamil.com
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <PiMapPin />
                </span>

                <span className="text-white/70">
                  Bangladesh
                </span>
              </div>

            </div>

            {/* Newsletter */}

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                Get book updates
              </p>

              <div className="flex rounded-lg bg-white/10 p-1">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/30"
                />

                <button
                  type="button"
                  className="rounded-md bg-[#23BE0A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1da509]"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================
          Bottom Footer
      ========================== */}

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:text-left">

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Book Vibe. All rights reserved.
          </p>

          <p className="text-xs text-white/40">
            Made with <span className="text-red-400">♥</span> for book lovers
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;