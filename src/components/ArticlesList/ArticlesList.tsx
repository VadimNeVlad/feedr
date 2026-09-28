import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { Article } from "../../utils/types/articles";
import { ArticleItem } from "../ArticleItem/ArticleItem";
import { ReadingListItem } from "../ReadingListItem/ReadingListItem";
import { ArticlesListSkeleton } from "../Skeletons/ArticlesListSkeleton/ArticlesListSkeleton";
import { NoResultMessage } from "../NoResultMessage/NoResultMessage";

export type ArticlesListVariant = "feed" | "saved";

type ArticlesListProps = {
  /** `undefined` while the page is loading. */
  articles?: Article[];
  isFetching: boolean;
  showEmpty: boolean;
  /** Present only when another page exists. */
  onLoadMore?: () => void;
  variant?: ArticlesListVariant;
};

const variants = {
  feed: {
    Item: ArticleItem,
    empty: "There are no articles yet",
    loadMore: "Load more articles",
  },
  saved: {
    Item: ReadingListItem,
    empty: "No saved articles yet.",
    loadMore: "Load more saved articles",
  },
};

export const ArticlesList = ({
  articles,
  isFetching,
  showEmpty,
  onLoadMore,
  variant = "feed",
}: ArticlesListProps) => {
  const { Item, empty, loadMore } = variants[variant];
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && !isFetching) onLoadMore?.();
  }, [inView, isFetching, onLoadMore]);

  if (!articles) return <ArticlesListSkeleton />;

  return (
    <>
      {articles.map((article) => (
        <Item key={article.id} article={article} />
      ))}
      {showEmpty && articles.length === 0 && <NoResultMessage msg={empty} />}
      {onLoadMore && (
        <Box ref={ref} sx={{ my: 2 }}>
          <Button onClick={onLoadMore} disabled={isFetching}>
            {loadMore}
          </Button>
        </Box>
      )}
    </>
  );
};
