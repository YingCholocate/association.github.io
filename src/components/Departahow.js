import React from 'react'
import { Content, Empty,Card } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import style from '../../src/pages/sandbox/Home/Home.module.css'
export default function Departahow(props) {
    const { departdata, departtitle } = props
 
    return (

        <div className={style.departstyle} >{/* 消息列表 */}
            <Card title={departtitle}>
                {console.log(departdata)}
                {departdata&&departdata.length!==0 ?
                    departdata.map(item => {
                        {console.log(item)}
                        return (
                            <div key={item.id} className={style.departcontent}>
                                <p key={item.id}><a href={item.link} target="_blank">{item.title}</a></p>
                                <p className={style.timestyle}>{item.uploadtime}</p>
                            </div>
                        )
                    })
                    :<Empty />
                }
            </Card>
        </div>

    )
}
