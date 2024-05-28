'use client';

import { useState } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { categoryItems } from '../lib/categoryItems';

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="gird-cols-1 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      <input type="hidden" name="category" value={selectedCategory || ''} />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={
              selectedCategory === item.name
                ? 'border-2 border-primary'
                : 'border-2 border-primary/10'
            }
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              {item.image}
              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;
