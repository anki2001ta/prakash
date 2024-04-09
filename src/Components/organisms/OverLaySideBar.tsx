"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showUsersMenu, setShowUsersMenu] = React.useState(false);
  const [showManager, setShowManager] = React.useState(false);
  const [showCountryAdmin, setShowCountryAdmin] = React.useState(false);
  const [role, setRole] = useState<string>("");
  const [showSubAdmin, setShowSubAdmin] = React.useState(false);
  const [showMerchant, setShowMerchant] = React.useState(false);

  useLayoutEffect(() => {
    const value = localStorage.getItem("role");
    if (value !== null) {
      setRole(value);
    }
  }, []);

  const isManager = role === "Manager";
  const isCountryAdmin = role === "Country Admin";
  const isAdmin = role === "Master";
  const isSubAdmin = role === "Admin";
  const isMerchant = role === "Merchant";

  const toggleDrawer = (open: boolean) => () => {
    setShowSidebar(open);
  };

  const DrawerList = (
    <div className="bg-black h-screen w-72 z-50">
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
      <nav className="mt-10 flex px-2 w-full flex-col items-start gap-3">
        <div className="w-full" onClick={() => setShowSidebar(false)}>
          <SidebarMenu
            icon={<HouseSimpleIcon />}
            name="HOME"
            variant="default"
            href="/"
            exact
          />
        </div>
        {/* Users */}
        {role !== "Manager" && role !== "Admin" && (
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
            <div className="w-[80%]" onClick={() => setShowSidebar(false)}>
              <SidebarMenu
                name="Add Official  Users"
                variant="expand"
                href="/users/add-official-users"
              />
            </div>

            <div onClick={() => setShowSidebar(false)}>
              <SidebarMenu
                name="View  Users"
                variant="expand"
                href="/users/view-users"
              />
            </div>

            <div className="w-[80%]" onClick={() => setShowSidebar(false)}>
              <SidebarMenu
                name="Top  Users"
                variant="expand"
                href="/users/top-users"
              />
            </div>

            <div onClick={() => setShowSidebar(false)}>
              <SidebarMenu
                name="Push Notification"
                variant="expand"
                href="/users/push-notifications"
              />
            </div>
          </SidebarExpand>
        )}

        {/* {role !== "Admin" && (
          <SidebarExpand show={showUsersMenu}>
            <div className="w-[80%]"  onClick={() => setShowSidebar(false)}>
              <SidebarMenu
                name="Add Official  Users"
                variant="expand"
                href="/users/add-official-users"
              />
            </div>

            <div onClick={() => setShowSidebar(false)}>
              <SidebarMenu
                name="View  Users"
                variant="expand"
                href="/users/view-users"
              />
            </div>

            <div className="w-[80%]"  onClick={() => setShowSidebar(false)}>
              <SidebarMenu
                name="Top  Users"
                variant="expand"
                href="/users/top-users"
              />
            </div>

            <div onClick={() => setShowSidebar(false)}>
              <SidebarMenu
                name="Push Notification"
                variant="expand"
                href="/users/push-notifications"
              />
            </div>
          </SidebarExpand>
        )} */}
        {(isManager || isAdmin) && (
          <SidebarMenu
            active={showManager}
            onClick={() => setShowManager(!showManager)}
            icon={<ReceiptIcon />}
            name="Manager"
            variant="sub-menu"
          />
        )}

        {(isAdmin || isManager) && (
          <SidebarMenu
            active={showMerchant}
            onClick={() => setShowMerchant(!showMerchant)}
            icon={<UsersIcon />}
            name="Merchant"
            variant="sub-menu"
          />
        )}

        {(isAdmin || isManager) && (
          <SidebarExpand show={showMerchant}>
            <SidebarMenu
              name="View Merchant"
              variant="expand"
              href="/merchant/view-merchant"
            />
          </SidebarExpand>
        )}
         {(isMerchant) && (
          <SidebarMenu
            active={showMerchant}
            onClick={() => setShowMerchant(!showMerchant)}
            icon={<UsersIcon />}
            name="Merchant"
            variant="sub-menu"
          />
        )}

        {(isMerchant) && (
          <SidebarExpand show={showMerchant}>
            <SidebarMenu
              name="View Merchant"
              variant="expand"
              href="/merchant/view-merchant"
            />
          </SidebarExpand>
        )}


        {/*
        
        <SidebarExpand show={showManager}>
          <div className="w-[80%]"  onClick={() => setShowSidebar(false)}>
            <SidebarMenu
              name="View Manager"
              variant="expand"
              href="/manager/view-manager"
            />
          </div>
        </SidebarExpand>
        
        */}

        {(isManager || isAdmin) && (
          <SidebarExpand show={showManager}>
            <div className="w-[80%]" onClick={() => setShowSidebar(false)}>
              <SidebarMenu
                name="View Manager"
                variant="expand"
                href="/manager/view-manager"
              />
            </div>
          </SidebarExpand>
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

        <SidebarExpand show={showCountryAdmin}>
          <div className="w-[80%]" onClick={() => setShowSidebar(false)}>
            <SidebarMenu
              name="View Country Admin"
              variant="expand"
              href="/country-admin/view-country-admin"
            />
          </div>
        </SidebarExpand>

        {(isCountryAdmin || isAdmin || isManager || isSubAdmin) && (
          <SidebarMenu
            active={showSubAdmin}
            onClick={() => setShowSubAdmin(!showSubAdmin)}
            icon={<UsersIcon />}
            name="Sub Admin"
            variant="sub-menu"
          />
        )}

        {(isCountryAdmin || isAdmin || isManager || isSubAdmin) && (
          <SidebarExpand show={showSubAdmin}>
            <SidebarMenu
              name="View Sub Admin"
              variant="expand"
              href="/sub-admin/view-subadmin"
            />
          </SidebarExpand>
        )}

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
    </div>
  );

  return (
    showSidebar && (
      <Drawer
        anchor="left"
        open={showSidebar && isMobile}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    )
  );
};

export default OverLaySideBar;
