import React, { useEffect, useState, useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppContainer } from './appContainer';
import type { DesktopContainer } from '@/types/welcome';
import './index.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { defineCustomElements } from '@cf/ui/loader';
import type { PartialOptions } from '@cf/ui/dist/types';

interface CfUiScrollbarElement extends HTMLElement {
  options: PartialOptions;
}

export function Desktop() {
  const [options] = useState<PartialOptions>({
    overflow: {
      x: 'hidden',
    },
  });
  const scrollbarRef = useRef<CfUiScrollbarElement>(null);

  const arr2 = [];
  for (let i = 0; i < 200; i++) {
    arr2.push({
      id: `id-${i}`,
      title: 'Welcome to Cloudflare Pages',
    });
  }
  const desktop: DesktopContainer[] = [
    {
      id: `id-555`,
      title: 'Welcome to Cloudflare Pages',
      item: [
        {
          id: `id-777`,
          title: 'Welcome to Cloudflare Pages',
        },
      ],
    },
    {
      id: `id-666`,
      title: 'Welcome to Cloudflare Pages',
      item: [...arr2],
    },
  ];

  useEffect(() => {
    defineCustomElements(window);

    if (scrollbarRef.current) {
      scrollbarRef.current.options = options;
    }
  }, [options, desktop]);

  const SwiperSlideWithScrollbar = (d: DesktopContainer) => {
    return (
      <cf-ui-scrollbar ref={scrollbarRef}>
        <div className="grid grid-content-start sm:grid-gap-0.25 md:grid-gap-5 lg:grid-gap-8 grid-template">
          {d.item.map((container) => (
            <AppContainer key={container.id} title={container.title} />
          ))}
        </div>
      </cf-ui-scrollbar>
    );
  };

  return (
    <>
      <div className="h-full sm:p-x-3.75 md:p-x-20 lg:p-x-45 xl:p-x-60 sm:p-y-3.75 md:p-y-7.5 lg:p-y-20">
        <Swiper
          className="h-full"
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}>
          {desktop.map((d) => (
            <SwiperSlide key={d.id}>{SwiperSlideWithScrollbar(d)}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
