"use client";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useMediaQuery } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import Image from "next/image";
import { Close, Flag } from "@mui/icons-material";
import { SidebarMenu } from "../moleculs";
import { HouseSimpleIcon, ReceiptIcon, UsersIcon } from "@/assets/icons";

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

const OverLaySideBar: React.FC<SideBarProps> = ({
  showSidebar,
  setShowSidebar,
}) => {
  const [role, setRole] = useState<string>("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showUsersMenu, setShowUsersMenu] = React.useState(false);
  const [showProductsMenu, setShowProductsMenu] = React.useState(false);
  const [showTransactionsMenu, setShowTransactionsMenu] = React.useState(false);
  const [showAuthMenu, setShowAuthMenu] = React.useState(false);
  const [showAgency, setShowAgencyMenu] = React.useState(false);
  const [showShop, setShowShop] = React.useState(false);
  const [showGift, setShowGift] = React.useState(false);
  const [showManager, setShowManager] = React.useState(false);
  const [showCountryAdmin, setShowCountryAdmin] = React.useState(false);

  useEffect(() => {
    const value = localStorage.getItem("role");
    if (value !== null) {
      setRole(value);
    }
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setShowSidebar(open);
  };

  const DrawerList = (
    <div className="bg-black h-screen w-72">
      <div className="flex items-center justify-between px-2 py-4 ">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/useFun.png"
            alt="usefun"
            width={600}
            height={600}
            className="h-7 w-7 2xl:h-8 2xl:w-8"
          />
          <h5 className="text-body-xl font-semibold text-white uppercase">
            DASHBOARD
          </h5>
        </Link>
        <div className="" onClick={() => setShowSidebar(!showSidebar)}>
          <Close className="text-white" />
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col items-start gap-3">
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
      icon={<Flag/>}
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
      </div>
    </div>
  );

  return (
    <Drawer
      anchor="left"
      open={showSidebar && isMobile}
      onClose={toggleDrawer(false)}
    >
      {DrawerList}
    </Drawer>
  );
};

export default OverLaySideBar;
