node -v > nodecheck.txt
set /p ncheck=<nodecheck.txt
IF "%ncheck%"=="" ( 
@powershell Invoke-WebRequest -Uri https://nodejs.org/dist/v10.13.0/node-v10.13.0-x64.msi -UseBasicParsing -OutFile nodedownloader.msi
@powershell Start-Process msiexec.exe -Wait -ArgumentList '/I nodedownloader.msi /passive'
del nodedownloader.msi
) ELSE (
echo "Node exists"
)
del nodecheck.txt

psql --version > psqlcheck.txt
set /p pcheck=<psqlcheck.txt
IF "%pcheck%"=="" (
postgresql-9.6.11-1-windows-x64.exe --mode unattended
) ELSE (
echo "Postgresql exists"
)
del psqlcheck.txt

timeout 1800