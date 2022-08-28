
import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Radio, Carousel, message, Select, List, InputNumber, Typography } from 'antd';
import printCalendar from "./calendar";
import { SketchPicker } from 'react-color';
import axios from "axios";
import { Footer } from "antd/lib/layout/layout";
import storage from "redux-persist/lib/storage";
import './schedule.module.css'
import url from '../../utils/commonurl'
import style from './schedule.module.css'
import { reqCourse } from "../../api";
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import Newweb from "./newweb";
import path from "../../assets/photologo.png"
import Qs from 'qs'
const CollectionsPage = () => {
    // 左右样式切换
    const [left, setleft] = useState(style.toleft)
    const [right, setright] = useState(style.toright)

    let time = new Date();
    const { role, username, number } = JSON.parse(localStorage.getItem("token"))
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
            C7: '',

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
        let fi = [];
        axios.get(`/association/startandend?id=1`).then(res => {
            // console.log("fi",res.data[0].start)
            // 第一周时间
            fi = res.data[0].start
        })
        return fi
    }

    )
    // 每个星期的日期Date形式
    const [arrd, setarrd] = useState()
    const [fidate, setfidate] = useState([])
    // 设置点击的number
    const [nownumber, setnoenumber] = useState(number)
    const getdaytime = (arrday) => {
        console.log("arrday", arrday)
        // 第一周时间
        let day = new Date(arrday[0].start)

        setfidate(day)
        let dayend = new Date(arrday[0].end)

        let oneDayTime = 1000 * 60 * 60 * 24
        let dayduring = parseInt((dayend.getTime() - day.getTime()) / oneDayTime / 7) + 1;

        let arr = [];

        let days = time.getTime() - day.getTime();
        let daytime = day.getTime();
        // 当前第几周
        let zc = parseInt(days / (oneDayTime) / 7) + 1;

        // 当前星期几
        let xq = time.getDay();
        for (let i = 0; i < dayduring; i++) {
            let week = new Date(daytime);
            daytime += oneDayTime * 7
            arr.push(week)

        }
        setfidate(arr);

        localStorage.setItem("fidate", JSON.stringify(arr));
        setzc(zc)
        setxq(xq);
    }
    useEffect(() => {
        axios.get("/association/startandend?id=1").then(res => {
            getdaytime(res.data)
        }).catch(err => {
            let arr = [{
                "id": 1,
                "start": "2022-02-21",
                "end": "2022-07-10"
            }
            ]
            getdaytime(arr)

        })
    }, [])



    useEffect(() => {
        let oneDayTime = 1000 * 60 * 60 * 24
        let newtime = new Date(fidate[zc - 1])
        let arrdate = [];
        if (fidate[zc - 1]) {
            let weekstartTime = newtime.getTime();
            let weekdate = [];

            for (let i = 0; i < 7; i++) {
                let week = new Date(weekstartTime);
                weekstartTime += oneDayTime
                let weekstr = week.getDate()
                weekdate.push(weekstr)
                arrdate.push(week)

            }
            setarrd([...arrdate]);
            setmonth(newtime.getMonth() + 1)
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
            title: firstdate[0] ? '周一' + firstdate[0] : '周一',
            dataIndex: '1',
        },
        {
            title: firstdate[1] ? '周二' + firstdate[1] : '周二',
            dataIndex: '2',
        },
        {
            title: firstdate[2] ? '周三' + firstdate[2] : '周三',
            dataIndex: '3',
        },
        {
            title: firstdate[3] ? '周四' + firstdate[3] : '周四',
            dataIndex: '4',
        },
        {
            title: firstdate[4] ? '周五' + firstdate[4] : '周五',
            dataIndex: '5',
        },
        {
            title: firstdate[5] ? '周六' + firstdate[5] : '周六',
            dataIndex: '6',
        },
        {
            title: firstdate[6] ? '周日' + firstdate[6] : '周日',
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
                        name="zcstart"
                        label="第几周开始上课"
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
                            {zoucichildren}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="zcend"
                        label="第几周结束上课"
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
                    <Form.Item name="bgcolor" label="课程背景颜色">
                        <Input type='color' value='#1890ff' />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    // const [index, setindex] = useState(() => {
    //     let ii = 1
    //     axios.get(` http://localhost:5000/usercourse?number=${number}`)
    //         .then(res => {
    //             ii = res.data[0].id
    //         }
    //         )
    //     return ii

    // })
    const [sumall, setsumall] = useState([]);
    const [timedate, settimedate] = useState('');
    const getonecourse = (carr) => {
        console.log(carr)
        setsumall(carr)
        let coursed = carr.filter((item, index) => {
            if (item) {
                let zcarr = carr[index].cd[0]['zc'].split(',')
                return (zc >= zcarr[0]) && (zc <= zcarr[1])
            }

        }

        )
        let newcoursed = []
        let knotarr = []
        coursed.map(item => {
            newcoursed.push(item.cd[0]);
            knotarr.push(item.cd[0]['jcdm2']);
        })
        let time = localStorage.getItem('time');
        let timedate = new Date(time);
        settimedate(timedate)
        console.log(newcoursed)
        setcource([...newcoursed])
        setknot([...knotarr])
    }
    const getCourse = (number) => {
        axios.get(`association/course?method=getone`, {
            params: {
                index: number
            }
        })
            .then(res => {
                getonecourse(res.data)
            }).catch(err => {
                console.log("number", number)
                if (number === '32156789' || number === '35456') {
                    if (localStorage.getItem('courcearr1')) {
                        let ccc=JSON.parse(localStorage.getItem('courcearr1'))
                        getonecourse(ccc)
                    }else{
                        let courcearr = [
                            {
                                id: 0, stuid: '32156789', courseid: 1, cd: [{ id: 0, zc: '7,8', kcmc: 8, jcdm: '0304', jcdm2: '03,04', kcmc: 8, xq: 1, courseid: 1, cou: [{ bgcolor: '#FF6699', cid: 0, cname: '形势与政策', courseid: 1 }] }]
                            },
                            {
                                id: 0, stuid: '32156789', courseid: 1, cd: [{ id: 0, zc: '11,14', kcmc: 7, jcdm: '0304', jcdm2: '03,04', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#CC0066', cid: 0, cname: '大学生就业创业指导', courseid: 1 }] }]
                            },
                            {
                                id: 0, stuid: '32156789', courseid: 1, cd: [{ id: 0, zc: '1,12', kcmc: 1, jcdm: '0304', jcdm2: '06,07', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: 'pink', cid: 0, cname: '大数据存储及应用', courseid: 1 }] }]
                            }, {
                                id: 0, stuid: '32156789', courseid: 1, cd: [{ id: 0, zc: '1,12', kcmc: 4, jcdm: '0304', jcdm2: '03,04', jxcdmc: '教109', xq: 3, courseid: 1, cou: [{ bgcolor: '#FF0099', cid: 0, cname: '大数据可视化', courseid: 1 }] }]
                            }, {
                                id: 0, stuid: '32156789', courseid: 1, cd: [{ id: 0, zc: '1,16', kcmc: 2, jcdm: '0304', jcdm2: '01,02', jxcdmc: '教109', xq: 4, courseid: 1, cou: [{ bgcolor: 'yellow', cid: 0, cname: '互联网金融大数据分析', courseid: 1 }] }]
                            }, {
                                id: 0, stuid: '32156789', courseid: 1, cd: [{ id: 0, zc: '4,19', kcmc: 6, jcdm: '0304', jcdm2: '03,04', jxcdmc: '教109', xq: 4, courseid: 1, cou: [{ bgcolor: 'orange', cid: 0, cname: '决策理论与方法', courseid: 1 }] }]
                            }, {
                                id: 0, stuid: '32156789', courseid: 1, cd: [{ id: 0, zc: '1,12', kcmc: 3, jcdm: '0304', jcdm2: '03,04', jxcdmc: '教109', xq: 5, courseid: 1, cou: [{ bgcolor: '#FF3333', cid: 0, cname: '人工智能基础', courseid: 1 }] }]
                            }]
                          
                        localStorage.setItem('courcearr1', JSON.stringify(courcearr))
                        getonecourse(courcearr)
                    }
                   

                }
                else {
                    if (localStorage.getItem('courcearr2')) {
                        let ccc=JSON.parse(localStorage.getItem('courcearr2'))
                        getonecourse(ccc)
                    }else{
                    const courcearr = [{
                        id: 0, stuid: '67890', courseid: 3, cd: [{ id: 0, zc: '1,10', kcmc: 15, jcdm: '0304', jcdm2: '10,11,12', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#A52A2A', cid: 0, cname: '数学建模', courseid: 3 }] }]
                    }, {
                        id: 0, stuid: '67890', courseid: 3, cd: [{ id: 0, zc: '1,9', kcmc: 16, jcdm: '0304', jcdm2: '10,11,12', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#DC143C', cid: 0, cname: '网络安全技术', courseid: 3 }] }]
                    }]
                    localStorage.setItem('courcearr2', JSON.stringify(courcearr))
                    getonecourse(courcearr)
                }
            }

            })
    }
    // 定义点击的效果切换
    const [hoverstyle, sethoverstyle] = useState(style.beforehover)
    useEffect(() => {
        if (nownumber == number)
            getCourse(number)
        else {
            getCourse(nownumber)
        }
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
        console.log(cource)
        if (cource) {
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
                            ["C" + item['xq']]: [item.cou[0].cname, item.cou[0].bgcolor],

                        }
                    } else {
                        displaydata[ii] = { ...displaydata[ii] }
                    }
                })
            })
        }


        setdata([...displaydata])

    }, [cource])

    // 增添课表或人员数据
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        let arr = []
        console.log(parseInt(values.jcdm2) + 1)
        axios('/association/course', {
            data: {
                ...values,
                "zc": values.zcstart + ',' + values.zcend,
                "jcdm2": values.jcdm2 + ',' + (parseInt(values.jcdm2) + 1),
                "index": number
            },
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }]
        }).then(response => {
            message.success('上传成功')

        }).catch(err => {
            let data = {
                id: 0, zc: values.zcstart + ',' + values.zcend, kcmc: 8, jcdm: '0304', jcdm2: values.jcdm2 + ',' + (parseInt(values.jcdm2) + 1), kcmc: 8, xq: 1, courseid: 1, cou: [{ bgcolor: values.bgcolor, cid: 0, cname: values.kcmc, courseid: 1 }]

            }
            console.log(data)
            console.log([...cource, data])
            let temparr=[...cource, data]
            // localStorage.setItem('courcearr1',JSON.parse(temparr))
            setcource([...cource, data])
            message.success('上传成功')
        })

        setVisible(false);
    };

    let userdata = JSON.parse(localStorage.getItem('alluser'))
    if(!userdata){
       userdata=[["admin数资部工作人员", "32156789"],
         ["people数资部工作人员", "35456"]
       , ["b技术部工作人员", "66667"]
        ,["a秘书处工作人员", "67890"]
        , ["d主席", "6888"]
       ,["c研策部工作人员", "896667"]]
    }
    const seecourse = (e, value, id) => {
        console.log(id)
        console.log(value)
        getCourse(value[1])
        setnoenumber(value[1])
        sethoverstyle(style.listhoverstyle)

    }
    // 点击上一周
    const courcetoLeft = (e) => {
        if (zc > 1) {
            setzc(() => zc - 1)
            setright(style.toright)

        } else {
            setzc(() => 1)

        }
        if (zc == 2) {
            setleft(style.toleftban)
        }
    }
    // 点击下一周
    const courcetoRight = () => {
        if (zc < 21) {
            setzc(() => zc + 1)
            setleft(style.toleft)
        } else {
            setzc(() => 21)

        }
        if (zc == 20) {
            setright(style.toleftban)
        }
    }
    return (
        <div>

            <LeftOutlined className={left} onClick={courcetoLeft} />
            <RightOutlined className={right} onClick={courcetoRight} />
            <div className={style.tablecontent}>

                <table className={style.diffen}>
                    {/* 表头 */}
                    <thead className={style.theadstyle}>
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
                                // console.log(data)
                                return (

                                    <tr key={index} className={style.tdtext}>
                                        <th scope="row">{item.key}</th>

                                        {item.C1 ? (arrd && arrd[0] && arrd[0] < time ? <td style={{ backgroundColor: "lightgray" }}>{item.C1[0]}</td> : <td style={{ backgroundColor: item.C1[1] }}>{item.C1[0]}</td>) : <td >{item.C1}</td>}
                                        {item.C2 ? (arrd && arrd[1] && arrd[1] < time ? <td style={{ backgroundColor: "lightgray" }}>{item.C2[0]}</td> : <td style={{ backgroundColor: item.C2[1] }}>{item.C2[0]}</td>) : <td>{item.C2}</td>}
                                        {item.C3 ? (arrd && arrd[2] && arrd[2] < time ? <td style={{ backgroundColor: "lightgray" }}>{item.C3[0]}</td> : <td style={{ backgroundColor: item.C3[1] }}>{item.C3[0]}</td>) : <td>{item.C3}</td>}
                                        {item.C4 ? (arrd && arrd[3] && arrd[3] < time ? <td style={{ backgroundColor: "lightgray" }}>{item.C4[0]}</td> : <td style={{ backgroundColor: item.C4[1] }}>{item.C4[0]}</td>) : <td>{item.C4}</td>}
                                        {item.C5 ? (arrd && arrd[4] && arrd[4] < time ? <td style={{ backgroundColor: "lightgray" }}>{item.C5[0]}</td> : <td style={{ backgroundColor: item.C5[1] }}>{item.C5[0]}</td>) : <td>{item.C5}</td>}
                                        {item.C6 ? (arrd && arrd[5] && arrd[5] < time ? <td style={{ backgroundColor: "lightgray" }}>{item.C6[0]}</td> : <td style={{ backgroundColor: item.C6[1] }}>{item.C6[0]}</td>) : <td>{item.C6}</td>}
                                        {item.C7 ? (arrd && arrd[6] && arrd[6] < time ? <td style={{ backgroundColor: "lightgray" }}>{item.C7[0]}</td> : <td style={{ backgroundColor: item.C7[1] }}>{item.C7[0]}</td>) : <td>{item.C7}</td>}
                                    </tr>

                                )

                            })
                            // :
                        }
                    </tbody>

                </table>
                <div className={style.leftcontent}>
                    <div className={style.headerstyle}>
                        <div className={style.headertext}>社团人员</div>
                    </div>
                    <div className={style.usercontent} >
                        {userdata.map((item, id) => {
                            return <div key={id} onClick={(e) => seecourse(e, item)} className={style.liststyle} style={{ background: item[1] == nownumber ? 'rgba(50, 166, 205, 0.241)' : 'white' }}>
                                <div key={id} >{item[0]}</div>
                            </div>
                        })}
                    </div>


                </div>
            </div>

            {nownumber === '32156789' ?
                <Button
                    type="primary"
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    添加课程
                </Button> : ''
            }
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


