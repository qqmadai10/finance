#!/bin/bash
echo "开始构建..."
npx vite build
echo "Vite构建完成，执行API构建..."
node api/build.cjs
echo "构建完成"