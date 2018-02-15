/** 
 * Copyright 2018 Jim Armstrong (www.algorithmist.net)
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

/**
 * Typescript Math Toolkit: A model representing clock time (H:M:S) that performs various operations common to time-based
 * dashboard components.  Also supports 24-hour time.  A clock model never exceeds 24 hours.  The 'value' of this model
 * is the total number of seconds in a 24-hour time block.  Either set the model value directly or calls the update()
 * method to assign individual constituents of the model.  A static factory method is supplied to create a new model
 * from raw values.
 *
 * Individual constituents of a model are not maintained internally; they are computed from the model value
 *
 * @author Jim Armstrong (www.algorithmist.net)
 * 
 * @version 1.0
 */
 export class TSMT$ClockTimeModel
 {
   protected SECONDS_PER_DAY: number;
   protected SECONDS_AT_NOON: number;
   protected SECONDS_PER_HOUR: number;
   protected SECONDS_PER_MINUTE: number;

   protected _seconds: number;       // number seconds since midnight
   protected _is24Hour: boolean;     // true if time reported in 24-hour format

   /**
		* Construct a new {TSMT$ClockTimeModel)
		*
		* @returns {nothing} 24-hour format is true by default
    */
   constructor()
   {
     this.SECONDS_PER_DAY    = 86400;
     this.SECONDS_AT_NOON    = 43200;
     this.SECONDS_PER_HOUR   = 3600;
     this.SECONDS_PER_MINUTE = 60;

     this._seconds  = 0;
     this._is24Hour = true; 
   }

  /**
   * Create a new clock time model from raw data
	 *
	 * @param {number} hours Number of hours in the current clock time
	 * @default 0
	 *
	 * @param {number} minutes Number of minutes in the current clock time
	 * @default 0
	 *
	 * @param {number} seconds Number of seconds in the current clock time
	 * @default 0
	 *
	 * @param {boolean} is24Hour True if input time is in 24-hour format
	 * @default true
	 *
	 * @param {boolean} issAM True if the input time is AM, false if PM - ignored if is24Hour is true.
	 * @default false
	 *
	 * @returns {TSMT$ClockTimeModel} Hours are clipped to [0,23], minutes are clipped to [0,59], and seconds are
	 * clipped to [0,59].
	 */		
   public static factory(hours: number=0,
												 minutes: number=0,
												 seconds: number=0,
												 is24Hour: boolean=false,
												 isAM: boolean=true): TSMT$ClockTimeModel
   {
     const c: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();

     c.is24Hour = is24Hour
     c.update(hours, minutes, seconds, isAM);
			
     return c;
	 }
		  
  /**
	 * Access 24-hour indicator, i.e. whether or not output is supplied in 24-hour format and calls to the update()
	 * method will use 24-hour format.
	 *
	 * @returns {boolean} True if 24-hour format is used for accepting input and formatting output.
	 *
	 */	
	 public get is24Hour(): boolean
	 {
	   return this._is24Hour;
	 }
		  
  /**
	 * Assign whether or not 24-hour format is used
	 * 
	 * @param {boolean} is24Hour True if 24-hour format is to be used in this model.  Subsequent calls to the update()
	 * method will use 24-hour format.
	 * 
	 * @return Nothing
	 */
	 public set is24Hour(is24Hour: boolean)
	 { 
	   this._is24Hour = is24Hour; 
	 }
		  
  /**
   * Access whether or not the current time is AM or PM.
   *
   * @returns {boolean} True if the current time is AM, although not meaningful if time is input and output in
	 * 24-hour format.
	 *
	 */	
	 public get isAM(): boolean
	 { 
	   return this._seconds < 43200;
	 }
		  
  /**
   * Access the number of hours in the current time.
   *
	 * @returns {number} Number of hours in [0,12] if the current model is in period format or [0,23] if the model
	 * is in 24-hour format.
	 */	
	 get hours(): number
	 {
	   let h: number = Math.floor(this._seconds/this.SECONDS_PER_HOUR);

		 return this._is24Hour ? h : (h > 12 ? h-12 : h);
   }
    
  /**
   * Access the number of minutes in the current time.
	 *
	 * @returns {number} Number of minutes in [0,60].
 	 */	
	 public get minutes(): number
	 { 
	   let h: number      = Math.floor(this._seconds/this.SECONDS_PER_HOUR);
	   let remain: number = this._seconds - h*this.SECONDS_PER_HOUR;
			   
	   return  Math.floor(remain/this.SECONDS_PER_MINUTE);
	 }
		  
  /**
   * Access the number of seconds in the current time.
   *
   * @returns {number} Number of seconds in [0,60].
	 */	
	 public get seconds(): number
	 {
	   let h: number      = Math.floor(this._seconds/this.SECONDS_PER_HOUR);
		 let remain: number = this._seconds - h*this.SECONDS_PER_HOUR;
		 let m: number      = Math.floor(remain/this.SECONDS_PER_MINUTE);
		 remain             = remain - m*this.SECONDS_PER_MINUTE;
			   
		 return Math.floor(remain);
	 }
		  
  /**
   * Access the value of this model
   *
   * @returns {number} Value of the clock model as current number of seconds
   */	
   public get value()
   {
	   return this._seconds;
	 }

  /**
   * Assign a value to this model
   * 
   * @param {number} seconds Number of seconds
   * 
   * @returns {nothing} - The internal clock model is updated based on the supplied number of seconds, which is
	 * clipped to the number of seconds in a day
   */
	 public set value(seconds: number)
	 {
     if (isNaN(seconds) || !isFinite(seconds))
       return;

		 const secs: number   = Math.min(seconds,this.SECONDS_PER_DAY);
		 const h: number      = Math.floor(secs/this.SECONDS_PER_HOUR);
		 const remain: number = seconds - h*this.SECONDS_PER_HOUR;
		 const m: number      = Math.floor(remain/this.SECONDS_PER_MINUTE);
		 const s: number      = Math.floor(remain - m*this.SECONDS_PER_MINUTE);
			   
     this._seconds = s + m*this.SECONDS_PER_MINUTE + h*this.SECONDS_PER_HOUR;
   }
		
  /**
	 * Create a copy of the current model and returns a reference to the copy
	 *
	 * @returns {TSMT$ClockTimeModel} Reference to new clock time model containing a copy of the current model
	 */		
	 public clone(): TSMT$ClockTimeModel
	 {
     let c: TSMT$ClockTimeModel = new TSMT$ClockTimeModel();

     c.is24Hour = this._is24Hour
     c.update(this.hours, this.minutes, this.seconds, this.isAM);

     return c;
	 }
		
  /**
	 * Update the current model with separate hour, minute, and seconds.  The internal 24-hour format remains unchanged
	 *
	 * @param {number} hours Number of hours in the current clock time in [0,23]
	 * @default 0
	 *
   * @param {number} minutes Number of minutes in the current clock time
   * @default 0
	 *
	 * @param {number} seconds Number of seconds in the current clock time
	 * @default 0
	 *
	 * @param {boolean} issAM true if the input time is AM, false if PM - NOTE: ignored if {is24Hour} is true.
	 * @default false
	 * 
	 * @returns {nothing} Input hours are adjusted mod 24 and input minutes/seconds are adjusted mod 60
	 * 
	 */
	 public update(hours: number=0, minutes: number=0, seconds: number=0, isAM: boolean=false): void
   {
     hours   = !isNaN(hours) && isFinite(hours) ? hours : 0;
     minutes = !isNaN(minutes) && isFinite(minutes) ? minutes : 0;
     seconds = !isNaN(seconds) && isFinite(seconds) ? seconds : 0;

     let h: number = Math.abs(hours)   % 24;
     let m: number = Math.abs(minutes) % 60;
     let s: number = Math.abs(seconds) % 60;
      
     if (!this._is24Hour)
     {
       if (isAM)
       {
         h = h % 12;
       }
       else
       {   
         h = h % 12;
         h = h < 12 ? h+12 : h;
       }
     }
      
     this._seconds = s + m*this.SECONDS_PER_MINUTE + h*this.SECONDS_PER_HOUR;
	 }
		  
  /**
	 * Return the magnitude of the difference in elapsed hours between the current model and an input {TSMT$ClockTimeModel}
	 *
	 * @param {TSMT$ClockTimeModel} clock Model whose time is to be compared to the current time
	 * 
	 * @param {boolean} forward True if elapsed time is based on clockwise motion, false if counter-clockwise
	 * @default true
	 *
	 * @returns {number} Magnitude of elapsed hours between the time represented by the current and input models.  If
	 * the input time is less than the current time, the forward parameter determines if the around-the-clock or the
	 * minimal (counter-clockwise) elapsed time is returned.
	 */
	 public getElapsedHours(clock: TSMT$ClockTimeModel, forward: boolean=true): number
	 {    
		 if (clock === undefined || clock == null) {
       return 0;
     }
		    
		 const s: number   = clock.value;
		 let delta: number = s - this._seconds;
		
     if (delta < 0) {
       delta = forward ? this.SECONDS_PER_DAY - this._seconds + s : -delta;
     }

	   return Math.floor(delta/this.SECONDS_PER_HOUR);
	 }
		  
  /**
	 * Return the magnitude of the difference in elapsed minutes between the current model and an input
	 * {TSMT$ClockTimeModel}
	 *
	 * @param {TSMT$ClockTimeModel} clock Model whose time is to be compared to the current time
	 * 
	 * @param {boolean} forward True if elapsed time is based on clockwise motion, false if counter-clockwise
	 * @default true
	 *
	 * @return number - Magnitude of elapsed minutes between the time represented by the current and input models.  If
	 * the input time is less than the current time, the forward parameter determines if the around-the-clock or the
	 * minimal (counter-clockwise) elapsed time is returned.
	 */
	 public getElapsedMinutes(clock: TSMT$ClockTimeModel, forward: boolean=true): number
	 {
     if (clock === undefined || clock == null) {
       return 0;
     }
			   
		 const s: number   = clock.value;
		 let delta: number = s - this._seconds;

		 if (delta < 0) {
       delta = forward ? this.SECONDS_PER_DAY - this._seconds + s : -delta;
     }

		 const h: number      = Math.floor(delta/this.SECONDS_PER_HOUR);
		 const remain: number = delta - h*this.SECONDS_PER_HOUR;
			  
		 return Math.floor(remain/this.SECONDS_PER_MINUTE);
	 }
		  
  /**
	 * Return the magnitude of the difference in elapsed seconds between the current model and an input {TSMT$ClockTimeModel}
	 *
	 * @param {TSMT$ClockTimeModel} clock  Model whose time is to be compared to the current time
	 * 
	 * @param {boolean} forward True if elapsed time is based on clockwise motion, false if counter-clockwise
	 * @default true
	 *
	 * @return {number} Magnitude of elapsed seconds between the time represented by the current and input models. If the
	 * input time is less than the current time, the forward parameter determines if the around-the-clock or the minimal
	 * (counter-clockwise) elapsed time is returned.
	 *
	 */
	 public getElapsedSeconds(clock: TSMT$ClockTimeModel, forward: boolean=true): number
	 {
     if (clock === undefined || clock == null) {
       return 0;
     }
		   
		 const s   = clock.value;
		 let delta = s - this._seconds;
		 
     if (delta < 0) {
       delta = forward ? this.SECONDS_PER_DAY - this._seconds + s : -delta;
     }

		 const h: number      = Math.floor(delta/this.SECONDS_PER_HOUR);
		 const remain: number = delta - h*this.SECONDS_PER_HOUR;
		 const m: number      = Math.floor(remain/this.SECONDS_PER_MINUTE);
			   
     return Math.floor(remain - m*this.SECONDS_PER_MINUTE);
	 }
	
  /**
	 * Add a number of seconds to the current time
	 *
	 * @param {number} seconds Number of seconds to add to the current time
	 * 
	 * @returns {nothing} The value of this clock time model is adjusted, based on the number of seconds added to the model.
	 */
   public addSeconds(seconds: number): void
   {
     if (!isNaN(seconds) && isFinite(seconds)) {
       this.value = this._seconds + seconds;
     }
   }
		
  /**
	 * Add the time in the current model to the time in an input ClockTimeModel.  To add a raw number of hours, minutes,
	 * and seconds to the current time, set {is24Hour} to true on the input Model.
	 *
	 * @param {TSMT$ClockTimeModel} clock ClockTimeModel whose time is to be added to the current model
	 *
	 * @returns {TSMT$ClockTimeModel} Reference to a Model containing the result of adding the current clock time to the
	 * input clock time.  If the input model is undefined, the returned model is a clone of the current model.
	 */
	 public add(clock: TSMT$ClockTimeModel): TSMT$ClockTimeModel
	 {
     if (clock === undefined || clock == null) {
       return this.clone();
     }

		 const model: TSMT$ClockTimeModel = this.clone();
			   
	   const s: number = clock.value;
	   model.value     = (this._seconds+s) % this.SECONDS_PER_DAY;
			   
	   return model;
	 }
		
  /**
	 * Subtract time represented by a clock model from the current clock time.
	 *
	 * @param {TSMT$ClockTimeModel} Reference to a Model whose hours, minutes, and seconds are subtracted from the current
	 * time.
	 *
	 * @returns {TSMT$ClockTimeModel} Reference to a model containing the result of subtracting the input clock time from
	 * the current time.  If the input model is undefined, the returned model is a clone of the current model.
	 */
	 public subtract(clock: TSMT$ClockTimeModel): TSMT$ClockTimeModel
	 {
     if (clock === undefined || clock == null) {
       return this.clone();
     }
			   
		 const model: TSMT$ClockTimeModel = this.clone();
			   
		 const s: number    = clock.value;
		 const secs: number = this._seconds-s;
			  
	   model.value = secs < 0 ? secs + this.SECONDS_PER_DAY : secs;
			  
	   return model;
	 }
		
  /**
	 * Add the current time to an input time and store the result in the current model.
   *
	 * @param {TSMT$ClockTimeModel} clock Reference to clock model whose time is added to the current model
	 *
	 * @returns {nothing}
	 */
	 public addTo(clock: TSMT$ClockTimeModel): void
	 {
     if (clock === undefined || clock == null) {
       return;
     }
			   
		 const s: number = clock.value;
		 this.value      = (this._seconds+s) % this.SECONDS_PER_DAY;
	 }
		
  /**
	 * Subtracts an input clock model from the current model and store the result in the current model.
	 *
	 * @param {ClockTimeModel} clock Reference to ClockTimeModel whose hours, minutes, and seconds are subtracted from
	 * the current model
   *
   * @returns {nothing}
   */
	 public subtractFrom(clock: TSMT$ClockTimeModel): void
	 {
     if (clock === undefined || clock == null) {
       return;
     }

		 const s: number    = clock.value;
		 const secs: number = (this._seconds-s);
			  
		 this.value = secs < 0 ? secs + this.SECONDS_PER_DAY : secs;
	 }
			
  /**
	 * Returns a string representation of the current model
	 *
	 * @returns {string} Formatted representation of the current model based on current internal display settings.
	 * 
	 */
	 public toString(): String
	 {
     let h: number      = this.hours;
	   h                  = !this._is24Hour && h==0 ? 12 : h;
	   const m: number    = this.minutes;
	   const s: number    = this.seconds;
	   const hStr: string = (this._is24Hour && h < 10) ? "0"+h.toString() : h.toString();
     const mStr: string = m < 10 ? "0"+m.toString() : m.toString();
     const sStr: string = s < 10 ? "0"+s.toString() : s.toString();
			 
     const timeStr: string = (!this._is24Hour && s == 0) ? hStr + ":" + mStr : hStr + ":" + mStr + ":" + sStr;
     const period: string  = this._is24Hour ? "" : ( this._seconds < this.SECONDS_AT_NOON ? " AM" : " PM" );
			   
		 return timeStr + period;
	 }
 }
