"use client";
import withAuth from "@/Components/withAuth";
import { Button, Title } from "@/components/atomics";
import Form from "@/components/ui/form";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Page = () => {
  const [formData, setFormData] = React.useState({
    userId: '',
    officialId: ''
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!formData.officialId) {
      toast.error("Plase select a officialId")
      return
    }
    if (!formData.userId) {
      toast.error("Plase select a userId")
      return
    }

    try {
      const response = await fetch('https://techc2.be/admin/make/officialUser', {
        method: 'POST',
        body: JSON.stringify({
          userId: formData.userId,
          officialId: formData.officialId
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setFormData({
          userId: '',
          officialId: ''
        });
        toast.success('Id added successfully')
      } else {
        toast.error('Error submitting Level');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error('Error submitting data');
    }

  }

  return (
    <div className="mt-28 p-6 space-y-6">
      <ToastContainer 
      autoClose={1000}
      position="bottom-right"
      />
      <section className="relative p-6 bg-white rounded-lg-10">
        <nav className="flex items-center justify-between mb-8">
          <Title size="lg" variant="default">
            <p className="text-netral-25">Add Official User</p>
          </Title>
        </nav>
        {/* Input section */}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-x-32">
            <input
              type="text"
              required
              placeholder="User Id"
              className="block max-w-md w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            />
            <input
              type="text"
              required
              placeholder="Official Id"
              className="block max-w-md w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.officialId}
              onChange={(e) => setFormData({ ...formData, officialId: e.target.value })}
            />
          </div>
          <button className="text-sm rounded-md bg-netral-20 px-2 py-1 text-netral-25 bg-netral-35 h-10 w-full mt-8" type="submit">
            ADD OFFICIAL USER
          </button>
        </form>
      </section>
    </div>
  );
};

export default withAuth(Page)
