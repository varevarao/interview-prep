import React, { useState } from 'react';
import Modal from 'react-modal';
import { LS_KEY_EXAMPLES, LS_KEY_LPS } from '../../utils/constants';
import { fetchStoredKey } from '../../utils/storage';

export type ExportDataProps = {
  isOpen: boolean;
  onClose: () => void;
};
export function ExportData({ isOpen, onClose }: ExportDataProps) {
  const [lpData] = useState<LP[]>(fetchStoredKey<LP[]>(LS_KEY_LPS));
  const [exampleData] = useState<Example[]>(
    fetchStoredKey<Example[]>(LS_KEY_EXAMPLES),
  );
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="New Example">
      <div className="w-full h-full flex flex-col">
        <h1 className="text-center">Import Data</h1>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <h2>LP Data:</h2>
            <div className="min-h-max my-5">
              <textarea
                autoFocus
                className="border-2 w-full"
                rows={10}
                value={JSON.stringify(lpData)}
              />
            </div>
          </div>
          <div>
            <h2>Example Data:</h2>
            <div className="min-h-max my-5">
              <textarea
                autoFocus
                className="border-2 w-full"
                rows={10}
                value={JSON.stringify(exampleData)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 mt-5 justify-center mb-5">
          <button onClick={() => onClose()}>Close</button>
        </div>
      </div>
    </Modal>
  );
}
