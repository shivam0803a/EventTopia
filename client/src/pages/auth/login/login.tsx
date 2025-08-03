import { Link, useNavigate } from "react-router-dom";
import WelcomeContect from "../common/welcome-contect";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { loginUser } from "../../../api-service/user-services";
import Cookies from "js-cookie";
function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish =async (values: never) => {
    try {
      setLoading(true);
      const response = await loginUser(values);
      message.success(response.message);
      Cookies.set("token", response.token);
      navigate("/");
    } catch (error:any) {
      message.error(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* grid=ye row or col define karta hai */}
      <div className="col-span-1 lg:flex hidden">
        <WelcomeContect />
      </div>

      <div className="h-screen flex items-center justify-center">
        <Form
          className="flex flex-col gap-5 w-96"
          layout="vertical"
          onFinish={onFinish}
        >
          {/* ye onFinish props data form se kise lega */}
          <h1 className="text-2xl font-bold text-blue-500">
            Login Your Account
          </h1>

          <Form.Item
            name="email"
            required
            label="E-mail"
            rules={[{ required: true }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            required
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>

          <p>
            Don't have an Account Register?
            <strong>
              <Link to="/register" className="text-blue-500 font-bold">
                Register
              </Link>
            </strong>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
