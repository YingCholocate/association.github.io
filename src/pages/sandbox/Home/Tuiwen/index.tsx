import { Divider, Empty, List, Pagination, Avatar, Button, message } from 'antd';
import path from '@/assets/photologo.png';
import React, { useEffect, useState } from 'react';
import style from './index.module.css';
import { deleteTuiwen, getTuiwen, IArticle, ITuiwen } from '@/api/tuiwen';
import useDynamicRoute from '@/hooks/useDynamicRoute';
import { mockurl } from '@/utils/commonurl';

export default function Tuiwen() {
  const [total, setTotal] = useState(1);
  const [articledata, setArticleData] = useState<IArticle[]>([]);
  const [limitSize] = useState(3); // 每一页最多显示的记录数量
  const { showOrNotByRule } = useDynamicRoute();

  useEffect(() => {
    const asynFun = async () => {
      const result = await getarticleData(1);
      // console.log('result', result);
      setArticleData(result);
    };
    asynFun();
  }, []);
  // 获取推文数据
  const getarticleData = async (num: number) => {
    const result = await getTuiwen(num);
    const mockurl1 = '/mock';
    if (mockurl.match(mockurl1) !== null) {
      setTotal(7);
      localStorage.setItem(`article${num}`, JSON.stringify(result.data));
      return result.data;
    } else {
      setTotal(result.data[2]);
      localStorage.setItem(`article${num}`, JSON.stringify(result.data[0]));
    }
    return result.data[0];
  };

  // 修改page数据
  const pageonChange = (e) => {
    // const article = localStorage.getItem('article');
    // console.log(JSON.parse(article as string));
    const asynFun = async () => {
      const result = await getarticleData(e);
      setArticleData(result);
    };
    asynFun();
  };

  // 删除推文
  const handleDelete = (index) => {
    const data: ITuiwen = {
      type: 1,
      id: index,
      method: 'delete',
    };
    deleteTuiwen(data).then(() => {
      // console.log(res.data);
      message.success('删除成功');
    });
    const newdata = articledata.filter((item: IArticle) => {
      return item.id !== index;
    });
    setArticleData(newdata);
  };

  return (
    <div className={style.bottomstyle}>
      <Divider orientation="left">社团推文</Divider>
      {articledata.length > 0 ? (
        <List
          className={style.liststyle}
          itemLayout="horizontal"
          dataSource={articledata}
          renderItem={(item: IArticle) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={path} />}
                title={
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.title.toString()}
                  </a>
                }
                description={item.uploadtime}
              />
              {showOrNotByRule() && (
                <Button className={style.buttonstyle} onClick={() => handleDelete(item.id)}>
                  delete
                </Button>
              )}
            </List.Item>
          )}
        />
      ) : (
        <Empty />
      )}

      <Pagination
        className={style.pagestyle}
        defaultCurrent={1}
        total={total}
        defaultPageSize={limitSize}
        onChange={pageonChange}
      />
    </div>
  );
}
