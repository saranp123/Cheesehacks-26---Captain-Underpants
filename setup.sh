#!/bin/bash
# Generic hackathon project folder setup (no app name assumed)

# Create main folders
mkdir frontend backend data scripts

# Create frontend structure
mkdir -p frontend/pages/frontend/pages/task
mkdir -p frontend/components frontend/styles frontend/utils

# Create placeholder frontend files
touch frontend/pages/index.js
touch frontend/pages/tasks.js
touch frontend/pages/task/[id].js
touch frontend/pages/dashboard.js
touch frontend/components/TaskCard.js
touch frontend/components/SkillSelector.js
touch frontend/components/Header.js
touch frontend/styles/globals.css
touch frontend/utils/matchLogic.js
touch frontend/package.json

# Create backend structure
mkdir -p backend/routes backend/models
touch backend/routes/volunteers.js
touch backend/routes/tasks.js
touch backend/models/volunteer.js
touch backend/index.js
touch backend/package.json

# Create data files
touch data/tasks.json
touch data/skills.json
touch data/nonprofits.json

# Create scripts
touch scripts/seedTasks.js
touch scripts/seedVolunteers.js
touch scripts/calculateImpact.js

# Create root README (generic)
echo "# Hackathon Project" > README.md

# Create .gitignore
echo "node_modules/" > .gitignore
echo "frontend/node_modules/" >> .gitignore
echo "backend/node_modules/" >> .gitignore

echo "✅ Hackathon project folder structure created successfully!"
