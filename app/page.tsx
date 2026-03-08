import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">NexCRM is working! 🎉</h1>
      <Button>Click Me</Button>
    </div>
  );
}
