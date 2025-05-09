import { Card, CardContent } from "./ui/card";

interface CardInfoProps {
  value: string;
  title: string;
}

export function CardInfo({ value, title }: CardInfoProps) {
  return (
    <Card>
      <CardContent>
        <p>{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
