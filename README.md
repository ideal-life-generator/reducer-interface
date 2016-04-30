# reducer-interface

## Installation

```bash
$ npm install reducer-interface --save
```

## Usage

```js
import reducerInterface from 'reducer-interface'
import {
  JOIN_PLAYER,
  REMOVE_PLAYER,
  REQUEST_SESSION,
  SESSION_RESPONSE,
  REQUEST_ROUND,
  ROUND_RESPONSE
} from 'actions/game'

class Game {
  static maxPlayers = 4

  constructor() {
    this.players = []
    this.playersCount = 0
    this.gameIsReadyToStart = false
    this.requestSession = false
    this.sectionOfplayersIsFull = false
    this.gameIsStarted = false
    this.isMissedPlayers = false
    this.requestRound = false
    this.currentRound = null
  }

  joinPlayer(player) {
    if (!this.gameIsStarted && this.playersCount < Game.maxPlayers) {
      this.players.push(player)
      this._updatePlayersCount()

      if (this.playersCount === Game.maxPlayers) this.gameIsReadyToStart = true
      else if (this.playersCount < Game.maxPlayers) this.isMissedPlayers = false
    } else if (this.playersCount === Game.maxPlayers) {
      this.sectionOfplayersIsFull = true
    }
  }

  removePlayer(id) {
    if (!this.gameIsStarted) {
      const playerIndex = this.players.findIndex(({ id: currentPlayerId }) => currentPlayerId === id)

      this.players.splice(playerIndex, 1)
      this._updatePlayersCount()

      if (this.playersCount < Game.maxPlayers) {
        this.sectionOfplayersIsFull = this.sectionOfplayersIsFull && false
        this.gameIsReadyToStart = this.gameIsReadyToStart && false
      }
    }
  }

  startGame(sessionId) {
    this.sessionId = sessionId

    if (this.playersCount === Game.maxPlayers && this.questionsIsReady) {
      this.gameIsStarted = true
      this.sectionOfplayersIsFull = false
    } else if (this.playersCount !== Game.maxPlayers) {
      if (this.playersCount < Game.maxPlayers) {
        this.isMissedPlayers = true
      }
    }
  }

  setCurrentRound(round) {
    this.currentRound = round
  }

  _updatePlayersCount() {
    this.playersCount = this.players.length
  }

  // ...
}

export default reducerInterface(Game, {
  [JOIN_PLAYER]({ player }) {
    this.joinPlayer(player)
  },

  [REMOVE_PLAYER]({ playerId }) {
    this.removePlayer(playerId)
  },

  [REQUEST_SESSION]() {
    this.requestSession = true
  },

  [SESSION_RESPONSE](sessionId) {
    this.requestSession = false

    this.startGame(sessionId)
  },

  [REQUEST_ROUND]() {
    this.requestRound = true
  },

  [ROUND_RESPONSE](round) {
    this.requestRound = false

    this.setCurrentRound(round)
  }

  // ...
})
```

## Methods

#### merge(data)

Can be used in cases manually or in Interface methods.

```js
// ...

[MERGING_MANUALLY]({ data }) {
  this.merge(data)
}

// ... or ...

[MERGING_IN_METHOD]({ data }) {
  this.update(data)
}

class Example {
  // ...

  update(data) {
    this.merge(data)
  }

  // ...
}
```

Merging data with current state. See more [super-merge](https://www.npmjs.com/package/super-merge).

[![Evol Intent - Middle Of The Night](http://i.imgur.com/JumESHO.jpg)](https://www.youtube.com/watch?v=FRDSG_8PuE8)