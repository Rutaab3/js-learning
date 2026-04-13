# create folders
Set-Location "C:\Users\Fahad\OneDrive\Documents\learning\notes\lesson4"; New-Item if-else.md, else-if.md, switch-case.md, return-early-pattern.md

# folder delete
Remove-Item "C:\Users\Fahad\OneDrive\Documents\learning\notes\lesson4" -Recurse -Force

# file delete
Remove-Item "C:\Users\Fahad\OneDrive\Documents\learning\notes\lesson4\*" -Force

# image convert
Get-ChildItem *.webp | ForEach-Object { ffmpeg -i $_.Name ($_.BaseName + ".png") }

# image convert delete others
Get-ChildItem *.webp | ForEach-Object { ffmpeg -i $_.Name ($_.BaseName + ".png"); Remove-Item $_.Name }

# all type covert
# 1. Define what you want to find and what you want to create
$inputTypes = @("*.webp", "*.jpg", "*.jpeg", "*.jfif")
$outputType = ".png"
# 2. Find and convert
Get-ChildItem -Path . -Include $inputTypes -File | ForEach-Object {
    $newName = $_.BaseName + $outputType
    ffmpeg -i $_.FullName $newName
# 3. delete the original after conversion
    Remove-Item $_.FullName
}

# delete all files inside tha directory except the folders 
 Get-ChildItem -Path "C:\Users\Fahad\3D Objects\Black\oak" -Recurse -File | Remove-Item -Force