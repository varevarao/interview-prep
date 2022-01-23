import React, { useMemo } from 'react';

export type ExampleListProps = {
  onClickEdit?: (example: Example) => void;
  onDelete?: (example: Example) => void;

  examples: Example[];
  activeLP: LP[];
};

export function ExampleList({
  onClickEdit,
  onDelete,
  examples,
  activeLP,
}: ExampleListProps) {
  const mappedExamples = useMemo<(Example & { active: boolean })[]>(() => {
    const lpTitles = activeLP.map((lp) => lp.title);
    const mapped = examples.map<Example & { active: boolean }>((e) => ({
      ...e,
      active: e.lps.some((lp) => lpTitles.indexOf(lp.title) >= 0),
    }));
    return mapped.sort((a, b) =>
      a.active !== b.active ? (a.active ? -1 : 1) : 0,
    );
  }, [examples, activeLP]);
  return (
    <div className="flex flex-col gap-5">
      {/* <div className="flex flex-col gap-5"> */}
      {mappedExamples.map((ex, idx) => {
        const isActive = ex.lps.some(
          (lp) => activeLP.map((lp) => lp.title).indexOf(lp.title) >= 0,
        );
        return (
          <div key={`ex-${idx}`}>
            <ul
              className={`text-base border-2 border-dashed list-disc ${
                isActive ? 'border-gray-300' : 'border-gray-100'
              } p-1 ${isActive ? 'text-black' : 'text-gray-200'}`}
            >
              {ex.description
                .split('\n')
                .filter(Boolean)
                .map((l, lIdx) => (
                  <li key={`exl-${lIdx}`}>
                    <p>{l}</p>
                  </li>
                ))}
            </ul>
            {onClickEdit || onDelete ? (
              <div className="flex gap-4">
                {onClickEdit ? (
                  <button onClick={() => onClickEdit(ex)} className="text-xs">
                    Edit
                  </button>
                ) : null}
                {onDelete ? (
                  <button
                    onClick={() => onDelete(ex)}
                    className="text-xs text-red-400"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}

      {/* </div> */}
    </div>
  );
}
