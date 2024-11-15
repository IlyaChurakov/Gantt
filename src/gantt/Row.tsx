import { memo } from 'react';
import { Task } from './Task';
import { ChartDates, GanttRow } from './types';
import style from './Gantt.module.css';
import React from 'react';

export const Row = memo(
  ({
    data: { items, name },
    boundariesX,
    height,
    scale,
  }: {
    data: GanttRow;
    boundariesX: ChartDates;
    height: number;
    scale: number;
    fill?: string;
  }) => {
    return (
      <div style={{ height }} className={style.row}>
        {items.map((item, i) => (
          <Task
            key={i}
            event={name}
            item={item}
            boundariesX={boundariesX}
            scale={scale}
          />
        ))}
      </div>
    );
  },
);
