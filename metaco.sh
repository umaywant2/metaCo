#!/bin/bash
# metaCo CLI Hook (Linux Bash)
# Minimal toggle script for metaCo extension

STATE_DIR="$HOME/.local/share/metaCo"
STATE_FILE="$STATE_DIR/state.json"

# Ensure directory exists
mkdir -p "$STATE_DIR"

# Check argument
if [ $# -ne 1 ]; then
  echo "Usage: $0 [on|off]"
  exit 1
fi

ACTION=$1

case "$ACTION" in
  on)
    echo '{"enabled": true}' > "$STATE_FILE"
    echo "metaCo toggled ON"
    ;;
  off)
    echo '{"enabled": false}' > "$STATE_FILE"
    echo "metaCo toggled OFF"
    ;;
  *)
    echo "Invalid action. Use 'on' or 'off'."
    exit 1
    ;;
esac
