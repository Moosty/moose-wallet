# Moose Wallet
[![Appvor Status](https://ci.appveyor.com/api/projects/status/corbifex/moose-wallet/branch/testnet-development?svg=true)](https://ci.appveyor.com/project/corbifex/moose-wallet)
[![Build Status](https://travis-ci.org/Moosty/moose-wallet.svg?branch=testnet-development)](https://travis-ci.org/Moosty/moose-wallet)
[![Coverage Status](https://coveralls.io/repos/github/Moosty/moose-wallet/badge.svg?branch=master)](https://coveralls.io/github/Moosty/moose-wallet?branch=master)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

## Development

```
git clone https://github.com/Moosty/moose-wallet.git
cd moose-wallet
npm install
npm run dev
```

Open http://localhost:8080

## Build

```
npm run build
```

## Electron

### Start

Start the Electron client.

```
npm run start
```

### Windows

Build package for Windows.

```
npm run dist:win
```

### Mac OS X

Build package for Mac OS X.

```
npm run dist:mac
```

### Linux

Build package for Linux.

```
npm run dist:linux
```

## Run unit tests

### Single run
```
npm run test
```

### Run each time a file changes
```
npm run test-live
```

## Run end-to-end tests

### Setup

To setup protractor as described on http://www.protractortest.org/#/ run:

```
npm install -g protractor
webdriver-manager update
webdriver-manager start
```

Setup a moose test node to run on localhost:4000 as described in https://github.com/Moosty/moose-node#tests

Make sure that the Moose version of the node matches version in https://github.com/Moosty/moose-wallet/blob/master/src/app/services/peers/peer.js#L16

### Run

Start the development version of moose-wallet:

```
npm run dev
```

Run the protractor tests (replace `~/git/moose-node/` with your path to moosecoin core):

```
./e2e-test-setup.sh ~/git/moose-node/
npm run e2e-test
```

## Authors

- Ricardo Ferro <ricardo.ferro@gmail.com>
- Oliver Beddows <oliver@lightcurve.io>
- Vít Stanislav <vit@lightcurve.io>
- Tobias Schwarz <tobias@lightcurve.io>
- Ali Haghighatkhah <ali@lightcurve.io>
- Sander <sander@moosty.com>
## License

Copyright © 2017 MooseCoin  
Copyright © 2016-2017 Lisk Foundation

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the [GNU General Public License](https://github.com/LiskHQ/lisk-nano/tree/master/LICENSE) along with this program.  If not, see <http://www.gnu.org/licenses/>.

***

This program also incorporates work previously released with lisk-nano `0.1.2` (and earlier) versions under the [MIT License](https://opensource.org/licenses/MIT). To comply with the requirements of that license, the following permission notice, applicable to those parts of the code only, is included below:

Copyright © 2017 MooseCoin
Copyright © 2016-2017 Lisk Foundation
Copyright © 2015 Crypti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
