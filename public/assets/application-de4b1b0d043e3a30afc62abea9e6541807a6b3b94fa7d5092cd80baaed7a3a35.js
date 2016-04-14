/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (typeof element.data('ujs:enable-with') !== 'undefined') element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
// This [jQuery](http://jquery.com/) plugin implements an `<iframe>`
// [transport](http://api.jquery.com/extending-ajax/#Transports) so that
// `$.ajax()` calls support the uploading of files using standard HTML file
// input fields. This is done by switching the exchange from `XMLHttpRequest`
// to a hidden `iframe` element containing a form that is submitted.

// The [source for the plugin](http://github.com/cmlenz/jquery-iframe-transport)
// is available on [Github](http://github.com/) and dual licensed under the MIT
// or GPL Version 2 licenses.

// ## Usage

// To use this plugin, you simply add an `iframe` option with the value `true`
// to the Ajax settings an `$.ajax()` call, and specify the file fields to
// include in the submssion using the `files` option, which can be a selector,
// jQuery object, or a list of DOM elements containing one or more
// `<input type="file">` elements:

//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             files: $(":file", this),
//             iframe: true
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });

// The plugin will construct hidden `<iframe>` and `<form>` elements, add the
// file field(s) to that form, submit the form, and process the response.

// If you want to include other form fields in the form submission, include
// them in the `data` option, and set the `processData` option to `false`:

//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             data: $(":text", this).serializeArray(),
//             files: $(":file", this),
//             iframe: true,
//             processData: false
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });

// ### Response Data Types

// As the transport does not have access to the HTTP headers of the server
// response, it is not as simple to make use of the automatic content type
// detection provided by jQuery as with regular XHR. If you can't set the
// expected response data type (for example because it may vary depending on
// the outcome of processing by the server), you will need to employ a
// workaround on the server side: Send back an HTML document containing just a
// `<textarea>` element with a `data-type` attribute that specifies the MIME
// type, and put the actual payload in the textarea:

//     <textarea data-type="application/json">
//       {"ok": true, "message": "Thanks so much"}
//     </textarea>

// The iframe transport plugin will detect this and pass the value of the
// `data-type` attribute on to jQuery as if it was the "Content-Type" response
// header, thereby enabling the same kind of conversions that jQuery applies
// to regular responses. For the example above you should get a Javascript
// object as the `data` parameter of the `complete` callback, with the
// properties `ok: true` and `message: "Thanks so much"`.

// ### Handling Server Errors

// Another problem with using an `iframe` for file uploads is that it is
// impossible for the javascript code to determine the HTTP status code of the
// servers response. Effectively, all of the calls you make will look like they
// are getting successful responses, and thus invoke the `done()` or
// `complete()` callbacks. You can only determine communicate problems using
// the content of the response payload. For example, consider using a JSON
// response such as the following to indicate a problem with an uploaded file:

//     <textarea data-type="application/json">
//       {"ok": false, "message": "Please only upload reasonably sized files."}
//     </textarea>

// ### Compatibility

// This plugin has primarily been tested on Safari 5 (or later), Firefox 4 (or
// later), and Internet Explorer (all the way back to version 6). While I
// haven't found any issues with it so far, I'm fairly sure it still doesn't
// work around all the quirks in all different browsers. But the code is still
// pretty simple overall, so you should be able to fix it and contribute a
// patch :)

// ## Annotated Source

(function($, undefined) {
  "use strict";

  // Register a prefilter that checks whether the `iframe` option is set, and
  // switches to the "iframe" data type if it is `true`.
  $.ajaxPrefilter(function(options, origOptions, jqXHR) {
    if (options.iframe) {
      return "iframe";
    }
  });

  // Register a transport for the "iframe" data type. It will only activate
  // when the "files" option has been set to a non-empty list of enabled file
  // inputs.
  $.ajaxTransport("iframe", function(options, origOptions, jqXHR) {
    var form = null,
        iframe = null,
        name = "iframe-" + $.now(),
        files = $(options.files).filter(":file:enabled"),
        markers = null,
        accepts;

    // This function gets called after a successful submission or an abortion
    // and should revert all changes made to the page to enable the
    // submission via this transport.
    function cleanUp() {
      markers.prop('disabled', false);
      form.remove();
      iframe.bind("load", function() { iframe.remove(); });
      iframe.attr("src", "javascript:false;");
    }

    // Remove "iframe" from the data types list so that further processing is
    // based on the content type returned by the server, without attempting an
    // (unsupported) conversion from "iframe" to the actual type.
    options.dataTypes.shift();

    if (files.length) {
      form = $("<form enctype='multipart/form-data' method='post'></form>").
        hide().attr({action: options.url, target: name});

      // If there is any additional data specified via the `data` option,
      // we add it as hidden fields to the form. This (currently) requires
      // the `processData` option to be set to false so that the data doesn't
      // get serialized to a string.
      if (typeof(options.data) === "string" && options.data.length > 0) {
        $.error("data must not be serialized");
      }
      $.each(options.data || {}, function(name, value) {
        if ($.isPlainObject(value)) {
          name = value.name;
          value = value.value;
        }
        $("<input type='hidden' />").attr({name:  name, value: value}).
          appendTo(form);
      });

      // Add a hidden `X-Requested-With` field with the value `IFrame` to the
      // field, to help server-side code to determine that the upload happened
      // through this transport.
      $("<input type='hidden' value='IFrame' name='X-Requested-With' />").
        appendTo(form);

      // Borrowed straight from the JQuery source
      // Provides a way of specifying the accepted data type similar to HTTP_ACCEPTS
      accepts = options.dataTypes[ 0 ] && options.accepts[ options.dataTypes[0] ] ?
        options.accepts[ options.dataTypes[0] ] + ( options.dataTypes[ 0 ] !== "*" ? ", */*; q=0.01" : "" ) :
        options.accepts[ "*" ]

      $("<input type='hidden' name='X-Http-Accept'>")
        .attr("value", accepts).appendTo(form);

      // Move the file fields into the hidden form, but first remember their
      // original locations in the document by replacing them with disabled
      // clones. This should also avoid introducing unwanted changes to the
      // page layout during submission.
      markers = files.after(function(idx) {
        return $(this).clone().prop("disabled", true);
      }).next();
      files.appendTo(form);

      return {

        // The `send` function is called by jQuery when the request should be
        // sent.
        send: function(headers, completeCallback) {
          iframe = $("<iframe src='javascript:false;' name='" + name +
            "' id='" + name + "' style='display:none'></iframe>");

          // The first load event gets fired after the iframe has been injected
          // into the DOM, and is used to prepare the actual submission.
          iframe.bind("load", function() {

            // The second load event gets fired when the response to the form
            // submission is received. The implementation detects whether the
            // actual payload is embedded in a `<textarea>` element, and
            // prepares the required conversions to be made in that case.
            iframe.unbind("load").bind("load", function() {
              var doc = this.contentWindow ? this.contentWindow.document :
                (this.contentDocument ? this.contentDocument : this.document),
                root = doc.documentElement ? doc.documentElement : doc.body,
                textarea = root.getElementsByTagName("textarea")[0],
                type = textarea && textarea.getAttribute("data-type") || null,
                status = textarea && textarea.getAttribute("data-status") || 200,
                statusText = textarea && textarea.getAttribute("data-statusText") || "OK",
                content = {
                  html: root.innerHTML,
                  text: type ?
                    textarea.value :
                    root ? (root.textContent || root.innerText) : null
                };
              cleanUp();
              if (!jqXHR.responseText) {
                jqXHR.responseText = content.text;
              }
              completeCallback(status, statusText, content, type ?
                ("Content-Type: " + type) :
                null);
            });

            // Now that the load handler has been set up, submit the form.
            form[0].submit();
          });

          // After everything has been set up correctly, the form and iframe
          // get injected into the DOM so that the submission can be
          // initiated.
          $("body").append(form, iframe);
        },

        // The `abort` function is called by jQuery when the request should be
        // aborted.
        abort: function() {
          if (iframe !== null) {
            iframe.unbind("load").attr("src", "javascript:false;");
            cleanUp();
          }
        }

      };
    }
  });

})(jQuery);



(function($) {

  var remotipart;

  $.remotipart = remotipart = {

    setup: function(form) {
      // Preserve form.data('ujs:submit-button') before it gets nulled by $.ajax.handleRemote
      var button = form.data('ujs:submit-button'),
          csrfParam = $('meta[name="csrf-param"]').attr('content'),
          csrfToken = $('meta[name="csrf-token"]').attr('content'),
          csrfInput = form.find('input[name="' + csrfParam + '"]').length;

      form
        // Allow setup part of $.rails.handleRemote to setup remote settings before canceling default remote handler
        // This is required in order to change the remote settings using the form details
        .one('ajax:beforeSend.remotipart', function(e, xhr, settings){
          // Delete the beforeSend bindings, since we're about to re-submit via ajaxSubmit with the beforeSubmit
          // hook that was just setup and triggered via the default `$.rails.handleRemote`
          // delete settings.beforeSend;
          delete settings.beforeSend;

          settings.iframe      = true;
          settings.files       = $($.rails.fileInputSelector, form);
          settings.data        = form.serializeArray();

          // Insert the name/value of the clicked submit button, if any
          if (button)
            settings.data.push(button);

          // jQuery 1.9 serializeArray() contains input:file entries
          // so exclude them from settings.data, otherwise files will not be sent
          settings.files.each(function(i, file){
            for (var j = settings.data.length - 1; j >= 0; j--)
              if (settings.data[j].name == file.name)
                settings.data.splice(j, 1);
          })

          settings.processData = false;

          // Modify some settings to integrate JS request with rails helpers and middleware
          if (settings.dataType === undefined) { settings.dataType = 'script *'; }
          settings.data.push({name: 'remotipart_submitted', value: true});
          if (csrfToken && csrfParam && !csrfInput) {
            settings.data.push({name: csrfParam, value: csrfToken});
          }

          // Allow remotipartSubmit to be cancelled if needed
          if ($.rails.fire(form, 'ajax:remotipartSubmit', [xhr, settings])) {
            // Second verse, same as the first
            $.rails.ajax(settings);
            setTimeout(function(){ $.rails.disableFormElements(form); }, 20);
          }

          //Run cleanup
          remotipart.teardown(form);

          // Cancel the jQuery UJS request
          return false;
        })

        // Keep track that we just set this particular form with Remotipart bindings
        // Note: The `true` value will get over-written with the `settings.dataType` from the `ajax:beforeSend` handler
        .data('remotipartSubmitted', true);
    },

    teardown: function(form) {
      form
        .unbind('ajax:beforeSend.remotipart')
        .removeData('remotipartSubmitted')
    }
  };

  $(document).on('ajax:aborted:file', 'form', function(){
    var form = $(this);

    remotipart.setup(form);

    // Manually call jquery-ujs remote call so that it can setup form and settings as usual,
    // and trigger the `ajax:beforeSend` callback to which remotipart binds functionality.
    $.rails.handleRemote(form);
    return false;
  });

})(jQuery);
/* jquery.nicescroll
-- version 3.6.6
-- copyright 2015-11-17 InuYaksa*2015
-- licensed under the MIT
--
-- http://nicescroll.areaaperta.com/
-- https://github.com/inuyaksa/jquery.nicescroll
--
*/


(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS.
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
}(function(jQuery) {
  "use strict";

  // globals
  var domfocus = false;
  var mousefocus = false;
  var tabindexcounter = 0;
  var ascrailcounter = 2000;
  var globalmaxzindex = 0;

  var $ = jQuery; // sandbox

  // http://stackoverflow.com/questions/2161159/get-script-path
  function getScriptPath() {
    var scripts = document.getElementsByTagName('script');
    var path = scripts.length ? scripts[scripts.length - 1].src.split('?')[0] : '';
    return (path.split('/').length > 0) ? path.split('/').slice(0, -1).join('/') + '/' : '';
  }

  var vendors = ['webkit','ms','moz','o'];

  var setAnimationFrame = window.requestAnimationFrame || false;
  var clearAnimationFrame = window.cancelAnimationFrame || false;

  if (!setAnimationFrame) {  // legacy detection
    for (var vx in vendors) {
      var v = vendors[vx];
      if (!setAnimationFrame) setAnimationFrame = window[v + 'RequestAnimationFrame'];
      if (!clearAnimationFrame) clearAnimationFrame = window[v + 'CancelAnimationFrame'] || window[v + 'CancelRequestAnimationFrame'];
    }
  }

  var ClsMutationObserver = window.MutationObserver || window.WebKitMutationObserver || false;

  var _globaloptions = {
    zindex: "auto",
    cursoropacitymin: 0,
    cursoropacitymax: 1,
    cursorcolor: "#424242",
    cursorwidth: "5px",
    cursorborder: "1px solid #fff",
    cursorborderradius: "5px",
    scrollspeed: 60,
    mousescrollstep: 8 * 3,
    touchbehavior: false,
    hwacceleration: true,
    usetransition: true,
    boxzoom: false,
    dblclickzoom: true,
    gesturezoom: true,
    grabcursorenabled: true,
    autohidemode: true,
    background: "",
    iframeautoresize: true,
    cursorminheight: 32,
    preservenativescrolling: true,
    railoffset: false,
    railhoffset: false,
    bouncescroll: true,
    spacebarenabled: true,
    railpadding: {
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    },
    disableoutline: true,
    horizrailenabled: true,
    railalign: "right",
    railvalign: "bottom",
    enabletranslate3d: true,
    enablemousewheel: true,
    enablekeyboard: true,
    smoothscroll: true,
    sensitiverail: true,
    enablemouselockapi: true,
    //      cursormaxheight:false,
    cursorfixedheight: false,
    directionlockdeadzone: 6,
    hidecursordelay: 400,
    nativeparentscrolling: true,
    enablescrollonselection: true,
    overflowx: true,
    overflowy: true,
    cursordragspeed: 0.3,
    rtlmode: "auto",
    cursordragontouch: false,
    oneaxismousemode: "auto",
    scriptpath: getScriptPath(),
    preventmultitouchscrolling: true
  };

  var browserdetected = false;

  var getBrowserDetection = function() {

    if (browserdetected) return browserdetected;

    var _el = document.createElement('DIV'),
        _style = _el.style,
        _agent = navigator.userAgent,
        _platform = navigator.platform,
        d = {};

    d.haspointerlock = "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document;

    d.isopera = ("opera" in window); // 12-
    d.isopera12 = (d.isopera && ("getUserMedia" in navigator));
    d.isoperamini = (Object.prototype.toString.call(window.operamini) === "[object OperaMini]");

    d.isie = (("all" in document) && ("attachEvent" in _el) && !d.isopera); //IE10-
    d.isieold = (d.isie && !("msInterpolationMode" in _style)); // IE6 and older
    d.isie7 = d.isie && !d.isieold && (!("documentMode" in document) || (document.documentMode == 7));
    d.isie8 = d.isie && ("documentMode" in document) && (document.documentMode == 8);
    d.isie9 = d.isie && ("performance" in window) && (document.documentMode >= 9);
    d.isie10 = d.isie && ("performance" in window) && (document.documentMode == 10);
    d.isie11 = ("msRequestFullscreen" in _el) && (document.documentMode >= 11); // IE11+
		d.isieedge = (navigator.userAgent.match(/Edge\/12\./));

    d.isie9mobile = /iemobile.9/i.test(_agent); //wp 7.1 mango
    if (d.isie9mobile) d.isie9 = false;
    d.isie7mobile = (!d.isie9mobile && d.isie7) && /iemobile/i.test(_agent); //wp 7.0

    d.ismozilla = ("MozAppearance" in _style);

    d.iswebkit = ("WebkitAppearance" in _style);

    d.ischrome = ("chrome" in window);
    d.ischrome22 = (d.ischrome && d.haspointerlock);
    d.ischrome26 = (d.ischrome && ("transition" in _style)); // issue with transform detection (maintain prefix)

    d.cantouch = ("ontouchstart" in document.documentElement) || ("ontouchstart" in window); // detection for Chrome Touch Emulation
    d.hasmstouch = (window.MSPointerEvent || false); // IE10 pointer events
    d.hasw3ctouch = (window.PointerEvent || false) && ((navigator.MaxTouchPoints > 0)||(navigator.msMaxTouchPoints > 0)); //IE11 pointer events, following W3C Pointer Events spec

    d.ismac = /^mac$/i.test(_platform);

    d.isios = (d.cantouch && /iphone|ipad|ipod/i.test(_platform));
    d.isios4 = ((d.isios) && !("seal" in Object));
    d.isios7 = ((d.isios)&&("webkitHidden" in document));  //iOS 7+

    d.isandroid = (/android/i.test(_agent));

    d.haseventlistener = ("addEventListener" in _el);
    
    d.trstyle = false;
    d.hastransform = false;
    d.hastranslate3d = false;
    d.transitionstyle = false;
    d.hastransition = false;
    d.transitionend = false;

    var a;
    var check = ['transform', 'msTransform', 'webkitTransform', 'MozTransform', 'OTransform'];    
    for (a = 0; a < check.length; a++) {
      if (typeof _style[check[a]] != "undefined") {
        d.trstyle = check[a];
        break;
      }
    }
    d.hastransform = (!!d.trstyle);
    if (d.hastransform) {
      _style[d.trstyle] = "translate3d(1px,2px,3px)";
      d.hastranslate3d = /translate3d/.test(_style[d.trstyle]);
    }

    d.transitionstyle = false;
    d.prefixstyle = '';
    d.transitionend = false;
    check = ['transition', 'webkitTransition', 'msTransition', 'MozTransition', 'OTransition', 'OTransition', 'KhtmlTransition'];
    var prefix = ['', '-webkit-', '-ms-', '-moz-', '-o-', '-o', '-khtml-'];
    var evs = ['transitionend', 'webkitTransitionEnd', 'msTransitionEnd',  'transitionend', 'otransitionend', 'oTransitionEnd', 'KhtmlTransitionEnd'];
    for (a = 0; a < check.length; a++) {
      if (check[a] in _style) {
        d.transitionstyle = check[a];
        d.prefixstyle = prefix[a];
        d.transitionend = evs[a];
        break;
      }
    }
    if (d.ischrome26) {  // always use prefix
      d.prefixstyle = prefix[1];
    }

    d.hastransition = (d.transitionstyle);

    function detectCursorGrab() {
      var lst = ['-webkit-grab', '-moz-grab', 'grab'];
      if ((d.ischrome && !d.ischrome22) || d.isie) lst = []; // force setting for IE returns false positive and chrome cursor bug
      for (var a = 0; a < lst.length; a++) {
        var p = lst[a];
        _style.cursor = p;
        if (_style.cursor == p) return p;
      }
      return 'url(//mail.google.com/mail/images/2/openhand.cur),n-resize'; // thank you google for custom cursor!
    }
    d.cursorgrabvalue = detectCursorGrab();

    d.hasmousecapture = ("setCapture" in _el);

    d.hasMutationObserver = (ClsMutationObserver !== false);

    _el = null; //memory released

    browserdetected = d;

    return d;
  };

  var NiceScrollClass = function(myopt, me) {

    var self = this;

    this.version = '3.6.6';
    this.name = 'nicescroll';

    this.me = me;

    this.opt = {
      doc: $("body"),
      win: false
    };

    $.extend(this.opt, _globaloptions);  // clone opts

    // Options for internal use
    this.opt.snapbackspeed = 80;

    if (myopt || false) {
      for (var a in self.opt) {
        if (typeof myopt[a] != "undefined") self.opt[a] = myopt[a];
      }
    }

    this.doc = self.opt.doc;
    this.iddoc = (this.doc && this.doc[0]) ? this.doc[0].id || '' : '';
    this.ispage = /^BODY|HTML/.test((self.opt.win) ? self.opt.win[0].nodeName : this.doc[0].nodeName);
    this.haswrapper = (self.opt.win !== false);
    this.win = self.opt.win || (this.ispage ? $(window) : this.doc);
    this.docscroll = (this.ispage && !this.haswrapper) ? $(window) : this.win;
    this.body = $("body");
    this.viewport = false;

    this.isfixed = false;

    this.iframe = false;
    this.isiframe = ((this.doc[0].nodeName == 'IFRAME') && (this.win[0].nodeName == 'IFRAME'));

    this.istextarea = (this.win[0].nodeName == 'TEXTAREA');

    this.forcescreen = false; //force to use screen position on events

    this.canshowonmouseevent = (self.opt.autohidemode != "scroll");

    // Events jump table    
    this.onmousedown = false;
    this.onmouseup = false;
    this.onmousemove = false;
    this.onmousewheel = false;
    this.onkeypress = false;
    this.ongesturezoom = false;
    this.onclick = false;

    // Nicescroll custom events
    this.onscrollstart = false;
    this.onscrollend = false;
    this.onscrollcancel = false;

    this.onzoomin = false;
    this.onzoomout = false;

    // Let's start!  
    this.view = false;
    this.page = false;

    this.scroll = {
      x: 0,
      y: 0
    };
    this.scrollratio = {
      x: 0,
      y: 0
    };
    this.cursorheight = 20;
    this.scrollvaluemax = 0;

    this.isrtlmode = (this.opt.rtlmode == "auto") ? ((this.win[0] == window ? this.body : this.win).css("direction") == "rtl") : (this.opt.rtlmode === true);
    //    this.checkrtlmode = false;
    
    this.scrollrunning = false;

    this.scrollmom = false;

    this.observer        = false;  // observer div changes
    this.observerremover = false;  // observer on parent for remove detection
    this.observerbody    = false;  // observer on body for position change

    do {
      this.id = "ascrail" + (ascrailcounter++);
    } while (document.getElementById(this.id));

    this.rail = false;
    this.cursor = false;
    this.cursorfreezed = false;
    this.selectiondrag = false;

    this.zoom = false;
    this.zoomactive = false;

    this.hasfocus = false;
    this.hasmousefocus = false;

    this.visibility = true;
    this.railslocked = false;  // locked by resize
    this.locked = false;  // prevent lost of locked status sets by user
    this.hidden = false; // rails always hidden
    this.cursoractive = true; // user can interact with cursors

    this.wheelprevented = false; //prevent mousewheel event

    this.overflowx = self.opt.overflowx;
    this.overflowy = self.opt.overflowy;

    this.nativescrollingarea = false;
    this.checkarea = 0;

    this.events = []; // event list for unbind

    this.saved = {};  // style saved

    this.delaylist = {};
    this.synclist = {};

    this.lastdeltax = 0;
    this.lastdeltay = 0;

    this.detected = getBrowserDetection();

    var cap = $.extend({}, this.detected);

    this.canhwscroll = (cap.hastransform && self.opt.hwacceleration);
    this.ishwscroll = (this.canhwscroll && self.haswrapper);

    this.hasreversehr = (this.isrtlmode&&!cap.iswebkit);  //RTL mode with reverse horizontal axis
    
    this.istouchcapable = false; // desktop devices with touch screen support

    //## Check WebKit-based desktop with touch support
    //## + Firefox 18 nightly build (desktop) false positive (or desktop with touch support)
    if (cap.cantouch && !cap.isios && !cap.isandroid && (cap.iswebkit || cap.ismozilla)) {
      this.istouchcapable = true;
      cap.cantouch = false; // parse normal desktop events
    }

    //## disable MouseLock API on user request
    if (!self.opt.enablemouselockapi) {
      cap.hasmousecapture = false;
      cap.haspointerlock = false;
    }

/* deprecated
    this.delayed = function(name, fn, tm, lazy) {
    };
*/    

    this.debounced = function(name, fn, tm) {
      var dd = self.delaylist[name];
      self.delaylist[name] = fn;
      if (!dd) {
        self.debouncedelayed =  setTimeout(function() {
					if (!self) return;
          var fn = self.delaylist[name];
          self.delaylist[name] = false;
          fn.call(self);
        }, tm);
      }
    };

    var _onsync = false;

    this.synched = function(name, fn) {

      function requestSync() {
        if (_onsync) return;
        setAnimationFrame(function() {
          _onsync = false;
          for (var nn in self.synclist) {
            var fn = self.synclist[nn];
            if (fn) fn.call(self);
            self.synclist[nn] = false;
          }
        });
        _onsync = true;
      }

      self.synclist[name] = fn;
      requestSync();
      return name;
    };

    this.unsynched = function(name) {
      if (self.synclist[name]) self.synclist[name] = false;
    };

    this.css = function(el, pars) { // save & set
      for (var n in pars) {
        self.saved.css.push([el, n, el.css(n)]);
        el.css(n, pars[n]);
      }
    };

    this.scrollTop = function(val) {
      return (typeof val == "undefined") ? self.getScrollTop() : self.setScrollTop(val);
    };

    this.scrollLeft = function(val) {
      return (typeof val == "undefined") ? self.getScrollLeft() : self.setScrollLeft(val);
    };

    // derived by by Dan Pupius www.pupius.net
    var BezierClass = function(st, ed, spd, p1, p2, p3, p4) {
    
      this.st = st;
      this.ed = ed;
      this.spd = spd;

      this.p1 = p1 || 0;
      this.p2 = p2 || 1;
      this.p3 = p3 || 0;
      this.p4 = p4 || 1;

      this.ts = (new Date()).getTime();
      this.df = this.ed - this.st;
    };
    BezierClass.prototype = {
      B2: function(t) {
        return 3 * t * t * (1 - t);
      },
      B3: function(t) {
        return 3 * t * (1 - t) * (1 - t);
      },
      B4: function(t) {
        return (1 - t) * (1 - t) * (1 - t);
      },
      getNow: function() {
        var nw = (new Date()).getTime();
        var pc = 1 - ((nw - this.ts) / this.spd);
        var bz = this.B2(pc) + this.B3(pc) + this.B4(pc);
        return (pc < 0) ? this.ed : this.st + Math.round(this.df * bz);
      },
      update: function(ed, spd) {
        this.st = this.getNow();
        this.ed = ed;
        this.spd = spd;
        this.ts = (new Date()).getTime();
        this.df = this.ed - this.st;
        return this;
      }
    };

    //derived from http://stackoverflow.com/questions/11236090/
    function getMatrixValues() {
      var tr = self.doc.css(cap.trstyle);
      if (tr && (tr.substr(0, 6) == "matrix")) {
        return tr.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, '').split(/, +/);
      }
      return false;
    }

    if (this.ishwscroll) {
      // hw accelerated scroll
      this.doc.translate = {
        x: 0,
        y: 0,
        tx: "0px",
        ty: "0px"
      };

      //this one can help to enable hw accel on ios6 http://indiegamr.com/ios6-html-hardware-acceleration-changes-and-how-to-fix-them/
      if (cap.hastranslate3d && cap.isios) this.doc.css("-webkit-backface-visibility", "hidden"); // prevent flickering http://stackoverflow.com/questions/3461441/      

      this.getScrollTop = function(last) {
        if (!last) {
          var mtx = getMatrixValues();
          if (mtx) return (mtx.length == 16) ? -mtx[13] : -mtx[5]; //matrix3d 16 on IE10
          if (self.timerscroll && self.timerscroll.bz) return self.timerscroll.bz.getNow();
        }
        return self.doc.translate.y;
      };

      this.getScrollLeft = function(last) {
        if (!last) {
          var mtx = getMatrixValues();
          if (mtx) return (mtx.length == 16) ? -mtx[12] : -mtx[4]; //matrix3d 16 on IE10
          if (self.timerscroll && self.timerscroll.bh) return self.timerscroll.bh.getNow();
        }
        return self.doc.translate.x;
      };

      this.notifyScrollEvent = function(el) {
        var e = document.createEvent("UIEvents");
        e.initUIEvent("scroll", false, true, window, 1);
        e.niceevent = true;
        el.dispatchEvent(e);
      };

      var cxscrollleft = (this.isrtlmode) ? 1 : -1;

      if (cap.hastranslate3d && self.opt.enabletranslate3d) {
        this.setScrollTop = function(val, silent) {
          self.doc.translate.y = val;
          self.doc.translate.ty = (val * -1) + "px";
          self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0px)");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
        this.setScrollLeft = function(val, silent) {
          self.doc.translate.x = val;
          self.doc.translate.tx = (val * cxscrollleft) + "px";
          self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0px)");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
      } else {
        this.setScrollTop = function(val, silent) {
          self.doc.translate.y = val;
          self.doc.translate.ty = (val * -1) + "px";
          self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
        this.setScrollLeft = function(val, silent) {
          self.doc.translate.x = val;
          self.doc.translate.tx = (val * cxscrollleft) + "px";
          self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
      }
    } else {
      // native scroll
      this.getScrollTop = function() {
        return self.docscroll.scrollTop();
      };
      this.setScrollTop = function(val) {
        return setTimeout(function() {self.docscroll.scrollTop(val)}, 1);
      };
      this.getScrollLeft = function() {
        if (self.detected.ismozilla && self.isrtlmode)
          return Math.abs(self.docscroll.scrollLeft());
        return self.docscroll.scrollLeft();
      };
      this.setScrollLeft = function(val) {
        return setTimeout(function() {self.docscroll.scrollLeft((self.detected.ismozilla && self.isrtlmode) ? -val : val)}, 1);
      };
    }

    this.getTarget = function(e) {
      if (!e) return false;
      if (e.target) return e.target;
      if (e.srcElement) return e.srcElement;
      return false;
    };

    this.hasParent = function(e, id) {
      if (!e) return false;
      var el = e.target || e.srcElement || e || false;
      while (el && el.id != id) {
        el = el.parentNode || false;
      }
      return (el !== false);
    };

    function getZIndex() {
      var dom = self.win;
      if ("zIndex" in dom) return dom.zIndex(); // use jQuery UI method when available
      while (dom.length > 0) {
        if (dom[0].nodeType == 9) return false;
        var zi = dom.css('zIndex');
        if (!isNaN(zi) && zi != 0) return parseInt(zi);
        dom = dom.parent();
      }
      return false;
    }

    //inspired by http://forum.jquery.com/topic/width-includes-border-width-when-set-to-thin-medium-thick-in-ie
    var _convertBorderWidth = {
      "thin": 1,
      "medium": 3,
      "thick": 5
    };

    function getWidthToPixel(dom, prop, chkheight) {
      var wd = dom.css(prop);
      var px = parseFloat(wd);
      if (isNaN(px)) {
        px = _convertBorderWidth[wd] || 0;
        var brd = (px == 3) ? ((chkheight) ? (self.win.outerHeight() - self.win.innerHeight()) : (self.win.outerWidth() - self.win.innerWidth())) : 1; //DON'T TRUST CSS
        if (self.isie8 && px) px += 1;
        return (brd) ? px : 0;
      }
      return px;
    }

    this.getDocumentScrollOffset = function() {
      return {top:window.pageYOffset||document.documentElement.scrollTop,
              left:window.pageXOffset||document.documentElement.scrollLeft};
    }
    
    this.getOffset = function() {
      if (self.isfixed) {
        var ofs = self.win.offset();  // fix Chrome auto issue (when right/bottom props only)
        var scrl = self.getDocumentScrollOffset();
        ofs.top-=scrl.top;
        ofs.left-=scrl.left;
        return ofs;  
      }
      var ww = self.win.offset();
      if (!self.viewport) return ww;      
      var vp = self.viewport.offset();
      return {
        top: ww.top - vp.top,// + self.viewport.scrollTop(),
        left: ww.left - vp.left // + self.viewport.scrollLeft()
      };
    };

    this.updateScrollBar = function(len) {
      if (self.ishwscroll) {
        self.rail.css({  //**
          height: self.win.innerHeight() - (self.opt.railpadding.top + self.opt.railpadding.bottom)
        });
        if (self.railh) self.railh.css({  //**
          width: self.win.innerWidth() - (self.opt.railpadding.left + self.opt.railpadding.right)
        });
        
      } else {
        var wpos = self.getOffset();
        var pos = {
          top: wpos.top,
          left: wpos.left  - (self.opt.railpadding.left + self.opt.railpadding.right)
        };
        pos.top += getWidthToPixel(self.win, 'border-top-width', true);
        pos.left += (self.rail.align) ? self.win.outerWidth() - getWidthToPixel(self.win, 'border-right-width') - self.rail.width : getWidthToPixel(self.win, 'border-left-width');

        var off = self.opt.railoffset;
        if (off) {
          if (off.top) pos.top += off.top;
          if (off.left) pos.left += off.left;
        }
        
        if (!self.railslocked) self.rail.css({
          top: pos.top,
          left: pos.left,
          height: ((len) ? len.h : self.win.innerHeight()) - (self.opt.railpadding.top + self.opt.railpadding.bottom)
        });

        if (self.zoom) {
          self.zoom.css({
            top: pos.top + 1,
            left: (self.rail.align == 1) ? pos.left - 20 : pos.left + self.rail.width + 4
          });
        }

        if (self.railh && !self.railslocked) {
          var pos = {
            top: wpos.top,
            left: wpos.left
          };
          var off = self.opt.railhoffset;
          if (!!off) {
            if (!!off.top) pos.top += off.top;
            if (!!off.left) pos.left += off.left;
          }
          var y = (self.railh.align) ? pos.top + getWidthToPixel(self.win, 'border-top-width', true) + self.win.innerHeight() - self.railh.height : pos.top + getWidthToPixel(self.win, 'border-top-width', true);
          var x = pos.left + getWidthToPixel(self.win, 'border-left-width');
          self.railh.css({
            top: y  - (self.opt.railpadding.top + self.opt.railpadding.bottom),
            left: x,
            width: self.railh.width
          });
        }


      }
    };

    this.doRailClick = function(e, dbl, hr) {
      var fn, pg, cur, pos;

      if (self.railslocked) return;
      self.cancelEvent(e);

      if (dbl) {
        fn = (hr) ? self.doScrollLeft : self.doScrollTop;
        cur = (hr) ? ((e.pageX - self.railh.offset().left - (self.cursorwidth / 2)) * self.scrollratio.x) : ((e.pageY - self.rail.offset().top - (self.cursorheight / 2)) * self.scrollratio.y);
        fn(cur);
      } else {
        fn = (hr) ? self.doScrollLeftBy : self.doScrollBy;
        cur = (hr) ? self.scroll.x : self.scroll.y;
        pos = (hr) ? e.pageX - self.railh.offset().left : e.pageY - self.rail.offset().top;
        pg = (hr) ? self.view.w : self.view.h;
        fn((cur >= pos) ? pg: -pg);//   (cur >= pos) ? fn(pg): fn(-pg);
      }

    };

    self.hasanimationframe = (setAnimationFrame);
    self.hascancelanimationframe = (clearAnimationFrame);

    if (!self.hasanimationframe) {
      setAnimationFrame = function(fn) {
        return setTimeout(fn, 15 - Math.floor((+new Date()) / 1000) % 16);
      }; // 1000/60)};
      clearAnimationFrame = clearInterval;
    } else if (!self.hascancelanimationframe) clearAnimationFrame = function() {
      self.cancelAnimationFrame = true;
    };

    this.init = function() {

      self.saved.css = [];

      if (cap.isie7mobile) return true; // SORRY, DO NOT WORK!
      if (cap.isoperamini) return true; // SORRY, DO NOT WORK!

      if (cap.hasmstouch) self.css((self.ispage) ? $("html") : self.win, {
        '-ms-touch-action': 'none'
      });

      self.zindex = "auto";
      if (!self.ispage && self.opt.zindex == "auto") {
        self.zindex = getZIndex() || "auto";
      } else {
        self.zindex = self.opt.zindex;
      }

      if (!self.ispage && self.zindex != "auto") {
        if (self.zindex > globalmaxzindex) globalmaxzindex = self.zindex;
      }

      if (self.isie && self.zindex == 0 && self.opt.zindex == "auto") { // fix IE auto == 0
        self.zindex = "auto";
      }

      if (!self.ispage || (!cap.cantouch && !cap.isieold && !cap.isie9mobile)) {

        var cont = self.docscroll;
        if (self.ispage) cont = (self.haswrapper) ? self.win : self.doc;

        if (!cap.isie9mobile) self.css(cont, {
          'overflow-y': 'hidden'
        });

        if (self.ispage && cap.isie7) {
          if (self.doc[0].nodeName == 'BODY') self.css($("html"), {
            'overflow-y': 'hidden'
          }); //IE7 double scrollbar issue
          else if (self.doc[0].nodeName == 'HTML') self.css($("body"), {
            'overflow-y': 'hidden'
          }); //IE7 double scrollbar issue
        }

        if (cap.isios && !self.ispage && !self.haswrapper) self.css($("body"), {
          "-webkit-overflow-scrolling": "touch"
        }); //force hw acceleration

        var cursor = $(document.createElement('div'));
        cursor.css({
          position: "relative",
          top: 0,
          "float": "right",
          width: self.opt.cursorwidth,
          height: "0px",
          'background-color': self.opt.cursorcolor,
          border: self.opt.cursorborder,
          'background-clip': 'padding-box',
          '-webkit-border-radius': self.opt.cursorborderradius,
          '-moz-border-radius': self.opt.cursorborderradius,
          'border-radius': self.opt.cursorborderradius
        });

        cursor.hborder = parseFloat(cursor.outerHeight() - cursor.innerHeight());
        
        cursor.addClass('nicescroll-cursors');
        
        self.cursor = cursor;

        var rail = $(document.createElement('div'));
        rail.attr('id', self.id);
        rail.addClass('nicescroll-rails nicescroll-rails-vr');

        var v, a, kp = ["left","right","top","bottom"];  //**
        for (var n in kp) {
          a = kp[n];
          v = self.opt.railpadding[a];
          (v) ? rail.css("padding-"+a,v+"px") : self.opt.railpadding[a] = 0;
        }

        rail.append(cursor);

        rail.width = Math.max(parseFloat(self.opt.cursorwidth), cursor.outerWidth());
        rail.css({
          width: rail.width + "px",
          'zIndex': self.zindex,
          "background": self.opt.background,
          cursor: "default"
        });

        rail.visibility = true;
        rail.scrollable = true;

        rail.align = (self.opt.railalign == "left") ? 0 : 1;

        self.rail = rail;

        self.rail.drag = false;

        var zoom = false;
        if (self.opt.boxzoom && !self.ispage && !cap.isieold) {
          zoom = document.createElement('div');

          self.bind(zoom, "click", self.doZoom);
          self.bind(zoom, "mouseenter", function() {
            self.zoom.css('opacity', self.opt.cursoropacitymax);
          });
          self.bind(zoom, "mouseleave", function() {
            self.zoom.css('opacity', self.opt.cursoropacitymin);
          });

          self.zoom = $(zoom);
          self.zoom.css({
            "cursor": "pointer",
            'z-index': self.zindex,
            'backgroundImage': 'url(' + self.opt.scriptpath + 'zoomico.png)',
            'height': 18,
            'width': 18,
            'backgroundPosition': '0px 0px'
          });
          if (self.opt.dblclickzoom) self.bind(self.win, "dblclick", self.doZoom);
          if (cap.cantouch && self.opt.gesturezoom) {
            self.ongesturezoom = function(e) {
              if (e.scale > 1.5) self.doZoomIn(e);
              if (e.scale < 0.8) self.doZoomOut(e);
              return self.cancelEvent(e);
            };
            self.bind(self.win, "gestureend", self.ongesturezoom);
          }
        }

        // init HORIZ

        self.railh = false;
        var railh;

        if (self.opt.horizrailenabled) {

          self.css(cont, {
            'overflow-x': 'hidden'
          });

          var cursor = $(document.createElement('div'));
          cursor.css({
            position: "absolute",
            top: 0,
            height: self.opt.cursorwidth,
            width: "0px",
            'background-color': self.opt.cursorcolor,
            border: self.opt.cursorborder,
            'background-clip': 'padding-box',
            '-webkit-border-radius': self.opt.cursorborderradius,
            '-moz-border-radius': self.opt.cursorborderradius,
            'border-radius': self.opt.cursorborderradius
          });

          if (cap.isieold) cursor.css({'overflow':'hidden'});  //IE6 horiz scrollbar issue
          
          cursor.wborder = parseFloat(cursor.outerWidth() - cursor.innerWidth());
          
          cursor.addClass('nicescroll-cursors');
          
          self.cursorh = cursor;

          railh = $(document.createElement('div'));
          railh.attr('id', self.id + '-hr');
          railh.addClass('nicescroll-rails nicescroll-rails-hr');
          railh.height = Math.max(parseFloat(self.opt.cursorwidth), cursor.outerHeight());
          railh.css({
            height: railh.height + "px",
            'zIndex': self.zindex,
            "background": self.opt.background
          });

          railh.append(cursor);

          railh.visibility = true;
          railh.scrollable = true;

          railh.align = (self.opt.railvalign == "top") ? 0 : 1;

          self.railh = railh;

          self.railh.drag = false;

        }

        //        

        if (self.ispage) {
          rail.css({
            position: "fixed",
            top: "0px",
            height: "100%"
          });
          (rail.align) ? rail.css({
            right: "0px"
          }): rail.css({
            left: "0px"
          });
          self.body.append(rail);
          if (self.railh) {
            railh.css({
              position: "fixed",
              left: "0px",
              width: "100%"
            });
            (railh.align) ? railh.css({
              bottom: "0px"
            }): railh.css({
              top: "0px"
            });
            self.body.append(railh);
          }
        } else {
          if (self.ishwscroll) {
            if (self.win.css('position') == 'static') self.css(self.win, {
              'position': 'relative'
            });
            var bd = (self.win[0].nodeName == 'HTML') ? self.body : self.win;
            $(bd).scrollTop(0).scrollLeft(0);  // fix rail position if content already scrolled
            if (self.zoom) {
              self.zoom.css({
                position: "absolute",
                top: 1,
                right: 0,
                "margin-right": rail.width + 4
              });
              bd.append(self.zoom);
            }
            rail.css({
              position: "absolute",
              top: 0
            });
            (rail.align) ? rail.css({
              right: 0
            }): rail.css({
              left: 0
            });
            bd.append(rail);
            if (railh) {
              railh.css({
                position: "absolute",
                left: 0,
                bottom: 0
              });
              (railh.align) ? railh.css({
                bottom: 0
              }): railh.css({
                top: 0
              });
              bd.append(railh);
            }
          } else {
            self.isfixed = (self.win.css("position") == "fixed");
            var rlpos = (self.isfixed) ? "fixed" : "absolute";

            if (!self.isfixed) self.viewport = self.getViewport(self.win[0]);
            if (self.viewport) {
              self.body = self.viewport;
              if ((/fixed|absolute/.test(self.viewport.css("position"))) == false) self.css(self.viewport, {
                "position": "relative"
              });
            }

            rail.css({
              position: rlpos
            });
            if (self.zoom) self.zoom.css({
              position: rlpos
            });
            self.updateScrollBar();
            self.body.append(rail);
            if (self.zoom) self.body.append(self.zoom);
            if (self.railh) {
              railh.css({
                position: rlpos
              });
              self.body.append(railh);
            }
          }

          if (cap.isios) self.css(self.win, {
            '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
            '-webkit-touch-callout': 'none'
          }); // prevent grey layer on click

          if (cap.isie && self.opt.disableoutline) self.win.attr("hideFocus", "true"); // IE, prevent dotted rectangle on focused div
          if (cap.iswebkit && self.opt.disableoutline) self.win.css({"outline": "none"});  // Webkit outline
          //if (cap.isopera&&self.opt.disableoutline) self.win.css({"outline":"0"});  // Opera 12- to test [TODO]

        }

        if (self.opt.autohidemode === false) {
          self.autohidedom = false;
          self.rail.css({
            opacity: self.opt.cursoropacitymax
          });
          if (self.railh) self.railh.css({
            opacity: self.opt.cursoropacitymax
          });
        } else if ((self.opt.autohidemode === true) || (self.opt.autohidemode === "leave")) {
          self.autohidedom = $().add(self.rail);
          if (cap.isie8) self.autohidedom = self.autohidedom.add(self.cursor);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
          if (self.railh && cap.isie8) self.autohidedom = self.autohidedom.add(self.cursorh);
        } else if (self.opt.autohidemode == "scroll") {
          self.autohidedom = $().add(self.rail);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
        } else if (self.opt.autohidemode == "cursor") {
          self.autohidedom = $().add(self.cursor);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.cursorh);
        } else if (self.opt.autohidemode == "hidden") {
          self.autohidedom = false;
          self.hide();
          self.railslocked = false;
        }

        if (cap.isie9mobile) {

          self.scrollmom = new ScrollMomentumClass2D(self);

          self.onmangotouch = function() {
            var py = self.getScrollTop();
            var px = self.getScrollLeft();

            if ((py == self.scrollmom.lastscrolly) && (px == self.scrollmom.lastscrollx)) return true;

            var dfy = py - self.mangotouch.sy;
            var dfx = px - self.mangotouch.sx;
            var df = Math.round(Math.sqrt(Math.pow(dfx, 2) + Math.pow(dfy, 2)));
            if (df == 0) return;

            var dry = (dfy < 0) ? -1 : 1;
            var drx = (dfx < 0) ? -1 : 1;

            var tm = +new Date();
            if (self.mangotouch.lazy) clearTimeout(self.mangotouch.lazy);

            if (((tm - self.mangotouch.tm) > 80) || (self.mangotouch.dry != dry) || (self.mangotouch.drx != drx)) {
              self.scrollmom.stop();
              self.scrollmom.reset(px, py);
              self.mangotouch.sy = py;
              self.mangotouch.ly = py;
              self.mangotouch.sx = px;
              self.mangotouch.lx = px;
              self.mangotouch.dry = dry;
              self.mangotouch.drx = drx;
              self.mangotouch.tm = tm;
            } else {

              self.scrollmom.stop();
              self.scrollmom.update(self.mangotouch.sx - dfx, self.mangotouch.sy - dfy);
              self.mangotouch.tm = tm;

              var ds = Math.max(Math.abs(self.mangotouch.ly - py), Math.abs(self.mangotouch.lx - px));
              self.mangotouch.ly = py;
              self.mangotouch.lx = px;

              if (ds > 2) {
                self.mangotouch.lazy = setTimeout(function() {
                  self.mangotouch.lazy = false;
                  self.mangotouch.dry = 0;
                  self.mangotouch.drx = 0;
                  self.mangotouch.tm = 0;
                  self.scrollmom.doMomentum(30);
                }, 100);
              }
            }
          };

          var top = self.getScrollTop();
          var lef = self.getScrollLeft();
          self.mangotouch = {
            sy: top,
            ly: top,
            dry: 0,
            sx: lef,
            lx: lef,
            drx: 0,
            lazy: false,
            tm: 0
          };

          self.bind(self.docscroll, "scroll", self.onmangotouch);

        } else {

          if (cap.cantouch || self.istouchcapable || self.opt.touchbehavior || cap.hasmstouch) {

            self.scrollmom = new ScrollMomentumClass2D(self);

            self.ontouchstart = function(e) {
              if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
              
              self.hasmoving = false;

              if (!self.railslocked) {

                var tg;
                if (cap.hasmstouch) {
                  tg = (e.target) ? e.target : false;
                  while (tg) {
                    var nc = $(tg).getNiceScroll();
                    if ((nc.length > 0) && (nc[0].me == self.me)) break;
                    if (nc.length > 0) return false;
                    if ((tg.nodeName == 'DIV') && (tg.id == self.id)) break;
                    tg = (tg.parentNode) ? tg.parentNode : false;
                  }
                }

                self.cancelScroll();

                tg = self.getTarget(e);

                if (tg) {
                  var skp = (/INPUT/i.test(tg.nodeName)) && (/range/i.test(tg.type));
                  if (skp) return self.stopPropagation(e);
                }

                if (!("clientX" in e) && ("changedTouches" in e)) {
                  e.clientX = e.changedTouches[0].clientX;
                  e.clientY = e.changedTouches[0].clientY;
                }

                if (self.forcescreen) {
                  var le = e;
                  e = {
                    "original": (e.original) ? e.original : e
                  };
                  e.clientX = le.screenX;
                  e.clientY = le.screenY;
                }

                self.rail.drag = {
                  x: e.clientX,
                  y: e.clientY,
                  sx: self.scroll.x,
                  sy: self.scroll.y,
                  st: self.getScrollTop(),
                  sl: self.getScrollLeft(),
                  pt: 2,
                  dl: false
                };

                if (self.ispage || !self.opt.directionlockdeadzone) {
                  self.rail.drag.dl = "f";
                } else {

                  var view = {
                    w: $(window).width(),
                    h: $(window).height()
                  };

                  var page = {
                    w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                    h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                  };

                  var maxh = Math.max(0, page.h - view.h);
                  var maxw = Math.max(0, page.w - view.w);

                  if (!self.rail.scrollable && self.railh.scrollable) self.rail.drag.ck = (maxh > 0) ? "v" : false;
                  else if (self.rail.scrollable && !self.railh.scrollable) self.rail.drag.ck = (maxw > 0) ? "h" : false;
                  else self.rail.drag.ck = false;
                  if (!self.rail.drag.ck) self.rail.drag.dl = "f";
                }

                if (self.opt.touchbehavior && self.isiframe && cap.isie) {
                  var wp = self.win.position();
                  self.rail.drag.x += wp.left;
                  self.rail.drag.y += wp.top;
                }

                self.hasmoving = false;
                self.lastmouseup = false;
                self.scrollmom.reset(e.clientX, e.clientY);
                
                if (!cap.cantouch && !this.istouchcapable && !e.pointerType) {       
                
                  var ip = (tg) ? /INPUT|SELECT|TEXTAREA/i.test(tg.nodeName) : false;
                  if (!ip) {
                    if (!self.ispage && cap.hasmousecapture) tg.setCapture();
                    if (self.opt.touchbehavior) {
                      if (tg.onclick && !(tg._onclick || false)) { // intercept DOM0 onclick event
                        tg._onclick = tg.onclick;
                        tg.onclick = function(e) {
                          if (self.hasmoving) return false;
                          tg._onclick.call(this, e);
                        };
                      }
                      return self.cancelEvent(e);
                    }
                    return self.stopPropagation(e);
                  }

                  if (/SUBMIT|CANCEL|BUTTON/i.test($(tg).attr('type'))) {
                    pc = {
                      "tg": tg,
                      "click": false
                    };
                    self.preventclick = pc;
                  }

                }
              }

            };

            self.ontouchend = function(e) {              
              if (!self.rail.drag) return true;              
              if (self.rail.drag.pt == 2) {
                if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
                self.scrollmom.doMomentum();
                self.rail.drag = false;
                if (self.hasmoving) {
                  self.lastmouseup = true;
                  self.hideCursor();
                  if (cap.hasmousecapture) document.releaseCapture();
                  if (!cap.cantouch) return self.cancelEvent(e);
                }
              }
              else if (self.rail.drag.pt == 1) {
                return self.onmouseup(e);
              }

            };

            var moveneedoffset = (self.opt.touchbehavior && self.isiframe && !cap.hasmousecapture);

            self.ontouchmove = function(e, byiframe) {

              if (!self.rail.drag) return false;
            
              if (e.targetTouches && self.opt.preventmultitouchscrolling) {
                if (e.targetTouches.length > 1) return false; // multitouch
              }
            
              if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
          
              if (self.rail.drag.pt == 2) {
                if (cap.cantouch && (cap.isios) && (typeof e.original == "undefined")) return true; // prevent ios "ghost" events by clickable elements

                self.hasmoving = true;

                if (self.preventclick && !self.preventclick.click) {
                  self.preventclick.click = self.preventclick.tg.onclick || false;
                  self.preventclick.tg.onclick = self.onpreventclick;
                }

                var ev = $.extend({
                  "original": e
                }, e);
                e = ev;

                if (("changedTouches" in e)) {
                  e.clientX = e.changedTouches[0].clientX;
                  e.clientY = e.changedTouches[0].clientY;
                }

                if (self.forcescreen) {
                  var le = e;
                  e = {
                    "original": (e.original) ? e.original : e
                  };
                  e.clientX = le.screenX;
                  e.clientY = le.screenY;
                }

                var ofy,ofx;
                ofx = ofy = 0;

                if (moveneedoffset && !byiframe) {
                  var wp = self.win.position();
                  ofx = -wp.left;
                  ofy = -wp.top;
                }

                var fy = e.clientY + ofy;
                var my = (fy - self.rail.drag.y);
                var fx = e.clientX + ofx;
                var mx = (fx - self.rail.drag.x);

                var ny = self.rail.drag.st - my;

                if (self.ishwscroll && self.opt.bouncescroll) {
                  if (ny < 0) {
                    ny = Math.round(ny / 2);
                    //                    fy = 0;
                  } else if (ny > self.page.maxh) {
                    ny = self.page.maxh + Math.round((ny - self.page.maxh) / 2);
                    //                    fy = 0;
                  }
                } else {
                  if (ny < 0) {
                    ny = 0;
                    fy = 0;
                  }
                  if (ny > self.page.maxh) {
                    ny = self.page.maxh;
                    fy = 0;
                  }
                }

                var nx;
                if (self.railh && self.railh.scrollable) {
                  nx = (self.isrtlmode) ? mx - self.rail.drag.sl : self.rail.drag.sl - mx;

                  if (self.ishwscroll && self.opt.bouncescroll) {
                    if (nx < 0) {
                      nx = Math.round(nx / 2);
                      //                      fx = 0;
                    } else if (nx > self.page.maxw) {
                      nx = self.page.maxw + Math.round((nx - self.page.maxw) / 2);
                      //                      fx = 0;
                    }
                  } else {
                    if (nx < 0) {
                      nx = 0;
                      fx = 0;
                    }
                    if (nx > self.page.maxw) {
                      nx = self.page.maxw;
                      fx = 0;
                    }
                  }

                }

                var grabbed = false;
                if (self.rail.drag.dl) {
                  grabbed = true;
                  if (self.rail.drag.dl == "v") nx = self.rail.drag.sl;
                  else if (self.rail.drag.dl == "h") ny = self.rail.drag.st;
                } else {
                  var ay = Math.abs(my);
                  var ax = Math.abs(mx);
                  var dz = self.opt.directionlockdeadzone;
                  if (self.rail.drag.ck == "v") {
                    if (ay > dz && (ax <= (ay * 0.3))) {
                      self.rail.drag = false;
                      return true;
                    } else if (ax > dz) {
                      self.rail.drag.dl = "f";
                      $("body").scrollTop($("body").scrollTop()); // stop iOS native scrolling (when active javascript has blocked)
                    }
                  } else if (self.rail.drag.ck == "h") {
                    if (ax > dz && (ay <= (ax * 0.3))) {
                      self.rail.drag = false;
                      return true;
                    } else if (ay > dz) {
                      self.rail.drag.dl = "f";
                      $("body").scrollLeft($("body").scrollLeft()); // stop iOS native scrolling (when active javascript has blocked)
                    }
                  }
                }

                self.synched("touchmove", function() {
                  if (self.rail.drag && (self.rail.drag.pt == 2)) {
                    if (self.prepareTransition) self.prepareTransition(0);
                    if (self.rail.scrollable) self.setScrollTop(ny);
                    self.scrollmom.update(fx, fy);
                    if (self.railh && self.railh.scrollable) {
                      self.setScrollLeft(nx);
                      self.showCursor(ny, nx);
                    } else {
                      self.showCursor(ny);
                    }
                    if (cap.isie10) document.selection.clear();
                  }
                });

                if (cap.ischrome && self.istouchcapable) grabbed = false; //chrome touch emulation doesn't like!
                if (grabbed) return self.cancelEvent(e);
              }
              else if (self.rail.drag.pt == 1) { // drag on cursor
                return self.onmousemove(e);
              }

            };

          }

          self.onmousedown = function(e, hronly) {
            if (self.rail.drag && self.rail.drag.pt != 1) return;
            if (self.railslocked) return self.cancelEvent(e);
            self.cancelScroll();
            self.rail.drag = {
              x: e.clientX,
              y: e.clientY,
              sx: self.scroll.x,
              sy: self.scroll.y,
              pt: 1,
              hr: (!!hronly)
            };
            var tg = self.getTarget(e);
            if (!self.ispage && cap.hasmousecapture) tg.setCapture();
            if (self.isiframe && !cap.hasmousecapture) {
              self.saved.csspointerevents = self.doc.css("pointer-events");
              self.css(self.doc, {
                "pointer-events": "none"
              });
            }
            self.hasmoving = false;
            return self.cancelEvent(e);
          };

          self.onmouseup = function(e) {
            if (self.rail.drag) {
              if (self.rail.drag.pt != 1) return true;
              if (cap.hasmousecapture) document.releaseCapture();
              if (self.isiframe && !cap.hasmousecapture) self.doc.css("pointer-events", self.saved.csspointerevents);              
              self.rail.drag = false;
              //if (!self.rail.active) self.hideCursor();
              if (self.hasmoving) self.triggerScrollEnd(); // TODO - check &&!self.scrollrunning
              return self.cancelEvent(e);
            }
          };

          self.onmousemove = function(e) {
            if (self.rail.drag) {
              if (self.rail.drag.pt != 1) return;

              if (cap.ischrome && e.which == 0) return self.onmouseup(e);

              self.cursorfreezed = true;
              self.hasmoving = true;

              if (self.rail.drag.hr) {
                self.scroll.x = self.rail.drag.sx + (e.clientX - self.rail.drag.x);
                if (self.scroll.x < 0) self.scroll.x = 0;
                var mw = self.scrollvaluemaxw;
                if (self.scroll.x > mw) self.scroll.x = mw;
              } else {
                self.scroll.y = self.rail.drag.sy + (e.clientY - self.rail.drag.y);
                if (self.scroll.y < 0) self.scroll.y = 0;
                var my = self.scrollvaluemax;
                if (self.scroll.y > my) self.scroll.y = my;
              }

              self.synched('mousemove', function() {
                if (self.rail.drag && (self.rail.drag.pt == 1)) {
                  self.showCursor();
                  if (self.rail.drag.hr) {
                    if (self.hasreversehr) {
                      self.doScrollLeft(self.scrollvaluemaxw-Math.round(self.scroll.x * self.scrollratio.x), self.opt.cursordragspeed);
                    } else {
                      self.doScrollLeft(Math.round(self.scroll.x * self.scrollratio.x), self.opt.cursordragspeed);
                    }
                  }
                  else self.doScrollTop(Math.round(self.scroll.y * self.scrollratio.y), self.opt.cursordragspeed);
                }
              });

              return self.cancelEvent(e);
            }
            else {
              self.checkarea = 0;
            }
          };

          if (cap.cantouch || self.opt.touchbehavior) {

            self.onpreventclick = function(e) {
              if (self.preventclick) {
                self.preventclick.tg.onclick = self.preventclick.click;
                self.preventclick = false;
                return self.cancelEvent(e);
              }
            }

            self.bind(self.win, "mousedown", self.ontouchstart); // control content dragging

            self.onclick = (cap.isios) ? false : function(e) {
              if (self.lastmouseup) {
                self.lastmouseup = false;
                return self.cancelEvent(e);
              } else {
                return true;
              }
            };

            if (self.opt.grabcursorenabled && cap.cursorgrabvalue) {
              self.css((self.ispage) ? self.doc : self.win, {
                'cursor': cap.cursorgrabvalue
              });
              self.css(self.rail, {
                'cursor': cap.cursorgrabvalue
              });
            }

          } else {

            var checkSelectionScroll = function(e) {
              if (!self.selectiondrag) return;

              if (e) {
                var ww = self.win.outerHeight();
                var df = (e.pageY - self.selectiondrag.top);
                if (df > 0 && df < ww) df = 0;
                if (df >= ww) df -= ww;
                self.selectiondrag.df = df;
              }
              if (self.selectiondrag.df == 0) return;

              var rt = -Math.floor(self.selectiondrag.df / 6) * 2;
              self.doScrollBy(rt);

              self.debounced("doselectionscroll", function() {
                checkSelectionScroll()
              }, 50);
            };

            if ("getSelection" in document) { // A grade - Major browsers
              self.hasTextSelected = function() {
                return (document.getSelection().rangeCount > 0);
              };
            } else if ("selection" in document) { //IE9-
              self.hasTextSelected = function() {
                return (document.selection.type != "None");
              };
            } else {
              self.hasTextSelected = function() { // no support
                return false;
              };
            }

            self.onselectionstart = function(e) {
/*  More testing - severe chrome issues            
              if (!self.haswrapper&&(e.which&&e.which==2)) {  // fool browser to manage middle button scrolling
                self.win.css({'overflow':'auto'});
                setTimeout(function(){
                  self.win.css({'overflow':''});
                },10);                
                return true;
              }            
*/              
              if (self.ispage) return;
              self.selectiondrag = self.win.offset();
            };
            
            self.onselectionend = function(e) {
              self.selectiondrag = false;
            };
            self.onselectiondrag = function(e) {
              if (!self.selectiondrag) return;
              if (self.hasTextSelected()) self.debounced("selectionscroll", function() {
                checkSelectionScroll(e)
              }, 250);
            };


          }

          if (cap.hasw3ctouch) { //IE11+
            self.css(self.rail, {
              'touch-action': 'none'
            });
            self.css(self.cursor, {
              'touch-action': 'none'
            });
            self.bind(self.win, "pointerdown", self.ontouchstart);
            self.bind(document, "pointerup", self.ontouchend);
            self.bind(document, "pointermove", self.ontouchmove);
          } else if (cap.hasmstouch) { //IE10
            self.css(self.rail, {
              '-ms-touch-action': 'none'
            });
            self.css(self.cursor, {
              '-ms-touch-action': 'none'
            });
            self.bind(self.win, "MSPointerDown", self.ontouchstart);
            self.bind(document, "MSPointerUp", self.ontouchend);
            self.bind(document, "MSPointerMove", self.ontouchmove);
            self.bind(self.cursor, "MSGestureHold", function(e) {
              e.preventDefault()
            });
            self.bind(self.cursor, "contextmenu", function(e) {
              e.preventDefault()
            });
          } else if (this.istouchcapable) { //desktop with screen touch enabled
            self.bind(self.win, "touchstart", self.ontouchstart);
            self.bind(document, "touchend", self.ontouchend);
            self.bind(document, "touchcancel", self.ontouchend);
            self.bind(document, "touchmove", self.ontouchmove);
          }

          
          if (self.opt.cursordragontouch || (!cap.cantouch && !self.opt.touchbehavior)) {

            self.rail.css({
              "cursor": "default"
            });
            self.railh && self.railh.css({
              "cursor": "default"
            });

            self.jqbind(self.rail, "mouseenter", function() {
              if (!self.ispage && !self.win.is(":visible")) return false;
              if (self.canshowonmouseevent) self.showCursor();
              self.rail.active = true;
            });
            self.jqbind(self.rail, "mouseleave", function() {
              self.rail.active = false;
              if (!self.rail.drag) self.hideCursor();
            });

            if (self.opt.sensitiverail) {
              self.bind(self.rail, "click", function(e) {
                self.doRailClick(e, false, false)
              });
              self.bind(self.rail, "dblclick", function(e) {
                self.doRailClick(e, true, false)
              });
              self.bind(self.cursor, "click", function(e) {
                self.cancelEvent(e)
              });
              self.bind(self.cursor, "dblclick", function(e) {
                self.cancelEvent(e)
              });
            }

            if (self.railh) {
              self.jqbind(self.railh, "mouseenter", function() {
                if (!self.ispage && !self.win.is(":visible")) return false;
                if (self.canshowonmouseevent) self.showCursor();
                self.rail.active = true;
              });
              self.jqbind(self.railh, "mouseleave", function() {
                self.rail.active = false;
                if (!self.rail.drag) self.hideCursor();
              });

              if (self.opt.sensitiverail) {
                self.bind(self.railh, "click", function(e) {
                  self.doRailClick(e, false, true)
                });
                self.bind(self.railh, "dblclick", function(e) {
                  self.doRailClick(e, true, true)
                });
                self.bind(self.cursorh, "click", function(e) {
                  self.cancelEvent(e)
                });
                self.bind(self.cursorh, "dblclick", function(e) {
                  self.cancelEvent(e)
                });
              }

            }

          }

          if (!cap.cantouch && !self.opt.touchbehavior) {

            self.bind((cap.hasmousecapture) ? self.win : document, "mouseup", self.onmouseup);
            self.bind(document, "mousemove", self.onmousemove);
            if (self.onclick) self.bind(document, "click", self.onclick);

            self.bind(self.cursor, "mousedown", self.onmousedown);
            self.bind(self.cursor, "mouseup", self.onmouseup);

            if (self.railh) {
              self.bind(self.cursorh, "mousedown", function(e) {
                self.onmousedown(e, true)
              });
              self.bind(self.cursorh, "mouseup", self.onmouseup);
            }
            
            if (!self.ispage && self.opt.enablescrollonselection) {
              self.bind(self.win[0], "mousedown", self.onselectionstart);
              self.bind(document, "mouseup", self.onselectionend);
              self.bind(self.cursor, "mouseup", self.onselectionend);
              if (self.cursorh) self.bind(self.cursorh, "mouseup", self.onselectionend);
              self.bind(document, "mousemove", self.onselectiondrag);
            }

            if (self.zoom) {
              self.jqbind(self.zoom, "mouseenter", function() {
                if (self.canshowonmouseevent) self.showCursor();
                self.rail.active = true;
              });
              self.jqbind(self.zoom, "mouseleave", function() {
                self.rail.active = false;
                if (!self.rail.drag) self.hideCursor();
              });
            }

          } else {

            self.bind((cap.hasmousecapture) ? self.win : document, "mouseup", self.ontouchend);
            self.bind(document, "mousemove", self.ontouchmove);
            if (self.onclick) self.bind(document, "click", self.onclick);

            if (self.opt.cursordragontouch) {
              self.bind(self.cursor, "mousedown", self.onmousedown);
              self.bind(self.cursor, "mouseup", self.onmouseup);
              //self.bind(self.cursor, "mousemove", self.onmousemove);
              self.cursorh && self.bind(self.cursorh, "mousedown", function(e) {
                self.onmousedown(e, true)
              });
              //self.cursorh && self.bind(self.cursorh, "mousemove", self.onmousemove);
              self.cursorh && self.bind(self.cursorh, "mouseup", self.onmouseup);
            }

          }

          if (self.opt.enablemousewheel) {
            if (!self.isiframe) self.bind((cap.isie && self.ispage) ? document : self.win /*self.docscroll*/ , "mousewheel", self.onmousewheel);
            self.bind(self.rail, "mousewheel", self.onmousewheel);
            if (self.railh) self.bind(self.railh, "mousewheel", self.onmousewheelhr);
          }

          if (!self.ispage && !cap.cantouch && !(/HTML|^BODY/.test(self.win[0].nodeName))) {
            if (!self.win.attr("tabindex")) self.win.attr({
              "tabindex": tabindexcounter++
            });

            self.jqbind(self.win, "focus", function(e) {
              domfocus = (self.getTarget(e)).id || true;
              self.hasfocus = true;
              if (self.canshowonmouseevent) self.noticeCursor();
            });
            self.jqbind(self.win, "blur", function(e) {
              domfocus = false;
              self.hasfocus = false;
            });

            self.jqbind(self.win, "mouseenter", function(e) {
              mousefocus = (self.getTarget(e)).id || true;
              self.hasmousefocus = true;
              if (self.canshowonmouseevent) self.noticeCursor();
            });
            self.jqbind(self.win, "mouseleave", function() {
              mousefocus = false;
              self.hasmousefocus = false;
              if (!self.rail.drag) self.hideCursor();
            });

          }

        } // !ie9mobile

        //Thanks to http://www.quirksmode.org !!
        self.onkeypress = function(e) {
          if (self.railslocked && self.page.maxh == 0) return true;

          e = (e) ? e : window.e;
          var tg = self.getTarget(e);
          if (tg && /INPUT|TEXTAREA|SELECT|OPTION/.test(tg.nodeName)) {
            var tp = tg.getAttribute('type') || tg.type || false;
            if ((!tp) || !(/submit|button|cancel/i.tp)) return true;
          }

          if ($(tg).attr('contenteditable')) return true;

          if (self.hasfocus || (self.hasmousefocus && !domfocus) || (self.ispage && !domfocus && !mousefocus)) {
            var key = e.keyCode;

            if (self.railslocked && key != 27) return self.cancelEvent(e);

            var ctrl = e.ctrlKey || false;
            var shift = e.shiftKey || false;

            var ret = false;
            switch (key) {
              case 38:
              case 63233: //safari
                self.doScrollBy(24 * 3);
                ret = true;
                break;
              case 40:
              case 63235: //safari
                self.doScrollBy(-24 * 3);
                ret = true;
                break;
              case 37:
              case 63232: //safari
                if (self.railh) {
                  (ctrl) ? self.doScrollLeft(0): self.doScrollLeftBy(24 * 3);
                  ret = true;
                }
                break;
              case 39:
              case 63234: //safari
                if (self.railh) {
                  (ctrl) ? self.doScrollLeft(self.page.maxw): self.doScrollLeftBy(-24 * 3);
                  ret = true;
                }
                break;
              case 33:
              case 63276: // safari
                self.doScrollBy(self.view.h);
                ret = true;
                break;
              case 34:
              case 63277: // safari
                self.doScrollBy(-self.view.h);
                ret = true;
                break;
              case 36:
              case 63273: // safari                
                (self.railh && ctrl) ? self.doScrollPos(0, 0): self.doScrollTo(0);
                ret = true;
                break;
              case 35:
              case 63275: // safari
                (self.railh && ctrl) ? self.doScrollPos(self.page.maxw, self.page.maxh): self.doScrollTo(self.page.maxh);
                ret = true;
                break;
              case 32:
                if (self.opt.spacebarenabled) {
                  (shift) ? self.doScrollBy(self.view.h): self.doScrollBy(-self.view.h);
                  ret = true;
                }
                break;
              case 27: // ESC
                if (self.zoomactive) {
                  self.doZoom();
                  ret = true;
                }
                break;
            }
            if (ret) return self.cancelEvent(e);
          }
        };

        if (self.opt.enablekeyboard) self.bind(document, (cap.isopera && !cap.isopera12) ? "keypress" : "keydown", self.onkeypress);

        self.bind(document, "keydown", function(e) {
          var ctrl = e.ctrlKey || false;
          if (ctrl) self.wheelprevented = true;
        });
        self.bind(document, "keyup", function(e) {
          var ctrl = e.ctrlKey || false;
          if (!ctrl) self.wheelprevented = false;
        });
        self.bind(window,"blur",function(e){
          self.wheelprevented = false;
        });        

        self.bind(window, 'resize', self.lazyResize);
        self.bind(window, 'orientationchange', self.lazyResize);

        self.bind(window, "load", self.lazyResize);

        if (cap.ischrome && !self.ispage && !self.haswrapper) { //chrome void scrollbar bug - it persists in version 26
          var tmp = self.win.attr("style");
          var ww = parseFloat(self.win.css("width")) + 1;
          self.win.css('width', ww);
          self.synched("chromefix", function() {
            self.win.attr("style", tmp)
          });
        }


        // Trying a cross-browser implementation - good luck!

        self.onAttributeChange = function(e) {
          self.lazyResize(self.isieold ? 250 : 30);
        };

        if (ClsMutationObserver !== false) {
          self.observerbody = new ClsMutationObserver(function(mutations) {
            mutations.forEach(function(mut){
              if (mut.type=="attributes") {
                return ($("body").hasClass("modal-open") && !$.contains($('.modal-dialog')[0],self.doc[0])) ? self.hide() : self.show();  // Support for Bootstrap modal; Added check if the nice scroll element is inside a modal
              }
            });  
            if (document.body.scrollHeight!=self.page.maxh) return self.lazyResize(30);
          });
          self.observerbody.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: false,
            attributes: true,
            attributeFilter: ['class']
          });
        }
        
        if (!self.ispage && !self.haswrapper) {
          // redesigned MutationObserver for Chrome18+/Firefox14+/iOS6+ with support for: remove div, add/remove content
          if (ClsMutationObserver !== false) {
            self.observer = new ClsMutationObserver(function(mutations) {
              mutations.forEach(self.onAttributeChange);
            });
            self.observer.observe(self.win[0], {
              childList: true,
              characterData: false,
              attributes: true,
              subtree: false
            });
            self.observerremover = new ClsMutationObserver(function(mutations) {
              mutations.forEach(function(mo) {
                if (mo.removedNodes.length > 0) {
                  for (var dd in mo.removedNodes) {
                    if (!!self && (mo.removedNodes[dd] == self.win[0])) return self.remove();
                  }
                }
              });
            });
            self.observerremover.observe(self.win[0].parentNode, {
              childList: true,
              characterData: false,
              attributes: false,
              subtree: false
            });
          } else {
            self.bind(self.win, (cap.isie && !cap.isie9) ? "propertychange" : "DOMAttrModified", self.onAttributeChange);
            if (cap.isie9) self.win[0].attachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug
            self.bind(self.win, "DOMNodeRemoved", function(e) {
              if (e.target == self.win[0]) self.remove();
            });
          }
        }

        //

        if (!self.ispage && self.opt.boxzoom) self.bind(window, "resize", self.resizeZoom);
				if (self.istextarea) {
					self.bind(self.win, "keydown", self.lazyResize);
					self.bind(self.win, "mouseup", self.lazyResize);
				}

        //        self.checkrtlmode = true;
        self.lazyResize(30);

      }
      
      if (this.doc[0].nodeName == 'IFRAME') {
        var oniframeload = function() {
          self.iframexd = false;
          var doc;
          try {
            doc = 'contentDocument' in this ? this.contentDocument : this.contentWindow.document;
            var a = doc.domain;
          } catch (e) {
            self.iframexd = true;
            doc = false
          }
          
          if (self.iframexd) {
            if ("console" in window) console.log('NiceScroll error: policy restriced iframe');
            return true; //cross-domain - I can't manage this        
          }

          self.forcescreen = true;

          if (self.isiframe) {
            self.iframe = {
              "doc": $(doc),
              "html": self.doc.contents().find('html')[0],
              "body": self.doc.contents().find('body')[0]
            };
            self.getContentSize = function() {
              return {
                w: Math.max(self.iframe.html.scrollWidth, self.iframe.body.scrollWidth),
                h: Math.max(self.iframe.html.scrollHeight, self.iframe.body.scrollHeight)
              };
            };
            self.docscroll = $(self.iframe.body); //$(this.contentWindow);
          }

          if (!cap.isios && self.opt.iframeautoresize && !self.isiframe) {
            self.win.scrollTop(0); // reset position
            self.doc.height(""); //reset height to fix browser bug
            var hh = Math.max(doc.getElementsByTagName('html')[0].scrollHeight, doc.body.scrollHeight);
            self.doc.height(hh);
          }
          self.lazyResize(30);

          if (cap.isie7) self.css($(self.iframe.html), {
            'overflow-y': 'hidden'
          });
          self.css($(self.iframe.body), {
            'overflow-y': 'hidden'
          });

          if (cap.isios && self.haswrapper) {
            self.css($(doc.body), {
              '-webkit-transform': 'translate3d(0,0,0)'
            }); // avoid iFrame content clipping - thanks to http://blog.derraab.com/2012/04/02/avoid-iframe-content-clipping-with-css-transform-on-ios/
          }

          if ('contentWindow' in this) {
            self.bind(this.contentWindow, "scroll", self.onscroll); //IE8 & minor
          } else {
            self.bind(doc, "scroll", self.onscroll);
          }

          if (self.opt.enablemousewheel) {
            self.bind(doc, "mousewheel", self.onmousewheel);
          }

          if (self.opt.enablekeyboard) self.bind(doc, (cap.isopera) ? "keypress" : "keydown", self.onkeypress);

          if (cap.cantouch || self.opt.touchbehavior) {
            self.bind(doc, "mousedown", self.ontouchstart);
            self.bind(doc, "mousemove", function(e) {
              return self.ontouchmove(e, true)
            });
            if (self.opt.grabcursorenabled && cap.cursorgrabvalue) self.css($(doc.body), {
              'cursor': cap.cursorgrabvalue
            });
          }

          self.bind(doc, "mouseup", self.ontouchend);

          if (self.zoom) {
            if (self.opt.dblclickzoom) self.bind(doc, 'dblclick', self.doZoom);
            if (self.ongesturezoom) self.bind(doc, "gestureend", self.ongesturezoom);
          }
        };

        if (this.doc[0].readyState && this.doc[0].readyState == "complete") {
          setTimeout(function() {
            oniframeload.call(self.doc[0], false)
          }, 500);
        }
        self.bind(this.doc, "load", oniframeload);

      }

    };

    this.showCursor = function(py, px) {
      if (self.cursortimeout) {
        clearTimeout(self.cursortimeout);
        self.cursortimeout = 0;
      }
      if (!self.rail) return;
      if (self.autohidedom) {
        self.autohidedom.stop().css({
          opacity: self.opt.cursoropacitymax
        });
        self.cursoractive = true;
      }

      if (!self.rail.drag || self.rail.drag.pt != 1) {
        if ((typeof py != "undefined") && (py !== false)) {
          self.scroll.y = Math.round(py * 1 / self.scrollratio.y);
        }
        if (typeof px != "undefined") {
          self.scroll.x = Math.round(px * 1 / self.scrollratio.x);
        }
      }

      self.cursor.css({
        height: self.cursorheight,
        top: self.scroll.y
      });
      if (self.cursorh) {        
        var lx = (self.hasreversehr) ? self.scrollvaluemaxw-self.scroll.x : self.scroll.x;
        (!self.rail.align && self.rail.visibility) ? self.cursorh.css({
          width: self.cursorwidth,
          left: lx + self.rail.width
        }): self.cursorh.css({
          width: self.cursorwidth,
          left: lx
        });
        self.cursoractive = true;
      }

      if (self.zoom) self.zoom.stop().css({
        opacity: self.opt.cursoropacitymax
      });
    };

    this.hideCursor = function(tm) {
      if (self.cursortimeout) return;
      if (!self.rail) return;
      if (!self.autohidedom) return;
      if (self.hasmousefocus && self.opt.autohidemode == "leave") return;
      self.cursortimeout = setTimeout(function() {
        if (!self.rail.active || !self.showonmouseevent) {
          self.autohidedom.stop().animate({
            opacity: self.opt.cursoropacitymin
          });
          if (self.zoom) self.zoom.stop().animate({
            opacity: self.opt.cursoropacitymin
          });
          self.cursoractive = false;
        }
        self.cursortimeout = 0;
      }, tm || self.opt.hidecursordelay);
    };

    this.noticeCursor = function(tm, py, px) {
      self.showCursor(py, px);
      if (!self.rail.active) self.hideCursor(tm);
    };

    this.getContentSize =
      (self.ispage) ?
      function() {
        return {
          w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
          h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }
      } : (self.haswrapper) ?
      function() {
        return {
          w: self.doc.outerWidth() + parseInt(self.win.css('paddingLeft')) + parseInt(self.win.css('paddingRight')),
          h: self.doc.outerHeight() + parseInt(self.win.css('paddingTop')) + parseInt(self.win.css('paddingBottom'))
        }
      } : function() {
        return {
          w: self.docscroll[0].scrollWidth,
          h: self.docscroll[0].scrollHeight
        }
      };

    this.onResize = function(e, page) {
    
      if (!self || !self.win) return false;

      if (!self.haswrapper && !self.ispage) {
        if (self.win.css('display') == 'none') {
          if (self.visibility) self.hideRail().hideRailHr();
          return false;
        } else {
          if (!self.hidden && !self.visibility) self.showRail().showRailHr();
        }
      }

      var premaxh = self.page.maxh;
      var premaxw = self.page.maxw;

      var preview = {
        h: self.view.h,
        w: self.view.w
      };

      self.view = {
        w: (self.ispage) ? self.win.width() : parseInt(self.win[0].clientWidth),
        h: (self.ispage) ? self.win.height() : parseInt(self.win[0].clientHeight)
      };

      self.page = (page) ? page : self.getContentSize();

      self.page.maxh = Math.max(0, self.page.h - self.view.h);
      self.page.maxw = Math.max(0, self.page.w - self.view.w);
      
      if ((self.page.maxh == premaxh) && (self.page.maxw == premaxw) && (self.view.w == preview.w) && (self.view.h == preview.h)) {
        // test position        
        if (!self.ispage) {
          var pos = self.win.offset();
          if (self.lastposition) {
            var lst = self.lastposition;
            if ((lst.top == pos.top) && (lst.left == pos.left)) return self; //nothing to do            
          }
          self.lastposition = pos;
        } else {
          return self; //nothing to do
        }
      }

      if (self.page.maxh == 0) {
        self.hideRail();
        self.scrollvaluemax = 0;
        self.scroll.y = 0;
        self.scrollratio.y = 0;
        self.cursorheight = 0;
        self.setScrollTop(0);
        if (self.rail) self.rail.scrollable = false;
      } else {
        self.page.maxh -= (self.opt.railpadding.top + self.opt.railpadding.bottom);  //**
        self.rail.scrollable = true;
      }

      if (self.page.maxw == 0) {
        self.hideRailHr();
        self.scrollvaluemaxw = 0;
        self.scroll.x = 0;
        self.scrollratio.x = 0;
        self.cursorwidth = 0;
        self.setScrollLeft(0);
        if (self.railh) {
          self.railh.scrollable = false;
        }
      } else {
          self.page.maxw -= (self.opt.railpadding.left + self.opt.railpadding.right);  //**
          if (self.railh) self.railh.scrollable = (self.opt.horizrailenabled);
      }

      self.railslocked = (self.locked) || ((self.page.maxh == 0) && (self.page.maxw == 0));
      if (self.railslocked) {
        if (!self.ispage) self.updateScrollBar(self.view);
        return false;
      }

      if (!self.hidden && !self.visibility) {
        self.showRail().showRailHr();
      }
      else if (self.railh && (!self.hidden && !self.railh.visibility)) self.showRailHr();

      if (self.istextarea && self.win.css('resize') && self.win.css('resize') != 'none') self.view.h -= 20;

      self.cursorheight = Math.min(self.view.h, Math.round(self.view.h * (self.view.h / self.page.h)));
      self.cursorheight = (self.opt.cursorfixedheight) ? self.opt.cursorfixedheight : Math.max(self.opt.cursorminheight, self.cursorheight);

      self.cursorwidth = Math.min(self.view.w, Math.round(self.view.w * (self.view.w / self.page.w)));
      self.cursorwidth = (self.opt.cursorfixedheight) ? self.opt.cursorfixedheight : Math.max(self.opt.cursorminheight, self.cursorwidth);

      self.scrollvaluemax = self.view.h - self.cursorheight - self.cursor.hborder - (self.opt.railpadding.top + self.opt.railpadding.bottom);  //**

      if (self.railh) {
        self.railh.width = (self.page.maxh > 0) ? (self.view.w - self.rail.width) : self.view.w;
        self.scrollvaluemaxw = self.railh.width - self.cursorwidth - self.cursorh.wborder - (self.opt.railpadding.left + self.opt.railpadding.right);  //**
      }

      /*
      if (self.checkrtlmode&&self.railh) {
        self.checkrtlmode = false;
        if (self.opt.rtlmode&&self.scroll.x==0) self.setScrollLeft(self.page.maxw);
      }
*/

      if (!self.ispage) self.updateScrollBar(self.view);

      self.scrollratio = {
        x: (self.page.maxw / self.scrollvaluemaxw),
        y: (self.page.maxh / self.scrollvaluemax)
      };

      var sy = self.getScrollTop();
      if (sy > self.page.maxh) {
        self.doScrollTop(self.page.maxh);
      } else {
        self.scroll.y = Math.round(self.getScrollTop() * (1 / self.scrollratio.y));
        self.scroll.x = Math.round(self.getScrollLeft() * (1 / self.scrollratio.x));
        if (self.cursoractive) self.noticeCursor();
      }

      if (self.scroll.y && (self.getScrollTop() == 0)) self.doScrollTo(Math.floor(self.scroll.y * self.scrollratio.y));

      return self;
    };

    this.resize = self.onResize;

    this.lazyResize = function(tm) { // event debounce
      tm = (isNaN(tm)) ? 30 : tm;
      self.debounced('resize', self.resize, tm);
      return self;
    };

    // modified by MDN https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference/wheel
    function _modernWheelEvent(dom, name, fn, bubble) {
      self._bind(dom, name, function(e) {
        var e = (e) ? e : window.event;
        var event = {
          original: e,
          target: e.target || e.srcElement,
          type: "wheel",
          deltaMode: e.type == "MozMousePixelScroll" ? 0 : 1,
          deltaX: 0,
          deltaZ: 0,
          preventDefault: function() {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            return false;
          },
          stopImmediatePropagation: function() {
            (e.stopImmediatePropagation) ? e.stopImmediatePropagation(): e.cancelBubble = true;
          }
        };

        if (name == "mousewheel") {
          event.deltaY = -1 / 40 * e.wheelDelta;
          e.wheelDeltaX && (event.deltaX = -1 / 40 * e.wheelDeltaX);
        } else {
          event.deltaY = e.detail;
        }

        return fn.call(dom, event);
      }, bubble);
    };



    this.jqbind = function(dom, name, fn) { // use jquery bind for non-native events (mouseenter/mouseleave)
      self.events.push({
        e: dom,
        n: name,
        f: fn,
        q: true
      });
      $(dom).bind(name, fn);
    };

    this.bind = function(dom, name, fn, bubble) { // touch-oriented & fixing jquery bind
      var el = ("jquery" in dom) ? dom[0] : dom;

      if (name == 'mousewheel') {
        if ("onwheel" in self.win) { // modern brosers & IE9 detection fix
          self._bind(el, "wheel", fn, bubble || false);
        } else {
          var wname = (typeof document.onmousewheel != "undefined") ? "mousewheel" : "DOMMouseScroll"; // older IE/Firefox
          _modernWheelEvent(el, wname, fn, bubble || false);
          if (wname == "DOMMouseScroll") _modernWheelEvent(el, "MozMousePixelScroll", fn, bubble || false); // Firefox legacy
        }
      } else if (el.addEventListener) {
        if (cap.cantouch && /mouseup|mousedown|mousemove/.test(name)) { // touch device support
          var tt = (name == 'mousedown') ? 'touchstart' : (name == 'mouseup') ? 'touchend' : 'touchmove';
          self._bind(el, tt, function(e) {
            if (e.touches) {
              if (e.touches.length < 2) {
                var ev = (e.touches.length) ? e.touches[0] : e;
                ev.original = e;
                fn.call(this, ev);
              }
            } else if (e.changedTouches) {
              var ev = e.changedTouches[0];
              ev.original = e;
              fn.call(this, ev);
            } //blackberry
          }, bubble || false);
        }
        self._bind(el, name, fn, bubble || false);
        if (cap.cantouch && name == "mouseup") self._bind(el, "touchcancel", fn, bubble || false);
      } else {
        self._bind(el, name, function(e) {
          e = e || window.event || false;
          if (e) {
            if (e.srcElement) e.target = e.srcElement;
          }
          if (!("pageY" in e)) {
            e.pageX = e.clientX + document.documentElement.scrollLeft;
            e.pageY = e.clientY + document.documentElement.scrollTop;
          }
          return ((fn.call(el, e) === false) || bubble === false) ? self.cancelEvent(e) : true;
        });
      }
    };

    if (cap.haseventlistener) {  // W3C standard model
      this._bind = function(el, name, fn, bubble) { // primitive bind
        self.events.push({
          e: el,
          n: name,
          f: fn,
          b: bubble,
          q: false
        });
        el.addEventListener(name, fn, bubble || false);
      };    
      this.cancelEvent = function(e) {
        if (!e) return false;
        var e = (e.original) ? e.original : e;
        e.preventDefault();
        e.stopPropagation();
        if (e.preventManipulation) e.preventManipulation(); //IE10
        return false;
      };
      this.stopPropagation = function(e) {
        if (!e) return false;
        var e = (e.original) ? e.original : e;
        e.stopPropagation();
        return false;
      };
      this._unbind = function(el, name, fn, bub) { // primitive unbind
        el.removeEventListener(name, fn, bub);
      };
    } else {  // old IE model
      this._bind = function(el, name, fn, bubble) { // primitive bind
        self.events.push({
          e: el,
          n: name,
          f: fn,
          b: bubble,
          q: false
        });
        if (el.attachEvent) {
          el.attachEvent("on" + name, fn);
        } else {
          el["on" + name] = fn;
        }
      };    
      // Thanks to http://www.switchonthecode.com !!
      this.cancelEvent = function(e) {
        var e = window.event || false;
        if (!e) return false;
        e.cancelBubble = true;
        e.cancel = true;
        e.returnValue = false;
        return false;
      };
      this.stopPropagation = function(e) {
        var e = window.event || false;
        if (!e) return false;
        e.cancelBubble = true;
        return false;
      };
      this._unbind = function(el, name, fn, bub) { // primitive unbind IE old
        if (el.detachEvent) {
          el.detachEvent('on' + name, fn);
        } else {
          el['on' + name] = false;
        }
      };
    }
    
    this.unbindAll = function() {
      for (var a = 0; a < self.events.length; a++) {
        var r = self.events[a];
        (r.q) ? r.e.unbind(r.n, r.f): self._unbind(r.e, r.n, r.f, r.b);
      }
    };

    this.showRail = function() {
      if ((self.page.maxh != 0) && (self.ispage || self.win.css('display') != 'none')) {
        self.visibility = true;
        self.rail.visibility = true;
        self.rail.css('display', 'block');
      }
      return self;
    };

    this.showRailHr = function() {
      if (!self.railh) return self;
      if ((self.page.maxw != 0) && (self.ispage || self.win.css('display') != 'none')) {
        self.railh.visibility = true;
        self.railh.css('display', 'block');
      }
      return self;
    };

    this.hideRail = function() {
      self.visibility = false;
      self.rail.visibility = false;
      self.rail.css('display', 'none');
      return self;
    };

    this.hideRailHr = function() {
      if (!self.railh) return self;
      self.railh.visibility = false;
      self.railh.css('display', 'none');
      return self;
    };

    this.show = function() {
      self.hidden = false;
      self.railslocked = false;
      return self.showRail().showRailHr();
    };

    this.hide = function() {
      self.hidden = true;
      self.railslocked = true;
      return self.hideRail().hideRailHr();
    };

    this.toggle = function() {
      return (self.hidden) ? self.show() : self.hide();
    };

    this.remove = function() {
      self.stop();
      if (self.cursortimeout) clearTimeout(self.cursortimeout);
      if (self.debouncedelayed) clearTimeout(self.debouncedelayed);
      self.doZoomOut();
      self.unbindAll();

      if (cap.isie9) self.win[0].detachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug

      if (self.observer !== false) self.observer.disconnect();
      if (self.observerremover !== false) self.observerremover.disconnect();
      if (self.observerbody !== false) self.observerbody.disconnect();

      self.events = null;

      if (self.cursor) {
        self.cursor.remove();
      }
      if (self.cursorh) {
        self.cursorh.remove();
      }
      if (self.rail) {
        self.rail.remove();
      }
      if (self.railh) {
        self.railh.remove();
      }
      if (self.zoom) {
        self.zoom.remove();
      }
      for (var a = 0; a < self.saved.css.length; a++) {
        var d = self.saved.css[a];
        d[0].css(d[1], (typeof d[2] == "undefined") ? '' : d[2]);
      }
      self.saved = false;
      self.me.data('__nicescroll', ''); //erase all traces

      // memory leak fixed by GianlucaGuarini - thanks a lot!
      // remove the current nicescroll from the $.nicescroll array & normalize array
      var lst = $.nicescroll;
      lst.each(function(i) {
        if (!this) return;
        if (this.id === self.id) {
          delete lst[i];
          for (var b = ++i; b < lst.length; b++, i++) lst[i] = lst[b];
          lst.length--;
          if (lst.length) delete lst[lst.length];
        }
      });

      for (var i in self) {
        self[i] = null;
        delete self[i];
      }

      self = null;

    };

    this.scrollstart = function(fn) {
      this.onscrollstart = fn;
      return self;
    };
    this.scrollend = function(fn) {
      this.onscrollend = fn;
      return self;
    };
    this.scrollcancel = function(fn) {
      this.onscrollcancel = fn;
      return self;
    };

    this.zoomin = function(fn) {
      this.onzoomin = fn;
      return self;
    };
    this.zoomout = function(fn) {
      this.onzoomout = fn;
      return self;
    };

    this.isScrollable = function(e) {
      var dom = (e.target) ? e.target : e;
      if (dom.nodeName == 'OPTION') return true;
      while (dom && (dom.nodeType == 1) && !(/^BODY|HTML/.test(dom.nodeName))) {
        var dd = $(dom);
        var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
        if (/scroll|auto/.test(ov)) return (dom.clientHeight != dom.scrollHeight);
        dom = (dom.parentNode) ? dom.parentNode : false;
      }
      return false;
    };

    this.getViewport = function(me) {
      var dom = (me && me.parentNode) ? me.parentNode : false;
      while (dom && (dom.nodeType == 1) && !(/^BODY|HTML/.test(dom.nodeName))) {
        var dd = $(dom);
        if (/fixed|absolute/.test(dd.css("position"))) return dd;
        var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
        if ((/scroll|auto/.test(ov)) && (dom.clientHeight != dom.scrollHeight)) return dd;
        if (dd.getNiceScroll().length > 0) return dd;
        dom = (dom.parentNode) ? dom.parentNode : false;
      }
      return false; //(dom) ? $(dom) : false;
    };

    this.triggerScrollEnd = function() {
      if (!self.onscrollend) return;

      var px = self.getScrollLeft();
      var py = self.getScrollTop();

      var info = {
        "type": "scrollend",
        "current": {
          "x": px,
          "y": py
        },
        "end": {
          "x": px,
          "y": py
        }
      };
      self.onscrollend.call(self, info);
    }

    function execScrollWheel(e, hr, chkscroll) {
      var px, py;
      
      if (e.deltaMode == 0) { // PIXEL
        px = -Math.floor(e.deltaX * (self.opt.mousescrollstep / (18 * 3)));
        py = -Math.floor(e.deltaY * (self.opt.mousescrollstep / (18 * 3)));
      } else if (e.deltaMode == 1) { // LINE
        px = -Math.floor(e.deltaX * self.opt.mousescrollstep);
        py = -Math.floor(e.deltaY * self.opt.mousescrollstep);
      }

      if (hr && self.opt.oneaxismousemode && (px == 0) && py) { // classic vertical-only mousewheel + browser with x/y support 
        px = py;
        py = 0;
      
        if (chkscroll) {
          var hrend = (px < 0) ? (self.getScrollLeft() >= self.page.maxw) : (self.getScrollLeft() <= 0);
          if (hrend) {  // preserve vertical scrolling
            py = px;
            px = 0;            
          }
        }
        
      }

      if (px) {
        if (self.scrollmom) {
          self.scrollmom.stop()
        }
        self.lastdeltax += px;
        self.debounced("mousewheelx", function() {
          var dt = self.lastdeltax;
          self.lastdeltax = 0;
          if (!self.rail.drag) {
            self.doScrollLeftBy(dt)
          }
        }, 15);
      }
      if (py) {
        if (self.opt.nativeparentscrolling && chkscroll && !self.ispage && !self.zoomactive) {
          if (py < 0) {
            if (self.getScrollTop() >= self.page.maxh) return true;
          } else {
            if (self.getScrollTop() <= 0) return true;
          }
        }
        if (self.scrollmom) {
          self.scrollmom.stop()
        }
        self.lastdeltay += py;
        self.debounced("mousewheely", function() {
          var dt = self.lastdeltay;
          self.lastdeltay = 0;
          if (!self.rail.drag) {
            self.doScrollBy(dt)
          }
        }, 15);
      }

      e.stopImmediatePropagation();
      return e.preventDefault();
    };

    this.onmousewheel = function(e) {
      if (self.wheelprevented) return;
      if (self.railslocked) {
        self.debounced("checkunlock", self.resize, 250);
        return true;
      }
      if (self.rail.drag) return self.cancelEvent(e);

      if (self.opt.oneaxismousemode == "auto" && e.deltaX != 0) self.opt.oneaxismousemode = false; // check two-axis mouse support (not very elegant)

      if (self.opt.oneaxismousemode && e.deltaX == 0) {
        if (!self.rail.scrollable) {
          if (self.railh && self.railh.scrollable) {
            return self.onmousewheelhr(e);
          } else {
            return true;
          }
        }
      }

      var nw = +(new Date());
      var chk = false;
      if (self.opt.preservenativescrolling && ((self.checkarea + 600) < nw)) {
        self.nativescrollingarea = self.isScrollable(e);
        chk = true;
      }
      self.checkarea = nw;
      if (self.nativescrollingarea) return true; // this isn't my business
      var ret = execScrollWheel(e, false, chk);
      if (ret) self.checkarea = 0;
      return ret;
    };

    this.onmousewheelhr = function(e) {
      if (self.wheelprevented) return;
      if (self.railslocked || !self.railh.scrollable) return true;
      if (self.rail.drag) return self.cancelEvent(e);

      var nw = +(new Date());
      var chk = false;
      if (self.opt.preservenativescrolling && ((self.checkarea + 600) < nw)) {
        self.nativescrollingarea = self.isScrollable(e);
        chk = true;
      }
      self.checkarea = nw;
      if (self.nativescrollingarea) return true; // this isn't my business
      if (self.railslocked) return self.cancelEvent(e);

      return execScrollWheel(e, true, chk);
    };

    this.stop = function() {
      self.cancelScroll();
      if (self.scrollmon) self.scrollmon.stop();
      self.cursorfreezed = false;
      self.scroll.y = Math.round(self.getScrollTop() * (1 / self.scrollratio.y));
      self.noticeCursor();
      return self;
    };

    this.getTransitionSpeed = function(dif) {
      var sp = Math.round(self.opt.scrollspeed * 10);
      var ex = Math.min(sp, Math.round((dif / 20) * self.opt.scrollspeed));
      return (ex > 20) ? ex : 0;
    };

    if (!self.opt.smoothscroll) {
      this.doScrollLeft = function(x, spd) { //direct
        var y = self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };
      this.doScrollTop = function(y, spd) { //direct
        var x = self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };
      this.doScrollPos = function(x, y, spd) { //direct
        var nx = (x > self.page.maxw) ? self.page.maxw : x;
        if (nx < 0) nx = 0;
        var ny = (y > self.page.maxh) ? self.page.maxh : y;
        if (ny < 0) ny = 0;
        self.synched('scroll', function() {
          self.setScrollTop(ny);
          self.setScrollLeft(nx);
        });
      };
      this.cancelScroll = function() {}; // direct
    } else if (self.ishwscroll && cap.hastransition && self.opt.usetransition && !!self.opt.smoothscroll) {
      this.prepareTransition = function(dif, istime) {
        var ex = (istime) ? ((dif > 20) ? dif : 0) : self.getTransitionSpeed(dif);
        var trans = (ex) ? cap.prefixstyle + 'transform ' + ex + 'ms ease-out' : '';
        if (!self.lasttransitionstyle || self.lasttransitionstyle != trans) {
          self.lasttransitionstyle = trans;
          self.doc.css(cap.transitionstyle, trans);
        }
        return ex;
      };

      this.doScrollLeft = function(x, spd) { //trans
        var y = (self.scrollrunning) ? self.newscrolly : self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollTop = function(y, spd) { //trans
        var x = (self.scrollrunning) ? self.newscrollx : self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollPos = function(x, y, spd) { //trans

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (((self.newscrolly - py) * (y - py) < 0) || ((self.newscrollx - px) * (x - px) < 0)) self.cancelScroll(); //inverted movement detection      

        if (self.opt.bouncescroll == false) {
          if (y < 0) y = 0;
          else if (y > self.page.maxh) y = self.page.maxh;
          if (x < 0) x = 0;
          else if (x > self.page.maxw) x = self.page.maxw;
        }

        if (self.scrollrunning && x == self.newscrollx && y == self.newscrolly) return false;

        self.newscrolly = y;
        self.newscrollx = x;

        self.newscrollspeed = spd || false;

        if (self.timer) return false;

        self.timer = setTimeout(function() {

          var top = self.getScrollTop();
          var lft = self.getScrollLeft();

          var dst = {};
          dst.x = x - lft;
          dst.y = y - top;
          dst.px = lft;
          dst.py = top;

          var dd = Math.round(Math.sqrt(Math.pow(dst.x, 2) + Math.pow(dst.y, 2)));
          var ms = (self.newscrollspeed && self.newscrollspeed > 1) ? self.newscrollspeed : self.getTransitionSpeed(dd);
          if (self.newscrollspeed && self.newscrollspeed <= 1) ms *= self.newscrollspeed;

          self.prepareTransition(ms, true);

          if (self.timerscroll && self.timerscroll.tm) clearInterval(self.timerscroll.tm);

          if (ms > 0) {

            if (!self.scrollrunning && self.onscrollstart) {
              var info = {
                "type": "scrollstart",
                "current": {
                  "x": lft,
                  "y": top
                },
                "request": {
                  "x": x,
                  "y": y
                },
                "end": {
                  "x": self.newscrollx,
                  "y": self.newscrolly
                },
                "speed": ms
              };
              self.onscrollstart.call(self, info);
            }

            if (cap.transitionend) {
              if (!self.scrollendtrapped) {
                self.scrollendtrapped = true;
                self.bind(self.doc, cap.transitionend, self.onScrollTransitionEnd, false); //I have got to do something usefull!!
              }
            } else {
              if (self.scrollendtrapped) clearTimeout(self.scrollendtrapped);
              self.scrollendtrapped = setTimeout(self.onScrollTransitionEnd, ms); // simulate transitionend event
            }

            var py = top;
            var px = lft;
            self.timerscroll = {
              bz: new BezierClass(py, self.newscrolly, ms, 0, 0, 0.58, 1),
              bh: new BezierClass(px, self.newscrollx, ms, 0, 0, 0.58, 1)
            };
            if (!self.cursorfreezed) self.timerscroll.tm = setInterval(function() {
              self.showCursor(self.getScrollTop(), self.getScrollLeft())
            }, 60);

          }

          self.synched("doScroll-set", function() {
            self.timer = 0;
            if (self.scrollendtrapped) self.scrollrunning = true;
            self.setScrollTop(self.newscrolly);
            self.setScrollLeft(self.newscrollx);
            if (!self.scrollendtrapped) self.onScrollTransitionEnd();
          });


        }, 50);

      };

      this.cancelScroll = function() {
        if (!self.scrollendtrapped) return true;
        var py = self.getScrollTop();
        var px = self.getScrollLeft();
        self.scrollrunning = false;
        if (!cap.transitionend) clearTimeout(cap.transitionend);
        self.scrollendtrapped = false;
        self._unbind(self.doc[0], cap.transitionend, self.onScrollTransitionEnd);
        self.prepareTransition(0);
        self.setScrollTop(py); // fire event onscroll
        if (self.railh) self.setScrollLeft(px);
        if (self.timerscroll && self.timerscroll.tm) clearInterval(self.timerscroll.tm);
        self.timerscroll = false;

        self.cursorfreezed = false;

        self.showCursor(py, px);
        return self;
      };
      this.onScrollTransitionEnd = function() {
        if (self.scrollendtrapped) self._unbind(self.doc[0], cap.transitionend, self.onScrollTransitionEnd);
        self.scrollendtrapped = false;
        self.prepareTransition(0);
        if (self.timerscroll && self.timerscroll.tm) clearInterval(self.timerscroll.tm);
        self.timerscroll = false;
        var py = self.getScrollTop();
        var px = self.getScrollLeft();
        self.setScrollTop(py); // fire event onscroll        
        if (self.railh) self.setScrollLeft(px); // fire event onscroll left

        self.noticeCursor(false, py, px);

        self.cursorfreezed = false;

        if (py < 0) py = 0
        else if (py > self.page.maxh) py = self.page.maxh;
        if (px < 0) px = 0
        else if (px > self.page.maxw) px = self.page.maxw;
        if ((py != self.newscrolly) || (px != self.newscrollx)) return self.doScrollPos(px, py, self.opt.snapbackspeed);

        if (self.onscrollend && self.scrollrunning) {
          self.triggerScrollEnd();
        }
        self.scrollrunning = false;

      };

    } else {

      this.doScrollLeft = function(x, spd) { //no-trans
        var y = (self.scrollrunning) ? self.newscrolly : self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollTop = function(y, spd) { //no-trans
        var x = (self.scrollrunning) ? self.newscrollx : self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollPos = function(x, y, spd) { //no-trans
        var y = ((typeof y == "undefined") || (y === false)) ? self.getScrollTop(true) : y;

        if ((self.timer) && (self.newscrolly == y) && (self.newscrollx == x)) return true;

        if (self.timer) clearAnimationFrame(self.timer);
        self.timer = 0;

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (((self.newscrolly - py) * (y - py) < 0) || ((self.newscrollx - px) * (x - px) < 0)) self.cancelScroll(); //inverted movement detection

        self.newscrolly = y;
        self.newscrollx = x;

        if (!self.bouncescroll || !self.rail.visibility) {
          if (self.newscrolly < 0) {
            self.newscrolly = 0;
          } else if (self.newscrolly > self.page.maxh) {
            self.newscrolly = self.page.maxh;
          }
        }
        if (!self.bouncescroll || !self.railh.visibility) {
          if (self.newscrollx < 0) {
            self.newscrollx = 0;
          } else if (self.newscrollx > self.page.maxw) {
            self.newscrollx = self.page.maxw;
          }
        }

        self.dst = {};
        self.dst.x = x - px;
        self.dst.y = y - py;
        self.dst.px = px;
        self.dst.py = py;

        var dst = Math.round(Math.sqrt(Math.pow(self.dst.x, 2) + Math.pow(self.dst.y, 2)));

        self.dst.ax = self.dst.x / dst;
        self.dst.ay = self.dst.y / dst;

        var pa = 0;
        var pe = dst;

        if (self.dst.x == 0) {
          pa = py;
          pe = y;
          self.dst.ay = 1;
          self.dst.py = 0;
        } else if (self.dst.y == 0) {
          pa = px;
          pe = x;
          self.dst.ax = 1;
          self.dst.px = 0;
        }

        var ms = self.getTransitionSpeed(dst);
        if (spd && spd <= 1) ms *= spd;
        if (ms > 0) {
          self.bzscroll = (self.bzscroll) ? self.bzscroll.update(pe, ms) : new BezierClass(pa, pe, ms, 0, 1, 0, 1);
        } else {
          self.bzscroll = false;
        }

        if (self.timer) return;

        if ((py == self.page.maxh && y >= self.page.maxh) || (px == self.page.maxw && x >= self.page.maxw)) self.checkContentSize();

        var sync = 1;

        function scrolling() {
          if (self.cancelAnimationFrame) return true;

          self.scrollrunning = true;

          sync = 1 - sync;
          if (sync) return (self.timer = setAnimationFrame(scrolling) || 1);

          var done = 0;
          var sx, sy;

          var sc = sy = self.getScrollTop();
          if (self.dst.ay) {
            sc = (self.bzscroll) ? self.dst.py + (self.bzscroll.getNow() * self.dst.ay) : self.newscrolly;
            var dr = sc - sy;
            if ((dr < 0 && sc < self.newscrolly) || (dr > 0 && sc > self.newscrolly)) sc = self.newscrolly;
            self.setScrollTop(sc);
            if (sc == self.newscrolly) done = 1;
          } else {
            done = 1;
          }

          var scx = sx = self.getScrollLeft();
          if (self.dst.ax) {
            scx = (self.bzscroll) ? self.dst.px + (self.bzscroll.getNow() * self.dst.ax) : self.newscrollx;
            var dr = scx - sx;
            if ((dr < 0 && scx < self.newscrollx) || (dr > 0 && scx > self.newscrollx)) scx = self.newscrollx;
            self.setScrollLeft(scx);
            if (scx == self.newscrollx) done += 1;
          } else {
            done += 1;
          }

          if (done == 2) {
            self.timer = 0;
            self.cursorfreezed = false;
            self.bzscroll = false;
            self.scrollrunning = false;
            if (sc < 0) sc = 0;
            else if (sc > self.page.maxh) sc = self.page.maxh;
            if (scx < 0) scx = 0;
            else if (scx > self.page.maxw) scx = self.page.maxw;
            if ((scx != self.newscrollx) || (sc != self.newscrolly)) self.doScrollPos(scx, sc);
            else {
              if (self.onscrollend) {
                self.triggerScrollEnd();
              }
            }
          } else {
            self.timer = setAnimationFrame(scrolling) || 1;
          }
        };
        self.cancelAnimationFrame = false;
        self.timer = 1;

        if (self.onscrollstart && !self.scrollrunning) {
          var info = {
            "type": "scrollstart",
            "current": {
              "x": px,
              "y": py
            },
            "request": {
              "x": x,
              "y": y
            },
            "end": {
              "x": self.newscrollx,
              "y": self.newscrolly
            },
            "speed": ms
          };
          self.onscrollstart.call(self, info);
        }

        scrolling();

        if ((py == self.page.maxh && y >= py) || (px == self.page.maxw && x >= px)) self.checkContentSize();

        self.noticeCursor();
      };

      this.cancelScroll = function() {
        if (self.timer) clearAnimationFrame(self.timer);
        self.timer = 0;
        self.bzscroll = false;
        self.scrollrunning = false;
        return self;
      };

    }

    this.doScrollBy = function(stp, relative) {
      var ny = 0;
      if (relative) {
        ny = Math.floor((self.scroll.y - stp) * self.scrollratio.y)
      } else {
        var sy = (self.timer) ? self.newscrolly : self.getScrollTop(true);
        ny = sy - stp;
      }
      if (self.bouncescroll) {
        var haf = Math.round(self.view.h / 2);
        if (ny < -haf) ny = -haf
        else if (ny > (self.page.maxh + haf)) ny = (self.page.maxh + haf);
      }
      self.cursorfreezed = false;

      var py = self.getScrollTop(true);
      if (ny < 0 && py <= 0) return self.noticeCursor();
      else if (ny > self.page.maxh && py >= self.page.maxh) {
        self.checkContentSize();
        return self.noticeCursor();
      }

      self.doScrollTop(ny);
    };

    this.doScrollLeftBy = function(stp, relative) {
      var nx = 0;
      if (relative) {
        nx = Math.floor((self.scroll.x - stp) * self.scrollratio.x)
      } else {
        var sx = (self.timer) ? self.newscrollx : self.getScrollLeft(true);
        nx = sx - stp;
      }
      if (self.bouncescroll) {
        var haf = Math.round(self.view.w / 2);
        if (nx < -haf) nx = -haf;
        else if (nx > (self.page.maxw + haf)) nx = (self.page.maxw + haf);
      }
      self.cursorfreezed = false;

      var px = self.getScrollLeft(true);
      if (nx < 0 && px <= 0) return self.noticeCursor();
      else if (nx > self.page.maxw && px >= self.page.maxw) return self.noticeCursor();

      self.doScrollLeft(nx);
    };

    this.doScrollTo = function(pos, relative) {
      var ny = (relative) ? Math.round(pos * self.scrollratio.y) : pos;
      if (ny < 0) ny = 0;
      else if (ny > self.page.maxh) ny = self.page.maxh;
      self.cursorfreezed = false;
      self.doScrollTop(pos);
    };

    this.checkContentSize = function() {
      var pg = self.getContentSize();
      if ((pg.h != self.page.h) || (pg.w != self.page.w)) self.resize(false, pg);
    };

    self.onscroll = function(e) {
      if (self.rail.drag) return;
      if (!self.cursorfreezed) {
        self.synched('scroll', function() {
          self.scroll.y = Math.round(self.getScrollTop() * (1 / self.scrollratio.y));
          if (self.railh) self.scroll.x = Math.round(self.getScrollLeft() * (1 / self.scrollratio.x));
          self.noticeCursor();
        });
      }
    };
    self.bind(self.docscroll, "scroll", self.onscroll);

    this.doZoomIn = function(e) {
      if (self.zoomactive) return;
      self.zoomactive = true;

      self.zoomrestore = {
        style: {}
      };
      var lst = ['position', 'top', 'left', 'zIndex', 'backgroundColor', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];
      var win = self.win[0].style;
      for (var a in lst) {
        var pp = lst[a];
        self.zoomrestore.style[pp] = (typeof win[pp] != "undefined") ? win[pp] : '';
      }

      self.zoomrestore.style.width = self.win.css('width');
      self.zoomrestore.style.height = self.win.css('height');

      self.zoomrestore.padding = {
        w: self.win.outerWidth() - self.win.width(),
        h: self.win.outerHeight() - self.win.height()
      };

      if (cap.isios4) {
        self.zoomrestore.scrollTop = $(window).scrollTop();
        $(window).scrollTop(0);
      }

      self.win.css({
        "position": (cap.isios4) ? "absolute" : "fixed",
        "top": 0,
        "left": 0,
        "z-index": globalmaxzindex + 100,
        "margin": "0px"
      });
      var bkg = self.win.css("backgroundColor");
      if (bkg == "" || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(bkg)) self.win.css("backgroundColor", "#fff");
      self.rail.css({
        "z-index": globalmaxzindex + 101
      });
      self.zoom.css({
        "z-index": globalmaxzindex + 102
      });
      self.zoom.css('backgroundPosition', '0px -18px');
      self.resizeZoom();

      if (self.onzoomin) self.onzoomin.call(self);

      return self.cancelEvent(e);
    };

    this.doZoomOut = function(e) {
      if (!self.zoomactive) return;
      self.zoomactive = false;

      self.win.css("margin", "");
      self.win.css(self.zoomrestore.style);

      if (cap.isios4) {
        $(window).scrollTop(self.zoomrestore.scrollTop);
      }

      self.rail.css({
        "z-index": self.zindex
      });
      self.zoom.css({
        "z-index": self.zindex
      });
      self.zoomrestore = false;
      self.zoom.css('backgroundPosition', '0px 0px');
      self.onResize();

      if (self.onzoomout) self.onzoomout.call(self);

      return self.cancelEvent(e);
    };

    this.doZoom = function(e) {
      return (self.zoomactive) ? self.doZoomOut(e) : self.doZoomIn(e);
    };

    this.resizeZoom = function() {
      if (!self.zoomactive) return;

      var py = self.getScrollTop(); //preserve scrolling position
      self.win.css({
        width: $(window).width() - self.zoomrestore.padding.w + "px",
        height: $(window).height() - self.zoomrestore.padding.h + "px"
      });
      self.onResize();

      self.setScrollTop(Math.min(self.page.maxh, py));
    };

    this.init();

    $.nicescroll.push(this);

  };

  // Inspired by the work of Kin Blas
  // http://webpro.host.adobe.com/people/jblas/momentum/includes/jquery.momentum.0.7.js  


  var ScrollMomentumClass2D = function(nc) {
    var self = this;
    this.nc = nc;

    this.lastx = 0;
    this.lasty = 0;
    this.speedx = 0;
    this.speedy = 0;
    this.lasttime = 0;
    this.steptime = 0;
    this.snapx = false;
    this.snapy = false;
    this.demulx = 0;
    this.demuly = 0;

    this.lastscrollx = -1;
    this.lastscrolly = -1;

    this.chkx = 0;
    this.chky = 0;

    this.timer = 0;

    this.time = function() {
      return +new Date(); //beautifull hack
    };

    this.reset = function(px, py) {
      self.stop();
      var now = self.time();
      self.steptime = 0;
      self.lasttime = now;
      self.speedx = 0;
      self.speedy = 0;
      self.lastx = px;
      self.lasty = py;
      self.lastscrollx = -1;
      self.lastscrolly = -1;
    };

    this.update = function(px, py) {
      var now = self.time();
      self.steptime = now - self.lasttime;
      self.lasttime = now;
      var dy = py - self.lasty;
      var dx = px - self.lastx;
      var sy = self.nc.getScrollTop();
      var sx = self.nc.getScrollLeft();
      var newy = sy + dy;
      var newx = sx + dx;
      self.snapx = (newx < 0) || (newx > self.nc.page.maxw);
      self.snapy = (newy < 0) || (newy > self.nc.page.maxh);
      self.speedx = dx;
      self.speedy = dy;
      self.lastx = px;
      self.lasty = py;
    };

    this.stop = function() {
      self.nc.unsynched("domomentum2d");
      if (self.timer) clearTimeout(self.timer);
      self.timer = 0;
      self.lastscrollx = -1;
      self.lastscrolly = -1;
    };

    this.doSnapy = function(nx, ny) {
      var snap = false;

      if (ny < 0) {
        ny = 0;
        snap = true;
      } else if (ny > self.nc.page.maxh) {
        ny = self.nc.page.maxh;
        snap = true;
      }

      if (nx < 0) {
        nx = 0;
        snap = true;
      } else if (nx > self.nc.page.maxw) {
        nx = self.nc.page.maxw;
        snap = true;
      }

      (snap) ? self.nc.doScrollPos(nx, ny, self.nc.opt.snapbackspeed): self.nc.triggerScrollEnd();
    };

    this.doMomentum = function(gp) {
      var t = self.time();
      var l = (gp) ? t + gp : self.lasttime;

      var sl = self.nc.getScrollLeft();
      var st = self.nc.getScrollTop();

      var pageh = self.nc.page.maxh;
      var pagew = self.nc.page.maxw;

      self.speedx = (pagew > 0) ? Math.min(60, self.speedx) : 0;
      self.speedy = (pageh > 0) ? Math.min(60, self.speedy) : 0;

      var chk = l && (t - l) <= 60;

      if ((st < 0) || (st > pageh) || (sl < 0) || (sl > pagew)) chk = false;

      var sy = (self.speedy && chk) ? self.speedy : false;
      var sx = (self.speedx && chk) ? self.speedx : false;

      if (sy || sx) {
        var tm = Math.max(16, self.steptime); //timeout granularity

        if (tm > 50) { // do smooth
          var xm = tm / 50;
          self.speedx *= xm;
          self.speedy *= xm;
          tm = 50;
        }

        self.demulxy = 0;

        self.lastscrollx = self.nc.getScrollLeft();
        self.chkx = self.lastscrollx;
        self.lastscrolly = self.nc.getScrollTop();
        self.chky = self.lastscrolly;

        var nx = self.lastscrollx;
        var ny = self.lastscrolly;

        var onscroll = function() {
          var df = ((self.time() - t) > 600) ? 0.04 : 0.02;

          if (self.speedx) {
            nx = Math.floor(self.lastscrollx - (self.speedx * (1 - self.demulxy)));
            self.lastscrollx = nx;
            if ((nx < 0) || (nx > pagew)) df = 0.10;
          }

          if (self.speedy) {
            ny = Math.floor(self.lastscrolly - (self.speedy * (1 - self.demulxy)));
            self.lastscrolly = ny;
            if ((ny < 0) || (ny > pageh)) df = 0.10;
          }

          self.demulxy = Math.min(1, self.demulxy + df);

          self.nc.synched("domomentum2d", function() {

            if (self.speedx) {
              var scx = self.nc.getScrollLeft();
              if (scx != self.chkx) self.stop();
              self.chkx = nx;
              self.nc.setScrollLeft(nx);
            }

            if (self.speedy) {
              var scy = self.nc.getScrollTop();
              if (scy != self.chky) self.stop();
              self.chky = ny;
              self.nc.setScrollTop(ny);
            }

            if (!self.timer) {
              self.nc.hideCursor();
              self.doSnapy(nx, ny);
            }

          });

          if (self.demulxy < 1) {
            self.timer = setTimeout(onscroll, tm);
          } else {
            self.stop();
            self.nc.hideCursor();
            self.doSnapy(nx, ny);
          }
        };

        onscroll();

      } else {
        self.doSnapy(self.nc.getScrollLeft(), self.nc.getScrollTop());
      }

    }

  };


  // override jQuery scrollTop

  var _scrollTop = jQuery.fn.scrollTop; // preserve original function

  jQuery.cssHooks["pageYOffset"] = {
    get: function(elem, computed, extra) {
      var nice = $.data(elem, '__nicescroll') || false;
      return (nice && nice.ishwscroll) ? nice.getScrollTop() : _scrollTop.call(elem);
    },
    set: function(elem, value) {
      var nice = $.data(elem, '__nicescroll') || false;
      (nice && nice.ishwscroll) ? nice.setScrollTop(parseInt(value)): _scrollTop.call(elem, value);
      return this;
    }
  };

  /*  
  $.fx.step["scrollTop"] = function(fx){    
    $.cssHooks["scrollTop"].set( fx.elem, fx.now + fx.unit );
  };
*/

  jQuery.fn.scrollTop = function(value) {
    if (typeof value == "undefined") {
      var nice = (this[0]) ? $.data(this[0], '__nicescroll') || false : false;
      return (nice && nice.ishwscroll) ? nice.getScrollTop() : _scrollTop.call(this);
    } else {
      return this.each(function() {
        var nice = $.data(this, '__nicescroll') || false;
        (nice && nice.ishwscroll) ? nice.setScrollTop(parseInt(value)): _scrollTop.call($(this), value);
      });
    }
  };

  // override jQuery scrollLeft

  var _scrollLeft = jQuery.fn.scrollLeft; // preserve original function

  $.cssHooks.pageXOffset = {
    get: function(elem, computed, extra) {
      var nice = $.data(elem, '__nicescroll') || false;
      return (nice && nice.ishwscroll) ? nice.getScrollLeft() : _scrollLeft.call(elem);
    },
    set: function(elem, value) {
      var nice = $.data(elem, '__nicescroll') || false;
      (nice && nice.ishwscroll) ? nice.setScrollLeft(parseInt(value)): _scrollLeft.call(elem, value);
      return this;
    }
  };

  /*  
  $.fx.step["scrollLeft"] = function(fx){
    $.cssHooks["scrollLeft"].set( fx.elem, fx.now + fx.unit );
  };  
*/

  jQuery.fn.scrollLeft = function(value) {
    if (typeof value == "undefined") {
      var nice = (this[0]) ? $.data(this[0], '__nicescroll') || false : false;
      return (nice && nice.ishwscroll) ? nice.getScrollLeft() : _scrollLeft.call(this);
    } else {
      return this.each(function() {
        var nice = $.data(this, '__nicescroll') || false;
        (nice && nice.ishwscroll) ? nice.setScrollLeft(parseInt(value)): _scrollLeft.call($(this), value);
      });
    }
  };

  var NiceScrollArray = function(doms) {
    var self = this;
    this.length = 0;
    this.name = "nicescrollarray";

    this.each = function(fn) {
      for (var a = 0, i = 0; a < self.length; a++) fn.call(self[a], i++);
      return self;
    };

    this.push = function(nice) {
      self[self.length] = nice;
      self.length++;
    };

    this.eq = function(idx) {
      return self[idx];
    };

    if (doms) {
      for (var a = 0; a < doms.length; a++) {
        var nice = $.data(doms[a], '__nicescroll') || false;
        if (nice) {
          this[this.length] = nice;
          this.length++;
        }
      };
    }

    return this;
  };

  function mplex(el, lst, fn) {
    for (var a = 0; a < lst.length; a++) fn(el, lst[a]);
  };
  mplex(
    NiceScrollArray.prototype, ['show', 'hide', 'toggle', 'onResize', 'resize', 'remove', 'stop', 'doScrollPos'],
    function(e, n) {
      e[n] = function() {
        var args = arguments;
        return this.each(function() {
          this[n].apply(this, args);
        });
      };
    }
  );

  jQuery.fn.getNiceScroll = function(index) {
    if (typeof index == "undefined") {
      return new NiceScrollArray(this);
    } else {
      var nice = this[index] && $.data(this[index], '__nicescroll') || false;
      return nice;
    }
  };

  jQuery.extend(jQuery.expr[':'], {
    nicescroll: function(a) {
      return ($.data(a, '__nicescroll')) ? true : false;
    }
  });

  $.fn.niceScroll = function(wrapper, opt) {
    if (typeof opt == "undefined") {
      if ((typeof wrapper == "object") && !("jquery" in wrapper)) {
        opt = wrapper;
        wrapper = false;
      }
    }
    opt = $.extend({},opt); // cloning
    var ret = new NiceScrollArray();
    if (typeof opt == "undefined") opt = {};

    if (wrapper || false) {
      opt.doc = $(wrapper);
      opt.win = $(this);
    }
    var docundef = !("doc" in opt);
    if (!docundef && !("win" in opt)) opt.win = $(this);

    this.each(function() {
      var nice = $(this).data('__nicescroll') || false;
      if (!nice) {
        opt.doc = (docundef) ? $(this) : opt.doc;
        nice = new NiceScrollClass(opt, $(this));
        $(this).data('__nicescroll', nice);
      }
      ret.push(nice);
    });
    return (ret.length == 1) ? ret[0] : ret;
  };

  window.NiceScroll = {
    getjQuery: function() {
      return jQuery
    }
  };

  if (!$.nicescroll) {
    $.nicescroll = new NiceScrollArray();
    $.nicescroll.options = _globaloptions;
  }

}));
!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o,a,r){var s=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(r,"__esModule",{value:!0});var l,i,u,c,d=o("./modules/handle-dom"),f=o("./modules/utils"),p=o("./modules/handle-swal-dom"),m=o("./modules/handle-click"),v=o("./modules/handle-key"),y=s(v),h=o("./modules/default-params"),b=s(h),g=o("./modules/set-params"),w=s(g);r["default"]=u=c=function(){function o(e){var t=a;return t[e]===n?b["default"][e]:t[e]}var a=arguments[0];if(d.addClass(t.body,"stop-scrolling"),p.resetInput(),a===n)return f.logStr("SweetAlert expects at least 1 attribute!"),!1;var r=f.extend({},b["default"]);switch(typeof a){case"string":r.title=a,r.text=arguments[1]||"",r.type=arguments[2]||"";break;case"object":if(a.title===n)return f.logStr('Missing "title" argument!'),!1;r.title=a.title;for(var s in b["default"])r[s]=o(s);r.confirmButtonText=r.showCancelButton?"Confirm":b["default"].confirmButtonText,r.confirmButtonText=o("confirmButtonText"),r.doneFunction=arguments[1]||null;break;default:return f.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof a),!1}w["default"](r),p.fixVerticalPosition(),p.openModal(arguments[1]);for(var u=p.getModal(),v=u.querySelectorAll("button"),h=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],g=function(e){return m.handleButton(e,r,u)},C=0;C<v.length;C++)for(var S=0;S<h.length;S++){var x=h[S];v[C][x]=g}p.getOverlay().onclick=g,l=e.onkeydown;var k=function(e){return y["default"](e,r,u)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){i!==n&&(i.focus(),i=n)},0)},c.enableButtons()},u.setDefaults=c.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");f.extend(b["default"],e)},u.close=c.close=function(){var o=p.getModal();d.fadeOut(p.getOverlay(),5),d.fadeOut(o,5),d.removeClass(o,"showSweetAlert"),d.addClass(o,"hideSweetAlert"),d.removeClass(o,"visible");var a=o.querySelector(".sa-icon.sa-success");d.removeClass(a,"animate"),d.removeClass(a.querySelector(".sa-tip"),"animateSuccessTip"),d.removeClass(a.querySelector(".sa-long"),"animateSuccessLong");var r=o.querySelector(".sa-icon.sa-error");d.removeClass(r,"animateErrorIcon"),d.removeClass(r.querySelector(".sa-x-mark"),"animateXMark");var s=o.querySelector(".sa-icon.sa-warning");return d.removeClass(s,"pulseWarning"),d.removeClass(s.querySelector(".sa-body"),"pulseWarningIns"),d.removeClass(s.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");d.removeClass(o,e)},300),d.removeClass(t.body,"stop-scrolling"),e.onkeydown=l,e.previousActiveElement&&e.previousActiveElement.focus(),i=n,clearTimeout(o.timeout),!0},u.showInputError=c.showInputError=function(e){var t=p.getModal(),n=t.querySelector(".sa-input-error");d.addClass(n,"show");var o=t.querySelector(".sa-error-container");d.addClass(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){u.enableButtons()},1),t.querySelector("input").focus()},u.resetInputError=c.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=p.getModal(),n=t.querySelector(".sa-input-error");d.removeClass(n,"show");var o=t.querySelector(".sa-error-container");d.removeClass(o,"show")},u.disableButtons=c.disableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!0,n.disabled=!0},u.enableButtons=c.enableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!1,n.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=u:f.logStr("SweetAlert is a frontend module!"),a.exports=r["default"]},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var b=o.querySelector("button.confirm"),g=o.querySelector("button.cancel");m?g.style.boxShadow="none":b.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},b=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=b},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},b=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},g=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=b,a.openModal=g,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],b=y[1];h&&b?(m=h,v=b):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var g=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",g),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], function ($) {
      return (root.returnExportsGlobal = factory($));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
}(this, function ($) {

/*
  Implement Github like autocomplete mentions
  http://ichord.github.com/At.js

  Copyright (c) 2013 chord.luo@gmail.com
  Licensed under the MIT license.
*/

/*
本插件操作 textarea 或者 input 内的插入符
只实现了获得插入符在文本框中的位置，我设置
插入符的位置.
*/

"use strict";
var EditableCaret, InputCaret, Mirror, Utils, discoveryIframeOf, methods, oDocument, oFrame, oWindow, pluginName, setContextBy;

pluginName = 'caret';

EditableCaret = (function() {
  function EditableCaret($inputor) {
    this.$inputor = $inputor;
    this.domInputor = this.$inputor[0];
  }

  EditableCaret.prototype.setPos = function(pos) {
    return this.domInputor;
  };

  EditableCaret.prototype.getIEPosition = function() {
    return this.getPosition();
  };

  EditableCaret.prototype.getPosition = function() {
    var inputor_offset, offset;
    offset = this.getOffset();
    inputor_offset = this.$inputor.offset();
    offset.left -= inputor_offset.left;
    offset.top -= inputor_offset.top;
    return offset;
  };

  EditableCaret.prototype.getOldIEPos = function() {
    var preCaretTextRange, textRange;
    textRange = oDocument.selection.createRange();
    preCaretTextRange = oDocument.body.createTextRange();
    preCaretTextRange.moveToElementText(this.domInputor);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    return preCaretTextRange.text.length;
  };

  EditableCaret.prototype.getPos = function() {
    var clonedRange, pos, range;
    if (range = this.range()) {
      clonedRange = range.cloneRange();
      clonedRange.selectNodeContents(this.domInputor);
      clonedRange.setEnd(range.endContainer, range.endOffset);
      pos = clonedRange.toString().length;
      clonedRange.detach();
      return pos;
    } else if (oDocument.selection) {
      return this.getOldIEPos();
    }
  };

  EditableCaret.prototype.getOldIEOffset = function() {
    var range, rect;
    range = oDocument.selection.createRange().duplicate();
    range.moveStart("character", -1);
    rect = range.getBoundingClientRect();
    return {
      height: rect.bottom - rect.top,
      left: rect.left,
      top: rect.top
    };
  };

  EditableCaret.prototype.getOffset = function(pos) {
    var clonedRange, offset, range, rect, shadowCaret;
    if (oWindow.getSelection && (range = this.range())) {
      if (range.endOffset - 1 > 0 && range.endContainer === !this.domInputor) {
        clonedRange = range.cloneRange();
        clonedRange.setStart(range.endContainer, range.endOffset - 1);
        clonedRange.setEnd(range.endContainer, range.endOffset);
        rect = clonedRange.getBoundingClientRect();
        offset = {
          height: rect.height,
          left: rect.left + rect.width,
          top: rect.top
        };
        clonedRange.detach();
      }
      if (!offset || (offset != null ? offset.height : void 0) === 0) {
        clonedRange = range.cloneRange();
        shadowCaret = $(oDocument.createTextNode("|"));
        clonedRange.insertNode(shadowCaret[0]);
        clonedRange.selectNode(shadowCaret[0]);
        rect = clonedRange.getBoundingClientRect();
        offset = {
          height: rect.height,
          left: rect.left,
          top: rect.top
        };
        shadowCaret.remove();
        clonedRange.detach();
      }
    } else if (oDocument.selection) {
      offset = this.getOldIEOffset();
    }
    if (offset) {
      offset.top += $(oWindow).scrollTop();
      offset.left += $(oWindow).scrollLeft();
    }
    return offset;
  };

  EditableCaret.prototype.range = function() {
    var sel;
    if (!oWindow.getSelection) {
      return;
    }
    sel = oWindow.getSelection();
    if (sel.rangeCount > 0) {
      return sel.getRangeAt(0);
    } else {
      return null;
    }
  };

  return EditableCaret;

})();

InputCaret = (function() {
  function InputCaret($inputor) {
    this.$inputor = $inputor;
    this.domInputor = this.$inputor[0];
  }

  InputCaret.prototype.getIEPos = function() {
    var endRange, inputor, len, normalizedValue, pos, range, textInputRange;
    inputor = this.domInputor;
    range = oDocument.selection.createRange();
    pos = 0;
    if (range && range.parentElement() === inputor) {
      normalizedValue = inputor.value.replace(/\r\n/g, "\n");
      len = normalizedValue.length;
      textInputRange = inputor.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());
      endRange = inputor.createTextRange();
      endRange.collapse(false);
      if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
        pos = len;
      } else {
        pos = -textInputRange.moveStart("character", -len);
      }
    }
    return pos;
  };

  InputCaret.prototype.getPos = function() {
    if (oDocument.selection) {
      return this.getIEPos();
    } else {
      return this.domInputor.selectionStart;
    }
  };

  InputCaret.prototype.setPos = function(pos) {
    var inputor, range;
    inputor = this.domInputor;
    if (oDocument.selection) {
      range = inputor.createTextRange();
      range.move("character", pos);
      range.select();
    } else if (inputor.setSelectionRange) {
      inputor.setSelectionRange(pos, pos);
    }
    return inputor;
  };

  InputCaret.prototype.getIEOffset = function(pos) {
    var h, textRange, x, y;
    textRange = this.domInputor.createTextRange();
    pos || (pos = this.getPos());
    textRange.move('character', pos);
    x = textRange.boundingLeft;
    y = textRange.boundingTop;
    h = textRange.boundingHeight;
    return {
      left: x,
      top: y,
      height: h
    };
  };

  InputCaret.prototype.getOffset = function(pos) {
    var $inputor, offset, position;
    $inputor = this.$inputor;
    if (oDocument.selection) {
      offset = this.getIEOffset(pos);
      offset.top += $(oWindow).scrollTop() + $inputor.scrollTop();
      offset.left += $(oWindow).scrollLeft() + $inputor.scrollLeft();
      return offset;
    } else {
      offset = $inputor.offset();
      position = this.getPosition(pos);
      return offset = {
        left: offset.left + position.left - $inputor.scrollLeft(),
        top: offset.top + position.top - $inputor.scrollTop(),
        height: position.height
      };
    }
  };

  InputCaret.prototype.getPosition = function(pos) {
    var $inputor, at_rect, end_range, format, html, mirror, start_range;
    $inputor = this.$inputor;
    format = function(value) {
      value = value.replace(/<|>|`|"|&/g, '?').replace(/\r\n|\r|\n/g, "<br/>");
      if (/firefox/i.test(navigator.userAgent)) {
        value = value.replace(/\s/g, '&nbsp;');
      }
      return value;
    };
    if (pos === void 0) {
      pos = this.getPos();
    }
    start_range = $inputor.val().slice(0, pos);
    end_range = $inputor.val().slice(pos);
    html = "<span style='position: relative; display: inline;'>" + format(start_range) + "</span>";
    html += "<span id='caret' style='position: relative; display: inline;'>|</span>";
    html += "<span style='position: relative; display: inline;'>" + format(end_range) + "</span>";
    mirror = new Mirror($inputor);
    return at_rect = mirror.create(html).rect();
  };

  InputCaret.prototype.getIEPosition = function(pos) {
    var h, inputorOffset, offset, x, y;
    offset = this.getIEOffset(pos);
    inputorOffset = this.$inputor.offset();
    x = offset.left - inputorOffset.left;
    y = offset.top - inputorOffset.top;
    h = offset.height;
    return {
      left: x,
      top: y,
      height: h
    };
  };

  return InputCaret;

})();

Mirror = (function() {
  Mirror.prototype.css_attr = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontWeight", "height", "letterSpacing", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "outlineWidth", "overflow", "overflowX", "overflowY", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "textAlign", "textOverflow", "textTransform", "whiteSpace", "wordBreak", "wordWrap"];

  function Mirror($inputor) {
    this.$inputor = $inputor;
  }

  Mirror.prototype.mirrorCss = function() {
    var css,
      _this = this;
    css = {
      position: 'absolute',
      left: -9999,
      top: 0,
      zIndex: -20000
    };
    if (this.$inputor.prop('tagName') === 'TEXTAREA') {
      this.css_attr.push('width');
    }
    $.each(this.css_attr, function(i, p) {
      return css[p] = _this.$inputor.css(p);
    });
    return css;
  };

  Mirror.prototype.create = function(html) {
    this.$mirror = $('<div></div>');
    this.$mirror.css(this.mirrorCss());
    this.$mirror.html(html);
    this.$inputor.after(this.$mirror);
    return this;
  };

  Mirror.prototype.rect = function() {
    var $flag, pos, rect;
    $flag = this.$mirror.find("#caret");
    pos = $flag.position();
    rect = {
      left: pos.left,
      top: pos.top,
      height: $flag.height()
    };
    this.$mirror.remove();
    return rect;
  };

  return Mirror;

})();

Utils = {
  contentEditable: function($inputor) {
    return !!($inputor[0].contentEditable && $inputor[0].contentEditable === 'true');
  }
};

methods = {
  pos: function(pos) {
    if (pos || pos === 0) {
      return this.setPos(pos);
    } else {
      return this.getPos();
    }
  },
  position: function(pos) {
    if (oDocument.selection) {
      return this.getIEPosition(pos);
    } else {
      return this.getPosition(pos);
    }
  },
  offset: function(pos) {
    var offset;
    offset = this.getOffset(pos);
    return offset;
  }
};

oDocument = null;

oWindow = null;

oFrame = null;

setContextBy = function(settings) {
  var iframe;
  if (iframe = settings != null ? settings.iframe : void 0) {
    oFrame = iframe;
    oWindow = iframe.contentWindow;
    return oDocument = iframe.contentDocument || oWindow.document;
  } else {
    oFrame = void 0;
    oWindow = window;
    return oDocument = document;
  }
};

discoveryIframeOf = function($dom) {
  var error;
  oDocument = $dom[0].ownerDocument;
  oWindow = oDocument.defaultView || oDocument.parentWindow;
  try {
    return oFrame = oWindow.frameElement;
  } catch (_error) {
    error = _error;
  }
};

$.fn.caret = function(method, value, settings) {
  var caret;
  if (methods[method]) {
    if ($.isPlainObject(value)) {
      setContextBy(value);
      value = void 0;
    } else {
      setContextBy(settings);
    }
    caret = Utils.contentEditable(this) ? new EditableCaret(this) : new InputCaret(this);
    return methods[method].apply(caret, [value]);
  } else {
    return $.error("Method " + method + " does not exist on jQuery.caret");
  }
};

$.fn.caret.EditableCaret = EditableCaret;

$.fn.caret.InputCaret = InputCaret;

$.fn.caret.Utils = Utils;

$.fn.caret.apis = methods;


}));
/*! jquery.atwho - v1.3.2 %>
* Copyright (c) 2015 chord.luo <chord.luo@gmail.com>;
* homepage: http://ichord.github.com/At.js
* Licensed MIT
*/

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
}(this, function (jquery) {

var $, Api, App, Controller, DEFAULT_CALLBACKS, EditableController, KEY_CODE, Model, TextareaController, View,
  slice = [].slice,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = jquery;

App = (function() {
  function App(inputor) {
    this.currentFlag = null;
    this.controllers = {};
    this.aliasMaps = {};
    this.$inputor = $(inputor);
    this.setupRootElement();
    this.listen();
  }

  App.prototype.createContainer = function(doc) {
    var ref;
    if ((ref = this.$el) != null) {
      ref.remove();
    }
    return $(doc.body).append(this.$el = $("<div class='atwho-container'></div>"));
  };

  App.prototype.setupRootElement = function(iframe, asRoot) {
    var error;
    if (asRoot == null) {
      asRoot = false;
    }
    if (iframe) {
      this.window = iframe.contentWindow;
      this.document = iframe.contentDocument || this.window.document;
      this.iframe = iframe;
    } else {
      this.document = this.$inputor[0].ownerDocument;
      this.window = this.document.defaultView || this.document.parentWindow;
      try {
        this.iframe = this.window.frameElement;
      } catch (_error) {
        error = _error;
        this.iframe = null;
        if ($.fn.atwho.debug) {
          throw new Error("iframe auto-discovery is failed.\nPlease use `setIframe` to set the target iframe manually.\n" + error);
        }
      }
    }
    return this.createContainer((this.iframeAsRoot = asRoot) ? this.document : document);
  };

  App.prototype.controller = function(at) {
    var c, current, currentFlag, ref;
    if (this.aliasMaps[at]) {
      current = this.controllers[this.aliasMaps[at]];
    } else {
      ref = this.controllers;
      for (currentFlag in ref) {
        c = ref[currentFlag];
        if (currentFlag === at) {
          current = c;
          break;
        }
      }
    }
    if (current) {
      return current;
    } else {
      return this.controllers[this.currentFlag];
    }
  };

  App.prototype.setContextFor = function(at) {
    this.currentFlag = at;
    return this;
  };

  App.prototype.reg = function(flag, setting) {
    var base, controller;
    controller = (base = this.controllers)[flag] || (base[flag] = this.$inputor.is('[contentEditable]') ? new EditableController(this, flag) : new TextareaController(this, flag));
    if (setting.alias) {
      this.aliasMaps[setting.alias] = flag;
    }
    controller.init(setting);
    return this;
  };

  App.prototype.listen = function() {
    return this.$inputor.on('compositionstart', (function(_this) {
      return function(e) {
        var ref;
        if ((ref = _this.controller()) != null) {
          ref.view.hide();
        }
        return _this.isComposing = true;
      };
    })(this)).on('compositionend', (function(_this) {
      return function(e) {
        return _this.isComposing = false;
      };
    })(this)).on('keyup.atwhoInner', (function(_this) {
      return function(e) {
        return _this.onKeyup(e);
      };
    })(this)).on('keydown.atwhoInner', (function(_this) {
      return function(e) {
        return _this.onKeydown(e);
      };
    })(this)).on('blur.atwhoInner', (function(_this) {
      return function(e) {
        var c;
        if (c = _this.controller()) {
          c.expectedQueryCBId = null;
          return c.view.hide(e, c.getOpt("displayTimeout"));
        }
      };
    })(this)).on('click.atwhoInner', (function(_this) {
      return function(e) {
        return _this.dispatch(e);
      };
    })(this)).on('scroll.atwhoInner', (function(_this) {
      return function() {
        var lastScrollTop;
        lastScrollTop = _this.$inputor.scrollTop();
        return function(e) {
          var currentScrollTop, ref;
          currentScrollTop = e.target.scrollTop;
          if (lastScrollTop !== currentScrollTop) {
            if ((ref = _this.controller()) != null) {
              ref.view.hide(e);
            }
          }
          lastScrollTop = currentScrollTop;
          return true;
        };
      };
    })(this)());
  };

  App.prototype.shutdown = function() {
    var _, c, ref;
    ref = this.controllers;
    for (_ in ref) {
      c = ref[_];
      c.destroy();
      delete this.controllers[_];
    }
    this.$inputor.off('.atwhoInner');
    return this.$el.remove();
  };

  App.prototype.dispatch = function(e) {
    var _, c, ref, results;
    ref = this.controllers;
    results = [];
    for (_ in ref) {
      c = ref[_];
      results.push(c.lookUp(e));
    }
    return results;
  };

  App.prototype.onKeyup = function(e) {
    var ref;
    switch (e.keyCode) {
      case KEY_CODE.ESC:
        e.preventDefault();
        if ((ref = this.controller()) != null) {
          ref.view.hide();
        }
        break;
      case KEY_CODE.DOWN:
      case KEY_CODE.UP:
      case KEY_CODE.CTRL:
        $.noop();
        break;
      case KEY_CODE.P:
      case KEY_CODE.N:
        if (!e.ctrlKey) {
          this.dispatch(e);
        }
        break;
      default:
        this.dispatch(e);
    }
  };

  App.prototype.onKeydown = function(e) {
    var ref, view;
    view = (ref = this.controller()) != null ? ref.view : void 0;
    if (!(view && view.visible())) {
      return;
    }
    switch (e.keyCode) {
      case KEY_CODE.ESC:
        e.preventDefault();
        view.hide(e);
        break;
      case KEY_CODE.UP:
        e.preventDefault();
        view.prev();
        break;
      case KEY_CODE.DOWN:
        e.preventDefault();
        view.next();
        break;
      case KEY_CODE.P:
        if (!e.ctrlKey) {
          return;
        }
        e.preventDefault();
        view.prev();
        break;
      case KEY_CODE.N:
        if (!e.ctrlKey) {
          return;
        }
        e.preventDefault();
        view.next();
        break;
      case KEY_CODE.TAB:
      case KEY_CODE.ENTER:
      case KEY_CODE.SPACE:
        if (!view.visible()) {
          return;
        }
        if (!this.controller().getOpt('spaceSelectsMatch') && e.keyCode === KEY_CODE.SPACE) {
          return;
        }
        if (!this.controller().getOpt('tabSelectsMatch') && e.keyCode === KEY_CODE.TAB) {
          return;
        }
        if (view.highlighted()) {
          e.preventDefault();
          view.choose(e);
        } else {
          view.hide(e);
        }
        break;
      default:
        $.noop();
    }
  };

  return App;

})();

Controller = (function() {
  Controller.prototype.uid = function() {
    return (Math.random().toString(16) + "000000000").substr(2, 8) + (new Date().getTime());
  };

  function Controller(app1, at1) {
    this.app = app1;
    this.at = at1;
    this.$inputor = this.app.$inputor;
    this.id = this.$inputor[0].id || this.uid();
    this.expectedQueryCBId = null;
    this.setting = null;
    this.query = null;
    this.pos = 0;
    this.range = null;
    if ((this.$el = $("#atwho-ground-" + this.id, this.app.$el)).length === 0) {
      this.app.$el.append(this.$el = $("<div id='atwho-ground-" + this.id + "'></div>"));
    }
    this.model = new Model(this);
    this.view = new View(this);
  }

  Controller.prototype.init = function(setting) {
    this.setting = $.extend({}, this.setting || $.fn.atwho["default"], setting);
    this.view.init();
    return this.model.reload(this.setting.data);
  };

  Controller.prototype.destroy = function() {
    this.trigger('beforeDestroy');
    this.model.destroy();
    this.view.destroy();
    return this.$el.remove();
  };

  Controller.prototype.callDefault = function() {
    var args, error, funcName;
    funcName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    try {
      return DEFAULT_CALLBACKS[funcName].apply(this, args);
    } catch (_error) {
      error = _error;
      return $.error(error + " Or maybe At.js doesn't have function " + funcName);
    }
  };

  Controller.prototype.trigger = function(name, data) {
    var alias, eventName;
    if (data == null) {
      data = [];
    }
    data.push(this);
    alias = this.getOpt('alias');
    eventName = alias ? name + "-" + alias + ".atwho" : name + ".atwho";
    return this.$inputor.trigger(eventName, data);
  };

  Controller.prototype.callbacks = function(funcName) {
    return this.getOpt("callbacks")[funcName] || DEFAULT_CALLBACKS[funcName];
  };

  Controller.prototype.getOpt = function(at, default_value) {
    var e;
    try {
      return this.setting[at];
    } catch (_error) {
      e = _error;
      return null;
    }
  };

  Controller.prototype.insertContentFor = function($li) {
    var data, tpl;
    tpl = this.getOpt('insertTpl');
    data = $.extend({}, $li.data('item-data'), {
      'atwho-at': this.at
    });
    return this.callbacks("tplEval").call(this, tpl, data, "onInsert");
  };

  Controller.prototype.renderView = function(data) {
    var searchKey;
    searchKey = this.getOpt("searchKey");
    data = this.callbacks("sorter").call(this, this.query.text, data.slice(0, 1001), searchKey);
    return this.view.render(data.slice(0, this.getOpt('limit')));
  };

  Controller.arrayToDefaultHash = function(data) {
    var i, item, len, results;
    if (!$.isArray(data)) {
      return data;
    }
    results = [];
    for (i = 0, len = data.length; i < len; i++) {
      item = data[i];
      if ($.isPlainObject(item)) {
        results.push(item);
      } else {
        results.push({
          name: item
        });
      }
    }
    return results;
  };

  Controller.prototype.lookUp = function(e) {
    var query, wait;
    query = this.catchQuery(e);
    if (!query) {
      this.expectedQueryCBId = null;
      return query;
    }
    this.app.setContextFor(this.at);
    if (wait = this.getOpt('delay')) {
      this._delayLookUp(query, wait);
    } else {
      this._lookUp(query);
    }
    return query;
  };

  Controller.prototype._delayLookUp = function(query, wait) {
    var now, remaining;
    now = Date.now ? Date.now() : new Date().getTime();
    this.previousCallTime || (this.previousCallTime = now);
    remaining = wait - (now - this.previousCallTime);
    if ((0 < remaining && remaining < wait)) {
      this.previousCallTime = now;
      this._stopDelayedCall();
      return this.delayedCallTimeout = setTimeout((function(_this) {
        return function() {
          _this.previousCallTime = 0;
          _this.delayedCallTimeout = null;
          return _this._lookUp(query);
        };
      })(this), wait);
    } else {
      this._stopDelayedCall();
      if (this.previousCallTime !== now) {
        this.previousCallTime = 0;
      }
      return this._lookUp(query);
    }
  };

  Controller.prototype._stopDelayedCall = function() {
    if (this.delayedCallTimeout) {
      clearTimeout(this.delayedCallTimeout);
      return this.delayedCallTimeout = null;
    }
  };

  Controller.prototype._generateQueryCBId = function() {
    return {};
  };

  Controller.prototype._lookUp = function(query) {
    var _callback;
    _callback = function(queryCBId, data) {
      if (queryCBId !== this.expectedQueryCBId) {
        return;
      }
      if (data && data.length > 0) {
        return this.renderView(this.constructor.arrayToDefaultHash(data));
      } else {
        return this.view.hide();
      }
    };
    this.expectedQueryCBId = this._generateQueryCBId();
    return this.model.query(query.text, $.proxy(_callback, this, this.expectedQueryCBId));
  };

  return Controller;

})();

TextareaController = (function(superClass) {
  extend(TextareaController, superClass);

  function TextareaController() {
    return TextareaController.__super__.constructor.apply(this, arguments);
  }

  TextareaController.prototype.catchQuery = function() {
    var caretPos, content, end, query, start, subtext;
    content = this.$inputor.val();
    caretPos = this.$inputor.caret('pos', {
      iframe: this.app.iframe
    });
    subtext = content.slice(0, caretPos);
    query = this.callbacks("matcher").call(this, this.at, subtext, this.getOpt('startWithSpace'));
    if (typeof query === "string" && query.length <= this.getOpt('maxLen', 20)) {
      start = caretPos - query.length;
      end = start + query.length;
      this.pos = start;
      query = {
        'text': query,
        'headPos': start,
        'endPos': end
      };
      this.trigger("matched", [this.at, query.text]);
    } else {
      query = null;
      this.view.hide();
    }
    return this.query = query;
  };

  TextareaController.prototype.rect = function() {
    var c, iframeOffset, scaleBottom;
    if (!(c = this.$inputor.caret('offset', this.pos - 1, {
      iframe: this.app.iframe
    }))) {
      return;
    }
    if (this.app.iframe && !this.app.iframeAsRoot) {
      iframeOffset = $(this.app.iframe).offset();
      c.left += iframeOffset.left;
      c.top += iframeOffset.top;
    }
    scaleBottom = this.app.document.selection ? 0 : 2;
    return {
      left: c.left,
      top: c.top,
      bottom: c.top + c.height + scaleBottom
    };
  };

  TextareaController.prototype.insert = function(content, $li) {
    var $inputor, source, startStr, suffix, text;
    $inputor = this.$inputor;
    source = $inputor.val();
    startStr = source.slice(0, Math.max(this.query.headPos - this.at.length, 0));
    suffix = (suffix = this.getOpt('suffix')) === "" ? suffix : suffix || " ";
    content += suffix;
    text = "" + startStr + content + (source.slice(this.query['endPos'] || 0));
    $inputor.val(text);
    $inputor.caret('pos', startStr.length + content.length, {
      iframe: this.app.iframe
    });
    if (!$inputor.is(':focus')) {
      $inputor.focus();
    }
    return $inputor.change();
  };

  return TextareaController;

})(Controller);

EditableController = (function(superClass) {
  extend(EditableController, superClass);

  function EditableController() {
    return EditableController.__super__.constructor.apply(this, arguments);
  }

  EditableController.prototype._getRange = function() {
    var sel;
    sel = this.app.window.getSelection();
    if (sel.rangeCount > 0) {
      return sel.getRangeAt(0);
    }
  };

  EditableController.prototype._setRange = function(position, node, range) {
    if (range == null) {
      range = this._getRange();
    }
    if (!range) {
      return;
    }
    node = $(node)[0];
    if (position === 'after') {
      range.setEndAfter(node);
      range.setStartAfter(node);
    } else {
      range.setEndBefore(node);
      range.setStartBefore(node);
    }
    range.collapse(false);
    return this._clearRange(range);
  };

  EditableController.prototype._clearRange = function(range) {
    var sel;
    if (range == null) {
      range = this._getRange();
    }
    sel = this.app.window.getSelection();
    if (this.ctrl_a_pressed == null) {
      sel.removeAllRanges();
      return sel.addRange(range);
    }
  };

  EditableController.prototype._movingEvent = function(e) {
    var ref;
    return e.type === 'click' || ((ref = e.which) === KEY_CODE.RIGHT || ref === KEY_CODE.LEFT || ref === KEY_CODE.UP || ref === KEY_CODE.DOWN);
  };

  EditableController.prototype._unwrap = function(node) {
    var next;
    node = $(node).unwrap().get(0);
    if ((next = node.nextSibling) && next.nodeValue) {
      node.nodeValue += next.nodeValue;
      $(next).remove();
    }
    return node;
  };

  EditableController.prototype.catchQuery = function(e) {
    var $inserted, $query, _range, index, inserted, lastNode, matched, offset, query, range;
    if (this.app.isComposing) {
      return;
    }
    if (!(range = this._getRange())) {
      return;
    }
    if (e.which === KEY_CODE.CTRL) {
      this.ctrl_pressed = true;
    } else if (e.which === KEY_CODE.A) {
      if (this.ctrl_pressed == null) {
        this.ctrl_a_pressed = true;
      }
    } else {
      delete this.ctrl_a_pressed;
      delete this.ctrl_pressed;
    }
    if (e.which === KEY_CODE.ENTER) {
      ($query = $(range.startContainer).closest('.atwho-query')).contents().unwrap();
      if ($query.is(':empty')) {
        $query.remove();
      }
      ($query = $(".atwho-query", this.app.document)).text($query.text()).contents().last().unwrap();
      this._clearRange();
      return;
    }
    if (/firefox/i.test(navigator.userAgent)) {
      if ($(range.startContainer).is(this.$inputor)) {
        this._clearRange();
        return;
      }
      if (e.which === KEY_CODE.BACKSPACE && range.startContainer.nodeType === document.ELEMENT_NODE && (offset = range.startOffset - 1) >= 0) {
        _range = range.cloneRange();
        _range.setStart(range.startContainer, offset);
        if ($(_range.cloneContents()).contents().last().is('.atwho-inserted')) {
          inserted = $(range.startContainer).contents().get(offset);
          this._setRange('after', $(inserted).contents().last());
        }
      } else if (e.which === KEY_CODE.LEFT && range.startContainer.nodeType === document.TEXT_NODE) {
        $inserted = $(range.startContainer.previousSibling);
        if ($inserted.is('.atwho-inserted') && range.startOffset === 0) {
          this._setRange('after', $inserted.contents().last());
        }
      }
    }
    $(range.startContainer).closest('.atwho-inserted').addClass('atwho-query').siblings().removeClass('atwho-query');
    if (($query = $(".atwho-query", this.app.document)).length > 0 && $query.is(':empty') && $query.text().length === 0) {
      $query.remove();
    }
    if (!this._movingEvent(e)) {
      $query.removeClass('atwho-inserted');
    }
    _range = range.cloneRange();
    _range.setStart(range.startContainer, 0);
    matched = this.callbacks("matcher").call(this, this.at, _range.toString(), this.getOpt('startWithSpace'));
    if ($query.length === 0 && typeof matched === 'string' && (index = range.startOffset - this.at.length - matched.length) >= 0) {
      range.setStart(range.startContainer, index);
      $query = $('<span/>', this.app.document).attr(this.getOpt("editableAtwhoQueryAttrs")).addClass('atwho-query');
      range.surroundContents($query.get(0));
      lastNode = $query.contents().last().get(0);
      if (/firefox/i.test(navigator.userAgent)) {
        range.setStart(lastNode, lastNode.length);
        range.setEnd(lastNode, lastNode.length);
        this._clearRange(range);
      } else {
        this._setRange('after', lastNode, range);
      }
    }
    if (typeof matched === 'string' && matched.length <= this.getOpt('maxLen', 20)) {
      query = {
        text: matched,
        el: $query
      };
      this.trigger("matched", [this.at, query.text]);
      return this.query = query;
    } else {
      this.view.hide();
      this.query = {
        el: $query
      };
      if ($query.text().indexOf(this.at) >= 0) {
        if (this._movingEvent(e) && $query.hasClass('atwho-inserted')) {
          $query.removeClass('atwho-query');
        } else if (false !== this.callbacks('afterMatchFailed').call(this, this.at, $query)) {
          this._setRange("after", this._unwrap($query.text($query.text()).contents().first()));
        }
      }
      return null;
    }
  };

  EditableController.prototype.rect = function() {
    var $iframe, iframeOffset, rect;
    rect = this.query.el.offset();
    if (this.app.iframe && !this.app.iframeAsRoot) {
      iframeOffset = ($iframe = $(this.app.iframe)).offset();
      rect.left += iframeOffset.left - this.$inputor.scrollLeft();
      rect.top += iframeOffset.top - this.$inputor.scrollTop();
    }
    rect.bottom = rect.top + this.query.el.height();
    return rect;
  };

  EditableController.prototype.insert = function(content, $li) {
    var range, suffix, suffixNode;
    suffix = (suffix = this.getOpt('suffix')) === "" ? suffix : suffix || "\u00A0";
    this.query.el.removeClass('atwho-query').addClass('atwho-inserted').html(content);
    if (range = this._getRange()) {
      range.setEndAfter(this.query.el[0]);
      range.collapse(false);
      range.insertNode(suffixNode = this.app.document.createTextNode(suffix));
      this._setRange('after', suffixNode, range);
    }
    if (!this.$inputor.is(':focus')) {
      this.$inputor.focus();
    }
    return this.$inputor.change();
  };

  return EditableController;

})(Controller);

Model = (function() {
  function Model(context) {
    this.context = context;
    this.at = this.context.at;
    this.storage = this.context.$inputor;
  }

  Model.prototype.destroy = function() {
    return this.storage.data(this.at, null);
  };

  Model.prototype.saved = function() {
    return this.fetch() > 0;
  };

  Model.prototype.query = function(query, callback) {
    var _remoteFilter, data, searchKey;
    data = this.fetch();
    searchKey = this.context.getOpt("searchKey");
    data = this.context.callbacks('filter').call(this.context, query, data, searchKey) || [];
    _remoteFilter = this.context.callbacks('remoteFilter');
    if (data.length > 0 || (!_remoteFilter && data.length === 0)) {
      return callback(data);
    } else {
      return _remoteFilter.call(this.context, query, callback);
    }
  };

  Model.prototype.fetch = function() {
    return this.storage.data(this.at) || [];
  };

  Model.prototype.save = function(data) {
    return this.storage.data(this.at, this.context.callbacks("beforeSave").call(this.context, data || []));
  };

  Model.prototype.load = function(data) {
    if (!(this.saved() || !data)) {
      return this._load(data);
    }
  };

  Model.prototype.reload = function(data) {
    return this._load(data);
  };

  Model.prototype._load = function(data) {
    if (typeof data === "string") {
      return $.ajax(data, {
        dataType: "json"
      }).done((function(_this) {
        return function(data) {
          return _this.save(data);
        };
      })(this));
    } else {
      return this.save(data);
    }
  };

  return Model;

})();

View = (function() {
  function View(context) {
    this.context = context;
    this.$el = $("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>");
    this.timeoutID = null;
    this.context.$el.append(this.$el);
    this.bindEvent();
  }

  View.prototype.init = function() {
    var id;
    id = this.context.getOpt("alias") || this.context.at.charCodeAt(0);
    return this.$el.attr({
      'id': "at-view-" + id
    });
  };

  View.prototype.destroy = function() {
    return this.$el.remove();
  };

  View.prototype.bindEvent = function() {
    var $menu;
    $menu = this.$el.find('ul');
    return $menu.on('mouseenter.atwho-view', 'li', function(e) {
      $menu.find('.cur').removeClass('cur');
      return $(e.currentTarget).addClass('cur');
    }).on('click.atwho-view', 'li', (function(_this) {
      return function(e) {
        $menu.find('.cur').removeClass('cur');
        $(e.currentTarget).addClass('cur');
        _this.choose(e);
        return e.preventDefault();
      };
    })(this));
  };

  View.prototype.visible = function() {
    return this.$el.is(":visible");
  };

  View.prototype.highlighted = function() {
    return this.$el.find(".cur").length > 0;
  };

  View.prototype.choose = function(e) {
    var $li, content;
    if (($li = this.$el.find(".cur")).length) {
      content = this.context.insertContentFor($li);
      this.context.insert(this.context.callbacks("beforeInsert").call(this.context, content, $li), $li);
      this.context.trigger("inserted", [$li, e]);
      this.hide(e);
    }
    if (this.context.getOpt("hideWithoutSuffix")) {
      return this.stopShowing = true;
    }
  };

  View.prototype.reposition = function(rect) {
    var _window, offset, overflowOffset, ref;
    _window = this.context.app.iframeAsRoot ? this.context.app.window : window;
    if (rect.bottom + this.$el.height() - $(_window).scrollTop() > $(_window).height()) {
      rect.bottom = rect.top - this.$el.height();
    }
    if (rect.left > (overflowOffset = $(_window).width() - this.$el.width() - 5)) {
      rect.left = overflowOffset;
    }
    offset = {
      left: rect.left,
      top: rect.bottom
    };
    if ((ref = this.context.callbacks("beforeReposition")) != null) {
      ref.call(this.context, offset);
    }
    this.$el.offset(offset);
    return this.context.trigger("reposition", [offset]);
  };

  View.prototype.next = function() {
    var cur, next;
    cur = this.$el.find('.cur').removeClass('cur');
    next = cur.next();
    if (!next.length) {
      next = this.$el.find('li:first');
    }
    next.addClass('cur');
    return this.scrollTop(Math.max(0, cur.innerHeight() * (next.index() + 2) - this.$el.height()));
  };

  View.prototype.prev = function() {
    var cur, prev;
    cur = this.$el.find('.cur').removeClass('cur');
    prev = cur.prev();
    if (!prev.length) {
      prev = this.$el.find('li:last');
    }
    prev.addClass('cur');
    return this.scrollTop(Math.max(0, cur.innerHeight() * (prev.index() + 2) - this.$el.height()));
  };

  View.prototype.scrollTop = function(scrollTop) {
    var scrollDuration;
    scrollDuration = this.context.getOpt('scrollDuration');
    if (scrollDuration) {
      return this.$el.animate({
        scrollTop: scrollTop
      }, scrollDuration);
    } else {
      return this.$el.scrollTop(scrollTop);
    }
  };

  View.prototype.show = function() {
    var rect;
    if (this.stopShowing) {
      this.stopShowing = false;
      return;
    }
    if (!this.visible()) {
      this.$el.show();
      this.$el.scrollTop(0);
      this.context.trigger('shown');
    }
    if (rect = this.context.rect()) {
      return this.reposition(rect);
    }
  };

  View.prototype.hide = function(e, time) {
    var callback;
    if (!this.visible()) {
      return;
    }
    if (isNaN(time)) {
      this.$el.hide();
      return this.context.trigger('hidden', [e]);
    } else {
      callback = (function(_this) {
        return function() {
          return _this.hide();
        };
      })(this);
      clearTimeout(this.timeoutID);
      return this.timeoutID = setTimeout(callback, time);
    }
  };

  View.prototype.render = function(list) {
    var $li, $ul, i, item, len, li, tpl;
    if (!($.isArray(list) && list.length > 0)) {
      this.hide();
      return;
    }
    this.$el.find('ul').empty();
    $ul = this.$el.find('ul');
    tpl = this.context.getOpt('displayTpl');
    for (i = 0, len = list.length; i < len; i++) {
      item = list[i];
      item = $.extend({}, item, {
        'atwho-at': this.context.at
      });
      li = this.context.callbacks("tplEval").call(this.context, tpl, item, "onDisplay");
      $li = $(this.context.callbacks("highlighter").call(this.context, li, this.context.query.text));
      $li.data("item-data", item);
      $ul.append($li);
    }
    this.show();
    if (this.context.getOpt('highlightFirst')) {
      return $ul.find("li:first").addClass("cur");
    }
  };

  return View;

})();

KEY_CODE = {
  DOWN: 40,
  UP: 38,
  ESC: 27,
  TAB: 9,
  ENTER: 13,
  CTRL: 17,
  A: 65,
  P: 80,
  N: 78,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  BACKSPACE: 8,
  SPACE: 32
};

DEFAULT_CALLBACKS = {
  beforeSave: function(data) {
    return Controller.arrayToDefaultHash(data);
  },
  matcher: function(flag, subtext, should_startWithSpace, acceptSpaceBar) {
    var _a, _y, match, regexp, space;
    flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    if (should_startWithSpace) {
      flag = '(?:^|\\s)' + flag;
    }
    _a = decodeURI("%C3%80");
    _y = decodeURI("%C3%BF");
    space = acceptSpaceBar ? "\ " : "";
    regexp = new RegExp(flag + "([A-Za-z" + _a + "-" + _y + "0-9_" + space + "\.\+\-]*)$|" + flag + "([^\\x00-\\xff]*)$", 'gi');
    match = regexp.exec(subtext);
    if (match) {
      return match[2] || match[1];
    } else {
      return null;
    }
  },
  filter: function(query, data, searchKey) {
    var _results, i, item, len;
    _results = [];
    for (i = 0, len = data.length; i < len; i++) {
      item = data[i];
      if (~new String(item[searchKey]).toLowerCase().indexOf(query.toLowerCase())) {
        _results.push(item);
      }
    }
    return _results;
  },
  remoteFilter: null,
  sorter: function(query, items, searchKey) {
    var _results, i, item, len;
    if (!query) {
      return items;
    }
    _results = [];
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      item.atwho_order = new String(item[searchKey]).toLowerCase().indexOf(query.toLowerCase());
      if (item.atwho_order > -1) {
        _results.push(item);
      }
    }
    return _results.sort(function(a, b) {
      return a.atwho_order - b.atwho_order;
    });
  },
  tplEval: function(tpl, map) {
    var error, template;
    template = tpl;
    try {
      if (typeof tpl !== 'string') {
        template = tpl(map);
      }
      return template.replace(/\$\{([^\}]*)\}/g, function(tag, key, pos) {
        return map[key];
      });
    } catch (_error) {
      error = _error;
      return "";
    }
  },
  highlighter: function(li, query) {
    var regexp;
    if (!query) {
      return li;
    }
    regexp = new RegExp(">\\s*(\\w*?)(" + query.replace("+", "\\+") + ")(\\w*)\\s*<", 'ig');
    return li.replace(regexp, function(str, $1, $2, $3) {
      return '> ' + $1 + '<strong>' + $2 + '</strong>' + $3 + ' <';
    });
  },
  beforeInsert: function(value, $li) {
    return value;
  },
  beforeReposition: function(offset) {
    return offset;
  },
  afterMatchFailed: function(at, el) {}
};

Api = {
  load: function(at, data) {
    var c;
    if (c = this.controller(at)) {
      return c.model.load(data);
    }
  },
  isSelecting: function() {
    var ref;
    return (ref = this.controller()) != null ? ref.view.visible() : void 0;
  },
  hide: function() {
    var ref;
    return (ref = this.controller()) != null ? ref.view.hide() : void 0;
  },
  reposition: function() {
    var c;
    if (c = this.controller()) {
      return c.view.reposition(c.rect());
    }
  },
  setIframe: function(iframe, asRoot) {
    this.setupRootElement(iframe, asRoot);
    return null;
  },
  run: function() {
    return this.dispatch();
  },
  destroy: function() {
    this.shutdown();
    return this.$inputor.data('atwho', null);
  }
};

$.fn.atwho = function(method) {
  var _args, result;
  _args = arguments;
  result = null;
  this.filter('textarea, input, [contenteditable=""], [contenteditable=true]').each(function() {
    var $this, app;
    if (!(app = ($this = $(this)).data("atwho"))) {
      $this.data('atwho', (app = new App(this)));
    }
    if (typeof method === 'object' || !method) {
      return app.reg(method.at, method);
    } else if (Api[method] && app) {
      return result = Api[method].apply(app, Array.prototype.slice.call(_args, 1));
    } else {
      return $.error("Method " + method + " does not exist on jQuery.atwho");
    }
  });
  if (result != null) {
    return result;
  } else {
    return this;
  }
};

$.fn.atwho["default"] = {
  at: void 0,
  alias: void 0,
  data: null,
  displayTpl: "<li>${name}</li>",
  insertTpl: "${atwho-at}${name}",
  callbacks: DEFAULT_CALLBACKS,
  searchKey: "name",
  suffix: void 0,
  hideWithoutSuffix: false,
  startWithSpace: true,
  highlightFirst: true,
  limit: 5,
  maxLen: 20,
  displayTimeout: 300,
  delay: null,
  spaceSelectsMatch: false,
  tabSelectsMatch: true,
  editableAtwhoQueryAttrs: {},
  scrollDuration: 150
};

$.fn.atwho.debug = false;


}));


(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*
bindWithDelay jQuery plugin
Author: Brian Grinstead
MIT license: http://www.opensource.org/licenses/mit-license.php
http://github.com/bgrins/bindWithDelay
http://briangrinstead.com/files/bindWithDelay
Usage:
    See http://api.jquery.com/bind/
    .bindWithDelay( eventType, [ eventData ], handler(eventObject), timeout, throttle )
Examples:
    $("#foo").bindWithDelay("click", function(e) { }, 100);
    $(window).bindWithDelay("resize", { optional: "eventData" }, callback, 1000);
    $(window).bindWithDelay("resize", callback, 1000, true);
*/


(function($) {

$.fn.bindWithDelay = function( type, data, fn, timeout, throttle ) {

    if ( $.isFunction( data ) ) {
        throttle = timeout;
        timeout = fn;
        fn = data;
        data = undefined;
    }

    // Allow delayed function to be removed with fn in unbind function
    fn.guid = fn.guid || ($.guid && $.guid++);

    // Bind each separately so that each element has its own delay
    return this.each(function() {

        var wait = null;

        function cb() {
            var e = $.extend(true, { }, arguments[0]);
            var ctx = this;
            var throttler = function() {
                wait = null;
                fn.apply(ctx, [e]);
            };

            if (!throttle) { clearTimeout(wait); wait = null; }
            if (!wait) { wait = setTimeout(throttler, timeout); }
        }

        cb.guid = fn.guid;

        $(this).bind(type, data, cb);
    });
};

})(jQuery);
/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-video-touch-shiv-cssclasses-teststyles-prefixes-cssclassprefix:w!mod!
 */

;window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(m.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},n.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c};for(var B in n)v(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" w-mod-"+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=m,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" w-mod-js w-mod-"+q.join(" w-mod-"):""),e}(this,this.document);
/**
 * Webflow: Custom tests
 */
Modernizr.addTest('ios', /(ipod|iphone|ipad)/i.test(navigator.userAgent));
/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */
/******/
 (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(1);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	module.exports = __webpack_require__(17);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Core site library
	 */

	var Webflow = {};
	var modules = {};
	var primary = [];
	var secondary = window.Webflow || [];
	var $ = window.jQuery;
	var $win = $(window);
	var $doc = $(document);
	var isFunction = $.isFunction;
	var _ = Webflow._ = __webpack_require__(18);
	var tram = __webpack_require__(3) && $.tram;
	var domready = false;
	var destroyed = false;
	var Modernizr = window.Modernizr;
	var noop = function() {};
	tram.config.hideBackface = false;
	tram.config.keepInherited = true;

	/**
	 * Webflow.define - Define a named module
	 * @param  {string} name
	 * @param  {function} factory
	 * @param  {object} options
	 * @return {object}
	 */
	Webflow.define = function(name, factory, options) {
	  if (modules[name]) unbindModule(modules[name]);
	  var instance = modules[name] = factory($, _, options) || {};
	  bindModule(instance);
	  return instance;
	};

	/**
	 * Webflow.require - Require a named module
	 * @param  {string} name
	 * @return {object}
	 */
	Webflow.require = function(name) {
	  return modules[name];
	};

	function bindModule(module) {
	  // If running in Webflow app, subscribe to design/preview events
	  if (Webflow.env()) {
	    isFunction(module.design) && $win.on('__wf_design', module.design);
	    isFunction(module.preview) && $win.on('__wf_preview', module.preview);
	  }
	  // Subscribe to front-end destroy event
	  isFunction(module.destroy) && $win.on('__wf_destroy', module.destroy);
	  // Look for ready method on module
	  if (module.ready && isFunction(module.ready)) {
	    addReady(module);
	  }
	}

	function addReady(module) {
	  // If domready has already happened, run ready method
	  if (domready) {
	    module.ready();
	    return;
	  }
	  // Otherwise add ready method to the primary queue (only once)
	  if (_.contains(primary, module.ready)) return;
	  primary.push(module.ready);
	}

	function unbindModule(module) {
	  // Unsubscribe module from window events
	  isFunction(module.design) && $win.off('__wf_design', module.design);
	  isFunction(module.preview) && $win.off('__wf_preview', module.preview);
	  isFunction(module.destroy) && $win.off('__wf_destroy', module.destroy);
	  // Remove ready method from primary queue
	  if (module.ready && isFunction(module.ready)) {
	    removeReady(module);
	  }
	}

	function removeReady(module) {
	  primary = _.filter(primary, function(readyFn) {
	    return readyFn !== module.ready;
	  });
	}

	/**
	 * Webflow.push - Add a ready handler into secondary queue
	 * @param {function} ready  Callback to invoke on domready
	 */
	Webflow.push = function(ready) {
	  // If domready has already happened, invoke handler
	  if (domready) {
	    isFunction(ready) && ready();
	    return;
	  }
	  // Otherwise push into secondary queue
	  secondary.push(ready);
	};

	/**
	 * Webflow.env - Get the state of the Webflow app
	 * @param {string} mode [optional]
	 * @return {boolean}
	 */
	Webflow.env = function(mode) {
	  var designFlag = window.__wf_design;
	  var inApp = typeof designFlag !== 'undefined';
	  if (!mode) return inApp;
	  if (mode === 'design') return inApp && designFlag;
	  if (mode === 'preview') return inApp && !designFlag;
	  if (mode === 'slug') return inApp && window.__wf_slug;
	  if (mode === 'editor') return window.WebflowEditor;
	  if (mode === 'test') return window.__wf_test;
	  if (mode === 'frame') return window !== window.top;
	};

	// Feature detects + browser sniffs  à² _à² 
	var userAgent = navigator.userAgent.toLowerCase();
	var appVersion = navigator.appVersion.toLowerCase();
	var touch = Webflow.env.touch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch;
	var chrome = Webflow.env.chrome = /chrome/.test(userAgent) && /Google/.test(navigator.vendor) && parseInt(appVersion.match(/chrome\/(\d+)\./)[1], 10);
	var ios = Webflow.env.ios = Modernizr && Modernizr.ios;
	Webflow.env.safari = /safari/.test(userAgent) && !chrome && !ios;

	// Maintain current touch target to prevent late clicks on touch devices
	var touchTarget;
	// Listen for both events to support touch/mouse hybrid devices
	touch && $doc.on('touchstart mousedown', function(evt) {
	  touchTarget = evt.target;
	});

	/**
	 * Webflow.validClick - validate click target against current touch target
	 * @param  {HTMLElement} clickTarget  Element being clicked
	 * @return {Boolean}  True if click target is valid (always true on non-touch)
	 */
	Webflow.validClick = touch ? function(clickTarget) {
	  return clickTarget === touchTarget || $.contains(clickTarget, touchTarget);
	} : function() { return true; };

	/**
	 * Webflow.resize, Webflow.scroll - throttled event proxies
	 */
	var resizeEvents = 'resize.webflow orientationchange.webflow load.webflow';
	var scrollEvents = 'scroll.webflow ' + resizeEvents;
	Webflow.resize = eventProxy($win, resizeEvents);
	Webflow.scroll = eventProxy($win, scrollEvents);
	Webflow.redraw = eventProxy();

	// Create a proxy instance for throttled events
	function eventProxy(target, types) {

	  // Set up throttled method (using custom frame-based _.throttle)
	  var handlers = [];
	  var proxy = {};
	  proxy.up = _.throttle(function(evt) {
	    _.each(handlers, function(h) { h(evt); });
	  });

	  // Bind events to target
	  if (target && types) target.on(types, proxy.up);

	  /**
	   * Add an event handler
	   * @param  {function} handler
	   */
	  proxy.on = function(handler) {
	    if (typeof handler !== 'function') return;
	    if (_.contains(handlers, handler)) return;
	    handlers.push(handler);
	  };

	  /**
	   * Remove an event handler
	   * @param  {function} handler
	   */
	  proxy.off = function(handler) {
	    // If no arguments supplied, clear all handlers
	    if (!arguments.length) {
	      handlers = [];
	      return;
	    }
	    // Otherwise, remove handler from the list
	    handlers = _.filter(handlers, function(h) {
	      return h !== handler;
	    });
	  };

	  return proxy;
	}

	// Webflow.location - Wrap window.location in api
	Webflow.location = function(url) {
	  window.location = url;
	};

	// Webflow.app - Designer-specific methods
	Webflow.app = Webflow.env() ? {} : null;
	if (Webflow.app) {

	  // Trigger redraw for specific elements
	  var redraw = new Event('__wf_redraw');
	  Webflow.app.redrawElement = function(i, el) { el.dispatchEvent(redraw); };

	  // Webflow.location - Re-route location change to trigger an event
	  Webflow.location = function(url) {
	    window.dispatchEvent(new CustomEvent('__wf_location', { detail: url }));
	  };
	}

	// Webflow.ready - Call primary and secondary handlers
	Webflow.ready = function() {
	  domready = true;

	  // Restore modules after destroy
	  if (destroyed) {
	    restoreModules();

	  // Otherwise run primary ready methods
	  } else {
	    _.each(primary, callReady);
	  }

	  // Run secondary ready methods
	  _.each(secondary, callReady);

	  // Trigger resize
	  Webflow.resize.up();
	};

	function callReady(readyFn) {
	  isFunction(readyFn) && readyFn();
	}

	function restoreModules() {
	  destroyed = false;
	  _.each(modules, bindModule);
	}

	/**
	 * Webflow.load - Add a window load handler that will run even if load event has already happened
	 * @param  {function} handler
	 */
	var deferLoad;
	Webflow.load = function(handler) {
	  deferLoad.then(handler);
	};

	function bindLoad() {
	  // Reject any previous deferred (to support destroy)
	  if (deferLoad) {
	    deferLoad.reject();
	    $win.off('load', deferLoad.resolve);
	  }
	  // Create deferred and bind window load event
	  deferLoad = new $.Deferred();
	  $win.on('load', deferLoad.resolve);
	}

	// Webflow.destroy - Trigger a destroy event for all modules
	Webflow.destroy = function(options) {
	  options = options || {};
	  destroyed = true;
	  $win.triggerHandler('__wf_destroy');

	  // Allow domready reset for tests
	  if (options.domready != null) {
	    domready = options.domready;
	  }

	  // Unbind modules
	  _.each(modules, unbindModule);

	  // Clear any proxy event handlers
	  Webflow.resize.off();
	  Webflow.scroll.off();
	  Webflow.redraw.off();

	  // Clear any queued ready methods
	  primary = [];
	  secondary = [];

	  // If load event has not yet fired, replace the deferred
	  if (deferLoad.state() === 'pending') bindLoad();
	};

	// Listen for domready
	$(Webflow.ready);

	// Listen for window.onload and resolve deferred
	bindLoad();

	// Export commonjs module
	module.exports = window.Webflow = Webflow;


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Webflow: IX Event triggers for other modules
	 */

	var $ = window.jQuery;
	var api = {};
	var eventQueue = [];
	var namespace = '.w-ix';

	var eventTriggers = {
	  reset: function(i, el) {
	    el.__wf_intro = null;
	  },
	  intro: function(i, el) {
	    if (el.__wf_intro) return;
	    el.__wf_intro = true;
	    $(el).triggerHandler(api.types.INTRO);
	  },
	  outro: function(i, el) {
	    if (!el.__wf_intro) return;
	    el.__wf_intro = null;
	    $(el).triggerHandler(api.types.OUTRO);
	  }
	};

	api.triggers = {};

	api.types = {
	  INTRO: 'w-ix-intro' + namespace,
	  OUTRO: 'w-ix-outro' + namespace
	};

	// Trigger any events in queue + restore trigger methods
	api.init = function() {
	  var count = eventQueue.length;
	  for (var i = 0; i < count; i++) {
	    var memo = eventQueue[i];
	    memo[0](0, memo[1]);
	  }
	  eventQueue = [];
	  $.extend(api.triggers, eventTriggers);
	};

	// Replace all triggers with async wrapper to queue events until init
	api.async = function() {
	  for (var key in eventTriggers) {
	    var func = eventTriggers[key];
	    if (!eventTriggers.hasOwnProperty(key)) continue;

	    // Replace trigger method with async wrapper
	    api.triggers[key] = function(i, el) {
	      eventQueue.push([func, el]);
	    };
	  }
	};

	// Default triggers to async queue
	api.async();

	module.exports = api;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*!
	 * tram.js v0.8.1-global
	 * Cross-browser CSS3 transitions in JavaScript
	 * https://github.com/bkwld/tram
	 * MIT License
	 */
	window.tram=function(a){function b(a,b){var c=new L.Bare;return c.init(a,b)}function c(a){return a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}function d(a){var b=parseInt(a.slice(1),16),c=b>>16&255,d=b>>8&255,e=255&b;return[c,d,e]}function e(a,b,c){return"#"+(1<<24|a<<16|b<<8|c).toString(16).slice(1)}function f(){}function g(a,b){_("Type warning: Expected: ["+a+"] Got: ["+typeof b+"] "+b)}function h(a,b,c){_("Units do not match ["+a+"]: "+b+", "+c)}function i(a,b,c){if(void 0!==b&&(c=b),void 0===a)return c;var d=c;return Z.test(a)||!$.test(a)?d=parseInt(a,10):$.test(a)&&(d=1e3*parseFloat(a)),0>d&&(d=0),d===d?d:c}function j(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}var k=function(a,b,c){function d(a){return"object"==typeof a}function e(a){return"function"==typeof a}function f(){}function g(h,i){function j(){var a=new k;return e(a.init)&&a.init.apply(a,arguments),a}function k(){}i===c&&(i=h,h=Object),j.Bare=k;var l,m=f[a]=h[a],n=k[a]=j[a]=new f;return n.constructor=j,j.mixin=function(b){return k[a]=j[a]=g(j,b)[a],j},j.open=function(a){if(l={},e(a)?l=a.call(j,n,m,j,h):d(a)&&(l=a),d(l))for(var c in l)b.call(l,c)&&(n[c]=l[c]);return e(n.init)||(n.init=h),j},j.open(i)}return g}("prototype",{}.hasOwnProperty),l={ease:["ease",function(a,b,c,d){var e=(a/=d)*a,f=e*a;return b+c*(-2.75*f*e+11*e*e+-15.5*f+8*e+.25*a)}],"ease-in":["ease-in",function(a,b,c,d){var e=(a/=d)*a,f=e*a;return b+c*(-1*f*e+3*e*e+-3*f+2*e)}],"ease-out":["ease-out",function(a,b,c,d){var e=(a/=d)*a,f=e*a;return b+c*(.3*f*e+-1.6*e*e+2.2*f+-1.8*e+1.9*a)}],"ease-in-out":["ease-in-out",function(a,b,c,d){var e=(a/=d)*a,f=e*a;return b+c*(2*f*e+-5*e*e+2*f+2*e)}],linear:["linear",function(a,b,c,d){return c*a/d+b}],"ease-in-quad":["cubic-bezier(0.550, 0.085, 0.680, 0.530)",function(a,b,c,d){return c*(a/=d)*a+b}],"ease-out-quad":["cubic-bezier(0.250, 0.460, 0.450, 0.940)",function(a,b,c,d){return-c*(a/=d)*(a-2)+b}],"ease-in-out-quad":["cubic-bezier(0.455, 0.030, 0.515, 0.955)",function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b}],"ease-in-cubic":["cubic-bezier(0.550, 0.055, 0.675, 0.190)",function(a,b,c,d){return c*(a/=d)*a*a+b}],"ease-out-cubic":["cubic-bezier(0.215, 0.610, 0.355, 1)",function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b}],"ease-in-out-cubic":["cubic-bezier(0.645, 0.045, 0.355, 1)",function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a+b:c/2*((a-=2)*a*a+2)+b}],"ease-in-quart":["cubic-bezier(0.895, 0.030, 0.685, 0.220)",function(a,b,c,d){return c*(a/=d)*a*a*a+b}],"ease-out-quart":["cubic-bezier(0.165, 0.840, 0.440, 1)",function(a,b,c,d){return-c*((a=a/d-1)*a*a*a-1)+b}],"ease-in-out-quart":["cubic-bezier(0.770, 0, 0.175, 1)",function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a+b:-c/2*((a-=2)*a*a*a-2)+b}],"ease-in-quint":["cubic-bezier(0.755, 0.050, 0.855, 0.060)",function(a,b,c,d){return c*(a/=d)*a*a*a*a+b}],"ease-out-quint":["cubic-bezier(0.230, 1, 0.320, 1)",function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b}],"ease-in-out-quint":["cubic-bezier(0.860, 0, 0.070, 1)",function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b}],"ease-in-sine":["cubic-bezier(0.470, 0, 0.745, 0.715)",function(a,b,c,d){return-c*Math.cos(a/d*(Math.PI/2))+c+b}],"ease-out-sine":["cubic-bezier(0.390, 0.575, 0.565, 1)",function(a,b,c,d){return c*Math.sin(a/d*(Math.PI/2))+b}],"ease-in-out-sine":["cubic-bezier(0.445, 0.050, 0.550, 0.950)",function(a,b,c,d){return-c/2*(Math.cos(Math.PI*a/d)-1)+b}],"ease-in-expo":["cubic-bezier(0.950, 0.050, 0.795, 0.035)",function(a,b,c,d){return 0===a?b:c*Math.pow(2,10*(a/d-1))+b}],"ease-out-expo":["cubic-bezier(0.190, 1, 0.220, 1)",function(a,b,c,d){return a===d?b+c:c*(-Math.pow(2,-10*a/d)+1)+b}],"ease-in-out-expo":["cubic-bezier(1, 0, 0, 1)",function(a,b,c,d){return 0===a?b:a===d?b+c:(a/=d/2)<1?c/2*Math.pow(2,10*(a-1))+b:c/2*(-Math.pow(2,-10*--a)+2)+b}],"ease-in-circ":["cubic-bezier(0.600, 0.040, 0.980, 0.335)",function(a,b,c,d){return-c*(Math.sqrt(1-(a/=d)*a)-1)+b}],"ease-out-circ":["cubic-bezier(0.075, 0.820, 0.165, 1)",function(a,b,c,d){return c*Math.sqrt(1-(a=a/d-1)*a)+b}],"ease-in-out-circ":["cubic-bezier(0.785, 0.135, 0.150, 0.860)",function(a,b,c,d){return(a/=d/2)<1?-c/2*(Math.sqrt(1-a*a)-1)+b:c/2*(Math.sqrt(1-(a-=2)*a)+1)+b}],"ease-in-back":["cubic-bezier(0.600, -0.280, 0.735, 0.045)",function(a,b,c,d,e){return void 0===e&&(e=1.70158),c*(a/=d)*a*((e+1)*a-e)+b}],"ease-out-back":["cubic-bezier(0.175, 0.885, 0.320, 1.275)",function(a,b,c,d,e){return void 0===e&&(e=1.70158),c*((a=a/d-1)*a*((e+1)*a+e)+1)+b}],"ease-in-out-back":["cubic-bezier(0.680, -0.550, 0.265, 1.550)",function(a,b,c,d,e){return void 0===e&&(e=1.70158),(a/=d/2)<1?c/2*a*a*(((e*=1.525)+1)*a-e)+b:c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b}]},m={"ease-in-back":"cubic-bezier(0.600, 0, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1)","ease-in-out-back":"cubic-bezier(0.680, 0, 0.265, 1)"},n=document,o=window,p="bkwld-tram",q=/[\-\.0-9]/g,r=/[A-Z]/,s="number",t=/^(rgb|#)/,u=/(em|cm|mm|in|pt|pc|px)$/,v=/(em|cm|mm|in|pt|pc|px|%)$/,w=/(deg|rad|turn)$/,x="unitless",y=/(all|none) 0s ease 0s/,z=/^(width|height)$/,A=" ",B=n.createElement("a"),C=["Webkit","Moz","O","ms"],D=["-webkit-","-moz-","-o-","-ms-"],E=function(a){if(a in B.style)return{dom:a,css:a};var b,c,d="",e=a.split("-");for(b=0;b<e.length;b++)d+=e[b].charAt(0).toUpperCase()+e[b].slice(1);for(b=0;b<C.length;b++)if(c=C[b]+d,c in B.style)return{dom:c,css:D[b]+a}},F=b.support={bind:Function.prototype.bind,transform:E("transform"),transition:E("transition"),backface:E("backface-visibility"),timing:E("transition-timing-function")};if(F.transition){var G=F.timing.dom;if(B.style[G]=l["ease-in-back"][0],!B.style[G])for(var H in m)l[H][0]=m[H]}var I=b.frame=function(){var a=o.requestAnimationFrame||o.webkitRequestAnimationFrame||o.mozRequestAnimationFrame||o.oRequestAnimationFrame||o.msRequestAnimationFrame;return a&&F.bind?a.bind(o):function(a){o.setTimeout(a,16)}}(),J=b.now=function(){var a=o.performance,b=a&&(a.now||a.webkitNow||a.msNow||a.mozNow);return b&&F.bind?b.bind(a):Date.now||function(){return+new Date}}(),K=k(function(b){function d(a,b){var c=j((""+a).split(A)),d=c[0];b=b||{};var e=X[d];if(!e)return _("Unsupported property: "+d);if(!b.weak||!this.props[d]){var f=e[0],g=this.props[d];return g||(g=this.props[d]=new f.Bare),g.init(this.$el,c,e,b),g}}function e(a,b,c){if(a){var e=typeof a;if(b||(this.timer&&this.timer.destroy(),this.queue=[],this.active=!1),"number"==e&&b)return this.timer=new R({duration:a,context:this,complete:h}),void(this.active=!0);if("string"==e&&b){switch(a){case"hide":n.call(this);break;case"stop":k.call(this);break;case"redraw":o.call(this);break;default:d.call(this,a,c&&c[1])}return h.call(this)}if("function"==e)return void a.call(this,this);if("object"==e){var f=0;t.call(this,a,function(a,b){a.span>f&&(f=a.span),a.stop(),a.animate(b)},function(a){"wait"in a&&(f=i(a.wait,0))}),s.call(this),f>0&&(this.timer=new R({duration:f,context:this}),this.active=!0,b&&(this.timer.complete=h));var g=this,j=!1,l={};I(function(){t.call(g,a,function(a){a.active&&(j=!0,l[a.name]=a.nextStyle)}),j&&g.$el.css(l)})}}}function f(a){a=i(a,0),this.active?this.queue.push({options:a}):(this.timer=new R({duration:a,context:this,complete:h}),this.active=!0)}function g(a){return this.active?(this.queue.push({options:a,args:arguments}),void(this.timer.complete=h)):_("No active transition timer. Use start() or wait() before then().")}function h(){if(this.timer&&this.timer.destroy(),this.active=!1,this.queue.length){var a=this.queue.shift();e.call(this,a.options,!0,a.args)}}function k(a){this.timer&&this.timer.destroy(),this.queue=[],this.active=!1;var b;"string"==typeof a?(b={},b[a]=1):b="object"==typeof a&&null!=a?a:this.props,t.call(this,b,u),s.call(this)}function l(a){k.call(this,a),t.call(this,a,v,w)}function m(a){"string"!=typeof a&&(a="block"),this.el.style.display=a}function n(){k.call(this),this.el.style.display="none"}function o(){this.el.offsetHeight}function q(){k.call(this),a.removeData(this.el,p),this.$el=this.el=null}function s(){var a,b,c=[];this.upstream&&c.push(this.upstream);for(a in this.props)b=this.props[a],b.active&&c.push(b.string);c=c.join(","),this.style!==c&&(this.style=c,this.el.style[F.transition.dom]=c)}function t(a,b,e){var f,g,h,i,j=b!==u,k={};for(f in a)h=a[f],f in Y?(k.transform||(k.transform={}),k.transform[f]=h):(r.test(f)&&(f=c(f)),f in X?k[f]=h:(i||(i={}),i[f]=h));for(f in k){if(h=k[f],g=this.props[f],!g){if(!j)continue;g=d.call(this,f)}b.call(this,g,h)}e&&i&&e.call(this,i)}function u(a){a.stop()}function v(a,b){a.set(b)}function w(a){this.$el.css(a)}function x(a,c){b[a]=function(){return this.children?z.call(this,c,arguments):(this.el&&c.apply(this,arguments),this)}}function z(a,b){var c,d=this.children.length;for(c=0;d>c;c++)a.apply(this.children[c],b);return this}b.init=function(b){if(this.$el=a(b),this.el=this.$el[0],this.props={},this.queue=[],this.style="",this.active=!1,T.keepInherited&&!T.fallback){var c=V(this.el,"transition");c&&!y.test(c)&&(this.upstream=c)}F.backface&&T.hideBackface&&U(this.el,F.backface.css,"hidden")},x("add",d),x("start",e),x("wait",f),x("then",g),x("next",h),x("stop",k),x("set",l),x("show",m),x("hide",n),x("redraw",o),x("destroy",q)}),L=k(K,function(b){function c(b,c){var d=a.data(b,p)||a.data(b,p,new K.Bare);return d.el||d.init(b),c?d.start(c):d}b.init=function(b,d){var e=a(b);if(!e.length)return this;if(1===e.length)return c(e[0],d);var f=[];return e.each(function(a,b){f.push(c(b,d))}),this.children=f,this}}),M=k(function(a){function b(){var a=this.get();this.update("auto");var b=this.get();return this.update(a),b}function c(a,b,c){return void 0!==b&&(c=b),a in l?a:c}function d(a){var b=/rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(a);return(b?e(b[1],b[2],b[3]):a).replace(/#(\w)(\w)(\w)$/,"#$1$1$2$2$3$3")}var f={duration:500,ease:"ease",delay:0};a.init=function(a,b,d,e){this.$el=a,this.el=a[0];var g=b[0];d[2]&&(g=d[2]),W[g]&&(g=W[g]),this.name=g,this.type=d[1],this.duration=i(b[1],this.duration,f.duration),this.ease=c(b[2],this.ease,f.ease),this.delay=i(b[3],this.delay,f.delay),this.span=this.duration+this.delay,this.active=!1,this.nextStyle=null,this.auto=z.test(this.name),this.unit=e.unit||this.unit||T.defaultUnit,this.angle=e.angle||this.angle||T.defaultAngle,T.fallback||e.fallback?this.animate=this.fallback:(this.animate=this.transition,this.string=this.name+A+this.duration+"ms"+("ease"!=this.ease?A+l[this.ease][0]:"")+(this.delay?A+this.delay+"ms":""))},a.set=function(a){a=this.convert(a,this.type),this.update(a),this.redraw()},a.transition=function(a){this.active=!0,a=this.convert(a,this.type),this.auto&&("auto"==this.el.style[this.name]&&(this.update(this.get()),this.redraw()),"auto"==a&&(a=b.call(this))),this.nextStyle=a},a.fallback=function(a){var c=this.el.style[this.name]||this.convert(this.get(),this.type);a=this.convert(a,this.type),this.auto&&("auto"==c&&(c=this.convert(this.get(),this.type)),"auto"==a&&(a=b.call(this))),this.tween=new Q({from:c,to:a,duration:this.duration,delay:this.delay,ease:this.ease,update:this.update,context:this})},a.get=function(){return V(this.el,this.name)},a.update=function(a){U(this.el,this.name,a)},a.stop=function(){(this.active||this.nextStyle)&&(this.active=!1,this.nextStyle=null,U(this.el,this.name,this.get()));var a=this.tween;a&&a.context&&a.destroy()},a.convert=function(a,b){if("auto"==a&&this.auto)return a;var c,e="number"==typeof a,f="string"==typeof a;switch(b){case s:if(e)return a;if(f&&""===a.replace(q,""))return+a;c="number(unitless)";break;case t:if(f){if(""===a&&this.original)return this.original;if(b.test(a))return"#"==a.charAt(0)&&7==a.length?a:d(a)}c="hex or rgb string";break;case u:if(e)return a+this.unit;if(f&&b.test(a))return a;c="number(px) or string(unit)";break;case v:if(e)return a+this.unit;if(f&&b.test(a))return a;c="number(px) or string(unit or %)";break;case w:if(e)return a+this.angle;if(f&&b.test(a))return a;c="number(deg) or string(angle)";break;case x:if(e)return a;if(f&&v.test(a))return a;c="number(unitless) or string(unit or %)"}return g(c,a),a},a.redraw=function(){this.el.offsetHeight}}),N=k(M,function(a,b){a.init=function(){b.init.apply(this,arguments),this.original||(this.original=this.convert(this.get(),t))}}),O=k(M,function(a,b){a.init=function(){b.init.apply(this,arguments),this.animate=this.fallback},a.get=function(){return this.$el[this.name]()},a.update=function(a){this.$el[this.name](a)}}),P=k(M,function(a,b){function c(a,b){var c,d,e,f,g;for(c in a)f=Y[c],e=f[0],d=f[1]||c,g=this.convert(a[c],e),b.call(this,d,g,e)}a.init=function(){b.init.apply(this,arguments),this.current||(this.current={},Y.perspective&&T.perspective&&(this.current.perspective=T.perspective,U(this.el,this.name,this.style(this.current)),this.redraw()))},a.set=function(a){c.call(this,a,function(a,b){this.current[a]=b}),U(this.el,this.name,this.style(this.current)),this.redraw()},a.transition=function(a){var b=this.values(a);this.tween=new S({current:this.current,values:b,duration:this.duration,delay:this.delay,ease:this.ease});var c,d={};for(c in this.current)d[c]=c in b?b[c]:this.current[c];this.active=!0,this.nextStyle=this.style(d)},a.fallback=function(a){var b=this.values(a);this.tween=new S({current:this.current,values:b,duration:this.duration,delay:this.delay,ease:this.ease,update:this.update,context:this})},a.update=function(){U(this.el,this.name,this.style(this.current))},a.style=function(a){var b,c="";for(b in a)c+=b+"("+a[b]+") ";return c},a.values=function(a){var b,d={};return c.call(this,a,function(a,c,e){d[a]=c,void 0===this.current[a]&&(b=0,~a.indexOf("scale")&&(b=1),this.current[a]=this.convert(b,e))}),d}}),Q=k(function(b){function c(a){1===n.push(a)&&I(g)}function g(){var a,b,c,d=n.length;if(d)for(I(g),b=J(),a=d;a--;)c=n[a],c&&c.render(b)}function i(b){var c,d=a.inArray(b,n);d>=0&&(c=n.slice(d+1),n.length=d,c.length&&(n=n.concat(c)))}function j(a){return Math.round(a*o)/o}function k(a,b,c){return e(a[0]+c*(b[0]-a[0]),a[1]+c*(b[1]-a[1]),a[2]+c*(b[2]-a[2]))}var m={ease:l.ease[1],from:0,to:1};b.init=function(a){this.duration=a.duration||0,this.delay=a.delay||0;var b=a.ease||m.ease;l[b]&&(b=l[b][1]),"function"!=typeof b&&(b=m.ease),this.ease=b,this.update=a.update||f,this.complete=a.complete||f,this.context=a.context||this,this.name=a.name;var c=a.from,d=a.to;void 0===c&&(c=m.from),void 0===d&&(d=m.to),this.unit=a.unit||"","number"==typeof c&&"number"==typeof d?(this.begin=c,this.change=d-c):this.format(d,c),this.value=this.begin+this.unit,this.start=J(),a.autoplay!==!1&&this.play()},b.play=function(){this.active||(this.start||(this.start=J()),this.active=!0,c(this))},b.stop=function(){this.active&&(this.active=!1,i(this))},b.render=function(a){var b,c=a-this.start;if(this.delay){if(c<=this.delay)return;c-=this.delay}if(c<this.duration){var d=this.ease(c,0,1,this.duration);return b=this.startRGB?k(this.startRGB,this.endRGB,d):j(this.begin+d*this.change),this.value=b+this.unit,void this.update.call(this.context,this.value)}b=this.endHex||this.begin+this.change,this.value=b+this.unit,this.update.call(this.context,this.value),this.complete.call(this.context),this.destroy()},b.format=function(a,b){if(b+="",a+="","#"==a.charAt(0))return this.startRGB=d(b),this.endRGB=d(a),this.endHex=a,this.begin=0,void(this.change=1);if(!this.unit){var c=b.replace(q,""),e=a.replace(q,"");c!==e&&h("tween",b,a),this.unit=c}b=parseFloat(b),a=parseFloat(a),this.begin=this.value=b,this.change=a-b},b.destroy=function(){this.stop(),this.context=null,this.ease=this.update=this.complete=f};var n=[],o=1e3}),R=k(Q,function(a){a.init=function(a){this.duration=a.duration||0,this.complete=a.complete||f,this.context=a.context,this.play()},a.render=function(a){var b=a-this.start;b<this.duration||(this.complete.call(this.context),this.destroy())}}),S=k(Q,function(a,b){a.init=function(a){this.context=a.context,this.update=a.update,this.tweens=[],this.current=a.current;var b,c;for(b in a.values)c=a.values[b],this.current[b]!==c&&this.tweens.push(new Q({name:b,from:this.current[b],to:c,duration:a.duration,delay:a.delay,ease:a.ease,autoplay:!1}));this.play()},a.render=function(a){var b,c,d=this.tweens.length,e=!1;for(b=d;b--;)c=this.tweens[b],c.context&&(c.render(a),this.current[c.name]=c.value,e=!0);return e?void(this.update&&this.update.call(this.context)):this.destroy()},a.destroy=function(){if(b.destroy.call(this),this.tweens){var a,c=this.tweens.length;for(a=c;a--;)this.tweens[a].destroy();this.tweens=null,this.current=null}}}),T=b.config={defaultUnit:"px",defaultAngle:"deg",keepInherited:!1,hideBackface:!1,perspective:"",fallback:!F.transition,agentTests:[]};b.fallback=function(a){if(!F.transition)return T.fallback=!0;T.agentTests.push("("+a+")");var b=new RegExp(T.agentTests.join("|"),"i");T.fallback=b.test(navigator.userAgent)},b.fallback("6.0.[2-5] Safari"),b.tween=function(a){return new Q(a)},b.delay=function(a,b,c){return new R({complete:b,duration:a,context:c})},a.fn.tram=function(a){return b.call(null,this,a)};var U=a.style,V=a.css,W={transform:F.transform&&F.transform.css},X={color:[N,t],background:[N,t,"background-color"],"outline-color":[N,t],"border-color":[N,t],"border-top-color":[N,t],"border-right-color":[N,t],"border-bottom-color":[N,t],"border-left-color":[N,t],"border-width":[M,u],"border-top-width":[M,u],"border-right-width":[M,u],"border-bottom-width":[M,u],"border-left-width":[M,u],"border-spacing":[M,u],"letter-spacing":[M,u],margin:[M,u],"margin-top":[M,u],"margin-right":[M,u],"margin-bottom":[M,u],"margin-left":[M,u],padding:[M,u],"padding-top":[M,u],"padding-right":[M,u],"padding-bottom":[M,u],"padding-left":[M,u],"outline-width":[M,u],opacity:[M,s],top:[M,v],right:[M,v],bottom:[M,v],left:[M,v],"font-size":[M,v],"text-indent":[M,v],"word-spacing":[M,v],width:[M,v],"min-width":[M,v],"max-width":[M,v],height:[M,v],"min-height":[M,v],"max-height":[M,v],"line-height":[M,x],"scroll-top":[O,s,"scrollTop"],"scroll-left":[O,s,"scrollLeft"]},Y={};F.transform&&(X.transform=[P],Y={x:[v,"translateX"],y:[v,"translateY"],rotate:[w],rotateX:[w],rotateY:[w],scale:[s],scaleX:[s],scaleY:[s],skew:[w],skewX:[w],skewY:[w]}),F.transform&&F.backface&&(Y.z=[v,"translateZ"],Y.rotateZ=[w],Y.scaleZ=[s],Y.perspective=[u]);var Z=/ms/,$=/s|\./,_=function(){var a="warn",b=window.console;return b&&b[a]?function(c){b[a](c)}:f}();return a.tram=b}(window.jQuery);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Brand pages on the subdomain
	 */

	var Webflow = __webpack_require__(1);

	Webflow.define('brand', module.exports = function($, _) {
	  var api = {};
	  var $html = $('html');
	  var $body = $('body');
	  var location = window.location;
	  var inApp = Webflow.env();

	  // -----------------------------------
	  // Module methods

	  api.ready = function() {
	    var doBranding = $html.attr('data-wf-status');

	    if (doBranding) {
	      var $branding = $('<div></div>');
	      var $link = $('<a></a>');
	      $link.attr('href', 'http://webflow.com?utm_campaign=brandjs');

	      $branding.css({
	        position: 'fixed',
	        bottom: 0,
	        right: 0,
	        borderTopLeftRadius: '5px',
	        backgroundColor: '#2b3239',
	        padding: '8px 12px 5px 15px',
	        fontFamily: 'Arial',
	        fontSize: '10px',
	        textTransform: 'uppercase',
	        opacity: '0',
	        transition: 'opacity 0.50s ease-in-out'
	      });

	      $link.css({
	        color: '#AAADB0',
	        textDecoration: 'none'
	      });

	      var $webflowLogo = $('<img>');
	      $webflowLogo.attr('src', 'https://daks2k3a4ib2z.cloudfront.net/54153e6a3d25f2755b1f14ed/5445a4b1944ecdaa4df86d3e_subdomain-brand.svg');
	      $webflowLogo.css({
	        opacity: 0.9,
	        width: '57px',
	        verticalAlign: 'middle',
	        paddingLeft: '4px',
	        paddingBottom: '3px'
	      });

	      $branding.text('Built with');
	      $branding.append($webflowLogo);
	      $link.append($branding);

	      $body.append($link);

	      if (/PhantomJS/.test(window.navigator.userAgent)) {
	        return;
	      }

	      $branding.css({
	        opacity: '1.0'
	      });
	    }
	  };

	  // Export module
	  return api;
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Dropdown component
	 */

	var Webflow = __webpack_require__(1);
	var IXEvents = __webpack_require__(2);

	Webflow.define('dropdown', module.exports = function($, _) {
	  var api = {};
	  var $doc = $(document);
	  var $dropdowns;
	  var designer;
	  var inApp = Webflow.env();
	  var touch = Webflow.env.touch;
	  var namespace = '.w-dropdown';
	  var stateOpen = 'w--open';
	  var closeEvent = 'w-close' + namespace;
	  var ix = IXEvents.triggers;

	  // -----------------------------------
	  // Module methods

	  api.ready = api.design = api.preview = init;

	  // -----------------------------------
	  // Private methods

	  function init() {
	    designer = inApp && Webflow.env('design');

	    // Find all instances on the page
	    $dropdowns = $doc.find(namespace);
	    $dropdowns.each(build);
	  }

	  function build(i, el) {
	    var $el = $(el);

	    // Store state in data
	    var data = $.data(el, namespace);
	    if (!data) data = $.data(el, namespace, { open: false, el: $el, config: {} });
	    data.list = $el.children('.w-dropdown-list');
	    data.toggle = $el.children('.w-dropdown-toggle');
	    data.links = data.list.children('.w-dropdown-link');
	    data.outside = outside(data);
	    data.complete = complete(data);
	    data.leave = leave(data);

	    // Remove old events
	    $el.off(namespace);
	    data.toggle.off(namespace);

	    // Set config from data attributes
	    configure(data);

	    if (data.nav) data.nav.off(namespace);
	    data.nav = $el.closest('.w-nav');
	    data.nav.on(closeEvent, handler(data));

	    // Add events based on mode
	    if (designer) {
	      $el.on('setting' + namespace, handler(data));
	    } else {
	      data.toggle.on('tap' + namespace, toggle(data));
	      if (data.config.hover) {
	        data.toggle.on('mouseenter' + namespace, enter(data));
	      }
	      $el.on(closeEvent, handler(data));
	      // Close in preview mode
	      inApp && close(data);
	    }
	  }

	  function configure(data) {
	    data.config = {
	      hover: Boolean(data.el.attr('data-hover')) && !touch,
	      delay: Number(data.el.attr('data-delay')) || 0
	    };
	  }

	  function handler(data) {
	    return function(evt, options) {
	      options = options || {};

	      if (evt.type === 'w-close') {
	        return close(data);
	      }

	      if (evt.type === 'setting') {
	        configure(data);
	        options.open === true && open(data, true);
	        options.open === false && close(data, true);
	        return;
	      }
	    };
	  }

	  function toggle(data) {
	    return _.debounce(function() {
	      data.open ? close(data) : open(data);
	    });
	  }

	  function open(data) {
	    if (data.open) return;
	    closeOthers(data);
	    data.open = true;
	    data.list.addClass(stateOpen);
	    data.toggle.addClass(stateOpen);
	    ix.intro(0, data.el[0]);
	    Webflow.redraw.up();

	    // Listen for tap outside events
	    if (!designer) $doc.on('tap' + namespace, data.outside);
	    if (data.hovering) data.el.on('mouseleave' + namespace, data.leave);

	    // Clear previous delay
	    window.clearTimeout(data.delayId);
	  }

	  function close(data, immediate) {
	    if (!data.open) return;

	    // Do not close hover-based menus if currently hovering
	    if (data.config.hover && data.hovering) return;

	    data.open = false;
	    var config = data.config;
	    ix.outro(0, data.el[0]);

	    // Stop listening for tap outside events
	    $doc.off('tap' + namespace, data.outside);
	    data.el.off('mouseleave' + namespace, data.leave);

	    // Clear previous delay
	    window.clearTimeout(data.delayId);

	    // Skip delay during immediate
	    if (!config.delay || immediate) return data.complete();

	    // Optionally wait for delay before close
	    data.delayId = window.setTimeout(data.complete, config.delay);
	  }

	  function closeOthers(data) {
	    var self = data.el[0];
	    $dropdowns.each(function(i, other) {
	      var $other = $(other);
	      if ($other.is(self) || $other.has(self).length) return;
	      $other.triggerHandler(closeEvent);
	    });
	  }

	  function outside(data) {
	    // Unbind previous tap handler if it exists
	    if (data.outside) $doc.off('tap' + namespace, data.outside);

	    // Close menu when tapped outside
	    return _.debounce(function(evt) {
	      if (!data.open) return;
	      var $target = $(evt.target);
	      if ($target.closest('.w-dropdown-toggle').length) return;
	      if (!data.el.is($target.closest(namespace))) {
	        close(data);
	      }
	    });
	  }

	  function complete(data) {
	    return function() {
	      data.list.removeClass(stateOpen);
	      data.toggle.removeClass(stateOpen);
	    };
	  }

	  function enter(data) {
	    return function() {
	      data.hovering = true;
	      open(data);
	    };
	  }

	  function leave(data) {
	    return function() {
	      data.hovering = false;
	      close(data);
	    };
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Editor loader
	 */

	var Webflow = __webpack_require__(1);

	Webflow.define('edit', module.exports = function($, _, options) {
	  options = options || {};

	  // Exit early in test env or when inside an iframe
	  if (Webflow.env('test') || Webflow.env('frame')) {
	    // Allow test fixtures to continue
	    if (!options.fixture) {
	      return {exit: 1};
	    }
	  }

	  var api = {};
	  var $win = $(window);
	  var $html = $(document.documentElement);
	  var location = document.location;
	  var hashchange = 'hashchange';
	  var loaded;
	  var loadEditor = options.load || load;

	  // Check localStorage for editor data
	  if (localStorage && localStorage.getItem && localStorage.getItem('WebflowEditor')) {
	    loadEditor();

	  } else if (location.search) {
	    // Check url query for `edit` parameter or any url ending in `?edit`
	    if (/[?&](edit)(?:[=&?]|$)/.test(location.search) || /\?edit$/.test(location.href)) {
	      loadEditor();
	    }

	  } else {
	    // Check hash fragment to support `#hash?edit`
	    $win.on(hashchange, checkHash).triggerHandler(hashchange);
	  }

	  function checkHash() {
	    if (loaded) return;
	    // Load editor when hash contains `?edit`
	    if (/\?edit/.test(location.hash)) loadEditor();
	  }

	  function load() {
	    loaded = true;
	    // Predefine global immediately to benefit Webflow.env
	    window.WebflowEditor = true;
	    $win.off(hashchange, checkHash);
	    $.ajax({
	      url: cleanSlashes(("https://editor-api.webflow.com") + '/api/editor/view'),
	      data: { siteId: $html.attr('data-wf-site') },
	      xhrFields: { withCredentials: true },
	      dataType: 'json',
	      crossDomain: true,
	      success: success
	    });
	  }

	  function success(data) {
	    if (!data) {
	      console.error('Could not load editor data');
	      return;
	    }
	    getScript(prefix(data.scriptPath), function () {
	      window.WebflowEditor(data);
	    });
	  }

	  function getScript(url, done) {
	    $.ajax({ type: 'GET', url: url, dataType: 'script', cache: true }).then(done, error);
	  }

	  function error(jqXHR, textStatus, errorThrown) {
	    console.error('Could not load editor script: ' + textStatus);
	    throw errorThrown;
	  }

	  function prefix(url) {
	    return (url.indexOf('//') >= 0) ? url : cleanSlashes(("https://editor-api.webflow.com") + url);
	  }

	  function cleanSlashes(url) {
	    return url.replace(/([^:])\/\//g, '$1/');
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Webflow: Forms
	 */

	var Webflow = __webpack_require__(1);

	Webflow.define('forms', module.exports = function($, _) {
	  var api = {};

	  // Cross-Domain AJAX for IE8
	  __webpack_require__(19);

	  var $doc = $(document);
	  var $forms;
	  var loc = window.location;
	  var retro = window.XDomainRequest && !window.atob;
	  var namespace = '.w-form';
	  var siteId;
	  var emailField = /e(\-)?mail/i;
	  var emailValue = /^\S+@\S+$/;
	  var alert = window.alert;
	  var listening;

	  // MailChimp domains: list-manage.com + mirrors
	  var chimpRegex = /list-manage[1-9]?.com/i;

	  var disconnected = _.debounce(function() {
	    alert('Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.');
	  }, 100);

	  api.ready = function() {
	    // Init forms
	    init();

	    // Wire document events once
	    if (!listening) addListeners();
	  };

	  api.preview = api.design = function() {
	    init();
	  };

	  function init() {
	    siteId = $('html').attr('data-wf-site');

	    $forms = $(namespace + ' form');
	    if (!$forms.length) return;
	    $forms.each(build);
	  }

	  function build(i, el) {
	    // Store form state using namespace
	    var $el = $(el);
	    var data = $.data(el, namespace);
	    if (!data) data = $.data(el, namespace, { form: $el }); // data.form

	    reset(data);
	    var wrap = $el.closest('div.w-form');
	    data.done = wrap.find('> .w-form-done');
	    data.fail = wrap.find('> .w-form-fail');

	    var action = data.action = $el.attr('action');
	    data.handler = null;
	    data.redirect = $el.attr('data-redirect');

	    // MailChimp form
	    if (chimpRegex.test(action)) { data.handler = submitMailChimp; return; }

	    // Custom form action
	    if (action) return;

	    // Webflow form
	    if (siteId) { data.handler = submitWebflow; return; }

	    // Alert for disconnected Webflow forms
	    disconnected();
	  }

	  function addListeners() {
	    listening = true;

	    // Handle form submission for Webflow forms
	    $doc.on('submit', namespace + ' form', function(evt) {
	      var data = $.data(this, namespace);
	      if (data.handler) {
	        data.evt = evt;
	        data.handler(data);
	      }
	    });
	  }

	  // Reset data common to all submit handlers
	  function reset(data) {
	    var btn = data.btn = data.form.find(':input[type="submit"]');
	    data.wait = data.btn.attr('data-wait') || null;
	    data.success = false;
	    btn.prop('disabled', false);
	    data.label && btn.val(data.label);
	  }

	  // Disable submit button
	  function disableBtn(data) {
	    var btn = data.btn;
	    var wait = data.wait;
	    btn.prop('disabled', true);
	    // Show wait text and store previous label
	    if (wait) {
	      data.label = btn.val();
	      btn.val(wait);
	    }
	  }

	  // Find form fields, validate, and set value pairs
	  function findFields(form, result) {
	    var status = null;
	    result = result || {};

	    // The ":input" selector is a jQuery shortcut to select all inputs, selects, textareas
	    form.find(':input:not([type="submit"])').each(function(i, el) {
	      var field = $(el);
	      var type = field.attr('type');
	      var name = field.attr('data-name') || field.attr('name') || ('Field ' + (i + 1));
	      var value = field.val();

	      if (type === 'checkbox') {
	        value = field.is(':checked');
	      } if (type === 'radio') {
	        // Radio group value already processed
	        if (result[name] === null || typeof result[name] === 'string') {
	          return;
	        }

	        value = form.find('input[name="' + field.attr('name') + '"]:checked').val() || null;
	      }

	      if (typeof value === 'string') value = $.trim(value);
	      result[name] = value;
	      status = status || getStatus(field, name, value);
	    });

	    return status;
	  }

	  function getStatus(field, name, value) {
	    var status = null;
	    if (!field.attr('required')) return null;
	    if (!value) status = 'Please fill out the required field: ' + name;
	    else if (emailField.test(name) || emailField.test(field.attr('type'))) {
	      if (!emailValue.test(value)) status = 'Please enter a valid email address for: ' + name;
	    }
	    return status;
	  }

	  // Submit form to Webflow
	  function submitWebflow(data) {
	    reset(data);

	    var form = data.form;
	    var payload = {
	      name: form.attr('data-name') || form.attr('name') || 'Untitled Form',
	      source: loc.href,
	      test: Webflow.env(),
	      fields: {}
	    };

	    preventDefault(data);

	    // Find & populate all fields
	    var status = findFields(form, payload.fields);
	    if (status) return alert(status);

	    // Disable submit button
	    disableBtn(data);

	    // Read site ID
	    // NOTE: If this site is exported, the HTML tag must retain the data-wf-site attribute for forms to work
	    if (!siteId) { afterSubmit(data); return; }
	    var url = ("https://webflow.com") + '/api/v1/form/' + siteId;

	    // Work around same-protocol IE XDR limitation - without this IE9 and below forms won't submit
	    if (retro && url.indexOf(("https://webflow.com")) >= 0) {
	      url = url.replace(("https://webflow.com"), ("http://formdata.webflow.com"));
	    }

	    $.ajax({
	      url: url,
	      type: 'POST',
	      data: payload,
	      dataType: 'json',
	      crossDomain: true
	    }).done(function() {
	      data.success = true;
	      afterSubmit(data);
	    }).fail(function(response, textStatus, jqXHR) {
	      afterSubmit(data);
	    });
	  }

	  // Submit form to MailChimp
	  function submitMailChimp(data) {
	    reset(data);

	    var form = data.form;
	    var payload = {};

	    // Skip Ajax submission if http/s mismatch, fallback to POST instead
	    if (/^https/.test(loc.href) && !/^https/.test(data.action)) {
	      form.attr('method', 'post');
	      return;
	    }

	    preventDefault(data);

	    // Find & populate all fields
	    var status = findFields(form, payload);
	    if (status) return alert(status);

	    // Disable submit button
	    disableBtn(data);

	    // Use special format for MailChimp params
	    var fullName;
	    _.each(payload, function(value, key) {
	      if (emailField.test(key)) payload.EMAIL = value;
	      if (/^((full[ _-]?)?name)$/i.test(key)) fullName = value;
	      if (/^(first[ _-]?name)$/i.test(key)) payload.FNAME = value;
	      if (/^(last[ _-]?name)$/i.test(key)) payload.LNAME = value;
	    });

	    if (fullName && !payload.FNAME) {
	      fullName = fullName.split(' ');
	      payload.FNAME = fullName[0];
	      payload.LNAME = payload.LNAME || fullName[1];
	    }

	    // Use the (undocumented) MailChimp jsonp api
	    var url = data.action.replace('/post?', '/post-json?') + '&c=?';
	    // Add special param to prevent bot signups
	    var userId = url.indexOf('u=') + 2;
	    userId = url.substring(userId, url.indexOf('&', userId));
	    var listId = url.indexOf('id=') + 3;
	    listId = url.substring(listId, url.indexOf('&', listId));
	    payload['b_' + userId + '_' + listId] = '';

	    $.ajax({
	      url: url,
	      data: payload,
	      dataType: 'jsonp'
	    }).done(function(resp) {
	      data.success = (resp.result === 'success' || /already/.test(resp.msg));
	      if (!data.success) console.info('MailChimp error: ' + resp.msg);
	      afterSubmit(data);
	    }).fail(function(response, textStatus, jqXHR) {
	      afterSubmit(data);
	    });
	  }

	  // Common callback which runs after all Ajax submissions
	  function afterSubmit(data) {
	    var form = data.form;
	    var wrap = form.closest('div.w-form');
	    var redirect = data.redirect;
	    var success = data.success;

	    // Redirect to a success url if defined
	    if (success && redirect) {
	      Webflow.location(redirect);
	      return;
	    }

	    // Show or hide status divs
	    data.done.toggle(success);
	    data.fail.toggle(!success);

	    // Hide form on success
	    form.toggle(!success);

	    // Reset data and enable submit button
	    reset(data);
	  }

	  function preventDefault(data) {
	    data.evt && data.evt.preventDefault();
	    data.evt = null;
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Google+ widget
	 */

	var Webflow = __webpack_require__(1);

	Webflow.define('gplus', module.exports = function($, _) {
	  var $doc = $(document);
	  var api = {};
	  var loaded;

	  api.ready = function() {
	    // Load Google+ API on the front-end
	    if (!Webflow.env() && !loaded) init();
	  };

	  function init() {
	    $doc.find('.w-widget-gplus').length && load();
	  }

	  function load() {
	    loaded = true;
	    $.getScript('https://apis.google.com/js/plusone.js');
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*eslint no-self-compare:0 */

	/**
	 * Webflow: Interactions
	 */

	var Webflow = __webpack_require__(1);
	var IXEvents = __webpack_require__(2);

	Webflow.define('ix', module.exports = function($, _) {
	  var api = {};
	  var designer;
	  var $win = $(window);
	  var namespace = '.w-ix';
	  var tram = $.tram;
	  var env = Webflow.env;
	  var inApp = env();
	  var emptyFix = env.chrome && env.chrome < 35;
	  var transNone = 'none 0s ease 0s';
	  var $subs = $();
	  var config = {};
	  var anchors = [];
	  var loads = [];
	  var readys = [];
	  var destroyed;
	  var readyDelay = 1;

	  // Component types and proxy selectors
	  var components = {
	    tabs: '.w-tab-link, .w-tab-pane',
	    dropdown: '.w-dropdown',
	    slider: '.w-slide',
	    navbar: '.w-nav'
	  };

	  // -----------------------------------
	  // Module methods

	  api.init = function(list) {
	    setTimeout(function() { configure(list); }, 1);
	  };

	  api.preview = function() {
	    designer = false;
	    readyDelay = 100;
	    setTimeout(function() { configure(window.__wf_ix); }, 1);
	  };

	  api.design = function() {
	    designer = true;
	    api.destroy();
	  };

	  api.destroy = function() {
	    destroyed = true;
	    $subs.each(teardown);
	    Webflow.scroll.off(scroll);
	    IXEvents.async();
	    anchors = [];
	    loads = [];
	    readys = [];
	  };

	  api.ready = function() {
	    // Ready should only be used after destroy, as a way to re-init
	    if (config && destroyed) {
	      destroyed = false;
	      init();
	    }
	  };

	  api.run = run;
	  api.style = inApp ? styleApp : stylePub;

	  // -----------------------------------
	  // Private methods

	  function configure(list) {
	    if (!list) return;

	    // Map all interactions by slug
	    config = {};
	    _.each(list, function(item) {
	      config[item.slug] = item.value;
	    });

	    // Init ix after config
	    init();
	  }

	  function init() {
	    // Build each element's interaction keying from data attribute
	    var els = $('[data-ix]');
	    if (!els.length) return;
	    els.each(teardown);
	    els.each(build);

	    // Listen for scroll events if any anchors exist
	    if (anchors.length) {
	      Webflow.scroll.on(scroll);
	      setTimeout(scroll, 1);
	    }

	    // Handle loads or readys if they exist
	    if (loads.length) Webflow.load(runLoads);
	    if (readys.length) setTimeout(runReadys, readyDelay);

	    // Trigger queued events, must happen after init
	    IXEvents.init();

	    // Trigger a redraw to ensure all IX intros play
	    Webflow.redraw.up();
	  }

	  function build(i, el) {
	    var $el = $(el);
	    var id = $el.attr('data-ix');
	    var ix = config[id];
	    if (!ix) return;
	    var triggers = ix.triggers;
	    if (!triggers) return;

	    // Set styles immediately to provide tram with starting transform values
	    api.style($el, ix.style);

	    _.each(triggers, function(trigger) {
	      var state = {};
	      var type = trigger.type;
	      var stepsB = trigger.stepsB && trigger.stepsB.length;

	      function runA() { run(trigger, $el, { group: 'A' }); }
	      function runB() { run(trigger, $el, { group: 'B' }); }

	      if (type === 'load') {
	        (trigger.preload && !inApp) ? loads.push(runA) : readys.push(runA);
	        return;
	      }

	      if (type === 'click') {
	        $el.on('click' + namespace, function(evt) {
	          // Avoid late clicks on touch devices
	          if (!Webflow.validClick(evt.currentTarget)) return;

	          // Prevent default on empty hash urls
	          if ($el.attr('href') === '#') evt.preventDefault();

	          run(trigger, $el, { group: state.clicked ? 'B' : 'A' });
	          if (stepsB) state.clicked = !state.clicked;
	        });
	        $subs = $subs.add($el);
	        return;
	      }

	      if (type === 'hover') {
	        $el.on('mouseenter' + namespace, runA);
	        $el.on('mouseleave' + namespace, runB);
	        $subs = $subs.add($el);
	        return;
	      }

	      if (type === 'scroll') {
	        anchors.push({
	          el: $el, trigger: trigger, state: { active: false },
	          offsetTop: convert(trigger.offsetTop),
	          offsetBot: convert(trigger.offsetBot)
	        });
	        return;
	      }

	      // Check for a proxy component selector
	      // type == [tabs, dropdown, slider, navbar]
	      var proxy = components[type];
	      if (proxy) {
	        var $proxy = $el.closest(proxy);
	        $proxy.on(IXEvents.types.INTRO, runA).on(IXEvents.types.OUTRO, runB);
	        $subs = $subs.add($proxy);
	        return;
	      }
	    });
	  }

	  function convert(offset) {
	    if (!offset) return 0;
	    offset = String(offset);
	    var result = parseInt(offset, 10);
	    if (result !== result) return 0;
	    if (offset.indexOf('%') > 0) {
	      result /= 100;
	      if (result >= 1) result = 0.999;
	    }
	    return result;
	  }

	  function teardown(i, el) {
	    $(el).off(namespace);
	  }

	  function scroll() {
	    var viewTop = $win.scrollTop();
	    var viewHeight = $win.height();

	    // Check each anchor for a valid scroll trigger
	    var count = anchors.length;
	    for (var i = 0; i < count; i++) {
	      var anchor = anchors[i];
	      var $el = anchor.el;
	      var trigger = anchor.trigger;
	      var stepsB = trigger.stepsB && trigger.stepsB.length;
	      var state = anchor.state;
	      var top = $el.offset().top;
	      var height = $el.outerHeight();
	      var offsetTop = anchor.offsetTop;
	      var offsetBot = anchor.offsetBot;
	      if (offsetTop < 1 && offsetTop > 0) offsetTop *= viewHeight;
	      if (offsetBot < 1 && offsetBot > 0) offsetBot *= viewHeight;
	      var active = (top + height - offsetTop >= viewTop && top + offsetBot <= viewTop + viewHeight);
	      if (active === state.active) continue;
	      if (active === false && !stepsB) continue;
	      state.active = active;
	      run(trigger, $el, { group: active ? 'A' : 'B' });
	    }
	  }

	  function runLoads() {
	    var count = loads.length;
	    for (var i = 0; i < count; i++) {
	      loads[i]();
	    }
	  }

	  function runReadys() {
	    var count = readys.length;
	    for (var i = 0; i < count; i++) {
	      readys[i]();
	    }
	  }

	  function run(trigger, $el, opts, replay) {
	    opts = opts || {};
	    var done = opts.done;

	    // Do not run in designer unless forced
	    if (designer && !opts.force) return;

	    // Operate on a set of grouped steps
	    var group = opts.group || 'A';
	    var loop = trigger['loop' + group];
	    var steps = trigger['steps' + group];
	    if (!steps || !steps.length) return;
	    if (steps.length < 2) loop = false;

	    // One-time init before any loops
	    if (!replay) {

	      // Find selector within element descendants, siblings, or query whole document
	      var selector = trigger.selector;
	      if (selector) {
	        if (trigger.descend) {
	          $el = $el.find(selector);
	        } else if (trigger.siblings) {
	          $el = $el.siblings(selector);
	        } else {
	          $el = $(selector);
	        }
	        if (inApp) $el.attr('data-ix-affect', 1);
	      }

	      // Apply empty fix for certain Chrome versions
	      if (emptyFix) $el.addClass('w-ix-emptyfix');

	      // Set preserve3d for triggers with transforms
	      if (trigger.preserve3d) $el.css('transform-style', 'preserve-3d');
	    }

	    var _tram = tram($el);

	    // Add steps
	    var meta = {};
	    for (var i = 0; i < steps.length; i++) {
	      addStep(_tram, steps[i], meta);
	    }

	    function fin() {
	      // Run trigger again if looped
	      if (loop) return run(trigger, $el, opts, true);

	      // Reset any 'auto' values
	      if (meta.width === 'auto') _tram.set({ width: 'auto' });
	      if (meta.height === 'auto') _tram.set({ height: 'auto' });

	      // Run callback
	      done && done();
	    }

	    // Add final step to queue if tram has started
	    meta.start ? _tram.then(fin) : fin();
	  }

	  function addStep(_tram, step, meta) {
	    var addMethod = 'add';
	    var startMethod = 'start';

	    // Once the transition has started, we will always use then() to add to the queue.
	    if (meta.start) addMethod = startMethod = 'then';

	    // Parse transitions string on the current step
	    var transitions = step.transition;
	    if (transitions) {
	      transitions = transitions.split(',');
	      for (var i = 0; i < transitions.length; i++) {
	        var transition = transitions[i];
	        _tram[addMethod](transition);
	      }
	    }

	    // Build a clean object to pass to the tram method
	    var clean = tramify(step) || {};

	    // Store last width and height values
	    if (clean.width != null) meta.width = clean.width;
	    if (clean.height != null) meta.height = clean.height;

	    // When transitions are not present, set values immediately and continue queue.
	    if (transitions == null) {

	      // If we have started, wrap set() in then() and reset queue
	      if (meta.start) {
	        _tram.then(function() {
	          var queue = this.queue;
	          this.set(clean);
	          if (clean.display) {
	            _tram.redraw();
	            Webflow.redraw.up();
	          }
	          this.queue = queue;
	          this.next();
	        });
	      } else {
	        _tram.set(clean);

	        // Always redraw after setting display
	        if (clean.display) {
	          _tram.redraw();
	          Webflow.redraw.up();
	        }
	      }

	      // Use the wait() method to kick off queue in absence of transitions.
	      var wait = clean.wait;
	      if (wait != null) {
	        _tram.wait(wait);
	        meta.start = true;
	      }

	    // Otherwise, when transitions are present
	    } else {

	      // If display is present, handle it separately
	      if (clean.display) {
	        var display = clean.display;
	        delete clean.display;

	        // If we've already started, we need to wrap it in a then()
	        if (meta.start) {
	          _tram.then(function() {
	            var queue = this.queue;
	            this.set({ display: display }).redraw();
	            Webflow.redraw.up();
	            this.queue = queue;
	            this.next();
	          });
	        } else {
	          _tram.set({ display: display }).redraw();
	          Webflow.redraw.up();
	        }
	      }

	      // Otherwise, start a transition using the current start method.
	      _tram[startMethod](clean);
	      meta.start = true;
	    }
	  }

	  // (In app) Set styles immediately and manage upstream transition
	  function styleApp(el, data) {
	    var _tram = tram(el);

	    // Get computed transition value
	    el.css('transition', '');
	    var computed = el.css('transition');

	    // If computed is set to none, clear upstream
	    if (computed === transNone) computed = _tram.upstream = null;

	    // Set upstream transition to none temporarily
	    _tram.upstream = transNone;

	    // Set values immediately
	    _tram.set(tramify(data));

	    // Only restore upstream in preview mode
	    _tram.upstream = computed;
	  }

	  // (Published) Set styles immediately on specified jquery element
	  function stylePub(el, data) {
	    tram(el).set(tramify(data));
	  }

	  // Build a clean object for tram
	  function tramify(obj) {
	    var result = {};
	    var found = false;
	    for (var x in obj) {
	      if (x === 'transition') continue;
	      result[x] = obj[x];
	      found = true;
	    }
	    // If empty, return null for tram.set/stop compliance
	    return found ? result : null;
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*eslint
	  no-use-before-define: 0,
	  no-shadow: 0
	*/

	/**
	 * Webflow: Lightbox component
	 */

	var Webflow = __webpack_require__(1);

	function createLightbox(window, document, $) {
	  var tram = $.tram;
	  var isArray = Array.isArray;
	  var namespace = 'w-lightbox';
	  var prefix = namespace + '-';
	  var prefixRegex = /(^|\s+)/g;

	  // Array of objects describing items to be displayed.
	  var items = [];

	  // Index of the currently displayed item.
	  var currentIndex;

	  // Object holding references to jQuery wrapped nodes.
	  var $refs;

	  // Instance of Spinner
	  var spinner;

	  function lightbox(thing, index) {
	    items = isArray(thing) ? thing : [thing];

	    if (!$refs) {
	      lightbox.build();
	    }

	    if (items.length > 1) {
	      $refs.items = $refs.empty;

	      items.forEach(function (item) {
	        var $thumbnail = dom('thumbnail');
	        var $item = dom('item').append($thumbnail);

	        $refs.items = $refs.items.add($item);

	        loadImage(item.thumbnailUrl || item.url, function ($image) {
	          if ($image.prop('width') > $image.prop('height')) {
	            addClass($image, 'wide');
	          } else {
	            addClass($image, 'tall');
	          }
	          $thumbnail.append(addClass($image, 'thumbnail-image'));
	        });
	      });

	      $refs.strip.empty().append($refs.items);
	      addClass($refs.content, 'group');
	    }

	    tram(
	      // Focus the lightbox to receive keyboard events.
	      removeClass($refs.lightbox, 'hide').focus()
	    )
	      .add('opacity .3s')
	      .start({opacity: 1});

	    // Prevent document from scrolling while lightbox is active.
	    addClass($refs.html, 'noscroll');

	    return lightbox.show(index || 0);
	  }

	  /**
	   * Creates the DOM structure required by the lightbox.
	   */
	  lightbox.build = function () {
	    // In case `build` is called more than once.
	    lightbox.destroy();

	    $refs = {
	      html: $(document.documentElement),
	      // Empty jQuery object can be used to build new ones using `.add`.
	      empty: $()
	    };

	    $refs.arrowLeft = dom('control left inactive');
	    $refs.arrowRight = dom('control right inactive');
	    $refs.close = dom('control close');

	    $refs.spinner = dom('spinner');
	    $refs.strip = dom('strip');

	    spinner = new Spinner($refs.spinner, prefixed('hide'));

	    $refs.content = dom('content')
	      .append($refs.spinner, $refs.arrowLeft, $refs.arrowRight, $refs.close);

	    $refs.container = dom('container')
	      .append($refs.content, $refs.strip);

	    $refs.lightbox = dom('backdrop hide')
	      .append($refs.container);

	    // We are delegating events for performance reasons and also
	    // to not have to reattach handlers when images change.
	    $refs.strip.on('tap', selector('item'), itemTapHandler);
	    $refs.content
	      .on('swipe', swipeHandler)
	      .on('tap', selector('left'), handlerPrev)
	      .on('tap', selector('right'), handlerNext)
	      .on('tap', selector('close'), handlerHide)
	      .on('tap', selector('image, caption'), handlerNext);
	    $refs.container
	      .on('tap', selector('view, strip'), handlerHide)
	      // Prevent images from being dragged around.
	      .on('dragstart', selector('img'), preventDefault);
	    $refs.lightbox
	      .on('keydown', keyHandler)
	      // IE loses focus to inner nodes without letting us know.
	      .on('focusin', focusThis);

	    // The `tabindex` attribute is needed to enable non-input elements
	    // to receive keyboard events.
	    $('body').append($refs.lightbox.prop('tabIndex', 0));

	    return lightbox;
	  };

	  /**
	   * Dispose of DOM nodes created by the lightbox.
	   */
	  lightbox.destroy = function () {
	    if (!$refs) {
	      return;
	    }

	    // Event handlers are also removed.
	    removeClass($refs.html, 'noscroll');
	    $refs.lightbox.remove();
	    $refs = undefined;
	  };

	  /**
	   * Show a specific item.
	   */
	  lightbox.show = function (index) {
	    // Bail if we are already showing this item.
	    if (index === currentIndex) {
	      return;
	    }

	    var item = items[index];
	    if (!item) { return lightbox.hide(); }

	    var previousIndex = currentIndex;
	    currentIndex = index;
	    spinner.show();

	    // For videos, load an empty SVG with the video dimensions to preserve
	    // the videoâ€™s aspect ratio while being responsive.
	    var url = item.html && svgDataUri(item.width, item.height) || item.url;
	    loadImage(url, function ($image) {
	      // Make sure this is the last item requested to be shown since
	      // images can finish loading in a different order than they were
	      // requested in.
	      if (index !== currentIndex) {
	        return;
	      }

	      var $figure = dom('figure', 'figure').append(addClass($image, 'image'));
	      var $frame = dom('frame').append($figure);
	      var $newView = dom('view').append($frame);
	      var $html, isIframe;

	      if (item.html) {
	        $html = $(item.html);
	        isIframe = $html.is('iframe');

	        if (isIframe) {
	          $html.on('load', transitionToNewView);
	        }

	        $figure.append(addClass($html, 'embed'));
	      }

	      if (item.caption) {
	        $figure.append(dom('caption', 'figcaption').text(item.caption));
	      }

	      $refs.spinner.before($newView);

	      if (!isIframe) {
	        transitionToNewView();
	      }

	      function transitionToNewView() {
	        spinner.hide();

	        if (index !== currentIndex) {
	          $newView.remove();
	          return;
	        }


	        toggleClass($refs.arrowLeft, 'inactive', index <= 0);
	        toggleClass($refs.arrowRight, 'inactive', index >= items.length - 1);

	        if ($refs.view) {
	          tram($refs.view)
	            .add('opacity .3s')
	            .start({opacity: 0})
	            .then(remover($refs.view));

	          tram($newView)
	            .add('opacity .3s')
	            .add('transform .3s')
	            .set({x: index > previousIndex ? '80px' : '-80px'})
	            .start({opacity: 1, x: 0});
	        } else {
	          $newView.css('opacity', 1);
	        }

	        $refs.view = $newView;

	        if ($refs.items) {
	          // Mark proper thumbnail as active
	          addClass(removeClass($refs.items, 'active').eq(index), 'active');
	        }
	      }
	    });

	    return lightbox;
	  };

	  /**
	   * Hides the lightbox.
	   */
	  lightbox.hide = function () {
	    tram($refs.lightbox)
	      .add('opacity .3s')
	      .start({opacity: 0})
	      .then(hideLightbox);

	    return lightbox;
	  };

	  lightbox.prev = function () {
	    if (currentIndex > 0) {
	      lightbox.show(currentIndex - 1);
	    }
	  };

	  lightbox.next = function () {
	    if (currentIndex < items.length - 1) {
	      lightbox.show(currentIndex + 1);
	    }
	  };

	  function createHandler(action) {
	    return function (event) {
	      // We only care about events triggered directly on the bound selectors.
	      if (this !== event.target) {
	        return;
	      }

	      event.stopPropagation();
	      event.preventDefault();

	      action();
	    };
	  }

	  var handlerPrev = createHandler(lightbox.prev);
	  var handlerNext = createHandler(lightbox.next);
	  var handlerHide = createHandler(lightbox.hide);

	  var itemTapHandler = function(event) {
	    var index = $(this).index();

	    event.preventDefault();
	    lightbox.show(index);
	  };

	  var swipeHandler = function (event, data) {
	    // Prevent scrolling.
	    event.preventDefault();

	    if (data.direction === 'left') {
	      lightbox.next();
	    } else if (data.direction === 'right') {
	      lightbox.prev();
	    }
	  };

	  var focusThis = function () {
	    this.focus();
	  };

	  function preventDefault(event) {
	    event.preventDefault();
	  }

	  function keyHandler(event) {
	    var keyCode = event.keyCode;

	    // [esc]
	    if (keyCode === 27) {
	      lightbox.hide();
	    }

	    // [â—€]
	    else if (keyCode === 37) {
	      lightbox.prev();
	    }

	    // [â–¶]
	    else if (keyCode === 39) {
	      lightbox.next();
	    }
	  }

	  function hideLightbox() {
	    // If the lightbox hasn't been destroyed already
	    if ($refs) {
	      removeClass($refs.html, 'noscroll');
	      addClass($refs.lightbox, 'hide');
	      $refs.strip.empty();
	      $refs.view && $refs.view.remove();

	      // Reset some stuff
	      removeClass($refs.content, 'group');
	      addClass($refs.arrowLeft, 'inactive');
	      addClass($refs.arrowRight, 'inactive');

	      currentIndex = $refs.view = undefined;
	    }
	  }

	  function loadImage(url, callback) {
	    var $image = dom('img', 'img');

	    $image.one('load', function () {
	      callback($image);
	    });

	    // Start loading image.
	    $image.attr('src', url);

	    return $image;
	  }

	  function remover($element) {
	    return function () {
	      $element.remove();
	    };
	  }

	  /**
	   * Spinner
	   */
	  function Spinner($spinner, className, delay) {
	    this.$element = $spinner;
	    this.className = className;
	    this.delay = delay || 200;
	    this.hide();
	  }

	  Spinner.prototype.show = function () {
	    var spinner = this;

	    // Bail if we are already showing the spinner.
	    if (spinner.timeoutId) {
	      return;
	    }

	    spinner.timeoutId = setTimeout(function () {
	      spinner.$element.removeClass(spinner.className);
	      delete spinner.timeoutId;
	    }, spinner.delay);
	  };

	  Spinner.prototype.hide = function () {
	    var spinner = this;
	    if (spinner.timeoutId) {
	      clearTimeout(spinner.timeoutId);
	      delete spinner.timeoutId;
	      return;
	    }

	    spinner.$element.addClass(spinner.className);
	  };

	  function prefixed(string, isSelector) {
	    return string.replace(prefixRegex, (isSelector ? ' .' : ' ') + prefix);
	  }

	  function selector(string) {
	    return prefixed(string, true);
	  }

	  /**
	   * jQuery.addClass with auto-prefixing
	   * @param  {jQuery} Element to add class to
	   * @param  {string} Class name that will be prefixed and added to element
	   * @return {jQuery}
	   */
	  function addClass($element, className) {
	    return $element.addClass(prefixed(className));
	  }

	  /**
	   * jQuery.removeClass with auto-prefixing
	   * @param  {jQuery} Element to remove class from
	   * @param  {string} Class name that will be prefixed and removed from element
	   * @return {jQuery}
	   */
	  function removeClass($element, className) {
	    return $element.removeClass(prefixed(className));
	  }

	  /**
	   * jQuery.toggleClass with auto-prefixing
	   * @param  {jQuery}  Element where class will be toggled
	   * @param  {string}  Class name that will be prefixed and toggled
	   * @param  {boolean} Optional boolean that determines if class will be added or removed
	   * @return {jQuery}
	   */
	  function toggleClass($element, className, shouldAdd) {
	    return $element.toggleClass(prefixed(className), shouldAdd);
	  }

	  /**
	   * Create a new DOM element wrapped in a jQuery object,
	   * decorated with our custom methods.
	   * @param  {string} className
	   * @param  {string} [tag]
	   * @return {jQuery}
	   */
	  function dom(className, tag) {
	    return addClass($(document.createElement(tag || 'div')), className);
	  }

	  function isObject(value) {
	    return typeof value === 'object' && value != null && !isArray(value);
	  }

	  function svgDataUri(width, height) {
	    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '"/>';
	    return 'data:image/svg+xml;charset=utf-8,' + encodeURI(svg);
	  }

	  // Compute some dimensions manually for iOS < 8, because of buggy support for VH.
	  // Also, Android built-in browser does not support viewport units.
	  (function () {
	    var ua = window.navigator.userAgent;
	    var iOSRegex = /(iPhone|iPad|iPod);[^OS]*OS (\d)/;
	    var iOSMatches = ua.match(iOSRegex);
	    var android = ua.indexOf('Android ') > -1 && ua.indexOf('Chrome') === -1;

	    if (!android && (!iOSMatches || iOSMatches[2] > 7)) {
	      return;
	    }

	    var styleNode = document.createElement('style');
	    document.head.appendChild(styleNode);
	    window.addEventListener('orientationchange', refresh, true);

	    function refresh() {
	      var vh = window.innerHeight;
	      var vw = window.innerWidth;
	      var content =
	        '.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {' +
	          'height:' + vh + 'px' +
	        '}' +
	        '.w-lightbox-view {' +
	          'width:' + vw + 'px' +
	        '}' +
	        '.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {' +
	          'height:' + (0.86 * vh) + 'px' +
	        '}' +
	        '.w-lightbox-image {' +
	          'max-width:' + vw + 'px;' +
	          'max-height:' + vh + 'px' +
	        '}' +
	        '.w-lightbox-group .w-lightbox-image {' +
	          'max-height:' + (0.86 * vh) + 'px' +
	        '}' +
	        '.w-lightbox-strip {' +
	          'padding: 0 ' + (0.01 * vh) + 'px' +
	        '}' +
	        '.w-lightbox-item {' +
	          'width:' + (0.1 * vh) + 'px;' +
	          'padding:' + (0.02 * vh) + 'px ' + (0.01 * vh) + 'px' +
	        '}' +
	        '.w-lightbox-thumbnail {' +
	          'height:' + (0.1 * vh) + 'px' +
	        '}' +
	        '@media (min-width: 768px) {' +
	          '.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {' +
	            'height:' + (0.96 * vh) + 'px' +
	          '}' +
	          '.w-lightbox-content {' +
	            'margin-top:' + (0.02 * vh) + 'px' +
	          '}' +
	          '.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {' +
	            'height:' + (0.84 * vh) + 'px' +
	          '}' +
	          '.w-lightbox-image {' +
	            'max-width:' + (0.96 * vw) + 'px;' +
	            'max-height:' + (0.96 * vh) + 'px' +
	          '}' +
	          '.w-lightbox-group .w-lightbox-image {' +
	            'max-width:' + (0.823 * vw) + 'px;' +
	            'max-height:' + (0.84 * vh) + 'px' +
	          '}' +
	        '}';

	      styleNode.textContent = content;
	    }

	    refresh();
	  })();

	  return lightbox;
	}

	Webflow.define('lightbox', module.exports = function($, _) {
	  var api = {};
	  var lightbox = createLightbox(window, document, $);
	  var $doc = $(document);
	  var $body;
	  var $lightboxes;
	  var designer;
	  var inApp = Webflow.env();
	  var namespace = '.w-lightbox';
	  var groups;

	  // -----------------------------------
	  // Module methods

	  api.ready = api.design = api.preview = init;

	  // -----------------------------------
	  // Private methods

	  function init() {
	    designer = inApp && Webflow.env('design');
	    $body = $(document.body);

	    // Reset Lightbox
	    lightbox.destroy();

	    // Reset groups
	    groups = {};

	    // Find all instances on the page
	    $lightboxes = $doc.find(namespace);

	    // Instantiate all lighboxes
	    $lightboxes.webflowLightBox();
	  }

	  jQuery.fn.extend({
	    webflowLightBox: function() {
	      var $el = this;
	      $.each($el, function(i, el) {
	        // Store state in data
	        var data = $.data(el, namespace);
	        if (!data) {
	          data = $.data(el, namespace, {
	            el: $(el),
	            mode: 'images',
	            images: [],
	            embed: ''
	          });
	        }

	        // Remove old events
	        data.el.off(namespace);

	        // Set config from json script tag
	        configure(data);

	        // Add events based on mode
	        if (designer) {
	          data.el.on('setting' + namespace, configure.bind(null, data));
	        } else {
	          data.el
	            .on('tap' + namespace, tapHandler(data))
	            // Prevent page scrolling to top when clicking on lightbox triggers.
	            .on('click' + namespace, function (e) { e.preventDefault(); });
	        }
	      });
	    }
	  });

	  function configure(data) {
	    var json = data.el.children('.w-json').html();
	    var groupName, groupItems;

	    if (!json) {
	      data.items = [];
	      return;
	    }

	    try {
	      json = JSON.parse(json);
	    } catch(e) {
	      console.error('Malformed lightbox JSON configuration.', e);
	    }

	    supportOldLightboxJson(json);

	    groupName = json.group;

	    if (groupName) {
	      groupItems = groups[groupName];
	      if (!groupItems) {
	        groupItems = groups[groupName] = [];
	      }

	      data.items = groupItems;

	      if (json.items.length) {
	        data.index = groupItems.length;
	        groupItems.push.apply(groupItems, json.items);
	      }
	    } else {
	      data.items = json.items;
	    }
	  }

	  function tapHandler(data) {
	    return function () {
	      data.items.length && lightbox(data.items, data.index || 0);
	    };
	  }

	  function supportOldLightboxJson(data) {
	    if (data.images) {
	      data.images.forEach(function (item) {
	        item.type = 'image';
	      });
	      data.items = data.images;
	    }

	    if (data.embed) {
	      data.embed.type = 'video';
	      data.items = [data.embed];
	    }

	    if (data.groupId) {
	      data.group = data.groupId;
	    }
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Auto-select links to current page or section
	 */

	var Webflow = __webpack_require__(1);

	Webflow.define('links', module.exports = function($, _) {
	  var api = {};
	  var $win = $(window);
	  var designer;
	  var inApp = Webflow.env();
	  var location = window.location;
	  var tempLink = document.createElement('a');
	  var linkCurrent = 'w--current';
	  var validHash = /^#[a-zA-Z][\w:.-]*$/;
	  var indexPage = /index\.(html|php)$/;
	  var dirList = /\/$/;
	  var anchors;
	  var slug;

	  // -----------------------------------
	  // Module methods

	  api.ready = api.design = api.preview = init;

	  // -----------------------------------
	  // Private methods

	  function init() {
	    designer = inApp && Webflow.env('design');
	    slug = Webflow.env('slug') || location.pathname || '';

	    // Reset scroll listener, init anchors
	    Webflow.scroll.off(scroll);
	    anchors = [];

	    // Test all links for a selectable href
	    var links = document.links;
	    for (var i = 0; i < links.length; ++i) {
	      select(links[i]);
	    }

	    // Listen for scroll if any anchors exist
	    if (anchors.length) {
	      Webflow.scroll.on(scroll);
	      scroll();
	    }
	  }

	  function select(link) {
	    var href = (designer && link.getAttribute('href-disabled')) || link.getAttribute('href');
	    tempLink.href = href;

	    // Ignore any hrefs with a colon to safely avoid all uri schemes
	    if (href.indexOf(':') >= 0) return;

	    var $link = $(link);

	    // Check for valid hash links w/ sections and use scroll anchor
	    if (href.indexOf('#') === 0 && validHash.test(href)) {
	      var $section = $(href);
	      $section.length && anchors.push({ link: $link, sec: $section, active: false });
	      return;
	    }

	    // Ignore empty # links
	    if (href === '#') return;

	    // Determine whether the link should be selected
	    var match = (tempLink.href === location.href) || (href === slug) || (indexPage.test(href) && dirList.test(slug));
	    setClass($link, linkCurrent, match);
	  }

	  function scroll() {
	    var viewTop = $win.scrollTop();
	    var viewHeight = $win.height();

	    // Check each anchor for a section in view
	    _.each(anchors, function(anchor) {
	      var $link = anchor.link;
	      var $section = anchor.sec;
	      var top = $section.offset().top;
	      var height = $section.outerHeight();
	      var offset = viewHeight * 0.5;
	      var active = ($section.is(':visible') &&
	        top + height - offset >= viewTop &&
	        top + offset <= viewTop + viewHeight);
	      if (anchor.active === active) return;
	      anchor.active = active;
	      setClass($link, linkCurrent, active);
	      if (designer) $link[0].__wf_current = active;
	    });
	  }

	  function setClass($elem, className, add) {
	    var exists = $elem.hasClass(className);
	    if (add && exists) return;
	    if (!add && !exists) return;
	    add ? $elem.addClass(className) : $elem.removeClass(className);
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Maps widget
	 */

	var Webflow = __webpack_require__(1);

	Webflow.define('maps', module.exports = function($, _) {
	  var api = {};
	  var $doc = $(document);
	  var google = null;
	  var $maps;
	  var namespace = '.w-widget-map';

	  // -----------------------------------
	  // Module methods

	  api.ready = function() {
	    // Init Maps on the front-end
	    if (!Webflow.env()) initMaps();
	  };

	  api.preview = function() {
	    // Update active map nodes
	    $maps = $doc.find(namespace);
	    // Listen for resize events
	    Webflow.resize.off(triggerRedraw);
	    if ($maps.length) {
	      Webflow.resize.on(triggerRedraw);
	      triggerRedraw();
	    }
	  };

	  api.design = function(evt) {
	    // Update active map nodes
	    $maps = $doc.find(namespace);
	    // Stop listening for resize events
	    Webflow.resize.off(triggerRedraw);
	    // Redraw to account for page changes
	    $maps.length && _.defer(triggerRedraw);
	  };

	  api.destroy = removeListeners;

	  // -----------------------------------
	  // Private methods

	  // Trigger redraw in designer or preview mode
	  function triggerRedraw() {
	    if ($maps.length && Webflow.app) {
	      $maps.each(Webflow.app.redrawElement);
	    }
	  }

	  function initMaps() {
	    $maps = $doc.find(namespace);
	    if (!$maps.length) return;

	    if (google === null) {
	      $.getScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=_wf_maps_loaded');
	      window._wf_maps_loaded = mapsLoaded;
	    } else {
	      mapsLoaded();
	    }

	    function mapsLoaded() {
	      window._wf_maps_loaded = function() {};
	      google = window.google;
	      $maps.each(renderMap);
	      removeListeners();
	      addListeners();
	    }
	  }

	  function removeListeners() {
	    Webflow.resize.off(resizeMaps);
	    Webflow.redraw.off(resizeMaps);
	  }

	  function addListeners() {
	    Webflow.resize.on(resizeMaps);
	    Webflow.redraw.on(resizeMaps);
	  }

	  // Render map onto each element
	  function renderMap(i, el) {
	    var data = $(el).data();
	    getState(el, data);
	  }

	  function resizeMaps() {
	    $maps.each(resizeMap);
	  }

	  // Resize map when window changes
	  function resizeMap(i, el) {
	    var state = getState(el);
	    google.maps.event.trigger(state.map, 'resize');
	    state.setMapPosition();
	  }

	  // Store state on element data
	  var store = 'w-widget-map';
	  function getState(el, data) {

	    var state = $.data(el, store);
	    if (state) return state;

	    var $el = $(el);
	    state = $.data(el, store, {
	      // Default options
	      latLng: '51.511214,-0.119824',
	      tooltip: '',
	      style: 'roadmap',
	      zoom: 12,

	      // Marker
	      marker: new google.maps.Marker({
	        draggable: false
	      }),

	      // Tooltip infowindow
	      infowindow: new google.maps.InfoWindow({
	        disableAutoPan: true
	      })
	    });

	    // LatLng center point
	    var latLng = data.widgetLatlng || state.latLng;
	    state.latLng = latLng;
	    var coords = latLng.split(',');
	    var latLngObj = new google.maps.LatLng(coords[0], coords[1]);
	    state.latLngObj = latLngObj;

	    // Disable touch events
	    var mapDraggable = (Webflow.env.touch && data.disableTouch) ? false : true;

	    // Map instance
	    state.map = new google.maps.Map(el, {
	      center: state.latLngObj,
	      zoom: state.zoom,
	      maxZoom: 18,
	      mapTypeControl: false,
	      panControl: false,
	      streetViewControl: false,
	      scrollwheel: !data.disableScroll,
	      draggable: mapDraggable,
	      zoomControl: true,
	      zoomControlOptions: {
	        style: google.maps.ZoomControlStyle.SMALL
	      },
	      mapTypeId: state.style
	    });
	    state.marker.setMap(state.map);

	    // Set map position and offset
	    state.setMapPosition = function() {
	      state.map.setCenter(state.latLngObj);
	      var offsetX = 0;
	      var offsetY = 0;
	      var padding = $el.css(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']);
	      offsetX -= parseInt(padding.paddingLeft, 10);
	      offsetX += parseInt(padding.paddingRight, 10);
	      offsetY -= parseInt(padding.paddingTop, 10);
	      offsetY += parseInt(padding.paddingBottom, 10);
	      if (offsetX || offsetY) {
	        state.map.panBy(offsetX, offsetY);
	      }
	      $el.css('position', ''); // Remove injected position
	    };

	    // Fix position after first tiles have loaded
	    google.maps.event.addListener(state.map, 'tilesloaded', function() {
	      google.maps.event.clearListeners(state.map, 'tilesloaded');
	      state.setMapPosition();
	    });

	    // Set initial position
	    state.setMapPosition();
	    state.marker.setPosition(state.latLngObj);
	    state.infowindow.setPosition(state.latLngObj);

	    // Draw tooltip
	    var tooltip = data.widgetTooltip;
	    if (tooltip) {
	      state.tooltip = tooltip;
	      state.infowindow.setContent(tooltip);
	      if (!state.infowindowOpen) {
	        state.infowindow.open(state.map, state.marker);
	        state.infowindowOpen = true;
	      }
	    }

	    // Map style - options.style
	    var style = data.widgetStyle;
	    if (style) {
	      state.map.setMapTypeId(style);
	    }

	    // Zoom - options.zoom
	    var zoom = data.widgetZoom;
	    if (zoom != null) {
	      state.zoom = zoom;
	      state.map.setZoom(+zoom);
	    }

	    // Click marker to open in google maps
	    google.maps.event.addListener(state.marker, 'click', function() {
	      window.open('https://maps.google.com/?z=' + state.zoom + '&daddr=' + state.latLng);
	    });

	    return state;
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Navbar component
	 */

	var Webflow = __webpack_require__(1);
	var IXEvents = __webpack_require__(2);

	Webflow.define('navbar', module.exports = function($, _) {
	  var api = {};
	  var tram = $.tram;
	  var $win = $(window);
	  var $doc = $(document);
	  var $body;
	  var $navbars;
	  var designer;
	  var inApp = Webflow.env();
	  var overlay = '<div class="w-nav-overlay" data-wf-ignore />';
	  var namespace = '.w-nav';
	  var buttonOpen = 'w--open';
	  var menuOpen = 'w--nav-menu-open';
	  var linkOpen = 'w--nav-link-open';
	  var ix = IXEvents.triggers;

	  // -----------------------------------
	  // Module methods

	  api.ready = api.design = api.preview = init;
	  api.destroy = removeListeners;

	  // -----------------------------------
	  // Private methods

	  function init() {
	    designer = inApp && Webflow.env('design');
	    $body = $(document.body);

	    // Find all instances on the page
	    $navbars = $doc.find(namespace);
	    if (!$navbars.length) return;
	    $navbars.each(build);

	    // Wire events
	    removeListeners();
	    addListeners();
	  }

	  function removeListeners() {
	    Webflow.resize.off(resizeAll);
	  }

	  function addListeners() {
	    Webflow.resize.on(resizeAll);
	  }

	  function resizeAll() {
	    $navbars.each(resize);
	  }

	  function build(i, el) {
	    var $el = $(el);

	    // Store state in data
	    var data = $.data(el, namespace);
	    if (!data) data = $.data(el, namespace, { open: false, el: $el, config: {} });
	    data.menu = $el.find('.w-nav-menu');
	    data.links = data.menu.find('.w-nav-link');
	    data.dropdowns = data.menu.find('.w-dropdown');
	    data.button = $el.find('.w-nav-button');
	    data.container = $el.find('.w-container');
	    data.outside = outside(data);

	    // Remove old events
	    data.el.off(namespace);
	    data.button.off(namespace);
	    data.menu.off(namespace);

	    // Set config from data attributes
	    configure(data);

	    // Add events based on mode
	    if (designer) {
	      removeOverlay(data);
	      data.el.on('setting' + namespace, handler(data));
	    } else {
	      addOverlay(data);
	      data.button.on('tap' + namespace, toggle(data));
	      data.menu.on('click' + namespace, 'a', navigate(data));
	    }

	    // Trigger initial resize
	    resize(i, el);
	  }

	  function removeOverlay(data) {
	    if (!data.overlay) return;
	    close(data, true);
	    data.overlay.remove();
	    data.overlay = null;
	  }

	  function addOverlay(data) {
	    if (data.overlay) return;
	    data.overlay = $(overlay).appendTo(data.el);
	    data.parent = data.menu.parent();
	    close(data, true);
	  }

	  function configure(data) {
	    var config = {};
	    var old = data.config || {};

	    // Set config options from data attributes
	    var animation = config.animation = data.el.attr('data-animation') || 'default';
	    config.animOver = /^over/.test(animation);
	    config.animDirect = /left$/.test(animation) ? -1 : 1;

	    // Re-open menu if the animation type changed
	    if (old.animation !== animation) {
	      data.open && _.defer(reopen, data);
	    }

	    config.easing = data.el.attr('data-easing') || 'ease';
	    config.easing2 = data.el.attr('data-easing2') || 'ease';

	    var duration = data.el.attr('data-duration');
	    config.duration = duration != null ? +duration : 400;

	    config.docHeight = data.el.attr('data-doc-height');

	    // Store config in data
	    data.config = config;
	  }

	  function handler(data) {
	    return function(evt, options) {
	      options = options || {};
	      var winWidth = $win.width();
	      configure(data);
	      options.open === true && open(data, true);
	      options.open === false && close(data, true);
	      // Reopen if media query changed after setting
	      data.open && _.defer(function() {
	        if (winWidth !== $win.width()) reopen(data);
	      });
	    };
	  }

	  function reopen(data) {
	    if (!data.open) return;
	    close(data, true);
	    open(data, true);
	  }

	  function toggle(data) {
	    // Debounce toggle to wait for accurate open state
	    return _.debounce(function(evt) {
	      data.open ? close(data) : open(data);
	    });
	  }

	  function navigate(data) {
	    return function(evt) {
	      var link = $(this);
	      var href = link.attr('href');

	      // Avoid late clicks on touch devices
	      if (!Webflow.validClick(evt.currentTarget)) {
	        evt.preventDefault();
	        return;
	      }

	      // Close when navigating to an in-page anchor
	      if (href && href.indexOf('#') === 0 && data.open) {
	        close(data);
	      }
	    };
	  }

	  function outside(data) {
	    // Unbind previous tap handler if it exists
	    if (data.outside) $doc.off('tap' + namespace, data.outside);

	    // Close menu when tapped outside, debounced to wait for state
	    return _.debounce(function(evt) {
	      if (!data.open) return;
	      var menu = $(evt.target).closest('.w-nav-menu');
	      if (!data.menu.is(menu)) {
	        close(data);
	      }
	    });
	  }

	  function resize(i, el) {
	    var data = $.data(el, namespace);
	    // Check for collapsed state based on button display
	    var collapsed = data.collapsed = data.button.css('display') !== 'none';
	    // Close menu if button is no longer visible (and not in designer)
	    if (data.open && !collapsed && !designer) close(data, true);
	    // Set max-width of links + dropdowns to match container
	    if (data.container.length) {
	      var updateEachMax = updateMax(data);
	      data.links.each(updateEachMax);
	      data.dropdowns.each(updateEachMax);
	    }
	    // If currently open, update height to match body
	    if (data.open) {
	      setOverlayHeight(data);
	    }
	  }

	  var maxWidth = 'max-width';
	  function updateMax(data) {
	    // Set max-width of each element to match container
	    var containMax = data.container.css(maxWidth);
	    if (containMax === 'none') containMax = '';
	    return function(i, link) {
	      link = $(link);
	      link.css(maxWidth, '');
	      // Don't set the max-width if an upstream value exists
	      if (link.css(maxWidth) === 'none') link.css(maxWidth, containMax);
	    };
	  }

	  function open(data, immediate) {
	    if (data.open) return;
	    data.open = true;
	    data.menu.addClass(menuOpen);
	    data.links.addClass(linkOpen);
	    data.button.addClass(buttonOpen);
	    var config = data.config;
	    var animation = config.animation;
	    if (animation === 'none' || !tram.support.transform) immediate = true;
	    var bodyHeight = setOverlayHeight(data);
	    var menuHeight = data.menu.outerHeight(true);
	    var menuWidth = data.menu.outerWidth(true);
	    var navHeight = data.el.height();
	    var navbarEl = data.el[0];
	    resize(0, navbarEl);
	    ix.intro(0, navbarEl);
	    Webflow.redraw.up();

	    // Listen for tap outside events
	    if (!designer) $doc.on('tap' + namespace, data.outside);

	    // No transition for immediate
	    if (immediate) return;

	    var transConfig = 'transform ' + config.duration + 'ms ' + config.easing;

	    // Add menu to overlay
	    if (data.overlay) {
	      data.overlay.show().append(data.menu);
	    }

	    // Over left/right
	    if (config.animOver) {
	      tram(data.menu)
	      .add(transConfig)
	      .set({ x: config.animDirect * menuWidth, height: bodyHeight }).start({ x: 0 });
	      data.overlay && data.overlay.width(menuWidth);
	      return;
	    }

	    // Drop Down
	    var offsetY = navHeight + menuHeight;
	    tram(data.menu)
	      .add(transConfig)
	      .set({ y: -offsetY }).start({ y: 0 });
	  }

	  function setOverlayHeight(data) {
	    var config = data.config;
	    var bodyHeight = config.docHeight ? $doc.height() : $body.height();
	    if (config.animOver) {
	      data.menu.height(bodyHeight);
	    } else if (data.el.css('position') !== 'fixed') {
	      bodyHeight -= data.el.height();
	    }
	    data.overlay && data.overlay.height(bodyHeight);
	    return bodyHeight;
	  }

	  function close(data, immediate) {
	    if (!data.open) return;
	    data.open = false;
	    data.button.removeClass(buttonOpen);
	    var config = data.config;
	    if (config.animation === 'none' || !tram.support.transform) immediate = true;
	    var animation = config.animation;
	    ix.outro(0, data.el[0]);

	    // Stop listening for tap outside events
	    $doc.off('tap' + namespace, data.outside);

	    if (immediate) {
	      tram(data.menu).stop();
	      complete();
	      return;
	    }

	    var transConfig = 'transform ' + config.duration + 'ms ' + config.easing2;
	    var menuHeight = data.menu.outerHeight(true);
	    var menuWidth = data.menu.outerWidth(true);
	    var navHeight = data.el.height();

	    // Over left/right
	    if (config.animOver) {
	      tram(data.menu)
	        .add(transConfig)
	        .start({ x: menuWidth * config.animDirect }).then(complete);
	      return;
	    }

	    // Drop Down
	    var offsetY = navHeight + menuHeight;
	    tram(data.menu)
	      .add(transConfig)
	      .start({ y: -offsetY }).then(complete);

	    function complete() {
	      data.menu.height('');
	      tram(data.menu).set({ x: 0, y: 0 });
	      data.menu.removeClass(menuOpen);
	      data.links.removeClass(linkOpen);
	      if (data.overlay && data.overlay.children().length) {
	        // Move menu back to parent
	        data.menu.appendTo(data.parent);
	        data.overlay.attr('style', '').hide();
	      }

	      // Trigger event so other components can hook in (dropdown)
	      data.el.triggerHandler('w-close');
	    }
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Smooth scroll
	 */

	var Webflow = __webpack_require__(1);

	Webflow.define('scroll', module.exports = function($, _) {
	  var $doc = $(document);
	  var win = window;
	  var loc = win.location;
	  var history = inIframe() ? null : win.history;
	  var validHash = /^[a-zA-Z0-9][\w:.-]*$/;

	  function inIframe() {
	    try {
	      return !!win.frameElement;
	    } catch (e) {
	      return true;
	    }
	  }

	  function ready() {
	    // If hash is already present on page load, scroll to it right away
	    if (loc.hash) {
	      findEl(loc.hash.substring(1));
	    }

	    // The current page url without the hash part.
	    var locHref = loc.href.split('#')[0];

	    // When clicking on a link, check if it links to another part of the page
	    $doc.on('click', 'a', function(e) {
	      if (Webflow.env('design')) {
	        return;
	      }

	      // Ignore links being used by jQuery mobile
	      if (window.$.mobile && $(e.currentTarget).hasClass('ui-link')) return;

	      // Ignore empty # links
	      if (this.getAttribute('href') === '#') {
	        e.preventDefault();
	        return;
	      }

	      // The href property always contains the full url so we can compare
	      // with the documentâ€™s location to only target links on this page.
	      var parts = this.href.split('#');
	      var hash = parts[0] === locHref ? parts[1] : null;
	      if (hash) {
	        findEl(hash, e);
	      }
	    });
	  }

	  function findEl(hash, e) {
	    if (!validHash.test(hash)) return;

	    var el = $('#' + hash);
	    if (!el.length) {
	      return;
	    }

	    if (e) {
	      e.preventDefault();
	      e.stopPropagation();
	    }

	    // Push new history state
	    if (
	      loc.hash !== hash &&
	      history && history.pushState &&
	      // Navigation breaks Chrome when the protocol is `file:`.
	      !(Webflow.env.chrome && loc.protocol === 'file:')
	    ) {
	      var oldHash = history.state && history.state.hash;
	      if (oldHash !== hash) {
	        history.pushState({ hash: hash }, '', '#' + hash);
	      }
	    }

	    // If a fixed header exists, offset for the height
	    var rootTag = Webflow.env('editor') ? '.w-editor-body' : 'body';
	    var header = $('header, ' + rootTag + ' > .header, ' + rootTag + ' > .w-nav:not([data-no-scroll])');
	    var offset = header.css('position') === 'fixed' ? header.outerHeight() : 0;

	    win.setTimeout(function() {
	      scroll(el, offset);
	    }, e ? 0 : 300);
	  }

	  function scroll(el, offset){
	    var start = $(win).scrollTop();
	    var end = el.offset().top - offset;

	    // If specified, scroll so that the element ends up in the middle of the viewport
	    if (el.data('scroll') === 'mid') {
	      var available = $(win).height() - offset;
	      var elHeight = el.outerHeight();
	      if (elHeight < available) {
	        end -= Math.round((available - elHeight) / 2);
	      }
	    }

	    var mult = 1;

	    // Check for custom time multiplier on the body and the element
	    $('body').add(el).each(function(i) {
	      var time = parseFloat($(this).attr('data-scroll-time'), 10);
	      if (!isNaN(time) && (time === 0 || time > 0)) {
	        mult = time;
	      }
	    });

	    // Shim for IE8 and below
	    if (!Date.now) {
	      Date.now = function() { return new Date().getTime(); };
	    }

	    var clock = Date.now();
	    var animate = win.requestAnimationFrame || win.mozRequestAnimationFrame || win.webkitRequestAnimationFrame || function(fn) { win.setTimeout(fn, 15); };
	    var duration = (472.143 * Math.log(Math.abs(start - end) +125) - 2000) * mult;

	    var step = function() {
	      var elapsed = Date.now() - clock;
	      win.scroll(0, getY(start, end, elapsed, duration));

	      if (elapsed <= duration) {
	        animate(step);
	      }
	    };

	    step();
	  }

	  function getY(start, end, elapsed, duration) {
	    if (elapsed > duration) {
	      return end;
	    }

	    return start + (end - start) * ease(elapsed / duration);
	  }

	  function ease(t) {
	    return t<0.5 ? 4 * t * t * t : (t-1) * (2 * t-2) * (2 * t-2)+1;
	  }

	  // Export module
	  return { ready: ready };
	});


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Slider component
	 */

	var Webflow = __webpack_require__(1);
	var IXEvents = __webpack_require__(2);

	Webflow.define('slider', module.exports = function($, _) {
	  var api = {};
	  var tram = $.tram;
	  var $doc = $(document);
	  var $sliders;
	  var designer;
	  var inApp = Webflow.env();
	  var namespace = '.w-slider';
	  var dot = '<div class="w-slider-dot" data-wf-ignore />';
	  var ix = IXEvents.triggers;
	  var fallback;
	  var inRedraw;

	  // -----------------------------------
	  // Module methods

	  api.ready = function() {
	    init();
	  };

	  api.design = function() {
	    designer = true;
	    init();
	  };

	  api.preview = function() {
	    designer = false;
	    init();
	  };

	  api.redraw = function() {
	    inRedraw = true;
	    init();
	  };

	  api.destroy = removeListeners;

	  // -----------------------------------
	  // Private methods

	  function init() {
	    // Find all sliders on the page
	    $sliders = $doc.find(namespace);
	    if (!$sliders.length) return;
	    $sliders.filter(':visible').each(build);
	    inRedraw = null;
	    if (fallback) return;

	    removeListeners();
	    addListeners();
	  }

	  function removeListeners() {
	    Webflow.resize.off(renderAll);
	    Webflow.redraw.off(api.redraw);
	  }

	  function addListeners() {
	    Webflow.resize.on(renderAll);
	    Webflow.redraw.on(api.redraw);
	  }

	  function renderAll() {
	    $sliders.filter(':visible').each(render);
	  }

	  function build(i, el) {
	    var $el = $(el);

	    // Store slider state in data
	    var data = $.data(el, namespace);
	    if (!data) {
	      data = $.data(el, namespace, {
	        index: 0,
	        depth: 1,
	        el: $el,
	        config: {}
	      });
	    }
	    data.mask = $el.children('.w-slider-mask');
	    data.left = $el.children('.w-slider-arrow-left');
	    data.right = $el.children('.w-slider-arrow-right');
	    data.nav = $el.children('.w-slider-nav');
	    data.slides = data.mask.children('.w-slide');
	    data.slides.each(ix.reset);
	    if (inRedraw) data.maskWidth = 0;

	    // Disable in old browsers
	    if (!tram.support.transform) {
	      data.left.hide();
	      data.right.hide();
	      data.nav.hide();
	      fallback = true;
	      return;
	    }

	    // Remove old events
	    data.el.off(namespace);
	    data.left.off(namespace);
	    data.right.off(namespace);
	    data.nav.off(namespace);

	    // Set config from data attributes
	    configure(data);

	    // Add events based on mode
	    if (designer) {
	      data.el.on('setting' + namespace, handler(data));
	      stopTimer(data);
	      data.hasTimer = false;
	    } else {
	      data.el.on('swipe' + namespace, handler(data));
	      data.left.on('tap' + namespace, previousFunction(data));
	      data.right.on('tap' + namespace, next(data));

	      // Start timer if autoplay is true, only once
	      if (data.config.autoplay && !data.hasTimer) {
	        data.hasTimer = true;
	        data.timerCount = 1;
	        startTimer(data);
	      }
	    }

	    // Listen to nav events
	    data.nav.on('tap' + namespace, '> div', handler(data));

	    // Remove gaps from formatted html (for inline-blocks)
	    if (!inApp) {
	      data.mask.contents().filter(function() {
	        return this.nodeType === 3;
	      }).remove();
	    }

	    // Run first render
	    render(i, el);
	  }

	  function configure(data) {
	    var config = {};

	    config.crossOver = 0;

	    // Set config options from data attributes
	    config.animation = data.el.attr('data-animation') || 'slide';
	    if (config.animation === 'outin') {
	      config.animation = 'cross';
	      config.crossOver = 0.5;
	    }
	    config.easing = data.el.attr('data-easing') || 'ease';

	    var duration = data.el.attr('data-duration');
	    config.duration = duration != null ? +duration : 500;

	    if (+data.el.attr('data-infinite')) config.infinite = true;
	    if (+data.el.attr('data-disable-swipe')) config.disableSwipe = true;

	    if (+data.el.attr('data-hide-arrows')) {
	      config.hideArrows = true;
	    } else if (data.config.hideArrows) {
	      data.left.show();
	      data.right.show();
	    }

	    if (+data.el.attr('data-autoplay')) {
	      config.autoplay = true;
	      config.delay = +data.el.attr('data-delay') || 2000;
	      config.timerMax = +data.el.attr('data-autoplay-limit');
	      // Disable timer on first touch or mouse down
	      var touchEvents = 'mousedown' + namespace + ' touchstart' + namespace;
	      if (!designer) {
	        data.el.off(touchEvents).one(touchEvents, function() {
	          stopTimer(data);
	        });
	      }
	    }

	    // Use edge buffer to help calculate page count
	    var arrowWidth = data.right.width();
	    config.edge = arrowWidth ? arrowWidth + 40 : 100;

	    // Store config in data
	    data.config = config;
	  }

	  function previousFunction(data) {
	    return function(evt) {
	      change(data, { index: data.index - 1, vector: -1 });
	    };
	  }

	  function next(data) {
	    return function(evt) {
	      change(data, { index: data.index + 1, vector: 1 });
	    };
	  }

	  function select(data, value) {
	    // Select page based on slide element index
	    var found = null;
	    if (value === data.slides.length) {
	      init(); layout(data); // Rebuild and find new slides
	    }
	    _.each(data.anchors, function(anchor, index) {
	      $(anchor.els).each(function(i, el) {
	        if ($(el).index() === value) found = index;
	      });
	    });
	    if (found != null) change(data, { index: found, immediate: true });
	  }

	  function startTimer(data) {
	    stopTimer(data);
	    var config = data.config;
	    var timerMax = config.timerMax;
	    if (timerMax && data.timerCount++ > timerMax) return;
	    data.timerId = window.setTimeout(function() {
	      if (data.timerId == null || designer) return;
	      next(data)();
	      startTimer(data);
	    }, config.delay);
	  }

	  function stopTimer(data) {
	    window.clearTimeout(data.timerId);
	    data.timerId = null;
	  }

	  function handler(data) {
	    return function(evt, options) {
	      options = options || {};
	      var config = data.config;

	      // Designer settings
	      if (designer && evt.type === 'setting') {
	        if (options.select === 'prev') return previousFunction(data)();
	        if (options.select === 'next') return next(data)();
	        configure(data);
	        layout(data);
	        if (options.select == null) return;
	        select(data, options.select);
	        return;
	      }

	      // Swipe event
	      if (evt.type === 'swipe') {
	        if (config.disableSwipe) return;
	        if (Webflow.env('editor')) return;
	        if (options.direction === 'left') return next(data)();
	        if (options.direction === 'right') return previousFunction(data)();
	        return;
	      }

	      // Page buttons
	      if (data.nav.has(evt.target).length) {
	        change(data, { index: $(evt.target).index() });
	      }
	    };
	  }

	  function change(data, options) {
	    options = options || {};
	    var config = data.config;
	    var anchors = data.anchors;

	    // Set new index
	    data.previous = data.index;
	    var index = options.index;
	    var shift = {};
	    if (index < 0) {
	      index = anchors.length - 1;
	      if (config.infinite) {
	        // Shift first slide to the end
	        shift.x = -data.endX;
	        shift.from = 0;
	        shift.to = anchors[0].width;
	      }
	    } else if (index >= anchors.length) {
	      index = 0;
	      if (config.infinite) {
	        // Shift last slide to the start
	        shift.x = anchors[anchors.length - 1].width;
	        shift.from = -anchors[anchors.length - 1].x;
	        shift.to = shift.from - shift.x;
	      }
	    }
	    data.index = index;

	    // Select page nav
	    var active = data.nav.children().eq(data.index).addClass('w-active');
	    data.nav.children().not(active).removeClass('w-active');

	    // Hide arrows
	    if (config.hideArrows) {
	      data.index === anchors.length - 1 ? data.right.hide() : data.right.show();
	      data.index === 0 ? data.left.hide() : data.left.show();
	    }

	    // Get page offset from anchors
	    var lastOffsetX = data.offsetX || 0;
	    var offsetX = data.offsetX = -anchors[data.index].x;
	    var resetConfig = { x: offsetX, opacity: 1, visibility: '' };

	    // Transition slides
	    var targets = $(anchors[data.index].els);
	    var prevTargs = $(anchors[data.previous] && anchors[data.previous].els);
	    var others = data.slides.not(targets);
	    var animation = config.animation;
	    var easing = config.easing;
	    var duration = Math.round(config.duration);
	    var vector = options.vector || (data.index > data.previous ? 1 : -1);
	    var fadeRule = 'opacity ' + duration + 'ms ' + easing;
	    var slideRule = 'transform ' + duration + 'ms ' + easing;

	    // Trigger IX events
	    if (!designer) {
	      targets.each(ix.intro);
	      others.each(ix.outro);
	    }

	    // Set immediately after layout changes (but not during redraw)
	    if (options.immediate && !inRedraw) {
	      tram(targets).set(resetConfig);
	      resetOthers();
	      return;
	    }

	    // Exit early if index is unchanged
	    if (data.index === data.previous) return;

	    // Cross Fade / Out-In
	    if (animation === 'cross') {
	      var reduced = Math.round(duration - duration * config.crossOver);
	      var wait = Math.round(duration - reduced);
	      fadeRule = 'opacity ' + reduced + 'ms ' + easing;
	      tram(prevTargs)
	        .set({ visibility: '' })
	        .add(fadeRule)
	        .start({ opacity: 0 });
	      tram(targets)
	        .set({ visibility: '', x: offsetX, opacity: 0, zIndex: data.depth++ })
	        .add(fadeRule)
	        .wait(wait)
	        .then({ opacity: 1 })
	        .then(resetOthers);
	      return;
	    }

	    // Fade Over
	    if (animation === 'fade') {
	      tram(prevTargs)
	        .set({ visibility: '' })
	        .stop();
	      tram(targets)
	        .set({ visibility: '', x: offsetX, opacity: 0, zIndex: data.depth++ })
	        .add(fadeRule)
	        .start({ opacity: 1 })
	        .then(resetOthers);
	      return;
	    }

	    // Slide Over
	    if (animation === 'over') {
	      resetConfig = { x: data.endX };
	      tram(prevTargs)
	        .set({ visibility: '' })
	        .stop();
	      tram(targets)
	        .set({ visibility: '', zIndex: data.depth++, x: offsetX + anchors[data.index].width * vector })
	        .add(slideRule)
	        .start({ x: offsetX })
	        .then(resetOthers);
	      return;
	    }

	    // Slide - infinite scroll
	    if (config.infinite && shift.x) {
	      tram(data.slides.not(prevTargs))
	        .set({ visibility: '', x: shift.x })
	        .add(slideRule)
	        .start({ x: offsetX });
	      tram(prevTargs)
	        .set({ visibility: '', x: shift.from })
	        .add(slideRule)
	        .start({ x: shift.to });
	      data.shifted = prevTargs;

	    } else {
	      if (config.infinite && data.shifted) {
	        tram(data.shifted).set({ visibility: '', x: lastOffsetX });
	        data.shifted = null;
	      }

	      // Slide - basic scroll
	      tram(data.slides)
	        .set({ visibility: '' })
	        .add(slideRule)
	        .start({ x: offsetX });
	    }

	    // Helper to move others out of view
	    function resetOthers() {
	      targets = $(anchors[data.index].els);
	      others = data.slides.not(targets);
	      if (animation !== 'slide') resetConfig.visibility = 'hidden';
	      tram(others).set(resetConfig);
	    }
	  }

	  function render(i, el) {
	    var data = $.data(el, namespace);
	    if (maskChanged(data)) return layout(data);
	    if (designer && slidesChanged(data)) layout(data);
	  }

	  function layout(data) {
	    // Determine page count from width of slides
	    var pages = 1;
	    var offset = 0;
	    var anchor = 0;
	    var width = 0;
	    var maskWidth = data.maskWidth;
	    var threshold = maskWidth - data.config.edge;
	    if (threshold < 0) threshold = 0;
	    data.anchors = [{ els: [], x: 0, width: 0 }];
	    data.slides.each(function(i, el) {
	      if (anchor - offset > threshold) {
	        pages++;
	        offset += maskWidth;
	        // Store page anchor for transition
	        data.anchors[pages - 1] = { els: [], x: anchor, width: 0 };
	      }
	      // Set next anchor using current width + margin
	      width = $(el).outerWidth(true);
	      anchor += width;
	      data.anchors[pages - 1].width += width;
	      data.anchors[pages - 1].els.push(el);
	    });
	    data.endX = anchor;

	    // Build dots if nav exists and needs updating
	    if (designer) data.pages = null;
	    if (data.nav.length && data.pages !== pages){
	      data.pages = pages;
	      buildNav(data);
	    }

	    // Make sure index is still within range and call change handler
	    var index = data.index;
	    if (index >= pages) index = pages - 1;
	    change(data, { immediate: true, index: index });
	  }

	  function buildNav(data) {
	    var dots = [];
	    var $dot;
	    var spacing = data.el.attr('data-nav-spacing');
	    if (spacing) spacing = parseFloat(spacing) + 'px';
	    for (var i = 0; i < data.pages; i++) {
	      $dot = $(dot);
	      if (data.nav.hasClass('w-num')) $dot.text(i + 1);
	      if (spacing != null) {
	        $dot.css({
	          'margin-left': spacing,
	          'margin-right': spacing
	        });
	      }
	      dots.push($dot);
	    }
	    data.nav.empty().append(dots);
	  }

	  function maskChanged(data) {
	    var maskWidth = data.mask.width();
	    if (data.maskWidth !== maskWidth) {
	      data.maskWidth = maskWidth;
	      return true;
	    }
	    return false;
	  }

	  function slidesChanged(data) {
	    var slidesWidth = 0;
	    data.slides.each(function(i, el) {
	      slidesWidth += $(el).outerWidth(true);
	    });
	    if (data.slidesWidth !== slidesWidth) {
	      data.slidesWidth = slidesWidth;
	      return true;
	    }
	    return false;
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Tabs component
	 */

	var Webflow = __webpack_require__(1);
	var IXEvents = __webpack_require__(2);

	Webflow.define('tabs', module.exports = function($, _) {
	  var api = {};
	  var tram = $.tram;
	  var $win = $(window);
	  var $doc = $(document);
	  var $tabs;
	  var design;
	  var env = Webflow.env;
	  var safari = env.safari;
	  var inApp = env();
	  var tabAttr = 'data-w-tab';
	  var namespace = '.w-tabs';
	  var linkCurrent = 'w--current';
	  var tabActive = 'w--tab-active';
	  var ix = IXEvents.triggers;
	  var inRedraw;

	  // -----------------------------------
	  // Module methods

	  api.ready = api.design = api.preview = init;

	  api.redraw = function() {
	    inRedraw = true;
	    init();
	  };

	  api.destroy = function() {
	    $tabs = $doc.find(namespace);
	    if (!$tabs.length) return;
	    $tabs.each(resetIX);
	    removeListeners();
	  };

	  // -----------------------------------
	  // Private methods

	  function init() {
	    design = inApp && Webflow.env('design');

	    // Find all instances on the page
	    $tabs = $doc.find(namespace);
	    if (!$tabs.length) return;
	    $tabs.each(build);
	    Webflow.env('preview') && $tabs.each(resetIX);
	    inRedraw = null;

	    removeListeners();
	    addListeners();
	  }

	  function removeListeners() {
	    Webflow.redraw.off(api.redraw);
	  }

	  function addListeners() {
	    Webflow.redraw.on(api.redraw);
	  }

	  function resetIX(i, el) {
	    var $el = $(el);
	    var data = $.data(el, namespace);
	    if (!data) return;
	    data.links && data.links.each(ix.reset);
	    data.panes && data.panes.each(ix.reset);
	  }

	  function build(i, el) {
	    var $el = $(el);

	    // Store state in data
	    var data = $.data(el, namespace);
	    if (!data) data = $.data(el, namespace, { el: $el, config: {} });
	    data.current = null;
	    data.menu = $el.children('.w-tab-menu');
	    data.links = data.menu.children('.w-tab-link');
	    data.content = $el.children('.w-tab-content');
	    data.panes = data.content.children('.w-tab-pane');

	    // Remove old events
	    data.el.off(namespace);
	    data.links.off(namespace);

	    // Set config from data attributes
	    configure(data);

	    // Wire up events when not in design mode
	    if (!design) {
	      data.links.on('click' + namespace, linkSelect(data));

	      // Trigger first intro event from current tab
	      var $link = data.links.filter('.' + linkCurrent);
	      var tab = $link.attr(tabAttr);
	      tab && changeTab(data, { tab: tab, immediate: true });
	    }
	  }

	  function configure(data) {
	    var config = {};
	    var old = data.config || {};

	    // Set config options from data attributes
	    config.easing = data.el.attr('data-easing') || 'ease';

	    var intro = +data.el.attr('data-duration-in');
	    intro = config.intro = intro === intro ? intro : 0;

	    var outro = +data.el.attr('data-duration-out');
	    outro = config.outro = outro === outro ? outro : 0;

	    config.immediate = !intro && !outro;

	    // Store config in data
	    data.config = config;
	  }

	  function linkSelect(data) {
	    return function(evt) {
	      var tab = evt.currentTarget.getAttribute(tabAttr);
	      tab && changeTab(data, { tab: tab });
	    };
	  }

	  function changeTab(data, options) {
	    options = options || {};

	    var config = data.config;
	    var easing = config.easing;
	    var tab = options.tab;

	    // Don't select the same tab twice
	    if (tab === data.current) return;
	    data.current = tab;

	    // Select the current link
	    data.links.each(function(i, el) {
	      var $el = $(el);
	      if (el.getAttribute(tabAttr) === tab) $el.addClass(linkCurrent).each(ix.intro);
	      else if ($el.hasClass(linkCurrent)) $el.removeClass(linkCurrent).each(ix.outro);
	    });

	    // Find the new tab panes and keep track of previous
	    var targets = [];
	    var previous = [];
	    data.panes.each(function(i, el) {
	      var $el = $(el);
	      if (el.getAttribute(tabAttr) === tab) {
	        targets.push(el);
	      } else if ($el.hasClass(tabActive)) {
	        previous.push(el);
	      }
	    });

	    var $targets = $(targets);
	    var $previous = $(previous);

	    // Switch tabs immediately and bypass transitions
	    if (options.immediate || config.immediate) {
	      $targets.addClass(tabActive).each(ix.intro);
	      $previous.removeClass(tabActive);
	      // Redraw to benefit components in the hidden tab pane
	      // But only if not currently in the middle of a redraw
	      if (!inRedraw) Webflow.redraw.up();
	      return;
	    }

	    // Fade out the currently active tab before intro
	    if ($previous.length && config.outro) {
	      $previous.each(ix.outro);
	      tram($previous)
	        .add('opacity ' + config.outro + 'ms ' + easing, { fallback: safari })
	        .start({ opacity: 0 })
	        .then(intro);
	    } else {
	      // Skip the outro and play intro
	      intro();
	    }

	    // Fade in the new target
	    function intro() {
	      // Clear previous active class + inline style
	      $previous.removeClass(tabActive).removeAttr('style');

	      // Add active class to new target
	      $targets.addClass(tabActive).each(ix.intro);
	      Webflow.redraw.up();

	      // Set opacity immediately if intro is zero
	      if (!config.intro) return tram($targets).set({ opacity: 1 });

	      // Otherwise fade in opacity
	      tram($targets)
	        .set({ opacity: 0 })
	        .redraw()
	        .add('opacity ' + config.intro + 'ms ' + easing, { fallback: safari })
	        .start({ opacity: 1 });
	    }
	  }

	  // Export module
	  return api;
	});


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Webflow: Touch events
	 */

	var Webflow = __webpack_require__(1);

	Webflow.define('touch', module.exports = function($, _) {
	  var api = {};
	  var fallback = !document.addEventListener;
	  var getSelection = window.getSelection;

	  // Fallback to click events in old IE
	  if (fallback) {
	    $.event.special.tap = { bindType: 'click', delegateType: 'click' };
	  }

	  api.init = function(el) {
	    if (fallback) return null;
	    el = typeof el === 'string' ? $(el).get(0) : el;
	    return el ? new Touch(el) : null;
	  };

	  function Touch(el) {
	    var active = false;
	    var dirty = false;
	    var useTouch = false;
	    var thresholdX = Math.min(Math.round(window.innerWidth * 0.04), 40);
	    var startX, startY, lastX;

	    el.addEventListener('touchstart', start, false);
	    el.addEventListener('touchmove', move, false);
	    el.addEventListener('touchend', end, false);
	    el.addEventListener('touchcancel', cancel, false);
	    el.addEventListener('mousedown', start, false);
	    el.addEventListener('mousemove', move, false);
	    el.addEventListener('mouseup', end, false);
	    el.addEventListener('mouseout', cancel, false);

	    function start(evt) {
	      // We donâ€™t handle multi-touch events yet.
	      var touches = evt.touches;
	      if (touches && touches.length > 1) {
	        return;
	      }

	      active = true;
	      dirty = false;

	      if (touches) {
	        useTouch = true;
	        startX = touches[0].clientX;
	        startY = touches[0].clientY;
	      } else {
	        startX = evt.clientX;
	        startY = evt.clientY;
	      }

	      lastX = startX;
	    }

	    function move(evt) {
	      if (!active) return;

	      if (useTouch && evt.type === 'mousemove') {
	        evt.preventDefault();
	        evt.stopPropagation();
	        return;
	      }

	      var touches = evt.touches;
	      var x = touches ? touches[0].clientX : evt.clientX;
	      var y = touches ? touches[0].clientY : evt.clientY;

	      var velocityX = x - lastX;
	      lastX = x;

	      // Allow swipes while pointer is down, but prevent them during text selection
	      if (Math.abs(velocityX) > thresholdX && getSelection && getSelection() + '' === '') {
	        triggerEvent('swipe', evt, { direction: velocityX > 0 ? 'right' : 'left' });
	        cancel();
	      }

	      // If pointer moves more than 10px flag to cancel tap
	      if (Math.abs(x - startX) > 10 || Math.abs(y - startY) > 10) {
	        dirty = true;
	      }
	    }

	    function end(evt) {
	      if (!active) return;
	      active = false;

	      if (useTouch && evt.type === 'mouseup') {
	        evt.preventDefault();
	        evt.stopPropagation();
	        useTouch = false;
	        return;
	      }

	      if (!dirty) triggerEvent('tap', evt);
	    }

	    function cancel(evt) {
	      active = false;
	    }

	    function destroy() {
	      el.removeEventListener('touchstart', start, false);
	      el.removeEventListener('touchmove', move, false);
	      el.removeEventListener('touchend', end, false);
	      el.removeEventListener('touchcancel', cancel, false);
	      el.removeEventListener('mousedown', start, false);
	      el.removeEventListener('mousemove', move, false);
	      el.removeEventListener('mouseup', end, false);
	      el.removeEventListener('mouseout', cancel, false);
	      el = null;
	    }

	    // Public instance methods
	    this.destroy = destroy;
	  }

	  // Wrap native event to supoprt preventdefault + stopPropagation
	  function triggerEvent(type, evt, data) {
	    var newEvent = $.Event(type, { originalEvent: evt });
	    $(evt.target).trigger(newEvent, data);
	  }

	  // Listen for touch events on all nodes by default.
	  api.instance = api.init(document);

	  // Export module
	  return api;
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*jshint -W054 */

	// Include tram for frame-throttling
	var $ = window.$;
	var tram = __webpack_require__(3) && $.tram;

	/*!
	 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
	 * _.each
	 * _.map
	 * _.find
	 * _.filter
	 * _.any
	 * _.contains
	 * _.delay
	 * _.defer
	 * _.throttle (webflow)
	 * _.debounce
	 * _.keys
	 * _.has
	 * _.now
	 *
	 * http://underscorejs.org
	 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Underscore may be freely distributed under the MIT license.
	 * @license MIT
	 */
	module.exports = (function() {
	  var _ = {};

	  // Current version.
	  _.VERSION = '1.6.0-Webflow';

	  // Establish the object that gets returned to break out of a loop iteration.
	  var breaker = {};

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    concat           = ArrayProto.concat,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeForEach      = ArrayProto.forEach,
	    nativeMap          = ArrayProto.map,
	    nativeReduce       = ArrayProto.reduce,
	    nativeReduceRight  = ArrayProto.reduceRight,
	    nativeFilter       = ArrayProto.filter,
	    nativeEvery        = ArrayProto.every,
	    nativeSome         = ArrayProto.some,
	    nativeIndexOf      = ArrayProto.indexOf,
	    nativeLastIndexOf  = ArrayProto.lastIndexOf,
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind;

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles objects with the built-in `forEach`, arrays, and raw objects.
	  // Delegates to **ECMAScript 5**'s native `forEach` if available.
	  var each = _.each = _.forEach = function(obj, iterator, context) {
	    /* jshint shadow:true */
	    if (obj == null) return obj;
	    if (nativeForEach && obj.forEach === nativeForEach) {
	      obj.forEach(iterator, context);
	    } else if (obj.length === +obj.length) {
	      for (var i = 0, length = obj.length; i < length; i++) {
	        if (iterator.call(context, obj[i], i, obj) === breaker) return;
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (var i = 0, length = keys.length; i < length; i++) {
	        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iterator to each element.
	  // Delegates to **ECMAScript 5**'s native `map` if available.
	  _.map = _.collect = function(obj, iterator, context) {
	    var results = [];
	    if (obj == null) return results;
	    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
	    each(obj, function(value, index, list) {
	      results.push(iterator.call(context, value, index, list));
	    });
	    return results;
	  };

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var result;
	    any(obj, function(value, index, list) {
	      if (predicate.call(context, value, index, list)) {
	        result = value;
	        return true;
	      }
	    });
	    return result;
	  };

	  // Return all the elements that pass a truth test.
	  // Delegates to **ECMAScript 5**'s native `filter` if available.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    if (obj == null) return results;
	    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
	    each(obj, function(value, index, list) {
	      if (predicate.call(context, value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Delegates to **ECMAScript 5**'s native `some` if available.
	  // Aliased as `any`.
	  var any = _.some = _.any = function(obj, predicate, context) {
	    predicate || (predicate = _.identity);
	    var result = false;
	    if (obj == null) return result;
	    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
	    each(obj, function(value, index, list) {
	      if (result || (result = predicate.call(context, value, index, list))) return breaker;
	    });
	    return !!result;
	  };

	  // Determine if the array or object contains a given value (using `===`).
	  // Aliased as `include`.
	  _.contains = _.include = function(obj, target) {
	    if (obj == null) return false;
	    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
	    return any(obj, function(value) {
	      return value === target;
	    });
	  };

	  // Function (ahem) Functions
	  // --------------------

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){ return func.apply(null, args); }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = function(func) {
	    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
	  };

	  // Returns a function, that, when invoked, will only be triggered once every
	  // browser animation frame - using tram's requestAnimationFrame polyfill.
	  _.throttle = function(func) {
	    var wait, args, context;
	    return function() {
	      if (wait) return;
	      wait = true;
	      args = arguments;
	      context = this;
	      tram.frame(function() {
	        wait = false;
	        func.apply(context, args);
	      });
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;
	      if (last < wait) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) {
	        timeout = setTimeout(later, wait);
	      }
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Object Functions
	  // ----------------

	  // Fill in a given object with default properties.
	  _.defaults = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      var source = arguments[i];
	      for (var prop in source) {
	        if (obj[prop] === void 0) obj[prop] = source[prop];
	      }
	    }
	    return obj;
	  };

	  // Retrieve the names of an object's properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    return keys;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return hasOwnProperty.call(obj, key);
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    return obj === Object(obj);
	  };

	  // Utility Functions
	  // -----------------

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() { return new Date().getTime(); };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Export underscore
	  return _;
	}());


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*!
	 * jQuery-ajaxTransport-XDomainRequest - v1.0.3
	 * 2014-12-16 WEBFLOW - Removed UMD wrapper
	 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
	 * Copyright (c) 2014 Jason Moon (@JSONMOON)
	 * @license MIT (/blob/master/LICENSE.txt)
	 */
	module.exports=function($){if($.support.cors||!$.ajaxTransport||!window.XDomainRequest){return}var httpRegEx=/^https?:\/\//i;var getOrPostRegEx=/^get|post$/i;var sameSchemeRegEx=new RegExp("^"+location.protocol,"i");$.ajaxTransport("* text html xml json",function(options,userOptions,jqXHR){if(!options.crossDomain||!options.async||!getOrPostRegEx.test(options.type)||!httpRegEx.test(options.url)||!sameSchemeRegEx.test(options.url)){return}var xdr=null;return{send:function(headers,complete){var postData="";var userType=(userOptions.dataType||"").toLowerCase();xdr=new XDomainRequest;if(/^\d+$/.test(userOptions.timeout)){xdr.timeout=userOptions.timeout}xdr.ontimeout=function(){complete(500,"timeout")};xdr.onload=function(){var allResponseHeaders="Content-Length: "+xdr.responseText.length+"\r\nContent-Type: "+xdr.contentType;var status={code:200,message:"success"};var responses={text:xdr.responseText};try{if(userType==="html"||/text\/html/i.test(xdr.contentType)){responses.html=xdr.responseText}else if(userType==="json"||userType!=="text"&&/\/json/i.test(xdr.contentType)){try{responses.json=$.parseJSON(xdr.responseText)}catch(e){status.code=500;status.message="parseerror"}}else if(userType==="xml"||userType!=="text"&&/\/xml/i.test(xdr.contentType)){var doc=new ActiveXObject("Microsoft.XMLDOM");doc.async=false;try{doc.loadXML(xdr.responseText)}catch(e){doc=undefined}if(!doc||!doc.documentElement||doc.getElementsByTagName("parsererror").length){status.code=500;status.message="parseerror";throw"Invalid XML: "+xdr.responseText}responses.xml=doc}}catch(parseMessage){throw parseMessage}finally{complete(status.code,status.message,responses,allResponseHeaders)}};xdr.onprogress=function(){};xdr.onerror=function(){complete(500,"error",{text:xdr.responseText})};if(userOptions.data){postData=$.type(userOptions.data)==="string"?userOptions.data:$.param(userOptions.data)}xdr.open(options.type,options.url);xdr.send(postData)},abort:function(){if(xdr){xdr.abort()}}}})}(window.jQuery);

/***/ }
/******/ ]);/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions: Init
 */
Webflow.require('ix').init([
  {"slug":"new-interaction","name":"New Interaction","value":{"style":{},"triggers":[{"type":"hover","selector":".cover","descend":true,"stepsA":[{"opacity":1,"transition":"opacity 500ms ease 0ms"}],"stepsB":[{"opacity":0,"transition":"opacity 500ms ease 0ms"}]}]}},
  {"slug":"new-interaction-2","name":"New Interaction 2","value":{"style":{"scaleX":0.64,"scaleY":0.64,"scaleZ":1},"triggers":[]}},
  {"slug":"new-interaction-3","name":"New Interaction 3","value":{"style":{},"triggers":[]}},
  {"slug":"new-interaction-4","name":"New Interaction 4","value":{"style":{"x":"100%","y":"0px"},"triggers":[{"type":"load","stepsA":[{"wait":10000},{"transition":"transform 500ms ease-in-out-back 0ms","x":"0px","y":"0px"}],"stepsB":[]}]}},
  {"slug":"new-interaction-5","name":"New Interaction 5","value":{"style":{"x":"100%","y":"0px"},"triggers":[{"type":"load","stepsA":[{"wait":2000},{"transition":"transform 500ms ease-in-out-back 0ms","x":"0px","y":"0px"}],"stepsB":[]}]}},
  {"slug":"new-interaction-6","name":"New Interaction 6","value":{"style":{},"triggers":[{"type":"load","loopA":true,"stepsA":[{"transition":"transform 200ms ease 0ms","scaleX":1.1,"scaleY":1.1,"scaleZ":1},{"transition":"transform 200ms ease 0ms","scaleX":1,"scaleY":1,"scaleZ":1}],"stepsB":[]}]}},
  {"slug":"new-interaction-7","name":"New Interaction 7","value":{"style":{},"triggers":[{"type":"hover","selector":".profile_cover","descend":true,"stepsA":[{"opacity":1,"transition":"opacity 250ms ease 0ms"}],"stepsB":[{"opacity":0,"transition":"opacity 250ms ease 0ms"}]},{"type":"hover","selector":".stats_holder","descend":true,"stepsA":[{"transition":"transform 250ms ease-in-out-back 0ms","scaleX":1,"scaleY":1,"scaleZ":1}],"stepsB":[{"transition":"transform 250ms ease-in-out-back 0ms","scaleX":0.6,"scaleY":0.6,"scaleZ":1}]}]}}
]);
/*
 * Copyright 2013 Small Batch, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

;(function(window,document,undefined){
var j=void 0,k=!0,l=null,p=!1;function q(a){return function(){return this[a]}}var aa=this;function ba(a,b){var c=a.split("."),d=aa;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&b!==j?d[e]=b:d=d[e]?d[e]:d[e]={}}aa.Ba=k;function ca(a,b,c){return a.call.apply(a.bind,arguments)}
function da(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function s(a,b,c){s=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ca:da;return s.apply(l,arguments)}var ea=Date.now||function(){return+new Date};function fa(a,b){this.G=a;this.u=b||a;this.z=this.u.document;this.R=j}fa.prototype.createElement=function(a,b,c){a=this.z.createElement(a);if(b)for(var d in b)if(b.hasOwnProperty(d))if("style"==d){var e=a,f=b[d];ga(this)?e.setAttribute("style",f):e.style.cssText=f}else a.setAttribute(d,b[d]);c&&a.appendChild(this.z.createTextNode(c));return a};function t(a,b,c){a=a.z.getElementsByTagName(b)[0];a||(a=document.documentElement);a&&a.lastChild&&a.insertBefore(c,a.lastChild)}
function u(a,b){return a.createElement("link",{rel:"stylesheet",href:b})}function ha(a,b){return a.createElement("script",{src:b})}function v(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return;c.push(b);a.className=c.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function w(a,b){for(var c=a.className.split(/\s+/),d=[],e=0,f=c.length;e<f;e++)c[e]!=b&&d.push(c[e]);a.className=d.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}
function ia(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return k;return p}function ga(a){if(a.R===j){var b=a.z.createElement("p");b.innerHTML='<a style="top:1px;">w</a>';a.R=/top/.test(b.getElementsByTagName("a")[0].getAttribute("style"))}return a.R}function x(a){var b=a.u.location.protocol;"about:"==b&&(b=a.G.location.protocol);return"https:"==b?"https:":"http:"};function y(a,b,c){this.w=a;this.T=b;this.Aa=c}ba("webfont.BrowserInfo",y);y.prototype.qa=q("w");y.prototype.hasWebFontSupport=y.prototype.qa;y.prototype.ra=q("T");y.prototype.hasWebKitFallbackBug=y.prototype.ra;y.prototype.sa=q("Aa");y.prototype.hasWebKitMetricsBug=y.prototype.sa;function z(a,b,c,d){this.e=a!=l?a:l;this.o=b!=l?b:l;this.ba=c!=l?c:l;this.f=d!=l?d:l}var ja=/^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;z.prototype.toString=function(){return[this.e,this.o||"",this.ba||"",this.f||""].join("")};
function A(a){a=ja.exec(a);var b=l,c=l,d=l,e=l;a&&(a[1]!==l&&a[1]&&(b=parseInt(a[1],10)),a[2]!==l&&a[2]&&(c=parseInt(a[2],10)),a[3]!==l&&a[3]&&(d=parseInt(a[3],10)),a[4]!==l&&a[4]&&(e=/^[0-9]+$/.test(a[4])?parseInt(a[4],10):a[4]));return new z(b,c,d,e)};function B(a,b,c,d,e,f,g,h,n,m,r){this.J=a;this.Ha=b;this.za=c;this.ga=d;this.Fa=e;this.fa=f;this.xa=g;this.Ga=h;this.wa=n;this.ea=m;this.k=r}ba("webfont.UserAgent",B);B.prototype.getName=q("J");B.prototype.getName=B.prototype.getName;B.prototype.pa=q("za");B.prototype.getVersion=B.prototype.pa;B.prototype.la=q("ga");B.prototype.getEngine=B.prototype.la;B.prototype.ma=q("fa");B.prototype.getEngineVersion=B.prototype.ma;B.prototype.na=q("xa");B.prototype.getPlatform=B.prototype.na;B.prototype.oa=q("wa");
B.prototype.getPlatformVersion=B.prototype.oa;B.prototype.ka=q("ea");B.prototype.getDocumentMode=B.prototype.ka;B.prototype.ja=q("k");B.prototype.getBrowserInfo=B.prototype.ja;function C(a,b){this.a=a;this.H=b}var ka=new B("Unknown",new z,"Unknown","Unknown",new z,"Unknown","Unknown",new z,"Unknown",j,new y(p,p,p));
C.prototype.parse=function(){var a;if(-1!=this.a.indexOf("MSIE")){a=D(this);var b=E(this),c=A(b),d=F(this.a,/MSIE ([\d\w\.]+)/,1),e=A(d);a=new B("MSIE",e,d,"MSIE",e,d,a,c,b,G(this.H),new y("Windows"==a&&6<=e.e||"Windows Phone"==a&&8<=c.e,p,p))}else if(-1!=this.a.indexOf("Opera"))a:{a="Unknown";var b=F(this.a,/Presto\/([\d\w\.]+)/,1),c=A(b),d=E(this),e=A(d),f=G(this.H);c.e!==l?a="Presto":(-1!=this.a.indexOf("Gecko")&&(a="Gecko"),b=F(this.a,/rv:([^\)]+)/,1),c=A(b));if(-1!=this.a.indexOf("Opera Mini/")){var g=
F(this.a,/Opera Mini\/([\d\.]+)/,1),h=A(g);a=new B("OperaMini",h,g,a,c,b,D(this),e,d,f,new y(p,p,p))}else{if(-1!=this.a.indexOf("Version/")&&(g=F(this.a,/Version\/([\d\.]+)/,1),h=A(g),h.e!==l)){a=new B("Opera",h,g,a,c,b,D(this),e,d,f,new y(10<=h.e,p,p));break a}g=F(this.a,/Opera[\/ ]([\d\.]+)/,1);h=A(g);a=h.e!==l?new B("Opera",h,g,a,c,b,D(this),e,d,f,new y(10<=h.e,p,p)):new B("Opera",new z,"Unknown",a,c,b,D(this),e,d,f,new y(p,p,p))}}else if(/AppleWeb(K|k)it/.test(this.a)){a=D(this);var b=E(this),
c=A(b),d=F(this.a,/AppleWeb(?:K|k)it\/([\d\.\+]+)/,1),e=A(d),f="Unknown",g=new z,h="Unknown",n=p;-1!=this.a.indexOf("Chrome")||-1!=this.a.indexOf("CrMo")||-1!=this.a.indexOf("CriOS")?f="Chrome":/Silk\/\d/.test(this.a)?f="Silk":"BlackBerry"==a||"Android"==a?f="BuiltinBrowser":-1!=this.a.indexOf("Safari")?f="Safari":-1!=this.a.indexOf("AdobeAIR")&&(f="AdobeAIR");"BuiltinBrowser"==f?h="Unknown":"Silk"==f?h=F(this.a,/Silk\/([\d\._]+)/,1):"Chrome"==f?h=F(this.a,/(Chrome|CrMo|CriOS)\/([\d\.]+)/,2):-1!=
this.a.indexOf("Version/")?h=F(this.a,/Version\/([\d\.\w]+)/,1):"AdobeAIR"==f&&(h=F(this.a,/AdobeAIR\/([\d\.]+)/,1));g=A(h);n="AdobeAIR"==f?2<g.e||2==g.e&&5<=g.o:"BlackBerry"==a?10<=c.e:"Android"==a?2<c.e||2==c.e&&1<c.o:526<=e.e||525<=e.e&&13<=e.o;a=new B(f,g,h,"AppleWebKit",e,d,a,c,b,G(this.H),new y(n,536>e.e||536==e.e&&11>e.o,"iPhone"==a||"iPad"==a||"iPod"==a||"Macintosh"==a))}else-1!=this.a.indexOf("Gecko")?(a="Unknown",b=new z,c="Unknown",d=E(this),e=A(d),f=p,-1!=this.a.indexOf("Firefox")?(a=
"Firefox",c=F(this.a,/Firefox\/([\d\w\.]+)/,1),b=A(c),f=3<=b.e&&5<=b.o):-1!=this.a.indexOf("Mozilla")&&(a="Mozilla"),g=F(this.a,/rv:([^\)]+)/,1),h=A(g),f||(f=1<h.e||1==h.e&&9<h.o||1==h.e&&9==h.o&&2<=h.ba||g.match(/1\.9\.1b[123]/)!=l||g.match(/1\.9\.1\.[\d\.]+/)!=l),a=new B(a,b,c,"Gecko",h,g,D(this),e,d,G(this.H),new y(f,p,p))):a=ka;return a};
function D(a){var b=F(a.a,/(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/,1);if(""!=b)return/BB\d{2}/.test(b)&&(b="BlackBerry"),b;a=F(a.a,/(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/,1);return""!=a?("Mac_PowerPC"==a&&(a="Macintosh"),a):"Unknown"}
function E(a){var b=F(a.a,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(b||(b=F(a.a,/Windows Phone( OS)? ([^;)]+)/,2))||(b=F(a.a,/(iPhone )?OS ([\d_]+)/,2)))return b;if(b=F(a.a,/(?:Linux|CrOS) ([^;)]+)/,1))for(var b=b.split(/\s/),c=0;c<b.length;c+=1)if(/^[\d\._]+$/.test(b[c]))return b[c];return(a=F(a.a,/(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/,2))?a:"Unknown"}function F(a,b,c){return(a=a.match(b))&&a[c]?a[c]:""}function G(a){if(a.documentMode)return a.documentMode};function la(a){this.va=a||"-"}la.prototype.f=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.va)};function H(a,b){this.J=a;this.U=4;this.K="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.K=c[1],this.U=parseInt(c[2],10))}H.prototype.getName=q("J");function I(a){return a.K+a.U}function ma(a){var b=4,c="n",d=l;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function na(a,b,c){this.c=a;this.h=b;this.M=c;this.j="wf";this.g=new la("-")}function pa(a){v(a.h,a.g.f(a.j,"loading"));J(a,"loading")}function K(a){w(a.h,a.g.f(a.j,"loading"));ia(a.h,a.g.f(a.j,"active"))||v(a.h,a.g.f(a.j,"inactive"));J(a,"inactive")}function J(a,b,c){if(a.M[b])if(c)a.M[b](c.getName(),I(c));else a.M[b]()};function L(a,b){this.c=a;this.C=b;this.s=this.c.createElement("span",{"aria-hidden":"true"},this.C)}
function M(a,b){var c=a.s,d;d=[];for(var e=b.J.split(/,\s*/),f=0;f<e.length;f++){var g=e[f].replace(/['"]/g,"");-1==g.indexOf(" ")?d.push(g):d.push("'"+g+"'")}d=d.join(",");e="normal";f=b.U+"00";"o"===b.K?e="oblique":"i"===b.K&&(e="italic");d="position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+d+";"+("font-style:"+e+";font-weight:"+f+";");ga(a.c)?c.setAttribute("style",d):c.style.cssText=
d}function N(a){t(a.c,"body",a.s)}L.prototype.remove=function(){var a=this.s;a.parentNode&&a.parentNode.removeChild(a)};function qa(a,b,c,d,e,f,g,h){this.V=a;this.ta=b;this.c=c;this.q=d;this.C=h||"BESbswy";this.k=e;this.F={};this.S=f||5E3;this.Z=g||l;this.B=this.A=l;a=new L(this.c,this.C);N(a);for(var n in O)O.hasOwnProperty(n)&&(M(a,new H(O[n],I(this.q))),this.F[O[n]]=a.s.offsetWidth);a.remove()}var O={Ea:"serif",Da:"sans-serif",Ca:"monospace"};
qa.prototype.start=function(){this.A=new L(this.c,this.C);N(this.A);this.B=new L(this.c,this.C);N(this.B);this.ya=ea();M(this.A,new H(this.q.getName()+",serif",I(this.q)));M(this.B,new H(this.q.getName()+",sans-serif",I(this.q)));ra(this)};function sa(a,b,c){for(var d in O)if(O.hasOwnProperty(d)&&b===a.F[O[d]]&&c===a.F[O[d]])return k;return p}
function ra(a){var b=a.A.s.offsetWidth,c=a.B.s.offsetWidth;b===a.F.serif&&c===a.F["sans-serif"]||a.k.T&&sa(a,b,c)?ea()-a.ya>=a.S?a.k.T&&sa(a,b,c)&&(a.Z===l||a.Z.hasOwnProperty(a.q.getName()))?P(a,a.V):P(a,a.ta):setTimeout(s(function(){ra(this)},a),25):P(a,a.V)}function P(a,b){a.A.remove();a.B.remove();b(a.q)};function R(a,b,c,d){this.c=b;this.t=c;this.N=0;this.ca=this.Y=p;this.S=d;this.k=a.k}function ta(a,b,c,d,e){if(0===b.length&&e)K(a.t);else{a.N+=b.length;e&&(a.Y=e);for(e=0;e<b.length;e++){var f=b[e],g=c[f.getName()],h=a.t,n=f;v(h.h,h.g.f(h.j,n.getName(),I(n).toString(),"loading"));J(h,"fontloading",n);(new qa(s(a.ha,a),s(a.ia,a),a.c,f,a.k,a.S,d,g)).start()}}}
R.prototype.ha=function(a){var b=this.t;w(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"loading"));w(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"inactive"));v(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"active"));J(b,"fontactive",a);this.ca=k;ua(this)};R.prototype.ia=function(a){var b=this.t;w(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"loading"));ia(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"active"))||v(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"inactive"));J(b,"fontinactive",a);ua(this)};
function ua(a){0==--a.N&&a.Y&&(a.ca?(a=a.t,w(a.h,a.g.f(a.j,"loading")),w(a.h,a.g.f(a.j,"inactive")),v(a.h,a.g.f(a.j,"active")),J(a,"active")):K(a.t))};function S(a,b,c){this.G=a;this.W=b;this.a=c;this.O=this.P=0}function T(a,b){U.W.$[a]=b}S.prototype.load=function(a){var b=a.context||this.G;this.c=new fa(this.G,b);b=new na(this.c,b.document.documentElement,a);if(this.a.k.w){var c=this.W,d=this.c,e=[],f;for(f in a)if(a.hasOwnProperty(f)){var g=c.$[f];g&&e.push(g(a[f],d))}a=a.timeout;this.O=this.P=e.length;a=new R(this.a,this.c,b,a);f=0;for(c=e.length;f<c;f++)d=e[f],d.v(this.a,s(this.ua,this,d,b,a))}else K(b)};
S.prototype.ua=function(a,b,c,d){var e=this;d?a.load(function(a,d,h){var n=0==--e.P;n&&pa(b);setTimeout(function(){ta(c,a,d||{},h||l,n)},0)}):(a=0==--this.P,this.O--,a&&(0==this.O?K(b):pa(b)),ta(c,[],{},l,a))};var va=window,wa=(new C(navigator.userAgent,document)).parse(),U=va.WebFont=new S(window,new function(){this.$={}},wa);U.load=U.load;function V(a,b){this.c=a;this.d=b}V.prototype.load=function(a){var b,c,d=this.d.urls||[],e=this.d.families||[];b=0;for(c=d.length;b<c;b++)t(this.c,"head",u(this.c,d[b]));d=[];b=0;for(c=e.length;b<c;b++){var f=e[b].split(":");if(f[1])for(var g=f[1].split(","),h=0;h<g.length;h+=1)d.push(new H(f[0],g[h]));else d.push(new H(f[0]))}a(d)};V.prototype.v=function(a,b){return b(a.k.w)};T("custom",function(a,b){return new V(b,a)});function W(a,b){this.c=a;this.d=b}var xa={regular:"n4",bold:"n7",italic:"i4",bolditalic:"i7",r:"n4",b:"n7",i:"i4",bi:"i7"};W.prototype.v=function(a,b){return b(a.k.w)};W.prototype.load=function(a){t(this.c,"head",u(this.c,x(this.c)+"//webfonts.fontslive.com/css/"+this.d.key+".css"));for(var b=this.d.families,c=[],d=0,e=b.length;d<e;d++)c.push.apply(c,ya(b[d]));a(c)};
function ya(a){var b=a.split(":");a=b[0];if(b[1]){for(var c=b[1].split(","),b=[],d=0,e=c.length;d<e;d++){var f=c[d];if(f){var g=xa[f];b.push(g?g:f)}}c=[];for(d=0;d<b.length;d+=1)c.push(new H(a,b[d]));return c}return[new H(a)]}T("ascender",function(a,b){return new W(b,a)});function X(a,b,c){this.a=a;this.c=b;this.d=c;this.m=[]}
X.prototype.v=function(a,b){var c=this,d=c.d.projectId,e=c.d.version;if(d){var f=c.c.u,g=c.c.createElement("script");g.id="__MonotypeAPIScript__"+d;var h=p;g.onload=g.onreadystatechange=function(){if(!h&&(!this.readyState||"loaded"===this.readyState||"complete"===this.readyState)){h=k;if(f["__mti_fntLst"+d]){var e=f["__mti_fntLst"+d]();if(e)for(var m=0;m<e.length;m++)c.m.push(new H(e[m].fontfamily))}b(a.k.w);g.onload=g.onreadystatechange=l}};g.src=c.D(d,e);t(this.c,"head",g)}else b(k)};
X.prototype.D=function(a,b){var c=x(this.c),d=(this.d.api||"fast.fonts.com/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return c+"//"+d+"/"+a+".js"+(b?"?v="+b:"")};X.prototype.load=function(a){a(this.m)};T("monotype",function(a,b){var c=(new C(navigator.userAgent,document)).parse();return new X(c,b,a)});function Y(a,b){this.c=a;this.d=b;this.m=[]}Y.prototype.D=function(a){var b=x(this.c);return(this.d.api||b+"//use.typekit.net")+"/"+a+".js"};
Y.prototype.v=function(a,b){var c=this.d.id,d=this.d,e=this.c.u,f=this;c?(e.__webfonttypekitmodule__||(e.__webfonttypekitmodule__={}),e.__webfonttypekitmodule__[c]=function(c){c(a,d,function(a,c,d){for(var e=0;e<c.length;e+=1){var g=d[c[e]];if(g)for(var Q=0;Q<g.length;Q+=1)f.m.push(new H(c[e],g[Q]));else f.m.push(new H(c[e]))}b(a)})},c=ha(this.c,this.D(c)),t(this.c,"head",c)):b(k)};Y.prototype.load=function(a){a(this.m)};T("typekit",function(a,b){return new Y(b,a)});function za(a,b,c){this.L=a?a:b+Aa;this.p=[];this.Q=[];this.da=c||""}var Aa="//fonts.googleapis.com/css";za.prototype.f=function(){if(0==this.p.length)throw Error("No fonts to load !");if(-1!=this.L.indexOf("kit="))return this.L;for(var a=this.p.length,b=[],c=0;c<a;c++)b.push(this.p[c].replace(/ /g,"+"));a=this.L+"?family="+b.join("%7C");0<this.Q.length&&(a+="&subset="+this.Q.join(","));0<this.da.length&&(a+="&text="+encodeURIComponent(this.da));return a};function Ba(a){this.p=a;this.aa=[];this.I={}}
var Ca={latin:"BESbswy",cyrillic:"&#1081;&#1103;&#1046;",greek:"&#945;&#946;&#931;",khmer:"&#x1780;&#x1781;&#x1782;",Hanuman:"&#x1780;&#x1781;&#x1782;"},Da={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ea={i:"i",italic:"i",n:"n",normal:"n"},Fa=RegExp("^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$");
Ba.prototype.parse=function(){for(var a=this.p.length,b=0;b<a;b++){var c=this.p[b].split(":"),d=c[0].replace(/\+/g," "),e=["n4"];if(2<=c.length){var f;var g=c[1];f=[];if(g)for(var g=g.split(","),h=g.length,n=0;n<h;n++){var m;m=g[n];if(m.match(/^[\w]+$/)){m=Fa.exec(m.toLowerCase());var r=j;if(m==l)r="";else{r=j;r=m[1];if(r==l||""==r)r="4";else var oa=Da[r],r=oa?oa:isNaN(r)?"4":r.substr(0,1);r=[m[2]==l||""==m[2]?"n":Ea[m[2]],r].join("")}m=r}else m="";m&&f.push(m)}0<f.length&&(e=f);3==c.length&&(c=c[2],
f=[],c=!c?f:c.split(","),0<c.length&&(c=Ca[c[0]])&&(this.I[d]=c))}this.I[d]||(c=Ca[d])&&(this.I[d]=c);for(c=0;c<e.length;c+=1)this.aa.push(new H(d,e[c]))}};function Z(a,b,c){this.a=a;this.c=b;this.d=c}var Ga={Arimo:k,Cousine:k,Tinos:k};Z.prototype.v=function(a,b){b(a.k.w)};Z.prototype.load=function(a){var b=this.c;if("MSIE"==this.a.getName()&&this.d.blocking!=k){var c=s(this.X,this,a),d=function(){b.z.body?c():setTimeout(d,0)};d()}else this.X(a)};
Z.prototype.X=function(a){for(var b=this.c,c=new za(this.d.api,x(b),this.d.text),d=this.d.families,e=d.length,f=0;f<e;f++){var g=d[f].split(":");3==g.length&&c.Q.push(g.pop());var h="";2==g.length&&""!=g[1]&&(h=":");c.p.push(g.join(h))}d=new Ba(d);d.parse();t(b,"head",u(b,c.f()));a(d.aa,d.I,Ga)};T("google",function(a,b){var c=(new C(navigator.userAgent,document)).parse();return new Z(c,b,a)});function $(a,b){this.c=a;this.d=b;this.m=[]}$.prototype.D=function(a){return x(this.c)+(this.d.api||"//f.fontdeck.com/s/css/js/")+(this.c.u.location.hostname||this.c.G.location.hostname)+"/"+a+".js"};
$.prototype.v=function(a,b){var c=this.d.id,d=this.c.u,e=this;c?(d.__webfontfontdeckmodule__||(d.__webfontfontdeckmodule__={}),d.__webfontfontdeckmodule__[c]=function(a,c){for(var d=0,n=c.fonts.length;d<n;++d){var m=c.fonts[d];e.m.push(new H(m.name,ma("font-weight:"+m.weight+";font-style:"+m.style)))}b(a)},c=ha(this.c,this.D(c)),t(this.c,"head",c)):b(k)};$.prototype.load=function(a){a(this.m)};T("fontdeck",function(a,b){return new $(b,a)});window.WebFontConfig&&U.load(window.WebFontConfig);
})(this,document);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//









