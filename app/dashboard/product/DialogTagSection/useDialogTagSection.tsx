"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { Tag } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductInputType, TagInputType } from "@/types/product";

type TagContextType = {
  tags?: Tag[];
  isLoading: boolean;

  // creation state
  newTagName: TagInputType;
  setNewTagName: (data: TagInputType) => void;
  handleCreateTag: () => Promise<Tag | undefined>;

  deleteTag: (id: string) => Promise<Tag | undefined>;
};

const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const [newTagName, setNewTagName] = useState<TagInputType>({
    name: "",
  });

  const { data: tags, isLoading } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axios.get("/api/tags");
      if (res.status !== 200) {
        throw new Error("Failed to fetch tags");
      }
      return res.data;
    },
  });

  const { mutateAsync: createTag } = useMutation<Tag, Error, TagInputType>({
    mutationFn: async (data) => {
      const res = await axios.post("/api/tags", data);
      if (res.status !== 200) {
        throw new Error("Failed to create tag");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  const { mutateAsync: deleteTag } = useMutation<Tag, Error, string>({
    mutationFn: async (id) => {
      const res = await axios.delete(`/api/tags/${id}`);
      if (res.status !== 200) {
        throw new Error("Failed to delete tag");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  const handleCreateTag = async () => {
    if (!newTagName.name.trim()) return;

    const created = await createTag(newTagName);

    if (created) {
      setNewTagName({ name: "" });
      return created;
    }
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        isLoading,
        newTagName,
        setNewTagName,
        handleCreateTag,
        deleteTag,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export const useTag = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTag must be used inside TagProvider");
  }
  return context;
};
