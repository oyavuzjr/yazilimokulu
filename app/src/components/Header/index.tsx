import { Fragment } from 'react';
import { Menu, Popover, Transition, Disclosure } from '@headlessui/react';
import {
  ArrowLongLeftIcon,
  CheckIcon,
  HandThumbUpIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  CodeBracketIcon,
  CommandLineIcon,
} from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PropsOf } from '@headlessui/react/dist/types';
import Link from 'next/link';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Dersler', href: '/dersler', current: false },
  { name: 'İletişim', href: '/iletisim', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
type Props = { open: boolean };

export default function Example({ open }: Props) {
  return (
    <Disclosure
      as="nav"
      className="border-b border-indigo-300 border-opacity-25 bg-blue-600 lg:border-none"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
          <div className="flex items-center px-2 lg:px-0">
            <div className="flex-shrink-0">
              {/* <img
                className="block h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=300"
                alt="Workflow"
              /> */}
              <Link href="/">
                <div className="hover:cursor-pointer flex flex-row items-center">
                  <CommandLineIcon className="text-white block h-10 w-10" />
                  <div className="align-middle	ml-2 text-xl font-bold text-white">
                    Yazılım Okulu
                  </div>
                </div>
              </Link>
            </div>
            <div className="hidden lg:ml-10 lg:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.current
                          ? 'bg-blue-600 text-white'
                          : 'text-white hover:bg-blue-500 hover:bg-opacity-75',
                        'rounded-md py-2 px-3 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  className="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </div>
          </div>
          <div className="flex lg:hidden">
            {/* Mobile menu button */}
            <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-blue-600 p-2 text-indigo-200 hover:bg-blue-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>
          <div className="hidden lg:ml-4 lg:block">
            <div className="flex items-center">
              <button
                type="button"
                className="flex-shrink-0 rounded-full bg-blue-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3 flex-shrink-0">
                <div>
                  <Menu.Button className="flex rounded-full bg-blue-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block py-2 px-4 text-sm text-gray-700'
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="lg:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-blue-600 text-white'
                  : 'text-white hover:bg-blue-500 hover:bg-opacity-75',
                'block rounded-md py-2 px-3 text-base font-medium'
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
        <div className="border-t border-indigo-700 pt-4 pb-3">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={user.imageUrl}
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">
                {user.name}
              </div>
              <div className="text-sm font-medium text-indigo-300">
                {user.email}
              </div>
            </div>
            <button
              type="button"
              className="ml-auto flex-shrink-0 rounded-full bg-blue-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2">
            {userNavigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-blue-500 hover:bg-opacity-75"
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
