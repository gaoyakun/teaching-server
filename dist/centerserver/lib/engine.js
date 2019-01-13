"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const utils_1 = require("../common/utils");
const errcodes_1 = require("../common/errcodes");
class Engine {
    constructor(options) {
        this.options = options;
        //options.debug = true;
        this.pool = mysql.createPool(this.options);
    }
    static getInstance(name) {
        return this.engineMap[name] || null;
    }
    static registerInstance(name, engine) {
        if (name && engine && !this.engineMap[name]) {
            this.engineMap[name] = engine;
            return true;
        }
        return false;
    }
    static unregisterInstance(name) {
        if (this.engineMap[name]) {
            delete this.engineMap[name];
        }
    }
    static checkResult(err, result, callback) {
        if (err) {
            utils_1.Utils.debugOut('' + err, 1);
            return callback && callback(errcodes_1.ErrorCode.kDatabaseError);
        }
        else {
            return callback && callback(errcodes_1.ErrorCode.kSuccess, result);
        }
    }
    static createConnection(options) {
        return mysql.createConnection(options);
    }
    static query_wo_pool(conn, q) {
        let sql;
        let param;
        if (utils_1.Utils.isString(q)) {
            sql = q;
            param = [];
        }
        else if (utils_1.Utils.isObject(q)) {
            sql = q.sql;
            param = q.param || [];
        }
        else {
            throw new Error('[query_wo_pool]: invalid parameter');
        }
        console.log('SQL: ' + sql);
        const promise = new Promise((resolve, reject) => {
            conn.query(sql, param, (err, rows) => {
                if (err) {
                    reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kDatabaseError]));
                }
                else {
                    resolve(rows);
                }
            });
        });
        return promise;
    }
    static col(column, tableName) {
        if (!utils_1.Utils.isString(column) || (tableName && !utils_1.Utils.isString(tableName))) {
            throw new Error(`Invalid column definition: ${column}, ${tableName}`);
        }
        return new Engine.Col(1, column, tableName, null, null);
    }
    static agg(field, func) {
        return new Engine.Col(2, null, null, func, field);
    }
    static count(field) {
        return this.agg(field, 'count');
    }
    static sum(field) {
        return this.agg(field, 'sum');
    }
    static anyValue(field) {
        return this.onlyFullGroupBy ? this.agg(field, 'any_value') : field;
    }
    ;
    static parseField(item, defTableName) {
        if (utils_1.Utils.isString(item)) {
            return `\`${item}\``;
        }
        else if (utils_1.Utils.isFunction(item)) {
            let f = new item();
            if (f.type === 1) {
                let tableName = f.table || defTableName;
                let colname = f.column === '*' ? f.column : `\`${f.column}\``;
                return `\`${tableName}\`.${colname}`;
            }
            else if (f.type === 2) {
                if (utils_1.Utils.isUndefined(f.field)) {
                    return `${f.aggfunc}(*)`;
                }
                else if (utils_1.Utils.isNull(f.field)) {
                    return `${f.aggfunc}(NULL)`;
                }
                else if (utils_1.Utils.isString(f.field)) {
                    return `${f.aggfunc}(\`${f.field}\`)`;
                }
                else if (utils_1.Utils.isFunction(f.field)) {
                    return `${f.aggfunc}(${Engine.parseField(f.field, defTableName)})`;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        else if (utils_1.Utils.isArray(item) && item.length === 2) {
            let field = this.parseField(item[0], defTableName);
            if (field == null) {
                return null;
            }
            return `${field} as ${item[1]}`;
        }
        else {
            return null;
        }
    }
    close() {
        return new Promise((resolve, reject) => {
            if (this.pool) {
                this.pool.end(err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve('Ok');
                    }
                });
            }
            else {
                resolve('Ok');
            }
        });
    }
    getConnection() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kDatabaseError]));
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
    releaseConnection(connection) {
        if (connection) {
            connection.release();
        }
    }
    beginSession() {
        return new Promise((resolve, reject) => {
            let session = new Engine.Session(this);
            session.begin().then(value => resolve(session)).catch(reason => reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kDatabaseError])));
        });
    }
    ;
    objects(tableName) {
        return new Engine.Session(this).objects(tableName);
    }
    ;
    query(q) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.getConnection();
            const result = yield Engine.query_wo_pool(conn, q);
            this.releaseConnection(conn);
            return result;
        });
    }
}
Engine.engineMap = {};
Engine.onlyFullGroupBy = false;
exports.Engine = Engine;
(function (Engine) {
    class Col {
        constructor(type, column, table, aggfunc, aggfield) {
            this.type = type;
            this.column = column;
            this.table = table;
            this.aggfunc = aggfunc;
            this.aggfield = aggfield;
        }
    }
    Engine.Col = Col;
    class DBQueryContext {
        constructor(objects) {
            this._objects = objects;
            this._joins = [];
            this._fields = [];
            this._orderby = [];
            this._groupby = [];
            this._orderDesc = false;
            this._filters = null;
            this._offset = null;
            this._limit = null;
        }
        all() {
            return __awaiter(this, void 0, void 0, function* () {
                let fields = [];
                let orderby = [];
                let groupby = [];
                let params = [];
                this._fields.forEach(item => {
                    let field = Engine.parseField(item, this._objects.tableName);
                    if (field == null) {
                        throw new Error(`[Engine.DBQueryContext.all]: invalid field: ${item}`);
                    }
                    fields.push(field);
                });
                fields = fields.length === 0 ? '*' : fields.join(',');
                this._orderby.forEach(item => {
                    let field = Engine.parseField(item, this._objects.tableName);
                    if (field == null) {
                        throw new Error(`[Engine.DBQueryContext.all]: Invalid field: ${item}`);
                    }
                    orderby.push(field);
                });
                orderby = orderby.length === 0 ? '' : `order by ${orderby.join(',')}`;
                if (orderby !== '' && this._orderDesc) {
                    orderby += ' desc';
                }
                this._groupby.forEach(item => {
                    let field = Engine.parseField(item, this._objects.tableName);
                    if (field == null) {
                        throw new Error(`[Engine.DBQueryContext.all]: Invalid field: ${item}`);
                    }
                    groupby.push(field);
                });
                groupby = groupby.length === 0 ? '' : `group by ${groupby.join(',')}`;
                let limit = '';
                if (this._limit != null) {
                    limit = this._offset != null ? `limit ${this._offset}, ${this._limit}` : `limit ${this._limit}`;
                }
                let join = this._parseJoin(this._joins, params);
                let filter = this._filters ? `where ${this._parseFilter(this._filters, params)}` : '';
                let sql = `SELECT ${fields} FROM \`${this._objects.tableName}\` ${join} ${filter} ${groupby} ${orderby} ${limit}`;
                return yield this._objects.session.query({
                    sql: sql,
                    param: params
                });
            });
        }
        update(keys, values) {
            return __awaiter(this, void 0, void 0, function* () {
                let fields = [];
                let params = [];
                if (!utils_1.Utils.isArray(keys)) {
                    keys = [keys];
                }
                if (!utils_1.Utils.isArray(values)) {
                    values = [values];
                }
                if (keys.length !== values.length || keys.length === 0) {
                    throw new Error('[Engine.DBQueryContext.update]: Invalid keys or values');
                }
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    let field = Engine.parseField(key, this._objects.tableName);
                    if (field == null) {
                        throw new Error('[Engine.DBQueryContext.update]: Invalid update field');
                    }
                    fields.push(`${field}=?`);
                    params.push(values[i]);
                }
                if (fields.length === 0) {
                    throw new Error('[Engine.DBQueryContext.update]:fields length is 0');
                }
                fields = `SET ${fields.join(',')}`;
                let join = this._parseJoin(this._joins, params);
                let filter = this._filters ? `where ${this._parseFilter(this._filters, params)}` : '';
                let sql = `UPDATE \`${this._objects.tableName}\` ${join} ${fields} ${filter}`;
                return yield this._objects.session.query({
                    sql: sql,
                    param: params
                });
            });
        }
        delete(tables) {
            return __awaiter(this, void 0, void 0, function* () {
                if (tables == null) {
                    tables = [this._objects.tableName];
                    if (this._joins) {
                        this._joins.forEach(item => {
                            tables.push(`\`${item.table}\``);
                        });
                    }
                }
                let tableName = tables.length > 0 ? tables.join(',') : null;
                if (tableName == null) {
                    throw new Error(`[Engine.DBQueryContext.delete]: Invalid tables: ${tables}`);
                }
                let params = [];
                let join = this._parseJoin(this._joins, params);
                let filter = this._filters ? `where ${this._parseFilter(this._filters, params)}` : '';
                let sql = `DELETE ${tableName} FROM \`${this._objects.tableName}\` ${join} ${filter}`;
                console.log(sql);
                return yield this._objects.session.query({
                    sql: sql,
                    param: params
                });
            });
        }
        orderBy(fields, bDesc) {
            if (utils_1.Utils.isString(fields)) {
                fields = [fields];
            }
            this._orderby = this._orderby.concat(fields);
            this._orderDesc = !!bDesc;
            return this;
        }
        groupBy(fields) {
            if (utils_1.Utils.isString(fields)) {
                fields = [fields];
            }
            this._groupby = this._groupby.concat(fields);
            return this;
        }
        limit(offset, limit) {
            if (utils_1.Utils.isUndefined(limit)) {
                limit = offset;
                offset = null;
            }
            this._offset = utils_1.Utils.safeParseInt(offset);
            this._limit = utils_1.Utils.safeParseInt(limit);
            return this;
        }
        filter(filter) {
            if (filter) {
                if (this._filters) {
                    this._filters = {
                        and: [this._filters, filter]
                    };
                }
                else {
                    this._filters = filter;
                }
            }
            return this;
        }
        _parseFilter(filter, param) {
            if (utils_1.Utils.isObject(filter)) {
                let keys = Object.keys(filter);
                if (Object.keys(filter).length !== 1) {
                    throw new Error('[Engine.DBQueryContext._parseFilter]: Invalid filter');
                }
                let subFilters = [];
                let filterValue = filter[keys[0]];
                if (utils_1.Utils.isArray(filterValue)) {
                    filterValue.forEach((item) => {
                        subFilters.push(`(${this._parseFilter(item, param)})`);
                    });
                }
                else {
                    subFilters.push(this._parseFilter(filterValue, param));
                }
                if (subFilters.length === 1) {
                    return `${keys[0]} (${subFilters[0]})`;
                }
                else {
                    return subFilters.join(` ${keys[0]} `);
                }
            }
            else if (utils_1.Utils.isFunction(filter)) {
                let f = new filter();
                return `${Engine.parseField(f.field, param)} ${f.postfix}`;
            }
            else if (utils_1.Utils.isArray(filter)) {
                if (filter.length === 0) {
                    throw new Error('[Engine.DBQueryContext._parseFilter]: Invalid filter');
                }
                if (utils_1.Utils.isString(filter[0]) || utils_1.Utils.isFunction(filter[0]) || utils_1.Utils.isNumber(filter[0])) {
                    let field = Engine.parseField(filter[0], this._objects.tableName);
                    if (field == null) {
                        throw new Error('[Engine.DBQueryContext._parseFilter]: Invalid filter');
                    }
                    if (filter.length !== 2) {
                        throw new Error('[Engine.DBQueryContext._parseFilter]: Invalid filter');
                    }
                    if (utils_1.Utils.isObject(filter[1])) {
                        let keys = Object.keys(filter[1]);
                        if (keys.length !== 1 || !utils_1.Utils.isString(keys[0])) {
                            throw new Error('[Engine.DBQueryContext._parseFilter]: Invalid filter');
                        }
                        let key = utils_1.Utils.mergeBlank(utils_1.Utils.trim(keys[0].toLowerCase()));
                        if (key === 'between' || key === 'not between') {
                            let value = filter[1][keys[0]];
                            if (!utils_1.Utils.isArray(value) || value.length !== 2) {
                                throw new Error('[Engine.DBQueryContext._parseFilter]: Invalid filter');
                            }
                            param.push(value[0]);
                            param.push(value[1]);
                            return `${field} ${key} ? and ?`;
                        }
                        else if (key === 'in') {
                            let value = filter[1][keys[0]];
                            if (!utils_1.Utils.isArray(value)) {
                                throw new Error('[Engine.DBQueryContext._parseFilter]: Invalid filter');
                            }
                            let tmp = [];
                            value.forEach((item) => {
                                tmp.push('?');
                                param.push(item);
                            });
                            return `${field} in (${tmp.join(',')})`;
                        }
                        else {
                            param.push(filter[1][keys[0]]);
                            return `${field} ${key} ?`;
                        }
                    }
                    else if (utils_1.Utils.isFunction(filter[1])) {
                        let f1 = Engine.parseField(filter[1], this._objects.tableName);
                        if (f1 == null) {
                            throw new Error(`'[Engine.DBQueryContext._parseFilter]: Invalid field: ${filter[1]}`);
                        }
                        return `${field} = ${f1}`;
                    }
                    else {
                        param.push(filter[1]);
                        return `${field} = ?`;
                    }
                }
                else {
                    return this._parseFilter({ and: filter }, param);
                }
            }
            else {
                throw new Error('[Engine.DBQueryContext._parseFilter]: Invalid filter');
            }
        }
        _join(tableName, type, on) {
            this._joins.push({
                table: tableName,
                type: type,
                on: on
            });
            return this;
        }
        _parseJoin(joins, param) {
            let result = '';
            joins.forEach((item) => {
                result += `${item.type} ${item.table} on ${this._parseFilter(item.on, param)} `;
            });
            return result;
        }
        leftJoin(tableName, on) {
            return this._join(tableName, 'left join', on);
        }
        innerJoin(tableName, on) {
            return this._join(tableName, 'inner join', on);
        }
        rightJoin(tableName, on) {
            return this._join(tableName, 'right join', on);
        }
        fields(fields) {
            if (!utils_1.Utils.isArray(fields)) {
                fields = [fields];
            }
            this._fields = fields;
            return this;
        }
    }
    Engine.DBQueryContext = DBQueryContext;
    class DBObjects {
        constructor(session, tableName) {
            this.session = session;
            this.tableName = tableName;
        }
        all() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield new Engine.DBQueryContext(this).all();
            });
        }
        delete(tables) {
            return __awaiter(this, void 0, void 0, function* () {
                if (utils_1.Utils.isNull(tables)) {
                    return yield new Engine.DBQueryContext(this).delete(null);
                }
                else if (utils_1.Utils.isArray(tables)) {
                    return yield new Engine.DBQueryContext(this).delete(tables);
                }
                else if (utils_1.Utils.isString(tables)) {
                    return yield new Engine.DBQueryContext(this).delete([tables]);
                }
                else {
                    throw new Error(`[Engine.DBObjects.delete]: Invalid table names: ${tables}`);
                }
            });
        }
        orderBy(fields, bDesc) {
            return new Engine.DBQueryContext(this).orderBy(fields, bDesc);
        }
        groupBy(fields) {
            return new Engine.DBQueryContext(this).groupBy(fields);
        }
        limit(offset, limit) {
            return new Engine.DBQueryContext(this).limit(offset, limit);
        }
        filter(filter) {
            return new Engine.DBQueryContext(this).filter(filter);
        }
        innerJoin(tableName, on) {
            return new Engine.DBQueryContext(this).innerJoin(tableName, on);
        }
        leftJoin(tableName, on) {
            return new Engine.DBQueryContext(this).leftJoin(tableName, on);
        }
        rightJoin(tableName, on) {
            return new Engine.DBQueryContext(this).rightJoin(tableName, on);
        }
        fields(fields) {
            return new Engine.DBQueryContext(this).fields(fields);
        }
        update(keys, values) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield new Engine.DBQueryContext(this).update(keys, values);
            });
        }
        add(obj, options) {
            return __awaiter(this, void 0, void 0, function* () {
                options = options || {};
                if (!utils_1.Utils.isArray(obj)) {
                    obj = [obj];
                }
                let fields = [];
                let values = [];
                let params = [];
                let ondup = [];
                for (let field in obj[0]) {
                    fields.push(`\`${field}\``);
                    if (options.allowUpdate) {
                        ondup.push(`\`${field}\`=values(\`${field}\`)`);
                    }
                }
                obj.forEach((item) => {
                    let value = [];
                    fields.forEach((f) => {
                        value.push('?');
                        params.push(item[f.substr(1, f.length - 2)]);
                    });
                    values.push(`(${value.join(',')})`);
                });
                fields = '(' + fields.join(',') + ')';
                values = values.join(',');
                ondup = ondup.length > 0 ? `ON DUPLICATE KEY UPDATE ${ondup.join(',')}` : '';
                let sql = `INSERT INTO \`${this.tableName}\` ${fields} VALUES ${values} ${ondup}`;
                return yield this.session.query({
                    sql: sql,
                    param: params
                });
            });
        }
    }
    Engine.DBObjects = DBObjects;
    class Session {
        constructor(engine) {
            this.engine = engine;
            this.connection = null;
        }
        begin() {
            return new Promise((resolve, reject) => {
                this.engine.getConnection().then(conn => {
                    this.connection = conn;
                    this.connection.beginTransaction(err => {
                        if (err) {
                            this.engine.releaseConnection(this.connection);
                            this.connection = null;
                            reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kDatabaseError]));
                        }
                        else {
                            resolve();
                        }
                    });
                }, (reason) => {
                    reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kDatabaseError]));
                });
            });
        }
        end() {
            return new Promise((resolve, reject) => {
                if (this.connection != null) {
                    this.connection.commit(err => {
                        if (err) {
                            reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kDatabaseError]));
                        }
                        else {
                            this.engine.releaseConnection(this.connection);
                            this.connection = null;
                            resolve();
                        }
                    });
                }
                else {
                    reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kDatabaseError]));
                }
            });
        }
        ;
        cancel() {
            if (this.connection != null) {
                this.connection.rollback();
                this.engine.releaseConnection(this.connection);
                this.connection = null;
            }
        }
        ;
        objects(tableName) {
            return new Engine.DBObjects(this, tableName);
        }
        ;
        query(q) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.connection) {
                    return yield Engine.query_wo_pool(this.connection, q);
                }
                else {
                    return yield this.engine.query(q);
                }
            });
        }
        ;
    }
    Engine.Session = Session;
})(Engine = exports.Engine || (exports.Engine = {}));
/*
    Engine.isNull = function Engine_isNull(field) {
        return function() {
            this.postfix = 'is null';
            this.field = field;
        };
    };

    Engine.notNull = function Engine_notNull(filter) {
        return function() {
            this.postfix = 'is not null';
            this.field = filter;
        };
    };

    Engine.parseField = function Engine_parseField (item, defTableName) {
        if (utils.isString(item)) {
            return `\`${item}\``;
        } else if (utils.isFunction(item)) {
            let f = new item();
            if (f.type == 1) {
                let tableName = f.table || defTableName;
                let colname = f.column=='*' ? f.column : `\`${f.column}\``;
                return `\`${tableName}\`.${colname}`;
            } else if (f.type == 2) {
                if (utils.isUndefined(f.field)) {
                    return `${f.aggfunc}(*)`;
                } else if (utils.isNull(f.field)) {
                    return `${f.aggfunc}(NULL)`;
                } else if (utils.isString(f.field)) {
                    return `${f.aggfunc}(\`${f.field}\`)`;
                } else if (utils.isFunction(f.field)) {
                    return `${f.aggfunc}(${Engine.parseField(f.field, defTableName)})`;
                }
            }
        } else if (utils.isArray(item) && item.length == 2){
            let field = Engine.parseField (item[0], defTableName);
            if (field == null) {
                return null;
            }
            return `${field} as ${item[1]}`;
        } else {
            return null;
        }
    };

    const EngineSession = function (engine) {
        this.engine = engine;
        this.connection = null;
    };

    EngineSession.prototype.begin = function EngineSession_begin (callback) {
        if (this.engine != null && this.connection == null) {
            this.engine.getConnection ((err, conn)=>{
                if (err || !conn) {
                    callback && callback (errcodes.kDatabaseError);
                } else {
                    this.connection = conn;
                    this.connection.beginTransaction(err=>{
                        if (err) {
                            this.engine.releaseConnection(this.connection);
                            this.connection = null;
                            callback && callback (errcodes.kDatabaseError);
                        } else {
                            callback && callback (errcodes.kSuccess);
                        }
                    });
                }
            });
        } else {
            callback && callback (errcodes.kDatabaseError);
        }
    };

    EngineSession.prototype.end = function EngineSession_end (callback) {
        if (this.connection != null) {
            this.connection.commit(err=>{
                if (err) {
                    this.cancel();
                } else {
                    let code = err ? errcodes.kDatabaseError : errcodes.kSuccess;
                    this.engine.releaseConnection(this.connection);
                    this.connection = null;
                    callback && callback (code);
                }
            });
        } else {
            callback && callback (errcodes.kDatabaseError);
        }
    };

    EngineSession.prototype.cancel = function EngineSession_end () {
        if (this.connection != null) {
            this.connection.rollback();
            this.engine.releaseConnection(this.connection);
            this.connection = null;
        }
    };

    EngineSession.prototype.objects = function EngineSession_objects (tableName) {
        return new DBObjects(this, tableName);
    };

    EngineSession.prototype.query = function EngineSession_query (q, callback) {
        if (this.connection) {
            let queryHistory = Engine.connectionsInUse[this.connection];
            if (queryHistory) {
                queryHistory.push (q);
            }
            Engine.query_wo_pool (this.connection, q, callback);
        } else {
            this.engine.query (q, callback);
        }
    };

    Engine.prototype.beginSession = function Engine_beginSession (callback) {
        let session = new EngineSession(this);
        session.begin (err=>{
            if (err != errcodes.kSuccess) {
                callback (null);
            } else {
                callback (session);
            }
        });
    };

    const DBObjects = function (session, tableName) {
        this.session = session;
        this.tableName = tableName;
    };

    DBObjects.prototype.all = function DBObjects_all (callback) {
        new DBQueryContext(this).all(callback);
    };

    DBObjects.prototype.delete = function DBObjects_delete (tables, callback) {
        if (utils.isFunction(tables)) {
            return new DBQueryContext(this).delete(null, tables);
        } else if (utils.isArray(tables)) {
            return new DBQueryContext(this).delete(tables, callback);
        } else if (utils.isString(tables)) {
            return new DBQueryContext(this).delete([tables], callback);
        } else {
            Engine.checkResult(`Invalid table names: ${tables}`);
        }
    };

    DBObjects.prototype.orderBy = function DBObjects_orderBy (fields, bDesc) {
        return new DBQueryContext(this).orderBy (fields, bDesc);
    };

    DBObjects.prototype.groupBy = function DBObjects_groupBy (fields) {
        return new DBQueryContext(this).groupBy (fields);
    };

    DBObjects.prototype.limit = function DBObjects_limit (offset, limit) {
        return new DBQueryContext(this).limit (offset, limit);
    };

    DBObjects.prototype.filter = function DBObjects_filter (filter) {
        return new DBQueryContext(this).filter(filter);
    };

    DBObjects.prototype.innerJoin = function DBObjects_innerJoin (tableName, on) {
        return new DBQueryContext(this).innerJoin(tableName, on);
    };

    DBObjects.prototype.leftJoin = function DBObjects_leftJoin (tableName, on) {
        return new DBQueryContext(this).leftJoin(tableName, on);
    };

    DBObjects.prototype.rightJoin = function DBObjects_rightJoin (tableName, on) {
        return new DBQueryContext(this).rightJoin(tableName, on);
    };

    DBObjects.prototype.fields = function DBObjects_fields (fields) {
        return new DBQueryContext(this).fields(fields);
    };

    DBObjects.prototype.update = function DBObjects_update (keys, values, callback) {
        new DBQueryContext(this).update(keys, values, callback);
    };

    DBObjects.prototype.add = function DBObjects_add (obj, options, callback) {
        options = options || {};
        if (!utils.isArray(obj)) {
            obj = [ obj ];
        }
        let fields = [];
        let values = [];
        let params = [];
        let ondup = [];
        for (let field in obj[0]) {
            fields.push (`\`${field}\``);
            if (options.allowUpdate) {
                ondup.push (`\`${field}\`=values(\`${field}\`)`);
            }
        }

        obj.forEach (item=>{
            let value = [];
            fields.forEach (f=>{
                value.push ('?');
                params.push (item[f.substr(1,f.length-2)]);
            });
            values.push (`(${value.join(',')})`);
        });

        fields = '(' + fields.join(',') + ')';
        values = values.join(',');
        ondup = ondup.length > 0 ? `ON DUPLICATE KEY UPDATE ${ondup.join(',')}` : '';

        let sql = `INSERT INTO \`${this.tableName}\` ${fields} VALUES ${values} ${ondup}`;
        this.session.query ({
            sql:sql,
            param:params
        }, callback);
    };

    const DBQueryContext = function (objects) {
        this._objects = objects;
        this._joins = [];
        this._fields = [];
        this._orderby = [];
        this._groupby = [];
        this._orderDesc = false;
        this._filters = null;
        this._offset = null;
        this._limit = null;
    };

    DBQueryContext.prototype.all = function DBQueryContext_all (callback) {
        let fields = [];
        let orderby = [];
        let groupby = [];
        let params = [];

        this._fields.forEach (item=>{
            let field = Engine.parseField(item, this._objects.tableName);
            if (field == null) {
                let err = `Invalid field: ${item}`;
                return Engine.checkResult(err, null, callback);
            }
            fields.push (field);
        });
        fields = fields.length == 0 ? '*' : fields.join(',');

        this._orderby.forEach (item=>{
            let field = Engine.parseField(item, this._objects.tableName);
            if (field == null) {
                let err = `Invalid field: ${item}`;
                return Engine.checkResult(err, null, callback);
            }
            orderby.push (field);
        });
        orderby = orderby.length == 0 ? '' : `order by ${orderby.join(',')}`;
        if (orderby != '' && this._orderDesc) {
            orderby += ' desc';
        }

        this._groupby.forEach (item=>{
            let field = Engine.parseField(item, this._objects.tableName);
            if (field == null) {
                let err = `Invalid field: ${item}`;
                return Engine.checkResult(err, null, callback);
            }
            groupby.push (field);
        });
        groupby = groupby.length == 0 ? '' : `group by ${groupby.join(',')}`;

        let limit = '';
        if (this._limit != null) {
            limit = this._offset != null ? `limit ${this._offset}, ${this._limit}` : `limit ${this._limit}`;
        }

        let join = this._parseJoin(this._joins, params);
        let filter = this._filters ? `where ${this._parseFilter(this._filters, params)}` : '';

        let sql = `SELECT ${fields} FROM \`${this._objects.tableName}\` ${join} ${filter} ${groupby} ${orderby} ${limit}`;
        this._objects.session.query ({
            sql:sql,
            param:params
        }, (err, rows)=>{
            Engine.checkResult (err, rows, callback);
        });

        return this;
    };

    DBQueryContext.prototype.update = function DBQueryContext_update (keys, values, callback) {
        let fields = [];
        let params = [];
        if (!utils.isArray(keys)) {
            keys = [keys];
        }
        if (!utils.isArray(values)) {
            values = [values];
        }
        if (keys.length != values.length || keys.length == 0) {
            return Engine.checkResult('Invalid keys or values for update', null, callback);
        }
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let field = Engine.parseField(key);
            if (field == null) {
                return Engine.checkResult('Invalid keys or values for update', null, callback);
            }
            fields.push (`${field}=?`);
            params.push (values[i]);
        }
        if (fields.length == 0) {
            let err = 'Invalid update row: ${row}';
            return Engine.checkResult(err, null, callback);
        }
        fields = `SET ${fields.join(',')}`;

        let join = this._parseJoin(this._joins, params);
        let filter = this._filters ? `where ${this._parseFilter(this._filters, params)}` : '';

        let sql = `UPDATE \`${this._objects.tableName}\` ${join} ${fields} ${filter}`;
        this._objects.session.query ({
            sql:sql,
            param:params
        }, (err, rows)=>{
            Engine.checkResult (err, rows, callback);
        });

        return this;
    };

    DBQueryContext.prototype.delete = function DBQueryContext_delete (tables, callback) {
        if (utils.isFunction(tables)) {
            callback = tables;
            tables = null;
        }
        if (tables == null) {
            tables = [this._objects.tableName];
            if (this._joins) {
                this._joins.forEach(item=>{
                    tables.push(`\`${item.table}\``);
                });
            }
        }
        let tableName = tables.length > 0 ? tables.join(',') : null;
        if (tableName == null) {
            return Engine.checkResult(`Invalid tables: ${tables}`);
        }

        let params = [];
        let join = this._parseJoin(this._joins, params);
        let filter = this._filters ? `where ${this._parseFilter(this._filters, params)}` : '';

        let sql = `DELETE ${tableName} FROM \`${this._objects.tableName}\` ${join} ${filter}`;
        this._objects.session.query ({
            sql:sql,
            param:params
        }, (err, rows)=>{
            Engine.checkResult (err, rows, callback);
        });

        return this;
    };

    DBQueryContext.prototype.orderBy = function DBQueryContext_orderBy (fields, bDesc) {
        if (utils.isString(fields)) {
            fields = [fields];
        }
        this._orderby = this._orderby.concat (fields);
        this._orderDesc = !!bDesc;
        return this;
    };

    DBQueryContext.prototype.groupBy = function DBQueryContext_orderBy (fields) {
        if (utils.isString(fields)) {
            fields = [fields];
        }
        this._groupby = this._groupby.concat (fields);
        return this;
    };

    DBQueryContext.prototype.limit = function DBQueryContext_limit (offset, limit) {
        if (utils.isUndefined(limit)) {
            limit = offset;
            offset = null;
        }
        this._offset = utils.safeParseInt(offset);
        this._limit = utils.safeParseInt(limit);
        return this;
    };

    DBQueryContext.prototype.filter = function DBQueryContext_filter (filter) {
        if (filter) {
            if (this._filters) {
                this._filters = {
                    and: [this._filters, filter]
                };
            } else {
                this._filters = filter;
            }
        }
        return this;
    };

    DBQueryContext.prototype._parseFilter = function DBQueryContext_parseFilter (filter, param) {
        if (utils.isObject(filter)) {
            let keys = Object.keys(filter);
            if (Object.keys(filter).length != 1) {
                return Engine.checkResult('Invalid filter');
            }
            let subFilters = [];
            let filterValue = filter[keys[0]];
            if (utils.isArray(filterValue)) {
                filterValue.forEach(item=>{
                    subFilters.push (`(${this._parseFilter(item, param)})`);
                });
            } else {
                subFilters.push (this._parseFilter(filterValue, param));
            }
            if (subFilters.length == 1) {
                return `${keys[0]} (${subFilters[0]})`;
            } else {
                return subFilters.join(` ${keys[0]} `);
            }
        } else if (utils.isFunction(filter)) {
            let f = new filter();
            return `${Engine.parseField(f.field, param)} ${f.postfix}`;
        } else if (utils.isArray(filter)) {
            if (filter.length == 0) {
                return Engine.checkResult('Invalid filter');
            }
            if (utils.isString(filter[0]) || utils.isFunction(filter[0]) || utils.isNumber(filter[0])) {
                let field = Engine.parseField (filter[0], this._objects.tableName);
                if (field == null) {
                    return Engine.checkResult('Invalid filter');
                }
                if (filter.length != 2) {
                    return Engine.checkResult('Invalid filter');
                }
                if (utils.isObject(filter[1])) {
                    let keys = Object.keys(filter[1]);
                    if (keys.length != 1 || !utils.isString(keys[0])) {
                        return Engine.checkResult('Invalid filter');
                    }
                    let key = utils.mergeBlank(utils.trim(keys[0].toLowerCase()));
                    if (key == 'between' || key == 'not between') {
                        let value = filter[1][keys[0]];
                        if (!utils.isArray(value) || value.length != 2) {
                            return Engine.checkResult('Invalid filter');
                        }
                        param.push (value[0]);
                        param.push (value[1]);
                        return `${field} ${key} ? and ?`;
                    } else if (key == 'in') {
                        let value = filter[1][keys[0]];
                        if (!utils.isArray(value)) {
                            return Engine.checkResult('Invalid filter');
                        }
                        let tmp = [];
                        value.forEach(item=>{
                            tmp.push ('?');
                            param.push(item);
                        });
                        return `${field} in (${tmp.join(',')})`;
                    } else {
                        param.push(filter[1][keys[0]]);
                        return `${field} ${key} ?`;
                    }
                } else if (utils.isFunction(filter[1])) {
                    let f1 = Engine.parseField (filter[1], this._objects.tableName);
                    if (f1 == null) {
                        let err = `Invalid field: ${filter[1]}`;
                        return Engine.checkResult(err);
                    }
                    return `${field} = ${f1}`;
                } else {
                    param.push (filter[1]);
                    return `${field} = ?`;
                }
            } else {
                return this._parseFilter({ and:filter }, param);
            }
        }
    };

    DBQueryContext.prototype._join = function DBQueryContext_join (tableName, type, on) {
        this._joins.push ({
            table: tableName,
            type: type,
            on: on
        });
        return this;
    };

    DBQueryContext.prototype._parseJoin = function DBQueryContext_parseJoin (joins, param) {
        let result = '';
        joins.forEach (item=>{
            result += `${item.type} ${item.table} on ${this._parseFilter(item.on, param)} `;
        });
        return result;
    };

    DBQueryContext.prototype.leftJoin = function DBQueryContext_leftJoin (tableName, on) {
        return this._join (tableName, 'left join', on);
    };

    DBQueryContext.prototype.innerJoin = function DBQueryContext_innerJoin (tableName, on) {
        return this._join (tableName, 'inner join', on);
    };

    DBQueryContext.prototype.rightJoin = function DBQueryContext_rightJoin (tableName, on) {
        return this._join (tableName, 'right join', on);
    };

    DBQueryContext.prototype.fields = function DBQueryContext_fields (fields) {
        if (!utils.isArray(fields)) {
            fields = [ fields ];
        }
        this._fields = fields;
        return this;
    };

    const dbList = config.databases||{};
    for (let name in dbList) {
        if (Engine.engineMap[name]) {
            utils.debugOut (`Engine ${name} already exists`);
        } else {
            Engine.engineMap[name] = new Engine(dbList[name]);
        }
    }

    Engine.getInstance('yh-app').beginSession(session=>{
        if (!session) {
            console.log ('Connect database failed.');
            process.exit(1);
        } else {
            session.query ('select id from yh_users group by region_no', err=>{
                if (err) {
                    Engine.onlyFullGroupBy = true;
                } else {
                    Engine.onlyFullGroupBy = false;
                }
                session.cancel();
            });
        }
    });

    module.exports = Engine;
*/ 
//# sourceMappingURL=engine.js.map