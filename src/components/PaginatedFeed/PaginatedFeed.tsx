import { Fragment, ReactNode, useState } from "react";

export type FeedPageProps = {
  page: number;
  onLoadMore?: () => void;
};

type PaginatedFeedProps = {
  children: (props: FeedPageProps) => ReactNode;
};

export const PaginatedFeed = ({ children }: PaginatedFeedProps) => {
  const [pageCount, setPageCount] = useState(1);

  return Array.from({ length: pageCount }, (_, page) => (
    <Fragment key={page}>
      {children({
        page,
        // Idempotent per page: a click and the scroll sentinel firing together load one page.
        onLoadMore:
          page === pageCount - 1
            ? () => setPageCount((count) => Math.max(count, page + 2))
            : undefined,
      })}
    </Fragment>
  ));
};
