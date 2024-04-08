import React, { useState, useEffect, ChangeEvent } from 'react';
import Select from 'react-select';
import { Input } from '../atomics';
import { countriesOptions } from '@/utils/country';

export interface EditFormData {
  username: string;
  userId: string;
  password: string;
  id:string;
  selectedCountry?:{
    label:string;
    value:string;
  }
}

interface EditManagerProps {
  formData: EditFormData | undefined;
  setOpenEditManagerModal: React.Dispatch<React.SetStateAction<boolean>>
  fetchData: () => Promise<void>
 
}

const initialFormState={
  username: '',
  userId: '',
  password: '',
  id:"",
  selectedCountry:{
    label:"",
    value:""
  }
}

export default function EditAdmin(props: EditManagerProps) {
  const [editFormData, setEditFormData] = useState<EditFormData>(initialFormState);
  console.log("edit for madata", editFormData)
  const [isLoading, setIsLoading] = useState<boolean>(false);
console.log(props, "props")
  useEffect(() => {

    console.log("props", props.formData)
    if (props.formData) {
      setEditFormData(props.formData);
    }
  }, [props.formData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof EditFormData) => {
    setEditFormData(prevState => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };


  
const handleEdit =async()=> {
  try {
    setIsLoading(true);
    const response = await fetch(`https://fun2fun.live/admin/official/update/${editFormData?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: editFormData?.username,
        userId: editFormData?.userId,
        password: editFormData?.password,
        countryCode:editFormData?.selectedCountry?.value
      })
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Country added successfully:', data);
      setEditFormData(initialFormState)
      props.fetchData()
    } else {
      console.error('Failed to add manager:', response.statusText);
      setEditFormData(initialFormState)
    }
  } catch (error) {
    console.error('Error adding manager:', error);
  } finally {
    setIsLoading(false);
    props.setOpenEditManagerModal(false)
    setEditFormData(initialFormState)
  }
}



  return (
    <div className="px-8 py-4 grid grid-cols-1 gap-x-5 gap-y-8">
      <Input
        id="username"
        placeholder="Enter User Name"
        label="User Name"
        variant="default"
        value={editFormData.username}
        onChange={(e) => handleInputChange(e, 'username')}
        modal
      />
            <div className="w-full">
        <label className="text-white text-body-base font-semibold mb-6">
          Country
        </label>
        <Select
          placeholder="Select Country"
          value={props?.formData?.selectedCountry}
          onChange={(selectedOption) => {
            setEditFormData(prevState => ({
              ...prevState,
              selectedCountry: selectedOption as { label: string; value: string }
            }));
          }}
          options={countriesOptions}
        />
      </div>


      <Input
        id="userid"
        placeholder="Enter User Id"
        label="Enter User Id"
        variant="default"
        value={editFormData.userId}
        onChange={(e) => handleInputChange(e, 'userId')}
        modal
      />

      <Input
        id="password"
        placeholder=""
        label="Password"
        variant="default"
        value={editFormData.password}
        onChange={(e) => handleInputChange(e, 'password')}
        modal
      />
         <div>
            <div className="w-full flex justify-end pr-2">
              <div className="flex gap-4 py-4">
                <button
                  onClick={() => props.setOpenEditManagerModal(false)}
                  className="px-4 py-2 hover:bg-[#f31260]/[0.2]  rounded-md text-[#f31260]"
                >
                  Cancel
                </button>
                {isLoading ? (
                  <div className="px-4 py-2" role="status">
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
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-4  py-2 hover:bg-netral-25/[0.2]  text-netral-25 rounded-md"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
    </div>
  );
}
