# react-apollo-mutations-status

[![npm](https://img.shields.io/npm/v/react-apollo-mutations-status.svg?style=flat-square)](https://www.npmjs.com/package/react-apollo-mutations-status)
[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD%203%20Clause-brightgreen.svg?style=flat-square)](https://opensource.org/licenses/BSD-3-Clause)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

[![David](https://img.shields.io/david/yldio/react-apollo-mutations-status.svg?style=flat-square)](https://david-dm.org/ramitos/react-apollo-mutations-status)
[![David](https://img.shields.io/david/dev/yldio/react-apollo-mutations-status.svg?style=flat-square)](https://david-dm.org/ramitos/react-apollo-mutations-status?type=dev)

Adds `loading` and `error` properties to apollo mutations. Based on https://gist.github.com/ctavan/7219a3eca42f96a5c5f755319690bda7

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [License](#license)

## Install

```
yarn add --dev react-apollo-mutations-status
```

## Usage

```js
import { graphql, compose } from 'react-apollo';
import mutationsStatus from 'react-apollo-mutations-status';
import React from 'react';

const Register = ({ register }) => (
  <form onSubmit={register.exec}>
    {register.loading && <div>Loading…</div>}
    {register.error && <div>{register.error}</div>}
    <button type="submit" />
  </form>
);

export default compose(
  graphql(GQL_MUTATION, { name: 'register' }),
  mutationsStatus(['register'])
)(Register);
```

```js
import { graphql, compose } from 'react-apollo';
import mutationsStatus from 'react-apollo-mutations-status';
import React from 'react';

const Register = ({ mutate, loading, error }) => (
  <form onSubmit={mutate.exec}>
    {loading && <div>Loading…</div>}
    {error && <div>{error}</div>}
    <button type="submit" />
  </form>
);

export default compose(
  graphql(GQL_MUTATION),
  mutationsStatus()
)(Register);
```

## License

BSD-3-Clause
