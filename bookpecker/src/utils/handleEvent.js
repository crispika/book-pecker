/**
 * 复用事件回调函数
 */

import {notifySuccess} from "./notification"
import { getTrolley, updateTrolley } from './localstorage';

 export const addToCart = (id,bookname) =>{

        // TODO 发送请求给服务器

        // 存入localstorage
        let trolleyDB = getTrolley() || {};
        trolleyDB[id] = bookname;
        updateTrolley(trolleyDB);

        // 弹出确认加入购物车的对话框
        notifySuccess('加入购物车成功！',`${bookname}已经加入购物车。`)

        //  从书的列表中移除
        // this.props.deleteBook(id);

 }