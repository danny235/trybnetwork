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
import { updateWithdrawalHistory } from "../features/wallet/walletSlice";
import { baseUrl, paths } from "../config/index";
import axios from "axios";
import { getTime, getDate } from "../utils";

const WithdrawalHistory = () => {
  const navigate = useNavigate();
  const { userProfile, token } = useSelector(
    (state) => state.user
  );
  const { withdrawalHistory } = useSelector(
    (state) => state.wallet
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
        dispatch(updateWithdrawalHistory(response.data));
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchWithdrawal();
  }, []);
  
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
                      {getDate(row?.trans_timestamp)}
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="right">
                      {getTime(row?.trans_timestamp)}
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="right">
                      {row.amount_to_withdraw} USDT
                    </TableCell>
                    <TableCell style={styles.cellStyle} align="right">
                      {row.approved ? "Successful" : row.rejected ? "Failed" : "Ongoing"}
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
