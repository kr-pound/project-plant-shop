# Project Deployment Guide

This document outlines the steps to deploy the project on a cloud platform. Please note that each `cloud provider` offers unique tools and services that can help streamline deployment and management. Always refer to your provider's documentation for the most accurate and relevant information.

> Note that this guidance doesn't includes some integrations with external APIs for `Bank` and `Hardware Controller`. you may require additional setup steps for simulating them if needed.

## Pre-requisites

Before proceeding, ensure you have completed the following:

- A cloud provider account (e.g., AWS, Google Cloud, or Azure).
- Basic familiarity with cloud services and deployment.

## Step 1: Choose a Cloud Provider

Select a cloud provider that best fits your needs. Common choices include `AWS (Amazon Web Services)`, `Google Cloud Platform (GCP)`, and `Microsoft Azure`. This guide does not cover the specifics of each provider but will give a general overview applicable to any of them.

## Step 2: Set Up a Cloud Server

1. **Create a Virtual Machine (VM):** Follow your cloud provider's documentation to create a VM instance. Choose an operating system that you are comfortable with, but it's recommended to use an LTS version for stability.

2. **Access Your VM:** Once your VM is set up, connect to it using SSH (Secure Shell). Your cloud provider will give you the credentials and instructions on how to do this.

## Step 3: Install Software Dependencies

Install the software dependencies mentioned in the [Prerequisites section of SETUP.md](SETUP.md#prerequisites) on your VM. This includes `Git`, `Node.js`, `NPM`, and `PostgreSQL`. The installation steps are similar, but ensure you follow the instructions that match your VM's operating system.

## Step 4: Clone the Project

Refer to the [Step 1: Clone the Project in SETUP.md](SETUP.md#step-1-clone-the-project) for instructions on cloning the project to your VM.

## Step 5: Install Project Dependencies

Just like in the local setup, navigate to the project directory and run `npm install` to install the project dependencies. This step is identical to [Step 2 in SETUP.md](SETUP.md#step-2-install-project-dependencies).

## Step 6: Prepare Configuration Files

Follow the instructions in [Step 3: Prepare Configuration Files in SETUP.md](SETUP.md#step-3-prepare-configuration-files), adjusting paths and configurations as necessary for your cloud environment.

## Step 7: Set Up the Database

For cloud deployment, you have two options:

1. **Use a managed database service:** Most cloud providers offer managed PostgreSQL services. Please follow your provider's documentation to set one up and note the credentials.

2. **Install PostgreSQL on your VM:** If you prefer managing the database yourself, install PostgreSQL on your VM. Refer to the [Prerequisites section of SETUP.md](SETUP.md#prerequisites) for installation instructions, adjusted for your VM's operating system.

## Step 8: Configure the Database

Adjust the database configuration in your project to match your cloud setup. This involves editing the `production.json` files in both `/config` and `/db/config` directories with your cloud database's connection details.

Refer to the [Step 5: Edit Configuration Files](SETUP.md#step-5-edit-configuration-files) for instructions.

## Step 9: Running Database Migrations

Run the database migrations as described in [Step 6 of SETUP.md](SETUP.md#step-6-running-database-migrations), ensuring your environment is set to `production`.

## Step 10: Running the Project

Start the project using the same command as in the local setup (`node index.js`). However, you can consider adjusting this step as you like.

## Documentation

For a detailed understanding of the project, including its architecture, technologies used, and how it integrates with the frontend, we recommend exploring the following resources:

- **Project Overview**: For a comprehensive overview of the Automatic Plant Shop project, including its objectives, benefits, and how it works, please visit our [Project Overview](https://www.canva.com/design/DAFhHgrEElo/1SBT6pT8EZJhtn4npe5n3A/edit).

- **Project Report**: For an in-depth analysis and report on the project, please refer to [Automatic_Plant_Shop_Report.pdf](./docs//Automatic_Plant_Shop_Report.pdf).
