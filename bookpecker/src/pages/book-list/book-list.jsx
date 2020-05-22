import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookItem from "../book-item/book-item";
import { Row, Col, Pagination } from 'antd';
import { pages_bg_color } from "../../assets/color";
import { connect } from 'react-redux';
import { getBookList, clearStateToObj } from "../../redux/actions.js"



class BookList extends Component {
    constructor(props) {
        super(props)
        // console.log(this.props)
    }

    componentDidMount() {
        // debugger
        this.props.getBookList();
    }

    // // 将已经加入购物车的书从列表页中移除
    // pickBook = (id) => {
    //     const picked_list = this.state.book_list.filter(book => book.id !== id)
    //     this.setState({book_list:picked_list})
    // }

    componentWillUnmount() {
        this.props.clearStateToObj();
    }

    render() {
        // debugger
        const { book_list } = this.props;
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
                {Object.keys(book_list).length > 0 &&
                    (<Row justify="space-around" align="middle" gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                        {book_list.map(
                            (book_info, index) =>
                                <Col span={8} key={index}>
                                    {/* <BookItem  book_info={book_info} pickBook={this.pickBook}/> */}
                                    <BookItem book_info={book_info} />
                                </Col>
                        )}
                    </Row>)}

                {/* 分页符 */}
                <Pagination
                    style={{ width: "200px", margin: "0 auto" }}
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
    getBookList: PropTypes.func.isRequired,
    clearStateToObj: PropTypes.func.isRequired,
    book_list: PropTypes.array.isRequired,
}

export default connect(
    state => ({ book_list: state.book_list }),
    { getBookList, clearStateToObj }
)(BookList)