export const pagination = (currentPage: number, resultsPerPage: number, totalItems: number) => {
    const lastPage = Math.ceil(totalItems / resultsPerPage);
    const previousPage = currentPage == 1 ? null : currentPage - 1;
    const nextPage = currentPage == lastPage ? null : currentPage + 1;
    
    return {
        previousPage,
        currentPage,
        nextPage,
        lastPage
    }
}