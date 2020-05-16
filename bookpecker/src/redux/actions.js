import { DELETE_BOOK, RECEIVE_BOOKLIST } from "./action-types";
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
