import React from 'react';

export default function NewsList() {
  return (
    <div>
      <div></div>
      <ul className="news-list">
        <li className="news-item">
          <a href="#" className="news-btn">
            Все новости
          </a>
        </li>
        <li className="news-item">
          <a href="#" className="news-btn">
            Ноябрь
          </a>
        </li>
        <li className="news-item">
          <a href="#" className="news-btn">
            Октябрь
          </a>
        </li>
        <li className="news-item">
          <a href="#" className="news-btn">
            Сентябрь
          </a>
        </li>
        <li className="news-item">
          <a href="#" className="news-btn">
            Август
          </a>
        </li>
        <li className="news-item">
          <a href="#" className="news-btn">
            Июль
          </a>
        </li>
      </ul>
    </div>
  );
}
