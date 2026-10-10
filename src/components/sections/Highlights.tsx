import { resumeData } from "../../data/resumeData";
import Reveal from "../ui/Reveal";

export default function Highlights() {
  const { highlights } = resumeData;

  return (
    <div className="mx-auto max-w-6xl px-6">
      <Reveal>
        <div className="glass rounded-3xl p-8 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {highlights.map((h, i) => (
              <div
                key={h.label}
                className={`flex flex-col gap-1.5 lg:px-8 ${i > 0 ? "lg:border-l lg:border-[color:var(--color-line)]" : ""}`}
              >
                <span className="font-mono text-3xl font-semibold tracking-tight text-ink sm:text-[2.5rem]">
                  {h.value}
                </span>
                <span className="mt-1 text-sm font-medium text-ink/90">{h.label}</span>
                {h.note && <span className="text-xs leading-relaxed text-muted">{h.note}</span>}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
