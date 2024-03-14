import React, { useEffect, useRef, useState } from 'react'
import { defineCustomElements, type PartialOptions } from '../../../../loader'

interface CfUiScrollbarElement extends HTMLElement {
  options: PartialOptions;
}

export const Page = () => {
const [options] = useState<PartialOptions>({
    overflow: {
      x: 'hidden',
    }
  })
  const scrollbarRef = useRef<CfUiScrollbarElement>(null);

  useEffect(() => {
    defineCustomElements(window)
  if (scrollbarRef.current) {
      scrollbarRef.current.options = options;
    }
  }, [options])

  return (
    <>
      <cf-ui-scrollbar ref={scrollbarRef} width="50px" height="50px">
        <div>22333333</div>
        <div>22333333</div>
        <div>22333333</div>
        <div>22333333</div>
        <div>22333333</div>
        <div>22333333</div>
        <div>22333333</div>
        <div>22333333</div>
        <div>22333333</div>
        <div>22333333</div>
        <div>22333333</div>
        <div>22333333</div>
      </cf-ui-scrollbar>
    </>
  )
}

export default Page
