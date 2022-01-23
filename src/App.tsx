import React, { useEffect, useState } from 'react';
import { ExampleList } from './components/ExampleList';
import { LPList } from './components/LPList';
import ImportData from './components/modals/ImportData';
import { NewExample } from './components/modals/NewExample';
import { NewLP } from './components/modals/NewLP';
import { LS_KEY_EXAMPLES, LS_KEY_LPS } from './utils/constants';
import { fetchStoredKey, storeKey } from './utils/storage';

function App() {
  const [lps, setLPS] = useState<LP[]>(fetchStoredKey(LS_KEY_LPS));
  const [examples, setExamples] = useState<Example[]>(
    fetchStoredKey(LS_KEY_EXAMPLES),
  );

  const [selectedLP, setSelectedLP] = useState<LP[]>([]);

  const [showImport, setShowImport] = useState<boolean>(false);
  const [showAddLP, setShowAddLP] = useState<boolean>(false);
  const [editingLP, setEditingLP] = useState<LP | undefined>();

  const [showAddExample, setShowAddExample] = useState<boolean>(false);
  const [editingExample, setEditingExample] = useState<Example | undefined>();

  useEffect(() => {
    storeKey<Example[]>(LS_KEY_EXAMPLES, examples);
  }, [examples]);

  useEffect(() => {
    storeKey<LP[]>(LS_KEY_LPS, lps);
  }, [lps]);

  return (
    <div className="h-full w-full grid grid-cols-2 gap-4 p-5">
      {Boolean(showImport) ? (
        <ImportData isOpen={showImport} onClose={() => setShowImport(false)} />
      ) : null}
      {Boolean(showAddLP || editingLP) ? (
        <NewLP
          isOpen={true}
          data={editingLP}
          onClose={() => {
            setShowAddLP(false);
            setEditingLP(undefined);
          }}
          onSave={(lp) =>
            setLPS((prev) => {
              const idx = editingLP
                ? prev.map((e) => e.title).indexOf(editingLP.title)
                : -1;

              if (idx >= 0) {
                prev[idx] = lp;
                return [...prev];
              }
              return [...prev, lp];
            })
          }
        />
      ) : null}

      {Boolean(showAddExample || editingExample) ? (
        <NewExample
          isOpen={true}
          allLP={lps}
          data={editingExample}
          onClose={() => {
            setShowAddExample(false);
            setEditingExample(undefined);
          }}
          onSave={(ex) => {
            setExamples((prev) => {
              const idx = editingExample
                ? prev
                    .map((e) => e.description)
                    .indexOf(editingExample.description)
                : -1;

              if (idx >= 0) {
                prev[idx] = ex;
                return [...prev];
              }
              return [...prev, ex];
            });
          }}
        />
      ) : null}

      <button
        className="absolute top-1 right-1 text-xs bg-indigo-200 p-1"
        onClick={() => setShowImport(true)}
      >
        Import
      </button>
      <div className="border-r-2 border-gray-500">
        <div className="mb-5 flex items-center justify-between p-5">
          <h2 className="text-lg font-bold">LP's</h2>
          <button
            onClick={() => setShowAddLP(true)}
            className="text-xs p-1 bg-teal-300"
          >
            + Add LP
          </button>
        </div>
        <LPList
          lps={lps}
          onClickEdit={setEditingLP}
          onDelete={(lp) => {
            setLPS((prev) => {
              const idx = prev.map((e) => e.title).indexOf(lp.title);

              if (idx >= 0) {
                prev.splice(idx, 1);
                return [...prev];
              }
              return prev;
            });
          }}
          activeLP={selectedLP}
          setActiveLP={setSelectedLP}
        />
      </div>
      {/* <div className="w-0.5 h-full bg-gray-500" /> */}
      <div>
        <div className="mb-5 flex items-center justify-between p-5">
          <h2 className="text-lg font-bold">Examples</h2>
          <button
            onClick={() => setShowAddExample(true)}
            className="text-xs p-1 bg-teal-300"
          >
            + Add Example
          </button>
        </div>
        <ExampleList
          onClickEdit={setEditingExample}
          onDelete={(ex) => {
            setExamples((prev) => {
              const idx = prev
                .map((e) => e.description)
                .indexOf(ex.description);

              if (idx >= 0) {
                prev.splice(idx, 1);
                return [...prev];
              }
              return prev;
            });
          }}
          examples={examples}
          activeLP={selectedLP}
        />
      </div>
    </div>
  );
}

export default App;
