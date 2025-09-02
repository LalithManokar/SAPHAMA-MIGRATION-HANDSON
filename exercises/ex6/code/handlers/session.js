
//converted from: /home/user/projects/ShineDemo/core-xsjs/lib/sap/hana/democontent/epm/services/session.xsjslib
import cds from '@sap/cds';

async function fillSessionInfo(req) {
    const sessionInfo = {
        session: [{ UserName: req.id, Language: req.locale }]
    };
    return sessionInfo;
}

 async function escapeSpecialChars(input) {
    if (typeof input !== "undefined" && input !== null) {
        return input
            .replace(/[\\]/g, "\\\\")
            .replace(/[\"]/g, "\\\"")
            .replace(/[\/]/g, "\\/")
            .replace(/[\b]/g, "\\b")
            .replace(/[\f]/g, "\\f")
            .replace(/[\n]/g, "\\n")
            .replace(/[\r]/g, "\\r")
            .replace(/[\t]/g, "\\t");
    } else {
        return "";
    }
}

 async function escapeSpecialCharsText(input) {
    if (typeof input !== "undefined" && input !== null) {
        input = input.replace(/[\"]/g, "\"\"");
        if (input.indexOf(",") >= 0 ||
            input.indexOf("\t") >= 0 ||
            input.indexOf(";") >= 0 ||
            input.indexOf("\n") >= 0 ||
            input.indexOf("\"") >= 0) {
            input = "\"" + input + "\"";
        }
        return input;
    } else {
        return "";
    }
}

 async function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

async function calcTomorrow() {
    return addMinutes(new Date(), (24 * 60));
}

async function getSessionId(req) {
    let sessionId = req.headers['xsutilsession'] || null;
    if (sessionId === null) {
        const result = await cds.run(`SELECT "sessionId".NEXTVAL as sessionId FROM DUMMY`);
        sessionId = result[0].sessionId.toString();
        req.headers['xsutilsession'] = sessionId;
    }
    return sessionId;
}

 async function recordSetToText(rs, bHeaders = true, delimiter = "\t") {
    let outputString = "";
    let value = "";
    const meta = rs.getMetaData();
    const colCount = meta.getColumnCount();

    if (bHeaders) {
        for (let i = 1; i <= colCount; i++) {
            outputString += escapeSpecialCharsText(meta.getColumnLabel(i)) + delimiter;
        }
        outputString += "\n";
    }
    while (await rs.next()) {
        for (let i = 1; i <= colCount; i++) {
            switch (meta.getColumnType(i)) {
                case cds.db.types.VARCHAR:
                case cds.db.types.CHAR:
                    value += rs.getString(i);
                    break;
                case cds.db.types.NVARCHAR:
                case cds.db.types.NCHAR:
                case cds.db.types.SHORTTEXT:
                    value += rs.getNString(i);
                    break;
                case cds.db.types.TINYINT:
                case cds.db.types.SMALLINT:
                case cds.db.types.INT:
                case cds.db.types.BIGINT:
                    value += rs.getInteger(i);
                    break;
                case cds.db.types.DOUBLE:
                    value += rs.getDouble(i);
                    break;
                case cds.db.types.DECIMAL:
                    value += rs.getDecimal(i);
                    break;
                case cds.db.types.REAL:
                    value += rs.getReal(i);
                    break;
                case cds.db.types.NCLOB:
                case cds.db.types.TEXT:
                    value += rs.getNClob(i);
                    break;
                case cds.db.types.CLOB:
                    value += rs.getClob(i);
                    break;
                case cds.db.types.BLOB:
                    value += cds.util.convert.encodeBase64(rs.getBlob(i));
                    break;
                case cds.db.types.DATE:
                    value += rs.getDate(i);
                    break;
                case cds.db.types.TIME:
                    value += rs.getTime(i);
                    break;
                case cds.db.types.TIMESTAMP:
                    value += rs.getTimestamp(i);
                    break;
                case cds.db.types.SECONDDATE:
                    value += rs.getSeconddate(i);
                    break;
                default:
                    value += rs.getString(i);
            }
            outputString += escapeSpecialCharsText(value) + delimiter;
            value = "";
        }
        outputString += "\n";
    }
    return outputString;
}

async function recordSetToJSON(rs, rsName = "entries") {
    const meta = rs.getMetaData();
    const colCount = meta.getColumnCount();
    const values = [];
    const table = [];
    let value = "";
    while (await rs.next()) {
        for (let i = 1; i <= colCount; i++) {
            value = "\"" + meta.getColumnLabel(i) + "\" : ";
            switch (meta.getColumnType(i)) {
                case cds.db.types.VARCHAR:
                case cds.db.types.CHAR:
                    value += "\"" + escapeSpecialChars(rs.getString(i)) + "\"";
                    break;
                case cds.db.types.NVARCHAR:
                case cds.db.types.NCHAR:
                case cds.db.types.SHORTTEXT:
                    value += "\"" + escapeSpecialChars(rs.getNString(i)) + "\"";
                    break;
                case cds.db.types.TINYINT:
                case cds.db.types.SMALLINT:
                case cds.db.types.INT:
                case cds.db.types.BIGINT:
                    value += rs.getInteger(i);
                    break;
                case cds.db.types.DOUBLE:
                    value += rs.getDouble(i);
                    break;
                case cds.db.types.DECIMAL:
                    value += rs.getDecimal(i);
                    break;
                case cds.db.types.REAL:
                    value += rs.getReal(i);
                    break;
                case cds.db.types.NCLOB:
                case cds.db.types.TEXT:
                    value += "\"" + escapeSpecialChars(rs.getNClob(i)) + "\"";
                    break;
                case cds.db.types.CLOB:
                    value += "\"" + escapeSpecialChars(rs.getClob(i)) + "\"";
                    break;
                case cds.db.types.BLOB:
                    value += "\"" + cds.util.convert.encodeBase64(rs.getBlob(i)) + "\"";
                    break;
                case cds.db.types.DATE:
                    const dateTemp = new Date();
                    dateTemp.setDate(rs.getDate(i));
                    const dateString = dateTemp.toJSON();
                    value += "\"" + dateString + "\"";
                    break;
                case cds.db.types.TIME:
                    const timeTemp = new Date();
                    timeTemp.setDate(rs.getTime(i));
                    const timeString = timeTemp.toJSON();
                    value += "\"" + timeString + "\"";
                    break;
                case cds.db.types.TIMESTAMP:
                    const timestampTemp = new Date();
                    timestampTemp.setDate(rs.getTimestamp(i));
                    const timestampString = timestampTemp.toJSON();
                    value += "\"" + timestampString + "\"";
                    break;
                case cds.db.types.SECONDDATE:
                    const secondDateTemp = new Date();
                    secondDateTemp.setDate(rs.getSeconddate(i));
                    const secondDateString = secondDateTemp.toJSON();
                    value += "\"" + secondDateString + "\"";
                    break;
                default:
                    value += "\"" + escapeSpecialChars(rs.getString(i)) + "\"";
            }
            values.push(value);
        }
        table.push("{" + values + "}");
    }
    return JSON.parse("{\"" + rsName + "\" : [" + table + "]}");
}

 async function variableException(source, name, application, sessionId) {
    this.source = source;
    this.name = name;
    this.application = application;
    this.sessionId = sessionId;
    this.message = "Invalid Variable ";

    this.toString = function () {
        return this.message + "name: " + this.name + " application: " + this.application + "session id: " + this.sessionId + " function: " + this.source;
    };
}

 async function get_session_variable(req) {
    const { name, application } = req.data;
    const sessionId = await getSessionId(req);
    const result = await cds.run(`CALL "ServerCookiesWrapper"('GET_SESSION_VAR', ?, ?, ?, ?, ?)`, [sessionId, name, application, new Date(), null]);
    if (result.SVARIABLE && result.SVARIABLE[0]) {
        return result.SVARIABLE[0].DATA;
    } else {
        throw new variableException("get_session_variable", name, application, sessionId);
    }
}

async function get_session_variables(req) {
    const { application } = req.data;
    const sessionId = await getSessionId(req);
    const result = await cds.run(`CALL "ServerCookiesWrapper"('GET_SESSION_VARS', ?, ?, ?, ?, ?)`, [sessionId, null, application, new Date(), null]);
    return result.SVARIABLES;
}

async function set_session_variable(req) {
    const { name, application, value, expiry } = req.data;
    const sessionId = await getSessionId(req);
    const expiration = expiry || calcTomorrow();
    await cds.run(`CALL "ServerCookiesWrapper"('SET_SESSION_VAR', ?, ?, ?, ?, ?)`, [sessionId, name, application, expiration, value.toString()]);
}

 async function get_application_variable(req) {
    const { name, application } = req.data;
    const result = await cds.run(`CALL "ServerCookiesWrapper"('GET_APP_VAR', ?, ?, ?, ?, ?)`, [null, name, application, new Date(), null]);
    if (result.SVARIABLE && result.SVARIABLE[0]) {
        return result.SVARIABLE[0].DATA;
    } else {
        throw new variableException("get_application_variable", name, application);
    }
}

async function get_application_variables(req) {
    const { application } = req.data;
    const result = await cds.run(`CALL "ServerCookiesWrapper"('GET_APP_VARS', ?, ?, ?, ?, ?)`, [null, null, application, new Date(), null]);
    return result.SVARIABLES;
}

async function set_application_variable(req) {
    const { name, application, value, expiry } = req.data;
    const expiration = expiry || calcTomorrow();
    await cds.run(`CALL "ServerCookiesWrapper"('SET_APP_VAR', ?, ?, ?, ?, ?)`, [null, name, application, expiration, value.toString()]);
}

export {
    fillSessionInfo,
    escapeSpecialChars,
    escapeSpecialCharsText,
    addMinutes,
    calcTomorrow,
    getSessionId,
    recordSetToText,
    recordSetToJSON,
    variableException,
    get_session_variable,
    get_session_variables,
    set_session_variable,
    get_application_variable,
    get_application_variables,
    set_application_variable
};