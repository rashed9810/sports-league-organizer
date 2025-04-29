Write-Host "Adding all modified files..."
git add .

Write-Host "Committing changes..."
git commit -m "Fix accessibility issues and implement team logo upload functionality"

Write-Host "Pushing to GitHub..."
git push origin master

Write-Host "Done!"
Read-Host "Press Enter to continue..."
