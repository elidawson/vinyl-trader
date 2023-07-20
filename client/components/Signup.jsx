import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import '../stylesheets/forms.css'

export default function Signup({ setUser }) {
  const navigate = useNavigate();

  const formSchema = yup.object({
    username: yup.string(),
    password: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("please try again");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);
          navigate("/");
        })
        .catch((error) => alert(error));
    },
  });

  return (
    <div className="form-container">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h1>signup</h1>
        <label>username</label>
        <br />
        <input
          value={formik.values.username}
          onChange={formik.handleChange}
          type="text"
          name="username"
          autoComplete="off"
        />
        <br />
        <label>password</label>
        <br />
        <input
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          name="password"
        />
        <br />
        <button type="submit" value="signup" className="button">signup</button>
      </form>
      <p>already have an account?</p>
      <Link to="/login" className="button">
        login
      </Link>
    </div>
  );
}
