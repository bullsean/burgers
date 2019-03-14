var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}
var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = 'SELECT * FROM ??;';
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function (tableInput, col, val, cb) {
        var queryString = "INSERT INTO " + tableInput;

        queryString += " (";
        queryString += col.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(val.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, val, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });

    },
    updateOne: function (table, colVal, condition, cb) {

        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += colVal;
        queryString += " WHERE ";
        queryString += condition;
        console.log(queryString)
        console.log(table, objToSql(colVal), condition)
        connection.query(queryString, function (err, result) {
            if (err) {
                console.log(err)
                throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;
