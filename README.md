# Discord Birthday Role Bot

A Discord bot that assigns members a birthday role based on their account creation date or server join date.

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

> Don't forget to give your bot the `Manage Roles` permission!

2. Download this widget and move it into the [src/widgets](https://github.com/peterthehan/create-discord-bot/blob/master/src/widgets/) folder.

3. Open [config.js](https://github.com/peterthehan/discord-birthday-role-bot/blob/master/config.js) to configure your own settings:

```js
guildRoleMap: {
  'GUILD_ID': {
    account: 'ACCOUNT_BIRTHDAY_ROLE_ID',
    server: 'SERVER_BIRTHDAY_ROLE_ID'
  },
  // ...Add as many guild-role mappings as you want.
}
```

4. `npm start` to start the bot.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
