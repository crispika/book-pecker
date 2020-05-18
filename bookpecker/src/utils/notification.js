import React from 'react'
import { pale_olive, light_aoi, dark_red } from "../assets/color"
import { notification } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

export const notifySuccess = (msg, content) => {
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

export const notifyFailure = (msg, content) => {
    notification.open({
        message: msg,
        description:
            content,
        icon: <CloseCircleOutlined style={{ color: dark_red }} />,
        style: {
            backgroundColor: light_aoi,
        },
    });
}