"use client";

import { useState } from "react";
import {
  Trello,
  Search,
  HelpCircle,
  Bell,
  Plus,
  LayoutGrid,
  Filter,
  Share2,
  MoreHorizontal,
  Calendar,
  Table,
  User,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CreateCard } from "@/components";

type CardType = {
  id: string;
  title: string;
  column: string;
  items?: number;
  labels?: string[];
  dueDate?: string;
  assignee?: string;
};

export function WorkSpace() {
  const [openBoard, setOpenBoard] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("Info");

  // Sample data for a new card
  const newCardData = {
    id: "new-card-" + Date.now(),
    title: "New Card",
    todoList: {
      id: "todolist-" + Date.now(),
      title: "Task",
      description: "Add a description for this task",
      label: [],
      attachment: [],
      comment: "",
      location: "",
      date: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  const handleAddCard = (columnTitle: string) => {
    setSelectedColumn(columnTitle);
    setOpenBoard(true);
  };

  return (
    <div className="min-h-screen bg-[#1D2125] text-white">
      {/* Top Navigation */}
      <nav className="bg-[#1D2125] border-b border-[#333B44] px-4 h-[44px] flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-[#333B44]"
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#282E33] border-[#333B44] text-white">
              <DropdownMenuItem className="hover:bg-[#333B44]">
                <Trello className="mr-2 h-4 w-4" /> Trello
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#333B44]">
                <Calendar className="mr-2 h-4 w-4" /> Calendar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center space-x-2">
            <Trello className="h-5 w-5 text-[#579DFF]" />
            <span className="font-semibold">Trello Workspace</span>
            <span className="text-xs bg-[#333B44] px-2 py-1 rounded">
              Premium
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9FADBC]" />
            <Input
              placeholder="Search"
              className="pl-8 bg-[#22272B] border-[#333B44] w-64 h-8 focus:ring-[#579DFF]"
            />
          </div>

          <Button variant="ghost" size="icon" className="hover:bg-[#333B44]">
            <Bell className="h-5 w-5" />
          </Button>

          <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
            14 days left
          </span>

          <Button variant="ghost" size="icon" className="hover:bg-[#333B44]">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="hover:bg-[#333B44] h-8">
              <Filter className="h-4 w-4 mr-1" /> Filters
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="hover:bg-[#333B44] h-8">
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#282E33] border-[#333B44] text-white">
                <DialogHeader>
                  <DialogTitle>Share board</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="Email address or name"
                    className="bg-[#22272B] border-[#333B44]"
                  />
                  <Button className="w-full bg-[#579DFF] hover:bg-[#4C8FE9]">
                    Share
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon" className="hover:bg-[#333B44]">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[240px] bg-[#1D2125] p-4 border-r border-[#333B44]">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-[#333B44]"
            >
              <LayoutGrid className="mr-2 h-4 w-4" /> Boards
            </Button>

            <div className="pt-4 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#9FADBC]">
                  Workspace views
                </span>
                <span className="text-xs bg-[#6E5DC6] px-2 py-0.5 rounded">
                  PREMIUM
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#333B44] text-sm"
                >
                  <Table className="mr-2 h-4 w-4" /> Table
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#333B44] text-sm"
                >
                  <Calendar className="mr-2 h-4 w-4" /> Calendar
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <span className="text-sm font-medium text-[#9FADBC]">
                Your boards
              </span>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#333B44] bg-[#282E33]"
                >
                  <div className="w-4 h-4 rounded bg-red-400 mr-2" />
                  1-on-1 Meeting Agenda
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#333B44]"
                >
                  <div className="w-4 h-4 rounded bg-pink-400 mr-2" />
                  My first trello
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Board Area */}
        <KanbanBoard onAddCard={handleAddCard} />
      </div>

      {openBoard && (
        <CreateCard
          close={() => setOpenBoard(false)}
          data={{
            ...newCardData,
            title: `New ${selectedColumn} Card`,
            todoList: {
              ...newCardData.todoList,
              title: selectedColumn,
            },
          }}
          isOpen={openBoard}
        />
      )}
    </div>
  );
}

function KanbanBoard({ onAddCard }: { onAddCard?: (column: string) => void }) {
  const [cards, setCards] = useState<CardType[]>([
    { id: "1", title: "How to use this board", column: "Info", items: 1 },
    {
      id: "2",
      title: "Quarterly performance review",
      column: "Manager's Topics",
      dueDate: "Apr 15",
    },
    {
      id: "3",
      title: "Project timeline updates",
      column: "Manager's Topics",
      items: 3,
      labels: ["urgent"],
    },
    {
      id: "4",
      title: "Team building activities",
      column: "Discussion",
      assignee: "Alex",
    },
    {
      id: "5",
      title: "New client onboarding process",
      column: "Discussion",
      items: 2,
      labels: ["process"],
    },
    {
      id: "6",
      title: "Improve documentation",
      column: "Goals",
      dueDate: "May 1",
    },
    {
      id: "7",
      title: "Learn new framework",
      column: "Goals",
      items: 4,
      labels: ["personal"],
    },
  ]);

  const handleAddCard = (column: string) => {
    const newCard = {
      id: Date.now().toString(),
      title: `New card in ${column}`,
      column,
    };
    setCards([...cards, newCard]);

    // If external handler is provided, call it too
    if (onAddCard) {
      onAddCard(column);
    }
  };

  const getColumnCards = (column: string) => {
    return cards.filter((card) => card.column === column);
  };

  const renderCard = (card: CardType) => (
    <Card
      key={card.id}
      className="m-2 bg-[#282E33] border-[#333B44] hover:bg-[#2C343A] transition-colors"
    >
      <div className="p-3">
        {card.labels && card.labels.length > 0 && (
          <div className="flex gap-1 mb-2">
            {card.labels.map((label) => (
              <span
                key={label}
                className={`px-2 py-0.5 text-xs rounded ${
                  label === "urgent"
                    ? "bg-red-900 text-red-100"
                    : label === "process"
                    ? "bg-blue-900 text-blue-100"
                    : "bg-green-900 text-green-100"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        )}
        <h4 className="font-medium mb-2">{card.title}</h4>
        <div className="flex items-center justify-between text-sm text-[#9FADBC]">
          <div className="flex items-center">
            {card.items !== undefined && (
              <div className="flex items-center mr-3">
                <CheckSquare className="h-4 w-4 mr-1" />
                <span>{card.items}</span>
              </div>
            )}
            {card.dueDate && (
              <div className="flex items-center mr-3">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{card.dueDate}</span>
              </div>
            )}
          </div>
          {card.assignee && (
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-[#333B44] flex items-center justify-center">
                <User className="h-3 w-3" />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex-1 p-4 bg-[#1D2125] text-white">
      <div className="grid grid-cols-4 gap-4">
        {/* Info Column */}
        <div className="space-y-4">
          <div className="bg-[#22272B] rounded-md">
            <div className="p-3 flex items-center justify-between">
              <h3 className="font-medium">Info</h3>
              <div className="flex items-center space-x-1">
                <Button
                  onClick={() => handleAddCard("Info")}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-[#333B44]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-[#333B44]"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {getColumnCards("Info").map(renderCard)}
            <Button
              onClick={() => handleAddCard("Info")}
              variant="ghost"
              className="w-full justify-start p-3 hover:bg-[#333B44] text-[#9FADBC]"
            >
              <Plus className="h-4 w-4 mr-2" /> Add a card
            </Button>
          </div>
        </div>

        {/* Other Columns */}
        {["Manager's Topics", "Discussion", "Goals"].map((title) => (
          <div key={title} className="space-y-4">
            <div className="bg-[#22272B] rounded-md">
              <div className="p-3 flex items-center justify-between">
                <h3 className="font-medium">{title}</h3>
                <div className="flex items-center space-x-1">
                  <Button
                    onClick={() => handleAddCard(title)}
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-[#333B44]"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-[#333B44]"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {getColumnCards(title).map(renderCard)}
              <Button
                onClick={() => handleAddCard(title)}
                variant="ghost"
                className="w-full justify-start p-3 hover:bg-[#333B44] text-[#9FADBC]"
              >
                <Plus className="h-4 w-4 mr-2" /> Add a card
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
