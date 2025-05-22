
import React from 'react';
import NewsCard from './NewsCard';
import { cn } from '@/lib/utils';

interface NewsFeedProps {
  className?: string;
  color?: "blue" | "green" | "orange";
}

const NewsFeed = ({ className, color = "blue" }: NewsFeedProps) => {
  // Sample news data - in a real app, this would be fetched from an API
  const newsItems = [
    {
      id: 1,
      title: "Tamil Nadu NCERT Announces New Textbook Series",
      description: "The Tamil Nadu State Council of Educational Research and Training (SCERT) has launched a new series of textbooks aligned with NCERT guidelines.",
      date: "May 8, 2025",
      category: "Curriculum"
    },
    {
      id: 2,
      title: "Matriculation Schools to Implement Activity-Based Learning",
      description: "Tamil Nadu Matriculation Schools Association announces new activity-based learning modules to enhance student engagement and practical knowledge.",
      date: "May 5, 2025",
      category: "Teaching Methods"
    },
    {
      id: 3,
      title: "Upcoming Educational Webinar for Tamil Nadu Teachers",
      description: "NCERT is organizing a virtual training session for teachers on implementing the new educational policy framework.",
      date: "May 12, 2025",
      category: "Events"
    }
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-xl font-bold mb-4">Latest Educational News</h2>
      {newsItems.map((item) => (
        <NewsCard
          key={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
          category={item.category}
          color={color}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
