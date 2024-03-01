import React, { useId } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppContainer } from './appContainer';
import * as menu from '@zag-js/menu';
import * as scrollbar from '@cf/ui/src/scrollbar';
import { useMachine, normalizeProps } from '@zag-js/react';
import '@cf/ui/style/context-menu/index.css';
import '@cf/ui/style/scrollbar/index.css';
import type { DesktopContainer } from '@/types/welcome';
import './index.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';

export function Desktop() {
  const { t } = useTranslation();

  const [state, send] = useMachine(
    menu.machine({
      id: useId(),
    }),
  );
  const api = menu.connect(state, send, normalizeProps);

  const [scrollbarState, scrollbarSend] = useMachine(
    scrollbar.machine({ id: useId(), width: '100%', height: '100%' }),
  );
  const scrollbarStateApi = scrollbar.connect(scrollbarState, scrollbarSend, normalizeProps);

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
        className="h-full sm:p-x-3.75 md:p-x-20 lg:p-x-45 xl:p-x-60 sm:p-y-3.75 md:p-y-7.5 lg:p-y-20">
        <Swiper
          className="h-full"
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}>
          {swiperList.map((containerList, index) => (
            <SwiperSlide key={index}>
              <div className='cf-light-scrollbar' {...scrollbarStateApi.rootProps}>
                <div className="grid grid-content-start sm:grid-gap-0.25 md:grid-gap-5 lg:grid-gap-8 grid-template" {...scrollbarStateApi.contentProps}>
                  {getSwiperSlideComponents(containerList)}
                  <div {...scrollbarStateApi.yTrackProps}>
                    <div {...scrollbarStateApi.yThumbProps}></div>
                  </div>
                </div>
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
      </div>
    </>
  );
}

const getSwiperSlideComponents = (containerList: DesktopContainer[]) => {
  return containerList.map((container, index) => {
    return <AppContainer key={index} title={container.title} />;
  });
};
