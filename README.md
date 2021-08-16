# Discord Birthday Role Bot

[![Discord](https://discordapp.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that assigns members a birthday role based on their account creation date or server join date.

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

   > Don't forget to give your bot the `Manage Roles` permission!

2. Download this bot and move the `src-discord-birthday-role-bot` folder into the [/src/bots](https://github.com/peterthehan/create-discord-bot/tree/master/src/bots) folder from step 1.

   > Run `npm i -s cron@^1.8.2 @types/cron@^1.7.3` to install this widget's dependencies.

3. Open [config.json](./src-discord-birthday-role-bot/config.json) to configure your own settings:

   ```json
   [
     {
       "guildId": "258167954913361930",
       "accountBirthdayRoleId": "606324811068735489",
       "serverBirthdayRoleId": "606262166672113675",
       "daysToLookBack": 1,
       "daysToLookForward": 1,
       "timezone": "America/Los_Angeles",
       "cronExpression": "0 0 20 * * *"
     }
   ]
   ```

   Add as many rules as you want to configure for other servers.

   - `guildId` is the server id.
   - `accountBirthdayRoleId` is the role id assigned to users with an account birthday.
   - `serverBirthdayRoleId` is the role id assigned to members with a server birthday.
   - Birthday roles are assigned if the birthday falls between the date range created by `daysToLookBack` and `daysToLookForward` using the current date (excludes "0th" birthdays).
   - `timezone` is the timezone you wish to localize your `cronExpression` to.
   - `cronExpression` is the interval at which the birthday checks are done.

   Some useful tools:

   - [Moment Timezone](https://momentjs.com/timezone): find your `timezone` string.
   - [crontab guru](https://crontab.guru): build your `cronExpression`. Note that the tool does not support seconds but this bot configuration does.

4. `npm start` to run the bot.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
