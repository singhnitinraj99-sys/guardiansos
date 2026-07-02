import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-40 rounded-xl"
                />
            ))}
        </div>
    );
}