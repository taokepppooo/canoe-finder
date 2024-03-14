import React, { useEffect, useRef, useState } from 'react'
import { defineCustomElements, type MenuItem } from '../../../../loader'

interface CfUiMenuElement extends HTMLElement {
  items: MenuItem[];
}

export const Page = () => {
  const menuClickRef = useRef<CfUiMenuElement>(null);
  const menuContextmenuRef = useRef<CfUiMenuElement>(null);
  const [items] = useState<MenuItem[]>([
    {
      label: 'Item 1',
      name: 'item1',
    },
    {
      label: 'Item 2',
      name: 'item2',
    },
    {
      label: 'Item 3',
      name: 'item3',
    },
    {
      label: 'Item 4',
      name: 'item4',
    }
  ])

  useEffect(() => {
    defineCustomElements(window)

    if (menuClickRef.current) {
      menuClickRef.current.items = [...items];
    }
    if (menuContextmenuRef.current) {
      menuContextmenuRef.current.items = [...items];
    }
  }, [items])

  return (
    <>
      <cf-ui-menu ref={menuClickRef} height="100px" type="trigger">
        <button>2</button>
      </cf-ui-menu>
      <cf-ui-menu ref={menuContextmenuRef} height="100px" type="contextmenu">
        <div style={{ width: '500px', height: '500px', backgroundColor: 'red' }}>1</div>
      </cf-ui-menu>
    </>
  )
}

export default Page
