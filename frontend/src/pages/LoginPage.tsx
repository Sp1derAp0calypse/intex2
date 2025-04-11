import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/Back";

function LoginPage() {
  // state variables for email and passwords
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberme] = useState<boolean>(false);

  // state variable for error messages
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setRememberme(checked);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // handle submit event for the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const loginUrl = rememberme
      ? "https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/login?useCookies=true"
      : // "https://localhost:5000/login?useCookies=true"
        "https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/login?useSessionCookies=true";
    // "https://localhost:5000/login?useSessionCookies=true";

    try {
      // Step 1: Log the user in
      const response = await fetch(loginUrl, {
        method: "POST",
        credentials: "include", // ✅ Ensures cookies are sent & received
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Optional: Parse response if body exists
      let data = null;
      const contentLength = response.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Invalid email or password.");
      }

      // Step 2: Fetch current user's roles
      const roleResponse = await fetch(
        "https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/pingauth",
        // "https://localhost:5000/pingauth",
        {
          method: "GET",
          credentials: "include", // Important for accessing secure identity info
        }
      );

      if (!roleResponse.ok) {
        throw new Error("Failed to determine user role.");
      }

      const userData = await roleResponse.json();
      const roles = userData.roles || [];

      // Step 3: Redirect based on role
      if (roles.includes("Administrator")) {
        navigate("/adminmovies");
      } else {
        navigate("/landingPage");
      }
    } catch (error: any) {
      setError(error.message || "Error logging in.");
      console.error("Login process failed:", error);
    }
  };

  return (
    <div
      className="login-wrapper d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/placeholdeHomeNew.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <BackButton />
      <div className="login-card text-white">
        <h5 className="text-center mb-4">Sign In</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="text-white">
              Email address
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="text-white">
              Password
            </label>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <input
              className="custom-yellow-checkbox"
              type="checkbox"
              id="rememberme"
              name="rememberme"
              checked={rememberme}
              onChange={handleChange}
            />
            <label className="form-check-label ms-2" htmlFor="rememberme">
              Remember password
            </label>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <button
              className="nav-buttons"
              type="submit"
              style={{
                backgroundColor: "#c9a449",
                color: "black",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.375rem",
                fontWeight: 600,
                border: "none",
                width: "100%",
              }}
            >
              Sign in
            </button>
          </div>

          <p className="text-center mb-3">OR</p>

          <div className="d-flex justify-content-center mb-3">
            <button
              className="nav-buttons bg-dark text-white"
              type="button"
              onClick={handleRegisterClick}
              style={{ borderRadius: "5px", width: "100%" }}
            >
              Register
            </button>
          </div>
        </form>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
