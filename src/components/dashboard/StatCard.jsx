import Card from "@/components/ui/Card";

export default function StatCard({ label, value, hint }) {
  return (
    <Card className="p-3">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-heading text-2xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </Card>
  );
}