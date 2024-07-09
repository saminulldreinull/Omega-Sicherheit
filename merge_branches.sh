#!/bin/bash

log_file="merge_log.txt"
echo "Merge process started at $(date)" > $log_file

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
    echo "Merging $branch into branch $current_branch..." | tee -a $log_file
    git checkout "$branch"
    
    # Check if the branch has a remote ref
    if git show-ref --quiet refs/heads/"$branch"; then
      echo "Merging changes from $branch"
    else
      echo "No local ref for branch $branch. Skipping pull." | tee -a $log_file
    fi
    
    git checkout "$current_branch"
    git merge "$branch"

    # Check if the merge was successful
    if [ $? -ne 0 ]; then
      echo "Merge conflict with branch $branch. Please resolve manually." | tee -a $log_file
      exit 1
    fi
  fi
done

echo "All branches have been merged into $current_branch." | tee -a $log_file
echo "Merge process completed at $(date)" | tee -a $log_file
