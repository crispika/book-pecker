import React, { Component } from 'react'
import {Layout, Menu} from 'antd'
import "./header.less"
import {header_bg_color} from "../../assets/color";

const {Header} = Layout;

export default class MyHeader extends Component {
    render() {
        return (
            <Header style={{backgroundColor:header_bg_color}} className="header">
            <Menu style={{backgroundColor:header_bg_color}} mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="book-list">书的森林</Menu.Item>
                <Menu.Item key="trolley">购物车</Menu.Item>
                {/* 登录后替换成我的书架 home */}
                <Menu.Item key="login">登录</Menu.Item>
            </Menu>
          </Header>
        )
    }
}
