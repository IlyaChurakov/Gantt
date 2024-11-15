import style from './Gantt.module.css';
import React from 'react';

interface HeaderProps {
  height: number;
  text: string;
}

export const Header = ({ height, text }: HeaderProps) => {
  return (
    <div className={style.header} style={{ height }}>
      {text}
    </div>
  );
};
