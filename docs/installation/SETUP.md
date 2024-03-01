# Project Setup Guide

Welcome to the setup guide for **project-plant-shop**. This guide is tailored to assist you in setting up and running the project on your local machine, specifically recommended for **Windows 10/11 or newer**.

<details>
   <summary><i><strong>Note for Cloud Deployment</strong> (click to expand)</i></summary>

> If you're interested in deploying the project on the cloud instead of running it locally, please refer to our [`DEPLOYMENT.md`](DEPLOYMENT.md) for detailed instructions.
      
</details>

## Notice for Non-Windows Users
If you are using a **Linux-based OS** or **MacOS**, the steps provided should generally work but may require additional adjustments due to minor behavioral differences from Windows. We encourage trying and applying necessary workarounds where needed.

## Quick Links

Follow these steps to get started:

- [Prerequisites](#prerequisites)
- [Step 1: Clone the Project](#step-1-clone-the-project)
- [Step 2: Install Project Dependencies](#step-2-install-project-dependencies)
- [Step 3: Prepare Configuration Files](#step-3-prepare-configuration-files)
- [Step 4: Verify and Prepare Database](#step-4-verify-and-prepare-database)
- [Step 5: Edit Configuration Files](#step-5-edit-configuration-files)
- [Step 6: Running Database Migrations](#step-6-running-database-migrations)
- [Step 7: Verify Database Setup](#step-7-verify-database-setup)
- [Step 8: Running the Project](#step-8-running-the-project)
- [Note on Further Integrations](#note-on-further-integrations)


## Prerequisites

Before you begin, ensure you have the following installed:

- **Git**
- **Node.js** and **NPM (Node Package Manager)**
- **PostgreSQL** for Windows
- A text editor of your choice (**Visual Studio Code** is recommended)

**[Skip to Step 1 if you already have the prerequisites installed.](#step-1-set-up-github-account)**

### Installing Prerequisites

#### Git

- Download Git from [https://git-scm.com/download/win](https://git-scm.com/download/win) for Windows.

- Follow the installation instructions, opting for the default settings unless you have specific preferences.

#### Node.js and NPM

- Download Node.js from [https://nodejs.org/](https://nodejs.org/), which includes NPM. Choose the LTS (Long-Term Support) version for stability.

- Follow the installation prompts, keeping the default settings unless you need specific configurations.

#### PostgreSQL

- Download PostgreSQL from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/) for Windows.

- Follow the installation guide when prompted, ensure you check the box to install `pgAdmin`, which is a management tool for PostgreSQL. This option is crucial for easier database management.

   - Making sure to remember the `password` you set for the PostgreSQL superuser.

   - During the installation, you'll be asked to choose a port for PostgreSQL. Leave the default port as it is (`5432`), which is the standard port for PostgreSQL connections.

   - You will also be prompted to select your `locale` during the installation process. Choose the locale that matches your geographical location or preferences.

      <details>
         <summary><i><strong>Note for the end of the installation</strong> (click to expand)</i></summary>

      > You may be prompted about running the `Stack Builder` to install additional tools and extensions. **This step is not necessary for the initial project setup.**
      
      > If you are unsure whether you need any additional tools or extensions, you can uncheck this option.
      
      > After this installation, you can always run the Stack Builder later from the Windows Start menu, under PostgreSQL, if needed.
            
      </details>

#### Text Editor

- Choose a text editor if you don't already have one. We recommend **VS Code**, which you can download from [https://code.visualstudio.com/](https://code.visualstudio.com/).

## Step 1: Clone the Project

To setup the project locally, you'll need to make a local copy of the repository on your machine.

1. **Open Command Prompt:**
   - Press `Win + R` to open the Run dialog.
   - Type `cmd` and press Enter to launch the Command Prompt.

2. **Navigate to Your Preferred Folder:**
   - To change to a directory of your choice, use the `cd` command. This example will navigate to the `Documents` directory, type:
     ```cmd
     cd C:\Users\<YourUsername>\Documents
     ```
   - Replace `<YourUsername>` with your actual Windows username. This path can be replaced with any other directory where you wish to clone the project to.

      <details>
         <summary><i><strong>Note for accessing different drives</strong> (click to expand)</i></summary>

      > If you're changing to a directory on a different drive (e.g., D: or E:), you may first need to specify the drive letter before using the `cd` command. For example:
         > ```cmd
         > D:
         > cd D:\<YourFolderName>
         > ```
      
      </details>

3. **Clone the Repository:**
   - Use the `git clone` command followed by the URL of the repository to clone it into your chosen directory:
     ```cmd
     git clone https://github.com/kr-pound/project-plant-shop.git
     ```
      This command creates a local copy of the `project-plant-shop` repository in your chosen directory.

   - After the cloning process is completed, navigate into the project directory by this command:
     ```cmd
     cd project-plant-shop
     ```
      This command changes your current directory to the `project-plant-shop` directory, which contains all the project files.

## Step 2: Install Project Dependencies

To have the project works correctly, you need to install its dependencies.

**Install Dependencies:**
   - In your project's root directory, execute the following command to install the project dependencies:

     ```cmd
     npm install
     ```
      This command reads the `package.json` file and installs all the necessary dependencies listed there.

## Step 3: Prepare Configuration Files

Rename configuration files by removing the `.example` extension in the `/config` and `/db/config` directories.

1. **The `/config` Directory:**
   - Navigate to your project's `/config` folder:
      ```cmd
      cd config
      ```

   - Execute the following commands in your command prompt:
      ```cmd
      ren default.json.example default.json
      ren development.json.example development.json
      ren production.json.example production.json
      ```

2. **The `/db/config` Directory:**
   - Navigate back to your project's root folder:
      ```cmd
      cd ..
      ```

   - Navigate to your project's `/db/config` folder:
      ```cmd
      cd db/config
      ```

   - Similarly, use these commands:
      ```cmd
      ren default.json.example default.json
      ren development.json.example development.json
      ren production.json.example production.json
      ```
## Step 4: Verify and Prepare Database

Before proceeding to edit the configuration files, it's important to ensure that your PostgreSQL server is up and running. This can be easily done using `pgAdmin`, the graphical management tool for PostgreSQL.

1. **Open pgAdmin:**
   - Navigate to the pgAdmin application on your computer. If you followed the installation steps earlier, pgAdmin should be installed on your system. You can usually find it by searching for "pgAdmin" in your Windows Start menu.

      <details>
         <summary><i>(click to view the image)</i></summary>

      > <img src="https://github.com/kr-pound/project-plant-shop/blob/main/docs/sources/pgadmin-search.png?raw=true" alt="pgAdmin Search" title="Windows pgAdmin Search" width="80%" />
            
      </details>

2. **Connect to PostgreSQL Server:**
   - Upon opening pgAdmin, you'll see the Dashboard. Here, look for the `Servers` group in the left-hand panel. Expand it to see the PostgreSQL server you installed earlier.

      <details>
         <summary><i>(click to view the image)</i></summary>

      > <img src="https://github.com/kr-pound/project-plant-shop/blob/main/docs/sources/pgadmin-connect-local-server.png?raw=true" alt="pgAdmin Connect Local" title="Windows pgAdmin Connect Local" width="100%" />
            
      </details>

   - If you're prompted for a password, enter the `password` you set for the PostgreSQL superuser during the installation process.

      <details>
      <summary><i><strong>Note for the Default Username</strong> (click to expand)</i></summary>

      > The default username for connecting to the local server is `postgres`, which "pgAdmin" automatically recognizes. Therefore, you don't need to manually specify it.
         
      </details>

3. **Create New Database:**
   - Right-click on the `Databases` node under your server and select `Create` > `Database...`.

      <details>
         <summary><i>(click to view the image)</i></summary>

      > <img src="https://github.com/kr-pound/project-plant-shop/blob/main/docs/sources/pgadmin-database-create.png?raw=true" alt="pgAdmin Create Database" title="Windows pgAdmin Create Database Local" width="100%" />
            
      </details>

   - In the "Database" dialog that opens, enter `project-plant-shop` as the database name.
   - Click `Save` to create your new database.
   - Typically, if you can view the database's schemas, tables, and other properties without issue, the database is online and ready.

   - **You can [skip to step 5](#step-5-edit-configuration-files) if there are no issues with your database connection.**

   <details>
      <summary><i><strong>Note for Troubleshooting</strong> (click to expand)</i></summary>

   > If the database appears to be offline or if you encounter any issues connecting to the PostgreSQL server, verify that the PostgreSQL service is running on your machine. You can do this by searching for "Services" in your Windows Start menu, opening the `Services` application, and looking for a service named something like "postgresql-x64-16" (the exact name may vary depending on the PostgreSQL version you installed). If the service is not running, select "Start".

   > <img src="https://github.com/kr-pound/project-plant-shop/blob/main/docs/sources/services_search.png?raw=true" alt="Services Search" title="Windows Services Search" width="60%" />

   > <img src="https://github.com/kr-pound/project-plant-shop/blob/main/docs/sources/services_postgres_start.png?raw=true" alt="Services Start postgres" title="Windows Services Start postgres" width="100%" />

   > After troubleshooting, try connecting to the PostgreSQL Server in `pgAdmin` again. The problem should now be resolved.
         
   </details>

## Step 5: Edit Configuration Files

Now that your database is verified to be running, the next step is to configure your project settings to connect to your database correctly.

1. **Open Your Text Editor:**
   - Open your preferred text editor. If you installed `Visual Studio Code` (VS Code) as recommended, you can open it from your Windows Start menu

2. **Open Project Directory:**
   - In your text editor, open the project directory. In VS Code, you can do this by selecting `File` > `Open Folder` and navigating to the project's location.

### Update `/db/config/production.json`

This configuration file is specifically used for database migrations, ensuring your application's database schema is correctly set up.

1. **Navigate to Configuration Directory:**
   - Inside the project directory, locate the `/db/config` folder where the `production.json` file for database configuration resides.

2. **Update Database Configuration:**
   - Open the `production.json` files you renamed earlier in your text editor.
   - Locate the `connection` section within this file. It will typically look something like this:

     ```json
     "connection": {
         "host": "{{ PRODUCTION_DATABASE_HOST }}",
         "database": "{{ PRODUCTION_DATABASE_NAME }}",
         "user": "{{ PRODUCTION_DATABASE_USER }}",
         "password": "{{ PRODUCTION_DATABASE_PASSWORD }}",
         "url": "{{ PRODUCTION_DATABASE_FULL_URL }}",
         "ssl": true
      }
     ```

   - You will need to update the `connection` section to match your PostgreSQL database settings. Specifically:

      - **host**: Set to `localhost` for a local PostgreSQL server.
      - **database**: Your project's database name, e.g., `"project-plant-shop"`.
      - **user**: Typically `postgres`, unless a different user has been set up.
      - **password**: The password for your PostgreSQL database.
      - **url**: Here's the pattern for the PostgreSQL connection string:
         ```json
         postgres://<USER>:<PASSWORD>@<HOST>/<DATABASE_NAME>
         ```
         Replace `<USER>`, `<PASSWORD>`, `<HOST>`, and `<DATABASE_NAME>` with your actual credential. The connection URL would look like this:

         ```json
         "postgres://postgres:your_secure_password@localhost/project-plant-shop"
         ```
      - **ssl**: Usually `false` for local setup.

      Example of updated configuration:
      
      ```json
      "connection": {
            "host": "localhost",
            "database": "project-plant-shop",
            "user": "postgres",
            "password": "your_secure_password",
            "url": "postgres:your_secure_password@localhost/project-plant-shop",
            "ssl": false
         }
      ```

      Replace `"your_secure_password"` with the actual password and adjust other settings as necessary.

### Update `/config/production.json`

This is the main program configuration, which includes settings beyond the database, also needs to be updated. This `production.json` file, located in the `/config` directory, is crucial for the overall operation of the application.

1. **Navigate Configuration Directory:**
   - Go to the `/config` folder within your project directory. Here, you'll find another `production.json` file.

2. **Update Database Configuration:**
   - Open the `production.json` file in your text editor. Locate and update the `connection` section under `database` following the same structure and considerations as the database configuration file.

3. **Save Your Changes:**
   - After making the necessary updates to both `production.json` files, save your changes.

## Step 6: Running Database Migrations

To set up your database schema according to the project's requirements, you'll use `Knex`, an `SQL query` builder for Node.js.

1. **Navigate to the Project's Root Directory:**
   Ensure you are in the project's root directory in the command prompt. If you are not, use the `cd` command to navigate back to it.

   ```cmd
   cd ../..
   ```

2. **Run Migrations:**
   To apply all pending database migrations, execute the following command:

   ```cmd
   npx knex migrate:latest --knexfile db/knexfile.js
   ```

   <details>
      <summary><i><strong>Encounter Password Authentication Failure</strong> (click to expand)</i></summary>

   > This error typically occurs because Knex is attempting to run migrations using the `development` environment settings:
   > ```cmd
   > Using environment: development
   > password authentication failed for user "{{ DATABASE_USER }}"
   > error: password authentication failed for user "{{ DATABASE_USER }}"
   > ```

   > ### Troubleshooting Environment Configuration
   >
   > To resolve this issue, you need to set the `NODE_ENV` environment variable to `production` before running the migration command.
   > ```cmd
   > set NODE_ENV=production
   >```

   > Then, run the migration again
   > ```cmd
   > npx knex migrate:latest --knexfile db/knexfile.js
   >```
         
   </details>

   <details>
      <summary><i><strong>Encounter Migration Error `uuid_generate_v4()`</strong> (click to expand)</i></summary>

   > If you encounter an error during migration similar to the following:
   > ```cmd
   > migration file "20230326055828_init.js" failed
   > migration failed with error: create table "staffs" ("id" uuid default uuid_generate_v4(), "username" varchar(20) not null, "password" varchar(20) not null, constraint "staffs_pkey" primary key ("id")) - function uuid_generate_v4() does not exist
   > create table "staffs" ("id" uuid default uuid_generate_v4(), "username" varchar(20) not null, "password" varchar(20) not null, constraint "staffs_pkey" primary key ("id")) - function uuid_generate_v4() does not exist
   > ```

   > This issue occurs because the `uuid_generate_v4()` function, used for generating unique identifiers for database entries, is not available by default in PostgreSQL. It is provided by the `"uuid-ossp"` extension, which needs to be enabled in your database.

   > ### Troubleshooting Migration Error
   > To resolve this, you need to enable the `"uuid-ossp"` extension within your PostgreSQL database using the `PSQL Tool` in `pgAdmin`:
   >
   > 1. **Open pgAdmin and Connect to Your Database:**
      >> - Navigate to pgAdmin and connect to your PostgreSQL server.
      >> - In the browser tree view, navigate to your server, then Databases, and finally, right-click on your `project-plant-shop` database and select `PSQL Tool...`.
      >> <img src="https://github.com/kr-pound/project-plant-shop/blob/main/docs/sources/pgadmin-database-psql.png?raw=true" alt="pgAdmin Refresh" title="Windows pgAdmin Refresh" width="100%" />
   >
   > 2. **Enable the `"uuid-ossp"` Extension:**
      >> - In the Query Tool, enter the following SQL command:
      >>
      >> ```sql
      >> CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      >> ```
      >>
      >> - Then, run the migration again

   </details>

   **You can [skip to step 7](#step-7-verify-database-setup) If the migration completes successfully**

   <details>
      <summary><i><strong>If the migration does not complete successfully</strong> (click to expand)</i></summary>

   > You may need to delete the `project-plant-shop` database that has been created by `Knex`. (or the database name you have used in the `production.json` config file)

   > To delete the database:
     > - Open `pgAdmin` and connect to your PostgreSQL server.
     > - Under your server, click on the arrow icon next to the `Databases` section to view the list of databases.
     > - Right-click on the `project-plant-shop` database and select `Delete/Drop`.
     > - Confirm the deletion.
     > - After deleting the database, re-create the database, and run the migration command again.
         
   </details>

## Step 7: Verify Database Setup

After running the migrations, it's essential to verify that the database schema has been set up and recognized by `pgAdmin`.

1. **Open pgAdmin:**
   - Re-open `pgAdmin` and connect to your PostgreSQL server as you did in Step 4.

2. **Check the Database:**
   - Under your server, click on the arrow icon next to the `Databases` section to view the list of databases.
   - Navigate to the project's database within pgAdmin.
   - Look for the `Schemas` and then `Tables`, to ensure that the tables have been actually created as a result of the migration.

      <details>
         <summary><i><strong>If you cannot find database tables</strong> (click to expand)</i></summary>

      > <img src="https://github.com/kr-pound/project-plant-shop/blob/main/docs/sources/pgadmin-database-refresh.png?raw=true" alt="pgAdmin Refresh" title="Windows pgAdmin Refresh" width="100%" />

      > If you cannot find the database tables in `pgAdmin`, "right-click" on the `Databases` section and select `Refresh`.

      > If the database tables still cannot be found, it may be because they hasn't been created yet. In this case, attempt to run the migration command again.
            
      </details>

## Step 8: Running the Project

Now that the project setup for database connection are complete, you're ready to run the project and verify the connection to the database.

1. **Start the Project:**
   - Ensure you are in the project's root directory in the command prompt. If you are not, use the `cd` command to navigate back to it.

   - Run the project by executing the following command:

     ```cmd
     node index.js
     ```

      This command starts your Node.js application. If everything is set up correctly, you should see output indicating that the server is running and connected to the database.

2. **Verify the Connection:**
   - Look for messages indicating a successful connection to the database. It will look something like this:

      ```log
      app:startup === Automatic Plant Shop - Production ===
      Listening on port 3002...
      ```

3. **Stopping the Project:**
   - To stop the server, go back to the command prompt where the project is running and press `Ctrl + C`. This command stops the Node.js application.

   <details>
      <summary><i><strong>Note for Troubleshooting</strong> (click to expand)</i></summary>

   > **Database Connection Issues:**
   > - If you encounter issues connecting to the database, ensure the PostgreSQL service is running and the `production.json` configuration matches your database settings.

   > **Port Already in Use:**
   > - If you get an error indicating that the port is already in use, you may need to change the `PORT` in the `.env` file or stop the other application that is using the same port.

   > **Module Not Found Errors:**
   > - If you see errors about missing modules, run `npm install` in the project's root directory to ensure all dependencies are installed.
         
   </details>

## Note on Further Integrations

After completing Step 8, the initial project setup is finished. Please be aware that this project also includes integrations with external APIs for `Bank` and `Hardware Controller`, which require additional setup steps for simulating them.

## Documentation

For a detailed understanding of the project, including its architecture, technologies used, and how it integrates with the frontend, we recommend exploring the following resources:

- **Project Overview**: For a comprehensive overview of the Automatic Plant Shop project, including its objectives, benefits, and how it works, please visit our [Project Overview](https://www.canva.com/design/DAFhHgrEElo/1SBT6pT8EZJhtn4npe5n3A/edit).

- **Project Report**: For an in-depth analysis and report on the project, please refer to [Automatic_Plant_Shop_Report.pdf](./docs//Automatic_Plant_Shop_Report.pdf).
