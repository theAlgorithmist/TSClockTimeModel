/** Copyright 2018 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Specs for Typescript Math Toolkit Clock Time Model

// test functions/classes
import {TSMT$ClockTimeModel} from "../src/ClockTimeModel";

import * as Chai from 'chai';

const expect = Chai.expect;

// Test Suites
describe('Clock Time Model: TSMT$ClockModel', () =>
{
  const clock: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
  const AM: boolean                = true;
  const PM: boolean                = false;
  const IS_24_HOUR: boolean        = true;
  const NOT_24_HOUR: boolean       = false;

  it('properly constructs a new Clock Time model', () =>
  {
    expect(clock.value).to.equal(0);
    expect(clock.is24Hour).to.be.true;
    expect(clock.isAM).to.be.true;
  });

  it('is24Hour false, 3:45:02 AM', () =>
  {
    clock.is24Hour = NOT_24_HOUR;
    clock.update(3, 45, 2, AM);

    expect(clock.toString()).to.equal('3:45:02 AM');
  });

  it('is24Hour false, 12:35:52 AM', () =>
  {
    clock.is24Hour = NOT_24_HOUR;
    clock.update(12, 35, 52, AM);

    expect(clock.toString()).to.equal('12:35:52 AM');
  });

  it('is24Hour false, 12:08 PM', () =>
  {
    clock.is24Hour = NOT_24_HOUR;
    clock.update(12, 8, 0, PM);

    expect(clock.toString()).to.equal('12:08 PM');
  });

  it('is24Hour false, 13:35:52 PM -> 1:35:52 PM', () =>
  {
    clock.is24Hour = NOT_24_HOUR;
    clock.update(13, 35, 52, PM);

    expect(clock.toString()).to.equal('1:35:52 PM');
  });

  it('(24-hour format), 3:45:02', () =>
  {
    clock.is24Hour = IS_24_HOUR;
    clock.update(3, 45, 2);

    expect(clock.toString()).to.equal('03:45:02');
  });

  it('(24-hour format), 00:35:07', () =>
  {
    clock.is24Hour = IS_24_HOUR;
    clock.update(0, 35, 7);

    expect(clock.toString()).to.equal('00:35:07');
    expect(clock.value).to.equal(2107);
  });

  it('factory test #1', () =>
  {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(11, 23, 0, AM);

    const clock2: TSMT$ClockTimeModel = TSMT$ClockTimeModel.factory(6, 52, 0, NOT_24_HOUR, PM);
    expect(clock.toString()).to.equal('11:23 AM');
    expect(clock2.toString()).to.equal('6:52 PM')

    expect(clock.getElapsedHours(clock2)).to.equal(7);
    expect(clock.getElapsedMinutes(clock2)).to.equal(29);
    expect(clock.getElapsedSeconds(clock2)).to.equal(0);
  });

  it('factory test #2', () =>
  {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(10, 53, 0, AM);

    const clock2: TSMT$ClockTimeModel = TSMT$ClockTimeModel.factory(3, 57, 0, NOT_24_HOUR, PM);
    expect(clock.toString()).to.equal('10:53 AM');
    expect(clock2.toString()).to.equal('3:57 PM');

    expect(clock.getElapsedHours(clock2)).to.equal(5);
    expect(clock.getElapsedMinutes(clock2)).to.equal(4);
    expect(clock.getElapsedSeconds(clock2)).to.equal(0);
  });

  it('factory test #3', () =>
  {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(10, 53, 0, AM);

    const clock2: TSMT$ClockTimeModel = TSMT$ClockTimeModel.factory(3, 33, 0, NOT_24_HOUR, PM);
    expect(clock.toString()).to.equal('10:53 AM');
    expect(clock2.toString()).to.equal('3:33 PM');

    expect(clock.getElapsedHours(clock2)).to.equal(4);
    expect(clock.getElapsedMinutes(clock2)).to.equal(40);
    expect(clock.getElapsedSeconds(clock2)).to.equal(0);
  });

  it('factory test #4', () =>
  {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(12, 50, 0, AM);

    const clock2: TSMT$ClockTimeModel = TSMT$ClockTimeModel.factory(12, 34, 0, NOT_24_HOUR, PM);
    expect(clock.toString()).to.equal('12:50 AM');
    expect(clock2.toString()).to.equal('12:34 PM');

    expect(clock.getElapsedHours(clock2)).to.equal(11);
    expect(clock.getElapsedMinutes(clock2)).to.equal(44);
    expect(clock.getElapsedSeconds(clock2)).to.equal(0);
  });

  it('factory test #5', () =>
  {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(3, 42, 0, PM);

    const clock2: TSMT$ClockTimeModel = TSMT$ClockTimeModel.factory(6, 18, 0, NOT_24_HOUR, AM);
    expect(clock.toString()).to.equal('3:42 PM');
    expect(clock2.toString()).to.equal('6:18 AM');

    expect(clock.getElapsedHours(clock2)).to.equal(14);
    expect(clock.getElapsedMinutes(clock2)).to.equal(36);
    expect(clock.getElapsedSeconds(clock2)).to.equal(0);
  });

  it('factory test #6', () =>
  {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(12, 0, 0, PM);

    const clock2: TSMT$ClockTimeModel = TSMT$ClockTimeModel.factory(12, 0, 0, NOT_24_HOUR, PM);
    expect(clock.toString()).to.equal('12:00 PM');
    expect(clock2.toString()).to.equal('12:00 PM');

    expect(clock.getElapsedHours(clock2)).to.equal(0);
    expect(clock.getElapsedMinutes(clock2)).to.equal(0);
    expect(clock.getElapsedSeconds(clock2)).to.equal(0);
  });

  it('factory test #7', () =>
  {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(12, 0, 0, PM);

    const clock2: TSMT$ClockTimeModel = TSMT$ClockTimeModel.factory(12, 0, 0, NOT_24_HOUR, AM);
    expect(clock.toString()).to.equal('12:00 PM');
    expect(clock2.toString()).to.equal('12:00 AM');

    expect(clock.getElapsedHours(clock2)).to.equal(12);
    expect(clock.getElapsedMinutes(clock2)).to.equal(0);
    expect(clock.getElapsedSeconds(clock2)).to.equal(0);
  });

  it('(24-hour) elapsed time #1', () =>
  {
    clock.is24Hour = IS_24_HOUR;

    clock.update(19, 17, 20);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour                   = NOT_24_HOUR;

    clock2.update(22, 31, 0);

    expect(clock.toString()).to.equal('19:17:20');
    expect(clock2.toString()).to.equal('10:31 PM');

    expect(clock.getElapsedHours(clock2)).to.equal(3);
    expect(clock.getElapsedMinutes(clock2)).to.equal(13);
    expect(clock.getElapsedSeconds(clock2)).to.equal(40);
  });

  it('(24-hour) elapsed time #2', () =>
  {
    clock.is24Hour = IS_24_HOUR;

    clock.update(10, 20);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour                   = NOT_24_HOUR;

    clock2.update(22, 4, 0);

    expect(clock.toString()).to.equal('10:20:00');
    expect(clock2.toString()).to.equal('10:04 PM');

    expect(clock.getElapsedHours(clock2)).to.equal(11);
    expect(clock.getElapsedMinutes(clock2)).to.equal(44);
    expect(clock.getElapsedSeconds(clock2)).to.equal(0);
  });

  it('addition test #1', () => {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(10, 13, 0, AM);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = IS_24_HOUR;

    clock2.update(2, 11, 0);

    expect(clock.toString()).to.equal('10:13 AM');
    expect(clock2.toString()).to.equal('02:11:00');

    expect(clock.add(clock2).toString()).to.equal('12:24 PM');
  });


  it('addition test #2', () => {
    clock.is24Hour = IS_24_HOUR;

    clock.update(12, 53, 0);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = IS_24_HOUR;

    clock2.update(8, 22, 0);

    expect(clock.toString()).to.equal('12:53:00');
    expect(clock2.toString()).to.equal('08:22:00');

    expect(clock.add(clock2).toString()).to.equal('21:15:00');
  });

  it('addition test #3', () => {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(10, 20, 0, PM);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = IS_24_HOUR;

    clock2.update(6, 18, 0);

    expect(clock.toString()).to.equal('10:20 PM');
    expect(clock2.toString()).to.equal('06:18:00');

    const clock3: TSMT$ClockTimeModel = clock.add(clock2);
    clock3.is24Hour                   = NOT_24_HOUR;

    expect(clock3.toString()).to.equal('4:38 AM');
  });

  it('addition test #4', () => {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(12, 31, 0, AM);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = IS_24_HOUR;

    clock2.update(1, 29, 0);

    expect(clock.toString()).to.equal('12:31 AM');
    expect(clock2.toString()).to.equal('01:29:00');

    const clock3: TSMT$ClockTimeModel = clock.add(clock2);
    clock3.is24Hour                   = NOT_24_HOUR;

    expect(clock3.toString()).to.equal('2:00 AM');
  });

  it('addition test #5', () => {
    clock.is24Hour = IS_24_HOUR;

    clock.update(0, 31, 0);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = IS_24_HOUR;

    clock2.update(1, 29, 0);

    expect(clock.toString()).to.equal('00:31:00');
    expect(clock2.toString()).to.equal('01:29:00');

    const clock3: TSMT$ClockTimeModel = clock.add(clock2);

    expect(clock3.toString()).to.equal('02:00:00');
  });

  it('subtraction test #1', () => {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(6, 31, 0, AM);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = IS_24_HOUR;

    clock2.update(1, 18, 0);

    expect(clock.toString()).to.equal('6:31 AM');
    expect(clock2.toString()).to.equal('01:18:00');

    const clock3: TSMT$ClockTimeModel = clock.subtract(clock2);
    clock3.is24Hour                   = IS_24_HOUR;

    expect(clock3.toString()).to.equal('05:13:00');
  });

  it('subtraction test #2', () => {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(12, 45, 0, PM);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = NOT_24_HOUR;

    clock2.update(5, 51, 0, AM);

    expect(clock.toString()).to.equal('12:45 PM');
    expect(clock2.toString()).to.equal('5:51 AM');

    const clock3: TSMT$ClockTimeModel = clock.subtract(clock2);
    clock3.is24Hour                   = IS_24_HOUR;

    expect(clock3.toString()).to.equal('06:54:00');
  });

  it('subtraction test #3', () => {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(5, 51, 0, AM);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = IS_24_HOUR;

    clock2.update(8, 22, 0, AM);

    expect(clock.toString()).to.equal('5:51 AM');
    expect(clock2.toString()).to.equal('08:22:00');

    const clock3: TSMT$ClockTimeModel = clock.subtract(clock2);
    clock3.is24Hour                   = IS_24_HOUR;

    expect(clock3.toString()).to.equal('21:29:00');
  });

  it('subtractFrom test', () => {
    clock.is24Hour = NOT_24_HOUR;

    clock.update(2, 45, 0, AM);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = IS_24_HOUR;

    clock2.update(1, 0, 0, AM);

    clock.subtractFrom(clock2);

    expect(clock.toString()).to.equal('1:45 AM');
  });


  it('addTo test', () => {
    clock.is24Hour = IS_24_HOUR;

    clock.update(0, 31, 0);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = IS_24_HOUR;

    clock2.update(1, 29, 0);

    expect(clock.toString()).to.equal('00:31:00');
    expect(clock2.toString()).to.equal('01:29:00');

    clock.addTo(clock2);

    expect(clock.toString()).to.equal('02:00:00');
  });

  it('clone test', () => {
    clock.is24Hour = IS_24_HOUR;

    clock.update(0, 31, 0);

    const clock2: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();
    clock2.is24Hour = IS_24_HOUR;

    clock2.update(1, 29, 0);

    expect(clock.toString()).to.equal('00:31:00');
    expect(clock2.toString()).to.equal('01:29:00');

    clock.addTo(clock2);

    const clock3: TSMT$ClockTimeModel = clock.clone();

    expect(clock3.toString()).to.equal('02:00:00');
    expect(clock3.is24Hour).to.equal(clock.is24Hour);
    expect(clock3.isAM).to.equal(clock.isAM);
    expect(clock3.value).to.equal(clock.value);
  });

  it('add seconds test', () =>
  {
    clock.is24Hour = NOT_24_HOUR;

    clock.update( 1, 20, 18, AM);
    clock.addSeconds(10);

    expect(clock.toString()).to.equal('1:20:28 AM')
  });
});