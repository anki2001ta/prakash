"use client";
import { Fragment } from "react";
import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/navigation";

const roles = [
  "Master",
  "Manager",
  "Merchant",
  "Country Admin",
  "Admin",
  "Sub Admin",
];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const LoginForm = () => {
  const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleClose = (value: any) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleListItemClick = (value: any) => {
    handleClose(value);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(formData, "form data");
    try {
      setIsLoading(true);
      let endpoint =
        selectedValue === "Master"
          ? "admin/super-admin"
          : selectedValue === "Manager"
          ? "admin/manager"
          : selectedValue === "Merchant"
          ? "merchant"
          : selectedValue === "Country Admin"
          ? "master-admin"
          : selectedValue === "Admin"
          ? "country-admin"
          : selectedValue === "Sub Admin"
          ? "country-sub-admin"
          : "";
      console.log(endpoint, "endpoint");
      const res = await fetch(`https://fun2fun.live/${endpoint}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "data");
      if (data?.status === 1) {
        setIsLoading(true);
        localStorage &&
          localStorage.setItem(`${endpoint}Token`, data?.data?.token);
        localStorage && localStorage.setItem(`username`, data?.data?.username);
        selectedValue && localStorage.setItem(`role`, selectedValue);
        router?.push("/");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="h-screen flex justify-center items-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#285710] via-[#4c9831] to-[#aedd92]" />
        <div className="absolute inset-0 flex justify-center items-center">
          <Image src="/useFun.png" alt="usefun" width={600} height={600} />
        </div>
        {selectedValue === "Master" ||
        selectedValue === "Manager" ||
        selectedValue === "Merchant" ||
        selectedValue === "Country Admin" ||
        selectedValue === "Admin" ||
        selectedValue === "Sub Admin" ? (
          <div className="w-[600px] h-[400px] bg-[#ffffff21] bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg z-10 flex flex-col justify-center items-center">
            <h2 className="text-2xl mb-4 font-semibold text-center text-white  underline-offset-1">
              USEFUN{" "}
              {selectedValue === "Master"
                ? "MASTER ADMIN LOGIN"
                : selectedValue === "Manager"
                ? "MANAGER LOGIN"
                : selectedValue === "Merchant"
                ? "MERCHANT LOGIN"
                : selectedValue === "Country Admin"
                ? "COUNTRY ADMIN LOGIN"
                : selectedValue === "Admin"
                ? "ADMIN LOGIN"
                : selectedValue === "Sub Admin"
                ? "SUB ADMIN LOGIN"
                : ""}
            </h2>
            <form className="space-y-4 w-full max-w-md" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white mt-4"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-[40px] placeholder-gray-300 text-gray-700 pl-2"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-[40px] placeholder-gray-300 text-gray-700 pl-2"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
              </div>
              <button
                type="submit"
                className="mt-4 p-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2f6416]"
              >
                {isLoading ? (
                  <>
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* dialog for role selection */}
      {open && (
        <Dialog
          open={open}
          sx={{
            "& .MuiPaper-root": {
              width: "80%",
              maxWidth: 500,
              bgcolor: "background.paper",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)",
              color: "white",
            },
          }}
        >
          <DialogTitle className="text-[#60ff04] text-center font-bold">
            Kindly Select Your Role
          </DialogTitle>
          <List>
            {roles.map((role) => (
              <ListItem disableGutters key={role}>
                <ListItemButton onClick={() => handleListItemClick(role)}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={role} sx={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Dialog>
      )}
    </Fragment>
  );
};

export default LoginForm;
