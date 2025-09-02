## Exercise 4 - Deployment of the Migrated database artifacts


In this exercise, we will deploy the migrated CAP project to the SAP Business Technology Platform. This involves building the Multi-Target Application (MTA) project and deploying the generated MTA archive to the cloud environment.


### Step 1: Prepare Data for Deployment

1. Download the [`data`](/exercises/data.zip) folder and Unzip the `data` folder if it is in a compressed format (e.g., `data.zip`).

2. Copy the unzipped `data` folder into the `db` directory of your migrated CAP project.

### Step 2: Open Terminal and Deploy to HANA

1. Open a terminal window in your development environment and navigate to the root directory of your migrated CAP project.

2. Run the following command to deploy your database artifacts to HANA:
   ```
   cds deploy --to hana
   ```
> [!Note]
> Login to the cloud foundry is mandatory to deploy the database artefacts, please follow section  Exercise 1.3 - Login to Cloud Foundry

3. Verify deployment is successful.

<br>![](/exercises/ex4/images/deployment.png)

## Summary

You've now successfully completed the deployment of database artifacts into SAP Hana Cloud.

Continue to - [Exercise 5 - Service Layer Migration](../ex5/README.md)

