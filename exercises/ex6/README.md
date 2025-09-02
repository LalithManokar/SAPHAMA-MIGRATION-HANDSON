
# Exercise 6 - Test the Migrated Application

In this exercise, you will run the migrated CAP application locally, connect it to a deployed HANA container, and test its endpoints. You will also update handler files as needed and use provided HTTP requests to verify the application's functionality, including create, update, and delete operations.

## Run the Migrated Application

1.  Run `cds watch --profile hybrid` command in the root folder of the target cap project

    open  `http://localhost:4004/` in browser and play with below requests
    
    http://localhost:4004/businessPartners/BusinessPartners?$expand=ADDRESSES

    http://localhost:4004/poCreate/purchaseDetails

    http://localhost:4004/productDetails/ProductDetails

    http://localhost:4004/poWorklist/PO_WORKLIST?$expand=PurchaseOrderItems
    
    http://localhost:4004/poWorklist/PurchaseOrderHeader?$expand=PurchaseOrderItems

2. Since the application has been migrated from XSJS to CAP, the logic for how actions and functions are performed may have changed. Therefore, replace the handler files in your migrated CAP application with the updated versions provided below:
    - poWorklistQuery.js with [poWorklistQuery](./code/handlers/poWorklistQuery.js)
    - messages.js with [messages.js](./code/handlers/messages.js)
    - poWorlistUpdate.js with [poWorlistUpdate.js](./code/handlers/poWorklistUpdate.js)
    - purchaseOrderExists.js with [purchaseOrderExists.js](./code/handlers/purchaseOrderExits.js)
    - session.js with [session.js](./code/handlers/session.js)
    - userExist.js with [userExists.js](./code/handlers/userExit.js)
    - service.js with [service.js](./code/handlers/service.js)

3. Add http resquest to test all the endpoints. Download the [`http`](/exercises/http.zip) folder and Unzip the `http` folder if it is in a compressed format (e.g., `http.zip`).

4. Copy the unzipped `test` folder into the migrated CAP project.

5. open the `.http` files and play with create, update and delete options.

## Summary

Successfully Migrated XS Advanced application using SAP HANA Application Migration Asisstant and Tested locally