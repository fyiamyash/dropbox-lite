# Dropbox-Lite: File Upload & Sync Service

A large-file upload and local file synchronization system built around
direct S3-compatible object storage uploads, chunked uploads, presigned
URLs, local filesystem watching, and asynchronous processing.

The system is designed to keep the backend lightweight while allowing
clients to upload large files directly to object storage.

# Architecture

<img width="1683" height="807" alt="Screenshot 2026-08-18 at 5 40 52 PM" src="https://github.com/user-attachments/assets/0861017a-9cea-4ab0-ac9d-2ad486a3bfb8" />

# How It Works

## 1. Local file watching

The client-side/local watcher monitors a local storage directory using
Chokidar.

This allows the system to react to:

New files

File changes

File deletions

Other filesystem events supported by the watcher

For macOS and Windows, filesystem polling can be used when necessary.

The watcher is particularly useful for detecting changes to large files
without requiring the user to manually trigger an upload.

## 2. Upload request

When a file needs to be uploaded, the client communicates with the
backend.

The backend is responsible for:

Authentication

Rate limiting

SSL/TLS termination

Coordinating the upload workflow

Communicating with the upload/download service

The actual file data does not need to pass through the backend.

## 3. Chunked upload

Large files are split into chunks.

The upload service generates presigned URLs for the chunks and returns
them to the client.

The client can then upload each chunk directly to S3-compatible storage.

This avoids making the backend a bottleneck for large file transfers.

## 4. Sync service

The sync service receives the file ID and can request the associated
metadata and object-storage URL.

It is responsible for helping synchronize the local filesystem with the
remotely stored file state.

A simplified flow is:

Local filesystem
│
▼
Chokidar
│
▼
Backend
│
▼
Sync Service
│
├────► PostgreSQL
│
└────► S3-compatible storage

## Technology Stack

TypeScript : Application development and type safety

Bun : JavaScript/TypeScript runtime and tooling

Express : HTTP backend/API

Chokidar : Local filesystem watching

BullMQ : Background job and queue processing

PostgreSQL : File and upload metadata storage

S3 SDK : S3-compatible object storage
operations

MinIO : S3-compatible object storage for
local/development environments

Axios : HTTP requests, including presigned
URL uploads
