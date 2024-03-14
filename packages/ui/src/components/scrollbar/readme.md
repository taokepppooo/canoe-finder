# cf-ui-scrollbar



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default     |
| --------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `height`  | `height`  |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `'100%'`    |
| `options` | --        |             | `{ paddingAbsolute?: boolean; showNativeOverlaidScrollbars?: boolean; update?: DeepPartial<{ elementEvents: [elementSelector: string, eventNames: string][]; debounce: number \| [timeout: number, maxWait: number]; attributes: string[]; ignoreMutation: (mutation: MutationRecord) => any; }>; overflow?: DeepPartial<{ x: OverflowBehavior; y: OverflowBehavior; }>; scrollbars?: DeepPartial<{ theme: string; visibility: ScrollbarsVisibilityBehavior; autoHide: ScrollbarsAutoHideBehavior; autoHideDelay: number; autoHideSuspend: boolean; dragScroll: boolean; clickScroll: boolean; pointers: string[]; }>; }` | `undefined` |
| `width`   | `width`   |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `'100%'`    |


## Dependencies

### Used by

 - [cf-ui-menu](../menu)

### Graph
```mermaid
graph TD;
  cf-ui-menu --> cf-ui-scrollbar
  style cf-ui-scrollbar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
