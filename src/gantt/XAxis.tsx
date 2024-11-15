import { ChartDates } from './types';
import { ACCIENT_COLOR, DAYMS } from './data';
import { memo, useMemo } from 'react';
import style from './Gantt.module.css';
import React from 'react';

export const XAxis = ({
  ticks,
  boundaries,
  scale,
  color = ACCIENT_COLOR,
  axisColor = ACCIENT_COLOR,
}: {
  ticks: string[];
  boundaries: ChartDates;
  scale: number;
  color?: string;
  axisColor?: string;
}) => {
  return (
    <div className={style.xAxis} style={{ color, borderColor: axisColor }}>
      {ticks.map((tick, i) => (
        <XTick
          key={i}
          date={tick}
          boundariesX={boundaries}
          scale={scale}
          lineColor={axisColor}
        />
      ))}
    </div>
  );
};

const XTick = memo(
  ({
    date,
    boundariesX,
    scale,
    lineColor,
  }: {
    date: string;
    boundariesX: ChartDates;
    scale: number;
    lineColor: string;
  }) => {
    const marginLeft = useMemo(() => {
      const leftX = boundariesX[0].getTime();
      const tickX = new Date(date).getTime();

      return ((tickX - leftX) / DAYMS) * scale + 'px';
    }, [boundariesX[0], date, scale]);

    const formatter = useMemo(() => {
      const dateParts = date.split('-');

      return new Intl.DateTimeFormat('ru', {
        year: dateParts.length < 3 ? 'numeric' : undefined,
        month: dateParts.length <= 3 ? 'long' : undefined,
        day: dateParts.length === 3 ? '2-digit' : undefined,
      });
    }, [date]);

    return (
      <div className={style.xAxis__xTick} style={{ left: marginLeft }}>
        <div className={style.xAxis__xTick_content}>
          <div
            style={{ background: lineColor }}
            className={style.xAxis__xTick_content_line}
          />

          {formatter.format(new Date(date))}
        </div>
      </div>
    );
  },
);
