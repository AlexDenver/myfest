# MyFest
> An extract from the Software Requirement Specification Document. 

MyFest is a replacement for traditionally used methods of tracking information at events, these methods of tracking information limit users from accessing info to one at a time as it relies on Paper being passed on from one entity to another, and the probability of loss of paperwork due to misplacement is very high. MyFest is set out to avoid this and many other design issues by making use of networks of systems and data stores to track information. In traditional systems searching records is a tedious task as it requires a person to manually go through every records available and thus being slow, MyFest allows to automate this process by implementing Data Stores and Query for data whenever necessary. This project is an attempt to make a more reliable and time saving system to make lives of entities of the system convenient and less painful.

## Dependency

Meteor depends on NodeJS to work, install NodeJS by
**For Linux**
```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Goto [NodeJS Homepage](http://nodejs.org) to download latest version.

## Getting Started
MyFest Runs on Meteor (a Node.js Framework read more [here](https://www.meteor.com/)).
if you already have Meteor installed go ahead, else run the command below to install Meteor.

**For Linux/OSX**
```
curl https://install.meteor.com/ | sh
```

once you install meteor, you can install all the dependecies of the project by typing,
```
meteor npm install
```

### Starting Instance Locally

Once you have Meteor installed, you can start the Web Application by typing the following command in the terminal when in the directory

```
meteor run
```


## Built With

* [Meteor](http://www.meteor.com/) - The web framework used
* [MongoDB](https://www.mongodb.com/) - Meteor Internally uses MongoDB as Storage
* [AngularJS](https://angularjs.org/) - Templating Engine for the frontend


