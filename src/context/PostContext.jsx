import { createContext, useState } from "react";
export const postContext = createContext();
export default function PostProvider({ children }) {
  const [editingPost, setEditingPost] = useState(null);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  return (
    <postContext.Provider
      value={{
        editingPost,
        setEditingPost,
        isPostFormOpen,
        setIsPostFormOpen,
      }}
    >
      {children}
    </postContext.Provider>
  );
}
