export default class PageData<T> {
  data: T[];
  total: number;
  currentPage: number;
  numPerPage: number;

  constructor(data: T[], total: number, currentPage: number, numPerPage: number) {
    this.data = data;
    this.total = total;
    this.currentPage = currentPage;
    this.numPerPage = numPerPage;
  }
}
