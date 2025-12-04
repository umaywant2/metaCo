-- metaCo CLI Hook (Mac AppleScript)
-- Minimal toggle script for metaCo extension

on run argv
    if (count of argv) is not 1 then
        display dialog "Usage: metaco.applescript [on|off]" buttons {"OK"} default button "OK"
        return
    end if

    set action to item 1 of argv
    set stateDir to (POSIX path of (path to library folder from user domain)) & "Application Support/metaCo/"
    set stateFile to stateDir & "state.json"

    -- Ensure directory exists
    do shell script "mkdir -p " & quoted form of stateDir

    if action is "on" then
        set jsonState to "{\"enabled\": true}"
        display dialog "metaCo toggled ON" buttons {"OK"} default button "OK"
    else if action is "off" then
        set jsonState to "{\"enabled\": false}"
        display dialog "metaCo toggled OFF" buttons {"OK"} default button "OK"
    else
        display dialog "Invalid action. Use 'on' or 'off'." buttons {"OK"} default button "OK"
        return
    end if

    -- Write JSON state to file
    do shell script "echo " & quoted form of jsonState & " > " & quoted form of stateFile
end run
