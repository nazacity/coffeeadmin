import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import useDimensions from 'react-use-dimensions';
//import useWindowSize from '@rehooks/window-size';

// Hook
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

import { Context } from './Context';

const TrackWrapper = styled(motion.div)`
  display: flex;
  flex-wrap: nowrap;
  min-width: min-content;

  padding: ${(props) => props.padding}px;

  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const Track = ({
  children,
  padding,
  gap,
  velocity,
  transition,
  allowSlideToLast,
  style,
}) => {
  const [trackRef, trackDimensions] = useDimensions({ liveMeasure: false });
  const windowDimensions = useWindowSize();
  const controls = useAnimation();

  const { state, dispatch } = useContext(Context);

  // console.log(state);
  const negativeItems = state.items.map(
    (item) => item * -1 + trackDimensions.x || 0
  );

  const lastTwo = state.items.slice(-2);
  const lastItem = lastTwo[1] - lastTwo[0];

  function onDragEnd(event, info) {
    const offset = info.offset.x;
    const correctedVelocity = info.velocity.x * velocity;

    const direction = correctedVelocity < 0 || offset < 0 ? 1 : -1;
    const startPosition = info.point.x - offset;

    const endOffset =
      direction === 1
        ? Math.min(correctedVelocity, offset)
        : Math.max(correctedVelocity, offset);
    const endPosition = startPosition + endOffset;

    const closestPosition = negativeItems.reduce((prev, curr) =>
      Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
    );

    //console.log(negativeItems);

    const activeSlide = negativeItems.indexOf(closestPosition);
    dispatch({ type: 'SET_ACTIVE_ITEM', activeItem: activeSlide });

    controls.start({
      x: allowSlideToLast
        ? closestPosition
        : Math.max(
            closestPosition,
            windowDimensions.width -
              trackDimensions.width -
              // TODO: real track wrapper left/right offsets that should be live!
              (trackDimensions.x + trackDimensions.x)
          ),
      transition: {
        type: 'spring',
        velocity: info.velocity.x,
        stiffness: transition.stiffness,
        damping: transition.damping,
        mass: transition.mass,
      },
    });
  }

  return (
    <TrackWrapper
      ref={trackRef}
      style={style}
      padding={padding}
      animate={controls}
      drag="x"
      dragConstraints={{
        left: allowSlideToLast
          ? lastItem + gap - trackDimensions.width
          : windowDimensions.width -
            trackDimensions.width -
            // TODO: real track wrapper left/right offsets that should be live!
            (trackDimensions.x + trackDimensions.x),
        right: 0,
      }}
      onDragEnd={onDragEnd}
    >
      {children}
    </TrackWrapper>
  );
};

export default Track;
