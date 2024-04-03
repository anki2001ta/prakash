import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function withAuth(Component: React.ComponentType<any>) {
  return function WithAuth(props: any) {
    const [checkedToken, setCheckedToken] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      // Check if token exists
      if (!token) {
        redirect("/login"); // Redirect to login page if token doesn't exist
      } else {
        setCheckedToken(true); // Mark token check as complete if token exists
      }
    }, []); // Run this effect only once on component mount

    // Render null until token check is complete
    if (!checkedToken) {
      return null;
    }

    // Render the wrapped component if token exists and check is complete
    return <Component {...props} />;
  };
}
