import React, {useEffect} from "react";
import { Icon } from "@iconify/react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "../styles/styledUtils";
import {useSelector, useDispatch} from "react-redux"
import {updateDepositHistory} from "../features/user/userSlice"
import {baseUrl, paths} from "../config/index"
import axios from "axios"

const DepositHistory = () => {
 const navigate = useNavigate();
  // const depositHistory = [
  //   {
  //     id: 1,
  //     date: "Feb 12 2022",
  //     time: "9:15am",
  //     amount: "$100",
  //     status: "Successful",
  //   },
  //   {
  //     id: 2,
  //     date: "Feb 12 2022",
  //     time: "9:15am",
  //     amount: "$100",
  //     status: "Successful",
  //   },
  //   {
  //     id: 3,
  //     date: "Feb 12 2022",
  //     time: "9:15am",
  //     amount: "$100",
  //     status: "Successful",
  //   },
  //   {
  //     id: 4,
  //     date: "Feb 12 2022",
  //     time: "9:15am",
  //     amount: "$100",
  //     status: "Successful",
  //   },
  //   {
  //     id: 5,
  //     date: "Feb 12 2022",
  //     time: "9:15am",
  //     amount: "$100",
  //     status: "Successful",
  //   },
  //   {
  //     id: 6,
  //     date: "Feb 12 2022",
  //     time: "9:15am",
  //     amount: "$100",
  //     status: "Successful",
  //   },
  //   {
  //     id: 7,
  //     date: "Feb 12 2022",
  //     time: "9:15am",
  //     amount: "$100",
  //     status: "Successful",
  //   },
  // ];
  const {userProfile, token, depositHistory} = useSelector(state=>state.user);
  const dispatch = useDispatch()

  const fetchDeposits = async () => {
  try{
    const response = await axios.get(`${baseUrl}/${paths.history}/${userProfile?.profile?.slug}/${paths.deposit}`,{
      headers: {
         Authorization: `Bearer ${token}`
      }
    })
    if(response.status === 200) {
      dispatch(updateDepositHistory(response.data))
    }
    console.log(response)
  }catch(err){
    console.log(err.message)
  }
  }
  const getDate = (stamp) => {
    let date = new Date(stamp)
    let monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    
    let month = monthList[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear()
    return `${month} ${day} ${year}`
  }
  const getTime = (stamp) => {
    let time = new Date(stamp);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    return `${hours}:${minutes}`
  }
  useEffect(()=>{
    fetchDeposits()
  },[])
  return (
    <div>
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
              marginBottom: 40
            }}
          >
            <Icon
              icon="akar-icons:arrow-back"
              style={{ width: 30, height: 30, marginTop: -15 }}
              onClick={() => navigate(-1)}
            />
            <h2 style={{ marginLeft: 10 }}>Deposit history</h2>
          </div>
        </div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead style={{backgroundColor: "#ccc"}}>
            <TableRow>
              <TableCell style={styles.cellStyle}>Date</TableCell>
              <TableCell style={styles.cellStyle}>Time</TableCell>
              <TableCell style={styles.cellStyle}>Amount</TableCell>
              <TableCell style={styles.cellStyle}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {depositHistory.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={styles.cellStyle} component="th" scope="row">
                  {getDate(row?.trans_timestamp)}
                </TableCell>
                <TableCell style={styles.cellStyle} align="right">{getTime(row?.trans_timestamp)}</TableCell>
                <TableCell
                  style={styles.cellStyle}
                  align="right"
                >
                  {row?.amount_to_deposit} USDT
                </TableCell>
                <TableCell style={styles.cellStyle} align="right">
                  {row.approved ? "Successful" : row.rejected ? "Failed" : "Ongoing"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </div>
  );
};

const styles = {
    cellStyle: {
        fontWeight: 'bold'
    }
}

export default DepositHistory;
