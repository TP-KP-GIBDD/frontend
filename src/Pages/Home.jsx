import React from "react";
import NewsList from "../Components/NewsList";
import NewsSidebar from "../Components/NewsSidebar";
import "../App.css";

export default function Home() {
  return (
    <div>
      <h1 class="news">Новости Госавтоинспекции</h1>
      <div class="news-content">
        <NewsList />
        <NewsSidebar />
      </div>
    </div>
  );
}
