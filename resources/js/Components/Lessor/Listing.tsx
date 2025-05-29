import React from 'react';
import { Card, CardContent } from '@/Components/Lessor/ui/card';
import { Button } from '@/Components/Lessor/ui/button';

interface ListingCardProps {
  id: number;
  title: string;
  description: string;
  status: string;
  imageUrl: string;
}

export default function ListingCard({ id, title, description, status, imageUrl }: ListingCardProps) {
  return (
    <Card className="bg-gray-50 shadow-md rounded-lg">
      <CardContent className="p-4">
        <img src={imageUrl} alt="Property" className="rounded-md mb-4" />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span>Status: {status}</span>
          <Button size="sm" variant="outline" className="border-gray-300">Edit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
