// withAuth.tsx

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: React.ComponentType<any>) {
  return function WithAuth(props: any) {
    useEffect(() => {
      const token = localStorage.getItem("token");
      // Check if token exists
      if (!token) {
        redirect("/login"); // Redirect to login page if token doesn't exist
      }
    }, []); // Run this effect only once on component mount

    // Always render the wrapped component
    return <Component {...props} />;
  };
}
