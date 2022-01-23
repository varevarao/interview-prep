import React, { useState } from 'react';
import Modal from 'react-modal';
import { LS_KEY_EXAMPLES, LS_KEY_LPS } from '../../utils/constants';
import { storeKey } from '../../utils/storage';

export type ImportDataProps = {
  isOpen: boolean;
  onClose: () => void;
};
function ImportData({ isOpen, onClose }: ImportDataProps) {
  const [lpData, setLPData] = useState<string>('');
  const [exampleData, setExampleData] = useState<string>('');
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
                value={lpData}
                onChange={(e) => setLPData(e.target.value)}
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
                value={exampleData}
                onChange={(e) => setExampleData(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 mt-5 justify-center mb-5">
          <button
            className="bg-green-300 p-2"
            onClick={() => {
              storeKey<LP[]>(LS_KEY_LPS, JSON.parse(lpData));
              storeKey<Example[]>(LS_KEY_EXAMPLES, JSON.parse(exampleData));
              window.location.reload();
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

export default ImportData;
