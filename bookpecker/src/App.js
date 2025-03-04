/**
 * 应用根组件
 */

import React, { Component } from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from "react-router-dom"
import MyHeader from './pages/header/header';
import BookList from './pages/book-list/book-list';
import Trolley from "./pages/trolley/trolley";
import User from "./pages/user/user";
import Description from "./components/description/description"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import { content_bg_color, footer_bg_color } from "./assets/color";
import {db_select_table,db_init_table} from "./utils/localDb"
import {TROLLEY,BOOKINFO} from "./utils/db-types"

const { Content, Footer } = Layout;

export default class App extends Component {
    
    render() {
        return (
            <div>
                <Layout>
                    <MyHeader />
                    <Content className="content" style={{ backgroundColor: content_bg_color,minHeight:800}}>
                        {/* 切换路由组件 */}
                        <Switch>
                            <Route path='/books' component={BookList} />
                            <Route path='/trolley' component={Trolley}/>
                            <Route path="/register" component={Register}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/user' component={User}/>
                            <Route path="/description/:id" component={Description}/>
                            <Redirect to='/books' />
                        </Switch>
                    </Content>

                    <Footer style={{ textAlign: 'center', backgroundColor: footer_bg_color }}>
                        bookpecker.io
                    </Footer>
                </Layout>
            </div>
        )
    }
}
