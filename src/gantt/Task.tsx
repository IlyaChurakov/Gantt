import { DAYMS } from './data';
import { ChartDates, GanttTask } from './types';
import { formatter } from './utils';
import Tooltip from './Tooltip';
import { memo } from 'react';
import style from './Gantt.module.css';
import React from 'react';

export const Task = memo(
  ({
    item: { dates, fill, color, name },
    boundariesX,
    scale,
    event,
  }: {
    item: GanttTask;
    boundariesX: ChartDates;
    scale: number;
    event: string;
  }) => {
    const leftX = boundariesX[0].getTime();

    const leftCell = dates[0].getTime();
    const rightCell = dates[1].getTime();

    const marginLeft = ((leftCell - leftX) / DAYMS) * scale + 'px';
    const width = ((rightCell - leftCell) / DAYMS) * scale + 'px';

    const label = (
      <div>
        <b>{`${event} ${name}`}</b>
        <p>{`Период: ${formatter.format(dates[0])} - ${formatter.format(
          dates[1],
        )}`}</p>
      </div>
    );

    return (
      <div
        className={style.task}
        style={{
          marginLeft,
          width,
          background: fill,
          color,
        }}
      >
        <Tooltip content={label}>
          <div className={style.task__content}>{name}</div>
        </Tooltip>
      </div>
    );
  },
);
