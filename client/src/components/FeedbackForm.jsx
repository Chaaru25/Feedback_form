import React, { useState } from "react";
import { Form, Input, Button, Rate, message, Card } from "antd";
import axios from "axios";

function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fields = [
    {
      name: "name",
      label: "Name",
      component: <Input placeholder="Enter your name" />,
      rules: [{ required: true, message: "Please enter your name" }],
    },
    {
      name: "email",
      label: "Email",
      component: <Input placeholder="example@email.com" />,
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email" },
      ],
    },
    {
      name: "phone",
      label: "Phone",
      component: <Input placeholder="1234567890" />,
      rules: [
        { required: true, message: "Please enter your phone number" },
        { pattern: /^[0-9]{10}$/, message: "Phone must be 10 digits" },
      ],
    },
    {
      name: "rating",
      label: "Rating",
      component: <Rate />,
      rules: [{ required: true, message: "Please rate us" }],
    },
    {
      name: "feedback",
      label: "Feedback",
      component: (
        <Input.TextArea rows={4} placeholder="Write your feedback..." />
      ),
      rules: [{ required: true, message: "Please share your feedback" }],
    },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}feedbacks`, values);
      alert("Feedback submitted Successfully !");
      message.success("Feedback submitted successfully!");
      form.resetFields();
    } catch (error) {
      alert("Error while submitting feedback", error);
      console.error(error);
      message.error("Error submitting feedback!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      <Card
        title="Submit Feedback"
        style={{
          width: 400,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 10,
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {fields.map(({ name, label, component, rules }) => (
            <Form.Item key={name} label={label} name={name} rules={rules}>
              {component}
            </Form.Item>
          ))}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{ borderRadius: 6 }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default FeedbackForm;
