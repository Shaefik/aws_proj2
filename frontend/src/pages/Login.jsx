// import { useState } from "react";
// import API from "../api";
// import { useNavigate, Link } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await API.post("/users/login", form);

//     localStorage.setItem("token", res.data.token);

//     navigate("/dashboard");   

//   } catch (error) {
//     alert(error.response?.data?.message || "Invalid credentials");
//   }
// };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>

//       <input
//         name="name"
//         placeholder="Name"
//         value={form.name}
//         onChange={handleChange}
//       />

//       <input
//         name="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={handleChange}
//       />

//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={handleChange}
//       />

//       <button type="submit">Register</button>

//       <h6>
//         Already have an account?{" "}
//         <Link to="/login">Login</Link>
//       </h6>
//     </form>
//   );
// }

// export default Register;

import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
   <form className="login-form" onSubmit={handleSubmit}>
  <h2 className="login-title">Login</h2>

  <input
    className="login-input"
    name="email"
    placeholder="Email"
    value={form.email}
    onChange={handleChange}
  />

  <input
    className="login-input"
    name="password"
    type="password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
  />

  <button className="login-button" type="submit">
    Login
  </button>

  <h6 className="login-footer">
    Don't have an account?{" "}
    <Link className="register-link" to="/register">
      Register
    </Link>
  </h6>
</form>
  );
}

export default Login;