import React, { useId } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppContainer } from './appContainer';
import type { DesktopContainer } from '@/types/welcome';
import './index.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';

export function Desktop() {
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
      {/* <div
        {...api.contextTriggerProps}
        className="h-full sm:p-x-3.75 md:p-x-20 lg:p-x-45 xl:p-x-60 sm:p-y-3.75 md:p-y-7.5 lg:p-y-20">
        <Swiper
          className="h-full"
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}>
          {swiperList.map((containerList, index) => (
            <SwiperSlide key={index}>
              <div className="overflow-y-auto overflow-x-hidden h-[calc(100%-2rem)] grid grid-content-start sm:grid-gap-0.25 md:grid-gap-5 lg:grid-gap-8 grid-template">
                {getSwiperSlideComponents(containerList)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div {...api.positionerProps}>
          <div className="cf-ui-content-bg"></div>
          <ul className="cf-ui-focus-outline" {...api.contentProps}>
            <li {...api.getItemProps({ id: 'edit' })}>{t('desktop.menu.addApp')}</li>
          </ul>
        </div>
      </div> */}
    </>
  );
}

const getSwiperSlideComponents = (containerList: DesktopContainer[]) => {
  return containerList.map((container, index) => {
    return <AppContainer key={index} title={container.title} />;
  });
};
