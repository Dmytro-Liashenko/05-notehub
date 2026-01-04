import ReactPaginate from "react-paginate";
import css from "../Pagination/Pagination.module.css";


interface PaginateProps{
    currentPage: number;
    totalPage: number;
    onPageChange: (selectedPage: number) => void
}

export default function Pagination ({currentPage, totalPage, onPageChange}: PaginateProps ) {
    if( totalPage < 0 ){
        return null
    }

    return(
        <ReactPaginate
            pageCount={totalPage}
            forcePage={currentPage - 1}
            onPageChange={(event) => onPageChange(event.selected + 1)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            previousLabel="←"
            nextLabel="→"
            breakLabel="..."
            containerClassName={css.pagination}
            pageClassName={css.page}
            pageLinkClassName={css.pageLink}
            activeClassName={css.active}
            activeLinkClassName={css.activeLink}
            previousClassName={css.prev}
            nextClassName={css.next}
            previousLinkClassName={css.navLink}
            nextLinkClassName={css.navLink}
            disabledClassName={css.disabled}
            />

            

        
    )
}