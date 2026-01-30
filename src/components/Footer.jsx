import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 dark:bg-black dark:text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-3 text-black dark:text-white">
            NIKE STORE
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            A demo e-commerce application built using Next.js and Tailwind CSS
            for academic and learning purposes.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-4 text-black dark:text-white">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-black dark:hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-black dark:hover:text-white"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="hover:text-black dark:hover:text-white"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Social + Disclaimer */}
        <div>
          <h3 className="font-semibold mb-4 text-black dark:text-white">
            Connect
          </h3>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mb-5">
            {/* GitHub */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.42 7.86 10.96.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.38-3.87-1.38-.52-1.32-1.27-1.67-1.27-1.67-1.04-.7.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.85 1.18 3.11 0 4.43-2.69 5.4-5.25 5.68.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.45 20.45h-3.56v-5.4c0-1.29-.02-2.96-1.8-2.96-1.8 0-2.07 1.41-2.07 2.87v5.49H9.46V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.52v6.22zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0z" />
              </svg>
            </a>
          </div>

          {/* Disclaimer */}
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            This project is created for educational purposes only and is not an
            official Nike website.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Nike Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
