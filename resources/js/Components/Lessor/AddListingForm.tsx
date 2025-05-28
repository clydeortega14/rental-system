import React from 'react';
import { Button } from '@/Components/Lessor/ui/button';
import { Input } from '@/Components/Lessor/ui/input';
import { Textarea } from '@/Components/Lessor/ui/textarea';

export default function AddListingForm() {
  return (
    <form className="bg-white p-6 rounded-md shadow-md mb-6 max-w-lg">
      <h2 className="text-xl font-bold mb-4">Add New Listing</h2>
      <Input placeholder="Listing Title" className="mb-3" />
      <Input placeholder="Location" className="mb-3" />
      <Textarea placeholder="Description" rows={4} className="mb-3" />
      <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-400">
        Add Listing
      </Button>
    </form>
  );
}
