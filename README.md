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
  * Users can log in
  * Users can view and edit:
    * Documents that they own; or,
    * Documents for which they are a collaborator
* Document Editing
  * Users can edit their documents
  * Users can simultaneously edit shared documents
  * The app autosaves changes made to documents
  * The app synchronizes changes across active users
  * Users can see which collaborators are actively editing the same document
* Document Management
  * Users can see a list of their documents
  * Users can create and delete documents
  * Users can add collaborators to, or remove collaborators from, documents

