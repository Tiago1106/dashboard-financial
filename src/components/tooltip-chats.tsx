import { TooltipProps } from "recharts";
import { format } from "date-fns";

export const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 border text-sm space-y-1">
        <p className="font-semibold text-gray-800">{format(new Date(label), 'MM/yyyy')}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between text-gray-600">
            <span className="capitalize">{entry.name}:</span>
            <span className="font-medium text-gray-800">
              {entry.value?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};