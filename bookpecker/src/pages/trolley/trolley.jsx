import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Popconfirm, Form, Typography, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { content_bg_color } from "../../assets/color"
import { getTrolleyList, updateTrolleyData } from "../../redux/actions.js"
import { calSubtotal, formatMoney } from "../../utils/money-calculator"

const { Text } = Typography;

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `必须填写${title}.`,
                    },
                    {
                        // 验证qty的规则必须是0-100内的正整数
                        pattern: /^[1-9][0-9]{0,1}$/,
                        message: "限购99本，请输入正确的数量。"
                    }
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} style={{ width: "50%" }} />
            </Form.Item>

        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};



class Trolley extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "封面",
                dataIndex: 'cover',
                width: '15%',
                render: (url) =>this.props.dataSource.length >= 1?
                    // <div style={{
                    // background: `url(${url}) no-repeat center`,
                    // backgroundSize: 'contain',
                    // width: "100px",
                    // heigh: "150px",
                    // }}/>,
                    (<img src={url} style={{ height: 100 }} />):null,
            },
            {
                title: "书籍名称",
                dataIndex: 'bookname',
                width: '18%',
            },
            {
                title: "作者",
                dataIndex: 'author',

            },
            {
                title: "价格",
                dataIndex: 'price',
                width: '8%',
                render: (text) => this.props.dataSource.length >= 1?(
                    <Text>{formatMoney(text, "2", "￥")}</Text>
                ):null
            },
            {
                title: "数量",
                dataIndex: 'qty',
                width: '8%',
                editable: true,
                render: (text) => this.props.dataSource.length >= 1 ?(
                    <div style={{ width: "50%", display: "flex", justifyContent: "space-between" }}>
                        <Text>{text}&nbsp;&nbsp;</Text>
                        <EditOutlined style={{ marginTop: 3 }} />
                    </div>
                ):null,
            },
            {
                title: "小计",
                dataIndex: 'subtotal',
                width: '12%',
                // record是第二个传入的参数，要调取必须申明text
                render: (text, record) => this.props.dataSource.length >= 1 ? (
                <Text>{formatMoney(calSubtotal(record.qty,record.price),"2","￥")}</Text>
                ): null,
            },
            {
                title: '',
                dataIndex: 'delete',
                width: '8%',
                render: (text, record) =>
                    // 此处的record指这一行的数据对象
                    // this.state.dataSource.length >= 1 ? (
                    this.props.dataSource.length >= 1 ? (
                        <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>删除</a>
                        </Popconfirm>
                    ) : null,
            },
        ]

        this.state = {
            // dataSource: [
            //     {
            //         key: "1",
            //         cover: "http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png",
            //         bookname: 'I have a dream',
            //         author: "Edward King",
            //         price: 32.00,
            //         qty: 1,
            //         subtotal: 0,

            //     },
            //     {
            //         key: "2",
            //         cover: "http://huaxia.com/zhwh/yd/images/2018/09/18/2097945.png",
            //         bookname: 'I have another dream',
            //         author: "Edward King",
            //         price: 16.00,
            //         qty: 2,
            //         subtotal: 0,
            //     },
            // ],
            count: 2, //例子中带着，不确定有没有用
            // 用于存储表格中用户选中的row所对应data的key
            keySelected: [],
        };
        // this.props.getTrolleyList();
    }

    componentDidMount(){
        this.props.getTrolleyList();
    }
    

    handleDelete = key => {
        const dataSource = [...this.props.dataSource];
        // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        const newData = dataSource.filter(item => item.key !== key)
        //TODO 发送删除state并发送给服务器 | 删除localstorage

    };

    handleSave = row => {
        const newData = [...this.props.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        // this.setState({
        //     dataSource: newData,
        // }); 
        updateTrolleyData(newData);
        console.log("updated")
    };

    // 表格每行checkbox的事件回调
    /**
     * @param selectedRowkeys: 所有选中的行的key
     * @param selectedRows: 所有选中行的数据对象列表
     * @param record: 所选中行的数据对象
     * @param selected: boolean, 是否选中
     */
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            // console.log(record, selected, selectedRows);
            let { keySelected } = this.state;
            if (selected) {
                keySelected.push(record.key);
                this.setState({ keySelected })
            } else {
                this.setState({ keySelected: keySelected.filter((key) => key !== record.key) })
            }
            console.log(this.state.keySelected)
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            // console.log(selected, selectedRows, changeRows);
            this.setState({ keySelected: selectedRows.map(record => record.key) })
        },
    };

    render() {
        console.log("trolley rendered")
        // const { dataSource } = this.state;
        // console.log(this.props.dataSource)
        const { dataSource } = this.props;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        return (
            <Table
                style={{
                    width: 1470,
                    margin: "20px auto"
                }}
                rowSelection={this.rowSelection} //每行checkbox的点击事件
                pagination={false} //取消分页器
                components={components}
                // rowClassName={() => 'editable-row'}
                bordered={false}
                dataSource={dataSource}
                columns={columns}
                // 总计条的逻辑
                summary={table_data => {
                    let total_price = 0;
                    const selected_data = table_data.filter(record => this.state.keySelected.includes(record.key));
                    // console.log(selected_data)
                    selected_data.forEach(({ qty, price }) => {
                        total_price += calSubtotal(qty,price);
                    })

                    return (
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={4}>总计</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}>
                                <Text type="warning" style={{ fontSize: 18 }}>{formatMoney(total_price,"2","￥")}</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4} colSpan={3}>
                                <Button type="primary" style={{ width: "80%", height: "100%", fontSize: 16 }}>购买</Button>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )
                }}
            />
        )
    }
}

Trolley.propTypes = {
    getTrolleyList: PropTypes.func.isRequired,
    updateTrolleyData: PropTypes.func.isRequired,
    dataSource: PropTypes.array.isRequired,
}


export default connect(
    state => ({ dataSource: state.trolley_data }),
    { getTrolleyList, updateTrolleyData},
)(Trolley)