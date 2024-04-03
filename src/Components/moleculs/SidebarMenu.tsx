"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { CaretDownIcon } from "@/assets/icons"

interface SidebarMenu {
  active?: boolean
  href?: string
  icon?: React.ReactNode
  name: string
  onClick?: any
  variant: "default" | "sub-menu" | "expand"
  exact?: boolean
}

const SidebarMenu: React.FC<SidebarMenu> = ({
  active,
  href,
  icon,
  name,
  onClick,
  variant,
  exact,
}) => {
 
  const currentActive = usePathname()
  return (
    <>
      {variant === "default" && (
        <Link
          href={`${href}`}
          className={`relative flex w-full items-center justify-between gap-3${
            exact
              ? href === currentActive
                ? "bg-netral-20 w-[200px] text-netral-25"
                : "bg-gray-900 w-[200px] text-netral-25"
              : currentActive?.includes(`${href}`)
              ? "bg-netral-20 w-[200px] text-primary-main"
              : "bg-black w-[200px] text-netral-25"
          }
          } p-3 transition-all duration-300 ease-out hover:bg-neutral-25`}
        >
          <div className='flex items-center gap-3'>
            <span className='[&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-2 2xl:[&>svg]:h-6 2xl:[&>svg]:w-6 text-netral-25'>
              {icon}
            </span>

            <span className='text-body-sm text-[#9acd32] font-medium 2xl:font-semibold'>
              {name}
            </span>
          </div>
        </Link>
      )}

      {variant === "sub-menu" && (
        <button
          type='button'
          onClick={() => {
            onClick()
          }}
          className={`relative flex w-full items-center justify-between gap-3 rounded-lg-10 ${
            active ? " text-netral-25" : " text-netral-25"
          } p-3 transition-all duration-300 ease-out hover:bg-gray-900`}
        >
          <div className='flex items-center gap-3'>
            <span className='[&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-2 2xl:[&>svg]:h-6 2xl:[&>svg]:w-6'>
              {icon}
            </span>

            <span className='text-body-sm font-medium 2xl:font-semibold'>
              {name}
            </span>
          </div>

          <CaretDownIcon
            className={`h-5 w-5 2xl:h-6 2xl:w-6 ${
              active ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      )}

      {variant === "expand" && (
      <div className="w-[200px]">
          <Link
          href={`${href}`}
          className={`relative flex  w-full items-center justify-between gap-3 rounded-lg-10 ${
            currentActive.includes(`${href}`)
              ? "bg-netral-20 w-[200px] text-netral-25"
              : "text-netral-10 w-[200px]"
          }  p-3 transition-all duration-300 ease-out hover:bg-gray-900`}
        >
          <span className='text-body-sm font-medium 2xl:font-semibold'>
            {name}
          </span>
        </Link>
      </div>
      )}
    </>
  )
}

export default SidebarMenu
