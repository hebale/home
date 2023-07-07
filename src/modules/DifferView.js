import React, { useRef, useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import ReactDiffViewer from 'react-diff-viewer-continued';

const defaultStyles = {
  variables: {
    light: {
      diffViewerBackground: '#fff',
      addedBackground: '#333',
      addedColor: '#fff',
      removedBackground: '#ddd',
      removedColor: '#333',
      codeFoldGutterBackground: '#ddd',
      codeFoldBackground: '#ddd',
      codeFoldContentColor: '#333',
      addedGutterBackground: '#f7f7f7',
      removedGutterBackground: '#f7f7f7',
    },
  },
  diffContainer: {
    borderBottom: '1px solid #ddd'
  },
  lineNumber: {
    color: '#333 !important'
  },
  contentText: {
    lineHeight: '22px',
    tabSize: 2
  },
  gutter: {
    padding: '0 8px',
    minWidth: '24px',
    borderLeft: '1px solid #ddd'
  },
  codeFold: {
    letterSpacing: '-0.05em',
    fontSize: '1.2rem',
    fontWeight: 600
  }
};

const config = {
  mass: 1.5,
  tension: 180,
  friction: 30
};

export default function DifferView({ file }) {
  const viewerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [viewHeight, setViewHeight] = useState(0);
  const [foldSpring, foldApi] = useSpring(() => ({
    height: 0,
    config
  }), []);

  useEffect(() => {
    setViewHeight(viewerRef.current.offsetHeight);
  }, [])

  const onClickVisible = () => {
    foldApi.start({ height: isVisible ? 0 : viewHeight });
    setIsVisible(!isVisible);
  };

  const toHeight = h => `${h}px`;
  
  return (
    <>
      <div className="title">
        <p>
          <span>{file.status}</span>
          <a href={file.rawUrl} target='_blank'>{file.filename}</a>
        </p>
        {file.patch && (
          <button 
            type="button"
            className={isVisible ? 'visible' : ''}
            onClick={() => onClickVisible()}
          ></button>
        )}
      </div>
      <animated.div className="viewer" style={{ height: foldSpring.height.to(toHeight) }} >
        <div ref={viewerRef} >
          {file.patch && (
            <ReactDiffViewer
              styles={defaultStyles}
              oldValue={file.old}
              newValue={file.new}
              splitView={false}
              disableWordDiff={true}
              extraLinesSurroundingDiff={2}
              linesOffset={file.offset}
            />
          )}
        </div>
      </animated.div>
    </>
  );
}