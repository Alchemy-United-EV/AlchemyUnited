#!/bin/bash

echo "=== IMAGE COMPRESSION UTILITY ==="
echo "Compressing images in public/assets/"

# Check if imagemagick is available
if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Installing..."
    nix-env -iA nixpkgs.imagemagick
fi

# Create backup directory
mkdir -p public/assets/originals

# Compress PNG images
for img in public/assets/*.png; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        echo "Compressing $filename..."
        
        # Backup original
        cp "$img" "public/assets/originals/$filename"
        
        # Compress PNG with 85% quality
        convert "$img" -quality 85 -strip -interlace Plane "$img.tmp"
        
        # Compare sizes
        original_size=$(stat -c%s "$img")
        new_size=$(stat -c%s "$img.tmp")
        
        if [ $new_size -lt $original_size ]; then
            mv "$img.tmp" "$img"
            echo "  Compressed: $(($original_size/1024))KB -> $(($new_size/1024))KB ($(((($original_size-$new_size)*100)/$original_size))% reduction)"
        else
            rm "$img.tmp"
            echo "  Skipped: compression didn't reduce size"
        fi
    fi
done

# Generate WebP versions
for img in public/assets/*.png; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .png)
        echo "Generating WebP for $filename..."
        convert "$img" -quality 85 "public/assets/$filename.webp"
    fi
done

echo "Image compression completed!"