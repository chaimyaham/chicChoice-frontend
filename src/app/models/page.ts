export interface Page<T> {
    content: T[]; 
    pageable: {
      sort: any[];
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalElements: number; 
    totalPages: number; 
    last: boolean;
    size: number; 
    number: number;
    sort: any[];
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  }