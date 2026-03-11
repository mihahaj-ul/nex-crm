import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, DollarSign, User } from "lucide-react";
import { Deal } from "@/lib/data";

export default function DealCard({ deal }: { deal: Deal }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-background border rounded-lg p-3 flex flex-col gap-2 shadow-sm
        ${isDragging ? "opacity-50 shadow-lg scale-105" : ""}`}
    >
      {/* Drag Handle + Deal Name */}
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <p className="text-sm font-semibold">{deal.name}</p>
      </div>

      {/* Contact */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <User className="w-3 h-3" />
        {deal.contact}
      </div>

      {/* Value */}
      <div className="flex items-center gap-1 text-xs font-medium text-green-600">
        <DollarSign className="w-3 h-3" />
        {deal.value}
      </div>
    </div>
  );
}
