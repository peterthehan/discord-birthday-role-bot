# Discord Birthday Role Bot

A Discord bot that assigns members a birthday role based on their account creation date or server join date.

## Setup

1. Adapt and follow the steps found in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

> Follow the [Create Bot](https://github.com/peterthehan/create-discord-bot#create-bot) and [Get Bot](https://github.com/peterthehan/create-discord-bot#get-bot) sections. Remember to replace with the correct project name in step 1 of the [Get Bot](https://github.com/peterthehan/create-discord-bot#get-bot) section!

2. Open [src/config.js](https://github.com/peterthehan/discord-birthday-role-bot/blob/master/src/config.js) to configure your own settings:

```js
guildRoleMap: {
  'GUILD_ID': {
    account: 'ACCOUNT_BIRTHDAY_ROLE_ID',
    server: 'SERVER_BIRTHDAY_ROLE_ID'
  },
  // ...Add as many guild-role mappings as you want.
}
```

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
