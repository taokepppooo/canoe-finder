import React, { useState } from 'react';
import './appContainer.scss';
import { CfDialog } from '@/components/dialog';

export function AppContainer({ title }) {
  let [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSwiperOnContextMenu = (event) => {
    event.stopPropagation();
  }

  const handleClick = () => {
    setIsDialogOpen(!isDialogOpen);
  }

  return (
    <>
      <div className="h-25 w-22.5 flex flex-col flex-items-center" onClick={() => handleClick()} onContextMenu={(event) => handleSwiperOnContextMenu(event)}>
        <div className="w-15 h-15 m-t-0.25 border-rd-2 app-bg app-shadow"></div>
        <label className="w-20 m-t-2 color-#fff font-bold font-size-3.25 text-truncate font-shadow">
          { title }
        </label>
      </div>

      <CfDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
        <div>
          <div className="font-size-3.25 font-bold color-#000 m-b-2">
            {title}
          </div>
          <div className="font-size-2.25 color-#000">
            This is a dialog
          </div>
        </div>
      </CfDialog>
    </>
  );
}
