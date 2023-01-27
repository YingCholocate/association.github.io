import { IUser } from '@/api/User';
import { useAuth } from '@/utils/auth/AuthProvider';
import React, { Dispatch, SetStateAction, useState } from 'react';
import style from '../schedule.module.css';

interface Iprops {
  userdata: IUser[];
  setClickNumber: Dispatch<SetStateAction<number>>;
}
export default function PersonList(props: Iprops) {
  const { userdata, setClickNumber } = props;
  // console.log('userdata', userdata);
  const auth = useAuth();

  // 设置点击的number
  const [nownumber, setnoenumber] = useState(auth.user?.number);

  const seecourse = (e, value) => {
    setClickNumber(() => value.number);
    setnoenumber(value.number);
  };

  return (
    <div className={style.leftcontent}>
      <div className={style.headerstyle}>
        <div className={style.headertext}>社团人员</div>
      </div>
      <div className={style.usercontent}>
        {userdata.map((item) => {
          return (
            <div
              key={item.number}
              className={style.liststyle}
              onClick={(e) => seecourse(e, item)}
              style={{
                background: item.number === nownumber ? 'rgba(50, 166, 205, 0.241)' : 'white',
              }}
            >
              <div key={item.number}>{item.username + item.role[0].rolevalue}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
