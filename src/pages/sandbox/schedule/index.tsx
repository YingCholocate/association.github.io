import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';

import style from './schedule.module.css';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { initialData, IData, IColumns, STARTANDEND } from '@/utils/staticData';
import { addCourse, getOneCourse } from '@/api/Course';
import ScheduleLeft from './components/ScheduleLeft';
import { IUser } from '@/api/User';
import PersonList from './components/PersonList';
import CollectionCreateForm from './components/CollectionCreateForm';
import { useAuth } from '@/utils/auth/AuthProvider';

const CollectionsPage = () => {
  const auth = useAuth();
  // 左右样式切换
  const [left, setleft] = useState(style.toleft);
  const [right, setright] = useState(style.toright);
  // 点击展示的课表
  const [clickNumber, setClickNumber] = useState(1);
  const time = new Date();
  const [month, setmonth] = useState(time.getMonth() + 1);
  // 每一行的数据
  const [visible, setVisible] = useState(false);
  const [displaydata, setDisplayData] = useState<IData[]>(initialData);
  const [zc, setzc] = useState(1);
  const [, setxq] = useState(1);

  // 设置每一周起始时间
  const [fidate, setfidate] = useState<Date[]>([]);
  const handlefetchResult = (result) => {
    const courceIndex: string[] = [];
    const xq: number[] = [];
    // 实现深拷贝
    const disData: IData[] = JSON.parse(JSON.stringify(initialData));

    // console.log('result', result);
    result.data.forEach((item) => {
      // 第几节
      const section: number[] = [];
      courceIndex.push(item.cd[0].jcdm2);
      xq.push(item.cd[0].xq);
      const chars: string[] = item.cd[0].jcdm2.split(',');
      chars.forEach((char) => {
        section.push(parseInt(char, 10));
      });

      disData.forEach((it, ii) => {
        if (ii === section[0] - 1 || ii === section[1] - 1) {
          disData[ii] = {
            ...disData[ii],
            [`C${item.cd[0].xq}`]: [item.cd[0].cou[0].cname, item.cd[0].cou[0].bgcolor],
          };
        } else {
          disData[ii] = { ...displaydata[ii] };
        }
      });
    });

    setDisplayData(() => [...disData]);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await getOneCourse(auth.user?.number);
      handlefetchResult(result);
    };
    fetchData();
    const dayFirstWeek = new Date(STARTANDEND[0]);
    const oneDayTime = 1000 * 60 * 60 * 24;
    // 现在的日期距离第一周有几天
    const daysTofirst = time.getTime() - dayFirstWeek.getTime();
    // 当前第几周
    const zcnow = Math.floor(daysTofirst / oneDayTime / 7 + 1) % 20;

    // 当前星期几
    const xqnow = time.getDay();
    setzc(zcnow);
    setxq(xqnow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOneCourse(clickNumber);
      handlefetchResult(result);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickNumber]);
  const getdaytime = (arrday) => {
    // 学期第一周时间
    const dayFirstWeek = new Date(arrday[0]);
    const dayend = new Date(arrday[1]);
    const oneDayTime = 1000 * 60 * 60 * 24;
    // 学期持续时间有几周
    const dayduring = Math.floor((dayend.getTime() - dayFirstWeek.getTime()) / oneDayTime / 7) + 1;

    const arr: Date[] = [];

    let dayFirstime = dayFirstWeek.getTime();

    for (let i = 0; i < dayduring; i++) {
      const sayFirstTime = dayFirstime;
      for (let j = 0; j < 7; j++) {
        const weekday = sayFirstTime + oneDayTime * j;
        arr.push(new Date(weekday));
      }
      dayFirstime += oneDayTime * 7;
    }

    localStorage.setItem('fidate', JSON.stringify(arr));
    return arr;
  };
  // 返回的是所有日期数组
  const allDateArr = getdaytime(STARTANDEND);
  // 列标题

  const columns: IColumns[] = [
    {
      title: `${month}月第${zc}周`,
      dataIndex: 'name',
    },
    {
      title: fidate[0] ? `周一${fidate[0].getDate()}` : '周一',
      dataIndex: '1',
    },
    {
      title: fidate[1] ? `周二${fidate[1].getDate()}` : '周二',
      dataIndex: '2',
    },
    {
      title: fidate[2] ? `周三${fidate[2].getDate()}` : '周三',
      dataIndex: '3',
    },
    {
      title: fidate[3] ? `周四${fidate[3].getDate()}` : '周四',
      dataIndex: '4',
    },
    {
      title: fidate[4] ? `周五${fidate[4].getDate()}` : '周五',
      dataIndex: '5',
    },
    {
      title: fidate[5] ? `周六${fidate[5].getDate()}` : '周六',
      dataIndex: '6',
    },
    {
      title: fidate[6] ? `周日${fidate[6].getDate()}` : '周日',
      dataIndex: '7',
    },
  ];

  // 增添课表或人员数据
  const onCreate = (values) => {
    addCourse({
      ...values,
      zc: `${values.zcstart},${values.zcend}`,
      jcdm2: `${values.jcdm2},${parseInt(values.jcdm2, 10) + 1}`,
      index: clickNumber,
    }).then(() => {
      message.success('上传成功');
    });

    setVisible(false);
  };

  const userdata: IUser[] = JSON.parse(localStorage.getItem('alluser') as string);
  // 点击上一周
  const courcetoLeft = () => {
    if (zc > 1) {
      setzc((zc1) => zc1 - 1);
      setright(style.toright);
    } else {
      setzc(() => 1);
    }
    if (zc === 2) {
      setleft(style.toleftban);
    }
  };
  // 点击下一周
  const courcetoRight = () => {
    if (zc < 21) {
      setzc((zc1) => zc1 + 1);
      setleft(style.toleft);
    } else {
      setzc(() => 21);
    }
    if (zc === 20) {
      setright(style.toleftban);
    }
  };

  useEffect(() => {
    const nowArr = allDateArr.slice((zc - 1) * 7, 7 * zc);
    setfidate(nowArr);
    setmonth(nowArr[0]?.getMonth() + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zc]);

  return (
    <div>
      <LeftOutlined className={left} onClick={courcetoLeft} />
      <RightOutlined className={right} onClick={courcetoRight} />
      <div className={style.tablecontent}>
        <ScheduleLeft columns={columns} data={displaydata} arrd={fidate} />
        <PersonList userdata={userdata} setClickNumber={setClickNumber} />
      </div>
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
export default CollectionsPage;
