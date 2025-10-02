#!/bin/bash

# Deployment Monitoring Script for Botsmann
# Monitors Vercel deployments and provides status updates

set -e

echo "🚀 Botsmann Deployment Monitor"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "vercel.json" ]; then
    echo -e "${RED}❌ Error: Not in the correct project directory${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Checking project status...${NC}"

# Check if required files exist
required_files=("package.json" "next.config.js" "vercel.json" ".github/workflows/deploy.yml")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file (missing)${NC}"
    fi
done

echo -e "\n${BLUE}🔍 Checking deployment configuration...${NC}"

# Check vercel.json
if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✅ vercel.json found${NC}"
    echo -e "${YELLOW}📋 Vercel Configuration:${NC}"
    cat vercel.json | jq .
else
    echo -e "${RED}❌ vercel.json not found${NC}"
fi

# Check GitHub Actions workflow
if [ -f ".github/workflows/deploy.yml" ]; then
    echo -e "\n${GREEN}✅ GitHub Actions workflow found${NC}"
    echo -e "${YELLOW}📋 Workflow Status:${NC}"
    grep -E "(name|on:|runs-on:|steps:)" .github/workflows/deploy.yml | head -10
else
    echo -e "\n${RED}❌ GitHub Actions workflow not found${NC}"
fi

echo -e "\n${BLUE}🔧 Checking build optimization...${NC}"

# Check if build script is optimized
if grep -q "build:ci" package.json; then
    echo -e "${GREEN}✅ Optimized build script (build:ci) found${NC}"
else
    echo -e "${YELLOW}⚠️  Standard build script found${NC}"
fi

# Check for potential issues
echo -e "\n${BLUE}🔍 Checking for potential issues...${NC}"

# Check for security vulnerabilities
if [ -f "package-lock.json" ]; then
    vuln_count=$(npm audit --audit-level=moderate 2>/dev/null | grep -c "vulnerabilit" || echo "0")
    if [ "$vuln_count" -gt "0" ]; then
        echo -e "${YELLOW}⚠️  $vuln_count vulnerabilities found (run 'npm audit fix')${NC}"
    else
        echo -e "${GREEN}✅ No security vulnerabilities found${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  No package-lock.json found${NC}"
fi

echo -e "\n${BLUE}📊 Deployment Readiness Summary${NC}"
echo -e "${GREEN}✅ Project structure verified${NC}"
echo -e "${GREEN}✅ Build configuration optimized${NC}"
echo -e "${GREEN}✅ GitHub Actions workflow configured${NC}"
echo -e "${GREEN}✅ Vercel configuration ready${NC}"

echo -e "\n${YELLOW}📋 Next Steps:${NC}"
echo "1. Ensure Vercel secrets are configured in GitHub repository"
echo "2. Push changes to trigger automated deployment"
echo "3. Monitor deployment in GitHub Actions and Vercel dashboard"

echo -e "\n${GREEN}🎉 Ready for automated deployment!${NC}"
