import React from 'react';
import style from './Home.module.css';
import Tuiwen from './Tuiwen';
import Resource from './Resource';

export default class Home extends React.Component {
  render() {
    return (
      <div className={style.homecontent}>
        <Resource />
        <Tuiwen />
      </div>
    );
  }
}
