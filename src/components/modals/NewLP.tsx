import React, { useState } from 'react';
import Modal from 'react-modal';

export type NewLPProps = {
  data?: LP;
  isOpen: boolean;
  onSave: (lpexample: LP) => void;
  onClose: () => void;
};
export function NewLP({ data, isOpen, onSave, onClose }: NewLPProps) {
  const [title, setTitle] = useState<string>(data?.title || '');
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="New LP">
      <div className="w-full h-full flex flex-col">
        <h1>{data ? 'Edit' : 'Add'} LP</h1>
        <div className="h-32 flex items-center">
          <input
            autoFocus
            className="border-2"
            type="text"
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <button
            className="bg-green-300 p-2"
            onClick={() => {
              onSave({ title });
              setTitle('');
              onClose();
            }}
          >
            Save
          </button>
          <button onClick={() => onClose()}>Close</button>
        </div>
      </div>
    </Modal>
  );
}
