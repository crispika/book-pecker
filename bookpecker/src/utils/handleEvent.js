/**
 * 复用事件回调函数
 */

import { notifySuccess } from "./notification"
import { db_insert_trolleyItem } from './localDb';
import { TROLLEY } from "./db-types"

export const addToCart = (id, bookname) => {

       // TODO dispatch 发送请求给服务器

       // 存入localstorage
       console.log("-------: "+ id)
       db_insert_trolleyItem(TROLLEY,id)

       // 弹出确认加入购物车的对话框
       notifySuccess('加入购物车成功！', `${bookname}已经加入购物车。`)

       //  从书的列表中移除
       // this.props.deleteBook(id);

}