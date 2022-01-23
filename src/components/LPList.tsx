import React from 'react';

export type LPListProps = {
  onClickEdit?: (lp: LP) => void;
  onDelete?: (lp: LP) => void;

  lps: LP[];
  activeLP: LP[];
  setActiveLP: (lp: LP[]) => void;
};
export function LPList({
  onClickEdit,
  onDelete,

  lps,
  activeLP,
  setActiveLP,
}: LPListProps) {
  return (
    <ul className="">
      {lps.map((lp, idx) => {
        const isActive = activeLP.map((l) => l.title).indexOf(lp.title) >= 0;
        const onChange = (checked: boolean) => {
          if (isActive && !checked) {
            // No longer checked
            setActiveLP(activeLP.filter((l) => l.title !== lp.title));
          } else if (!isActive && checked) {
            // Newly checked
            setActiveLP([...activeLP, lp]);
          }
        };

        return (
          <li
            key={`lp-${idx}`}
            className="flex items-center justify-between my-2 pr-5"
          >
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onChange(!isActive)}
            >
              <input type="checkbox" checked={isActive} />
              <p>{lp.title}</p>
            </div>
            {onClickEdit || onDelete ? (
              <div className="flex gap-4">
                {onClickEdit ? (
                  <button onClick={() => onClickEdit(lp)} className="text-xs">
                    Edit
                  </button>
                ) : null}
                {onDelete ? (
                  <button
                    onClick={() => onDelete(lp)}
                    className="text-xs text-red-400"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
