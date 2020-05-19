import { useState } from "react";

/** 管理登录状态信息的hook */
export function useLoginStatus() {
    
    const [isLogin, setIsLogin] = useState(null);

    //TODO 查看cookie的token信息
    if (true) {
        setIsLogin(false)
    }
    else {
        setIsLogin(true)
    }


    if (isLogin === null) {
        return 'Loading...';
    }
    return isLogin
}