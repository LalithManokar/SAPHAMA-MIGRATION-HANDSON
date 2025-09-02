## Exercise 3 - Post Migration Changes for Database Layer

In this exercise we will make some adjustments manually once the project is created,as these are not currently handled by the SAP HANA Application Migration Assistant.


1. For the `ShineDemoSource` project, make the following changes:
    - A folder named `unsupported_feature` has been created by the extension to contain file extensions that are not supported in SAP HANA Cloud. Delete this unsupported_feature folder from `db/src/data` folder. For more information on the unsupported features, please refer to this [link](https://help.sap.com/docs/hana-cloud/sap-hana-cloud-migration-guide/design-time-content-compatibility).

2. Run `cds build --profile production` command in the root folder of the target cap project to check for any CDS errors.

<br>![](/exercises/ex3/images/build.png)

3. Open the file `srv/core-xsjs/lib/sap/hana/democontent/epm/services/service.cds` and update the value as follows:
    - Change all occurrences of `PurchaseOrderId` to `PURCHASEORDERID` as indicated by the error message.

<br>![](/exercises/ex3/images/changes.png)

4. Run `cds build --profile prodution` again in the root folder of the target CAP project to ensure that there are no more CDS issues after making the above changes.

<br>![](/exercises/ex3/images/success.png)

## Summary

You've now successfully completed the post migration steps for both the database layer of the CAP project.

Continue to - [Exercise 4 - Deployment of the Migrated Project](../ex4/README.md)

