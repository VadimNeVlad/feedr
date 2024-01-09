import React from "react";
import { Header } from "../../components/Header/Header";
import { Articles } from "../../components/ArticlesList/ArticlesList";
import { Container } from "@mui/material";

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Articles />
      </Container>
    </>
  );
};
