import React from 'react';
import { Empty, Card } from 'antd';
import style from '../pages/sandbox/Home/Home.module.css';

export default function Departahow(props) {
  const { departdata, departtitle } = props;
  console.log(departdata());
  return (
    <div className={style.departstyle}>
      {/* 消息列表 */}
      <Card title={departtitle}>
        {departdata() && departdata().length !== 0 ? (
          departdata().map((item) => (
            <div key={item.id} className={style.departcontent}>
              <p key={item.id}>
                <a href={item.link} target="blank">
                  {item.title}
                </a>
              </p>
              <p className={style.timestyle}>{item.uploadtime}</p>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </Card>
    </div>
  );
}
