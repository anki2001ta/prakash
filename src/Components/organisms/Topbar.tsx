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

const Topbar: React.FC = () => {
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
      className={`relative flex w-full items-center justify-between
      bg-black px-8 py-4 shadow-sm`}
    >
      <div className='relative w-[24rem]'>
        {/* <MagnifyingGlassIcon className='absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 stroke-netral-80 stroke-1.5 text-netral-80' />

        <input
          type='text'
          className='w-full rounded-lg border border-netral-20 bg-netral-20/75 px-3.5 py-2.5 pl-12 text-body-base font-normal text-netral-80 outline-none ring-2 ring-transparent transition-all duration-300 ease-out placeholder:text-netral-50 focus:border-primary-main focus:ring-primary-surface'
          placeholder='What are you looking for'
        /> */}
      </div>

      <div className='flex items-center gap-5'>
        <Menu as='div' className='relative inline-block text-left'>
          {/* <Menu.Button className='relative'>
            <div className='absolute -right-0 -top-0 h-3 w-3 rounded-full bg-error-main text-[8px] font-bold leading-[10px] text-white'>
              9
            </div>
            <BellSimpleIcon className='h-6 w-6 text-netral-50' />
          </Menu.Button> */}

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
              {/* <div className='relative h-10 w-10 overflow-hidden rounded-full'>
              <Image src="data:image/jpeg;base64,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" alt="usefun" width={60} height={60} />
              </div> */}

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
              className='absolute right-0 top-16 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-lg-10 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
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
