'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Moon, Sun } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  {
    name: 'Resources',
    href: '#',
    children: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API', href: '/api' },
      { name: 'Support', href: '/support' },
    ],
  },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <header className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.children ? (
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
                >
                  {item.name}
                  <ChevronDown className="h-5 w-5 flex-none text-gray-400 dark:text-gray-500" aria-hidden="true" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`text-sm font-semibold leading-6 ${
                    pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              )}
              {item.children && resourcesOpen && (
                <div className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900 dark:text-gray-100">{subItem.name}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="sr-only">Toggle dark mode</span>
          </button> */}
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10" />
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="/placeholder.svg?height=32&width=32"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <div key={item.name} className="-mx-3">
                      {item.children ? (
                        <button
                          onClick={() => setResourcesOpen(!resourcesOpen)}
                          className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          {item.name}
                          <ChevronDown className="h-5 w-5 flex-none" aria-hidden="true" />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          {item.name}
                        </Link>
                      )}
                      {item.children && resourcesOpen && (
                        <div className="mt-2 space-y-2">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Log in
                  </Link>
                  {/* <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="mt-4 flex items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {darkMode ? (
                      <>
                        <Sun className="h-5 w-5 mr-2" aria-hidden="true" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="h-5 w-5 mr-2" aria-hidden="true" />
                        Dark Mode
                      </>
                    )}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}