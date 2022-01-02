import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formError, setFormError] = useState("");
  const [signUp, setsignUp] = useState(false);
  const [registering, setRegistering] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleRegister = async () => {
    try {
      setRegistering(true);
      const registerResponse = await axios.post(
        "https://invest-with-tribe.herokuapp.com/api/users",
        {
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
        }
      );

      const emailResponse = await axios.post(
        "https://invest-with-tribe.herokuapp.com/api/users/email",
        {
          username: formValues.username,
          email: formValues.email,
        }
      );

      setsignUp(true);
      setRegistering(false);
    } catch (error) {
      setFormError(error.response.data.errMsg);
      setRegistering(false);
      setsignUp(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    //set form error

    setsignUp(false);
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (values.username.length < 8) {
      errors.username = "Username length should be min 8 characters";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password  min 8 char, at least 1 digit and 1 special character:";
    }

    return errors;
  };
  //useEffect
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formErrors);
      handleRegister();
    }
  }, [formErrors]);

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Registration Form</h1>
          <div className="form__content__wrapper"></div>
          <div className="form__content">
            <div className="form__field">
              <label className="form__label">Username</label>
              <input
                className="form__input"
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className="form__field">
              <label className="form__label">Email</label>
              <input
                className="form__input"
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="form__field">
              <label className="form__label">Password</label>
              <input
                className="form__input"
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <div className="form__bottom">
              <button className="form__submit__button" disabled={registering}>
                Submit
              </button>
            </div>
          </div>
          {registering && !signUp ? (
            <div className="loading__container">
              <div className="loading__content">
                <h1 className="loading__content__text">Registering</h1>
              </div>
            </div>
          ) : Object.keys(formErrors).length === 0 && isSubmit && signUp ? (
            <div className="form__success__message">
              <span style={{ color: "green" }}>
                Registered successfully!!Check your inbox for confirmation
              </span>
            </div>
          ) : (
            formError && (
              <div className="form__failure__message">
                <span style={{ color: "red" }}>{formError}</span>
              </div>
            )
          )}
        </form>
      </div>
    </>
  );
}

export default App;
