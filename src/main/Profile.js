import React, { useEffect, useState } from "react";
import {
  Container,
  GreenSection,
  SecondaryBtn,
  StyledInput,
  WhiteInput,
} from "../styles/styledUtils";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../features/user/userSlice";
import axios from "axios";
import { Dialog } from "@mui/material";
import { baseUrl, paths } from "../config/index";
import * as yup from "yup";
import { Formik } from "formik";
import Input from "../components/Input";
import { toast } from "react-toastify";


const passwordSchema = yup.object().shape({
  old_password: yup
    .string()
    .required()
    .label("Password")
    .min(8, "Seems a bit short"),
  new_password: yup
    .string()
    .required()
    .label("Password")
    .min(8, "Seems a bit short"),
  confirm_password: yup
    .string()
    .required()
    .label("Confirm Password")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.new_password === value;
    }),
});

const pinSchema = yup.object().shape({
  new_pin: yup
    .string()
    .required()
    .label("Pin")
    .min(3, "Seems a bit short"),
  confirm_pin: yup
    .string()
    .required()
    .label("Confirm Pin")
    .test("passwords-match", "Pins must match", function (value) {
      return this.parent.new_pin === value;
    }),
});

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile, token } = useSelector((state) => state.user);
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);
  const [passwordFormLoading, setPasswordFormLoading] = useState(false);
  const [pinFormOpen, setPinFormOpen] = useState(false);
  const [pinFormLoading, setPinFormLoading] = useState(false);

  const submitPassword = async (data, actions) => {
    setPasswordFormLoading(true)
    try{
      
      const response = await axios.post(`${baseUrl}/${paths.passwordUpdate}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(response.status === 200) {
        actions.resetForm()
        setPasswordFormLoading(false)
        toast.success("Password changed successfully")
      }
    } catch (err) {
      setPasswordFormLoading(false)
      toast.error(err.message)
      console.log(err.message)
    }
  }
  const submitPin = async (data, actions) => {
    setPinFormLoading(true)
    try{
      
      const response = await axios.patch(`${baseUrl}/${paths.profileUpdate}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(response.status === 200) {
        actions.resetForm()
        setPinFormLoading(false)
        toast.success("Pin created successfully")
      }
    } catch (err) {
      setPinFormLoading(false)
      toast.error(err.message)
      console.log(err.message)
    }
  }
  const handleLogOut = () => {
    navigate("/", { replace: true });
    dispatch(logOutUser());
  };



  useEffect(() => {
    if (token === "") {
      navigate("/", { replace: true });
    }
    return;
  }, [token]);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 40,
          flex: 1,
        }}
      >
        <Icon
          icon="akar-icons:arrow-back"
          style={{ width: 30, height: 30, marginTop: -15 }}
          onClick={() => navigate(-1)}
        />
        <h2 style={{ marginLeft: 10 }}>Profile Settings</h2>
      </div>
      <GreenSection style={{ marginBottom: 100 }}>
        <div>
          <p style={{ color: "#fff" }}>Username</p>
          <StyledInput
            style={{
              borderColor: "#fff",
              background: "none",
              color: "#fff",
              marginTop: 1,
              textTransform: "capitalize",
            }}
            defaultValue={userProfile?.username}
            readOnly
          />
        </div>
        <div>
          <p style={{ color: "#fff" }}>Email</p>
          <StyledInput
            style={{
              borderColor: "#fff",
              background: "none",
              color: "#fff",
              marginTop: 1,
            }}
            defaultValue={userProfile?.email}
            readOnly
          />
        </div>
        <div style={{ position: "relative" }}>
          <WhiteInput placeholder="Password change" readOnly />
          <button
            onClick={() => setPasswordFormOpen(true)}
            style={{
              position: "absolute",
              outline: "none",
              background: "none",
              color: "blue",
              border: "none",
              right: 3,
              top: 7,
            }}
          >
            Edit
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <WhiteInput placeholder="Transaction pin" readOnly />
          <button
            onClick={() => setPinFormOpen(true)}
            style={{
              position: "absolute",
              outline: "none",
              background: "none",
              color: "blue",
              border: "none",
              right: 3,
              top: 7,
            }}
          >
            Edit
          </button>
        </div>
      </GreenSection>
      <SecondaryBtn onClick={() => handleLogOut()} style={{ color: "#fff" }}>
        <p>Logout</p>
      </SecondaryBtn>
      <Dialog
        fullWidth={true}
        onBackdropClick={() => setPasswordFormOpen(false)}
        open={passwordFormOpen}
      >
        <div style={styles.dialogContainer}>
          <h3 style={styles.dialogHeading}>Password change</h3>
          <Formik
            initialValues={{
              old_password: "",
              new_password: "",
              confirm_password: "",
            }}
            onSubmit={(values, actions) => {
              const person = {
                new_password: values.new_password,
                new_password_confirm: values.confirm_password
              }
              submitPassword(person, actions)
            }}
            validationSchema={passwordSchema}
          >
            {(formikProps) => (
              <div>
                <Input
                  type="password"
                  formikProps={formikProps}
                  formikKey="old_password"
                  placeholder="Enter old password"
                  value={formikProps.values.old_password}
                />
                <Input
                  type="password"
                  formikProps={formikProps}
                  formikKey="new_password"
                  placeholder="Enter new password"
                  value={formikProps.values.new_password}
                />
                <Input
                  type="password"
                  formikProps={formikProps}
                  formikKey="confirm_password"
                  placeholder="Confirm password"
                  value={formikProps.values.confirm_password}
                />
                <SecondaryBtn
                  style={{ color: "#fff", backgroundColor: "#000" }}
                  onClick={formikProps.handleSubmit}
                  disabled={passwordFormLoading}
                >
                  <p>{passwordFormLoading? "Loading..." : "Save changes"}</p>
                </SecondaryBtn>
              </div>
            )}
          </Formik>
        </div>
      </Dialog>
      <Dialog
        fullWidth={true}
        onBackdropClick={() => setPinFormOpen(false)}
        open={pinFormOpen}
      >
        <div style={styles.dialogContainer}>
          <h3 style={styles.dialogHeading}>Transaction pin</h3>
          <Formik
            initialValues={{
              new_pin: "",
              confirm_pin: "",
            }}
            onSubmit={(values, actions) => {
              const person = {
                transaction_pin: values.new_pin
              }
              submitPin(person, actions)
            }}
            validationSchema={pinSchema}
          >
            {(formikProps) => (
              <div>
                <Input
                  type="number"
                  formikProps={formikProps}
                  formikKey="new_pin"
                  placeholder="Enter new pin"
                  value={formikProps.values.new_pin}
                  maxLength={4}
                />
                <Input
                  type="number"
                  formikProps={formikProps}
                  formikKey="confirm_pin"
                  placeholder="Confirm pin"
                  value={formikProps.values.confirm_pin}
                  maxLength={4}
                />
                <SecondaryBtn
                  style={{ color: "#fff", backgroundColor: "#000" }}
                  onClick={formikProps.handleSubmit}
                  disabled={pinFormLoading}
                >
                  <p>{pinFormLoading ? "Loading..." : "Save changes"}</p>
                </SecondaryBtn>
              </div>
            )}
          </Formik>
        </div>
      </Dialog>
    </Container>
  );
};

const styles = {
  dialogContainer: {
    height: 500,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  dialogHeading: {
    textAlign: "center",
  },
};

export default Profile;
