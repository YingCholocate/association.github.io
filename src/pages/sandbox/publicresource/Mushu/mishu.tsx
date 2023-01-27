import React, { useEffect, useMemo, useState } from 'react';
import { DatePicker, Space, message } from 'antd';
import style from './mishu.module.css';
import { USERSTATICInfo } from '@/utils/staticData';
import { getAllUserInfo, IUser } from '@/api/User';
import ViewTable from './components/ViewTable';

import TanweiTable from './components/TanweiTable';
import { getAllCourse } from '@/api/Course';

export default function Mishu() {
  // 改变日期
  const [time, settime] = useState('');
  const ondateChange = (value) => {
    localStorage.setItem('time', value);
    settime(value);
    message.info('自动筛选当天有课人员成功!');
  };
  const [editing, setEditing] = useState(false);

  // 用户信息
  const userdata = (): IUser[] => {
    const userotherdata: IUser[] = [];
    getAllUserInfo()
      .then((res) => {
        res.data.forEach((item) => userotherdata.push(item));
        localStorage.setItem('alluser', JSON.stringify(userotherdata));
      })
      .catch(() => {
        const userother = USERSTATICInfo;
        localStorage.setItem('alluser', JSON.stringify(userother));
      });
    return userotherdata;
  };

  // 是否设置了保存
  const [saveBoolean, setSaveBoolean] = useState(false);

  // 获取工作成员的课表得到某时刻无法工作的人员
  useEffect(() => {
    getAllCourse().then((res) => {
      // console.log(res.data);
      let zc = 1;
      if (time) {
        const timedate = new Date(time);
        const oneDayTime = 1000 * 60 * 60 * 24;
        const fidate = JSON.parse(localStorage.getItem('fidate') as string);
        const xq = timedate.getDay();
        const firsttimedate = timedate.getTime() - oneDayTime * (xq - 1);
        const newtimedate = new Date(firsttimedate);
        // console.log('timedate', newtimedate);
        fidate.forEach((item, i) => {
          const first = new Date(item);
          if (first.toDateString() === newtimedate.toDateString()) {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            zc = i + 1;
          }
        });
        const zcarr: string[] = [];
        const arr: string[] = []; // ToDO
        res.data.forEach((item) => {
          const zcstart = item.cd[0].zc.split(',');
          if (zc >= zcstart[0] && zc <= zcstart[1] && item.cd[0].xq === xq) {
            zcarr.push(item);
            arr.push(item.stuid);
          }
        });
        // 符合周次和星期的课表详情
        // console.log('zvarr', zcarr);
      }
    });
  }, [time]);

  const [Editable, setEditable] = useState(true);
  // title标签
  const [title, setTitle] = useState('普通活动人员安排');

  return (
    <div className={style.tablecontentstyle}>
      <div className={style.titlestyle}>
        <div className={style.filetypestyle}>
          <span className={style.biggertext}>当前为</span>
          <span className={style.titletext}>{title}</span>
        </div>
        {title === '普通活动人员安排' ? (
          ''
        ) : (
          <Space direction="vertical" className={style.datestyle}>
            <DatePicker onChange={ondateChange} />
          </Space>
        )}
      </div>
      {useMemo(
        () => (
          <div className={style.container}>
            {Editable ? (
              <ViewTable
                editing={editing}
                setEditing={setEditing}
                setEditable={setEditable}
                userdata={userdata()}
                saveBoolean={saveBoolean}
                setSaveBoolean={setSaveBoolean}
                setTitle={setTitle}
                title={title}
              />
            ) : (
              <TanweiTable
                editing={editing}
                setEditing={setEditing}
                setEditable={setEditable}
                userdata={userdata()}
                saveBoolean={saveBoolean}
                setSaveBoolean={setSaveBoolean}
                setTitle={setTitle}
                title={title}
              />
            )}
          </div>
        ),
        [Editable, editing, saveBoolean, title],
      )}
    </div>
  );
}
