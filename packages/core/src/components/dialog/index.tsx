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
    <HDialog open={isOpen} onClose={toggleDialog}>
      <HDialog.Panel>
        <HDialog.Title>Deactivate account</HDialog.Title>
        <HDialog.Description>This will permanently deactivate your account</HDialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data will be permanently
          removed. This action cannot be undone.
        </p>

        <button onClick={toggleDialog}>Deactivate</button>
        <button onClick={toggleDialog}>Cancel</button>
      </HDialog.Panel>
    </HDialog>
  );
};
