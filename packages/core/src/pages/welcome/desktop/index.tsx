import React, { useId } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppContainer } from './appContainer';
import * as menu from '@zag-js/menu';
import { useMachine, normalizeProps } from '@zag-js/react';
import '@cf/ui/style/context-menu/index.css';
import type { DesktopContainer } from '@/types/welcome';
import './index.scss';
import 'swiper/css';
import 'swiper/css/pagination';

export function Desktop() {
  const [state, send] = useMachine(
    menu.machine({
      id: useId(),
    }),
  );
  const api = menu.connect(state, send, normalizeProps);

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
      <div
        {...api.contextTriggerProps}
        className="h-full sm:p-x-15 md:p-x-80 lg:p-x-180 xl:p-x-240 sm:p-y-15 md:p-y-30 lg:p-y-80">
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

        <div {...api.positionerProps}>
          <div className="cf-ui-content-bg"></div>
          <ul className="cf-ui-focus-outline" {...api.contentProps}>
            <li {...api.getItemProps({ id: 'edit' })}>Edit</li>
            <li {...api.getItemProps({ id: 'duplicate' })}>Duplicate</li>
            <li {...api.getItemProps({ id: 'delete' })}>Delete</li>
            <li {...api.getItemProps({ id: 'export' })}>Export...</li>
          </ul>
        </div>
      </div>
    </>
  );
}

const getSwiperSlideComponents = (containerList: DesktopContainer[]) => {
  return containerList.map((container, index) => {
    return <AppContainer key={index} title={container.title} />;
  });
};
