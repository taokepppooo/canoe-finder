import React, { useMemo } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppContainer } from './appContainer';
import { useDesktopAppArea } from '@/pages/welcome/desktop/useDesktopAppArea';
import './index.scss';
import 'swiper/css';
import 'swiper/css/pagination';

export function Desktop() {
  const numberOfContainers = 10;
  const containers: React.JSX.Element[] = useMemo(
    () => Array.from({ length: numberOfContainers }, (_, index) => (
      <AppContainer key={index} />
    )),
    [numberOfContainers]
  );

  const swiperList: number[] = [1, 2, 5, 15]

  const { height } = useDesktopAppArea();
  const style = useMemo(() => ({ height }), [height]);

  return (
    <>
    <div
      style={style}
      className="m-t-260 sm:p-x-30 md:p-x-50 lg:p-x-180"
    >
      <Swiper
        className="h-full"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
      >
        {
          swiperList.map((item) =>
          <SwiperSlide>
            <div key={item} className="overflow-y-auto h-[calc(100%-8rem)] grid sm:grid-gap-5 md:grid-gap-8 lg:grid-gap-10 grid-justify-items-center grid-justify-evenly grid-template">
              { getSwiperSlideComponents(item, containers) }
            </div>
          </SwiperSlide>)
         }
      </Swiper>
    </div>
    </>
  );
}

const getSwiperSlideComponents = (item: number, containers: React.JSX.Element[]) => {
  return Array(item).fill(containers).flat();
};
