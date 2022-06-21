import React, { useEffect } from "react";
import Brand from "../components/Brand";
import { Container } from "../styles/styledUtils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { colors } from "../components/colors";
import { baseUrl, paths } from "../config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateBetHistory } from "../features/user/userSlice";

const BetHistory = () => {
  const { userProfile, token, betHistory } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchBetHistory = async (slug) => {
    try {
      const { data, status } = await axios.get(
        `${baseUrl}/${paths.createBet}/${slug}/${paths.betList}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200) {
        dispatch(updateBetHistory(data));
      }
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchBetHistory(userProfile?.profile?.slug);
  }, []);
  // const betHistory = [
  //   {
  //     id: 1,
  //     type: "Big",
  //     amount: "$10",
  //     outcome: "Ongoing",
  //     profit: "-",
  //   },
  //   {
  //     id: 2,
  //     type: "Small",
  //     amount: "$10",
  //     outcome: "Win",
  //     profit: "+$12",
  //   },
  //   {
  //     id: 3,
  //     type: "Big",
  //     amount: "$10",
  //     outcome: "Lost",
  //     profit: "-",
  //   },
  //   {
  //     id: 4,
  //     type: "Small",
  //     amount: "$10",
  //     outcome: "Win",
  //     profit: "+$12",
  //   },
  //   {
  //     id: 5,
  //     type: "Big",
  //     amount: "$10",
  //     outcome: "Win",
  //     profit: "+$12",
  //   },
  //   {
  //     id: 6,
  //     type: "Big",
  //     amount: "$10",
  //     outcome: "Lost",
  //     profit: "-",
  //   },
  //   {
  //     id: 7,
  //     type: "Big",
  //     amount: "$10",
  //     outcome: "Win",
  //     profit: "+$12",
  //   },
  //   {
  //     id: 8,
  //     type: "Small",
  //     amount: "$10",
  //     outcome: "Lost",
  //     profit: "-",
  //   },
  //   {
  //     id: 9,
  //     type: "Small",
  //     amount: "$10",
  //     outcome: "Lost",
  //     profit: "-",
  //   },
  // ];
  return (
    <Container>
      <Brand
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      />
      <h2 style={{ textAlign: "center", marginBottom: 10 }}>Bet history</h2>
      {betHistory?.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.cellStyle}>Type</TableCell>
                <TableCell style={styles.cellStyle}>Amount</TableCell>
                <TableCell style={styles.cellStyle}>Outcome</TableCell>
                <TableCell style={styles.cellStyle}>Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {betHistory?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{
                      ...styles.cellStyle,
                      color: row?.bet_type === "big" ? colors.secondary : colors.red,
                    }}
                    component="th"
                    scope="row"
                  >
                    {row?.bet_type}
                  </TableCell>
                  <TableCell
                    style={{ ...styles.cellStyle, color: colors.secondary }}
                    align="right"
                  >
                    {row.amount} USDT
                  </TableCell>
                  <TableCell
                    style={{
                      ...styles.cellStyle,
                      color:
                        row.outcome === "ongoing"
                          ? colors.yellow
                          : row.outcome === "win"
                          ? colors.secondary
                          : colors.red,
                    }}
                    align="right"
                  >
                    {row.outcome}
                  </TableCell>
                  <TableCell
                    style={{ ...styles.cellStyle, color: colors.secondary }}
                    align="right"
                  >
                    {row.outcome === "win" ? `+${row.profit}` : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p style={{ textAlign: "center" }}>No bet history</p>
      )}
    </Container>
  );
};

const styles = {
  cellStyle: {
    fontWeight: "bold",
    textTransform: "capitalize"
  },
};

export default BetHistory;
