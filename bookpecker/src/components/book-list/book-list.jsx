import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookItem from "../book-item/book-item";
import { Row, Col, Pagination } from 'antd';
import { pages_bg_color } from "../../assets/color";

export default class BookList extends Component {

    render() {
        const {book_list}=this.props;
        return (
            <div className="book-list-wrapper"
                style={{
                    backgroundColor: pages_bg_color,
                    margin: "auto 270px",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                {/* 栅格布局套card样式的book-item */}
                <Row justify="space-around" align="middle" gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                    {book_list.map(
                        (book_info,index)=>
                            <Col span={8} >
                                <BookItem key={index} book_info={book_info}/>
                            </Col>
                    )}
                </Row>

                {/* 分页符 */}
                <Pagination
                    style={{ width:"200px", margin:"0 auto"}}
                    // simple 
                    defaultCurrent={1}
                    total={27}
                    pageSize={9}
                />
            </div>
        )
    }
}

BookList.propTypes = {
    book_list: PropTypes.array.isRequired,
  }
