import React from "react";
import { useForm } from "./useForm";

const App = () => {
  const [values, handleChange] = useForm({ email: "", password: "" });
  const [values2, handleChange2] = useForm({ firstName: "", lastName: "" });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Login Form</h2>

      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
        style={{ margin: "5px", padding: "8px" }}
      />
      <br />

      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
        style={{ margin: "5px", padding: "8px" }}
      />
      <br />

      <p>Email: {values.email}</p>
      <p>Password: {values.password}</p>

      <hr />

      <h2>User Info Form</h2>

      <input
        name="firstName"
        value={values2.firstName}
        onChange={handleChange2}
        placeholder="First Name"
        style={{ margin: "5px", padding: "8px" }}
      />
      <br />

      <input
        name="lastName"
        value={values2.lastName}
        onChange={handleChange2}
        placeholder="Last Name"
        style={{ margin: "5px", padding: "8px" }}
      />
      <br />

      <p>
        Full Name: {values2.firstName} {values2.lastName}
      </p>
    </div>
  );
};

export default App;
