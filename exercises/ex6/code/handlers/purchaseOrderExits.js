
//converted from: /home/user/projects/ShineDemo/core-xsjs/lib/sap/hana/democontent/epm/services/purchaseOrderExits.xsjslib
export default async function po_create_before_exit(req) {
    let poid = '';
    let partnerid = '';
    let grossamount = 0;
    let netamount = 0;
    let taxamount = 0;
    let currency = '';
    let productid = '';
    let quantity = 0;
    let date = '';
    let price = 0;

    try {
        // Getting POID
        const poidResult = await cds.run(`SELECT max(PURCHASEORDERID + 1) as POID FROM "PO_HEADER"`);
        poid = poidResult[0].POID;
        productid = req.PRODUCTID;
        partnerid = req.PARTNERID;
        currency = req.CURRENCY;
        quantity = req.QUANTITY;
        date = new Date().toISOString().slice(0, 10);

        // Getting product price
        const priceResult = await cds.run(`SELECT "PRICE" FROM "MD_PRODUCTS" WHERE "PRODUCTID" = ?`, [productid]);
        if (priceResult.length > 0) {
            price = priceResult[0].PRICE;
        }

        // Setting amount
        netamount = price * quantity;
        taxamount = netamount * 0.19;
        grossamount = netamount + taxamount;

        // Insert PO.Header
        await cds.run(`INSERT INTO "PO_HEADER" VALUES (?, '33', ?, '33', ?, '', ?, ?, ?, ?, ?, 'N', 'I', 'I', 'I', 'I')`, 
            [String(poid), date, date, partnerid, currency, grossamount, netamount, taxamount]);

        // Insert PO.Item
        await cds.run(`INSERT INTO "PO_ITEM" VALUES (?, '10', ?, '', ?, ?, ?, ?, ?, 'EA', ?)`, 
            [String(poid), productid, currency, grossamount, netamount, taxamount, quantity, date]);
        return String(poid);
    } catch (e) {
        req.error(e);
    }
}