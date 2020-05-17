import { DELETE_BOOK, RECEIVE_BOOKLIST, RECEIVE_BOOKINFO, RECEIVE_BOOK_COMMENTS } from "./action-types";
// for test
import UUID from "node-uuid";

export const deleteBook = (book_id) => ({ type: DELETE_BOOK, data: book_id });

export const getBookList = () => {
    return (dispatch) => {
        //模拟异步获取数据
        setTimeout(() => {
            const book_list = [
                {
                    bookname: "book1",
                    description: "Description xxxxxxxxxxxxxxx",
                    url:
                        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    id: UUID.v1(),
                },
                {
                    bookname: "book2",
                    description: "Description xxxxxxxxxxxxxxx",
                    url: "http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png",
                    id: UUID.v1(),
                },
                {
                    bookname: "book3",
                    description: "Description xxxxxxxxxxxxxxx",
                    url:
                        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    id: UUID.v1(),
                },
                {
                    bookname: "book4",
                    description: "Description xxxxxxxxxxxxxxx",
                    url: "http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png",
                    id: UUID.v1(),
                },
                {
                    bookname: "book5",
                    description: "Description xxxxxxxxxxxxxxx",
                    url:
                        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    id: UUID.v1(),
                },
                {
                    bookname: "book2",
                    description: "Description xxxxxxxxxxxxxxx",
                    url: "http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png",
                    id: UUID.v1(),
                },
                {
                    bookname: "book3",
                    description: "Description xxxxxxxxxxxxxxx",
                    url:
                        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    id: UUID.v1(),
                },
                {
                    bookname: "book4",
                    description: "Description xxxxxxxxxxxxxxx",
                    url: "http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png",
                    id: UUID.v1(),
                },
                {
                    bookname: "book5",
                    description: "Description xxxxxxxxxxxxxxx",
                    url:
                        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    id: UUID.v1(),
                },
            ];
            dispatch(receiveBookList(book_list));
        }, 1000);
    };
};

const receiveBookList = (book_list) => ({
    type: RECEIVE_BOOKLIST,
    data: book_list,
});

// 根据id向服务器fetch书籍的详情

export const getBookInfo = (id) => {
    return (dispatch, id) => {
        // console.log(`正在获取id为${id}的书的book_info`);
        //模拟异步获取数据
        setTimeout(() => {
            const book_info = {book_info: {
                id: id,
                bookname: "猫不存在",
                cover: "../../assets/img/no_cat_exists.jpg",
                author: " [美] 厄休拉・勒古恩",
                ISBN: "9787540486198",
                press: "湖南文艺出版社",
                publish_year: "2020-5",
                number_of_pages: "408",
                price: "￥ 49.8",
                description: "<p>科幻文化领域专业影响力品牌、亚太科幻大会主办方未来事务管理局重磅新作，致力打造中国科幻的黄金时代。<p/><p>科幻文化领域专业影响力品牌、亚太科幻大会主办方未来事务管理局重磅新作，致力打造中国科幻的黄金时代。<p/><p>内附《牛筋名猫录》漫画师阿科创作的刘慈欣、韩松、儒勒・凡尔纳、阿瑟・C・克拉克、厄休拉・勒古恩等 9 位科幻作家猫漫画。<p/><p>融合虚构与非虚构，带你领略：有了猫，你就有了整个宇宙；在你腿上的毛茸茸，藏着宇宙的大秘密。</p>"
            }}
            dispatch(receiveBookInfo(book_info));
        }, 1000);
    };
};

const receiveBookInfo = (book_info) => ({
    type: RECEIVE_BOOKINFO,
    data: book_info,
});


// 根据id向服务器fetch书籍的评论
export const getBookComments = (id) => {
    return (dispatch, id) => {
        // console.log(`正在获取id为${id}的书的book_comments`);
        //模拟异步获取数据
        setTimeout(() => {
            const book_comments = {book_comments: [
                {username:"Jack", comment:"xxxxxxxxxx",like:"66",dislike:"33"},
            ]}
            dispatch(receiveBookComments(book_comments));
        }, 1000);
    };
};

const receiveBookComments = (book_comments) => ({
    type: RECEIVE_BOOK_COMMENTS,
    data: book_comments,
});
