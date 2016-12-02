# SIEMonster Interface


## Preparing the environment for development
Make all of the following prerequisites are installed on the development machine:

- Node.js and npm package manager
- Gulp

## Cloning the repository
  
```bash
$ git clone git@github.com:siemonster/Project.git
```

## Running the application on dev environment
You can define PORT env variable before running the application.

```bash
$ bower update
$ npm update
$ node watchman.js
$ PORT=9000 node sever.js
```

### fb-watchman for Linux
On Linux you will need autoconf and automake. You will also need setuptools and may need to install a python-dev or python-devel package.
Source: https://facebook.github.io/watchman/docs/install.html

```bash
$ git clone https://github.com/facebook/watchman.git
$ cd watchman
$ git checkout v4.6.0  # the latest stable release
$ ./autogen.sh
$ ./configure
$ make
$ sudo make install
```

## Deploying the application

```bash
$ git clone git@github.com:siemonster/Project.git
$ cd Project
$ cd containers
$ ./deploy_app_remotely_prepare
$ ./deploy_app
```
