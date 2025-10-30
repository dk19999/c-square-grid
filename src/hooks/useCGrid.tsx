import { useCallback, useEffect, useState, useRef } from "react";

function buildC(n: number): string[][] {
  if (!Number.isInteger(n) || n <= 0) return [];
  const end = Math.floor((n - 1) / 2);
  const neck = n - end * 2;
  const cells = [Array(end).fill("red")];
  for (let i = 0; i < neck; i++) {
    cells.push(["red"]);
  }
  cells.push(Array(end).fill("red"));
  return cells;
}

export function useCGrid(n: number) {
  const [cells, setCells] = useState<string[][]>([]);
  const [inTransition, setInTransition] = useState(false);
  const [order, setOrder] = useState<{ ci: number; ri: number }[]>([]);

  const timeoutRefs = useRef<number[]>([]);
  const resetDelay = 1000;
  const animationDelay = 1000;

  const areAllCellsColor = useCallback(
    (color: string) => {
      return cells.every((row) => {
        return row.every((cell) => {
          return cell === color;
        });
      });
    },
    [cells]
  );

  useEffect(() => {
    if (!areAllCellsColor("green")) {
      return;
    }

    const startTimeout = setTimeout(() => {
      const reversedHistory = [...order].reverse();

      reversedHistory.forEach((pos, index) => {
        const timeout = setTimeout(() => {
          updateCell(pos.ri, pos.ci, "red");

          if (index === order.length - 1) {
            const finalTimeout = setTimeout(() => {
              setOrder([]);
              setInTransition(false);
            }, animationDelay);
            timeoutRefs.current.push(finalTimeout);
          }
        }, index * animationDelay);

        timeoutRefs.current.push(timeout);
      });
    }, resetDelay);

    timeoutRefs.current.push(startTimeout);
  }, [cells]);

  const updateCell = (rowIndex: number, columnIndex: number, color: string) => {
    setCells((cells) =>
      cells.map((row, ri) =>
        row.map((cell, ci) => {
          if (ri === rowIndex && ci === columnIndex && cell !== color) {
            setOrder((order) => [...order, { ri, ci }]);
            return color;
          }
          return cell;
        })
      )
    );
  };

  const handleClick = (rowIndex: number, columnIndex: number) => {
    if (!inTransition) updateCell(rowIndex, columnIndex, "green");
  };

  useEffect(() => {
    setCells(buildC(n));
  }, [n]);

  return [cells, handleClick, inTransition] as const;
}
