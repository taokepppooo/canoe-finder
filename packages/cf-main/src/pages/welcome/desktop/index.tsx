import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppContainer } from './appContainer';
import type { DesktopContainer } from '@/types/welcome';
import './index.scss';
import 'swiper/css';
import 'swiper/css/pagination';

export function Desktop() {
  const swiperList: DesktopContainer[][] = [
    [
      {
        title: 'Welcome to Cloudflare Pages',
      },
    ],
    [
      {
        title: 'Welcome to Cloudflare Pages',
      },
      {
        title: 'Welcome to Cloudflare Pages',
      },
    ],
  ];

  return (
    <>
      <div className="h-full sm:p-x-15 md:p-x-80 lg:p-x-180 xl:p-x-240 sm:p-y-15 md:p-y-30 lg:p-y-80">
        <Swiper
          className="h-full"
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}>
          {swiperList.map((containerList, index) => (
            <SwiperSlide key={index}>
              <div className="overflow-y-auto overflow-x-hidden h-[calc(100%-8rem)] grid grid-content-start sm:grid-gap-10 md:grid-gap-20 lg:grid-gap-40 grid-template">
                {getSwiperSlideComponents(containerList)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

const getSwiperSlideComponents = (containerList: DesktopContainer[]) => {
  return containerElement();
};

const containerElement = () => {
  return <AppContainer />;
};
