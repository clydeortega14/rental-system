<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\FileTraits;

class FileUploadController extends Controller
{
    use FileTraits;
    
    public function uploadFile(Request $request)
    {
        $validated = $request->validate([
            'filename' => 'required|mimes:jpg,jpeg,png|mimetypes:image/png,image/jpeg|max:2000',
        ]);
        
        $file = $request->file('filename');

        $user = auth()->user();

        $user_valid_id = $user->userValidIds()->create(['id_type' => 1]);

        $file_name = $this->manageFileUpload(
            $user_valid_id, // model
            $file, // file
            'local', // driver
            'users/ids/'.$user_valid_id->idType->name // path
        );
        
        return redirect()->route('dashboard');
    }
}
