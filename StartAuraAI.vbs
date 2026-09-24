Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c cd /d d:\Models-agents && node boot.js", 0, False
