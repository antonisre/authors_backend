
FROM ubuntu:bionic-20190612

WORKDIR /app

RUN apt-get update

# install nodejs
RUN apt-get -y install curl gnupg git
RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -
RUN apt-get -y install nodejs

COPY package.json .

RUN npm install
RUN npm i typescript

ADD . /app

CMD ["bash"]

EXPOSE 8000


