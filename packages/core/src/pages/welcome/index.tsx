import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import { Desktop } from './desktop';
import { defineCustomElements, type MenuItem } from '@cf/ui/loader';

interface CfUiMenuElement extends HTMLElement {
  items: MenuItem[];
}

export function Welcome() {
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
    },
  ]);

  useEffect(() => {
    defineCustomElements(window);

    if (menuRef.current) {
      menuRef.current.items = [...items];
    }
  }, [items]);

  const menuRef = useRef<CfUiMenuElement>(null);

  return (
    <>
      <div className="w-100% h-100% bg">
        <cf-ui-menu ref={menuRef} type="contextmenu" height="100px">
          <Desktop></Desktop>
        </cf-ui-menu>
      </div>
    </>
  );
}
