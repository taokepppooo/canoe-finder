import { useViewport } from '@/hooks/useViewport';

export const useDesktopAppArea = () => {
  const { height } = useViewport();
  const appHeight = `${height}px - 65rem`;
  const OPERATE_HEIGHT = '2.5rem';
  const areaHeight = `${appHeight} - ${OPERATE_HEIGHT}`;

  return {
    height: `calc(${areaHeight})`,
  };
};
