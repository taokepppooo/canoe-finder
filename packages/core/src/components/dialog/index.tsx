import React, { ReactElement } from 'react';
import { Dialog as HDialog } from '@headlessui/react';

type DialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Dialog: React.FC<DialogProps> = ({ isOpen, setIsOpen }): ReactElement => {
  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HDialog open={isOpen} onClose={toggleDialog} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bgc-black" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <HDialog.Panel className="mx-auto max-w-sm rounded bgc-white">
            <HDialog.Title>Complete your order</HDialog.Title>

            {/* ... */}
          </HDialog.Panel>
        </div>
      </div>
    </HDialog>
  );
};
