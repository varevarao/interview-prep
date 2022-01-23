import React, { useState } from 'react';
import Modal from 'react-modal';
import { LPList } from '../LPList';

export type NewExampleProps = {
  data?: Example;

  allLP: LP[];
  isOpen: boolean;
  onSave: (example: Example) => void;
  onClose: () => void;
};
export function NewExample({
  data,
  allLP,
  isOpen,
  onSave,
  onClose,
}: NewExampleProps) {
  const [description, setDescription] = useState<string>(
    data?.description || '',
  );
  const [assocLPs, setAssocLPs] = useState<LP[]>(data?.lps || []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="New Example">
      <div className="w-full h-full flex flex-col">
        <h1 className="text-center">{data ? 'Edit' : 'Add New'} Example</h1>
        <div className="min-h-max my-5">
          <textarea
            autoFocus
            className="border-2 w-full"
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <p>Associated LP's:</p>
        <LPList lps={allLP} activeLP={assocLPs} setActiveLP={setAssocLPs} />
        <div className="flex gap-10 mt-5 justify-center mb-5">
          <button
            className="bg-green-300 p-2"
            onClick={() => {
              onSave({ description, lps: assocLPs });
              setDescription('');
              setAssocLPs([]);
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
