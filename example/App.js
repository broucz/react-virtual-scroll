import React, { Component } from 'react';
import { render } from 'react-dom';
import { Seq, Range } from 'immutable';
import BigScroll from '../src';

const __list =
  new Seq(Range(0, 100000).map((n, i) => ({ id: i }))).toList();

const Row = ({ id }) => (
  <div style={{ height: 32 }}>
    Row | {id}
  </div>
);

const App = () => (
  <div>
    <h3>React Big Scroll</h3>
    <BigScroll
      containerHeight={160}
      rowComponent={<Row />}
      rowHeight={32}
      rowList={__list}
    />
  </div>
);

render(
  <App/>,
  document.getElementById('root')
);
