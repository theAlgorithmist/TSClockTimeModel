# Typescript Math Toolkit Clock Time Model

This is a port of some very old Actionscript code that I wrote a long time ago in a galaxy far, far away ... well, not exactly, but it was a very long time ago :)

This Typescript class performs numerous operations involving clock time and is useful for EdTech applications as well as dashboards involving time computations.

Enjoy!


Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Typescript: 2.4.3

Version: 1.0


## Installation

Installation involves all the usual suspects

  - npm and gulp installed globally
  - Clone the repository
  - npm install
  - get coffee (this is the most important step)


### Building and running the tests

1. gulp compile

2. gulp test

The test suite is in Mocha/Chai and specs reside in the _test_ folder.


### Usage

A clock time model may be created directly or instantiated from a factory function, as shown below.
 

```
const AM: boolean          = true;
const PM: boolean          = false;
const IS_24_HOUR: boolean  = true;
const NOT_24_HOUR: boolean = false;
.
.
.
const clock: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
clock.is24Hour = NOT_24_HOUR;
clock.update(11, 23, 0, AM);

const clock2: TSMT$ClockTimeModel = TSMT$ClockTimeModel.factory(6, 52, 0, NOT_24_HOUR, PM);
const time1: string               = clock.toString();    // '11:23 AM'
const time2: string               = clock2.toString()    // '6:52 PM'

const hours: number   = clock.getElapsedHours(clock2);   // 7
const minutes: number = clock.getElapsedMinutes(clock2); // 29;
const seconds: number = clock.getElapsedSeconds(clock2); // 0
  
```

The public API of the _TSMT$ClockTime_ class is

```
public static factory(hours: number=0, minutes: number=0, seconds: number=0, is24Hour: boolean=false, isAM: boolean=true): TSMT$ClockTimeModel
public get is24Hour(): boolean
public set is24Hour(is24Hour: boolean)
public get isAM(): boolean
get hours(): number
public get minutes(): number
public get seconds(): number
public get value()
public set value(seconds: number)
public clone(): TSMT$ClockTimeModel
public update(hours: number=0, minutes: number=0, seconds: number=0, isAM: boolean=false): void
public getElapsedHours(clock: TSMT$ClockTimeModel, forward: boolean=true): number
public getElapsedMinutes(clock: TSMT$ClockTimeModel, forward: boolean=true): number
public getElapsedSeconds(clock: TSMT$ClockTimeModel, forward: boolean=true): number
public addSeconds(seconds: number): void
public add(clock: TSMT$ClockTimeModel): TSMT$ClockTimeModel
public subtract(clock: TSMT$ClockTimeModel): TSMT$ClockTimeModel
public addTo(clock: TSMT$ClockTimeModel): void
public subtractFrom(clock: TSMT$ClockTimeModel): void
public toString(): String

```

Refer to the specs in the _test_ folder for more usage examples.

License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <http://algorithmist.net>

