import { api } from "../../app/services";
import { ARTICLES_PAGE_SIZE } from "../articles/constants";
import { articleListTags } from "../articles/cacheTags";
import {
  ArticleData,
  ArticlesParams,
  ArticlesResponse,
} from "../../utils/types/articles";
import { Tag } from "../../utils/types/tag";
import { TAGS_PAGE_SIZE } from "./constants";

type TagsParams = { q?: string; page?: number };

export const tagsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<Tag[], TagsParams>({
      query: ({ q, page = 0 }) => ({
        url: "tags",
        params: { q, page, per_page: TAGS_PAGE_SIZE },
      }),
      providesTags: ["Tag"],
    }),

    getTagArticles: build.query<ArticleData, ArticlesParams>({
      query: ({ page = 0, sortBy = "latest", tagName }) => ({
        url: `tags/${encodeURIComponent(tagName || "")}`,
        params: { page, per_page: ARTICLES_PAGE_SIZE, sort_by: sortBy },
      }),
      transformResponse: ({ articles, _count }: ArticlesResponse) => ({
        articles,
        _count: _count.articles,
      }),
      providesTags: (result) => ["Tag", ...articleListTags(result)],
    }),
  }),
});

export const { useGetTagsQuery, useGetTagArticlesQuery } = tagsApi;
