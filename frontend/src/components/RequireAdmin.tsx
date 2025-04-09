import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("https://localhost:5000/pingauth", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Unauthorized");

        const data = await response.json();
        if (data.roles && data.roles.includes("Administrator")) {
          setAuthorized(true);
        } else {
          navigate("/userHomePage"); // or a 403 page
        }
      } catch (err) {
        console.error("Access denied:", err);
        navigate("/login");
      } finally {
        setChecking(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (checking) return <p>Checking access...</p>;
  return authorized ? children : null;
};

export default RequireAdmin;
