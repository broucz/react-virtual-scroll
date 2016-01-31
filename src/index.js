import React, { Component, PropTypes } from 'react';
import { Iterable } from 'immutable';
import { raf, caf } from './utils';
import VirtualList from './components/VirtualList';
import RowContainer from './components/RowContainer';

class BigScroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollTop: 0,
    };

    this._$canShow = Math.ceil(props.containerHeight / props.rowHeight) + 1;
    this._$totalHeight = props.rowList.size * props.rowHeight;
    this._$containerStyle = {
      position: 'relative',
      overflow: 'auto',
      outline: 0,
      height: props.containerHeight,
    };

    this.handleUpdatePosition = this.handleUpdatePosition.bind(this);
  }

  __setNextState(state) {
    if (this._$setNextStateAnimationFrameId) {
      caf(this._$setNextStateAnimationFrameId);
    }

    this._$setNextStateAnimationFrameId = raf(() => {
      this._$setNextStateAnimationFrameId = null;
      this.setState(state);
    });
  }

  handleUpdatePosition() {
    const scrollTop = this.refs.BigScrollContainer.scrollTop;

    if (this.state.scrollTop === scrollTop) {
      return;
    }

    this.__setNextState({
      scrollTop,
    });
  }

  render() {
    const {
      rowComponent: RowComponent,
      rowHeight,
      rowList,
    } = this.props;

    const firstIndexToShow = Math.floor(this.state.scrollTop / rowHeight);

    const rowStack =
      rowList
        .skip(firstIndexToShow)
        .take(this._$canShow)
        .map((n, i) => (
          <RowContainer
            key={i}
            height={rowHeight}
            top={(firstIndexToShow + i) * rowHeight}
          >
            {React.cloneElement(RowComponent, { ...n })}
          </RowContainer>
        ));

    return (
      <div
        ref="BigScrollContainer"
        onScroll={this.handleUpdatePosition}
        onWheel={this.handleUpdatePosition}
        style={this._$containerStyle}
      >
        <VirtualList height={this._$totalHeight}>
          {rowStack}
        </VirtualList>
      </div>
    );
  }
}

BigScroll.propTypes = {
  containerHeight: PropTypes.number,
  rowComponent: PropTypes.element,
  rowHeight: PropTypes.number,
  rowList: PropTypes.instanceOf(Iterable),
};

export default BigScroll;
