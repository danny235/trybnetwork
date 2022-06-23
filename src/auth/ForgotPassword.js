import React,{useState} from 'react'
import { Container, SecondaryBtn } from "../styles/styledUtils";
import * as yup from "yup";
import { Formik } from "formik";
import Input from "../components/Input";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl, paths } from "../config/index";
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
  email: yup.string().required().label("Email").email(),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const handleSubmit = async (email) => {
    setIsFetching(true)
    try{
      const {data, status} = await axios.post(`${baseUrl}/${paths.requestReset}`, email)
      if (status === 200) {
        setIsFetching(false)
        toast.success("Check your mail to change your password")
      }
      console.log(data)
    } catch(err) {
      setIsFetching(false)
      toast.error(err.message)
    }
  }
  
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
          style={{ width: 30, height: 30, marginTop: -15 }}
          onClick={() => navigate(-1)}
        />
        <h2 style={{ marginLeft: 10 }}>Forgot password</h2>
      </div>
      <Formik
        initialValues={{ email: ""}}
        onSubmit={(values, actions) => {
          const person = {
            email: values.email,
          };
          handleSubmit(person)
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <div>
            <p>Enter email</p>
            <Input
              formikProps={formikProps}
              formikKey="email"
              placeholder="Email"
              type="email"
              value={formikProps.values.email}
            />

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
  )
}

export default ForgotPassword