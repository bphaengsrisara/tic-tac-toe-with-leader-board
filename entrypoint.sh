#!/bin/sh

# Apply Prisma migrations and start the application
yarn db:setup
yarn build

# Run the main container command
exec "$@"
