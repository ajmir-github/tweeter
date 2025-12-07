import type { ReactNode } from "react";
import classes from "../../utils/classes";

export default function Container({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={classes.join(
        className,
        "rounded-xl border border-gray-300 overflow-clip flex flex-col gap-0.5"
      )}
    >
      {children}
    </div>
  );
}
