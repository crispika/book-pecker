import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Card, notification } from 'antd';
import { StarOutlined, ShareAltOutlined, ShoppingCartOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import "react-router-dom";

import { pale_olive,  light_aoi} from "../../assets/color"
import { getTrolley, updateTrolley } from '../../utils/localstorage';
import { connect } from 'react-redux';
import { deleteBook } from "../../redux/actions.js"


const { Meta } = Card;

class BookItem extends Component {

    // 添加书进购物车
    addToCart = (id, bookname) => {
        // TODO 发送请求给服务器

        // 存入localstorage
        let trolleyDB = getTrolley() || {};
        trolleyDB[id] = bookname;
        updateTrolley(trolleyDB);

        // 弹出确认加入购物车的对话框
        notification.open({
            message: '加入购物车成功！',
            description:
                `${bookname}已经加入购物车。`,
            icon: <CheckCircleOutlined style={{ color: pale_olive }} />,
            style: {
                backgroundColor: light_aoi,
            },
        });

        //  从书的列表中移除
        // this.props.pickBook(id);
        this.props.deleteBook(id);

    }

    render() {
        const { bookname, description, url, id } = this.props.book_info;
        return (
            <Card
                hoverable
                bordered={false}
                style={{ width: 300, margin: "0 auto" }}
                // bodyStyle={{width: 300, margin: "0 auto"}}
                cover={
                    <Link to={`/description/${id}`} >
                    <div style={{
                        width: '100%',
                        height: '200px',
                        background: `url(${url}) no-repeat center`,
                        backgroundSize: 'contain'
                    }}></div>
                        {/* <img
                            style={{width:"100%", height: '210px'}}
                            alt="book-cover"
                            // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            // src="http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png"
                            src={url}
                        /> */}
                    </Link>
                }
                actions={[
                    <StarOutlined key="wish" />,
                    <ShoppingCartOutlined key="trolley" onClick={this.addToCart.bind(this, id, bookname)} />,
                    <ShareAltOutlined key="share" />,
                ]}
            >
                <Link to={`/description/${id}`} >
                <Meta
                    title={bookname}
                    description={description}
                />
                </Link>
            </Card>
        )
    }
}


BookItem.propTypes = {
    book_info: PropTypes.object.isRequired,
    // pickBook: PropTypes.func.isRequired, //纯react版本传参
    deleteBook: PropTypes.func.isRequired,
}

export default connect(
    null,
    { deleteBook }
)(BookItem)
