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
import { AdminPanelSettings, Flag } from "@mui/icons-material";
import { Transition } from "@headlessui/react";
import React, { useLayoutEffect, useState } from "react";

interface SideBarProps {
  showSidebar: boolean;
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

const Sidebar: React.FC<SideBarProps> = ({ showSidebar, setShowSidebar }) => {
  const [showUsersMenu, setShowUsersMenu] = React.useState(false);
  const [showManager, setShowManager] = React.useState(false);
  const [showCountryAdmin, setShowCountryAdmin] = React.useState(false);
  const [showAdmin, setShowAdmin] = React.useState(false);
  const [showSubAdmin, setShowSubAdmin] = React.useState(false);
  const [showMerchant, setShowMerchant] = React.useState(false);
  const [coins, setCoins] = React.useState(false);
  const [role, setRole] = useState<string>("");

  useLayoutEffect(() => {
    const value = localStorage.getItem("role");
    if (value !== null) {
      setRole(value);
    }
  }, []);

  const isManager = role === "Manager";
  const isCountryAdmin = role === "Country Admin";
  const isAdmin = role === "Master";
  const isSubAdmin=role==="Admin"
  const isMerchant=role==="Merchant"

  return (
    <aside
      id="sidebar"
      className="hidden fixed 2xl:flex Sidebar min-h-screen mt-12 w-64 overflow-y-auto overflow-x-hidden bg-black px-6 py-4 pt-8 shadow-sm 2xl:w-80 2xl:pt-10"
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
        {isAdmin && (
          <SidebarMenu
            active={showUsersMenu}
            onClick={() => setShowUsersMenu(!showUsersMenu)}
            icon={<UsersIcon />}
            name="Users"
            variant="sub-menu"
          />
        )}

        {isAdmin && (
          <SidebarExpand show={showUsersMenu}>
            <SidebarMenu
              name="Add Official Users"
              variant="expand"
              href="/users/add-official-users"
            />

            <SidebarMenu
              name="View Users"
              variant="expand"
              href="/users/view-users"
            />

            <SidebarMenu
              name="Top Users"
              variant="expand"
              href="/users/top-users"
            />

            <SidebarMenu
              name="Push Notification"
              variant="expand"
              href="/users/push-notifications"
            />
          </SidebarExpand>
        )}

        {(isManager || isAdmin) && (
          <SidebarMenu
            active={showManager}
            onClick={() => setShowManager(!showManager)}
            icon={<ReceiptIcon />}
            name="Manager"
            variant="sub-menu"
          />
        )}

        {(isManager || isAdmin) && (
          <SidebarExpand show={showManager}>
            <SidebarMenu
              name="View Manager"
              variant="expand"
              href="/manager/view-manager"
            />
          </SidebarExpand>
        )}

        {(isAdmin || isManager)&& (
          <SidebarMenu
            active={showMerchant}
            onClick={() => setShowMerchant(!showMerchant)}
            icon={<UsersIcon/>}
            name="Merchant"
            variant="sub-menu"
          />
        )}

        {(isAdmin || isManager)&& (
          <SidebarExpand show={showMerchant}>
            <SidebarMenu
              name="View Merchant"
              variant="expand"
              href="/merchant/view-merchant"
            />
          </SidebarExpand>
        )}

        {(isAdmin ||isManager) && (
          <SidebarMenu
            active={showCountryAdmin}
            onClick={() => setShowCountryAdmin(!showCountryAdmin)}
            icon={<Flag />}
            name="Country Admin"
            variant="sub-menu"
          />
        )}

        {(isCountryAdmin || isAdmin || isManager) && (
          <SidebarExpand show={showCountryAdmin}>
            <SidebarMenu
              name="View Country Admin"
              variant="expand"
              href="/country-admin/view-country-admin"
            />
          </SidebarExpand>
        )}

        {(isCountryAdmin || isAdmin || isManager)&& (
          <SidebarMenu
            active={showAdmin}
            onClick={() => setShowAdmin(!showAdmin)}
            icon={<AdminPanelSettings />}
            name="Admin"
            variant="sub-menu"
          />
        )}

        {(isCountryAdmin || isAdmin || isManager)&& (
          <SidebarExpand show={showAdmin}>
            <SidebarMenu
              name="View Admin"
              variant="expand"
              href="/admin/view-admin"
            />
          </SidebarExpand>
        )}

{(isCountryAdmin || isAdmin || isManager || isSubAdmin)&& (
          <SidebarMenu
            active={showSubAdmin}
            onClick={() => setShowSubAdmin(!showSubAdmin)}
            icon={<UsersIcon/>}
            name="Sub Admin"
            variant="sub-menu"
          />
        )}

        {(isCountryAdmin || isAdmin || isManager || isSubAdmin)&& (
          <SidebarExpand show={showSubAdmin}>
            <SidebarMenu
              name="View Sub Admin"
              variant="expand"
              href="/sub-admin/view-subadmin"
            />
          </SidebarExpand>
        )}
{/* 
{(isMerchant) && (
          <SidebarMenu
            active={coins}
            onClick={() => setCoins(!coins)}
            icon={<UsersIcon/>}
            name="Seller"
            variant="sub-menu"
          />
        )}

        {(isMerchant) && (
          <SidebarExpand show={coins}>
            <SidebarMenu
              name="Coins"
              variant="expand"
              href="/merchant/view-merchant"
            />
          </SidebarExpand>
        )} */}

        
      </nav>
    </aside>
  );
};

export default Sidebar;
