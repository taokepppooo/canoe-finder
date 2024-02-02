import * as scrollbar from '../../../../src/scrollbar';
import { normalizeProps, useMachine } from '@zag-js/react';
import { useId, useState } from "react"

export const Page = () => {
  const [state, send] = useMachine(scrollbar.machine({ id: useId() }))
  const api = scrollbar.connect(state, send, normalizeProps)

  return (
    <>
      <div>scrollbar</div>
      <div {...api.rootProps}>
        <div {...api.trackProps}>
          <div {...api.thumbProps}>
            111
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
