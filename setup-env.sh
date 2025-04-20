echo "Creating .env..."

cat > .env <<EOF
# .env.development
VITE_UINAMIC_DEBUG=true

# .env.production
VITE_UINAMIC_DEBUG=false
EOF

echo "✅ .env file created successfully!"