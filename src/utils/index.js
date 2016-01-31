const global =
  typeof window === 'undefined'
    ? {}
    : window;

const raf = global.requestAnimationFrame;
const caf = global.cancelAnimationFrame;

export {
  raf,
  caf,
};
