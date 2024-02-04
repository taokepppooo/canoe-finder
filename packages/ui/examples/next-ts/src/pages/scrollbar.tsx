import * as scrollbar from '../../../../src/scrollbar';
import '@cf/ui/style/scrollbar/index.css'
import { normalizeProps, useMachine } from '@zag-js/react';
import { useId, useState } from "react"

export const Page = () => {
  const [state, send] = useMachine(scrollbar.machine({ id: useId(), width: 200, height: 100 }))
  const api = scrollbar.connect(state, send, normalizeProps)

  return (
    <>
      <div>scrollbar</div>
      <div className='cf-light-scrollbar' {...api.rootProps}>
        <div {...api.contentProps}>
          <div style={{ wordBreak: 'keep-all' }}>111sadasddddddddddddddddddddddddddd4ffffffff</div>
          <div>222</div>
          <div>333</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div {...api.yTrackProps}>
            <div {...api.yThumbProps}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
