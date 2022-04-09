import React from "react";
import { Modal, Button } from 'antd';
import { Layout, Menu, List, Avatar, Divider,message } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Outlet } from "react-router-dom";
import photohref from '../../../assets/photologo.png'
import axios from 'axios';
import url from '../../../utils/commonurl'
import style from './Home.module.css'
import { Collapse } from 'antd';
import Qs from 'qs'
const { Panel } = Collapse;

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class Home extends React.Component {
    state = {
        loading: false,
        visible: false,
        articledata: [],//推文
        resourcedata: [],//总的资源
        jishu: [],
        mishu: [],
        yance: [],
        shuzi: []
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    // 删除推文
    handleDelete = (index) => {
        console.log(index)
        axios('/association/resourcedata', {
            data: {
                "type": 1,
                "id": index,
                "method": "delete"
            },
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }]
        }).then(res => {
            message.success('删除成功')
        })
        const articledata = this.state.articledata;
        var newdata = articledata.filter(function (item) {
            return item.id != index
        })
        this.setState({
            articledata: newdata
        })

    }
    componentDidMount() {
        axios.get('association/resourcedata')
            .then(res => {
                this.setState({
                    resourcedata: res.data,

                })
                console.log(res.data)
                localStorage.setItem('resourcedata', JSON.stringify(res.data))
                const arr1 = [];
                const arr2 = [];
                const arr3 = [];
                const arr4 = [];
                const arr5 = [];
                res.data.map(item => {
                    switch (item.type) {
                        case 1:
                            arr1.push(item);
                            break;
                        case 2:
                            arr2.push(item);
                            break;
                        case 3:
                            arr3.push(item);
                            break;
                        case 4:
                            arr4.push(item);
                            break;
                        case 5:
                            arr5.push(item);
                            break;


                    }


                })
                this.setState({
                    articledata: arr1,
                    shuzi: arr2,
                    jishu: arr3,
                    mishu: arr4,
                    yance: arr5

                })

            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                {/* 任务提醒 */}
                <Button type="primary" onClick={this.showModal}>
                    您有新任务
                </Button>
                <Divider orientation="left">社团公共资源</Divider>
                <div className={style.resourcecontent}>
                    {/* 消息列表 */}
                    <Card title="技术部资源" extra={<a href="#">More</a>} style={{ width: 300, margin: "5px" }}>
                        {this.state.jishu.map(item => {
                            return <p key={item.id}><a href={item.link} target="_blank">{item.title}</a></p>
                        })}
                    </Card>
                    {/* 消息列表 */}
                    <Card title="数资部资源" extra={<a href="#">More</a>} style={{ width: 300, margin: "5px" }}>
                        {this.state.shuzi.map(item => {
                            return <p key={item.id}><a href={item.link} target="_blank">{item.title}</a></p>
                        })}
                    </Card>
                    {/* 消息列表 */}
                    <Card title="研策部资源" extra={<a href="#">More</a>} style={{ width: 300, margin: "5px" }}>
                        {this.state.yance.map(item => {
                            return <p key={item.id}><a href={item.link} target="_blank">{item.title}</a></p>
                        })}
                    </Card>
                    {/* 消息列表 */}
                    <Card title="秘书处资源" extra={<a href="#">More</a>} style={{ width: 300, margin: "2px" }}>
                        {this.state.mishu.map(item => {
                            return <p key={item.id}><a href={item.link} target="_blank">{item.title}</a></p>
                        })}
                    </Card>

                </div>

                <Divider orientation="left">社团推文</Divider>
                <List
                    className={style.liststyle}
                    itemLayout="horizontal"
                    dataSource={this.state.articledata}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar href="../../../assets/photologo.png" />}
                                title={<a href={item.link} target="_blank">{item.title}</a>}
                                description={item.uploadtime}
                            />

                            <Button className={style.buttonstyle} onClick={() => this.handleDelete(item.id)}>delete</Button>
                        </List.Item>
                    )}
                />
                <Modal
                    visible={visible}
                    title="工作安排"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[

                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            确认收到
                        </Button>,
                        <Button key="back" onClick={this.handleCancel}>
                            有事请假
                        </Button>,

                    ]}
                >
                    <p>社团活动物资组,工作内容</p>

                </Modal>

            </div>
        );
    }


}
