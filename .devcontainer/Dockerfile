FROM node:20-bookworm-slim
RUN npm install -g @nestjs/cli@10.3.2
RUN apt-get update
RUN apt-get install -y \
  git \
  postgresql-client \
  sudo \
  nano

# Use a non-root user for the container.
# If the image already comes with a non-root user, should use it instead.

# ARG UID=1001
# ARG GID=1001
# ARG USERNAME='fessiordev'

# RUN addgroup --gid ${GID} ${USERNAME}
# RUN adduser --uid ${UID} --gid ${GID} ${USERNAME} && \
#   echo "${USERNAME} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# USER root
# RUN mkdir /workspace && \
#   chown ${USERNAME}:${USERNAME} /workspace

# USER ${USERNAME}

# In case the image comes with a non-root user, use it instead.

ARG UID=1000
ARG GID=1000
ARG USERNAME='node'

RUN echo "${USERNAME} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

USER ${NEW_USERNAME}

