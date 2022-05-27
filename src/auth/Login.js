import React, { useState } from "react";
import { Container, SecondaryBtn } from "../styles/styledUtils";
import * as yup from "yup";
import { Formik, replace } from "formik";
import Input from "../components/Input";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";

const validationSchema = yup.object().shape({
  email: yup.string().required().label("Email").email(),
  password: yup
    .string()
    .required()
    .label("Password")
    .min(8, "Seems a bit short"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
          marginBottom: 40,
        }}
      >
        <Icon
          icon="akar-icons:arrow-back"
          style={{ width: 30, height: 30 }}
          onClick={() => navigate(-1)}
        />
        <h2 style={{ marginLeft: 10 }}>Login</h2>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          const person = values;
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <div>
            <Input
              formikProps={formikProps}
              formikKey="email"
              placeholder="Email"
              keyboardType="email-address"
              value={formikProps.values.email}
            />
            <div style={{ position: "relative", marginBottom: 100 }}>
              <Input
                type={showPassword ? "text" : "password"}
                formikProps={formikProps}
                formikKey="password"
                placeholder="Password"
                value={formikProps.values.password}
              />
              <Icon
                icon={
                  showPassword
                    ? "clarity:eye-show-line"
                    : "clarity:eye-hide-line"
                }
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  top: 22,
                  right: 10,
                }}
                onClick={() => setShowPassword(!showPassword)}
              />
              <Link style={styles.linkStyle} to="#">Forgot password?</Link>
            </div>
            <SecondaryBtn>
              <p>Login</p>
            </SecondaryBtn>
          </div>
        )}
      </Formik>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>Don't have an account?</p> <Link style={styles.linkStyle} to="/signup">Register here</Link>
      </div>
    </Container>
  );
};

const styles = {
  linkStyle: {
    textDecoration: 'none'
  }
}

export default Login;
