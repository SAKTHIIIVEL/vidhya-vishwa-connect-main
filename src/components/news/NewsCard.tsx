
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface NewsCardProps {
  title: string;
  description: string;
  date: string;
  category: string;
  className?: string;
  color?: "blue" | "green" | "orange";
}

const NewsCard = ({ 
  title, 
  description, 
  date, 
  category, 
  className,
  color = "blue" 
}: NewsCardProps) => {
  const colorClasses = {
    blue: "border-l-4 border-edu-blue hover:bg-edu-lightBlue",
    green: "border-l-4 border-edu-green hover:bg-edu-lightGreen",
    orange: "border-l-4 border-edu-orange hover:bg-edu-lightOrange"
  };
  
  const badgeColors = {
    blue: "bg-edu-lightBlue text-edu-blue",
    green: "bg-edu-lightGreen text-edu-green",
    orange: "bg-edu-lightOrange text-edu-orange"
  };

  return (
    <Card className={cn(
      "transition-all duration-300 ease-in-out cursor-pointer auth-animate-in", 
      colorClasses[color],
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-1">
          <Badge className={cn("font-medium", badgeColors[color])}>
            {category}
          </Badge>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
