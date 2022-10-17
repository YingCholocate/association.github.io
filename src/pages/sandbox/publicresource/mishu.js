import React, { useEffect, useRef, useState, useContext } from 'react'
import * as XLSX from 'xlsx'
import { Button, Popconfirm, Modal, Radio, Tag, Table, Switch, Select, Popover, Dropdown, Input, Form, DatePicker, Space, Menu, message, Upload, Tooltip } from 'antd';
import style from './mishu.module.css'
import axios from 'axios';
import { PlusOutlined, SwapOutlined, VerticalAlignBottomOutlined, SaveOutlined, EditOutlined, FileExcelOutlined } from '@ant-design/icons';
import { setBlockType } from 'draft-js/lib/DraftModifier';
import { useNavigate } from 'react-router-dom'
const { Option } = Select;
export default function Mishu() {
  // title标签
  const [title, settitle] = useState('普通活动人员安排')
  // 改变日期
  const [time, settime] = useState('');
  const ondateChange = (value) => {
    localStorage.setItem('time', value)
    settime(value);
    message.info('自动筛选当天有课人员成功!')
  }
  // 初始摊位数据
  const [tanweidata, settanweidata] = useState([
    { 时间: '8：00-10:00', 内容: '', 人员: "", 注意事项: '', key: 0 },
    { 时间: '10：00-12:00', 内容: '', 人员: "", 注意事项: '', key: 1 },
    { 时间: '12:00-14:00', 内容: '', 人员: "", 注意事项: '', key: 2 },
    { 时间: '14:00-16:00', 内容: '', 人员: "", 注意事项: '', key: 3 },
    { 时间: '16:00-17:40', 内容: '', 人员: "", 注意事项: '', key: 4 },
    { 时间: '17:40-18:00', 内容: '', 人员: "", 注意事项: '', key: 5 },
  ])
  // 初始摊位列数据
  const [tanweicoldata, settanweicoldata] = useState([
    {
      id: 'time',
      title: '时间',
      type: "input",
      dataIndex: '时间',
      key: '时间'
    }, {
      id: 'content',
      title: '内容',
      type: "input",
      dataIndex: '内容',
      key: '时间'
    },
    {
      id: 'person',
      title: '人员',
      type: "select",
      dataIndex: '人员',
      key: '人员'
    }, {
      id: 'notice',
      title: '注意事项',
      type: 'input',
      dataIndex: '注意事项',
      key: '注意事项'
    },

  ])
  // 初始普通活动数据
  const [initialdata, setinialdata] = useState([
    { 组别: '技术组', 事项: '调试现场设备，调试摄像设备', 负责人: '', 成员: '', key: 0 },
    { 组别: '物资组', 事项: '清点物资', 负责人: '', 成员: '', key: 1 },
    { 组别: '控场组', 事项: '维持活动现场秩序（入场、活动过程中及出场）', 负责人: '', 成员: '', key: 2 },
    { 组别: '工作人员签到组', 事项: '负责工作人员签到', 负责人: '', 成员: '', key: 3 },
    { 组别: '活动报名负责组', 事项: 'Python训练营的报名', 负责人: '', 成员: '', key: 4 },
    { 组别: '布场、清场组', 事项: '布置、清理场地', 负责人: '', 成员: '', key: 5 }

  ])
  // 初始普通活动数据
  const [initialcoldata, setinialcoldata] = useState([
    {
      id: "group",
      title: "组别",
      type: "input",
      dataIndex: "组别",
      key: '组别'
    },
    {
      id: "notice",
      title: '事项',
      type: "input",
      dataIndex: "事项",
      key: '事项'
    },
    {
      id: 'principal',
      title: '负责人',
      dataIndex: "负责人",
      key: '负责人',
      type: "select"
    }, {
      id: 'member',
      title: '成员',
      dataIndex: "成员",
      key: '成员',
      type: "select"
    }
  ])
  // 展示的数据
  const [importExcel, setimportExcel] = useState([...initialdata])
  const [coldata, setcoldata] = useState([...initialcoldata])
  // 临时数据
  const [normaldata, setnormaldata] = useState([...initialdata])
  const [normalcol, setnormalcol] = useState([...initialcoldata])
  const [tanwetempdata, settanwetempdata] = useState([...tanweidata])
  const [tanwetempcol, settanwetempdatacol] = useState([...tanweicoldata])
  // 用户信息
  const [userdata, setuserdata] = useState(() => {
    let userotherdata = []
    axios.get('/association/users?method=getall')
      .then(res => {
        res.data.map((item, index) => {
          userotherdata.push([item.username + item.role[0]['rolevalue'], item.number])
        })
        // console.log(userotherdata)
        localStorage.setItem('alluser', JSON.stringify(userotherdata))
      }
      ).catch(err => {
        let userother = [["admin数资部工作人员", "32156789"],
        ["people数资部工作人员", "35456"]
          , ["b技术部工作人员", "66667"]
          , ["a秘书处工作人员", "67890"]
          , ["d主席", "6888"]
          , ["c研策部工作人员", "896667"]]

        localStorage.setItem('alluser', JSON.stringify(userother))
      })
    return userotherdata
  }

  )
  console.log("userdata", userdata)
  // 添加部门
  const adddepartment = (item, colorarr) => {

    let rolename = item.role[0]['rolevalue']
    if (rolename == '数资部工作人员') {
      colorarr.push('blue')
    } else if (rolename === '技术部工作人员') {
      colorarr.push('green')
    } else if (rolename === '秘书处工作人员') {
      colorarr.push('pink')
    } else if (rolename === '研策部工作人员') {
      colorarr.push('purple')
    } else {
      colorarr.push('gold')
    }
    setcolor([...colorarr])
  }
  // 添加一列的key值
  const [colkey, setcolkey] = useState([])
  // 现在输入的值
  const [key, setkey] = useState('')
  // 向服务器请求工作人员的名称
  useEffect(() => {
    axios.get('/association/users?method=getall')
      .then(res => {
        console.log(res.data)
        let userotherdata = [];
        let colorarr = [];
        res.data.map(item => {
          adddepartment(item, colorarr)
          userotherdata = [...userotherdata, (item.username + item.role[0]['rolevalue'])]//Todo
        })
        console.log(",,,", userotherdata)
        setuserdata([...userotherdata])
      }

      ).catch(err => {
        let colorarr = [];
        let userarr = [];
        let userotherdata = [
          { department: 2, username: 'admin', password: '234567', number: '32156789', role: [{ id: 0, rolevalue: '数资部工作人员' }] },
          { department: 2, username: 'people', password: '345', number: '35456', role: [{ id: 0, rolevalue: '数资部工作人员' }] },
          { department: 4, username: 'b', password: '464', number: '66667', role: [{ id: 0, rolevalue: '技术部工作人员' }] },
          { department: 3, username: 'a', password: '3456', number: '67890', role: [{ id: 0, rolevalue: '秘书处工作人员' }] },
          { department: 6, username: 'd', password: '64', number: '6888', role: [{ id: 0, rolevalue: '主席' }] },
          { department: 5, username: 'c', password: '46', number: '896667', role: [{ id: 0, rolevalue: '研策部工作人员' }] }]
        // ['admin数资部工作人员', 'people数资部工作人员', 'b技术部工作人员', 'a秘书处工作人员', 'd主席', 'c研策部工作人员']
        userotherdata.map(item => {
          adddepartment(item, colorarr)
          userarr = [...userarr, (item.username + item.role[0]['rolevalue'])]
        })
        console.log(userarr)
        setuserdata([...userarr])
      })
  }, [])
  // 设置文件名
  const [filename, setfilename] = useState("")
  // 
  const [newdataSource, setnewdataSource] = useState([...importExcel]);
  // 设置select默认值
  const [normaldefault, setnormaldefault] = useState([])
  const [tanweidefault, settanweidefault] = useState([])
  // 设置筛选好有课的人员
  const [person, setperson] = useState([])
  // 设置标签颜色
  const [color, setcolor] = useState([]);
  // select默认值
  const [newimportExcel, setnewimportExcel] = useState([])
  // 设置输入框的value
  const [inputvalue, setinputvalue] = useState("")
  const [newlastimportExcel, setnlimportExcel] = useState([])
  // 设置是否被点击删除
  const [clicked, setclicked] = useState(false);
  const [coll, setcoll] = useState([])

  // 获取缓存是否有数据，没有则使用原始数据
  const getnormalStorage = () => {
    if (localStorage.getItem('inialdata')) {
      const inialdata = JSON.parse(localStorage.getItem('inialdata'));
      const inialcoldata = JSON.parse(localStorage.getItem('inialcoldata'))
      setimportExcel([...inialdata])
      setcoldata([...inialcoldata])
    }
  }
  const gettanweiStorage = () => {
    if (localStorage.getItem('tanweidata')) {
      const inialdata = JSON.parse(localStorage.getItem('tanweidata'));
      console.log(JSON.parse(localStorage.getItem('tanweidata')))
      const inialcoldata = JSON.parse(localStorage.getItem('tanweicoldata'))
      setimportExcel([...inialdata])
      setcoldata([...inialcoldata])
    }
  }
  useEffect(() => {
    if (title === "普通活动人员安排") {
      getnormalStorage()
    } else {
      gettanweiStorage()
    }

  }, [])
  // 获取工作成员的课表得到某时刻无法工作的人员
  useEffect(() => {
    axios.get(`/association/course?method=getall`).then(res => {
      console.log(res.data)
      let zc = 1;
      if (time) {
        let timedate = new Date(time);

        let oneDayTime = 1000 * 60 * 60 * 24
        let fidate = JSON.parse(localStorage.getItem('fidate'));
        let xq = timedate.getDay();
        let firsttimedate = timedate.getTime() - oneDayTime * (xq - 1);
        let newtimedate = new Date(firsttimedate);
        console.log("timedate", newtimedate)
        fidate.map((item, i) => {
          let first = new Date(item);
          if (first.toDateString() === newtimedate.toDateString()) {
            zc = i + 1;
          }
        })

        let zcarr = [];
        let arr = [];//ToDO
        res.data.map((item, index) => {
          let zcstart = item.cd[0].zc.split(',')
          if ((zc >= zcstart[0] && zc <= zcstart[1]) && (item.cd[0].xq === xq)) {
            zcarr.push(item)
            arr.push(item.stuid)
          }
        })
        // 符合周次和星期的课表详情
        console.log("zvarr", zcarr)
        function unique(arr) {
          return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
        }

        let newarr = []
        let usernamearr = []
        // 创建二维数组存储有课的工作人员
        console.log(",,,", [...userdata])
        let personarr = Array.from(Array(tanweidata.length), () => new Array(...userdata))
        for (let i = 0; i < zcarr.length; i++) {
          let username = "";
          axios.get('/association/users?method=getone', {
            params: {
              number: zcarr[i].stuid
            }
          }).then(res => {
            zcarr[i] = [zcarr[i], res.data.username + res.data.role[0].rolevalue]
            let username = res.data.username + res.data.role[0].rolevalue;
            console.log(res.data)
            if (res.data.department != 1) {
              // 將其放入对应的时间节次
              let jc = [1, 3, 6, 8]
              jc.map((j, index) => {
                if (zcarr[i][0].cd[0].jcdm2) {
                  let a = zcarr[i][0].cd[0].jcdm2.split(',');
                  if (parseInt(a[0]) === j) {
                    if (j === 1) {
                      const idx = personarr[0].findIndex(item => item === username)
                      personarr[0].splice(idx, 1)
                    }
                    if (j === 3) {
                      const idx = personarr[1].findIndex(item => item === username)
                      personarr[1].splice(idx, 1)
                    }
                    if (j === 6) {
                      const idx = personarr[3].findIndex(item => item === username)
                      personarr[3].splice(idx, 1)
                    }
                    if (j === 8) {
                      const idx = personarr[4].findIndex(item => item === username)
                      personarr[4].splice(idx, 1)
                    }

                  }
                }
              })


            }

          }).then(res => {
            setperson([...personarr]);
          }
          )
        }
      }
    }).catch(err => {
      let zc = 1;
      if (time) {
        let timedate = new Date(time);

        let oneDayTime = 1000 * 60 * 60 * 24
        let fidate = JSON.parse(localStorage.getItem('fidate'));
        let xq = timedate.getDay();
        let firsttimedate = timedate.getTime() - oneDayTime * (xq - 1);
        let newtimedate = new Date(firsttimedate);
        fidate.map((item, i) => {
          let first = new Date(item);
          if (first.toDateString() === newtimedate.toDateString()) {
            zc = i + 1;
          }
        })

        let zcarr = [];
        let arr = [];
        let courcearr1 = [
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
          }, {
            id: 0, stuid: '35456', courseid: 1, cd: [{ id: 0, zc: '7,8', kcmc: 8, jcdm: '0304', jcdm2: '03,04', kcmc: 8, xq: 1, courseid: 1, cou: [{ bgcolor: '#FF6699', cid: 0, cname: '形势与政策', courseid: 1 }] }]
          },
          {
            id: 0, stuid: '35456', courseid: 1, cd: [{ id: 0, zc: '11,14', kcmc: 7, jcdm: '0304', jcdm2: '03,04', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#CC0066', cid: 0, cname: '大学生就业创业指导', courseid: 1 }] }]
          },
          {
            id: 0, stuid: '35456', courseid: 1, cd: [{ id: 0, zc: '1,12', kcmc: 1, jcdm: '0304', jcdm2: '06,07', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: 'pink', cid: 0, cname: '大数据存储及应用', courseid: 1 }] }]
          }, {
            id: 0, stuid: '35456', courseid: 1, cd: [{ id: 0, zc: '1,12', kcmc: 4, jcdm: '0304', jcdm2: '03,04', jxcdmc: '教109', xq: 3, courseid: 1, cou: [{ bgcolor: '#FF0099', cid: 0, cname: '大数据可视化', courseid: 1 }] }]
          }, {
            id: 0, stuid: '35456', courseid: 1, cd: [{ id: 0, zc: '1,16', kcmc: 2, jcdm: '0304', jcdm2: '01,02', jxcdmc: '教109', xq: 4, courseid: 1, cou: [{ bgcolor: 'yellow', cid: 0, cname: '互联网金融大数据分析', courseid: 1 }] }]
          }, {
            id: 0, stuid: '35456', courseid: 1, cd: [{ id: 0, zc: '4,19', kcmc: 6, jcdm: '0304', jcdm2: '03,04', jxcdmc: '教109', xq: 4, courseid: 1, cou: [{ bgcolor: 'orange', cid: 0, cname: '决策理论与方法', courseid: 1 }] }]
          }, {
            id: 0, stuid: '35456', courseid: 1, cd: [{ id: 0, zc: '1,12', kcmc: 3, jcdm: '0304', jcdm2: '03,04', jxcdmc: '教109', xq: 5, courseid: 1, cou: [{ bgcolor: '#FF3333', cid: 0, cname: '人工智能基础', courseid: 1 }] }]
          }, {
            id: 0, stuid: '67890', courseid: 3, cd: [{ id: 0, zc: '1,10', kcmc: 15, jcdm: '0304', jcdm2: '10,11,12', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#A52A2A', cid: 0, cname: '数学建模', courseid: 3 }] }]
          }, {
            id: 0, stuid: '67890', courseid: 3, cd: [{ id: 0, zc: '1,9', kcmc: 16, jcdm: '0304', jcdm2: '10,11,12', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#DC143C', cid: 0, cname: '网络安全技术', courseid: 3 }] }]
          }, {
            id: 0, stuid: '6667', courseid: 3, cd: [{ id: 0, zc: '1,10', kcmc: 15, jcdm: '0304', jcdm2: '10,11,12', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#A52A2A', cid: 0, cname: '数学建模', courseid: 3 }] }]
          }, {
            id: 0, stuid: '6667', courseid: 3, cd: [{ id: 0, zc: '1,9', kcmc: 16, jcdm: '0304', jcdm2: '10,11,12', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#DC143C', cid: 0, cname: '网络安全技术', courseid: 3 }] }]
          }, {
            id: 0, stuid: '6888', courseid: 3, cd: [{ id: 0, zc: '1,10', kcmc: 15, jcdm: '0304', jcdm2: '10,11,12', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#A52A2A', cid: 0, cname: '数学建模', courseid: 3 }] }]
          }, {
            id: 0, stuid: '6888', courseid: 3, cd: [{ id: 0, zc: '1,9', kcmc: 16, jcdm: '0304', jcdm2: '10,11,12', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#DC143C', cid: 0, cname: '网络安全技术', courseid: 3 }] }]
          }, {
            id: 0, stuid: '896667', courseid: 3, cd: [{ id: 0, zc: '1,10', kcmc: 15, jcdm: '0304', jcdm2: '10,11,12', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#A52A2A', cid: 0, cname: '数学建模', courseid: 3 }] }]
          }, {
            id: 0, stuid: '896667', courseid: 3, cd: [{ id: 0, zc: '1,9', kcmc: 16, jcdm: '0304', jcdm2: '10,11,12', jxcdmc: '教109', xq: 1, courseid: 1, cou: [{ bgcolor: '#DC143C', cid: 0, cname: '网络安全技术', courseid: 3 }] }]
          }
        ]
        console.log(courcearr1)
        courcearr1.map((item, index) => {
          let zcstart = item.cd[0].zc.split(',')
          console.log("zc", zc)
          if ((zc >= zcstart[0] && zc <= zcstart[1]) && (item.cd[0].xq === xq)) {
            zcarr.push(item)
            arr.push(item.stuid)
          }
        })

        // 符合周次和星期的课表详情
        console.log("zvarr", zcarr)
        // 创建二维数组存储有课的工作人员
        console.log(",,,", [...userdata])
        let personarr = Array.from(Array(tanweidata.length), () => new Array(...userdata))
        for (let i = 0; i < zcarr.length; i++) {
          let jc = [1, 3, 6, 8]
          let username = ""
          userdata.map(item => {
            if (item.number === zcarr[i].stuid) {
              username = item.username;
            }
          })
          jc.map((j, index) => {
            if (zcarr[i].cd[0].jcdm2) {
              let a = zcarr[i].cd[0].jcdm2.split(',');
              if (parseInt(a[0]) === j) {
                if (j === 1) {
                  const idx = personarr[0].findIndex(item => item === username)
                  personarr[0].splice(idx, 1)
                }
                if (j === 3) {
                  const idx = personarr[1].findIndex(item => item === username)
                  personarr[1].splice(idx, 1)
                }
                if (j === 6) {
                  const idx = personarr[3].findIndex(item => item === username)
                  personarr[3].splice(idx, 1)
                }
                if (j === 8) {
                  const idx = personarr[4].findIndex(item => item === username)
                  personarr[4].splice(idx, 1)
                }

              }
            }
          })

          setperson([...personarr]);
        }
      }
    })
  }, [time])

  const inputEl = useRef(null);
  const selectRef = useRef(null);
  // 删除一行
  const handleDelete = (e, coll) => {
    let list = importExcel.concat();
    let da = list.filter((item, index) => {
      return item.key !== coll
    }
    )
    console.log("da", da)
    console.log([...da])
    setcoll([...da])
    setimportExcel([...da])
    setnormaldata([...da])
    setclicked(true)
    setEditable(true)

  };
  useEffect(() => {
    let list = document.getElementsByTagName("p");
    if (list) {
      for (let i = 0; i < list.length; i++) {
        list[i].innerHTML = ""
      }
      console.log("qingk")
      // handleDelete

    }
    console.log(clicked)
    if (clicked) {

      console.log("coll", [...coll])
      setimportExcel([...coll])
      setnormaldata([...coll])
      message.info('删除成功,可继续编辑')
      console.log("new", importExcel)
      setclicked(false)
    }
    setnewimportExcel([...importExcel])
    console.log(importExcel)

  }, [importExcel])

  // 输入框变动
  const handletextchange = (e) => {
    let attrarr = e.target.attributes[1].value.split(',')
    console.log(attrarr)
    let rowindex = attrarr[0];
    let colindex = attrarr[1];
    let tempdata = [...importExcel]
    tempdata.map((item, index) => {
      if (rowindex == index) {
        item[colindex] = e.target.innerText
      }
    })
    console.log(e)
    let str = e.target.innerHTML.toString()
  }

  // 导出数据
  const handleExport = (headers, data, fileName = title + '.xlsx') => {
    // setimportExcel([...importExcel])
    console.log([...importExcel])
    headers = [...coldata];
    data = [...importExcel];
    console.log(data)
    console.log(headers)
    const _headers = headers
      .map((item, i) => Object.assign({}, { id: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 }))
      .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { id: next.id, v: next.title } }), {});
    console.log(_headers)
    const _data = data
      .map((item, i) => headers.map((key, j) =>
        Object.assign({}, { content: item[key.title], position: String.fromCharCode(65 + j) + (i + 2) })
      ))

      // 对刚才的结果进行降维处理（二维数组变成一维数组）
      .reduce((prev, next) => prev.concat(next))
      // 转换成 worksheet 需要的结构
      .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});
    console.log("_data", _data)
    // 合并 headers 和 data
    const output = Object.assign({}, _headers, _data);
    // 获取所有单元格的位置
    const outputPos = Object.keys(output);
    // 计算出范围 ,["A1",..., "H2"]
    const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

    // 构建 workbook 对象
    const wb = {
      SheetNames: ['mySheet'],
      Sheets: {
        mySheet: Object.assign(
          {},
          output,
          {
            '!ref': ref,
            '!cols': [{ wpx: 45 }, { wpx: 100 }, { wpx: 200 }, { wpx: 80 }, { wpx: 150 }, { wpx: 100 }, { wpx: 300 }, { wpx: 300 }],
          },
        ),
      },
    };

    // 导出 Excel
    XLSX.writeFile(wb, fileName);

  }
  // 添加一行
  const handleAdd = () => {
    const newData = {}
    console.log("coldata", coldata)
    coldata.map(item => {
      newData[item.title] = '';
    })
    newData['key'] = importExcel.length
    console.log(newData)
    // setnewdataSource(() => [...importExcel, newData])
    setimportExcel(() => [...importExcel, newData])
    setEditable(true)
    // handleSave()
  }
  // 添加一列
  const handleAddcolumn = (key) => {
    console.log("key", key)
    setcolkey([...colkey, key.title])
    let newcol = {}
    if (key.radio == '1') {
      newcol = {
        id: key.title,
        key: key.title,
        title: key.title,
        dataIndex: key.title,
        type: "select"
      }
    } else {
      newcol = {
        id: key.title,
        key: key.title,
        title: key.title,
        dataIndex: key.title,
        type: "input"
      }
    }

    setcoldata([...coldata, newcol])
    importExcel.map(item => {
      item[key.title] = ''
    })
    console.log(importExcel)
    setimportExcel([...importExcel])
    if (title == "普通人员活动安排") {
      setnormaldata([...importExcel])
      setnormalcol([[...coldata, newcol]])
    } else {
      settanwetempdata([...tanwetempdata])
      settanwetempdatacol([...coldata, newcol])
    }
    setEditable(true)
    handleCancel()
  }

  // 改变select的值
  const handleselectChange = (value, op) => {
    console.log("op", op)
    let newimportExcel = []
    console.log(op[0])
    if (JSON.stringify(op[0]) == "{}") {
      newimportExcel.push(value[0])
    }

    op.map((item, i) => {
      if (JSON.stringify(item) !== "{}")
        newimportExcel.push(item.children)

    })
    console.log(newimportExcel)
    // setnewimportExcel([...newimportExcel])
    // if (title == "普通活动人员安排") {
    op.map((item, i) => {
      if (JSON.stringify(item) !== "{}") {
        let temp = [...importExcel];
        console.log(op[0].name)
        let row = 0;
        console.log('im', [...importExcel])
        importExcel.map((item, index) => {
          if (item.key === op[0].name[0])
            row = index
        })
        console.log(row, temp)
        temp[row][op[0].name[1]] = newimportExcel.toString()

        // setnormaldata([...temp]);
        console.log(temp);
        // setimportExcel([...temp]);
      }
      else {
        item[0] = value[0]
      }
    })
    // } else {
    //   op.map((item, i) => {
    //     let temp = [...tanwetempdata]
    //     if (JSON.stringify(item) !== "{}") {
    //       console.log(op[0].name)
    //       let row = 0;
    //       importExcel.map((item, index) => {
    //         if (item.key === op[0].name[0])
    //           row = index
    //       })
    //       temp[row][op[0].name[1]] = newimportExcel.toString()
    //     }
    //     else {
    //       item[0] = value[0]
    //     }
    //     // settanwetempdata([...tanwetempdata]);
    //     console.log("newda", temp);
    //     // setimportExcel([...tanwetempdata]);
    //   })
    //   // settanwetempdata([...tanwetempdata])
    // }
    console.log(importExcel);

  }
  // 改变模板
  const handleModuleChange = (e) => {
    if (title === e.target.innerHTML) return

    if (e.target.innerHTML === '摊位人员安排') {
      if (localStorage.getItem('tanweidata')) {
        gettanweiStorage()
      } else {
        console.log([...tanweidata])
        setimportExcel([...tanweidata])
        setcoldata([...tanweicoldata])

      }
      settitle('摊位人员安排')
      setEditable(true)

    }
    if (e.target.innerHTML === '普通活动人员安排') {
      if (localStorage.getItem('inialdata')) {
        getnormalStorage()
      } else {
        console.log(initialcoldata)
        setimportExcel([...initialdata])
        setcoldata([...initialcoldata])

        setnormaldefault([...newimportExcel])
        settanweidefault([...newimportExcel])

      }
      settitle('普通活动人员安排')
      setEditable(true)
    }
    message.info("切换成功！")
  }

  // 保存为新模板
  const handleSave = () => {
    console.log("importExcel", importExcel)
    console.log(coldata)

    if (title == "普通活动人员安排") {
      setinialdata([...importExcel])
      setinialcoldata([...coldata])
      localStorage.setItem('inialdata', JSON.stringify([...importExcel]))
      localStorage.setItem('inialcoldata', JSON.stringify([...coldata]))
    } else {
      settanweidata([...importExcel])
      settanweicoldata([...coldata])
      localStorage.setItem('tanweidata', JSON.stringify([...importExcel]))
      localStorage.setItem('tanweicoldata', JSON.stringify([...coldata]))
    }
    message.success('保存成功,可进行编辑')
    setEditable(true)


  }
  const navigate = useNavigate();
  // 清空重写
  const handleaddnew = () => {

    if (title == '普通活动人员安排') {

      setnormalcol([...initialcoldata])
      setnormaldata([...initialdata])
      setimportExcel([...initialdata])
      setcoldata([...initialcoldata])
    } else {
      setimportExcel([...tanweidata])
      setcoldata([...tanweicoldata])
    }
  }
  // menu下拉菜单
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div onClick={handleModuleChange} >摊位人员安排</div>
      </Menu.Item>

      <Menu.Item key="2">
        <div onClick={handleModuleChange}>普通活动人员安排</div>
      </Menu.Item>

    </Menu>
  );
  const initialmenu = (
    <Menu>
      <Menu.Item key="1">
        <div onClick={handleaddnew} >摊位人员安排</div>
      </Menu.Item>

      <Menu.Item key="2">
        <div onClick={handleaddnew}>普通活动人员安排</div>
      </Menu.Item>

    </Menu>
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();
  // 标签栏的颜色
  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={color[value]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }
  const [Editable, setEditable] = useState(true)
  const [columns, setcolumns] = useState([])
  const [data, setdata] = useState([])
  console.log('全局2', importExcel)
  const tableonFinish = (values) => {
    setEditable(false)
    const newcolumns = [...coldata, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={(e) => handleDelete(e, record.key)}>
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    }]
    console.log(newcolumns)
    setcolumns([...newcolumns])
    setimportExcel([...importExcel])

  }

  const changetoEdit = () => {
    setEditable(true)
  }
  // 导入数据
  const handlechange = (obj) => {
    console.log(obj.target.files)
    if (!obj.target.files) {
      return;
    }
    var file = obj.target.files;
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        const { result } = e.target;
        //以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        let data = []; //存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        console.log(data);
        var coldataarr = Object.keys(data[0]);
        var newcoldataarr = [];
        var jsoncol = new Object();
        coldataarr.map((item, index) => {
          jsoncol['key'] = index;
          jsoncol['title'] = item.trim();
          newcoldataarr.push({ ...jsoncol });
        })

        setcoldata(newcoldataarr);
        setnewdataSource([...data])
        setimportExcel([...data]);
      } catch (e) {
        // 抛出文件类型错误不正确的相关提示
        console.log('文件类型不正确');
        return;
      }
    }
    reader.readAsBinaryString(file[0]);

  }
  return (
    <div className={style.tablecontentstyle}>
      <div className={style.titlestyle}>
        <div className={style.filetypestyle}>
          <span className={style.biggertext}>当前为</span><span className={style.titletext}>{title}</span>
        </div>
        {title === '普通活动人员安排' ?
          ""
          : <Space direction="vertical" className={style.datestyle}>
            <DatePicker onChange={ondateChange} />
          </Space>
        }
      </div>
      <div className={style.container}>

        {Editable ?

          <Form onFinish={tableonFinish}>
            <div className={style.topstyle}>

              <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <Tooltip title="切换模板将导致当前编辑内容丢失，确保已编辑完毕和导出数据">
                  <Button type="primary" ><SwapOutlined />切换模板</Button>
                </Tooltip>
              </Dropdown>
              <Button type="primary" htmlType="submit">
                <FileExcelOutlined /> 查看效果
              </Button>



              <Button type="primary" onClick={handleExport}><VerticalAlignBottomOutlined />导出</Button>
              <Button type="primary" onClick={handleSave}><SaveOutlined />保存为新模板</Button>


            </div>
            <Form.Item name="table">
              <table className={style.tablestyle}>
                <thead className={style.theadstyle}>
                  <tr>
                    {/* {console.log("渲染", importExcel)} */}
                    {
                      coldata ?
                        (coldata.map((item, index) => {
                          return <th key={index}>
                            {item.title}

                          </th>
                        }))
                        : <th></th>
                    }
                    {/* {<th>编辑</th>} */}
                  </tr>

                </thead>
                <tbody>

                  {

                    importExcel ?
                      (importExcel.map((items, row) => {
                        return <tr key={row + items}>

                          {

                            Object.keys(items).map((keys, col) => {
                              if (keys !== 'key') {
                                let cindex

                                coldata.map((c, i) => {
                                  if (c.title === keys) {

                                    cindex = i
                                  }
                                })

                                return (
                                  <td key={keys + col}>
                                    {
                                      (coldata[cindex].type === 'select') ?
                                        title === '普通活动人员安排' || !person[row] ?
                                          // coldata[col].title === '成员' ?
                                          <Select
                                            tagRender={tagRender}
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            onChange={handleselectChange}
                                            defaultValue={items[coldata[cindex].title] ? items[coldata[cindex].title] : undefined}
                                            name={[row, col]}
                                            autoClearSearchValue={true}
                                            ref={selectRef}
                                          >
                                            {userdata.map((item, index) => {
                                              return <Option name={[items.key, coldata[cindex].title]} key={index} >
                                                {item}
                                              </Option>
                                            })}
                                          </Select>
                                          :
                                          <Select
                                            tagRender={tagRender}
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            onChange={handleselectChange}
                                            name={[row, col]}
                                            defaultValue={tanweidefault}
                                          >
                                            {console.log("tanweidefault", tanweidefault)}
                                            {person[row].map((item, index) => {
                                              return <Option name={[items.key, coldata[cindex].title]} key={index} >
                                                {item}
                                              </Option>
                                            })

                                            })
                                          </Select>
                                        :
                                        <div ref={inputEl} className={style.tableinput} name={[items.key, coldata[cindex].title]} suppressContentEditableWarning contentEditable="true" onInput={(e) => handletextchange(e)}>
                                          {/* {console.log(items[keys])} */}
                                          {items[keys] ? <div>{items[keys]}</div> : <p>{items[keys]}</p>}
                                        </div>

                                    }

                                  </td>)
                              }


                            })
                          }
                          {/* {
                            // <td><input type="reset"></input></td>
                            <td><Popconfirm title="Sure to delete?" onConfirm={(e) => handleDelete(e, items.key)}>
                              <a>Delete</a>
                            </Popconfirm></td>
                          } */}
                        </tr>

                      }))
                      :
                      <tr><td>空</td></tr>
                  }

                </tbody>
              </table>
            </Form.Item>

          </Form> :
          <div className={style.container}>
            <div className={style.topstyle}>
              <Button type="primary" onClick={changetoEdit}><EditOutlined />进入编辑</Button>
              <Button
                onClick={handleAdd}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
              >

                <PlusOutlined />增添一行
              </Button>
              <Modal title="增添列" visible={isModalVisible} onOk={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();
                    handleAddcolumn(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });
              }} onCancel={handleCancel}>
                <Form
                  form={form}
                  layout="vertical"
                  name="form_in_modal"
                  initialValues={{
                    modifier: 'public',
                  }}
                >
                  <Form.Item
                    name="radio"

                    rules={[{ required: true, message: 'Please pick an item!' }]}
                  >
                    <Radio.Group name="radio-gruop">
                      <Radio value={1}>人员列</Radio>
                      <Radio value={2}>普通列</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label="title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your colname!' }, {
                      validator: (rule, val, callback) => {
                        colkey.map(item => {
                          if (item === val) {
                            callback('您已经添加过类似的列标题栏，不能输入相同值的列标题')
                          }
                        })
                        callback();
                      }
                    }]}
                  >
                    <Input />
                  </Form.Item>

                </Form>
              </Modal>

              <Button
                onClick={showModal}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
              >
                <PlusOutlined />增添一列
              </Button>
              <Button type="primary" onClick={handleExport}><VerticalAlignBottomOutlined />导出</Button>
              <Button type="primary" onClick={handleSave}><SaveOutlined />保存为新模板</Button>


            </div>
            <Table className={style.tablestyle} columns={columns} dataSource={[...importExcel]} pagination={false}></Table>

          </div>
        }
        {console.log("coldata", coldata)}
        {console.log("importExcel", importExcel)}
      </div>

    </div>
  )
}
