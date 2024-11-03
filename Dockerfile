# Use the official Node.js image as a base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

RUN chmod +x /app/entrypoint.sh

# Expose the Next.js application port
EXPOSE 3000

# run migration & build script
ENTRYPOINT [ "/app/entrypoint.sh" ]

# Start the Next.js application
CMD ["yarn", "start"]
