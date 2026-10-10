import { useState, type FormEvent, type ReactNode, type ChangeEvent } from "react";
import { Mail, Linkedin, Github, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import { resumeData } from "../../data/resumeData";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { basics } = resumeData;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) next.message = "A little more detail helps (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${basics.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const links = [
    { icon: Mail, label: "Email", value: basics.email, href: `mailto:${basics.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "in/nafisshaikh", href: basics.linkedin },
    { icon: Github, label: "GitHub", value: "nafisashaikh", href: basics.github },
  ];

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading title="Have a problem worth solving? Let's talk." />
          <Reveal>
            <p className="mt-6 max-w-md leading-relaxed text-dim">{basics.lookingFor}</p>
          </Reveal>
          <Reveal className="mt-8 grid gap-3">
            {links.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-xl glass-soft px-4 py-3.5 transition-colors hover:bg-white/[0.06]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.04] text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="flex-1">
                  <span className="block text-xs text-muted">{label}</span>
                  <span className="block text-sm text-ink">{value}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="rounded-2xl glass p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-start gap-4 py-6 text-left">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-display text-ink">Your email app is opening</h3>
                <p className="text-dim">
                  I've pre-filled a message to {basics.email}. If nothing opened, email me directly.
                </p>
                <button
                  type="button"
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-1 rounded-xl glass-soft px-4 py-2.5 text-sm text-ink transition-colors hover:bg-white/[0.06]"
                >
                  Write another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name}>
                    <input value={form.name} onChange={set("name")} aria-invalid={!!errors.name}
                      className="field" placeholder="Your name" autoComplete="name" />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input value={form.email} onChange={set("email")} aria-invalid={!!errors.email}
                      className="field" placeholder="you@company.com" type="email" autoComplete="email" />
                  </Field>
                </div>
                <Field label="Message" error={errors.message}>
                  <textarea value={form.message} onChange={set("message")} aria-invalid={!!errors.message}
                    rows={5} className="field resize-none" placeholder="What would you like to build or discuss?" />
                </Field>
                <button type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-[#06080f] transition-colors hover:bg-accent-soft">
                  <Send className="h-4 w-4" /> Send message
                </button>
                <p className="text-xs text-muted">Opens your email app with the message ready to send.</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-dim">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-danger" role="alert">{error}</span>}
    </label>
  );
}
