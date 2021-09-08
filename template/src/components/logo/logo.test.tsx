import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Logo from './Logo';

let container: HTMLElement | null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container as HTMLElement);
  container = null;
});

it('can render logo', () => {
  // 首先测试 render 和 componentDidMount
  act(() => {
    ReactDOM.render(<Logo />, container);
  });

  if (container) {
    const img: HTMLImageElement = container.querySelector('img') as HTMLImageElement;
    expect(img.alt).toBe('logo');
  }
});
