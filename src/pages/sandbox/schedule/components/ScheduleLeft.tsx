import { IColumns, IData } from '@/utils/staticData';
import React from 'react';

import style from '../schedule.module.css';

interface Iprops {
  columns: IColumns[];
  data: IData[];
  arrd?: Date[];
}
export default function ScheduleLeft(props: Iprops) {
  const { columns, data, arrd } = props;
  // console.log('data', data);

  // 每个星期的日期Date形式

  const time = new Date();
  return (
    <table className={style.diffen}>
      {/* 表头 */}
      <thead className={style.theadstyle}>
        <tr>
          {columns.map((item, index) => {
            return (
              <th key={item.dataIndex + index.toString()} scope="col">
                {item.title}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {data.map(function (item) {
          return (
            <tr key={item.key} className={style.tdtext}>
              <th scope="row">{item.key}</th>
              {item.C1 ? (
                <td
                  style={
                    arrd && arrd[0] && arrd[0] < time
                      ? { backgroundColor: 'lightgray' }
                      : { backgroundColor: item.C1[1] }
                  }
                >
                  {item.C1[0]}
                </td>
              ) : (
                <td>{''}</td>
              )}
              {item.C2 ? (
                <td
                  style={
                    arrd && arrd[0] && arrd[0] < time
                      ? { backgroundColor: 'lightgray' }
                      : { backgroundColor: item.C2[1] }
                  }
                >
                  {item.C2[0]}
                </td>
              ) : (
                <td>{''}</td>
              )}
              {item.C3 ? (
                <td
                  style={
                    arrd && arrd[0] && arrd[0] < time
                      ? { backgroundColor: 'lightgray' }
                      : { backgroundColor: item.C3[1] }
                  }
                >
                  {item.C3[0]}
                </td>
              ) : (
                <td>{''}</td>
              )}
              {item.C4 ? (
                <td
                  style={
                    arrd && arrd[0] && arrd[0] < time
                      ? { backgroundColor: 'lightgray' }
                      : { backgroundColor: item.C4[1] }
                  }
                >
                  {item.C4[0]}
                </td>
              ) : (
                <td>{''}</td>
              )}
              {item.C5 ? (
                <td
                  style={
                    arrd && arrd[0] && arrd[0] < time
                      ? { backgroundColor: 'lightgray' }
                      : { backgroundColor: item.C5[1] }
                  }
                >
                  {item.C5[0]}
                </td>
              ) : (
                <td>{''}</td>
              )}
              {item.C6 ? (
                <td
                  style={
                    arrd && arrd[0] && arrd[0] < time
                      ? { backgroundColor: 'lightgray' }
                      : { backgroundColor: item.C6[1] }
                  }
                >
                  {item.C6[0]}
                </td>
              ) : (
                <td>{''}</td>
              )}
              {item.C7 ? (
                <td
                  style={
                    arrd && arrd[0] && arrd[0] < time
                      ? { backgroundColor: 'lightgray' }
                      : { backgroundColor: item.C7[1] }
                  }
                >
                  {item.C7[0]}
                </td>
              ) : (
                <td>{''}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
