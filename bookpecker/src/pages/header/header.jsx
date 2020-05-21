import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { header_bg_color } from "../../assets/color";
import {useLoginStatus} from "../../utils/hooks"
import "./header.less"
import logo from "./img/pecker-logo.png"

const { Header } = Layout;

export default class MyHeader extends Component {
    constructor(props){
        super(props)
    }

    handleLogout = () => {
        //TODO 登出操作
        
        // 跳转至/books
        //XXX 为什么此处props是空的？
        this.props.history.push("/books"); 
    }

    render() {
        //XXX just for test
        const isLogin = false;
        // const isLogin = useLoginStatus();
        return (
            <Header style={{ backgroundColor: header_bg_color }} className="header">
                <Menu 
                    className="menu" 
                    style={{ backgroundColor: header_bg_color }} 
                    mode="horizontal" 
                    defaultSelectedKeys={['1']}
                >

                    <Menu.Item key="book-list">
                        <NavLink to='/books'>书的森林 </NavLink>
                    </Menu.Item>
                    <Menu.Item key="trolley">
                        <NavLink to="/trolley">购物车</NavLink>
                    </Menu.Item>
                    {!isLogin &&
                    (<Menu.Item key="login">
                        <NavLink to="/login">登录</NavLink>
                    </Menu.Item>)}
                    {isLogin && (<Menu.Item key="user">
                        <NavLink to="/user">我的书架</NavLink>
                    </Menu.Item>)}
                </Menu>
                {isLogin &&
                    <div className="logout" onClick={this.handleLogout}>登出</div>}
            </Header>
        )
    }
}
