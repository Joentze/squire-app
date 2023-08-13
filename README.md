### What is SQUIRE 🔮

****************Squire,**************** is a Recommendation-as-a-Service (RaaS)/SaaS no-code platform that allows business owners and internet entrepreneurs to build recommendation engine technology and access them through easy-to-use APIs.

### Purpose

Billion-dollar companies stay on top because of their technology — crucially, recommendation engines. Small businesses lose out when they have insufficient capital or technical know-how to build recommendation engines to recommend the right products to their customers.

Squire provides small businesses with a low-cost and easy tool to build recommendation engines that increase their growth potential.

### Scope

The scope of Squire encompasses the development and provision of a Recommendation-as-a-Service (RaaS) platform that enables small businesses and internet entrepreneurs to easily create, customize, and utilize recommendation engines for their products. The platform's primary focus is to empower users who may lack the technical know-how or resources to build recommendation systems from scratch. Here are the key aspects of Squire's scope:

1. No-Code Recommendation Engine Creation:
Squire aims to provide a user-friendly interface that allows users to create recommendation engines without the need for extensive coding skills. Users can follow a step-by-step process to set up and configure their recommendation instances.
2. Data Integration and Annotation:
Users can integrate their product data through .csv file uploads or Notion database integration. The platform assists users in annotating the data, ensuring that it is properly structured and prepared for recommendation algorithms.
3. API Access and Integration:
Once a recommendation engine is created, users receive an API key that enables them to query recommendations based on various criteria, such as product descriptions, pricing, and geographic location. This feature allows users to seamlessly integrate recommendations into their applications and websites.

It's important to note that while Squire streamlines the process of creating and accessing recommendation engines, the platform's scope does not extend to broader e-commerce functionalities or complete application development. Squire's primary goal is to provide businesses with the tools they need to enhance customer experiences by integrating recommendation capabilities into their existing applications or platforms.

### Target Audience

1. Small businesses 
2. Start-ups
3. Entrepreneurs

### Definitions, Acronyms, and Abbreviations

APIs - Application Programming Interface(s)

RaaS - Recommendation-as-a-Service

SaaS - Software-as-a-Service. Allows users to connect to and use cloud-based applications over the Internet

GET - A `GET` request is used to request data from a specified source

Recommendation Engine - A recommendation engine is a type of data filtering tool using machine learning algorithms to recommend the most relevant items to a particular user or customer

**Try the Squire App** [here](https://www.notion.so/Business-Plan-for-an-Online-Web-Scraper-9047e8d453534ec5a826b2d56656a4a5?pvs=21)

---


## Video Demo

Watch how squire works:

[https://youtu.be/CkLlfM9NKd4](https://youtu.be/CkLlfM9NKd4)

---

## Tech Stack 🍱

### Front-end

- React Typescript (Front-end Framework) 🥷🏻
- Tailwind CSS (Styling) 💨
- Mantine UI (Design System Library) 🏊🏻

### **Back-end**

- Firebase (Authentication, Firestore, Serverless Functions, Hosting) 🔥
- Supabase (Vector Embedding Store) ❇️
- Python Flask (Recommendation API) 🐍
- Docker 🐋
- Google Cloud Run (API Hosting) ☁️

---

## How Recommendations Work

Recommendations are created when two documents are similar. For example, “i really like pasta” and “top-10 pasta dishes” would be similar documents since they both mention the word “pasta”. In order for a computer to query that quickly we will have to use a vector embedding function. Simply put, the vector embedding function converts a set of texts into a vector space.

![Words being placed onto a 3D vector to be compared](images/Untitled.png)

Words being placed onto a 3D vector to be compared

For this project we will be using OpenAI’s `text-embedding-ada-002` embedding function, but many other embedding functions like word2vec exists. We will be creating the embedding via their [API](https://platform.openai.com/docs/guides/embeddings).

### Cosine Similarity

For us to push recommendations to our user, we need to compare different set of texts to find out which are most similar to our user’s query text. We use the cosine similarity rule which compares how “close” two vector coordinates are to each other.

![Untitled](images/Untitled%201.png)

On each build, new vector embeddings are created to be queried. Recommendations are given to the user by finding which text are similar to the input document or query.

---

## Software Architecture

![Squire Infrastructure 2 (1).jpg](<images/Squire_Infrastructure_2_(1).jpg>)

### Going Serverless

In order to create recommendations fast, the most straight forward way to create vector embeddings will be do so in **parallel** - this means creating embeddings at the same time on request.

A serverless architecture is the most straight forward architecture especially with Firebase’s integration of Firestore & Cloud Functions. With Cloud Functions, embeddings can be created in on a Firestore document creation (this is a watcher function that is triggered).

Parallelism is achieved by splitting the rows of datas into uniformed chunks and creating multiple documents for each build. In the backend, Firebase spins up multiple instances of `onChunkCreated` function to handle with the multiple document creations. See diagram below:

![squire parallelism.jpg](images/squire_parallelism.jpg)

Once embeddings are created, they are stored in Supabase through pgvector extension. Embeddings are matched and queried from Supabase as well.

### Database Choice

We used Firebase, non-relational database, mainly due to its easy integration with Firebase Cloud Functions. We ensured data integrity by enforcing data types on the front-end using typescript. We also used Firebase for its realtime features that allowed for a dynamic user experience on the front-end, especially for the **“Chat with your Data”** feature.

---

## About this Repository 🏛️

The Squire Github repository uses a monorepo-style. This is to allow for easy collaboration and a single source of truth in project management. The repository consists of two main directories `squire-frontend` & `squire-backend`.

---

## Continuous Deployment 🏃🏻

There are two main parts to deploy for the Squire App: **`squire-frontend`** & **`squire-backend`.**

### Deploying Front-end 🖼️

In order for the React App to be hosted two main steps are required:

- Building React App
- Pushing to hosting

For this, we will be using **Github Actions** to build the React App, and deploy it to Firebase Hosting. This build process can be seen in `./github/workflows/deploy-prod.yml` or below:

```yaml
name: Deploy to Production
on:
  push:
    branches:
      - main
jobs:
  deploy_live_website:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: cd squire-frontend && npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          entryPoint: ./squire-frontend
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
          projectId: squire-backend-5c68c
          channelId: live
```

### Deploying Back-end ⚙️

In order for the Python Flask recommendation API to be hosted, we need to build a docker image and push to Google Cloud Run. We did this by setting up a Cloud Build Trigger via this [documentation](https://cloud.google.com/run/docs/continuous-deployment-with-cloud-build)

### On Push 👊🏻

Both deployments happen when pushed to `main` branch. Although not implemented for much of the progress of this project, the current CD setup allows for GitOps where pull request can be reviewed and **deployed on merge**.

---

# Run Locally 💽

## Obtaining Keys 🔑

Before we set up anything locally, it’s important to note that Squire uses cloud-based resources, like OpenAI’s Embedding APIs, to create recommendations. This means that we have to obtain API keys for the project in order to run it locally.

### For Supabase & OpenAI ✳️

Obtain Supabase URL & Password in **API settings** of Supabase project page. Create a python exactly named `access_keys.py` in `./squire-backend`

Similarly for OpenAI, create an API key and add in the following into `access_keys.py`:

```bash
SUPABASE_URL = "YOUR_URL"
SUPABASE_PWD = "YOUR_PASSWORD"
OPENAI_API_KEY = "YOUR_KEY"
```

For Cloud Functions to run locally, add a `.env` file in `./squire-backend/functions` and provision the following credentials:

```bash
OPEN_AI_KEY=YOUR_KEY
SUPABASE_URL=YOUR_URL
SUPABASE_PWD=YOUR_PASSWORD
SQUIRE_API_URL=https://squire-backend-2uxu4fb6fq-as.a.run.app
```

_Note, you can swap out `SQUIRE_API_URL` for your locally run flask server which will discuss below._

## Running Front-end 🖼️

To start using front-end, user must have **Node.js** v18.12.1 installed. To get started navigate to `./squire-frontend` & run the following commands:

```bash
npm install
npm start
```

React should run at `[localhost:3000](http://localhost:3000)` by default.

### Firebase 🔥

To emulate Firestore, Authentication & Cloud Functions on local machine, users can install firebase tools:

```bash
npm install -g firebase-tools
```

Set up Firebase cli using the following [documentation](https://firebase.google.com/codelabs/firebase-emulator#1)

### Build Functions

Run the following commands to build Firebase Functions:

```bash
cd ./squire-frontend/functions && npm run build
```

Run Firebase Emulators by running the command:

```bash
firebase emulators:start
```

Emulators have already been configured, see `firebase.json`

Users can now use Squire without the need for cloud-hosted Firebase

## Running Back-end ⚙️

### Setting up Supabase ❇️

In order to test back-end in your own environment, you need to have a Supabase backend hosted on the cloud. Go to Supabase and create new project. Create `document` tables using SQL schema in `./squire-backend/supabase_sql/squire_schema.sql` & create `function` using `./squire-backend/supabase_sql/pg_query_function.sql`

Navigate to `./squire-backend` and type in the following commands:

```bash
pip3 install -r requirements.txt
python3 app.py
```

## For Linux/MacOS Users 🍎

For Linux/MacOS users, we can use a Makefile to simplify set up.

Create a `.env` file in the root directory, and add in the following:

```bash
OPEN_AI_KEY=YOUR_KEY
SUPABASE_URL=YOUR_URL
SUPABASE_PWD=YOUR_PASSWORD
SQUIRE_API_URL=https://squire-backend-2uxu4fb6fq-as.a.run.app
PORT="8080"
```

Just run the following commands:

```bash
make all_credentials
make emulators
make frontend
make backend
```

---

## How to Use

### 1. Login/Sign Up

![1.png](images/1.png)

### 2. Creating a Project

![create a new project by clicking the ‘+’ sign](images/2.png)

create a new project by clicking the ‘+’ sign

![give a project name and project description](images/3.png)

give a project name and project description

![upload your excel file containing data](images/4.png)

upload your excel file containing data

### 3. Creating a Build

![give a build message, followed by labelling the data desired](images/5.png)

give a build message, followed by labelling the data desired

### 4. Querying

![use the query text field to search through your data, and click submit](images/6.png)

use the query text field to search through your data, and click submit

![response returned will match the query text, with a similarity rating displayed as well](images/7.png)

response returned will match the query text, with a similarity rating displayed as well

### 5. Chatting with your Data

![chatting with your data allows you to ask questions](images/8.png)

chatting with your data allows you to ask questions

### Creating Multiple Builds

![a new build can be created under the same project, whenever new data has been added](images/9.png)

a new build can be created under the same project, whenever new data has been added

![give a build message and label the data](images/10.png)

give a build message and label the data

![based on the specified project and build, ask away!](images/11.png)

based on the specified project and build, ask away!

