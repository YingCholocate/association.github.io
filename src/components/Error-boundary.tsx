import { Component, ReactElement, PropsWithChildren } from 'react';

// 错误时降级显示的UI组件，props就传个error就可以了，返回就是我们的jsx
type FallbackRender = (props: { error: Error | null }) => ReactElement;

export default class ErrorBoundary extends Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null, // 默认值 没有错误
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error && String(error).includes('Loading chunk') && String(error).includes('failed')) {
      window.location.reload();
    }
    return error ? fallbackRender({ error }) : children;
  }
}
