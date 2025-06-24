💡 Architecture Overview

+---------------------------+
|    GitHub Actions CI/CD  |
+---------------------------+
            |
     (push to main)
            |
   +--------------------+
   | Docker Image Build |
   +--------------------+
            |
     Docker Hub (v1.0.0, v1.1.0, v2.0.0)
            |
   +------------------------+
   | Kubernetes Deployment |
   +------------------------+
            |
       NGINX Ingress
            |
       /v1 /v1-1 /v2
            |
   +---------------------------+
   | Product Service (Pods)   |
   +---------------------------+

🎓 Technologies Used

Node.js + Express (Microservice)

Docker (Containerization)

Kubernetes (Deployment & Namespaces)

NGINX Ingress Controller (Routing)

GitHub Actions (CI/CD)

📓 Component Breakdown

Product Microservice (v1, v1.1, v2)

RESTful GET endpoint /products

Each version adds features:

v1: Basic static data

v1.1: Search capability

v2: Filtering & modular design

Kubernetes Setup

Separate namespaces for versioning

CPU/memory limits defined in YAML

Ingress routes requests based on URL path prefix

GitHub Actions Pipeline

Trigger: push to main

Actions:

Build Docker image

Push to Docker Hub

kubectl set image updates deployment in cluster

Secrets Used

DOCKERHUB_USERNAME

DOCKERHUB_TOKEN

KUBE_CONFIG_DATA (base64 encoded)

🔎 Accessing the Service

You can test using:

curl http://localhost/v1/products
curl http://localhost/v1-1/products
curl http://localhost/v2/products

Each maps to its respective deployment via Ingress.

👨‍💼 Author

Laxmi Magadum

This architecture is student-friendly, modular, and easily extensible for future enhancements like authentication or databases.

