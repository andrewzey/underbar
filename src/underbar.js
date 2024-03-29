/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length -1];
    } else if (n === 0) {
      return [];
    } else {
      return array.slice(-n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    //if array
    if (Array.isArray(collection)) {
      //iterate through each index of array
      for (var i = 0; i < collection.length; i++) {
        //pass that index to iterator function
        iterator(collection[i], i, collection);
      }
    }

    //if object (only strings and arrays have prototypal method "length")
    if (typeof collection === "object" && collection.length === undefined) {
      //iterate through each key of object
      for (var key in collection) {
        //pass that key's value to iterator function
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item) {
      if (test(item) === true) {
        result.push(item);
      }
    });

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    
    // //solution using each
    // var result = [];
    // _.each(collection, function(item) {
    //   if (test(item) === false) {
    //     result.push(item);
    //   }
    // });

    // return result;

    //solution using filter
    return _.filter(collection, function(item) {
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];

    _.each(array, function(item) {
      if (_.indexOf(result, item) === -1) {
        result.push(item);
      }
    });

    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];

    _.each(collection, function(item) {
      result.push(iterator(item));
    });

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var args = Array.prototype.slice.call(arguments, 2);
    
    return _.map(collection, function(item){
      if (typeof functionOrKey === "function") {
        return functionOrKey.apply(item, args);
      } else {
        return item[functionOrKey].apply(item, args); 
      }
      
    });
  };


  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    if (typeof accumulator === "undefined") {
      if (Array.isArray(collection)) {
        accumulator = collection[0];
      }
    }
    _.each(collection, function(item, index) {
      accumulator = iterator(accumulator, item);
    });
    return accumulator;  
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target; // this becomes the value of wasFound on next iteratorCall
    }, false); //if wasFound (the accuulator) is never set to true (as a result of matching the target), then _.contains returns false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    //return true unless an item is false or returns false when passed through the iterator function (truth test)
    return _.reduce(collection, function(isTrue, item) {
      //if there is no iterator function, and the item evaluates to "false"
      if (!iterator) {
          if (!item) return false;
      } else if (!iterator(item)) { //if there is an iterator (truth test) function, and the item fails the truth test
          return false;
      }
      return isTrue;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    if (!iterator) {
      iterator = _.identity;
    }
    
    // //solution using _.each
    // var result = false;
    // _.each(collection, function(item){
    //   if (iterator(item)) result = true;
    // });
    // return result;

    // //solution using _.reduce
    // return _.reduce(collection, function(isTrue, item) {
    //   if (iterator(item)) return true;
    //   return isTrue;
    // }, false);

    //solution using _.every
    //if every item fails the truth test, then _.some should return false, otherwise true

    // if (_.every(collection, function(item) { return !(iterator(item)); } )) {
    //   return false
    // } else {
    //   return true;
    // }

    //refactored
    return !_.every(collection, function(item) { 
      return !iterator(item); //every() returns true if every single item fails the truth test
    });    

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(to, from) {
    //get array of all extending objects by using slice arguments
    var arrayOfObjects = Array.prototype.slice.call(arguments, 1);

    //iterate through each index in the array
    _.each(arrayOfObjects, function(obj) {
      //iterate through each object's keys
      _.each(obj, function(value, key) {
        // append the value to the target object
        to[key] = value;
      });
    });
    
    return to;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in "to"
  _.defaults = function(to, from) {
    var arrayOfObjects = Array.prototype.slice.call(arguments, 1);

    _.each(arrayOfObjects, function(obj) {
      _.each(obj, function(value, key) {
        if (typeof to[key] === "undefined") {
          to[key] = value
        };
      });
    });

    return to;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  //
  //USAGE
  //var fastFunc = _.memoize(func);
  //fastFunc(arg)
  _.memoize = function(func) {
    //create object with keys (stored argument of previous function calls) and values (stored results)
    var memo = {}; //available in closure scope
    
    return function(arg) {
      var key = arg; //stores the single argument passed. this is passed in by calling the 

      if (!memo[key]) { //if the key doesn't exist (meaning it wasn't ever computed and its value stored)
        memo[key] = func.call(this, arg); //store the computed result as a new key-value pair in the memo object
      }
      return memo[key];
    };    
  };

  

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function(){
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var result = array.slice(0);

    for (var i = 0; i < result.length; i++) {
      //push (randomly selected and removed) element from array
      var arrSelector = Math.floor(Math.random() * (result.length - i) );
      result.push(result.splice(arrSelector,1)[0]); //[0] is because return.splice returns an array with a single item
    }

    return result;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
