# pull official base image
FROM node:14.4.0-alpine3.12 as Stage1

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# add app
COPY . /app/
RUN npm run-script build

FROM nginx:1.19.0-alpine
COPY --from=Stage1 /app/build /usr/share/nginx/html
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

