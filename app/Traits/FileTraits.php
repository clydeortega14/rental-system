<?php

namespace App\Traits;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

trait FileTraits {

    public function storeFile($model, $file, $driver, $path)
    {
        $filename = Str::random(64);
        $ext = $file->extension();
        $size = $file->getSize();

        $attachment = $model->attachment()->create([
            'filename' => $filename,
            'type' => $ext,
            'size' => $size,
            'size_type' => 'kb'
        ]);

        $new_filename  = $filename.'.'.$ext;

        // store the file to storage
        $file->storeAs($path, $new_filename, $driver);

        return $new_filename;

    }
}