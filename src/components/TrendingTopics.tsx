"use client";

import React from "react";

const TrendingTopics = () => {
  const topics = ["Gen Z Memes", "Tech Innovations", "Mental Health Awareness", "Fashion Trends", "Cryptocurrency"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Trending Live Topics</h2>
      <ul className="space-y-2">
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingTopics;
