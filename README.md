# reducer-interface

## Installation

```bash
$ npm install reducer-interface --save
```

## Usage

```js
import reducerInterface from "reducer-interface"
import {
  ADD_USER,
  REMOVE_USER,
  SWITCH_USER
} from "actions/users"
import { initialState, User } from "interfaces/user"

export default reducerInterface(initialState, User, {
  /*
    User - an interface instance, is just prototype for current state class.
    As you know, prototype inherited by all instances of class. And this methods don't copied every time.
    This Is trick. Also you methods encapsulated, so it don't called from outer scope.

    Use 'this' in case as current state.
  */

  [ADD_USER]({ user }) {
    this.addUser(user)
  },

  /*
    ADD_USER - action type constant. This handler will be triggered for the same action, as in 'switch..case' construction.
    'user' - user data passed to action as action.user
  */

  [REMOVE_USER]({ id }) {
    this.removeUser(id)
  },

  [SWITCH_USER]({ user, id })
    this
      .removeUser(id)
      .addUser(user)
  }

  /*
    Also you can use chain, if return 'this' in interface methods.
    Is useful in massive reducers, where you have a lot of properties and functions to control/change it.
    Here you can using just methods to change it. Interface takes control and doing 'dirty' work to update the state.
    Each state is unique. Don't care about you update the state. In new case it will be new instance with unique state sata.
  */
}
```

## Interfaces

```js
export const initialState = {
  users: [ ],
  count: 0
}

export class Users {
  /*
    Here you have one method, what should not be replaced - is 'merge'.
    It take one argument: is an object what you want merge with current 'this' state instance.
    And is returning 'this', it can be used for chain in methods.
    Is merge deep, also merging arrays. By be care with arrays, because it merge arrays by indexes.
    More information about how it work here: [super-merge](https://www.npmjs.com/package/super-merge).

    Example:
      setUser(user) {
        this.isFetching = false

        return this.merge(user)
      }

      Where 'this' is an unique state object, like:
        {
          isFetching: true,
          id: null,
          username: null
        }

      After state is merged, you will have the something like:
        {
          isFetching: false,
          id: 0,
          username: 'test username'
        }

      Or you can doing somelike:
        return this.merge({
          isFetching: false,
          ...user,
          isRequiredAdditionalData: true,
          ...
        })

      Sometime is be better when you have many props to update.
  */

  addUser (user) {
    this.users.push(user)

    return this.updateCount()
  }

  removeUser (id) {
    const userIndex = this.users.findIndex((user) => user.id === id)

    this.users.splice(userIndex, 1)

    return this.updateCount()
  }

  updateCount () {
    this.count = this.users.length

    return this
  }
}
```

---

## See also

[![Evol Intent - Middle Of The Night](http://i.imgur.com/JumESHO.jpg)](https://www.youtube.com/watch?v=FRDSG_8PuE8)