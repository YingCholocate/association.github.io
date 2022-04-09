
import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Radio, Carousel, Select } from 'antd';
import printCalendar from "./calendar";
import axios from "axios";
import { Footer } from "antd/lib/layout/layout";
import storage from "redux-persist/lib/storage";
import './schedule.module.css'
import url from '../../utils/commonurl'
import style from './schedule.module.css'
import { reqCourse } from "../../api";
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import Newweb from "./newweb";

const CollectionsPage = () => {
    let time = new Date();
    const [month, setmonth] = useState(time.getMonth() + 1)
    var day = printCalendar(2022, 3, 1);
    const { Option } = Select;

    const initialData = [
        {
            key: '1',
            name: '1',
            C1: '',
            C2: '',
            C3: '',
            C4: '',
            C5: '',
            C6: '',
            C7: ''
        },
        {
            key: '2',
            name: '2',
        },
        {
            key: '3',
            name: '3',

        },
        {
            key: '4',
            name: '4'

        },
        {
            key: '5',
            name: '5',

        }, {
            key: '6',
            name: '6',

        }, {
            key: '7',
            name: '7',

        },
        {
            key: '8',
            name: '8',

        },
        {
            key: '9',
            name: '9',

        },
        {
            key: '10',
            name: '10',

        },
        {
            key: '11',
            name: '11',

        },
        {
            key: '12',
            name: '12',

        },
    ]
    const [visible, setVisible] = useState(false);
    const [active, setactive] = useState(false);
    const [arr, setarr] = useState(Array(21).fill());
    // 设置课程节数
    const [knot, setknot] = useState([])
    // 设置课表数据
    const [cource, setcource] = useState([]);

    const [zc, setzc] = useState(1)
    const [xq, setxq] = useState(1)
    // 每一行的数据
    const [data, setdata] = useState(initialData)
    // 每个星期的日期
    const [firstdate, setfirstdate] = useState(() => {
        let fi = "";
        axios.get("http://localhost:5000/startandend").then(res => {
            // console.log(res.data)
            // 第一周时间
            fi = res.data[0]
        })
        return fi
    }

    )
    const [fidate, setfidate] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/startandend").then(res => {
            // 第一周时间
            let day = new Date(res.data[0])
            setfidate(day)
            let dayend=new Date(res.data[1])
            let oneDayTime = 1000 * 60 * 60 * 24
            let dayduring=parseInt((dayend.getTime()-day.getTime())/oneDayTime/7);
            let arr=[];
            let days = time.getTime() - day.getTime();
            let daytime=day.getTime();
            // 当前第几周
            let zc = parseInt(days / (oneDayTime) / 7);
            // 当前星期几
            let xq = time.getDay();
            for (let i=0;i<dayduring;i++){
              let week=new Date(daytime);
                daytime+=oneDayTime*7
                arr.push(week)
                
            }
            setfidate(arr)
            localStorage.setItem("fidate",JSON.stringify(arr));
            setzc(zc)
            setxq(xq);
        })
    }, [])

    useEffect(() => {
        let oneDayTime = 1000 * 60 * 60 * 24
        let newtime=new Date(fidate[zc])
        
        if(fidate[zc]){
            let weekstartTime = newtime.getTime();
            let weekdate = [];
            for (let i = 0; i < 7; i++) {
                let week = new Date(weekstartTime);
                weekstartTime += oneDayTime
                let weekstr = week.getDate()
                weekdate.push(weekstr)
            }
            let week = new Date(weekstartTime);
            setmonth(newtime.getMonth()+1)
            // 当前周星期一
            setfirstdate([...weekdate]);
        }
        
    }, [zc])
    // 列标题
    const columns = [
        {
            title: month + '月' + '第' + zc + '周',
            dataIndex: 'name',
        },
        {
            title: '周一' + firstdate[0],
            dataIndex: '1',
        },
        {
            title: '周二' + firstdate[1],
            dataIndex: '2',
        },
        {
            title: '周三' + firstdate[2],
            dataIndex: '3',
        },
        {
            title: '周四' + firstdate[3],
            dataIndex: '4',
        },
        {
            title: '周五' + firstdate[4],
            dataIndex: '5',
        },
        {
            title: '周六' + firstdate[5],
            dataIndex: '6',
        },
        {
            title: '周日' + firstdate[6],
            dataIndex: '7',
        },
    ];


    let dataObj = data.forEach((item) => {
        Object.keys(item).forEach(key => {
            item[key] = day[0][key] == undefined ? item[key] : day[0][key]
        })
    })
    const zoucichildren = [];
    for (let i = 1; i < 22; i++) {
        zoucichildren.push(<Option key={i}>第{i}周</Option>)
    }
    function handlezoiciChange(value, index) {
        console.log(value)
    }
    const xqchildren = [];
    for (let i = 1; i < 8; i++) {
        xqchildren.push(<Option key={i}>星期{i}</Option>)
    }
    const jcdmchildren = [];
    for (let i = 1; i < 13; i++) {
        jcdmchildren.push(<Option key={i}>{i}</Option>)
    }
    // 添加课程
    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={visible}
                title="添加课程"
                okText="确认提交"
                cancelText="取消"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        name="kcmc"
                        label="课程名"
                        rules={[
                            {
                                required: true,
                                message: '请输入课程名!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="zc"
                        label="哪几周上课"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={handlezoiciChange}
                        >
                            {zoucichildren}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="xq"
                        label="星期几上课"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select

                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={handlezoiciChange}
                        >
                            {xqchildren}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="jcdm2"
                        label="从第几小节开始"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={handlezoiciChange}
                        >
                            {jcdmchildren}
                        </Select>
                    </Form.Item>
                    <Form.Item name="jxcdmc" label="上课地点(可选)">
                        <Input type="textarea" />
                    </Form.Item>

                </Form>
            </Modal>
        );
    };
    const { role, username, number } = JSON.parse(localStorage.getItem("token"))
    const [index, setindex] = useState(() => {
        let ii = 1
        axios.get(` http://localhost:5000/usercourse?number=${number}`)
            .then(res => {
                ii = res.data[0].id
            }
            )
        return ii

    })
    const [sumall, setsumall] = useState([]);
    const [timedate,settimedate]=useState('');
    useEffect(() => {
        axios.get(`http://localhost:5000/course/${index}?_embed=usercourse`)
            .then(res => {
                setsumall(res.data['coursealldata'])
                let coursed = res.data['coursealldata'].filter(item =>
                    item['zc'] == zc
                )
                let time=localStorage.getItem('time');
                let timedate=new Date(time);
                settimedate(timedate)
                setcource(coursed)
                const knotarr = []
                coursed.map(item => {
                    knotarr.push(item['jcdm2']);
                })
                setknot([...knotarr])
            })
    }, [zc])



    //    单元格的渲染
    /*
        length为渲染的周次，共21周
        cource为课程信息
        index为tr的索引，即第几行
    */
    // let list = (length, cource, ind) => {
    useEffect(() => {
        const courceidx = [];//第几节
        const xq = [];//星期几
        var tdarr = [];//td
        var canel = [];//第几周
        let charsnew = [];
        let displaydata = [...initialData]
        const arr = []
        cource.map((item, index) => {
            courceidx.push(item['jcdm2'])
            xq.push(item['xq'])
            const chars = item['jcdm2'].split(',')
            chars[0] = parseInt(chars[0])
            chars[1] = parseInt(chars[1])
            charsnew.push(chars)
            initialData.map((it, ii) => {
                if ((ii == chars[0] - 1) || (ii == chars[1] - 1)) {
                    displaydata[ii] = {
                        ...displaydata[ii],
                        ["C" + item['xq']]: item.kcmc
                    }
                } else {
                    displaydata[ii] = { ...displaydata[ii] }
                }
            })
        })
        setdata([...displaydata])

    }, [cource])

    // 增添课表或人员数据
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        let arr = []
        values.zc.map(item => {
            values = {
                ...values,
                zc: item,
                jcdm2: values.jcdm2.toString(),
            }
            arr.push(values)
        })
        let newsumall = [...sumall]
        arr.map(item => {
            newsumall.push(item)
        })
        console.log([...newsumall])
        axios.put(`http://localhost:5000/course/1`, {
            ['coursealldata']: [...newsumall]
        }).then(res => {
            console.log(values.zc)
            setcource([...newsumall])

        }

        )
        setVisible(false);
    };



    // 点击上一周
    const courcetoLeft = () => {
        if (zc > 1) {
            setzc(() => zc - 1)

        } else {
            setzc(() => 1)
        }
    }
    // 点击下一周
    const courcetoRight = () => {
        if (zc < 21) {
            setzc(() => zc + 1)
        } else {
            setzc(() => 21)
        }
    }
    return (
        <div>

            <LeftOutlined className={style.toleft} onClick={courcetoLeft} />
            <RightOutlined className={style.toright} onClick={courcetoRight} />
            <table className="diffen">
                {/* 表头 */}
                <thead>
                    <tr>
                        {
                            columns.map((item, index) => {
                                return (<th key={index} scope="col">{item.title}</th>)
                            })
                        }

                    </tr>
                </thead>

                <tbody>
                    {

                        data.map(function (item, index) {
                            return (
                                <tr key={index}>
                                    <th scope="row">{item.key}</th>
                                    <td>{item.C1}</td>
                                    <td>{item.C2}</td>
                                    <td>{item.C3}</td>
                                    <td>{item.C4}</td>
                                    <td>{item.C5}</td>
                                    <td>{item.C6}</td>
                                    <td>{item.C7}</td>
                                    {/* {
                                        <Fragment>{()=>list(arr.length, cource, index)}</Fragment>
                                    } */}
                                </tr>

                            )

                        })
                    }
                </tbody>

            </table>

            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                添加课程
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />

        </div>
    );
};
export default CollectionsPage


