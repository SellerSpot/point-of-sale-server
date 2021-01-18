# ---- Base Node ----
FROM alpine:3.12.3 AS base
# set work dir
WORKDIR /app
# install node
RUN apk add --no-cache nodejs npm
# copy project file
COPY . .

# ---- Dependencies ----
FROM base AS dependencies
# setting node environment to production
ENV NODE_ENV=production
# install node packages
RUN npm install

# ---- Dependencies ----
FROM base AS build
# install ALL node_modules, including 'devDependencies'
RUN npm install
# build application
RUN npm run build

# ---- Release ----
FROM base AS release
# copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
# copy dist from build stage
COPY --from=build /app/dist ./dist
# expose port
EXPOSE 8000
# define CMD
CMD ["npm", "start"]
