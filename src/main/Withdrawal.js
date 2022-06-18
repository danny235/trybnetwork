import { Icon } from "@iconify/react";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, GreenSection, SecondaryBtn } from "../styles/styledUtils";
import * as yup from "yup";
import { Formik } from "formik";
import BottomBorderInput from "../components/BottomBorderInput";
import {useSelector} from "react-redux"
import {baseUrl, paths} from "../config/index"
import axios from "axios"
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  wallet_address: yup.string().required().label("Wallet Address"),
  amount: yup.string().required().label("Amount"),
  password: yup
    .string()
    .required()
    .label("Withdrawal Pin")
    .min(4, "Seems a bit short").max(4, "That's a lot"),
});

const Withdrawal = () => {
  const navigate = useNavigate();
  const {token, balance, userProfile} = useSelector(state=>state.user)
  const [loading, setLoading] = useState(false)
  const withdraw = async (data, actions) => {
    setLoading(true)
    try{
      const response = await axios.post(`${baseUrl}/${paths.wallet}/${userProfile?.profile?.slug}/${paths.withdraw}`, data, {
       headers: {
         Authorization: `Bearer ${token}`
       }
      })

      if (response.status === 200) {

        actions?.resetForm()
        toast.success("Withdrawal processing!")
        setLoading(false)
      }
      setLoading(false)
    } catch(err) {
      setLoading(false)
      if (err.message === "Request failed with status code 400") {
        return toast.error("Pin not correct")
      } 
     
      toast.error(err.message)
    }
  }
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 40,
        }}
      >
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
          <h2 style={{ marginLeft: 10 }}>Withdrawal</h2>
        </div>
        <Link
          style={{ textDecoration: "none", color: "#000" }}
          to="/withdrawal-history"
        >
          <Icon
            style={{ width: 25, height: 25, marginTop: -35 }}
            icon="ic:outline-history"
          />
        </Link>
      </div>
      <div>
        <Formik
          initialValues={{ wallet_address: "", amount: "", password: "" }}
          onSubmit={(values, actions) => {
            const person = {
              wallet_address: values.wallet_address,
              amount_to_withdraw: values.amount,
              withdrawal_pin: parseInt(values.password)
            };
            withdraw(person, actions)

          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <div>

            <GreenSection style={{marginBottom: 100}}>
              <BottomBorderInput
                formikProps={formikProps}
                formikKey="wallet_address"
                placeholder="Enter wallet address"
                value={formikProps.values.wallet_address}
              />
              <div>

              <BottomBorderInput
                formikProps={formikProps}
                formikKey="amount"
                placeholder="Enter amount"
                type="number"
                value={formikProps.values.amount}
              />
              <div style={{display: "flex"}}>
                <p style={{color: "#fff", flex: 1, fontSize: 12}}>0.3% fees applies</p>
                <p style={{color: "#fff", fontSize: 12 }}>Bal: {balance} USDT</p>
              </div>
              </div>
              <div style={{ position: "relative", marginBottom: 100 }}>
                <BottomBorderInput
                  type="password"
                  formikProps={formikProps}
                  formikKey="password"
                  placeholder="Enter 4 digit withdrawal pin"
                  value={formikProps.values.password}
                  maxLength={4}
                />
                <p style={{color: "#fff", flex: 1, fontSize: 12}}>Default: 1234</p>
              </div>
            </GreenSection>
              <SecondaryBtn disabled={loading} onClick={formikProps.handleSubmit}>
                <p>{loading ? "Loading..." : "Proceed"}</p>
              </SecondaryBtn>
            </div>
          )}
        </Formik>
      
      </div>
    </Container>
  );
};

export default Withdrawal;
