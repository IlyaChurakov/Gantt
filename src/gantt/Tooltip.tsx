import { MouseEvent, ReactNode, useCallback, useState } from 'react';
import style from './Gantt.module.css';
import React from 'react';

const HEIGHT = 70;
const WIDTH = 300;
const MARGIN = 10;

const Tooltip = ({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const tooltipWidth = WIDTH;
    const tooltipHeight = HEIGHT;
    const margin = MARGIN;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    let top = clientY + margin;
    let left = clientX + margin;

    if (left + tooltipWidth > innerWidth) {
      left = clientX - tooltipWidth - margin;
    }

    if (top + tooltipHeight > innerHeight) {
      top = clientY - tooltipHeight - margin;
    }

    setPosition({ top, left });
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={style.tooltip}
    >
      {children}

      {isVisible && (
        <div
          className={style.tooltip__content}
          style={{
            top: position.top,
            left: position.left,
            width: WIDTH + 'px',
            height: HEIGHT + 'px',
            backgroundColor: '#333',
            color: '#fff',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
