import React from 'react';
import LessorLayout from '@/Layouts/LessorLayout';
import { Card, CardContent } from '@/Components/Lessor/ui/card';
import { Button } from '@/Components/Lessor/ui/button';

export default function Dashboard() {
  return (
    <LessorLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">Lists</h1>

        {/* Example Listings Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Property Portfolio</h2>
            <Button className="bg-orange-600 text-white hover:bg-orange-500">
              Add New Listing
            </Button>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {[1, 2, 3].map((id) => (
              <Card key={id} className="bg-white shadow rounded-lg">
                <CardContent>
                  <h3 className="font-semibold text-lg">Listing #{id}</h3>
                  <p className="text-gray-600">Description for listing #{id}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Other sections can go here */}
      </div>
    </LessorLayout>
  );
}
