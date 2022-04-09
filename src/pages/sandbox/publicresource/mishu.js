import React, { useEffect, useRef, useState, useContext } from 'react'
import * as XLSX from 'xlsx'
import { Button, Popconfirm, Table, Switch, Select, Popover, Input, Form, DatePicker, Space } from 'antd';
import style from './mishu.module.css'
import axios from 'axios';
import getStoredState from 'redux-persist/es/getStoredState';
import { useSearchParams } from 'react-router-dom';
import { connectAdvanced } from 'react-redux';
const { Option } = Select;
export default function Mishu() {
  const [tanweidata, settanweidata] = useState([
    { time: '8：00-10:00', person: "", content: '', notice: '' },
    { time: '10：00-12:00', person: "", content: '', notice: '' },
    { time: '12:00-14:00', person: "", content: '', notice: '' },
    { time: '14:00-16:00', person: "", content: '', notice: '' },
    { time: '16:00-17:40', person: "", content: '', notice: '' },
    { time: '17:40-18:00', person: "", content: '', notice: '' },
  ])
  const [tanweicoldata, settanweicoldata] = useState([
    {
      id: 'time',
      title: '时间'
    }, {
      id: 'content',
      title: '内容'
    }, 
    {
      id: 'person',
      title: '人员'
    }, {
      id: 'notice',
      title: '注意事项'
    },

  ])
  const initialdata = [
    { 组别: '技术组', 事项: '调试现场设备，调试摄像设备', 负责人: '', 成员: '' },
    { 组别: '物资组', 事项: '清点物资', 负责人: '', 成员: '' },
    { 组别: '控场组', 事项: '维持活动现场秩序（入场、活动过程中及出场）', 负责人: '', 成员: '' },
    { 组别: '工作人员签到组', 事项: '负责工作人员签到', 负责人: '', 成员: '' },
    { 组别: '活动报名负责组', 事项: 'Python训练营的报名', 负责人: '', 成员: '' },
    { 组别: '布场、清场组', 事项: '布置、清理场地', 负责人: '', 成员: '' }

  ]
  const initialcoldata = [
    {
      id: "group",
      title: "组别"
    },
    {
      id: "notice",
      title: '事项'
    },
    {
      id: 'principal',
      title: '负责人'
    }, {
      id: 'member',
      title: '成员'
    }
  ]
  const [importExcel, setimportExcel] = useState(initialdata)
  const [coldata, setcoldata] = useState(initialcoldata)
  const [title, settitle] = useState('普通活动人员安排')
  const arr = [...importExcel];
  arr.pop()
  const [userdata, setuserdata] = useState(() => {
    let userotherdata = []
    axios.get('/association/users?method=getall')
      .then(res => {

        res.data.map((item, index) => {
          userotherdata.push(item.username + item.role[0]['rolevalue'])
        })

      }

      )
    return userotherdata
  }

  )
  const [showimportExcel, setshowimportExcel] = useState(arr)

  const [newdataSource, setnewdataSource] = useState(importExcel);
  const [time, settime] = useState('');
  const [person, setperson] = useState([])
  const [freearr, setfreearr] = useState([])
  const dataRef = useRef();
  // 获取工作成员的课表得到某时刻无法工作的人员
  useEffect(() => {
    axios.get(`http://localhost:5000/course?_embed=usercourse`).then(res => {
      let zc = 1;
      if (time) {
        let timedate = new Date(time);
        let oneDayTime = 1000 * 60 * 60 * 24
        let fidate = JSON.parse(localStorage.getItem('fidate'));
        let xq = timedate.getDay();
        console.log(timedate.getTime())
        let firsttimedate = timedate.getTime() - oneDayTime * (xq - 1);
        let newtimedate = new Date(firsttimedate);
        console.log(newtimedate.getDate())
        fidate.map((item, i) => {
          let first = new Date(item);
          if (first.toDateString() === timedate.toDateString()) {
            zc = i + 1;
          }
        })
        let zcarr = [];
        let arr = [];
        res.data.map((item, index) => {
          // console.log(item)
          item.coursealldata.map(ii => {
            if (ii.zc == zc && ii.xq == xq) {

              zcarr.push([ii])
              arr.push(item.usercourse[0].number)
            }

          })
        })
        // 符合周次和星期的课表详情
        console.log(zcarr)
        function unique(arr) {
          return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
        }
        // 其中的用户的名称
        console.log(unique(arr))
        let newarr = []
        let usernamearr = []
        // 创建二维数组存储有课的工作人员
        let personarr = Array.from(Array(5), () => new Array(0))
        for (let i = 0; i < zcarr.length; i++) {
          let username = "";
          axios.get('/association/users?method=getone', {
            params: {
              number: arr[i]
            }
          }).then(res => {
            console.log(res.data)
            if (res.data.department != 1) {
              username = res.data.username;
              usernamearr.push(username)
              // console.log(username)
              newarr.push([zcarr[i], username])
              console.log(newarr)
              // 將其放入对应的时间节次
              let jc = [1, 3, 6, 8, 10]
              jc.map((j, index) => {
                console.log(zcarr[i][0])
                if (zcarr[i][0].jcdm2) {
                  let a = zcarr[i][0].jcdm2.split(',');
                  console.log(a)
                  console.log(j);
                  if (parseInt(a[0]) == j) {
                    console.log("bigo")
                    personarr[index].push(username);
                    // console.log(personarr)
                  }
                }
              })


            }

          }).then(res => {
            console.log([...personarr])
            setperson([...personarr]);
          }
          )

        }
      }
    })
  }, [time])


  // TODO
  useEffect(() => {
    let freearr = Array.from(Array(5), () => new Array([...userdata]))

    // console.log(freeuserdata)
    // console.log(freeuserdata[0].indexOf('admin'))
    console.log(freearr);
    freearr.map((items, index) => {
      console.log(items)
      items.map((it) => {
        console.log(it)
        console.log('t', index)
        it.map((ii, i) => {
          console.log(ii)
          console.log(i)
          console.log(person[index]);
          if (ii.indexOf(person[index]) > -1) {
            console.log('..1')
            let freeuserdata = [...userdata]
            freeuserdata.pop(ii);
            console.log(freeuserdata)
            freearr[index][i] = freeuserdata
          }
        })
      })
      // defaultarr = freeuserdata.filter((item, index) => {
      //   console.log(person[index])
      //   if (person[index].length > 0) {
      //     console.log('...');
      //     return !(item.indexOf(person[index]) >= 0)
      //   }
      //   return true
      // }
      // )
      // console.log("defaultarr", defaultarr)
      // items = defaultarr;
    })

    setfreearr(freearr)
  }, [person])

  useEffect(() => {
    dataRef.current = importExcel;
  }, [importExcel])
  // 向服务器请求工作人员的名称
  useEffect(() => {
    axios.get('/association/users?method=getall')
      .then(res => {
        let userotherdata = []
        res.data.map(item => {
          userotherdata.push(item.username + item.role[0]['rolevalue'])
        })
        setuserdata([...userotherdata])
      }

      )
  }, [])

  // 删除一行
  const handleDelete = (e, col) => {
    console.log(col)
    const dataSource = [...importExcel];
    let da = dataSource.filter((item, index) => {
      return index !== col
    }
    )
    setimportExcel([...da])
    setnewdataSource([...da]);
  };

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
  // 输入框变动
  const handletitlechange = (e) => {
    let newcoldata = []
    let titleid = e.target.attributes[1].value
    let oldkey = coldata[titleid].title
    coldata.map((item, index) => {
      if (index == titleid) {
        newcoldata[index] = { ...item, title: e.target.innerHTML }
        // newcoldata[index].title=e.target.innerHTML;
        console.log(newcoldata)
      } else {
        newcoldata[index] = { ...item }
      }

    })
    console.log(newcoldata)
    let newtitle = newcoldata[titleid];
    setcoldata([...newcoldata])
    let result = importExcel.map(item => {
      var obj = {
        ...item,
        newtitle: item[oldkey]
      }
      // obj[newtitle]='zu'
      return obj
    }
    )
    console.log(result)
    setimportExcel([...result])
  }
  const handletextchange = (e) => {

    let attrarr = e.target.attributes[1].value.split(',')
    let rowindex = attrarr[0];
    let colindex = attrarr[1];
    let dataarr = Object.keys(newdataSource[rowindex]);
    newdataSource[rowindex][dataarr[colindex]] = e.target.innerHTML;
    setnewdataSource([...newdataSource]);
    console.log(newdataSource)
    setimportExcel([...newdataSource])
  }
  // 导出数据
  const handleExport = (headers, data, fileName = '记录表.xlsx') => {
    setimportExcel(newdataSource);
    headers = coldata;
    data = importExcel;
    console.log(headers)
    const _headers = headers
      .map((item, i) => Object.assign({}, { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 }))
      .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }), {});

    const _data = data
      .map((item, i) => headers.map((key, j) =>
        Object.assign({}, { content: item[key.title], position: String.fromCharCode(65 + j) + (i + 2) })
      ))
      // 对刚才的结果进行降维处理（二维数组变成一维数组）
      .reduce((prev, next) => prev.concat(next))
      // 转换成 worksheet 需要的结构
      .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});

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
    coldata.map(item => {
      newData[item.title] = ''
    })


    setnewdataSource(() => [...importExcel, newData])
    setimportExcel(() => [...importExcel, newData])
  }
  // 添加一列
  const handleAddcolumn = (key) => {
    console.log(key)
    setcoldata([...coldata, key])
    console.log(coldata)
    newdataSource.map(item => {
      item[key.title] = ''
    })
    setimportExcel([...newdataSource])
  }
  // 改变select的值
  const handleselectChange = (value, op) => {
    console.log(op)
    let rowindex = op[0].name[0];
    let colindex = op[0].name[1];

    let dataarr = Object.keys(newdataSource[rowindex]);
    newdataSource[rowindex][dataarr[colindex]] = op[0].children
    setnewdataSource([...newdataSource]);
    console.log(newdataSource);
    setimportExcel([...newdataSource]);
  }
  // 改变模板
  const handleModuleChange = () => {
    if (title === '摊位人员安排') {
      // console.log([...initialdata])
      setimportExcel([...initialdata])
      setcoldata([...initialcoldata])
      settitle('普通活动人员安排')
    }
    if (title === '普通活动人员安排') {
      setimportExcel([...tanweidata])
      setcoldata([...tanweicoldata])
      settitle('摊位人员安排')
    }

  }
  const ondateChange = (value) => {
    console.log(value)
    localStorage.setItem('time', value)
    settime(value);
  }
  const content = () => {
    return <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={handleAddcolumn}
      autoComplete="off"
    >
      <Form.Item
        label="title"
        name="title"
        rules={[{ required: true, message: 'Please input your colname!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>


  }
  return (
    <div>
      <form encType="multipart/form-data">
        <div className={style.topstyle}>
          <input type="file" onChange={handlechange} />

          <div className={style.buttonpanel}>
            <div className={style.filetypestyle}>当前为{title}</div>
            <Button type="primary" onClick={handleModuleChange}>更改此位模板</Button>

            <Space direction="vertical" className={style.datestyle}>
              <DatePicker onChange={ondateChange} />
            </Space>
            <Button type="primary" onClick={handleExport}>保存导出</Button>
            <Button
              onClick={handleAdd}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Add a row
            </Button>
            <Popover content={content} title="Title">
              <Button

                type="primary"
                style={{
                  marginBottom: 16,
                }}
              >
                Add a column
              </Button>
            </Popover>

          </div>

        </div>
      </form>
      <table className={style.tablestyle}>
        <thead>
          <tr>
            {
              coldata ?
                (coldata.map((item, index) => {
                  return <th key={index}>
                    {item.title}
                
                  </th>
                }))
                : <th></th>
            }
            {<th>编辑</th>}
          </tr>

        </thead>
        <tbody>
          {
            importExcel ?
              (importExcel.map((items, row) => {
                return <tr key={row + items}>
                  {
                    Object.keys(items).map((keys, col) => {
                      return <td key={keys + col}>
                        {
                          
                         
                         (col === 2 || col === 3) &&( coldata[2].id === 'principal') ?

                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: '100%' }}
                              placeholder="Please select"
                              onChange={handleselectChange}
                              name={[row, col]}
                           
                              // defaultValue={freearr?freearr:""}
                            >
                              {userdata.map((item, index) => {
                                
                                return <Option name={[row, col]} key={index} >
                                  {item}
                                  </Option>
                              })}
                            </Select>

                            :
                            <div className={style.tableinput} name={[row, col]} suppressContentEditableWarning contentEditable="true" onInput={(e) => handletextchange(e)}>
                              {items[keys]}
                            </div>

                        }

                      </td>
                    })
                  }
                  {
                    <td><Popconfirm title="Sure to delete?" onConfirm={(e) => handleDelete(e, row)}>
                      <a>Delete</a>
                    </Popconfirm></td>
                  }
                </tr>

              }))
              :
              <tr><td>空</td></tr>
          }

        </tbody>
      </table>

    </div>
  )
}
