import type { ReactNode } from "react";

export default function ({
  children,
  actions,
  lebal,
}: {
  lebal?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-0.5 overflow-clip rounded-xl">
      {lebal && <div className="bg-slate-800 p-2 sm:p-4">{lebal}</div>}
      <div className="bg-slate-800  p-2 sm:p-4">{children}</div>
      {actions && <div className="  bg-slate-800 p-2 sm:p-4">{actions}</div>}
    </div>
  );
}
