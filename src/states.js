import create from 'zustand';

const useStore = create(set => ({
    agencyId: 456,
    setAgencyId: (input) => set((state) => ({agencyId:input})),
    year: 2020,
    setYear: (input) => set((state) => ({year:input})),
  }))

  export default useStore;