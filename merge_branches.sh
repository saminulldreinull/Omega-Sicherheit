#!/bin/bash

# Speichere den aktuellen Branch
current_branch=$(git branch --show-current)

# Stelle sicher, dass wir auf dem aktuellen Branch sind
git checkout "$current_branch"
git pull origin "$current_branch"

# Schleife durch alle lokalen Branches
for branch in $(git branch | sed 's/\*//'); do
  branch=$(echo $branch | xargs)  # Entferne führende und nachfolgende Leerzeichen

  # Skip the current branch
  if [ "$branch" != "$current_branch" ]; then
    echo "Merging $branch into branch $current_branch..."
    git checkout "$branch"
    git pull origin "$branch"
    git checkout "$current_branch"
    git merge "$branch"

    # Check if the merge was successful
    if [ $? -ne 0 ]; then
      echo "Merge conflict with branch $branch. Please resolve manually."
      exit 1
    fi
  fi
done

echo "All branches have been merged into $current_branch."
