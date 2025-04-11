import { JSX, useEffect, useState } from "react";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch(
          "https://localhost:5000/pingauth",
          // "https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/pingauth",
          {
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Unauthorized");

        const data = await response.json();
        if (data.roles && data.roles.includes("Administrator")) {
          setAuthorized(true);
        }
      } catch (err) {
        console.error("Access denied:", err);
      } finally {
        setChecking(false);
      }
    };

    checkAdmin();
  }, []);

  if (checking) return null;

  return authorized ? children : null;
};

export default RequireAdmin;
