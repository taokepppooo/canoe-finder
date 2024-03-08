import { Component, Prop, h, Element } from '@stencil/core';
import { OverlayScrollbars, type PartialOptions } from 'overlayscrollbars';

@Component({
  tag: 'cf-ui-scrollbar',
  styleUrl: 'scrollbar.css',
  shadow: true,
})

export class CfUiScrollbar {
  @Element() el: HTMLElement;

  @Prop() width;
  @Prop() height;
  @Prop() options: PartialOptions;

  componentDidLoad() {
    console.log('this.options1', this.options)
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
          const { width, height } = entry.contentRect;
          this.el.style.width = `${width}px`;
          this.el.style.height = `${height}px`;
      }
    });
    resizeObserver.observe(this.el.parentElement);

    const scrollableContent = this.el.shadowRoot.querySelector('[data-overlayscrollbars-initialize]') as HTMLElement;
    try {
      OverlayScrollbars(
        scrollableContent,
        {
          ...this.options,
        },
      );
    } catch (error) {
      console.error('Error initializing OverlayScrollbars', error);
    }
  }

  render() {
    return (
      <div
        style={{
          width: this.width || this.el.style.width,
          height: this.height || this.el.style.height
        }}
      >
        <div class="overlayscrollbars" data-overlayscrollbars-initialize>
          <slot />
        </div>
      </div>
    );
  }
}
