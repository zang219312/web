// 计算滚动条宽度
const getScrollbarWidth = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  container.style.overflow = 'scroll';

  const inner = document.createElement('div');
  container.appendChild(inner);

  const width = container.offsetWidth - inner.offsetWidth;

  document.body.removeChild(container)
  return width;
}