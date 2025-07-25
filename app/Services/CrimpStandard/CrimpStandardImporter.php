<?php

namespace App\Services\CrimpStandard;

use Maatwebsite\Excel\Facades\Excel;
use App\Imports\CrimpStandardImport;
use Illuminate\Http\UploadedFile;

class CrimpStandardImporter
{
    public function import(UploadedFile $file): void
    {
        Excel::import(new CrimpStandardImport, $file);
    }
}
