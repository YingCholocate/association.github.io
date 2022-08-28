import React from "react";
import { Modal, Button } from 'antd';
import { Layout, Menu, List, Avatar, Divider, message, Pagination, Empty } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Outlet } from "react-router-dom";
import photohref from '../../../assets/photologo.png'
import axios from 'axios';
import url from '../../../utils/commonurl'
import style from './Home.module.css'
import { Collapse } from 'antd';
import path from '../../../assets/photologo.png'
import Qs from 'qs'
import Departahow from "../../../components/Departahow";
import { type } from "@testing-library/user-event/dist/type";
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
        shuzi: [],
        limitSize: 3,//每一页最多显示的记录数量
        type:''
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
    // 获取推文数据
    getarticleData = (num) => {

        axios.get(`association/resourcedata?type=1&currentPage=${num}`)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('article' + num, JSON.stringify(res.data))
                const arr1 = [];
                res.data[0].map(item => {
                    arr1.push(item)

                })
                this.setState({
                    articledata: arr1,
                    limitPage: res.data[1],//一共分为多少页
                    total: res.data[2]//总共有多少条数据
                })
            })
            .catch(error => {
                console.log(error);

            });
    }
    getdep=(type)=>{
        if (localStorage.getItem(`type${type}`)) {
            console.log(type)
            const arr2 = [];
            const arr3 = [];
            const arr4 = [];
            const arr5 = [];

            let item = JSON.parse(localStorage.getItem(`type${type}`))

            switch (type) {
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
            this.setState({
                shuzi: arr2,
                jishu: arr3,
                mishu: arr4,
                yance: arr5
            })
        }
    }
    componentDidMount() {
        let article = JSON.parse(localStorage.getItem('article1'))
        if (article) {
            this.setState({
                articledata: article[0],
                limitPage: article[1],//一共分为多少页
                total: article[2]//总共有多少条数据
            })
        } else {
            // 获取社团资源
            this.getarticleData(1)
        }

        axios.get('association/resourcedata?type=3')
            .then(res => {
                const arr2 = [];
                const arr3 = [];
                const arr4 = [];
                const arr5 = [];
                res.data.map(item => {
                    switch (item.type) {
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
                    shuzi: arr2,
                    jishu: arr3,
                    mishu: arr4,
                    yance: arr5,
                    departdata: arr3,
                    departtitle: '技术部资源'
                })
            })
            .catch(error => {
                this.getdep(3)
            });
    }

    // 请求公共资源部门数据
    getdepart = (type) => {
        this.setState({type,type})
        axios.get(`association/resourcedata?type=${type}`)
            .then(res => {
                const arr2 = [];
                const arr3 = [];
                const arr4 = [];
                const arr5 = [];
                res.data.map(item => {
                    switch (item.type) {
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
                    shuzi: arr2,
                    jishu: arr3,
                    mishu: arr4,
                    yance: arr5,
                    departdata: res.data
                })
            })
            .catch(error => {
                this.getdep(type)
               
            });
    }

    // 展示资源
    showdepart = (e) => {
        if (e.key === '1') {
            this.getdepart(3)
            this.setState({
                departtitle: '技术部资源'
            })
        }
        if (e.key === '2') {
            this.getdepart(2)
            this.setState({
                departtitle: '数资部资源'
            })
        }
        if (e.key === '3') {
            this.getdepart(4)
            this.setState({
                departtitle: '秘书处资源'
            })
        }
        if (e.key === '4') {
            this.getdepart(5)
            this.setState({
                departtitle: '研策部资源'
            })
        }

    }
    // 修改page数据
    pageonChange = (e) => {
        console.log(JSON.parse(localStorage.getItem('article')))
        this.getarticleData(e)
    }
    render() {
        const { visible, loading, total, limitSize,type } = this.state;
        return (
            <div className={style.homecontent}>
                <Divider orientation="left">社团公共资源</Divider>
                <div className={style.resourcecontent}>
                    <div className={style.leftresource}>
                        <Layout className="site-layout-background" >
                            <Sider className="site-layout-background" style={{ maxWidth: '200px' }}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%' }}
                                    onClick={this.showdepart}
                                >
                                    <Menu.Item icon={<UserOutlined />} key="1" >技术部</Menu.Item>
                                    <Menu.Item icon={<LaptopOutlined />} key="2">数资部</Menu.Item>
                                    <Menu.Item icon={<NotificationOutlined />} key="3">秘书处</Menu.Item>
                                    <Menu.Item icon={<UserOutlined />} key="4">研策部</Menu.Item>

                                </Menu>
                            </Sider>
                            <Departahow departtitle={this.state.departtitle} departdata={type===2?this.state.shuzi:type===3?this.state.jishu:type===4?this.state.mishu:this.state.yance} visible={visible} />
                        </Layout>
                    </div>
                </div>
                <div className={style.bottomstyle}>
                    <Divider orientation="left">社团推文</Divider>
                    <List
                        className={style.liststyle}
                        itemLayout="horizontal"
                        dataSource={this.state.articledata}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar href={path} />}
                                    title={<a href={item.link} target="_blank">{item.title}</a>}
                                    description={item.uploadtime}
                                />

                                <Button className={style.buttonstyle} onClick={() => this.handleDelete(item.id)}>delete</Button>
                            </List.Item>
                        )}
                    />
                    <Pagination className={style.pagestyle} defaultCurrent={1} total={total} pageSize={limitSize} onChange={this.pageonChange} />
                </div>
            </div>
        );
    }


}
