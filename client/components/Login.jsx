import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import '../stylesheets/forms.css'

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const formSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("incorrect username or password");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);
          navigate("/");
        })
        .catch((error) => alert(error.message));
    },
  });

  return (
    <div className="form-container">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h1>login</h1>
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
        <button type="submit" value="login" className="button">login</button>
      </form>
      <p>don't have an account?</p>
      <Link to="/signup" className="small-button">
        signup
      </Link>
    </div>
  );
}
