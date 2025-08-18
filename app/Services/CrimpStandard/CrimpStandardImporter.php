<?php

namespace App\Services\CrimpStandard;

use App\Imports\CrimpStandardImport;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class CrimpStandardImporter
{
    public function import(UploadedFile $file): void
    {
        Excel::import(new CrimpStandardImport, $file);
    }
}
