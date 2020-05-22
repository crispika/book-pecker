import React, { Component } from 'react';
import { Card, Descriptions, Rate, List } from "antd";
import { StarOutlined, ShareAltOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { light_grey } from "../../assets/color";
import GradeSpread from '../grade-spread';
import CommentItem from '../comment-item';
import { getBookInfo, getBookComments,clearStateToObj } from "../../redux/actions";
import {addToCart} from "../../utils/handleEvent"
import {formatMoney} from "../../utils/money-calculator"


class Description extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.match.params.id)

    }

    componentDidMount() {
        this.props.getBookInfo(this.props.match.params.id);
        this.props.getBookComments(this.props.match.params.id);
    }

    componentWillUnmount(){
        this.props.clearStateToObj();
    }

    render() {
        const { book_info, book_comments } = this.props.book_description
        // console.log(book_info,book_comments);

        return (
            <div
                style={{
                    width: 980,
                    margin: "20px auto",
                    backgroundColor: light_grey,
                }}
            >
                {/* 条件渲染 */}
                {book_info && (
                    <div
                        className="description-header-wrapper"
                        style={{
                            display: "flex",
                            // justifyContent: "space-between",
                        }}
                    >
                        {/* 封面 */}
                        <Card
                            style={{
                                width: 250,
                                borderRight: 0,
                                borderBottom: 0,
                                backgroundColor: light_grey,
                            }}
                            bodyStyle={{ padding: 0 }}
                            cover={
                                <div style={{
                                    marginTop: 16,
                                    width: '100%',
                                    height: '235px',
                                    background: 'no-repeat center',
                                    backgroundImage: `url(${book_info.cover})`,
                                    backgroundSize: 'contain'
                                }}></div>
                                // <img
                                //     style={{ width: "100%", margin: "0 auto" }}
                                //     src="http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png"
                                //     alt="book-cover"
                                // />
                            }
                            actions={[
                                <StarOutlined key="wish" />,
                                <ShoppingCartOutlined key="trolley" onClick={addToCart.bind(this,book_info.id,book_info.bookname)} />,
                                <ShareAltOutlined key="share" />,
                            ]}
                        >
                        </Card>


                        {/* 书籍基本信息 */}
                        <Card
                            title={book_info.bookname}
                            style={{ width: 500, backgroundColor: light_grey, flexGrow: 1, borderBottom: 0, borderRight: 0 }}
                            headStyle={{ fontSize: 18 }}
                        >
                            <Descriptions
                                size="small"
                                column={1}
                            >
                                <Descriptions.Item label="作者">{book_info.author}</Descriptions.Item>
                                <Descriptions.Item label="出版社">{book_info.press}</Descriptions.Item>
                                <Descriptions.Item label="出版年份">{book_info.publish_year}</Descriptions.Item>
                                <Descriptions.Item label="页数">{book_info.number_of_pages}</Descriptions.Item>
                                <Descriptions.Item label="价格">{formatMoney(parseFloat(book_info.price),"2","￥")}</Descriptions.Item>
                                <Descriptions.Item label="ISBN">{book_info.ISBN}</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        {/* 书籍评分信息 */}
                        <Card
                            title="书籍评分"
                            style={{ width: 250, backgroundColor: light_grey, size: "small", borderBottom: 0 }}
                            headStyle={{ fontSize: 14, paddingTop: 6 }}
                        >
                            <div className="grade-wrapper" style={{ display: "flex" }}>
                                <div className="grade" style={{ fontSize: 26, flexGrow: 2 }}>{book_info.grade}</div>
                                <div className="rate" style={{ flexGrow: 3 }}>
                                    <Rate defaultValue={book_info.star} allowHalf disabled></Rate>
                                </div>
                            </div>
                            <div className="grade-spread-wrapper" style={{ height: 150, marginTop: 10, display: "flex", flexDirection: "column", }}>
                                {book_info.grade_spread.map(
                                    (grade, index) => <GradeSpread key={index} grade={grade} />
                                )}
                            </div>
                        </Card>
                    </div>
                )}

                {/* 书籍简介，条件渲染 */}
                {book_info && (
                    <Card
                        title="书籍简介"
                        style={{ width: 980, backgroundColor: light_grey, borderBottom: 0 }}
                    >
                        <div dangerouslySetInnerHTML={{ __html: book_info.description }}></div>
                    </Card>
                )}

                {/* 书籍评论，条件渲染 */}
                {book_comments && (
                    <Card
                        title={`${book_comments.length}条书籍评论`}
                        style={{ width: 980, backgroundColor: light_grey }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={book_comments}
                            renderItem={comment => (
                                <li>
                                    <CommentItem comment={comment} />
                                </li>
                            )}
                        />
                    </Card>

                )}
            </div>
        )
    }
}

Description.propTypes = {
    book_description: PropTypes.object.isRequired,
    getBookInfo: PropTypes.func.isRequired,
    clearStateToObj: PropTypes.func.isRequired,
    getBookComments: PropTypes.func.isRequired,
}

export default connect(
    state => ({ book_description: state.book_description }),
    { getBookInfo, getBookComments,clearStateToObj}
)(Description);


