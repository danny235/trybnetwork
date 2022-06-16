import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "../styles/styledUtils";
import { useSelector, useDispatch } from "react-redux";
import { updateWithdrawalHistory } from "../features/user/userSlice";
import { baseUrl, paths } from "../config/index";
import axios from "axios";

const WithdrawalHistory = () => {
  const navigate = useNavigate();
  const { userProfile, token, withdrawalHistory } = useSelector(
    (state) => state.user
  );
 
  const dispatch = useDispatch();

  const fetchWithdrawal = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/${paths.history}/${userProfile?.profile?.slug}/${paths.withdraw}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        dispatch(updateWithdrawalHistory(response.data.data));
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchWithdrawal();
  }, []);
  // const withdrawalHistory = [
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
              marginBottom: 40,
            }}
          >
            <Icon
              icon="akar-icons:arrow-back"
              style={{ width: 30, height: 30, marginTop: -15 }}
              onClick={() => navigate(-1)}
            />
            <h2 style={{ marginLeft: 10 }}>Withdrawal history</h2>
          </div>
        </div>
        {withdrawalHistory?.length !== 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="simple table">
              <TableHead style={{ backgroundColor: "#ccc" }}>
                <TableRow>
                  <TableCell style={styles.cellStyle}>Date</TableCell>
                  <TableCell style={styles.cellStyle}>Time</TableCell>
                  <TableCell style={styles.cellStyle}>Amount</TableCell>
                  <TableCell style={styles.cellStyle}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {withdrawalHistory?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={styles.cellStyle}
                      component="th"
                      scope="row"
                    >
                      {row.date}
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="right">
                      {row.time}
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="right">
                      {row.amount}
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="right">
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p style={{ textAlign: "center" }}>No withdrawal history</p>
        )}
      </Container>
    </div>
  );
};

const styles = {
  cellStyle: {
    fontWeight: "bold",
  },
};

export default WithdrawalHistory;
