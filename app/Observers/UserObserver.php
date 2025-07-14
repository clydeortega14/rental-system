<?php

namespace App\Observers;

use App\Models\AdminRole;

class UserObserver
{
    /**
     * Handle the User "created" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function created($user)
    {
        /* if(AdminRole::where('name', 'lessee')->exists()) {
            $user->assignRole('lessee'); // Assign a default role to the user
            return;
        } */
    }

    /**
     * Handle the User "updated" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function updated($user)
    {
        // Logic to handle user updates, e.g., logging changes
    }

    /**
     * Handle the User "deleted" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function deleted($user)
    {
        // Logic to handle user deletion, e.g., cleaning up related data
    }
}
