/**
 * 应用根组件
 */

import React, { Component } from 'react';
import { Layout } from 'antd';
import MyHeader from './components/header/header';
import BookList from './components/book-list/book-list';
import { content_bg_color, footer_bg_color } from "./assets/color";

const { Content, Footer } = Layout;

export default class App extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
          book_list: []
        }
      }

    componentDidMount() {
        //模拟异步获取数据
        setTimeout(() => {
            const book_list = [
                {
                    bookname: "book1",
                    description: "Description xxxxxxxxxxxxxxx",
                    url:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    id: Date.now()
                },
                {
                    bookname: "book2",
                    description: "Description xxxxxxxxxxxxxxx",
                    url:"http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png",
                    id: Date.now() + 1
                },
                {
                    bookname: "book3",
                    description: "Description xxxxxxxxxxxxxxx",
                    url:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    id: Date.now() + 2
                },
                {
                    bookname: "book4",
                    description: "Description xxxxxxxxxxxxxxx",
                    url:"http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png",
                    id: Date.now() + 1
                },
                {
                    bookname: "book5",
                    description: "Description xxxxxxxxxxxxxxx",
                    url:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    id: Date.now() + 2
                },
                
            ]
            this.setState({
                book_list
            })
        }, 1000)
    }

    render() {
        const {book_list} = this.state;
        return (
            <div>
                <Layout>
                    <MyHeader />
                    <Content className="content" style={{ backgroundColor: content_bg_color }}>
                        <BookList book_list={book_list}/>
                    </Content>

                    <Footer style={{ textAlign: 'center', backgroundColor: footer_bg_color }}>
                        bookpecker.io
                    </Footer>
                </Layout>
            </div>
        )
    }
}
