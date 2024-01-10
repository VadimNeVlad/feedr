import React from "react";
import { Header } from "../../components/Header/Header";
import { Container } from "@mui/material";
import { Editor } from "../../components/Editor/Editor";

export const AddArticle: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <h1>Add Article</h1>
        <Editor content="" />
      </Container>
    </>
  );
};
