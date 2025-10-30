export type Color = "red" | "green";

const COLOR_CLASS: Record<Color, string> = {
  red: "cell--red",
  green: "cell--green",
};

export function Cell({
  color,
  handleClick,
}: {
  color: Color;
  handleClick: () => void;
}) {
  const classes = ["cell", COLOR_CLASS[color]].filter(Boolean).join(" ");

  return <button onClick={handleClick} className={classes}></button>;
}
