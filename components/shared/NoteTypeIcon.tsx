import { Phone, Mail, Users, CheckSquare, FileText } from "lucide-react";

type NoteType = "Call" | "Email" | "Meeting" | "Task" | "Other";

const config: Record<
  NoteType,
  { icon: React.ElementType; color: string; bg: string }
> = {
  Call: { icon: Phone, color: "text-blue-600", bg: "bg-blue-100" },
  Email: { icon: Mail, color: "text-purple-600", bg: "bg-purple-100" },
  Meeting: { icon: Users, color: "text-yellow-600", bg: "bg-yellow-100" },
  Task: { icon: CheckSquare, color: "text-green-600", bg: "bg-green-100" },
  Other: { icon: FileText, color: "text-gray-600", bg: "bg-gray-100" },
};

export default function NoteTypeIcon({ type }: { type: NoteType }) {
  const { icon: Icon, color, bg } = config[type];
  return (
    <div
      className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}
    >
      <Icon className={`w-4 h-4 ${color}`} />
    </div>
  );
}
