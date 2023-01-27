import React, { useEffect } from 'react';
import style from './Home.module.css';
import Tuiwen from './Tuiwen';
import Resource from './Resource';
import { useLocation } from 'react-router';
import useDynamicRoute from '@/hooks/useDynamicRoute';

export default function Home() {
  const params = useLocation();
  const { getAccess } = useDynamicRoute();

  useEffect(() => {
    getAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.key]);
  return (
    <div className={style.homecontent}>
      <Resource />
      <Tuiwen />
    </div>
  );
}
