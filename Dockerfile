FROM node:18.17.1-slim

WORKDIR /app

COPY src ./src/
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY package.json .
COPY yarn.lock .
COPY .eslintrc.yaml .
COPY .prettierrc.yaml .
COPY .yarnrc.yaml .

RUN yarn install && yarn cache clean --all
RUN yarn build

EXPOSE 3000
CMD ["yarn", "dev"]
