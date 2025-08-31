#!/bin/bash

echo "🔍 Checking all TypeScript errors..."
echo "=================================="

# Count errors
ERROR_COUNT=$(npx tsc --noEmit --pretty false 2>&1 | grep "error TS" | wc -l)
echo "📊 Total errors found: $ERROR_COUNT"
echo ""

# Show all errors
echo "📝 Error details:"
echo "=================================="
npx tsc --noEmit 2>&1 | grep -A2 "error TS"

echo ""
echo "✅ Use this to see all errors before pushing to Vercel!"