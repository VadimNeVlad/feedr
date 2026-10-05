import { useEffect } from "react";
import { ArticleFormFields } from "../../utils/validators/articleSchema";

type ArticleDraft = ArticleFormFields & { content: string };

export function readArticleDraft(key: string): ArticleDraft | null {
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? "null");

    if (
      saved &&
      typeof saved.title === "string" &&
      typeof saved.content === "string" &&
      Array.isArray(saved.tagList) &&
      saved.tagList.every((tag: unknown) => typeof tag === "string")
    ) {
      return { title: saved.title, content: saved.content, tagList: saved.tagList };
    }
  } catch {
    // A missing or damaged draft must not prevent editing.
  }

  return null;
}

export function clearArticleDraft(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Nothing to clear when browser storage is unavailable.
  }
}

export function useArticleDraft(
  key: string,
  { title, tagList, content }: ArticleDraft,
  unsaved: boolean,
) {
  useEffect(() => {
    if (!unsaved) return clearArticleDraft(key);

    try {
      localStorage.setItem(key, JSON.stringify({ title, tagList, content }));
    } catch {
      // Editing remains available when browser storage is unavailable.
    }
  }, [key, title, tagList, content, unsaved]);

  useEffect(() => {
    if (!unsaved) return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);

    return () => window.removeEventListener("beforeunload", warn);
  }, [unsaved]);
}
