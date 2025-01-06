export interface Limitation {
  currentData: number;
  totalData: number;
}

export const initLimitation: Limitation = {
  currentData: 0,
  totalData: 0,
};

export interface Pagination {
  currentPage: number;
  totalPage: number;
  currentData: number;
  totalData: number;
}

export const initPagination: Pagination = {
  currentPage: 1,
  totalPage: 1,
  currentData: 0,
  totalData: 0,
};
