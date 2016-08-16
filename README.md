# safe-env

> Returns all environment variables with sensitive values hidden, great for logs

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

When you start the server, and something does not work, are you sure that all expected
environment variables were set correctly? Can you quickly dump them to a console or send them
to the logging service? Can you hide the sensitive information, like passwords or tokens?

## Example

```js
const safeEnv = require('safe-env')
const sensitive = ['TOKEN', 'API-KEY']
console.log(safeEnv(sensitive))
/*
{
  FOO: 'foo value',
  BAR: 'bar value',
  TOKEN: '<hidden>'
}
*/
```

Seems we forgot to set `API-KEY`!

## Options

You can pass an object to be filtered instead of using `process.env`

```js
const result = safeEnv(sensitive, myObject)
```

## Details

* Only all uppercase keys from `process.env` are printed,
  filtering out lots of noise, like `npm_...` keys.
* There is a [default list](src/private-keys.js) of sensitive keys, if you do not pass any.
* Only top level properties are replaced

## Custom predicate function

You can pass a custom predicate function that returns true based on the
property name to filter custom values. For example to hide all properties
with string 'token' in them

```js
const o = {
  foo: 42,
  myToken: 'secret',
  'another-token': 'very secret'
}
const tokenName = (key) => key.toLowerCase().indexOf('token') !== -1
const out = safeEnv(tokenName, o)
// out has both 'myToken' and 'another-token' values replaced
// with '<hidden>'
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2016

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/safe-env/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/safe-env.svg?downloads=true
[npm-url]: https://npmjs.org/package/safe-env
[ci-image]: https://travis-ci.org/bahmutov/safe-env.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/safe-env
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
