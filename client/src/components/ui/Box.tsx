import type { ReactNode } from "react";
import classes from "../../utils/classes";

export default function Box({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={classes.join(className, "p-4 bg-white flex flex-col")}>
      {children}
    </div>
  );
}
