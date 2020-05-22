import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.less"
import { Link } from "react-router-dom"
import { notifyFailure } from "../../utils/notification"
import cookie from 'react-cookies'


// const Login = () => {
class Login extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            isRemembered: cookie.load('isRemembered') || false
        }
    }

    // const onFinish = (values) => {
    onFinish = (values) => {
        console.log('Received values of form: ', values);
        const { email, password, remember } = values
        //TODO redux发送ajax请求数据

        //TODO 成功，返回主页; 错误，弹出Notification
        notifyFailure("遇到电波错误", "登录失败(ಥ_ಥ)，请稍后再试。")
    };

    handleRememberPwd = (e) => {
        console.log(e)
        // const value = e.target.name === 'isGoing' ? target.checked : target.value;
        // console.log(value)

    };


    render() {
        return (
            <div className="login-wrapper">
                <h2>登录</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    // 提交表单且数据验证成功后的回调
                    // onFinish={onFinish}
                    onFinish={this.onFinish}
                    // initialValues={{ "email": "123@gmail.com", "password": "123456" }}
                >
                    <Form.Item
                        className="form-item"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Email地址不合法!',
                            },
                            {
                                required: true,
                                message: '请输入email地址',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username@book-pecker.io" />
                    </Form.Item>

                    <Form.Item
                        className="form-item"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                    {/* XXX 表单项样式未设置好,无法调整form.item的样式 */}
                    <Form.Item className="form-item" style={{ display: "flex", justifyContent: "space-between" }}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox name="isRemembered" checked={this.state.isRemembered} onChange={this.handleRememberPwd}>记住我</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="#">
                            忘记密码
                        </a>
                    </Form.Item>

                    <Form.Item className="form-item">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                            或 <Link to="/register">立刻注册!</Link>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Login