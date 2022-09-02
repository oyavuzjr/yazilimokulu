/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { ArrowLongLeftIcon, HomeIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

type Props = { breadcrumbs: breadcrumb[] };

type breadcrumb = { name: string; href: string };

export default function index({ breadcrumbs }: Props) {
  return (
    <div className="border-t border-gray-200 py-3">
      <nav className="flex ml-4" aria-label="Breadcrumb">
        <div className="flex sm:hidden ">
          <Link href={`/dersler`}>
            <a className="group inline-flex space-x-3 text-sm font-medium text-gray-500 hover:text-gray-700">
              <ArrowLongLeftIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600"
                aria-hidden="true"
              />
              <span>Back to Applicants</span>
            </a>
          </Link>
        </div>
        <div className="hidden sm:block">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div>
                <Link href="/">
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <HomeIcon
                      className="h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Home</span>
                  </a>
                </Link>
              </div>
            </li>
            {breadcrumbs.map((item) => (
              <li key={item.name}>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <Link href={item.href}>
                    <a
                      href={item.href}
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      {item.name}
                    </a>
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </div>
  );
}
