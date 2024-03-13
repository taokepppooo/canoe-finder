import React, { useEffect, useRef, useState } from 'react'
import { defineCustomElements, type PartialOptions } from '../../../../loader'

interface CfUiContextMenuElement extends HTMLElement {
  options: PartialOptions;
}

export const Page = () => {
  const [options] = useState<PartialOptions>()
  const scrollbarRef = useRef<CfUiContextMenuElement>(null);

  useEffect(() => {
    defineCustomElements(window)
  }, [options])

  return (
    <>
      <cf-ui-context-menu>
      </cf-ui-context-menu>
    </>
  )
}

export default Page
