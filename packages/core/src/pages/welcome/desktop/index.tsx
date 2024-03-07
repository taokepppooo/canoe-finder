import React, { useEffect } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppContainer } from './appContainer';
import type { DesktopContainer } from '@/types/welcome';
import './index.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';
import { defineCustomElements } from '@cf/ui/loader';

export function Desktop() {
  useEffect(() => {
    defineCustomElements(window);
  }, []);

  const { t } = useTranslation();

  const arr2 = [];
  for (let i = 0; i < 200; i++) {
    arr2.push({
      title: 'Welcome to Cloudflare Pages',
    });
  }
  const swiperList: DesktopContainer[][] = [
    [
      {
        title: 'Welcome to Cloudflare Pages',
      },
    ],
    [...arr2],
  ];

  return (
    <>
      <div className="h-full sm:p-x-3.75 md:p-x-20 lg:p-x-45 xl:p-x-60 sm:p-y-3.75 md:p-y-7.5 lg:p-y-20">
        <Swiper
          className="h-full"
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}>
          {swiperList.map((containerList, index) => (
            <SwiperSlide key={index}>{SwiperSlideWithScrollbar(containerList)}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

const SwiperSlideWithScrollbar = (containerList: DesktopContainer[]) => {
  return (
    <cf-ui-scrollbar>
      <div className="grid grid-content-start sm:grid-gap-0.25 md:grid-gap-5 lg:grid-gap-8 grid-template">
        {containerList.map((container, index) => (
          <AppContainer key={index} title={container.title} />
        ))}
      </div>
    </cf-ui-scrollbar>
  );
};
