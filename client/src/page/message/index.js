import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button, Card, Col, Input, Row, Typography } from "antd";

const socket = io.connect("http://localhost:5000");

export const Message = () => {
  const [userDetails, setUserDetails] = useState({ room: 0, message: "" });
  const [getDetails, setGetDetails] = useState([]);

  useEffect(() => {
    socket.on("user", (value) => setGetDetails([...getDetails, value]));
  }, [userDetails,getDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("userID", userDetails?.room, userDetails?.message);
    setUserDetails({ room: 0, message: "" });
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="User-01" style={{ height: 500 }}>
            {getDetails
              .filter((x) => x.userId === "01")
              .map((val) => {
                return <Typography>{val.message}</Typography>;
              })}
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" title="User-02" style={{ height: 500 }}>
            {getDetails
              .filter((x) => x.userId === "02")
              .map((val) => {
                return <Typography>{val.message}</Typography>;
              })}
          </Card>
        </Col>
      </Row>
      <form onSubmit={handleSubmit}>
        <Input
          style={{ width: "5%", marginTop: "10px" }}
          value={userDetails.room}
          placeholder="enter room number"
          type="number"
          onChange={(e) =>
            setUserDetails({ ...userDetails, room: e.target.value })
          }
        />
        <Input
          style={{ width: "20%" }}
          value={userDetails.message}
          placeholder="type message"
          onChange={(e) =>
            setUserDetails({ ...userDetails, message: e.target.value })
          }
        />
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </form>
    </>
  );
};