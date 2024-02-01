import * as scrollbar from '../../../../src/scrollbar';
import { normalizeProps, useMachine } from '@zag-js/react';
import { useId, useState } from "react"

export const Page = () => {
  const [state, send] = useMachine(scrollbar.machine({ id: useId() }))
  scrollbar.connect(state, send, normalizeProps)
}

export default Page
