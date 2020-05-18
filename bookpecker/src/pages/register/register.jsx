import React, { useState } from 'react';
import {Link} from "react-router-dom"
import {
    Form,
    Input,
    Tooltip,
    Select,
    Row,
    Col,
    Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import "./register.less"



const { Option } = Select;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="61">+61</Option>
      </Select>
    </Form.Item>
  );

const Register = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    // const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const formItemLayout = {
        labelCol: { xs: { span: 24, }, sm: { span: 8, }, },
        wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0, },
            sm: { span: 16, offset: 8, },
        },
    };

    return (
        <div className="register-wrapper">
            <h2>注册</h2>
            <Form
                className="form"
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                initialValues={{prefix: '86'}}
            >
                <Form.Item
                    name="nickname"
                    label={
                        <span>
                            昵称&nbsp;
                                <Tooltip title="你想让别人怎么称呼你？">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
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
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm password"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请确认密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('两次输入的密码不一致!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[
                        {
                            required: false,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item label="验证码" extra="点击向该手机号发送验证码">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="captcha"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入收到的短信验证码',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button>发送验证码</Button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{fontSize:16,height:"100%"}}>
                        注册
                    </Button>
                    &nbsp;&nbsp;或&nbsp;
                    <Link to="/login">返回登录页面</Link>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register


