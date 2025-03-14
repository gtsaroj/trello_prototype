import React, { useState } from "react";
import {
  X,
  Calendar,
  MapPin,
  Tag,
  Users,
  Paperclip,
  ChevronRight,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "../ui";

interface CardProps {
  title: string;
  labels: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export function CreateCard({ title, labels }: CardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <div className="bg-[#22272B] rounded-md">
        <div className="p-3 flex items-center justify-between">
          <h3 className="">{title}</h3>
          <div className="flex items-center space-x-1">
            <Button
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
        <Button onClick={()=> setIsOpen(!isOpen)}
          variant="ghost"
          className="w-full justify-start p-3 hover:bg-[#333B44] text-[#9FADBC]"
        >
          <Plus className="h-4 w-4 mr-2" /> Add a card
        </Button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20">
          <div className="bg-[#1e1f21] text-gray-100 rounded-lg w-[768px] shadow-xl">
            {/* Header */}
            <div className="p-4 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
              <h2 className="text-lg  pr-8">{title}</h2>
              <div className="text-sm text-gray-400 mt-1">
                in list{" "}
                <span className="underline">SPRINT MEMBER'S TOPICS</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex gap-6 p-4">
              {/* Main Content */}
              <div className="flex-1">
                {/* Labels Section */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    {labels.map((label) => (
                      <span
                        key={label.id}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: label.color }}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-sm  mb-2 flex items-center gap-2">
                    <span className="text-gray-400">Description</span>
                  </h3>
                  <div className="bg-[#2c2c30] rounded p-3 text-sm text-gray-400 cursor-pointer hover:bg-[#3c3c40]">
                    Add a more detailed description...
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <h3 className="text-sm  mb-2 flex items-center gap-2">
                    <span className="text-gray-400">Activity</span>
                    <button className="text-blue-400 text-xs">
                      Show details
                    </button>
                  </h3>
                  <div className="bg-[#2c2c30] rounded p-3 text-sm text-gray-400">
                    Write a comment...
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-48">
                <div className="space-y-2">
                  {/* Add to card section */}
                  <h4 className="text-xs text-gray-400 ">
                    Add to card
                  </h4>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2">
                    <Users size={16} />
                    Members
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2">
                    <Tag size={16} />
                    Labels
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2">
                    <Calendar size={16} />
                    Dates
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2">
                    <Paperclip size={16} />
                    Attachment
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2">
                    <MapPin size={16} />
                    Location
                  </button>

                  {/* Actions section */}
                  <h4 className="text-xs text-gray-400  pt-4">
                    Actions
                  </h4>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2">
                    <ChevronRight size={16} />
                    Move
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2">
                    <ChevronRight size={16} />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
