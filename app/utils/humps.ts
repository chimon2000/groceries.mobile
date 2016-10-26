interface HumpOptions {
    separator?: string,
    split?: RegExp,
    process?: string
}

let _processKeys = function (convert, obj, options?: HumpOptions) {
    if (!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj)) {
        return obj;
    }

    let output,
        i = 0,
        l = 0;

    if (_isArray(obj)) {
        output = [];
        for (l = obj.length; i < l; i++) {
            output.push(_processKeys(convert, obj[i], options));
        }
    }
    else {
        output = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                output[convert(key, options)] = _processKeys(convert, obj[key], options);
            }
        }
    }
    return output;
};

// String conversion methods

let separateWords = function (string, options: HumpOptions = {}) {
    let {separator = '_', split = /(?=[A-Z])/} = options;

    return string.split(split).join(separator);
};

let camelize = function (string) {
    if (_isNumerical(string)) {
        return string;
    }
    string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.substr(0, 1).toLowerCase() + string.substr(1);
};

let pascalize = function (string) {
    let camelized = camelize(string);
    // Ensure 1st char is always uppercase
    return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
};

let decamelize = function (string, options?: HumpOptions) {
    return separateWords(string, options).toLowerCase();
};

// Utilities
// Taken from Underscore.js

var getType = Object.prototype.toString;

let _isObject = function (obj) {
    return obj === Object(obj);
};
let _isArray = function (obj) {
    return getType.call(obj) == '[object Array]';
};
let _isDate = function (obj) {
    return getType.call(obj) == '[object Date]';
};
let _isRegExp = function (obj) {
    return getType.call(obj) == '[object RegExp]';
};
let _isBoolean = function (obj) {
    return getType.call(obj) == '[object Boolean]';
};

// Performant way to determine if obj coerces to a number
let _isNumerical = function (obj) {
    obj = obj - 0;
    return obj === obj;
};

// Sets up function which handles processing keys
// allowing the convert function to be modified by a callback
let _processor = function (convert, options): any {
    let callback = options && 'process' in options ? options.process : options;

    if (typeof (callback) !== 'function') {
        return convert;
    }

    return function (string, options?: HumpOptions) {
        return callback(string, convert, options);
    }
};

export var humps = {
    camelize: camelize,
    decamelize: decamelize,
    pascalize: pascalize,
    depascalize: decamelize,
    camelizeKeys: function (object, options?) {
        return _processKeys(_processor(camelize, options), object);
    },
    decamelizeKeys: function (object, options?) {
        return _processKeys(_processor(decamelize, options), object, options);
    },
    pascalizeKeys: function (object, options?) {
        return _processKeys(_processor(pascalize, options), object);
    },
    depascalizeKeys: function () {
        return this.decamelizeKeys.apply(this, arguments);
    }
};