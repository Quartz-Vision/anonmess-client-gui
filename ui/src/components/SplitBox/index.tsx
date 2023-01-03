import React, { useState, MouseEvent, useEffect } from 'react';
import { useMemo } from 'react';
import { createRef } from 'react';

import styles from './styles.module.scss';

interface IOptionalProps {
  orientation: "horizontal" | "vertical";
  initialScale: number;
  onScale: (scale: number, aSize: number, bSize: number) => void;
}

interface IProps extends IOptionalProps {
  componentA: JSX.Element;
  componentB: JSX.Element;
};

const defaultProps: IOptionalProps = {
  orientation: "vertical",
  initialScale: 50,
  onScale: (..._) => null,
};

const RESIZE_LINE_WIDTH = 10;

const SplitBox = ({componentA, componentB, orientation, initialScale, onScale}: IProps) => {
  const [isResizing, setResizing] = useState(false);
  const [scale, setScale] = useState(initialScale);
  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const {width=0, height=0} = containerRef.current?.getBoundingClientRect() ?? {};
    const size = orientation === 'vertical' ? width : height;

    onScale(scale, scale / 100 * size, (1 - scale / 100) * size);
  }, [orientation, scale, onScale]);

  const stopResizing = (e: Event | MouseEvent) => {
    e.preventDefault();
    
    setResizing(false);
    window.removeEventListener('mouseup', stopResizing);
    window.removeEventListener('mouseleave', stopResizing);
    window.removeEventListener('blur', stopResizing);
  };
  const startResizing = (e: Event | MouseEvent) => {
    e.preventDefault();

    setResizing(true);
    window.addEventListener('mouseup', stopResizing, {once: true});
    window.addEventListener('mouseleave', stopResizing, {once: true});
    window.addEventListener('blur', stopResizing, {once: true});
  };
  const onResize = useMemo(() =>
    orientation === 'vertical'
      ? (e: MouseEvent, container: HTMLDivElement) => {
        const {x, width} = container.getBoundingClientRect();
        setScale(Math.min(1 - RESIZE_LINE_WIDTH / width, Math.max(0, (e.pageX - x) / width)) * 100);
      }
      : (e: MouseEvent, container: HTMLDivElement) => {
        const {y, height} = container.getBoundingClientRect();
        setScale(Math.min(1 - RESIZE_LINE_WIDTH / height, Math.max(0, (e.pageY - y) / height)) * 100);
      },
    [orientation]
  );
  const onMouseMove = (e: MouseEvent) => {
    if (isResizing && containerRef.current) {
      e.preventDefault();
      onResize(e, containerRef.current);
      return false;
    }
  }
  
  return (
    <div
      className={`${styles.container} ${styles[orientation]}`}
      onMouseMove={onMouseMove}
      ref={containerRef}
    >
      <div
        className={`${styles.block} ${styles.first}`}
        style={{
          flexBasis: scale + '%'
        }}
      >{componentA}</div>
      <div className={styles.divider} onMouseDown={startResizing}></div>
      <div
        className={`${styles.block}`}
      >{componentB}</div>
    </div>
  )
}

SplitBox.defaultProps = defaultProps;

export default SplitBox;