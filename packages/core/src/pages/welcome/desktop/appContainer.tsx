import React, { useState } from 'react';
import './appContainer.scss';
import { Dialog } from '@/components/dialog';

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

      <Dialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}></Dialog>
    </>
  );
}
