# Complete docker-compose service description

Start Nginx service and use as proxy to serve multiple projects using ssl.

The goal here is to describe the services in only one file and to start them with one command:

```
$ docker-compose up
```

To start Nginx and projects services from separate docker-compose.yml files:

```
$ docker-compose -f nginx/docker-compose.yml -f project1/docker-compose.yml -f project2/docker-compose.yml up
```

All relative paths (bind mounts) inside any of this .yml files are relative to the first file in the command!

```
When you use multiple configuration files, you must make sure all paths in the files are relative to the base Compose file (the first Compose file specified with -f).
```

https://docs.docker.com/compose/extends/#understanding-multiple-compose-files

## Images (Dockerfile.nodejs)

This is multi-staged build
Dockerfile.nodejs uses base image of Ubuntu 18.04 by default.
On top of it - node.js v16.13.1 is installed
No default ENTRYPOINT.

Build stages are names as:

base,
nodejs

To build only base part:

```
$ docker build --target base -f Dockerfile.nodejs -t nodejs:base .
```

Only Ubuntu (by default) will be installed with:
curl, wget, xz-utils, sudo, iputils-ping, openssl

and username with the default password will be created.

### Defaults are:

os="ubuntu:18.04"
username="galio"
password="1"
nodeversion="16.13.1"

To overwrite the default on build, pass new values:

--build-arg os=ubuntu:20.04
--build-arg username=admin
--build-arg password=12345
--build-arg nodeversion=8.10.0

Example build command:

```
$ docker build --build-arg os=ubuntu:20.04 --build-arg username=admin --build-arg password=12345 --build-arg nodeversion=16.13.1 -f ./Dockerfile.nodejs -t nodejs:base .
```

### Example: Create new container and login in bash

Since CMD is set to /bin/bash, you can:

```
$ docker run -it node:base 
```

This will start new container and default CMD command will be fired, giving access to a bash shell inside the fresh created container.

## Network

Network with name: main-network is set as default for the services described in this single.yml file.

## Nginx

Nginx uses its official image.

Nginx also has its own docker-compose.yml inside ./nginx directory, Used when Proxy and the projects are started separately.

### Configs

./nginx/nginx.conf, mounted in  /etc/nginx/nginx.conf
./nginx/certs, mounted in /etc/nginx/certs

How certs are generated, see: ./nginx/certs/README.md


## Example services

Each project service can have its own docker-compose.yml file inside project root (for ex.). In this example both services use same image to create 2 different containers.
