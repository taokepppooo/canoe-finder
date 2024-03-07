import { Component, Prop, h, Element } from '@stencil/core';
import { OverlayScrollbars } from 'overlayscrollbars';

@Component({
  tag: 'cf-ui-scrollbar',
  styleUrl: 'scrollbar.css',
  shadow: true,
})

export class CfUiScrollbar {
  @Element() el: HTMLElement;

  @Prop() width = '100%';
  @Prop() height;

  componentDidLoad() {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const { height } = entry.contentRect;
            this.el.style.height = `${height}px`; // 更新高度
        }
    });
    resizeObserver.observe(this.el.parentElement);

    const scrollableContent = this.el.shadowRoot.querySelector('[data-overlayscrollbars-initialize]') as HTMLElement;
    try {
      OverlayScrollbars(
        scrollableContent,
        {},
      );
    } catch (error) {
      console.error('Error initializing OverlayScrollbars', error);
    }
  }

  render() {
    return (
      <div style={{ width: this.width, height: this.height || this.el.style.height }}>
        <div class="overlayscrollbars" data-overlayscrollbars-initialize>
          <slot />
        </div>
      </div>
    );
  }
}
