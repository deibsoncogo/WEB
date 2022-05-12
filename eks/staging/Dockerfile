FROM node:16.15

RUN mkdir -p /var/www/web

WORKDIR /var/www/web

COPY . .

RUN yarn add next && \ 
    yarn install && \
    yarn run build

CMD ["yarn", "start"]