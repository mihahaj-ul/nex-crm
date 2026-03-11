"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { deals as initialDeals, stages, Deal } from "@/lib/data";
import DealCard from "@/components/shared/DealCard";

// Stage colors
const stageColors: Record<string, string> = {
  Lead: "bg-gray-100 text-gray-700 border-gray-200",
  Contacted: "bg-blue-100 text-blue-700 border-blue-200",
  Interested: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Proposal: "bg-purple-100 text-purple-700 border-purple-200",
  Won: "bg-green-100 text-green-700 border-green-200",
};

const stageBorder: Record<string, string> = {
  Lead: "border-t-gray-400",
  Contacted: "border-t-blue-400",
  Interested: "border-t-yellow-400",
  Proposal: "border-t-purple-400",
  Won: "border-t-green-400",
};

// Column component
function Column({ stage, deals }: { stage: string; deals: Deal[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div
      className={`flex flex-col flex-1 min-w-50 max-w-70
      bg-muted/40 rounded-xl border-t-4 ${stageBorder[stage]} border border-border`}
    >
      {/* Column Header */}
      <div className="px-3 pt-3 pb-2 border-b border-border">
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full 
            ${stageColors[stage]}`}
          >
            {stage}
          </span>
          <span
            className="text-xs font-semibold text-muted-foreground bg-background 
            border rounded-full w-5 h-5 flex items-center justify-center"
          >
            {deals.length}
          </span>
        </div>
      </div>

      {/* Scrollable Cards Area */}
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 p-2 overflow-y-auto flex-1
          ${isOver ? "bg-primary/5" : ""} transition-colors`}
        style={{ height: "calc(100vh - 320px)" }}
      >
        <SortableContext
          items={deals.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          {deals.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-xs text-muted-foreground">Drop here</p>
            </div>
          ) : (
            deals.map((deal) => <DealCard key={deal.id} deal={deal} />)
          )}
        </SortableContext>
      </div>
    </div>
  );
}

// Main Pipeline Page
export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  // Get active deal for drag overlay
  const activeDeal = deals.find((d) => d.id === activeId) ?? null;

  // Calculate stats per stage
  const getStageStats = (stage: string) => {
    const stageDeals = deals.filter((d) => d.stage === stage);
    const total = stageDeals.reduce(
      (sum, d) => sum + parseInt(d.value.replace(/[$,]/g, "")),
      0,
    );
    return { count: stageDeals.length, total };
  };

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeDeal = deals.find((d) => d.id === activeId);
    if (!activeDeal) return;

    // If dragging over a stage column
    if (stages.includes(overId as string)) {
      if (activeDeal.stage !== overId) {
        setDeals(
          deals.map((d) =>
            d.id === activeId ? { ...d, stage: overId as string } : d,
          ),
        );
      }
    }

    // If dragging over another card
    const overDeal = deals.find((d) => d.id === overId);
    if (overDeal && overDeal.stage !== activeDeal.stage) {
      setDeals(
        deals.map((d) =>
          d.id === activeId ? { ...d, stage: overDeal.stage } : d,
        ),
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeDeal = deals.find((d) => d.id === activeId);
    if (!activeDeal) return;

    if (stages.includes(overId as string)) {
      setDeals(
        deals.map((d) =>
          d.id === activeId ? { ...d, stage: overId as string } : d,
        ),
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">Pipeline</h1>
        <p className="text-muted-foreground text-sm">
          Track and manage your deals across stages
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-3 max-w-[1450]">
        {stages.map((stage) => {
          const { count, total } = getStageStats(stage);
          return (
            <div
              key={stage}
              className={`bg-background border rounded-lg p-3 
                border-t-4 ${stageBorder[stage]}`}
            >
              <p className="text-xs text-muted-foreground font-medium">
                {stage}
              </p>
              <p className="text-2xl font-bold mt-1">{count}</p>
              <p className="text-xs text-green-600 font-medium mt-1">
                ${total.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto pb-2">
          {stages.map((stage) => (
            <Column
              key={stage}
              stage={stage}
              deals={deals.filter((d) => d.stage === stage)}
            />
          ))}
        </div>

        {/* Drag Overlay — shows a floating card while dragging */}
        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: { active: { opacity: "0.5" } },
            }),
          }}
        >
          {activeDeal ? (
            <div className="rotate-2 scale-105">
              <DealCard deal={activeDeal} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
