import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Input from "../components/Input";
import { Container, SecondaryBtn } from "../styles/styledUtils";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl, paths } from "../config";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .label("Password")
    .min(8, "Seems a bit short"),
  confirm_password: yup
    .string()
    .required()
    .label("Confirm Password")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export const CreateNewPassword = (values) => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  console.log(token);
  const handleSubmit = async (values) => {
    setIsFetching(true)
    try {
        const { data, status } = await axios.post(
            `${baseUrl}/${paths.resetPassword}`,
            values
            );
            if (status === 200) {
          setIsFetching(false)
          
          toast.success("Password changed suceessfully, please login.");
          navigate("/login", { replace: true });
        }
    } catch (err) {
        setIsFetching(false)
      console.log(err);
      toast.error(err.message)
    }
  };
  return (
    <Container>
      <h3 style={{ textAlign: "center", marginTop: 50, marginBottom: 50 }}>
        Confirm Password
      </h3>
      <Formik
        initialValues={{
          password: "",
          confirm_password: "",
        }}
        onSubmit={(values, actions) => {
          const person = {
            token: token.substring(1, token.length),
            password: values.password,
            re_password: values.confirm_password,
          };
          handleSubmit(person)
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <div>
            <div style={{ position: "relative" }}>
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
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
            </div>
            <div style={{ position: "relative" }}>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                formikProps={formikProps}
                formikKey="confirm_password"
                placeholder="Confirm Password"
                value={formikProps.values.confirm_password}
              />
              <Icon
                icon={
                  showConfirmPassword
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            <SecondaryBtn
              disabled={isFetching}
              type="submit"
              onClick={formikProps.handleSubmit}
            >
              {isFetching ? <p>Loading...</p> : <p>Proceed</p>}
            </SecondaryBtn>
          </div>
        )}
      </Formik>
    </Container>
  );
};
