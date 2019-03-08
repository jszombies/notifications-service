FROM node:8
LABEL maintainer="maksim.lysakou@external.mckinsey.com"
COPY ./ /
RUN yarn
EXPOSE 3000
CMD [ "yarn", "start" ]
