"use client";

import { useState } from "react";
import { notes as initialNotes, contacts, noteTypes, Note } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NoteTypeIcon from "@/components/shared/NoteTypeIcon";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [filterType, setFilterType] = useState("All");
  const [filterContact, setFilterContact] = useState("All");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({
    contactId: "",
    contactName: "",
    type: "Call",
    content: "",
  });

  // Filter notes
  const filtered = notes.filter((n) => {
    const matchType = filterType === "All" || n.type === filterType;
    const matchContact =
      filterContact === "All" || n.contactName === filterContact;
    return matchType && matchContact;
  });

  // Add note
  const handleAddNote = () => {
    if (!form.content.trim() || !form.contactId) return;
    const newNote: Note = {
      id: notes.length + 1,
      contactId: parseInt(form.contactId),
      contactName: form.contactName,
      type: form.type as Note["type"],
      content: form.content,
      date: "Today",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setNotes([newNote, ...notes]);
    setForm({ contactId: "", contactName: "", type: "Call", content: "" });
  };

  // Delete note
  const handleConfirmDelete = () => {
    setNotes(notes.filter((n) => n.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">Notes & Activity</h1>
        <p className="text-muted-foreground text-sm">
          Log calls, emails, meetings and tasks
        </p>
      </div>

      {/* Add Note Form */}
      <div className="bg-background border rounded-xl p-5 flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Add New Note</h2>

        <div className="flex gap-3">
          {/* Contact selector */}
          <Select
            value={form.contactId}
            onValueChange={(value) => {
              const contact = contacts.find((c) => c.id === parseInt(value));
              setForm({
                ...form,
                contactId: value,
                contactName: contact?.name ?? "",
              });
            }}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Select contact" />
            </SelectTrigger>
            <SelectContent>
              {contacts.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Note type selector */}
          <Select
            value={form.type}
            onValueChange={(value) => setForm({ ...form, type: value })}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Note type" />
            </SelectTrigger>
            <SelectContent>
              {noteTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Text area */}
        <Textarea
          placeholder="Write your note here..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="resize-none"
          rows={3}
        />

        <Button
          onClick={handleAddNote}
          disabled={!form.content.trim() || !form.contactId}
          className="self-end"
        >
          Add Note
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {/* Filter by type */}
        <div className="flex gap-2">
          {["All", ...noteTypes].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors
                ${
                  filterType === type
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Filter by contact */}
        <Select value={filterContact} onValueChange={setFilterContact}>
          <SelectTrigger className="w-48 h-8 text-xs">
            <SelectValue placeholder="Filter by contact" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Contacts</SelectItem>
            {contacts.map((c) => (
              <SelectItem key={c.id} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notes count */}
      <p className="text-xs text-muted-foreground -mt-3">
        Showing {filtered.length} {filtered.length === 1 ? "note" : "notes"}
      </p>

      {/* Notes Timeline */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="bg-background border rounded-xl p-10 text-center">
            <p className="text-muted-foreground text-sm">No notes found</p>
          </div>
        ) : (
          filtered.map((note, index) => (
            <div
              key={note.id}
              className="flex gap-4 bg-background border rounded-xl p-4 
                hover:shadow-sm transition-shadow"
            >
              {/* Icon */}
              <NoteTypeIcon type={note.type} />

              {/* Content */}
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {note.contactName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      — {note.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {note.date} at {note.time}
                    </span>
                    <button
                      onClick={() => setDeleteId(note.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {note.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this note from{" "}
              <span className="font-semibold text-foreground">
                {notes.find((n) => n.id === deleteId)?.contactName}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
