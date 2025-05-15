
RUN npm run build
RUN ls -l

COPY . .

# Development stage
FROM builder AS development
# Set NODE_ENV to development
ENV NODE_ENV=development

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application(in development)
CMD ["npm", "run", "dev"]