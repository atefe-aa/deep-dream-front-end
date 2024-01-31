import {Dispatch, SetStateAction} from 'react'

export type ID = undefined | null | number

export type PaginationState = {
  page: number
  per_page: 10 | 30 | 50 | 100
  links?: Array<{label: string; active: boolean; url: string | null; page: number | null}>
}

export type SortState = {
  sort?: string
  order?: 'asc' | 'desc'
}

export type FilterState = {
  filter?: unknown
}

export type SearchState = {
  search?: string
}

export type Response<T> = {
  data?: T
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState
  }
}
export type QueryState = PaginationState & SortState & FilterState & SearchState

export const initialQueryState: QueryState = {
  page: 1,
  per_page: 10,
}
export const initialEntityQueryState: EntityQueryState = {
  patients: initialQueryState,
  counsellors: initialQueryState,
  laboratories: initialQueryState,
  testTypes: initialQueryState,
  // Initialize other entities similarly
};
export const initialQueryRequest: QueryRequestContextProps = {
  state: initialEntityQueryState,
  updateState: () => {},
};

export type EntityQueryState = {
  patients: QueryState;
  counsellors: QueryState;
  laboratories: QueryState;
  testTypes: QueryState;
  // Add more entities as needed
};
export type QueryRequestContextProps = {
  state: EntityQueryState;
  updateState: (entity: keyof EntityQueryState, updates: Partial<QueryState>) => void;
};



// export const initialQueryRequest: QueryRequestContextProps = {
//   state: initialEntityQueryState,
//   updateState: () => {},
// };


// export type QueryRequestContextProps = {
//   state: QueryState
//   updateState: (updates: Partial<QueryState>) => void
// }



export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined
  refetch: () => void
  isLoading: boolean
  query: string
}

export const initialQueryResponse = {refetch: () => {}, isLoading: false, query: ''}

export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: ID
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>
  isAllSelected: boolean
  disabled: boolean
}

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => {},
  onSelectAll: () => {},
  clearSelected: () => {},
  setItemIdForUpdate: () => {},
  isAllSelected: false,
  disabled: false,
}
