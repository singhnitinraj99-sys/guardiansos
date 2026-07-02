import { Progress } from "@/components/ui/progress";

interface Props {
  count: number;
  max: number;
}

export default function ContactStats({ count, max }: Props) {
  const percentage = Math.min(100, Math.max(0, (count / max) * 100));

  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Emergency Contact Usage</p>
          <p className="text-2xl font-semibold">{count}/{max}</p>
        </div>
        <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {count === max ? "Limit reached" : `${max - count} slots left`}
        </div>
      </div>

      <div className="mt-3">
        <Progress value={percentage} aria-label="Contact usage progress" />
      </div>
    </div>
  );
}
