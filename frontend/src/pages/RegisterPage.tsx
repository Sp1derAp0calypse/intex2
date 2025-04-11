import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // state variables for email and passwords
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // state variable for error messages
  const [error, setError] = useState("");

  const handleLoginClick = () => {
    navigate("/login");
  };

  // handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // handle submit event for the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate email and passwords
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      // clear error message
      setError("");
      // post data to the /register api
      fetch(
        // "https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/register",
        "https://localhost:5000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      )
        //.then((response) => response.json())
        .then((data) => {
          // handle success or error from the server
          console.log(data);
          if (data.ok) setError("Successful registration. Please log in.");
          else setError("Error registering.");
        })
        .catch((error) => {
          // handle network error
          console.error(error);
          setError("Error registering.");
        });
    }
  };

  return (
    <div
      className="login-wrapper"
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
      <div className="login-card">
        <h5 className="text-center mb-4">Register</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 text-white">
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
          <div className="form-floating mb-3 text-white">
            <input
              className="form-control"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
            <label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </label>
          </div>
          <br />

          <div className="d-flex justify-content-center mb-3">
            <button
              className="nav-buttons"
              type="submit"
              style={{
                backgroundColor: "#c9a449", // Your logo yellow
                color: "black",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.375rem",
                fontWeight: 600,
                border: "none",
                width: "100%",
              }}
            >
              Register
            </button>
          </div>

          <div className="d-flex justify-content-center">
            <button
              className="nav-buttons bg-dark text-white"
              type="button"
              onClick={handleLoginClick}
              style={{ borderRadius: "5px", width: "100%" }}
            >
              Go to Login
            </button>
          </div>
        </form>
        <strong>{error && <p className="error">{error}</p>}</strong>
      </div>
    </div>
  );
}

export default Register;
