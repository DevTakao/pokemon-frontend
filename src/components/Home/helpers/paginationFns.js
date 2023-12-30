export const goPrev = ({ set }) => {
  set((prev) => ({ ...prev, pageNo: prev.pageNo - 1 }))
}

export const goNext = ({ set }) => {
  set((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }))
}

export const goToPage = ({ set, pageNo }) => {
  set((prev) => ({ ...prev, pageNo: pageNo }))
}
