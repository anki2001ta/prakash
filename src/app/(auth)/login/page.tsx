"use client";
import { Fragment } from "react";
import Image from "next/image";
import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const roles = ['Master', 'Manager', 'Merchant', 'Country Admin', 'Admin','Sub Admin'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const LoginForm = () => {
  
  const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [formData, setFormData] = React.useState({email:'', password:''});


  const handleClose = (value:any) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleListItemClick = (value:any) => {
    handleClose(value);
  };

  const handleLogin = async(e:any) => {
    e.preventDefault();
    console.log(formData,'form data');
    let endpoint = selectedValue === 'Master' ? 'super-admin' : selectedValue === 'Manager' ? 'manager' : selectedValue === 'Merchant' ? 'merchant' : selectedValue === 'Country Admin' ? 'master-admin' : selectedValue === 'Admin' ? 'country-admin' : selectedValue === 'Sub Admin' ? 'country-sub-admin' : '';
    console.log(endpoint,'endpoint');
    const res = await fetch(`https://techc2.be/${endpoint}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    console.log(data,'data');
    if(res && res.status === 200){
      // store token with role in local storage ie. masterToken, managerToken, merchantToken, countryAdminToken, adminToken, subAdminToken
      localStorage && localStorage.setItem(`${endpoint}Token`, res.data.token);
      // redirect to dashboard
      window.location.href = '/';
    }
    
  }
  

  return (
    <Fragment>
      <div className="h-screen flex justify-center items-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#285710] via-[#4c9831] to-[#aedd92]" />
        <div className="absolute inset-0 flex justify-center items-center">
          <Image src="/useFun.png" alt="usefun" width={600} height={600} />
        </div>
        {selectedValue === 'Master' || selectedValue === 'Manager' || selectedValue === 'Merchant' || selectedValue === 'Country Admin' || selectedValue === 'Admin' || selectedValue === 'Sub Admin' ?
        <div className="w-[600px] h-[400px] bg-[#ffffff21] bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg z-10 flex flex-col justify-center items-center">
          <h2 className="text-2xl mb-4 font-semibold text-center text-white  underline-offset-1">
            USEFUN {selectedValue === 'Master' ? 'MASTER ADMIN LOGIN' : selectedValue === 'Manager' ? 'MANAGER LOGIN' : selectedValue === 'Merchant' ? 'MERCHANT LOGIN' : selectedValue === 'Country Admin' ? 'COUNTRY ADMIN LOGIN' : selectedValue === 'Admin' ? 'ADMIN LOGIN' : selectedValue === 'Sub Admin' ? 'SUB ADMIN LOGIN' : ''}
          </h2>
          <form className="space-y-4 w-full max-w-md" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mt-4"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-[40px] placeholder-gray-300 text-gray-700 pl-2"
                placeholder="Enter your email"
                onChange={(e) => { setFormData({...formData, email:e.target.value})}}
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
                onChange={(e) => { setFormData({...formData, password:e.target.value})}}
              />
            </div>
            <button
              type="submit"
              className="mt-4 p-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2f6416] hover:bg-[#4c9831] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4c9831]"
            >
              Sign In
            </button>
          </form>
        </div> : ''
        }
        
        

      </div>

      {/* dialog for role selection */}
      { open &&
        <Dialog  open={open}
        sx={{ '& .MuiPaper-root': { width: '80%', maxWidth: 500, bgcolor: 'background.paper', backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)', color: 'white' } }} 
        >
        <DialogTitle
        className="text-[#60ff04] text-center font-bold"
        >Kindly Select Your Role</DialogTitle>
        <List>
          {roles.map((role) => (
            <ListItem disableGutters key={role}>
              <ListItemButton onClick={() => handleListItemClick(role)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={role} sx={{color:'white'}}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
      }
    </Fragment>
  );
};

export default LoginForm;
