import React, { PropTypes } from 'react';

const RowContainer =
  ({
    height,
    top,
    children,
  }) => (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height,
        top,
      }}
    >
      {children}
    </div>
  );

RowContainer.propTypes = {
  children: PropTypes.element,
  height: PropTypes.number,
  top: PropTypes.number,
};

export default RowContainer;
