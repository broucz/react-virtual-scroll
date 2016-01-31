import React, { PropTypes } from 'react';

const VirtualList =
  ({
    height,
    children,
  }) => (
    <div
      style={{
        boxSizing: 'border-box',
        overflowX: 'auto',
        overflowY: 'hidden',
        height,
      }}
    >
      {children}
    </div>
  );

VirtualList.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
};

export default VirtualList;
