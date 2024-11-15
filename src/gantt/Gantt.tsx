import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import React from 'react';
import { calculateScale, findXValues, getXTicks, normalize } from './utils';
import { ChartDates, GanttData } from './types';
import { XAxis } from './XAxis';
import { Row } from './Row';
import { YAxis } from './YAxis';
import { Grid } from './Grid';
import style from './Gantt.module.css';
import { Header } from './Header';

interface GanttProps {
  data: GanttData;
  background: string;
  rowHeight: number;
  y?: Partial<{
    color: string;
    lineColor: string;
  }>;
  x?: Partial<{
    color: string;
    lineColor: string;
  }>;
  grid?: Partial<{
    fill: string;
    lineColor: string;
  }>;
  empty?: ReactNode;
  scrollSensitivity?: number;
  title?: {
    text: string;
    height: number;
  };
}

export const Gantt = ({
  data,
  background,
  rowHeight,
  title = { text: 'Название', height: 50 },
  y,
  x,
  grid,
  empty,
  scrollSensitivity = 5,
}: GanttProps) => {
  const XValues = useMemo(() => findXValues(data), [data]);
  const XBoundaries = useMemo(
    () => [XValues[0], XValues[XValues.length - 1]] as ChartDates,
    [XValues],
  );

  const ganttContent = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState<number | null>(null);
  const [minScale, setMinScale] = useState<number | null>(null);

  useEffect(() => {
    if (ganttContent.current) {
      const scale = calculateScale(
        XValues[0],
        XValues[XValues.length - 1],
        ganttContent.current.clientWidth,
      );

      setScale(scale);
      setMinScale(scale);
    }
  }, [ganttContent]);

  const YTicks = useMemo(() => data.map((row) => row.name), [data]);
  const XTicks = useMemo(
    () => getXTicks(XValues[0], XValues[XValues.length - 1], scale),
    [XValues, scale],
  );

  const gantRef = useRef<HTMLDivElement>(null);

  const wheelHandler = useCallback(
    (e: WheelEvent) => {
      if (!scale || !minScale) return;

      const threshold = 0.5;

      if (Math.abs(e.deltaY) - Math.abs(e.deltaX) > threshold) {
        e.preventDefault();

        const scrollSensitivityParam = scrollSensitivity / 10000;

        const newScale = scale + e.deltaY * scale * scrollSensitivityParam;

        setScale(newScale > minScale ? newScale : minScale);
      }
    },
    [scale, minScale],
  );

  useEffect(() => {
    const element = gantRef.current;

    if (element)
      element.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      if (element) element.removeEventListener('wheel', wheelHandler);
    };
  }, [wheelHandler, gantRef]);

  return (
    <div className={style.gantt__wrapper}>
      {!!title && (
        <Header
          text={`${title.text}. Масштаб: ${scale}`}
          height={title.height}
        />
      )}

      {data.length ? (
        <div ref={gantRef} className={style.gantt} style={{ background }}>
          <YAxis ticks={YTicks} height={rowHeight} {...y} />

          <div ref={ganttContent} className={style.gantt__scroll}>
            {!!scale && (
              <div className={style.gantt__scroll_content}>
                <XAxis
                  ticks={XTicks}
                  boundaries={XBoundaries}
                  scale={scale}
                  {...x}
                />

                <div className={style.gantt__scroll_content_grid}>
                  <Grid
                    rowHeight={rowHeight}
                    rowCount={data.length}
                    ticks={XTicks}
                    boundariesX={XBoundaries}
                    scale={scale}
                    {...grid}
                  />

                  {data.map((item, i) => (
                    <Row
                      key={i}
                      data={item}
                      height={rowHeight}
                      boundariesX={XBoundaries}
                      scale={scale}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        empty ?? <div>Данных нет</div>
      )}
    </div>
  );
};
