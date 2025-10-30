import { useCGrid } from "../hooks/useCGrid";
import { Cell, type Color } from "./cell";

export function CGrid({
  n,
  animationDelay,
}: {
  n: number;
  animationDelay: number;
}) {
  const [cells, handleClick] = useCGrid(n, animationDelay);

  return (
    <div className="grid">
      {cells.map((row, ri) => (
        <div key={ri} className="row">
          {row.map((color, ci) => (
            <Cell
              key={`${ri}-${ci}`}
              color={color as Color}
              handleClick={() => {
                handleClick(ri, ci);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
