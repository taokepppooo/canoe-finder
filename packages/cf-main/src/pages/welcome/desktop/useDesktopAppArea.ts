import { useViewport } from '@/hooks/useViewport';

export const useDesktopAppArea = () => {
  const { height } = useViewport();
  const appHeight = `${height}px - 78rem`;
  const OPERATE_HEIGHT = '50px';
  const areaHeight = `${appHeight} - ${OPERATE_HEIGHT}`;

  return {
    height: `calc(${areaHeight})`
  };
};
