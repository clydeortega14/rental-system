<?php

namespace App\Traits;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

trait FileTraits {

    public function fileSanitizer($file)
    {
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        // Remove any special characters and replace spaces with hyphens
        $sanitized_filename = preg_replace('/[^A-Za-z0-9-]/', '', str_replace(' ', '-', $filename));

        // remove multiple consecutive hyphens
        $sanitized_filename = preg_replace('/-{2,}/', '-', $sanitized_filename);

        // lowercase the filename
        $sanitized_filename = strtolower($sanitized_filename);

        return $sanitized_filename;
    }

    public function storeFile($model, $file, $driver, $path)
    {
        $filename = Str::random(32);
        $ext = $file->extension();
        $size = $file->getSize();

        $attachment = $model->attachment()->create([
            'display_name' => $this->fileSanitizer($file),
            'path' => $path,
            'filename' => $filename,
            'storage_disk' => $driver,
            'type' => $ext,
            'size' => $size,
            'size_type' => 'kb'
        ]);

        $new_filename  = $filename.'.'.$ext;

        // store the file to storage
        $file->storeAs($path, $new_filename, $driver);

        return $new_filename;
    }

    public function manageFileUpload($model, $file, $driver, $path)
    {
        if(is_array($file)){

            foreach($file as $fl){
                $this->storeFile($model, $fl, $driver, $path);
            }
        }else{

            $this->storeFile($model, $fl, $driver, $path);
        }
    }
}