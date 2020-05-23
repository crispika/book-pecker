import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "antd";
import {
  StarOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-router-dom";
import { connect } from "react-redux";
import { deleteBook } from "../../redux/actions.js";
import { addToCart } from "../../utils/handleEvent";
import { formatMoney } from "../../utils/money-calculator";

import "./book-item.less";

const { Meta } = Card;
const { Text } = Typography;

class BookItem extends Component {
  // 添加书进购物车 - 从util中复用
  // addToCart = (id, bookname) => {

  //     // 存入localstorage
  //     let trolleyDB = getTrolley() || {};
  //     trolleyDB[id] = bookname;
  //     updateTrolley(trolleyDB);

  //     // 弹出确认加入购物车的对话框
  //     notifySuccess('加入购物车成功！',`${bookname}已经加入购物车。`)

  //     //  从书的列表中移除
  //     // this.props.deleteBook(id);

  // }

  render() {
    const { bookname, short_intro, cover, id, price } = this.props.book_info;
    return (
      <Card
        hoverable
        bordered={false}
        style={{ width: 300, margin: "0 auto" }}
        cover={
          <Link to={`/description/${id}`}>
            <div
              style={{
                width: "100%",
                height: "425px",
                background: `url(${cover}) no-repeat center`,
                backgroundSize: "cover",
              }}
            ></div>
          </Link>
        }
        actions={[
          <StarOutlined key="wish" />,
          <ShoppingCartOutlined
            key="trolley"
            onClick={addToCart.bind(this, id, bookname)}
          />,
          <ShareAltOutlined key="share" />,
        ]}
      >
        <Link to={`/description/${id}`}>
          <Meta
            title={bookname}
            description={
              <div>
                <p style={{ marginBottom: 5, marginLeft: -2 }}>
                  <Text type="warning">{formatMoney(price)}</Text>
                </p>
                <p className="book-item-desc">{short_intro}</p>
              </div>
            }
          />
        </Link>
      </Card>
    );
  }
}

BookItem.propTypes = {
  book_info: PropTypes.object.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

export default connect(null, { deleteBook })(BookItem);
