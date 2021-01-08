import React from "react";
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { Typography, Space } from 'antd';
import { loginUrl } from './spotify'

import "./Login.css"


function Login() {
    const { Text, Link } = Typography;
  return (
      <div className="login">
    <Row>
      <Col span={24}>
          <h1>To begin, login to Spotify!</h1>
      <Button type="primary" href={loginUrl} block style={{ background: "#1DB954", borderRadius: "99px", fontWeight: "800", borderColor: "#1DB954"}}>LOGIN WITH SPOTIFY</Button>
      </Col>
    </Row>
      </div>

  );
}

export default Login;
