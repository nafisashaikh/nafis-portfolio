import type { ProjectStatus } from "../../types";

const STATUS_DOT: Record<ProjectStatus, string> = {
  Completed: "bg-cyan",
  Prototype: "bg-accent",
  Research: "bg-muted",
  "In Progress": "bg-accent-soft",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full glass-soft px-2.5 py-1 font-mono text-xs tracking-wide text-dim">
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {status}
    </span>
  );
}
