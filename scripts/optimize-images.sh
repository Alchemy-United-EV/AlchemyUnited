#!/bin/bash

# Create WebP optimization report
echo "Image Optimization Report" > optimization-report.md
echo "=========================" >> optimization-report.md
echo "" >> optimization-report.md
echo "| File | Original Size | WebP Size | Savings |" >> optimization-report.md
echo "|------|---------------|-----------|---------|" >> optimization-report.md

# Find images >120KB and convert to WebP
find public/assets/ -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" \) | while read file; do
    # Get file size in KB
    size=$(du -k "$file" | cut -f1)
    
    if [ "$size" -gt 120 ]; then
        # Get filename without extension
        basename=$(basename "$file")
        filename="${basename%.*}"
        
        # Convert to WebP at 75% quality
        webp_file="public/assets/webp/${filename}.webp"
        convert "$file" -quality 75 "$webp_file"
        
        # Get sizes for report
        original_size=$(du -h "$file" | cut -f1)
        webp_size=$(du -h "$webp_file" | cut -f1)
        
        # Calculate savings percentage
        original_kb=$(du -k "$file" | cut -f1)
        webp_kb=$(du -k "$webp_file" | cut -f1)
        savings=$((100 - (webp_kb * 100 / original_kb)))
        
        echo "| $basename | $original_size | $webp_size | ${savings}% |" >> optimization-report.md
        echo "✓ Converted: $basename → ${filename}.webp (${savings}% savings)"
    fi
done

echo "" >> optimization-report.md
echo "Optimization complete. All originals preserved." >> optimization-report.md