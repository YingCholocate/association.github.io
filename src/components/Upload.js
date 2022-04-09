import React, { useEffect, useState } from 'react'
import { Steps, Button, message, Radio, Form, Input } from 'antd';
import style from './Upload.module.css'
import axios from 'axios';
import url from '../utils/commonurl'
import { useNavigate } from 'react-router-dom';
import Qs from 'qs'
const { Step } = Steps;
const steps = [
  {
    title: 'First',
    content: '选择要上传的类型',
  },
  {
    title: 'Second',
    content: '输入',
  }

];
const datatype = [
  {
    department: 'Mishu',
    content: "推文"
  },
  {
    department: 'Mishu',
    content: "资料文件"
  }
]
export default function Upload(props) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [checkedvalue,setcheckedvalue]=useState('');
  const [type,settype]=useState(props.type);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = (e) => {
    setcheckedvalue(()=>e.target.value)
    console.log(`radio checked:${e.target.value}`);
    if(type==='mishu'&&e.target.value==='推文'){
      settype(1)
    }else if(type==='mishu'&&e.target.value==='资料文件'){
      settype(4)
    }
  }
  const handleSubmit=(values)=>{
    const date=new Date();
    axios('/association/resourcedata',{
      data:{
        "link" :values.link,
        "title":values.title,
        "uploadtime":(date.getFullYear()+'-'+date.getMonth()+"-"+date.getDate()).toString(),
        "type":type,
        "method":"add"
      },
      method:'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      transformRequest:[function(data){
        return Qs.stringify(data)
      }]
        }).then(response=>{
      message.success('上传成功')
      setTimeout(() => {
        navigate('/home')
      }, 2000);
   
  })
  }
  return (
    <>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="contentStyles">
        <div className={style.contenttitle}>{steps[current].content}</div>
        <div className='contenthore'>
          {current === 0 ?
            (<Radio.Group onChange={onChange}>
              {(type==="mishu"||type===1||type===4)?
              datatype.map(item => {
                return <Radio.Button key={item.content} value={item.content}>{item.content}</Radio.Button>
              })
              : <Radio.Button value={datatype[1].content}>{datatype[1].content}</Radio.Button>
              }

            </Radio.Group>) :
            (current === 1 ?
              (
                <Form onFinish={handleSubmit}>
                  <Form.Item label="链接"name="link"rules={[{ required: true, message: 'Please input your link!' }]}>
                    <Input placeholder="input 链接" />
                  </Form.Item>
                  <Form.Item label="标题" name="title" rules={[{ required: true, message: 'Please input your title!' }]}>
                    <Input placeholder="input 文章标题" />
                  </Form.Item>
                  <Form.Item >
                    <Button type="primary" className={style.submitstyle} htmlType="submit">Submit</Button>
                  </Form.Item>
                </Form>) : "")
          }

        </div>

      </div>

      <div className={style.stepsAction}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current > 0 && (
          <Button className={style.previesStyle} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  )
}
