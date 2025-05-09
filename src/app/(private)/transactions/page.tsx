'use client'

import TransactionsTable from "@/components/table-transactions";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchTransactions } from "@/lib/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Transactions() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data, isLoading } = useQuery({
    queryKey: ['transactions', page, limit],
    queryFn: () => fetchTransactions(page, limit),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
      </div>

      <TransactionsTable transactions={data?.transactions ?? []} />


      <Pagination className="flex items-center justify-between flex-col md:flex-row">
        <PaginationContent>
          <PaginationPrevious
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          />

          {data?.totalPages && (() => {
            const totalPages = data.totalPages;
            const pageNumbers = [];

            let start = Math.max(1, page - 2);
            let end = Math.min(totalPages, page + 2);

            if (page <= 3) {
              start = 1;
              end = Math.min(5, totalPages);
            } else if (page >= totalPages - 2) {
              start = Math.max(totalPages - 4, 1);
              end = totalPages;
            }

            for (let i = start; i <= end; i++) {
              pageNumbers.push(i);
            }

            return (
              <>
                {start > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
                    </PaginationItem>
                    {start > 2 && <PaginationEllipsis />}
                  </>
                )}

                {pageNumbers.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={page === pageNumber}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {end < totalPages && (
                  <>
                    {end < totalPages - 1 && <PaginationEllipsis />}
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
              </>
            );
          })()}

          <PaginationNext
            onClick={() => setPage((prev) => Math.min(prev + 1, data?.totalPages ?? prev))}
          />
        </PaginationContent>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Exibir</span>
          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[80px] h-8">
              <SelectValue placeholder="Linhas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Pagination>
    </div>
  );
}