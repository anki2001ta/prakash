"use client"

import React from "react"
import Image from "next/image"
import { Menu, Transition } from "@headlessui/react"
import { Fragment, useEffect, useRef, useState } from "react"

import {
  BagIcon,
  BellSimpleIcon,
  CaretDownIcon,
  GearSixIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  SignOutIcon,
  TshirtIcon,
  XIcon
} from "@/assets/icons"
import Link from "next/link"


interface TopBarProps{
  showSidebar:boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar: React.FC<TopBarProps>=({showSidebar, setShowSidebar})  => {
  const [role, setRole] = useState<string>("");
  const [username, setUserName]= useState<string>("");

  useEffect(() => {
    const roleValue = localStorage.getItem("role");
    const name = localStorage.getItem("username");
    if (roleValue !== null && name!==null) {
      setRole(roleValue);
      setUserName(name);
    }
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 flex w-full z-50 items-center justify-between
      bg-black px-8 py-4 shadow-sm`}
    >
  <div className="flex items-center gap-3 ">
    <div className="md:hidden" onClick={() => setShowSidebar(!showSidebar)}>
      <svg width="24" height="24" viewBox="0 0 30 30" aria-hidden="true">
        <path
          className="text-white "
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="2"
          d="M4 7h22M4 15h22M4 23h22"
        ></path>
      </svg>
    </div>
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/useFun.png"
        alt="usefun"
        width={600}
        height={600}
        className="h-5 w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8"
      />
      <div className="md:text-body-xl font-semibold text-white uppercase">
        <h5 className="text-netral-25 text-[12px] ">USEFUNS</h5>
        <h5 className="text-white text-[12px]">DASHBOARD</h5>
      </div>
    </Link>
  </div>

      <div className='hidden md:flex items-center gap-1 md:gap-5'>
        <Menu as='div' className='relative inline-block text-left'>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              as='div'
              className='absolute right-0 top-16 mt-2 w-80 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-lg-10 bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
              {/* <nav className='flex items-center justify-between border-b border-netral-30 p-4'>
                <h5 className='text-body-lg font-medium text-netral-100'>
                  Notifications
                </h5>
              </nav> */}

              <div className='flex flex-col items-start'>
                <Menu.Item>
                  <Link
                    href={"/settings"}
                    className={
                      "relative flex w-full items-start gap-4 border-netral-30 p-4 hover:bg-primary-surface/25"
                    }
                  >
                    <div className='TickNotif absolute right-5 z-20 h-1.5 w-1.5 rounded-full bg-error-main 2xl:h-2 2xl:w-2'></div>
                    <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-netral-30/50'>
                      <BagIcon className='h-6 w-6 text-netral-100' />
                    </div>

                    <div className='flex flex-col items-start'>
                      <h5 className='mb-0.5 text-body-base font-semibold text-netral-100'>
                        New Order
                      </h5>

                      <p className='mb-1 w-56 truncate text-body-sm text-netral-50'>
                        There is a new order, check the order details
                      </p>

                      <span className='text-body-xs text-netral-60'>
                        1h ago
                      </span>
                    </div>
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link
                    href={"/settings"}
                    className={
                      "relative flex w-full items-start gap-4 border-b border-netral-30 p-4 hover:bg-primary-surface/25"
                    }
                  >
                    <div className='absolute right-5 z-20 h-1.5 w-1.5 rounded-full bg-error-main 2xl:h-2 2xl:w-2'></div>

                    <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-netral-30/50'>
                      <PackageIcon className='h-6 w-6 text-netral-100' />
                    </div>

                    <div className='flex flex-col items-start'>
                      <h5 className='mb-0.5 text-body-base font-semibold text-netral-100'>
                        Order Return
                      </h5>

                      <p className='mb-1 w-56 truncate text-body-sm text-netral-50'>
                        There is a returned order, check refund status{" "}
                      </p>

                      <span className='text-body-xs text-netral-60'>
                        1h ago
                      </span>
                    </div>
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link
                    href={"/settings"}
                    className={
                      "relative flex w-full items-start gap-4 border-b border-netral-30 p-4 hover:bg-primary-surface/25"
                    }
                  >
                    <div className='TickNotif absolute right-5 z-20 h-1.5 w-1.5 rounded-full bg-error-main 2xl:h-2 2xl:w-2'></div>
                    <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-netral-30/50'>
                      <TshirtIcon className='h-6 w-6 text-netral-100' />
                    </div>

                    <div className='flex flex-col items-start'>
                      <h5 className='mb-0.5 text-body-base font-semibold text-netral-100'>
                        Update Stock
                      </h5>

                      <p className='mb-1 w-56 truncate text-body-sm text-netral-50'>
                        There are several stock product updates, please check{" "}
                      </p>

                      <span className='text-body-xs text-netral-60'>
                        1h ago
                      </span>
                    </div>
                  </Link>
                </Menu.Item>
              </div>

              <footer className='flex items-center justify-end p-4'>
                <Link
                  href={"/notifications"}
                  className='text-body-sm font-medium text-netral-90'
                >
                  View all notifications
                </Link>
              </footer>
            </Menu.Items>
          </Transition>
        </Menu>

      

        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button className='flex items-center gap-7'>
            <section className='flex items-start gap-2'>

              <div className='space-y-1 text-left'>
                <h5 className='text-body-sm font-semibold text-white'>
                  {username}
                </h5>
                <p className='text-body-xs text-netral-50'>{role}</p>
              </div>
            </section>

            <CaretDownIcon className='h-6 w-6 text-netral-50' />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              as='div'
              className='absolute right-0 z-[9999] top-16 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-lg-10 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
              <div className='p-3'>
                <Menu.Item>
                  <Link
                    href={"/settings"}
                    className={
                      "flex items-center gap-2 rounded-lg-10 px-2 py-3 hover:bg-netral-20"
                    }
                  >
                    <GearSixIcon className='h-6 w-6 text-netral-60' />
                    <h5 className='text-body-base text-netral-90'>Settings</h5>
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link
                    href={"/login"}
                    className={
                      "flex items-center gap-2 rounded-lg-10 px-2 py-3 hover:bg-netral-20"
                    }
                  >
                    <SignOutIcon className='h-6 w-6 text-netral-60' />
                    <h5 onClick={()=>localStorage.clear()} className='text-body-base text-netral-90'>Logout</h5>
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>


      <div className='md:hidden flex items-center gap-1 md:gap-5'>
        <Menu as='div' className='relative inline-block text-left'>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              as='div'
              className='absolute right-0 top-16 mt-2 w-80 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-lg-10 bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
              {/* <nav className='flex items-center justify-between border-b border-netral-30 p-4'>
                <h5 className='text-body-lg font-medium text-netral-100'>
                  Notifications
                </h5>
              </nav> */}

              <div className='flex flex-col items-start'>
                <Menu.Item>
                  <Link
                    href={"/settings"}
                    className={
                      "relative flex w-full items-start gap-4 border-netral-30 p-4 hover:bg-primary-surface/25"
                    }
                  >
                    <div className='TickNotif absolute right-5 z-20 h-1.5 w-1.5 rounded-full bg-error-main 2xl:h-2 2xl:w-2'></div>
                    <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-netral-30/50'>
                      <BagIcon className='h-6 w-6 text-netral-100' />
                    </div>

                    <div className='flex flex-col items-start'>
                      <h5 className='mb-0.5 text-body-base font-semibold text-netral-100'>
                        New Order
                      </h5>

                      <p className='mb-1 w-56 truncate text-body-sm text-netral-50'>
                        There is a new order, check the order details
                      </p>

                      <span className='text-body-xs text-netral-60'>
                        1h ago
                      </span>
                    </div>
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link
                    href={"/settings"}
                    className={
                      "relative flex w-full items-start gap-4 border-b border-netral-30 p-4 hover:bg-primary-surface/25"
                    }
                  >
                    <div className='absolute right-5 z-20 h-1.5 w-1.5 rounded-full bg-error-main 2xl:h-2 2xl:w-2'></div>

                    <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-netral-30/50'>
                      <PackageIcon className='h-6 w-6 text-netral-100' />
                    </div>

                    <div className='flex flex-col items-start'>
                      <h5 className='mb-0.5 text-body-base font-semibold text-netral-100'>
                        Order Return
                      </h5>

                      <p className='mb-1 w-56 truncate text-body-sm text-netral-50'>
                        There is a returned order, check refund status{" "}
                      </p>

                      <span className='text-body-xs text-netral-60'>
                        1h ago
                      </span>
                    </div>
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link
                    href={"/settings"}
                    className={
                      "relative flex w-full items-start gap-4 border-b border-netral-30 p-4 hover:bg-primary-surface/25"
                    }
                  >
                    <div className='TickNotif absolute right-5 z-20 h-1.5 w-1.5 rounded-full bg-error-main 2xl:h-2 2xl:w-2'></div>
                    <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-netral-30/50'>
                      <TshirtIcon className='h-6 w-6 text-netral-100' />
                    </div>

                    <div className='flex flex-col items-start'>
                      <h5 className='mb-0.5 text-body-base font-semibold text-netral-100'>
                        Update Stock
                      </h5>

                      <p className='mb-1 w-56 truncate text-body-sm text-netral-50'>
                        There are several stock product updates, please check{" "}
                      </p>

                      <span className='text-body-xs text-netral-60'>
                        1h ago
                      </span>
                    </div>
                  </Link>
                </Menu.Item>
              </div>

              <footer className='flex items-center justify-end p-4'>
                <Link
                  href={"/notifications"}
                  className='text-body-sm font-medium text-netral-90'
                >
                  View all notifications
                </Link>
              </footer>
            </Menu.Items>
          </Transition>
        </Menu>

      

        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button className='flex items-center gap-7'>
            <section className='flex items-start gap-2'>

              <div className='space-y-1 text-left'>
                <h5 className='text-body-sm font-semibold text-white'>
                  {username}
                </h5>
                <p className='text-body-xs text-netral-50'>{role}</p>
              </div>
            </section>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              as='div'
              className='absolute right-0 z-[9999] top-16 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-lg-10 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
              <div className='p-3'>
                <Menu.Item>
                  <Link
                    href={"/settings"}
                    className={
                      "flex items-center gap-2 rounded-lg-10 px-2 py-3 hover:bg-netral-20"
                    }
                  >
                    <GearSixIcon className='h-6 w-6 text-netral-60' />
                    <h5 className='text-body-base text-netral-90'>Settings</h5>
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link
                    href={"/login"}
                    className={
                      "flex items-center gap-2 rounded-lg-10 px-2 py-3 hover:bg-netral-20"
                    }
                  >
                    <SignOutIcon className='h-6 w-6 text-netral-60' />
                    <h5 onClick={()=>localStorage.clear()} className='text-body-base text-netral-90'>Logout</h5>
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>



      
    </header>
  )
}

export default Topbar
