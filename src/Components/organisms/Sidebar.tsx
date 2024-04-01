"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Transition } from "@headlessui/react";

import {
  AppWindowIcon,
  HouseSimpleIcon,
  ImagesIcon,
  LockSimpleIcon,
  PackageIcon,
  ReceiptIcon,
  StoreFrontIcon,
  TagIcon,
  UserCircleIcon,
  UsersIcon,
} from "@/assets/icons";

import { SidebarMenu } from "@/components/moleculs";
import { NijaLogo } from "@/assets/brands";
import Image from "next/image";
import { Flag } from "@mui/icons-material";

interface SideBarProps{
  showSidebar:boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarExpand: React.FC<{
  children?: React.ReactNode;
  show?: boolean;
}> = ({ children, show }) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={"w-full"}
    >
      <section className="relative flex w-full items-start gap-4">
        <div className="absolute left-6 h-full w-px bg-netral-30" />
        <div className="flex w-full flex-col items-start justify-end gap-2 pl-9">
          {children}
        </div>
      </section>
    </Transition>
  );
};

const Sidebar: React.FC<SideBarProps>=({showSidebar, setShowSidebar})=> {
  const [showUsersMenu, setShowUsersMenu] = React.useState(false);
  const [showProductsMenu, setShowProductsMenu] = React.useState(false);
  const [showTransactionsMenu, setShowTransactionsMenu] = React.useState(false);
  const [showAuthMenu, setShowAuthMenu] = React.useState(false);
  const [showAgency, setShowAgencyMenu] = React.useState(false);
  const [showShop, setShowShop] = React.useState(false);
  const [showGift, setShowGift] = React.useState(false);
  const [showManager, setShowManager] = React.useState(false);
  const [showCountryAdmin, setShowCountryAdmin] = React.useState(false);


  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const value = localStorage.getItem("role");
    if (value !== null) {
      setRole(value);
    }
  }, []);

  return ( 

  <aside
  id="sidebar"
  className="hidden 2xl:flex Sidebar h-full  mt-12 w-64 overflow-y-auto overflow-x-hidden bg-black px-6 py-4 pt-8 shadow-sm 2xl:w-96 2xl:pt-10"
  style={{
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}

>


  <nav className="mt-10 flex w-full flex-col items-start gap-3">
    <SidebarMenu
      icon={<HouseSimpleIcon />}
      name="HOME"
      variant="default"
      href="/"
      exact
    />
    {/* Users */}
    {role !== "Manager" && (
      <SidebarMenu
        active={showUsersMenu}
        onClick={() => setShowUsersMenu(!showUsersMenu)}
        icon={<UsersIcon />}
        name="Users"
        variant="sub-menu"
      />
    )}

    <SidebarExpand show={showUsersMenu}>
      <SidebarMenu
        name="Add Official  Users"
        variant="expand"
        href="/users/add-official-users"
      />

      <SidebarMenu
        name="View  Users"
        variant="expand"
        href="/users/view-users"
      />

      <SidebarMenu
        name="Top  Users"
        variant="expand"
        href="/users/top-users"
      />

      <SidebarMenu
        name="Push Notification"
        variant="expand"
        href="/users/push-notifications"
      />
    </SidebarExpand>
    {role !== "Manager" && (
      <SidebarMenu
        active={showManager}
        onClick={() => setShowManager(!showManager)}
        icon={<ReceiptIcon />}
        name="Manager"
        variant="sub-menu"
      />
    )}

    <SidebarExpand show={showManager}>
      <SidebarMenu
        name="View Manager"
        variant="expand"
        href="/manager/view-manager"
      />
    </SidebarExpand>

    <SidebarMenu
      active={showCountryAdmin}
      onClick={() => setShowCountryAdmin(!showCountryAdmin)}
      icon={<Flag />}
      name="Country Admin"
      variant="sub-menu"
    />

    <SidebarExpand show={showCountryAdmin}>
      <SidebarMenu
        name="View Country Admin"
        variant="expand"
        href="/country-admin/view-country-admin"
      />
    </SidebarExpand>

    {/* Hosts */}

    {/* <SidebarMenu
      active={showTransactionsMenu}
      onClick={() => setShowTransactionsMenu(!showTransactionsMenu)}
      icon={<ReceiptIcon />}
      name="Host" 
      variant="sub-menu"
    />

    <SidebarExpand show={showTransactionsMenu}>
      <SidebarMenu
        name="Approved Host"
        variant="expand"
        href="/host/approved-host"
      />
      <SidebarMenu
        name="Pending Host"
        variant="expand"
        href="/host/pending-host"
      />

      <SidebarMenu
        name="Rejected Host"
        variant="expand"
        href="/host/rejected-host"
      />
      <SidebarMenu
        name="Host Reports"
        variant="expand"
        href="/host/host-reports"
      />
    </SidebarExpand> */}

    {/* AGENCY */}

    {/* <SidebarMenu
      active={showAgency}
      onClick={() => setShowAgencyMenu(!showAgency)}
      icon={<ReceiptIcon />}
      name="Agency"
      variant="sub-menu"
    />

    <SidebarExpand show={showAgency}>
      <SidebarMenu
        name="Add Agency"
        variant="expand"
        href="/agency/add-agency"
      />
      <SidebarMenu
        name="View Agency"
        variant="expand"
        href="/agency/agency-reports"
      />

      <SidebarMenu
        name="Top Agency"
        variant="expand"
        href="/agency/banned-agency"
      />
      <SidebarMenu
        name="Banned Agency"
        variant="expand"
        href="/agency/top-agency"
      />

      <SidebarMenu
        name="Agency Reports"
        variant="expand"
        href="/agency/view-agency"
      />
    </SidebarExpand> */}

    {/* Shop */}
    {/* 
    <SidebarMenu
      active={showShop}
      onClick={() => setShowShop(!showShop)}
      icon={<ReceiptIcon />}
      name="Shop"
      variant="sub-menu"
    /> */}

    {/* <SidebarExpand show={showShop}>
      <SidebarMenu
        name="Add Room Wallpaper"
        variant="expand"
        href="/transactions/manage-transaction"
      />
      <SidebarMenu
        name="View Room Wallpaper"
        variant="expand"
        href="/transactions/manage-return"
      />

      <SidebarMenu
        name="Add Frames"
        variant="expand"
        href="/transactions/manage-return"
      />
      <SidebarMenu
        name="View Frames"
        variant="expand"
        href="/transactions/manage-return"
      />

      <SidebarMenu
        name="Add Vehicle"
        variant="expand"
        href="/transactions/manage-return"
      />

      <SidebarMenu
        name="View Vehicle"
        variant="expand"
        href="/transactions/manage-transaction"
      />

      <SidebarMenu
        name="Add Chat Bubble"
        variant="expand"
        href="/transactions/manage-return"
      />
      <SidebarMenu
        name="View Chat Bubble"
        variant="expand"
        href="/transactions/manage-return"
      />

      <SidebarMenu
        name="Add Special Id"
        variant="expand"
        href="/transactions/manage-transaction"
      />
      <SidebarMenu
        name="View Special Id"
        variant="expand"
        href="/transactions/manage-return"
      />

      <SidebarMenu
        name="Add Vip"
        variant="expand"
        href="/transactions/manage-transaction"
      />
      <SidebarMenu
        name="View Vip"
        variant="expand"
        href="/transactions/manage-return"
      />
      <SidebarMenu
        name="Add Svip"
        variant="expand"
        href="/transactions/manage-return"
      />

      <SidebarMenu
        name="View Svip"
        variant="expand"
        href="/transactions/manage-return"
      />

      <SidebarMenu
        name="Relationship"
        variant="expand"
        href="/transactions/manage-return"
      />
      <SidebarMenu
        name="Lock Room"
        variant="expand"
        href="/transactions/manage-return"
      />
      <SidebarMenu
        name="Extra Seats"
        variant="expand"
        href="/transactions/manage-return"
      />
    </SidebarExpand> */}

    {/* Gifts */}

    {/* <SidebarMenu
      active={showGift}
      onClick={() => setShowGift(!showGift)}
      icon={<ReceiptIcon />}
      name="Gift"
      variant="sub-menu"
    />

    <SidebarExpand show={showGift}>
      <SidebarMenu
        name="Add Gift Category"
        variant="expand"
        href="/transactions/manage-transaction"
      />
      <SidebarMenu
        name="View Gift Category"
        variant="expand"
        href="/transactions/manage-return"
      />
      <SidebarMenu
        name="Add Gift"
        variant="expand"
        href="/transactions/manage-transaction"
      />
      <SidebarMenu
        name="View Gift"
        variant="expand"
        href="/transactions/manage-return"
      />
    </SidebarExpand>

    <SidebarMenu
      active={showAuthMenu}
      onClick={() => setShowAuthMenu(!showAuthMenu)}
      icon={<LockSimpleIcon />}
      name="Authentications"
      variant="sub-menu"
    />

    <SidebarExpand show={showAuthMenu}>
      <SidebarMenu name="Login" variant="expand" href="/auth/login" />
      <SidebarMenu name="Register" variant="expand" href="/auth/register" />

      <SidebarMenu
        name="Forgot Password"
        variant="expand"
        href="/auth/forgot-password"
      />
      <SidebarMenu
        name="Verify Email"
        variant="expand"
        href="/auth/verify-email"
      />
      <SidebarMenu
        name="New Password"
        variant="expand"
        href="/auth/new-password"
      />
      <SidebarMenu
        name="Reset Success"
        variant="expand"
        href="/auth/success-reset"
      />
    </SidebarExpand> */}
  </nav>
</aside>
  )
};

export default Sidebar;
