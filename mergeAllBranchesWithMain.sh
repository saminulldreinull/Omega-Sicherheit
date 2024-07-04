#!/bin/bash

# Stelle sicher, dass wir auf dem main-Branch sind
git checkout main
git pull origin main

# Schleife durch alle lokalen Branches
for branch in $(git branch | sed 's/\*//'); do
  branch=$(echo $branch | xargs)  # Entferne führende und nachfolgende Leerzeichen

  # Skip the main branch
  if [ "$branch" != "main" ]; then
    echo "Merging main into branch $branch..."
    git checkout "$branch"
    git merge main

    # Check if the merge was successful
    if [ $? -ne 0 ]; then
      echo "Merge conflict in branch $branch. Please resolve manually."
      exit 1
    fi

    echo "Merging branch $branch into main..."
    git checkout main
    git merge "$branch"

    # Check if the merge was successful
    if [ $? -ne 0 ]; then
      echo "Merge conflict in branch $branch. Please resolve manually."
      exit 1
    fi
  fi
done

echo "All branches have been merged with main and vice versa."
