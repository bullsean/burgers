var connection = require("../config/connection.js");

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ??;';
        connection.query(queryString, [tableInput], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(tableInput, col, val, cb) {
        var queryString = 'INSERT INTO ?? (??) VALUES (?)';
        connection.query(queryString, [tableInput, col, val], function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });

    },
    updateOne: function(table, colVal, condition, cb) {
        var queryString = 'UPDATE ?? SET ?? WHERE ?';
        connection.query(queryString, [table, colVal, condition], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;
