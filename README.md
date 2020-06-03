# Document Collaboration Prototype

This repo contains an in progress **prototype** of a document collaboration application.

## The Stack

* Database: MongoDB
* Frontend Framework: Angular
* Backend Framework: NestJS
* Backend Runtime: Node.js
* Workspace: Nx
* Real-time Data Library: Socket.io

## Core Features

* Primary Data
  * Users
  * Documents
* Authentication/Authorization
  * Users can log in | **Functional**
  * Users can view and edit: | **Functional**
    * Documents that they own; or,
    * Documents for which they are a collaborator
* Document Editing
  * Users can edit their documents | **Functional**
  * Users can simultaneously edit shared documents | **Functional**
  * The app autosaves changes made to documents | **NOT Functional**
  * The app synchronizes changes across active users | **Functional**
  * Users can see which collaborators are actively editing the same document | **NOT Functional**
* Document Management
  * Users can see a list of their documents | **Functional**
  * Users can create documents | **Functional**
  * Users can delete documents | **NOT Functional**
  * Users can add collaborators to documents | **Functional**
  * Users can remove collaborators from documents | **NOT Functional**
* Optimization
  * Delta records are purged regularly to minimize memory load | **Functional**
  * App maintains consistent state across clients when users type in the exact same spot at the same time | **Partially Functional**

