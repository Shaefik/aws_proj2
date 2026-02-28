import { useState } from "react";
import API from "../api";
import '../styles/auth.css';
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/register", form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <h2>Register</h2>

    //   <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
    //   <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
    //   <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />

    //   <button type="submit">Register</button>

    //   <h6>
    //     Already have an account? <Link to="/login">Login</Link>
    //   </h6>
    // </form>
     <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button className="auth-btn">Register</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;