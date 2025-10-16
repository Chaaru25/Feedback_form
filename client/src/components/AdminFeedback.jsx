import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Rate } from "antd";
function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}feedbacks?page=${page}&limit=${limit}`
      );
      setFeedbacks(res.data.data);
      setPage(res.data.page);
    } catch (e) {
      console.error("error while fetching", e);
    }
  };
  useEffect(() => {
    fetchFeedback();
  }, []);
  const columns = [
    {
      title: "SNO",
      dataIndex: "sno",
      key: "sno",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (value) => <Rate value={Number(value)} disabled />,
      width: "20%",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      width: "30%",
    },
  ];
  console.log(page, feedbacks, "feedbacks 1234");
  return (
    <div>
      <h2>Feedback List </h2>
      <Table
        dataSource={feedbacks}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        size="medium"
      />
    </div>
  );
}

export default AdminFeedback;
