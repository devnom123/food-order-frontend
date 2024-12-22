import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "./ui/pagination";

type Prop = {
    page: number,
    pages: number,
    onPageChange: (page: number) => void
}

const PaginationSelector = ({ page, pages, onPageChange }: Prop) => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {page !== 1 && (
                        <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
                    )}
                </PaginationItem>
                {pageNumbers.map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink
                            href="#"
                            onClick={() => onPageChange(number)}
                            isActive={number === page}
                        >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {
                    page !== pageNumbers.length && (
                        <PaginationItem>
                            <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
                        </PaginationItem>
                    )
                }
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationSelector