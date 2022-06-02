import { Icon } from '@iconify/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../styles/styledUtils'

const Withdrawal = () => {
    const navigate = useNavigate();
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
          <Link style={{textDecoration: "none", color: "#000"}} to="/withdrawal-history">
            <Icon
              style={{ width: 25, height: 25, marginTop: -35 }}
              icon="ic:outline-history"
            />
          </Link>
        </div>
    </Container>
  )
}

export default Withdrawal