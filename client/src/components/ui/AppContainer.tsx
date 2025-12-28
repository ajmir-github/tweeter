import type { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-900 text-slate-200 h-dvh w-full overflow-hidden">
      {children}
    </div>
  );
}
