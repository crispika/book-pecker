import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { StarOutlined, ShareAltOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { card_bg_color } from "../../assets/color";

const { Meta } = Card;

export default class BookItem extends Component {

    render() {
        const { bookname, description, url } = this.props.book_info;
        return (
            <Card
                hoverable
                bordered={false}
                style={{ width: 300, margin: "0 auto" }}
                // bodyStyle={{backgroundColor:card_bg_color}}
                cover={
                    <img
                        alt="book-cover"
                        // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        // src="http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png"
                        src={url}
                    />
                }
                actions={[
                    <StarOutlined key="wish" />,
                    <ShoppingCartOutlined key="trolley" />,
                    <ShareAltOutlined key="share" />,
                ]}
            >
                <Meta
                    title={bookname}
                    description={description}
                />
            </Card>
        )
    }
}


BookItem.propTypes = {
    book_info: PropTypes.object.isRequired
}
