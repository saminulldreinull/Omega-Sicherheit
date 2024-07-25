#!/bin/bash

# Function to determine if a file is binary
is_binary() {
  local file="$1"
  if [[ $(file --mime-type -b "$file") =~ ^(image|video|audio|application/octet-stream) ]]; then
    return 0
  else
    return 1
  fi
}

# List and display contents of files in the public directory and its subdirectories
echo "Files in the public directory:"
find public -type f | while read -r file; do
  if is_binary "$file"; then
    echo "$file (binary file)"
  else
    echo "$file:"
    cat "$file"
    echo
  fi
done

echo

# List and display contents of files in the src directory and its subdirectories
echo "Files in the src directory:"
find src -type f | while read -r file; do
  if is_binary "$file"; then
    echo "$file (binary file)"
  else
    echo "$file:"
    cat "$file"
    echo
  fi
done
