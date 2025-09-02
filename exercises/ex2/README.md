# Exercise 2 - Perform XS Advanced to CAP Migration Using the SAP HANA Application Migration Assistant

In this exercise, you will learn how to migrate an XS Advanced (XSA) project to a Cloud Application Programming (CAP) application using the SAP HANA Application Migration Assistant extension in SAP Business Application Studio (BAS). XS Advanced (XSA) is a development and runtime environment for SAP HANA, while SAP CAP (Cloud Application Programming) is a framework for building enterprise-grade services and applications on the SAP Business Technology Platform. SAP HANA Cloud is a modern database-as-a-service (DBaaS) that powers intelligent data applications and analytics across enterprise data.

In this exercise, we will focus on the XSA to CAP migration path, simplifying the transition to SAP HANA Cloud and preparing your CAP application for further development and deployment.

1. Navigate to the folder by clicking on File -> Open Folder. Enter the path /home/user/projects/ and click on OK.

<br>![](/exercises/ex2/images/open.png)
2. Open the the Command Palette and type `SAP HANA Application Migration Assistant` and select the command when it appears.

<br>![](/exercises/ex2/images/assistant.png)
3. When the Migration Assistant Wizard opens, select the migration path. Since we are migrating from XS Advanced to CAP, select `XSA to CAP` as your migration path.

<br>![](/exercises/ex2/images/path.png)

4. In the `Data Source` page of the wizard, choose the destination `hanaxsa` from the dropdown menu.

<br>![](/exercises/ex2/images/dest.png)

5. Enter the user credentials for the SAP HANA Database HDI User `MigrationDemoUser_xx` (replace xx with a number between 01 and 20) and password `HappyMigration99` into their respective fields. Then, click the login button to authorize these credentials. Click on the `Next` button.
    > [!NOTE]
    > The entered user must be granted SELECT permission on M_ALL_CONTAINERS, M_ALL_CONTAINER_SCHEMAS, as well as the corresponding HDI container schemas to access the required metadata and data objects
    ```
    GRANT SELECT ON "_SYS_DI"."M_ALL_CONTAINERS" TO <USER_NAME>;
    GRANT SELECT ON "_SYS_DI"."M_ALL_CONTAINER_SCHEMAS" TO <USER_NAME>';
    ```	

<br>![](/exercises/ex2/images/credentials.png)

6. In the `Source Type` page, select your imported project from the drop down. In this case, its `ShineDemoSource`.

<br>![](/exercises/ex2/images/xsa.png)

7. Select the DB Folder. In this case it will be `db`.

<br>![](/exercises/ex2/images/db.png)

8. Choose the target directory. This is where the migration results will be stored.

    > [!NOTE] Ensure that the directory you select is a sub-directory of `/home/user/projects`.

9. Enter a project name, where the migration results will be saved. 

<br>![](/exercises/ex2/images/target.png)

10. Select `Yes` to convert the Service Layer using GenAI capabilities. Once selected, click on `Next`.

<br>![](/exercises/ex2/images/service.png)

11. In the `Schema` page, Enter the schema name of the container, in this case `SHINE_CORE_DEMO`. Once entered, click on `Finish`.

<br>![](/exercises/ex2/images/schema.png)

12. Once you see the pop-up notification at the bottom right corner of your screen, it means that the migration process is underway. This notification will keep you updated on all the steps that follow. At the end of the process, a CAP project with the revised database artifacts will be created. Additionally, a `report.html` file will be generated within the project. This file contains detailed information about your project's migration.

<br>![](/exercises/ex2/images/finish.png)

## Summary

You've now successfully created a CAP application and migrated the XSA content to it for SAP Hana Cloud support. 

Continue to - [Exercise 3 - Post Migration Changes](../ex3/README.md)



