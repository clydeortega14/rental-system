<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\IdType;

class IdListsSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createDetail();
    }

    public function create(array $data)
    {
        return IdType::create(['name' => $data['name'] ]);
    }

    public function createDetail()
    {
        $id_type = $this->create(['name' => 'drivers_license']);

        $id_type->detail()->create([
            'label' => 'Drivers License',
            'description' => 'This is for drivers license valid id',
            'detailable_id' => $id_type->id
        ]);
    }
}
