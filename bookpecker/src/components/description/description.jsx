import React, { Component } from 'react';
import { Card, Descriptions, Rate } from "antd";
import { StarOutlined, ShareAltOutlined, ShoppingCartOutlined, CheckCircleOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

import { light_grey } from "../../assets/color";
import GradeSpread from '../grade-spread';
import CommentItem from '../comment-item';
import {getBookInfo,getBookComments} from "../../redux/actions";


class Description extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.match.params.id)

    }

    componentDidMount() {
        this.props.getBookInfo();
        this.props.getBookComments();
    }

    render() {
        console.log(this.props.book_description);
        const {book_description} = this.props;
        console.log(book_description);
        console.log(this.props.book_description.book_comments);
        // const {book_comments} = book_description;
        // console.log(book_comments)

        return (
            <div
                style={{
                    width: 980,
                    margin: "20px auto",
                    backgroundColor: light_grey,
                }}
            >
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
                            <img
                                style={{ width: "100%", margin: "0 auto" }}
                                src="http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png"
                                alt="book-cover"
                            />}
                        actions={[
                            <StarOutlined key="wish" />,
                            <ShoppingCartOutlined key="trolley" />,
                            <ShareAltOutlined key="share" />,
                        ]}
                    >
                    </Card>


                    {/* 书籍基本信息 */}
                    <Card
                        title="书籍名称"
                        style={{ width: 500, backgroundColor: light_grey, flexGrow: 1, borderBottom: 0, borderRight: 0 }}
                        headStyle={{ fontSize: 18 }}
                    >
                        <Descriptions
                            size="small"
                            column={1}
                        >
                            <Descriptions.Item label="作者">XXXXXXX</Descriptions.Item>
                            <Descriptions.Item label="出版社">XXXXXXX</Descriptions.Item>
                            <Descriptions.Item label="出版年份">1999</Descriptions.Item>
                            <Descriptions.Item label="页数">300</Descriptions.Item>
                            <Descriptions.Item label="价格">35</Descriptions.Item>
                            <Descriptions.Item label="ISBN">9787540486198</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* 书籍评分信息 */}
                    <Card
                        title="书籍评分"
                        style={{ width: 250, backgroundColor: light_grey, size: "small", borderBottom: 0 }}
                        headStyle={{ fontSize: 14, paddingTop: 6 }}
                    >
                        <div className="grade-wrapper" style={{ display: "flex" }}>
                            <div className="grade" style={{ fontSize: 26, flexGrow: 2 }}>8.6</div>
                            <div className="rate" style={{ flexGrow: 3 }}>
                                <Rate defaultValue={4.5} allowHalf disabled></Rate>
                            </div>
                        </div>
                        <div className="grade-spread-wrapper" style={{ height: 150, marginTop: 10, display: "flex", flexDirection: "column", }}>
                            <GradeSpread />
                            <GradeSpread />
                            <GradeSpread />
                            <GradeSpread />
                            <GradeSpread />
                        </div>
                    </Card>
                </div>

                {/* 书籍简介 */}
                <Card
                    title="书籍简介"
                    style={{ width: 980, backgroundColor: light_grey, borderBottom:0}}
                // bodyStyle={{backgroundColor:light_aoi}} 
                // bordered={false}
                >
                    <p>cotent</p>
                    <p>cotent</p>
                    <p>cotent</p>
                    <p>cotent</p>
                    <p>cotent</p>
                    <p>cotent</p>
                </Card>

                {/* 书籍评论 */}
                <Card
                    title="书籍评论"
                    style={{ width: 980, backgroundColor: light_grey }}
                // bodyStyle={{backgroundColor:light_aoi}} 
                // bordered={false}
                >
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                </Card>
            </div>
        )
    }
}

Description.propTypes = {
    book_description: PropTypes.object.isRequired,
    getBookInfo: PropTypes.func.isRequired,
    getBookComments: PropTypes.func.isRequired,
}

export default connect(
    state => ({book_description:state.book_description}),
    {getBookInfo,getBookComments}
)(Description);


