
//converted from: /home/user/projects/ShineDemo/core-xsjs/lib/sap/hana/democontent/epm/services/poWorklistQuery.xsjs
import { getMessage } from './messages.js';
import { fillSessionInfo } from './session.js';
import NodeZip from "node-zip";

async function createFilterEntry(rs) {
    return {
        "terms": rs.RESULTS,
        "attribute": rs.ATTRIBUTE
    };
}

async function getFilter(req) {
    let body = '';
    let terms = encodeURI(req.req.query.query);
    let termList = terms.split(" ");
    let termStr = "";
    for (let i = 0; i < termList.length && i < 50; i++) {
        termStr += termList[i].replace(/\s+/g, '') + "* ";
    }
    terms = termStr;
    const list = [];
    try {
        const str = termStr.split("*");
        const isNumbericString = str[0];
        if (isNaN(isNumbericString)) {
            try {
                const query = 'SELECT * FROM "TEXT_SEARCH"(?,?)';
                const result = await cds.run(query, [terms, "OTHERS"]);
                for (const rs of result) {
                    list.push(await createFilterEntry(rs));
                }
            } catch (err) {
                console.error("Exception raised:" + err + " message from company name search:" + err.message);
            }
        } else {
            try {
                const query = 'SELECT * FROM "TEXT_SEARCH"(?,?)';
                const result = await cds.run(query, [terms, "PURCHASEORDERID"]);
                for (const rs of result) {
                    list.push(await createFilterEntry(rs));
                }
            } catch (err) {
                console.error("Exception raised:" + err + " message from purchaseorder id search:" + err.message);
            }
        }
    } catch (e) {
        return {
            status: 500,
            contentType: 'text/plain; charset=UTF-8',
            body: "Search failed due to an internal server error. Check logs for details"
        };
    }
    body = JSON.stringify(list);
    return {
        status: 200,
        contentType: 'application/json',
        body: body
    };
}

async function createTotalEntry(rs) {
    return {
        "name": rs.GROUP1,
        "value": rs.AMOUNT1
    };
}

async function getTotalOrders(req) {
    let body = '';
    let ivGroupBy = encodeURI(req.req.query.groupby);
    let ivCurrency = encodeURI(req.req.query.currency);
    const list = [];

    switch (ivGroupBy) {
        case "COMPANYNAME":
        case "CATEGORY":
        case "CITY":
        case "POSTALCODE":
        case "PRODUCTID":
            break;
        default:
            return {
                status: 400,
                contentType: 'text/plain; charset=UTF-8',
                body: await getMessage('SEPM_ADMIN', '000', ivGroupBy)
            };
    }
    if (!ivCurrency) {
        ivCurrency = "EUR";
    }
    ivCurrency = ivCurrency.substring(0, 3);

    const CheckUpperCase = new RegExp('[A-Z]{3}');

    if (CheckUpperCase.test(ivCurrency)) {
        try {
            const query = `SELECT TOP 5 ${ivGroupBy} AS GROUP1, SUM("CONVGROSSAMOUNT") AS AMOUNT1 FROM "SAP_HANA_DEMOCONTENT_EPM_MODELS_PURCHASE_COMMON_CURRENCY" ('PLACEHOLDER' = ('$$IP_O_TARGET_CURRENCY$$', '${ivCurrency}')) group by ${ivGroupBy} order by sum("CONVGROSSAMOUNT") desc`;
            const result = await cds.run(query);
            for (const rs of result) {
                list.push(await createTotalEntry(rs));
            }
        } catch (e) {
            return {
                status: 500,
                contentType: 'text/plain; charset=UTF-8',
                body: e.message
            };
        }

        body = JSON.stringify({
            "entries": list
        });

        return {
            status: 200,
            contentType: 'application/json; charset=UTF-8',
            body: body
        };
    } else {
        return {
            status: 400,
            body: await getMessage('SEPM_BOR_MESSAGES', '053', encodeURI(ivCurrency))
        };
    }
}

async function downloadExcel() {
    let body = '';

    try {
        const query = 'SELECT TOP 25000 "PURCHASEORDERID", "PARTNERID", "COMPANYNAME", "CREATEDBYLOGINNAME", "CREATEDAT", "GROSSAMOUNT" FROM "PO_HEADERVIEW" order by "PURCHASEORDERID"';
        const result = await cds.run(query);

        body = await getMessage('SEPM_POWRK', '002') + "\t" +
            await getMessage('SEPM_POWRK', '003') + "\t" +
            await getMessage('SEPM_POWRK', '001') + "\t" +
            await getMessage('SEPM_POWRK', '004') + "\t" +
            await getMessage('SEPM_POWRK', '005') + "\t" +
            await getMessage('SEPM_POWRK', '006') + "\n";

        for (const rs of result) {
            body += rs.PURCHASEORDERID + "\t" + rs.PARTNERID + "\t" + rs.COMPANYNAME + "\t" + rs.CREATEDBYLOGINNAME + "\t" + rs.CREATEDAT + "\t" + rs.GROSSAMOUNT + "\n";
        }
    } catch (e) {
        return {
            status: 500,
            contentType: 'text/plain; charset=UTF-8',
            body: "Excel download Failed. Check logs for details."
        };
    }

    return {
        status: 200,
        contentType: 'application/vnd.ms-excel; charset=utf-16le',
        headers: {
            'Content-Disposition': 'attachment; filename=Excel.xls'
        },
        body: body
    };
}

async function downloadZip() {
    let body = '';

    try {
        const query = 'SELECT TOP 25000 "PURCHASEORDERID", "PARTNERID", "COMPANYNAME", "CREATEDBYLOGINNAME", "CREATEDAT", "GROSSAMOUNT" FROM "PO_HEADERVIEW" order by "PURCHASEORDERID"';
        const result = await cds.run(query);

        body = await getMessage('SEPM_POWRK', '002') + "\t" +
            await getMessage('SEPM_POWRK', '003') + "\t" +
            await getMessage('SEPM_POWRK', '001') + "\t" +
            await getMessage('SEPM_POWRK', '004') + "\t" +
            await getMessage('SEPM_POWRK', '005') + "\t" +
            await getMessage('SEPM_POWRK', '006') + "\n";

        for (const rs of result) {
            body += rs.PURCHASEORDERID + "\t" + rs.PARTNERID + "\t" + rs.COMPANYNAME + "\t" + rs.CREATEDBYLOGINNAME + "\t" + rs.CREATEDAT + "\t" + rs.GROSSAMOUNT + "\n";
        }

        const zip = new NodeZip();
        zip.file("Excel.xls", body);

        return {
            status: 200,
            contentType: "application/zip",
            headers: {
                'Content-Disposition': "attachment; filename=Purchase.zip"
            },
            body: zip.generate({ base64: false, compression: 'DEFLATE' })
        };
    } catch (e) {
        return {
            status: 500,
            contentType: 'text/plain; charset=UTF-8',
            body: "Zipping data Failed. Check logs for details."
        };
    }
}

async function handlerFunction(req) {
    const aCmd = encodeURI(req.data.cmd);
    switch (aCmd) {
        case "filter":
            return await getFilter(req);
        case "getTotalOrders":
            return await getTotalOrders(req);
        case "Excel":
            return await downloadExcel();
        case "Zip":
            return await downloadZip();
        case "getSessionInfo":
            return await fillSessionInfo(req);
        default:
            return {
                status: 500,
                contentType: 'text/plain; charset=UTF-8',
                body: await getMessage('SEPM_ADMIN', '002', aCmd)
            };
    }
}

export default handlerFunction;