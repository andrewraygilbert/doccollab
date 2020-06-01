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
  * Users can log in (functional)
  * Users can view and edit: (functional)
    * Documents that they own; or,
    * Documents for which they are a collaborator
* Document Editing
  * Users can edit their documents (functional)
  * Users can simultaneously edit shared documents (functional)
  * The app autosaves changes made to documents (not functional)
  * The app synchronizes changes across active users (functional)
  * Users can see which collaborators are actively editing the same document (not functional)
* Document Management
  * Users can see a list of their documents (functional)
  * Users can create documents (functional)
  * Users can delete documents (not functional)
  * Users can add collaborators to documents (functional)
  * Users can remove collaborators from documents (not functional)
* Optimization
  * Delta records are purged regularly to minimize memory load (functional)

