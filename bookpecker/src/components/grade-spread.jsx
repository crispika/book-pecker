import React, { Component } from 'react'
import { Progress } from 'antd'
import { pale_olive } from "../assets/color"

export default class GradeSpread extends Component {
    render() {
        const {grade} = this.props;
        return (
            <div>
                <div className="grade-spread" style={{ display: "flex", height:30}}>
                    <pre style={{ flexFlow: 1, margin:0 }}>{grade[0]}  </pre>
                    <div className="process-wrapper" style={{ width: 100, flexGrow: 2 }}>
                        <Progress percent={grade[1]} size="small" strokeColor={pale_olive} />
                    </div>
                </div>
            </div>
        )
    }
}
