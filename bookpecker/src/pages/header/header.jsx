import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { header_bg_color } from "../../assets/color";

const { Header } = Layout;

export default class MyHeader extends Component {
    render() {
        return (
            <Header style={{ backgroundColor: header_bg_color }} className="header">
                <Menu style={{ backgroundColor: header_bg_color }} mode="horizontal" defaultSelectedKeys={['1']}>

                    <Menu.Item key="book-list">
                        <NavLink to='/books'>书的森林 </NavLink>
                    </Menu.Item>
                    <Menu.Item key="trolley">
                        <NavLink to="/trolley">购物车</NavLink>
                    </Menu.Item>
                    <Menu.Item key="login">
                        <NavLink to="/login">登录</NavLink>
                    </Menu.Item>
                    {/* <Menu.Item key="user">
                        <NavLink to="/user">我的书架</NavLink>
                    </Menu.Item> */}
                </Menu>
            </Header>
        )
    }
}
