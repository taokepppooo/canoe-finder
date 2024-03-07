import React, { useEffect } from 'react'
import { defineCustomElements } from '../../../../loader'

export const Page = () => {
  useEffect(() => {
    defineCustomElements(window)
  }, [])

  return (
    <>
      <cf-ui-scrollbar width="50px" height="50px">
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
