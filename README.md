# Monobot

Monobot is a Discord bot with the ability to kick, mute, and ban members from your server, with a few other fun commands (more coming soon!). It's primary functionality is to log these events to a spreadsheet using Google's scripts. Every time a moderator action is performed on your server, a log is sent to a database and you can run a Google Sheets script to pull data into your spreadsheet containing all your moderator logs in a format you can organize to your needs. No more looking through that hard to read audit log just to make sure your community managers are doing their job!

I am not making this a "public" bot on Discord's list, since this is just meant to be a small project tha tothers can modify the code or add their own commands as they see fit. 

## Getting Started

This bot requires a server to be hosted, and reads a MongoDB database of logs. If you need to read about how to host a server either on your own machine or elsewhere, you can read about that [here](https://www.websitebuilderexpert.com/hosting-websites/). The url will only be used to read and add new data to the database. I recommend just picking up a cheap VPS somewhere. 

If you are hosting it on your own machine, keep in mind the server (and bot!) will only run whenever you tell it to, and your computer does need to be ON. 

### Prerequisites

This project at a minimum requires NodeJS, MongoDB and Google Scripts to run. You can download and read about it on their website. [Node.js](https://nodejs.org/en/). 
Wherever you are hosting your server, more than likely they will have a tutorial about getting NodeJS and NPM (Node Package Manager) installed and set up to run. You will likely need to run some terminal commands, so I recommend being comfortable with that. 

* Once it's installed, navigate to the directory where the files are hosted, and have node run `npm install` in the terminal. This will read the 'package.json' file to install our node package dependencies, which are outlined below.

MongoDB is a lightweight "no-SQL" database where our logs will be stored to be read. You can download and read about it on their website [MongoDB](https://www.mongodb.com/). Similar to Node, wherever you are hosting your server, they'll likely have a guide to installing certain programs to run. 

Google Scripts is a tool that is used in Google Docs. It's really easy to use if you know some code already - I've included a file (sheets-scrpot.js) in the repository that has all the code you'll need to enter in Google Scripts. 

Once you have these 3 items installed and set up, we can start setting up our important config files.

### Setting up the Discord bot

First things first, if you want to run a bot, we need to actually create one in Discords development portal. Follow these steps:

1. Login to Discords website. (Make sure it's their actual website, and not the actual chatting app!) https://discordapp.com
2. Click the "Developers" drop-down menu and navigate to the Developer Portal
3. Click on "Applications"
4. Click "Create an Application"
5. You can add a custom name and icon here if you want, but click on the "Bot" tab on the left.
6. Add a bot! Give it a username and an avatar if you like.

The "token" item that you see here is essentially your bots password - do NOT give this information out, otherwise anyone with it can abuse your bots permissions in any discord they're in. If you ever fear you've accidentally leaked this token, you can refresh it here and nullify any older versions that may have been leaked.

---

So you've made your bot, but to actually add it to your server, you need a special invite link that is made with your bot's "Client ID". Your bot's Client ID is found on the "General Information" tab on it's application page in the Discord developer portal. We just need to stick it in a url with a couple parameters to get a proper invite link that you can use for your server.

I recommend using [this](https://discordapi.com/permissions.html) website to generate a url with the right permissions parameters you want the bot to have upon joining. For minimum functionality, you'll need to have the following items checked:

* Manage Server
* Manage Roles
* Manage Channels
* Kick Members
* Ban Members
* Manage Messages
* Read Messages
* Send Messages
* Read Message History

Simply enter in the Client ID at the bottom and you can copy the url it generates at the bottom of the page. Go to this url to invite the bot to your server! It's not going to actually run until we have the code running in node.

## Setting up Configuration

Now that you have a bot actually *in* your server, we need to set up a configuration file to make sure your bot has everything it needs to run smoothly. In the repo, there is a "config.json" file. This file is going to be referenced throughout the actual code. When adding your specific information, make sure it is within the quotes. It takes 4 parameters:

* Prefix: The prefix character(s) you want your bot to look for before executing a command; typical ones are ! or $. You can make this more than one character long if you like.
* Token: Your bot's auth token we looked at earlier in the developer portal. This is what will actually log your bot in to discord.
* API_URL: The URL the server/database is hosted at. 
* botRole: The name of the role you want the users of the bot to have. It can be predefined, or you can make a new one. 

If you're making edits to the code and want to add things you might want to be made available to the public when sharing code, you can add them here as additional parameters and reference them in the code manually.

### Made With

[Discord.js](https://www.npmjs.com/package/discord.js) - For interacting with the Discord API.
[Axios](https://www.npmjs.com/package/axios) - For promise based http/xml requests to and from the server.
[Dotenv](https://www.npmjs.com/package/dotenv) - For storing config in a separate environemnt from our code.
[Express](https://www.npmjs.com/package/express) - For setting up our server in a NodeJS environment.
[Mongoose](https://www.npmjs.com/package/mongoose) - For interacting with our MongoDB database.
[ms](https://www.npmjs.com/package/ms) - Converts time formates to milliseconds.

### Running the Bot

After making sure our dependencies are installed by running 

```javascript
npm install
```

you can run your bot by navigating to the directory where the files are located at and running "node monobot.js" or whatever you've renamed the file to. Now you should see the bot running in your Discord server.

## Google Scripts

The final step is to create our spreadsheet where your logs will be stored. Make sure you have a Google Sheet set up with the columns like so:

| Moderator     | Action        | User    | Reason    | Time           |
| ------------- |:-------------:| -------:| ---------:| --------------:|

Inside the Google Sheets file you want to use, go to Tools -> Script Editor. This will open a new tab. Copy and paste the code from "sheets-script.js" in the repo into this code editor here. You will need to add your servers URL towards the top to replace the placeholder text there. Save, and then run the code. It should populate the sheet with code entries that haven't been put in already. 

To run it, hit the "Run" button. It looks like a "Play" button on a media app, and is next to the little bug above the actual code. This script in particular looks for the latest timestamp entry that's already in the sheet, and will only pull in new logs if their timestamp is at a later date than the latest one already in there. This way we're not appending new data every time the script runs! 

## Executing Commands

Currently the bot accepts 3 moderator related commands. Each command accepts either a Discord user ID or a tagged user. Keep in mind your prefix may vary depending on the settings you enter in the config file - 

Kick - Kicks a user from the server
ex)
!kick user reason

Ban - Bans a user from the server indefinitely
!ban user reason
* Bans must be manually removed - might add an unban command later on.

Mute - Mutes a user for a specified time
!mute user duration reason
* Duration is referenced using certain notation:
    * 10s - 10 seconds
    * 10m - 10 minutes
    * 10h - 10 hours
    * 10d - 10 days
* Upon executing the mute command, the bot will look for a role specifically named "muted" in your roles. If it doesn't exist, it will make it's own and apply it to the user for the duration. 
* If a "muted" role already exists, it will simply add that role to the user. The bot cannot mute users that have the "manage messages" permission in the server/channel.


## Version

1.0.0

## Authors

JakeD9