import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // state variables for email and passwords
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // state variables for error messages
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]); // for password validation errors

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // clear previous errors
    setError("");
    setPasswordErrors([]);

    // validate email and passwords
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return; // Prevent form submission if validation fails
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        // Handle server errors (e.g., 500, 404)
        setError("Server error occurred.");
        return;
      }

      // Check if the response body is empty
      const data = await response.text(); // Get the raw response text first

      // if (!data) {
      //   // Handle the case where the response body is empty
      //   setError("Error: Empty response from server.");
      //   return;
      // }

      // Now try to parse the response as JSON
      const parsedData = JSON.parse(data);

      if (parsedData.errors) {
        // Handle password-specific validation errors
        if (parsedData.errors.PasswordTooShort) {
          setPasswordErrors((prevErrors) => [
            ...prevErrors,
            "Password must be at least 6 characters.",
          ]);
        }
        if (parsedData.errors.PasswordRequiresNonAlphanumeric) {
          setPasswordErrors((prevErrors) => [
            ...prevErrors,
            "Password must have at least one non-alphanumeric character.",
          ]);
        }
        if (parsedData.errors.PasswordRequiresDigit) {
          setPasswordErrors((prevErrors) => [
            ...prevErrors,
            "Password must have at least one digit ('0'-'9').",
          ]);
        }
        if (parsedData.errors.PasswordRequiresUpper) {
          setPasswordErrors((prevErrors) => [
            ...prevErrors,
            "Password must have at least one uppercase letter ('A'-'Z').",
          ]);
        }

        // Check for email already exists error
        if (parsedData.errors.EmailAlreadyExists) {
          setError(
            "Email already taken. Please use a different email address."
          );
        }
      } else if (parsedData.ok) {
        setError("Successful registration. Please log in.");
        navigate("/login"); // Optionally navigate after successful registration
      } else {
        setError("Error registering.");
      }
    } catch (error) {
      // handle network error
      console.error(error);
      setError("Error registering.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card border-0 shadow rounded-3 ">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Register
            </h5>
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
                <label htmlFor="email">Email address</label>
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
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>

              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  onClick={handleLoginClick}
                >
                  Go to Login
                </button>
              </div>
            </form>

            {/* Display general error message */}
            <strong>{error && <p className="error">{error}</p>}</strong>

            {/* Display password-specific error messages */}
            {passwordErrors.length > 0 && (
              <div className="password-errors">
                <ul>
                  {passwordErrors.map((error, index) => (
                    <li key={index} className="text-danger">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
