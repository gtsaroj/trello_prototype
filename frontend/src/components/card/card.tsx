/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  X,
  Calendar,
  MapPin,
  Tag,
  Users,
  Paperclip,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "../ui";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { toaster } from "@/utils";
import { uploadOnCloudinary } from "@/utils/cloudinaryStorage";
import { uploadTodo, uploadTodoList } from "@/services";
import { nanoid } from "@reduxjs/toolkit";
import { ApiError } from "@/helpers";

interface CreateCardProp {
  data: any;
  isOpen: boolean;
  close: () => void;
}

export function CreateCard({ close, data: propData, isOpen }: CreateCardProp) {
  const [addLabel, setAddLabel] = useState<boolean>(false);
  const [addLocation, setAddLocation] = useState<boolean>(false);
  const [addDate, setAddDate] = useState<boolean>(false);
  const [newLabel, setNewLabel] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [data, setData] = useState<any>({
    id: propData.id,
    title: propData.title,
    todoList: {
      ...propData.todoList,
      label: propData.todoList.label[0] || "",
      attachment: propData.todoList.attachment[0] || "",
      comment: propData.todoList.comment || "",
      location: propData.todoList.location || "",
      date: propData.todoList.date || "",
      createdAt: propData.todoList.createdAt || new Date().toISOString(),
      updatedAt: propData.todoList.updatedAt || new Date().toISOString(),
    },
  });

  const attachmentRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setData({
      ...propData,
      todoList: {
        ...propData.todoList,
        label: propData.todoList.label || "",
        attachment: propData.todoList.attachment || "",
        comment: propData.todoList.comment || "",
        location: propData.todoList.location || "",
        date: propData.todoList.date || "",
      },
    });
    setComment(propData.todoList.comment || "");
    setLocation(propData.todoList.location || "");
    setSelectedDate(propData.todoList.date || "");
  }, [propData]);

  async function handleImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      try {
        setLoading(true);
        const image = await uploadOnCloudinary(event.target.files[0]);
        if (!image) {
          toaster({
            message: "Failed to upload image",
            className: "bg-red-50",
            icon: "error",
          });
        } else {
          const currentAttachments = data.todoList.attachment || [];
          setData((prev: { todoList: any }) => ({
            ...prev,
            todoList: {
              ...prev.todoList,
              attachment: [...currentAttachments, image],
              updatedAt: new Date().toISOString(),
            },
          }));
          setEdit(true);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toaster({
          message: "Error uploading image",
          className: "bg-red-50",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  }

  const handleAddLabel = () => {
    if (newLabel.trim()) {
      const currentLabels = data.todoList.label || [];
      setData((prev: { todoList: any }) => ({
        ...prev,
        todoList: {
          ...prev.todoList,
          label: [...currentLabels, newLabel.trim()],
          updatedAt: new Date().toISOString(),
        },
      }));
      setNewLabel("");
      setEdit(true);
    }
    setAddLabel(false);
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    const updatedLabels = (data.todoList.label || []).filter(
      (label: string) => label !== labelToRemove
    );
    setData((prev: { todoList: any }) => ({
      ...prev,
      todoList: {
        ...prev.todoList,
        label: updatedLabels,
        updatedAt: new Date().toISOString(),
      },
    }));
    setEdit(true);
  };

  const handleRemoveAttachment = (attachmentToRemove: string) => {
    const updatedAttachments = (data.todoList.attachment || []).filter(
      (attachment: string) => attachment !== attachmentToRemove
    );
    setData((prev: { todoList: any }) => ({
      ...prev,
      todoList: {
        ...prev.todoList,
        attachment: updatedAttachments,
        updatedAt: new Date().toISOString(),
      },
    }));
    setEdit(true);
  };

  const handleAddLocation = () => {
    if (location.trim()) {
      setData((prev: { todoList: any }) => ({
        ...prev,
        todoList: {
          ...prev.todoList,
          location: location.trim(),
          updatedAt: new Date().toISOString(),
        },
      }));
      setEdit(true);
    }
    setAddLocation(false);
  };

  const handleAddDate = () => {
    if (selectedDate) {
      setData((prev: { todoList: any }) => ({
        ...prev,
        todoList: {
          ...prev.todoList,
          date: selectedDate,
          updatedAt: new Date().toISOString(),
        },
      }));
      setEdit(true);
    }
    setAddDate(false);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setData((prev: { todoList: any }) => ({
      ...prev,
      todoList: {
        ...prev.todoList,
        comment: e.target.value,
        updatedAt: new Date().toISOString(),
      },
    }));
    setEdit(true);
  };

  async function handleTodo() {
    setLoading(true);
    try {
      // Upload the todo first
      const response = await uploadTodo({
        id: data?.id,
        title: data?.title,
        // todoList: todoListWithId,
      });

      // Then upload the todoList
      await uploadTodoList(data?.todoList);

      toaster({
        className: "bg-green-50",
        icon: "success",
        message: response.message || "Todo created successfully",
        title: "Successfully created",
      });

      close();
    } catch (error) {
      if (error instanceof ApiError) {
        toaster({
          className: "bg-red-50",
          icon: "error",
          message: error.message,
          title: "Error",
        });
      } else {
        toaster({
          className: "bg-red-50",
          icon: "error",
          message: "An unexpected error occurred",
          title: "Error",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-[#22272B] rounded-md shadow-lg">
        <div className="p-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{data.title}</h3>
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
        <Button
          onClick={() => close()}
          variant="ghost"
          className="w-full justify-start p-3 hover:bg-[#333B44] text-[#9FADBC]"
        >
          <Plus className="h-4 w-4 mr-2" /> Add a card
        </Button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/15 bg-opacity-50 flex items-start justify-center pt-20 z-50">
          <div className="bg-[#1e1f21] text-gray-100 rounded-lg w-[768px] shadow-xl max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="p-4 relative">
              <button
                onClick={() => close()}
                className="absolute cursor-pointer right-4 top-4 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
              <h2 className="text-lg font-semibold pr-8">{data?.title}</h2>
              <div className="text-sm text-gray-400 mt-1">
                in list{" "}
                <span className="underline">SPRINT MEMBER'S TOPICS</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex w-full gap-6 p-4">
              <div className="flex-1 w-full">
                {/* Labels Section */}
                <div className="flex w-full gap-2 mb-4">
                  <div className="w-full flex flex-col items-start justify-start">
                    <h3 className="text-sm text-gray-400 mb-2">Labels</h3>
                    <div className="w-full flex flex-wrap items-center gap-2 justify-start mb-2">
                      {data.todoList.label && data.todoList.label.length > 0 ? (
                        data.todoList.label.map((label: any, index: number) => (
                          <div key={index} className="flex items-center gap-1">
                            <span className="px-3 py-1 bg-red-500 w-fit rounded text-sm">
                              {label}
                            </span>
                            <button
                              onClick={() => handleRemoveLabel(label)}
                              className="text-gray-400 hover:text-white"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">
                          No labels added
                        </span>
                      )}

                      {addLabel && (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            className="bg-[#2c2c30] px-2 text-sm py-1.5 w-[150px] rounded outline-none"
                            placeholder="Enter label"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleAddLabel();
                            }}
                          />
                          <button
                            onClick={handleAddLabel}
                            className="text-blue-400 text-sm hover:text-blue-300"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => setAddLabel(false)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Date Section */}
                    {data.todoList.date && (
                      <div className="mb-4">
                        <h3 className="text-sm text-gray-400 mb-2">Due Date</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-[#2c2c30] rounded text-sm">
                            {new Date(data.todoList.date).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedDate(data.todoList.date || "");
                              setAddDate(true);
                            }}
                            className="text-blue-400 text-xs hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setData((prev: any) => ({
                                ...prev,
                                todoList: {
                                  ...prev.todoList,
                                  date: "",
                                  updatedAt: new Date().toISOString(),
                                },
                              }));
                              setEdit(true);
                            }}
                            className="text-gray-400 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {addDate && (
                      <div className="mb-4">
                        <h3 className="text-sm text-gray-400 mb-2">
                          Select Due Date
                        </h3>
                        <div className="flex items-center gap-2">
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-[#2c2c30] px-2 text-sm py-1.5 rounded outline-none"
                          />
                          <button
                            onClick={handleAddDate}
                            className="text-blue-400 text-sm hover:text-blue-300"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setAddDate(false)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Location Section */}
                    {data.todoList.location && (
                      <div className="mb-4">
                        <h3 className="text-sm text-gray-400 mb-2">Location</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-[#2c2c30] rounded text-sm flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {data.todoList.location}
                          </span>
                          <button
                            onClick={() => {
                              setLocation(data.todoList.location || "");
                              setAddLocation(true);
                            }}
                            className="text-blue-400 text-xs hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setData((prev: any) => ({
                                ...prev,
                                todoList: {
                                  ...prev.todoList,
                                  location: "",
                                  updatedAt: new Date().toISOString(),
                                },
                              }));
                              setEdit(true);
                            }}
                            className="text-gray-400 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {addLocation && (
                      <div className="mb-4">
                        <h3 className="text-sm text-gray-400 mb-2">
                          Add Location
                        </h3>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="bg-[#2c2c30] px-2 text-sm py-1.5 w-[200px] rounded outline-none"
                            placeholder="Enter location"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleAddLocation();
                            }}
                          />
                          <button
                            onClick={handleAddLocation}
                            className="text-blue-400 text-sm hover:text-blue-300"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setAddLocation(false)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="w-full flex flex-col items-start justify-start gap-4">
                      {/* Description */}
                      <div className="mb-6 w-full">
                        <h3 className="text-sm text-gray-400 mb-2">
                          Description
                        </h3>
                        <textarea
                          value={data.todoList?.description}
                          onFocus={() => setEdit(true)}
                          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                            setData((prev: any) => ({
                              ...prev,
                              todoList: {
                                ...prev.todoList,
                                description: event.target.value,
                                updatedAt: new Date().toISOString(),
                              },
                            }))
                          }
                          className="bg-[#2c2c30] w-full rounded p-3 text-sm text-gray-100 h-[100px] outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Add a more detailed description..."
                        />
                      </div>

                      {/* Comment Section */}
                      <div className="mb-6 w-full">
                        <h3 className="text-sm text-gray-400 mb-2">Comment</h3>
                        <textarea
                          value={comment}
                          onChange={handleCommentChange}
                          className="bg-[#2c2c30] w-full rounded p-3 text-sm text-gray-100 h-[80px] outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Add a comment..."
                        />
                      </div>

                      {/* Attachments Section */}
                      <div className="w-full mb-4">
                        <h3 className="text-sm text-gray-400 mb-2">
                          Attachments
                        </h3>
                        <input
                          onChange={handleImage}
                          className="hidden"
                          ref={attachmentRef}
                          type="file"
                          accept="image/*"
                        />
                        <div className="flex flex-wrap items-start gap-3 mb-2">
                          {data.todoList?.attachment &&
                          data.todoList.attachment.length > 0 ? (
                            data.todoList.attachment.map(
                              (image: any, index: any) => (
                                <div key={index} className="relative group">
                                  <img
                                    className="w-20 h-20 object-cover rounded"
                                    loading="lazy"
                                    src={image || "/placeholder.svg"}
                                    alt={`attachment-${index}`}
                                  />
                                  <button
                                    onClick={() =>
                                      handleRemoveAttachment(image)
                                    }
                                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              )
                            )
                          ) : (
                            <span className="text-sm text-gray-400">
                              No attachments
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => attachmentRef.current?.click()}
                          className="mt-2 text-blue-400 text-sm hover:text-blue-300 flex items-center"
                        >
                          <Paperclip size={14} className="mr-1" />
                          Add attachment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex items-center justify-end">
                  <button
                    onClick={handleTodo}
                    disabled={!edit || loading}
                    className={`mt-4 py-2 px-4 ${
                      edit && !loading
                        ? "hover:bg-blue-600 bg-blue-500"
                        : "bg-gray-600 cursor-not-allowed"
                    } rounded-md flex items-center justify-center`}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-48">
                <div className="space-y-2">
                  <h4 className="text-xs text-gray-400">Add to card</h4>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2">
                    <Users size={16} />
                    Members
                  </button>
                  <button
                    onClick={() => setAddLabel(!addLabel)}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2"
                  >
                    <Tag size={16} />
                    Labels
                  </button>
                  <button
                    onClick={() => setAddLocation(!addLocation)}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2"
                  >
                    <MapPin size={16} />
                    Location
                  </button>
                  <button
                    onClick={() => setAddDate(!addDate)}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2"
                  >
                    <Calendar size={16} />
                    Dates
                  </button>
                  <button
                    onClick={() => attachmentRef.current?.click()}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-[#2c2c30] rounded flex items-center gap-2"
                  >
                    <Paperclip size={16} />
                    Attachment
                  </button>
                </div>

                {/* Card Info */}
                <div className="mt-6 space-y-2">
                  <h4 className="text-xs text-gray-400">Card Information</h4>
                  <div className="text-xs text-gray-400">
                    <p>
                      Created:{" "}
                      {data.todoList.createdAt
                        ? new Date(data.todoList.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                    <p>
                      Last Updated:{" "}
                      {data.todoList.updatedAt
                        ? new Date(data.todoList.updatedAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
