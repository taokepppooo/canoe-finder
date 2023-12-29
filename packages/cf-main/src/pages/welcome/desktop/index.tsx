import React from 'react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppContainer } from './appContainer';
import { useDesktopAppArea } from '@/pages/welcome/desktop/useDesktopAppArea';
import './index.scss';
import 'swiper/css';

export function Desktop() {
  const numberOfContainers = 10;
  const containers = Array.from({ length: numberOfContainers }, (_, index) => (
    <AppContainer key={index} />
  ));

  const { height } = useDesktopAppArea();
  const style = {
    height,
  };

  return (
    <>
    <div
      style={style}
      className="overflow-hidden m-t-312 sm:p-x-30 md:p-x-50 lg:p-x-180"
    >
      <Swiper
        className="h-full"
        modules={[Navigation, Pagination, Scrollbar]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <div className="grid sm:grid-gap-5 md:grid-gap-8 lg:grid-gap-10 grid-justify-items-center gird-justify-evenly grid-template">
            {containers}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid sm:grid-gap-5 md:grid-gap-8 lg:grid-gap-10 grid-justify-items-center gird-justify-evenly grid-template">
            {containers}
            {containers}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid sm:grid-gap-5 md:grid-gap-8 lg:grid-gap-10 grid-justify-items-center gird-justify-evenly grid-template">
            {containers}
            {containers}
            {containers}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid sm:grid-gap-5 md:grid-gap-8 lg:grid-gap-10 grid-justify-items-center gird-justify-evenly grid-template">
            {containers}
            {containers}
            {containers}
            {containers}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    </>
  );
}
