
//converted from: /home/user/projects/ShineDemo/core-xsjs/lib/sap/hana/democontent/epm/services/poWorklistUpdate.xsjs
import { getMessage } from './messages.js';
import cds from '@sap/cds';

async function deletePO(req) {
    const { purchaseOrderId } = req.data.payload[0];
    let purchaseOrderID = purchaseOrderId.replace("'", "");

    if (!purchaseOrderID) {
        req.error(400, await getMessage('SEPM_POWRK', '012'));
        return;
    }

    const query = SELECT.from('PO_HEADER').columns('LIFECYCLESTATUS', 'APPROVALSTATUS', 'CONFIRMSTATUS', 'ORDERINGSTATUS', 'INVOICINGSTATUS').where({ PURCHASEORDERID: purchaseOrderID });
    const result = await cds.run(query);

    if (!result.length) {
        req.error(400, await getMessage('SEPM_POWRK', '013', encodeURI(purchaseOrderID)));
        return;
    }

    const [status] = result;

    if (status.LIFECYCLESTATUS === "C") {
        req.error(500, await getMessage('SEPM_POWRK', '014'));
        return;
    }

    if (status.LIFECYCLESTATUS === "X") {
        req.error(500, await getMessage('SEPM_POWRK', '015', encodeURI(purchaseOrderID)));
        return;
    }

    if (status.APPROVALSTATUS === "A") {
        req.error(500, await getMessage('SEPM_POWRK', '016'));
        return;
    }

    if (status.CONFIRMSTATUS === "C") {
        req.error(500, await getMessage('SEPM_POWRK', '017'));
        return;
    }

    if (status.CONFIRMSTATUS === "S") {
        req.error(500, await getMessage('SEPM_POWRK', '018'));
        return;
    }

    if (status.ORDERINGSTATUS === "D") {
        req.error(500, await getMessage('SEPM_POWRK', '019'));
        return;
    }

    if (status.INVOICINGSTATUS === "D") {
        req.error(500, await getMessage('SEPM_POWRK', '020'));
        return;
    }

    try {
        await UPDATE('PO_HEADER').set({ LIFECYCLESTATUS: 'X' }).where({ PURCHASEORDERID: purchaseOrderID });
    } catch (error) {
        req.error(500, "Lifecycle Update Failed. Check logs for details");
        return;
    }

    req.reply(await getMessage('SEPM_POWRK', '021'));
}

async function approvePO(req) {
    const purchaseOrderId = req.data.payload[0].purchaseOrderId;
    const Action = req.data.payload[1].Action;  
    let purchaseOrderID = purchaseOrderId.replace("'", "");

    if (!purchaseOrderID) {
        req.error(400, await getMessage('SEPM_POWRK', '012'));
        return;
    }

    if (!Action) {
        req.error(400, await getMessage('SEPM_POWRK', '022'));
        return;
    }

    if (!["Reject", "Accept"].includes(Action)) {
        req.error(400, await getMessage('SEPM_POWRK', '023', encodeURI(Action)));
        return;
    }

    const query = SELECT.from('PO_HEADER').columns('LIFECYCLESTATUS', 'APPROVALSTATUS', 'CONFIRMSTATUS', 'ORDERINGSTATUS', 'INVOICINGSTATUS').where({ PURCHASEORDERID: purchaseOrderID });
    const result = await cds.run(query);

    if (!result.length) {
        req.error(400, await getMessage('SEPM_POWRK', '013', encodeURI(purchaseOrderID)));
        return;
    }

    const [status] = result;

    if (status.LIFECYCLESTATUS === "C") {
        req.error(500, await getMessage('SEPM_POWRK', '024'));
        return;
    }

    if (status.LIFECYCLESTATUS === "X") {
        req.error(500, await getMessage('SEPM_POWRK', '025'));
        return;
    }

    if (status.CONFIRMSTATUS === "C") {
        req.error(500, await getMessage('SEPM_POWRK', '026'));
        return;
    }

    if (status.CONFIRMSTATUS === "S") {
        req.error(500, await getMessage('SEPM_POWRK', '027'));
        return;
    }

    if (status.ORDERINGSTATUS === "D") {
        req.error(500, await getMessage('SEPM_POWRK', '028'));
        return;
    }

    if (status.INVOICINGSTATUS === "D") {
        req.error(500, await getMessage('SEPM_POWRK', '029'));
        return;
    }

    try {
        const approvalStatus = Action === "Reject" ? 'R' : 'A';
        await UPDATE('PO_HEADER').set({ APPROVALSTATUS: approvalStatus }).where({ PURCHASEORDERID: purchaseOrderID });
    } catch (error) {
        req.error(500, "Updation of approval status failed. Check logs for details");
        return;
    }

    req.reply(await getMessage('SEPM_POWRK', '021'));
}

async function handlerFunction(req) {
    const aCmd = req.data.cmd;
    switch (aCmd) {
        case "delete":
            await deletePO(req);
            break;
        case "approval":
            await approvePO(req);
            break;
        default:
            req.error(400, await getMessage('SEPM_ADMIN', '002', encodeURI(aCmd)));
    }
}

export default handlerFunction;