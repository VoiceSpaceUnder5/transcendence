# Step1
## 노드를 빌드하고 실행시키는 이미지를 가져온다.
FROM node:16.13-alpine3.13
EXPOSE 3001

WORKDIR /app
#Proejct의 모든 파일을 WORKDIR == /app 으로 복사한다.
COPY . .
RUN yarn
RUN npm i -g serve
RUN yarn build

ENTRYPOINT [ "serve" ]
CMD [ "-s", "build",	"-l", "3001" ]