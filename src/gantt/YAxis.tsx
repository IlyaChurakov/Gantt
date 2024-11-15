import { ACCIENT_COLOR } from './data';
import style from './Gantt.module.css';
import React from 'react';

interface YAxisProps {
  ticks: string[];
  height: number;
  color?: string;
  axisColor?: string;
}

export const YAxis = ({
  ticks,
  height,
  color = ACCIENT_COLOR,
  axisColor = ACCIENT_COLOR,
}: YAxisProps) => {
  return (
    <div style={{ color, borderColor: axisColor }} className={style.yAxis}>
      {ticks.map((tick, i) => (
        <div key={i} style={{ height }} className={style.yAxis__yTick}>
          <p title={tick}>{tick}</p>
        </div>
      ))}
    </div>
  );
};
