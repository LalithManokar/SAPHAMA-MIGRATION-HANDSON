# Migration of SAP HANA XS Advanced Application To SAP Cloud Application Programming Model Using SAP HANA Application Migration Assistant

## Overview
The SAP HANA Application Migration Assistant allows users to migrate XS Advanced application to a SAP CAP application with SAP HANA Cloud as a database.
In this enhanced version, the assistant performs:

**Automated Conversion of Database Artifacts:** Source XS Classic Repository  database objects (such as .hdbcds, .hdbtable, .hdbview, etc.) are transformed into their corresponding SAP CAP compliant database artifacts (e.g., .cds models), with naming adapted to SAP HANA Cloud conventions.

**Service Layer Migration via Generative AI:** Using GenAI, the assistant analyzes `.xsodata`, `.xsjs`, and `.xsjslib` files to generate corresponding service.cds, service.js, and custom handler implementations under the CAP srv/ layer. This accelerates the migration of service logic while preserving structure, routes, and functional behavior where possible.

> [!CAUTION]
> As generative AI conversion is not guaranteed to be 100% accurate, human intervention is required post-migration to validate, refine, and productionize the application logic and service definitions.

In this sample, only conversion of Source XS Advanced database artifacts to the corresponding target SAP CAP compliance database artifacts are listed.

The SAP HANA Application Migration Assistant provides multiple guided migration paths, including:
- XSC to CAP
- XSC to XSA
- XSA to CAP
- Data Migration Configuration

## Scenario 📚

In this scenario, you will use the SAP HANA Application Migration Assistant to migrate an XS Advanced application to the SAP Cloud Application Programming Model (CAP) with SAP HANA Cloud as the database. The process includes:

- Analyzing the source XS Advanced project structure and artifacts.
- Automatically converting XS Classic Repository database objects (such as `.hdbcds`, `.hdbtable`, `.hdbview`) into SAP CAP-compliant database artifacts (e.g., `.cds` models).
- Using generative AI to analyze and convert service layer files (`.xsodata`, `.xsjs`, `.xsjslib`) into CAP service definitions and custom handlers.
- Adapting naming conventions and database structures to align with SAP HANA Cloud best practices.
- Reviewing and refining the generated CAP project to ensure functional equivalence and production readiness.

By the end of this scenario, you will have a migrated CAP project with database and service layers transformed from the original XS Advanced application.

## Requirements
- XS Advanced on-premise database source system.
- SAP Business Technology Platform subaccount with the following 
  - Service instances:
    - `SAP Hana Cloud` and
    - `SAP Hana Schemas and HDI Containers`
  - Subscription
    - **SAP Business Application Studio** or **SAP Build.**  SAP Build is required if you want to convert the service layer as well, since GenAI capabilities are only available in SAP Build plans.
- SAP Cloud Connector

## Exercises

- [Excerise 1 : Prepare Your Development Environment](/exercises/ex1/README.md)
- [Exercise 2 : Run the SAP HANA Application Migration Assistant](/exercises/ex2/README.md)
- [Exercise 3 : Post Migration Changes for Database Layer](/exercises/ex3/README.md)
- [Exercise 4 : Deployment of the Migrated database artifacts](/exercises/ex4/README.md)
- [Excerise 5 : Post Migration Changes for Service Layer](/exercises/ex5/README.md)
- [Excerise 6 : Test the Migrated CAP Application](/exercises/ex6/README.md)

## Further Information

- [XSC to CAP Migration](https://github.com/SAP-samples/xsc-cap-migration)
- [XSA to CAP Migration](https://github.com/SAP-samples/xsa-cap-migration-using-basextn)
- [Data Migration Configuration For XSA](https://github.com/SAP-samples/xsa-cap-migration-using-basextn/blob/main/DataMigration.md)
- [Data Migration Configuration For XSC](https://github.com/SAP-samples/xsc-cap-migration/blob/main/DataMigration.md)
- [Migration Features Supported](https://github.com/SAP-samples/xsa-cap-migration-using-basextn/blob/main/supportedFeatures.md)
