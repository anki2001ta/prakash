import { useState, useEffect, useLayoutEffect } from "react";
import { redirect } from "next/navigation";

export default function withAuth(Component: React.ComponentType<any>) {
  return function WithAuth(props: any) {
    const [checkedToken, setCheckedToken] = useState(false);

    useLayoutEffect(() => {
      const token = localStorage.getItem("token");
      // Check if token exists
      if (!token) {
        redirect("/login"); // Redirect to login page if token doesn't exist
      }
      setCheckedToken(true); // Mark token check as complete
    }, []); // Run this effect only once on component mount

    // Render null if token check is not complete
    if (!checkedToken) {
      return null;
    }

    // Always render the wrapped component if token exists and check is complete
    return <Component {...props} />;
  };
}
