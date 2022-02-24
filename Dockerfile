ARG NODE_VERSION=16-alpine
FROM node:$NODE_VERSION AS build

RUN npm -g install npm@8.x.x

ARG REACT_APP_VITALAM_DEMO_PERSONA
ARG REACT_APP_API_HOST
ARG REACT_APP_API_PORT
ARG REACT_APP_SUBSTRATE_HOST
ARG REACT_APP_SUBSTRATE_PORT
ARG REACT_APP_AUTH_CLIENT_ID
ARG REACT_APP_AUTH_CLIENT_SECRET

WORKDIR /vitalam-demo-client

# Install base dependencies
COPY . .
RUN npm ci --production

# RUN Build
RUN npm run build

##################################################################################################

FROM nginx:1.21.6-alpine AS runtime

WORKDIR /vitalam-demo-client

COPY --from=build /vitalam-demo-client/build .
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
