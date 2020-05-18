import React from 'react'
import { pale_olive,  light_aoi} from "../assets/color"
import {notification} from 'antd'
import {CheckCircleOutlined} from '@ant-design/icons'

export const notifySuccess = (msg,content) => {
    // 弹出确认加入购物车的对话框
    notification.open({
        message: msg,
        description:
            content,
        icon: <CheckCircleOutlined style={{ color: pale_olive }} />,
        style: {
            backgroundColor: light_aoi,
        },
    });
}