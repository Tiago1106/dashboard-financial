import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface CardInfoProps {
  value: string;
  title: string;
  isLoading: boolean;
}

export function CardInfo({ value, title, isLoading }: CardInfoProps) {
  return (
    <Card>
      <CardContent className="px-4">
        <p>{title}</p>
        <div className="text-xl font-semibold">{isLoading ? <Skeleton className="w-full h-7" /> : value}</div>
      </CardContent>
    </Card>
  );
}
