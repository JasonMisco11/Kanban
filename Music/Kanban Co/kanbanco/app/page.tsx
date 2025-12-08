import { DraggableCardBody } from "@/components/ui/draggable-card";
import KanbanBoard, { CardDemo } from "@/components/ui/EntryCard";
import Image from "next/image";


export default function Home() {
  return (
    
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="mt-[-90] text-2xl font-bold text-gray-900 dark:text-white"> Kanban Board </h1>
        <div className="flex-1">
        <KanbanBoard />
      </div>
      
      
      
        
      </main>
          )
};
