@echo off
python verify_critical.py > verify_out.txt 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Script failed with error level %ERRORLEVEL%
) else (
    echo Script finished successfully
)
type verify_out.txt
