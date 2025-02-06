import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

// interface PaginationState {
//   meta: { total: number; page: number; limit: number; totalPages: number };
//   setCurrentPage: (page: number) => void;
//   setPaginationMeta: (total: number) => void;
// }

// export const usePaginationStore = create<PaginationState>()(
//   devtools(
//     persist(
//       (set) => ({
//         meta: { total: 0, page: 1, limit: 10, totalPages: 1 },
//         setMeta: (meta) => set({ meta: meta }),
//       }),
//       {
//         name: "pagination-store",
//       }
//     )
//   )
// );

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  setPaginationMeta: (total: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  pageSize: 9,
  totalItems: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setPaginationMeta: (total) => set({ totalItems: total }),
}));
