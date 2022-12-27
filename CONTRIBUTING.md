# Contributing Guide

- Create a new branch for each feature or improvement (starting from the `main` branch)
- Raise a PR to `staging` branch to check if everything is working fine
- Raise a PR from your branch to `main` branch
- Get your PR reviewed by at least one other developer

## Please try follow these guidelines:

- Try to add comments for each new feature or improvement
- Try to add tests for each new feature or improvement
- Try to add documentation for each new feature or improvement
- Try to keep the code style consistent with the rest of the project
- Try to keep the commit history clean and consistent with the rest of the project
- Don't push any changes to `main` branch directly
- Don't push any changes to `staging` branch directly
- `main` and `staging` branches are two separate branches and should not be merged (may be out of sync)

### Example workflow:

```bash
# Create a new branch
git checkout -b my-new-feature

# Make changes and commit
git add .
git commit -m "My new feature"
git push -u origin my-new-feature

# Merge changes to staging branch
git checkout staging
git merge my-new-feature

# Push changes to staging branch
git push origin staging

# Check if everything is working fine
# Raise a PR to main branch from your branch
```
