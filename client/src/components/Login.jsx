import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}login`,
        values
      );
      console.log(res, "res");

      message.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      form.resetFields();
      navigate("/admin");
    } catch (error) {
      alert("Error while logging in", error);
      console.error(error);
      message.error("Error submitting feedback!");
    } finally {
      setLoading(false);
    }
    // Redirect to /login page
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      component: <Input placeholder="Enter your username" />,
      rules: [{ required: true, message: "Please enter your username !" }],
    },
    {
      name: "password",
      label: "Password",
      component: <Input placeholder="Enter your password" />,
      rules: [{ required: true, message: "Please enter your password !" }],
    },
  ];
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        style={{
          maxWidth: 400,
          margin: "auto",
          padding: "30px",
          backgroundColor: "#f5f5f5", // light grey background
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // soft shadow
          borderRadius: "10px",
        }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        {fields.map(({ name, label, component, rules }) => (
          <Form.Item key={name} label={label} name={name} rules={rules}>
            {component}
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
