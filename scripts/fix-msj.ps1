$files = Get-ChildItem -Path ./dist/esm/*.js

foreach ($file in $files) {
    Write-Host "Updating $($file.FullName) contents..."
    (Get-Content $file.FullName) -replace "\.js'", ".mjs'" | Set-Content $file.FullName

    $newFileName = "$($file.DirectoryName)\$($file.BaseName).mjs"
    Write-Host "Renaming $($file.FullName) to $newFileName..."
    Rename-Item -Path $file.FullName -NewName $newFileName
}
