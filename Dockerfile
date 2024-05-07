FROM node:18.18-alpine
WORKDIR /opt/fit-friends/frontend
COPY ./package.json .
RUN npm install --omit=dev
RUN npm install -g vite
COPY ./dist .
CMD ["npm", "start"]
