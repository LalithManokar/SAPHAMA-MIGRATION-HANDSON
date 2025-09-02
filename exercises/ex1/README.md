# Exercise 1 - Prepare Your Development Environment

In this exercise, we will guide you through the process of setting up a Cloud-based Full Stack application development environment using SAP's Business Application Studio and also connect to SAP BTP.

## Exercise 1.1 - Create a SAP Business Application Studio or SAP Build Devspace with the SAP HANA Application Migration Assistant Extension installed

The First step in this exercise is to create a dev space.

1. Launch the [SAP Business Application studio or SAP Build subscription](https://enable-demo.us20.build.cloud.sap/lobby). This will take you to the lobby page and from there switch to Dev space manager.

2. Select IDP `terraformeds2.accounts.ondemand.com` and enter User `MigrationUserXX ` and password `HappyMigration`

3. Select the `Dev Space Manager` option as shown below.

<br>![](/exercises/ex1/images/launch.png)

4. Select `Create Dev Space`.

<br>![](/exercises/ex1/images/create.png)

5. Enter the dev space name followed by the user ID that is shared. For the kind of application choose `Full-Stack Application Using Productivity Tools`. Then, choose the `SAP HANA Application Migration Assistant Extension` to help with migration, as well as the `SAP Hana Tools Extension` which will be required later for deployment. Finally, click on `Create Dev Space`.

<br>![](/exercises/ex1/images/devspace.png)

6. Wait until the Dev Space status changes to `Running` and then click on the link to open it.

<br>![](/exercises/ex1/images/running.png)

7. Once the created dev space is opened, navigate to the folder by clicking on File -> Open Folder. Enter the path `/home/user/projects/` and click on `OK`.

<br>![](/exercises/ex1/images/open.png)

## Exercise 1.2 - Import the Project

Next step in the exercise is to Import the Project

1. Download the [source.zip](/exercises/ShineDemoSource.zip) file.

2. In the Business application studio Dev space, Once the projects folder is opened, Click on Navigation Menu -> File -> Import Project.

<br>![](/exercises/ex1/images/import.png)

3. Select the downloaded zip file. Once the zip file is imported, It will automatically be extracted in the Dev space.


## Exercise 1.3 - Login to Cloud Foundry

The last step of the tutorial is to Login to the Cloud Foundry Environment.

1. Click on the Navigation Menu -> Terminal -> New Terminal to open a new terminal.

<br>![](/exercises/ex1/images/terminal.png)

2. Run the below command in the opened terminal

   ```
   cf login -a https://api.cf.us20.hana.ondemand.com/ --origin a5dnmokpl-platform
   ```

3. Enter the User Email and Password provided.

4. The Target Org and Target Space will be automatically selected as `E2EVal_enable-demo` and `demo` respectively.

## Summary

You've now successfully set up your Full Stack application development environment.

Continue to - [Exercise 2 - Run the SAP HANA Application Migration Assistant
](../ex2/README.md)