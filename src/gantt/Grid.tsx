import { memo, useMemo } from 'react';
import { ACCIENT_COLOR, DAYMS, FONE_COLOR } from './data';
import { ChartDates } from './types';
import style from './Gantt.module.css';
import React from 'react';

interface GridProps {
  ticks: string[];
  boundariesX: ChartDates;
  scale: number;
  lineColor?: string;
  fill?: string;
  rowHeight: number;
  rowCount: number;
}

export const Grid = memo(
  ({
    ticks,
    boundariesX,
    scale,
    rowHeight,
    rowCount,
    lineColor = ACCIENT_COLOR,
    fill = FONE_COLOR,
  }: GridProps) => {
    return (
      <div className={style.grid} style={{ background: fill }}>
        {ticks.map((tick, i) => (
          <VerticalLine
            key={i}
            date={tick}
            boundariesX={boundariesX}
            scale={scale}
            lineColor={lineColor}
          />
        ))}
        {Array.from({ length: rowCount - 1 }).map((_, index) => (
          <HorizontalLine
            key={index}
            lineColor={lineColor}
            rowHeight={rowHeight}
            index={index + 1}
          />
        ))}
      </div>
    );
  },
);

interface HorizontalLineProps {
  index: number;
  rowHeight: number;
  lineColor: string;
}

const HorizontalLine = memo(
  ({ index, rowHeight, lineColor }: HorizontalLineProps) => {
    const marginBottom = useMemo(
      () => index * rowHeight - 1 + 'px',
      [index, rowHeight],
    );

    return (
      <hr
        className={style.grid__horizontalLine}
        style={{ bottom: marginBottom, borderColor: lineColor }}
      />
    );
  },
);

interface VerticalLineProps {
  date: string;
  boundariesX: ChartDates;
  scale: number;
  lineColor: string;
}

const VerticalLine = ({
  date,
  boundariesX,
  scale,
  lineColor,
}: VerticalLineProps) => {
  const marginLeft = useMemo(() => {
    const leftX = boundariesX[0].getTime();
    const tickX = new Date(date).getTime();

    return ((tickX - leftX) / DAYMS) * scale + 'px';
  }, [boundariesX[0], date, scale]);

  return (
    <hr
      className={style.grid__verticalLine}
      style={{ left: marginLeft, borderColor: lineColor }}
    />
  );
};
