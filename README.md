<div align="center">

# 🏥 CareNest

### Modern Healthcare Management Platform

[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/u/jayadevarun2003)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

*A microservices-based healthcare application for managing appointments, prescriptions, notifications, and patient-doctor interactions — fully Dockerized and production-ready.*

[Features](#-features) · [Architecture](#-architecture) · [Quick Start](#-quick-start) · [API Docs](#-api-endpoints) · [Docker](#-docker-usage)

</div>

---

## 📋 Project Overview

**CareNest** is a modern, full-stack healthcare management platform designed to streamline interactions between patients and doctors. Built with a microservices architecture, it provides:

- **Patients**: Book appointments, view prescriptions, and manage their healthcare journey
- **Doctors**: Manage schedules, confirm appointments, and create prescriptions
- **Platform**: Secure JWT-based authentication with role-based access control (RBAC)

### Problem It Solves

Traditional healthcare systems often rely on fragmented tools and manual processes. CareNest provides a unified, digital-first solution that:

- Eliminates scheduling conflicts with real-time appointment management
- Digitizes prescription workflows for accuracy and accessibility
- Ensures data security with industry-standard authentication

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | JWT-based auth with RBAC (Patient & Doctor roles) |
| 📅 **Appointments** | Create, confirm, cancel, and complete appointments |
| 💊 **Prescriptions** | Doctors create prescriptions; patients view and track them |
| 🔔 **Notifications** | Real-time alerts for both patients and doctors on key actions |
| 🎨 **Modern UI** | React + Tailwind CSS v4 with animations and responsive design |
| 🐳 **Fully Dockerized** | Production-grade Dockerfiles with multi-stage builds |
| 🏗️ **Microservices** | Independently deployable services with loose coupling |
| ❤️ **Health Checks** | Every service exposes a `/health` endpoint |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                          │
│                     Port 3000 (nginx:80)                         │
└───────┬──────────────┬──────────────┬──────────────┬─────────────┘
        │              │              │              │
 ┌──────▼──────┐ ┌─────▼──────┐ ┌────▼───────┐ ┌────▼───────┐
 │ Auth Service│ │Appointment │ │  Pharmacy  │ │   Notify   │
 │  Port 3001  │ │  Port 3002 │ │  Port 3003 │ │  Port 3004 │
 └──────┬──────┘ └─────┬──────┘ └────┬───────┘ └────┬───────┘
        │              │              │              │
 ┌──────▼──────────────▼──────────────▼──────────────▼───────┐
 │                    MongoDB (Port 27017)                    │
 │  auth_db  │  appointments_db  │  pharma_db  │  notify_db  │
 └───────────────────────────────────────────────────────────┘
```

### Service Communication

- **Frontend → Backend**: REST API calls via nginx reverse proxy
- **Inter-service Auth**: Shared JWT secret for token validation
- **Database**: Each service uses a separate MongoDB database for isolation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite 6, Tailwind CSS v4, React Router v6, Axios, Lucide Icons |
| **Backend** | Node.js 20, Express 4, Mongoose 8, JWT, bcryptjs |
| **Database** | MongoDB 7 |
| **Containerization** | Docker (multi-stage builds), Docker Compose |
| **Web Server** | nginx (frontend production serving + API proxy) |

---

## 📁 Project Structure

```
CareNest/
├── frontend/                          # React Frontend
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── AppointmentCard.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrescriptionCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── NotificationPanel.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx        # Auth state management
│   │   ├── pages/
│   │   │   ├── Appointments.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Prescriptions.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js                 # Axios instance
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── nginx.conf
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── services/
│   ├── auth/                          # Authentication Service
│   │   ├── src/
│   │   │   ├── config/db.js
│   │   │   ├── controllers/authController.js
│   │   │   ├── middleware/auth.js
│   │   │   ├── models/User.js
│   │   │   ├── routes/authRoutes.js
│   │   │   ├── services/authService.js
│   │   │   └── index.js
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── .env.example
│   │   └── package.json
│   │
│   ├── appointment/                   # Appointment Service
│   │   ├── src/
│   │   │   ├── config/db.js
│   │   │   ├── controllers/appointmentController.js
│   │   │   ├── middleware/auth.js
│   │   │   ├── models/Appointment.js
│   │   │   ├── routes/appointmentRoutes.js
│   │   │   ├── services/appointmentService.js
│   │   │   └── index.js
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── .env.example
│   │   └── package.json
│   │
│   ├── pharmacy/                      # Pharmacy Service
│   │   ├── src/
│   │   │   ├── config/db.js
│   │   │   ├── controllers/pharmacyController.js
│   │   │   ├── middleware/auth.js
│   │   │   ├── models/Prescription.js
│   │   │   ├── routes/pharmacyRoutes.js
│   │   │   ├── services/pharmacyService.js
│   │   │   └── index.js
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── notify/                        # Notification Service
│       ├── src/
│       │   ├── config/db.js
│       │   ├── controllers/notifyController.js
│       │   ├── middleware/auth.js
│       │   ├── models/Notification.js
│       │   ├── routes/notifyRoutes.js
│       │   ├── services/notifyService.js
│       │   └── index.js
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── .env.example
│       └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- [Node.js 20+](https://nodejs.org/) (for local development)
- [Git](https://git-scm.com/)

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/JayadevArun/CareNest.git
cd CareNest

# Start all services
docker-compose up --build

# Access the application
# Frontend:    http://localhost:3000
# Auth API:    http://localhost:3001
# Appt API:    http://localhost:3002
# Pharma API:  http://localhost:3003
# Notify API:  http://localhost:3004
```

### Option 2: Run Services Locally

```bash
# 1. Start MongoDB (required)
docker run -d -p 27017:27017 --name mongo mongo:7

# 2. Auth Service
cd services/auth
cp .env.example .env
npm install
npm run dev

# 3. Appointment Service (new terminal)
cd services/appointment
cp .env.example .env
npm install
npm run dev

# 4. Pharmacy Service (new terminal)
cd services/pharmacy
cp .env.example .env
npm install
npm run dev

# 5. Notify Service (new terminal)
cd services/notify
cp .env.example .env
npm install
npm run dev

# 6. Frontend (new terminal)
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

---

## 🐳 Docker Usage

### Build Images

```bash
# Build all images at once
docker-compose build

# Build individual images
docker build -t jayadevarun2003/carenest-auth ./services/auth
docker build -t jayadevarun2003/carenest-appointment ./services/appointment
docker build -t jayadevarun2003/carenest-pharmacy ./services/pharmacy
docker build -t jayadevarun2003/carenest-notify ./services/notify
docker build -t jayadevarun2003/carenest-frontend ./frontend
```

### Push to Docker Hub

```bash
docker push jayadevarun2003/carenest-auth
docker push jayadevarun2003/carenest-appointment
docker push jayadevarun2003/carenest-pharmacy
docker push jayadevarun2003/carenest-notify
docker push jayadevarun2003/carenest-frontend
```

### Run Individual Containers

```bash
# Auth service
docker run -d -p 3001:3001 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/carenest_auth \
  -e JWT_SECRET=your_secret \
  jayadevarun2003/carenest-auth

# Appointment service
docker run -d -p 3002:3002 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/carenest_appointments \
  -e JWT_SECRET=your_secret \
  jayadevarun2003/carenest-appointment

# Pharmacy service
docker run -d -p 3003:3003 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/carenest_pharmacy \
  -e JWT_SECRET=your_secret \
  jayadevarun2003/carenest-pharmacy

# Notify service
docker run -d -p 3004:3004 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/carenest_notifications \
  -e JWT_SECRET=your_secret \
  jayadevarun2003/carenest-notify
```

### Image Naming Convention

| Service | Image Name |
|---------|-----------|
| Auth | `jayadevarun2003/carenest-auth` |
| Appointment | `jayadevarun2003/carenest-appointment` |
| Pharmacy | `jayadevarun2003/carenest-pharmacy` |
| Notify | `jayadevarun2003/carenest-notify` |
| Frontend | `jayadevarun2003/carenest-frontend` |

### Dockerfile Best Practices Used

- ✅ Multi-stage builds (especially React frontend)
- ✅ Lightweight base images (`node:20-alpine`, `nginx:alpine`)
- ✅ Non-root user execution (backend services)
- ✅ Layer optimization (`COPY package*.json` before source)
- ✅ `.dockerignore` for every service
- ✅ Environment variables (no hardcoded values)
- ✅ Proper port exposure

---

## 🔧 Environment Variables

### Auth Service (`services/auth/.env.example`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | `3001` |
| `MONGO_URI` | MongoDB connection string | `mongodb://mongo:27017/carenest_auth` |
| `JWT_SECRET` | Secret key for JWT signing | — |
| `JWT_EXPIRES_IN` | Token expiration | `7d` |

### Appointment Service (`services/appointment/.env.example`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | `3002` |
| `MONGO_URI` | MongoDB connection string | `mongodb://mongo:27017/carenest_appointments` |
| `JWT_SECRET` | Shared JWT secret | — |

### Pharmacy Service (`services/pharmacy/.env.example`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | `3003` |
| `MONGO_URI` | MongoDB connection string | `mongodb://mongo:27017/carenest_pharmacy` |
| `JWT_SECRET` | Shared JWT secret | — |

### Notify Service (`services/notify/.env.example`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | `3004` |
| `MONGO_URI` | MongoDB connection string | `mongodb://mongo:27017/carenest_notifications` |
| `JWT_SECRET` | Shared JWT secret | — |

> ⚠️ **Important**: All services must share the same `JWT_SECRET` for token validation across services.

---

## 📡 API Endpoints

### Auth Service (Port 3001)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register new user |
| `POST` | `/api/auth/login` | ❌ | Login and get JWT |
| `GET` | `/api/auth/profile` | ✅ | Get current user profile |
| `GET` | `/api/auth/doctors` | ✅ | List all doctors |
| `GET` | `/health` | ❌ | Health check |

### Appointment Service (Port 3002)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/api/appointments` | ✅ | Patient | Create appointment |
| `GET` | `/api/appointments` | ✅ | Any | List user's appointments |
| `GET` | `/api/appointments/:id` | ✅ | Any | Get appointment details |
| `PUT` | `/api/appointments/:id` | ✅ | Any | Update appointment |
| `GET` | `/health` | ❌ | — | Health check |

### Pharmacy Service (Port 3003)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/api/prescriptions` | ✅ | Doctor | Create prescription |
| `GET` | `/api/prescriptions` | ✅ | Any | List prescriptions |
| `GET` | `/api/prescriptions/:id` | ✅ | Any | Get prescription details |
| `PUT` | `/api/prescriptions/:id/status` | ✅ | Any | Update status |
| `GET` | `/health` | ❌ | — | Health check |

### Notify Service (Port 3004)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/notifications` | ✅ | Create notification(s) — accepts single object or array |
| `GET` | `/api/notifications` | ✅ | List current user's notifications + unread count |
| `PUT` | `/api/notifications/read-all` | ✅ | Mark all notifications as read |
| `PUT` | `/api/notifications/:id/read` | ✅ | Mark single notification as read |
| `GET` | `/health` | ❌ | Health check |

> 💡 **How notifications work**: When a patient books an appointment or a doctor creates a prescription, the frontend sends a fire-and-forget notification request. The notify service stores it, and the sidebar bell icon polls for new notifications every 30 seconds. If the notify service is unavailable, the app continues working normally.

---

## 🔐 Security Practices

| Practice | Implementation |
|----------|---------------|
| **No hardcoded secrets** | All sensitive values use environment variables |
| **JWT Authentication** | Stateless token-based auth with configurable expiration |
| **RBAC** | Role-based middleware (`patient`, `doctor`) |
| **Password Hashing** | bcrypt with 12 salt rounds |
| **Input Validation** | express-validator on all endpoints |
| **Non-root containers** | Backend Dockerfiles use `appuser` |
| **CORS** | Enabled with configurable origins |
| **`.env.example` files** | Template files with no real credentials |

---

## ☸️ Kubernetes Deployment (Helm)

### Architecture

```
User → HAProxy (LoadBalancer) → Envoy Gateway (kGateway) → K8s Services → Pods
                                                              ↓
                                                     MongoDB StatefulSet
                                                     Redis Deployment
```

**Traffic flow:**
1. User sends request to **HAProxy** (external LoadBalancer on port 80)
2. HAProxy forwards to **Envoy Gateway** (internal kGateway)
3. Envoy uses **HTTPRoute** rules for path-based routing:
   - `/api/auth/*` → auth-service:3001
   - `/api/appointments/*` → appointment-service:3002
   - `/api/prescriptions/*` → pharmacy-service:3003
   - `/api/notifications/*` → notify-service:3004
   - `/*` → frontend-service:80
4. All backend services are **ClusterIP** (internal only)

---

### Helm Chart Structure

```
helm/
└── carenest/
    ├── Chart.yaml                       # Chart metadata
    ├── values.yaml                      # All configurable values
    └── templates/
        ├── namespace.yaml               # carenest-dev / carenest-prod
        ├── configmap.yaml               # Non-sensitive config
        ├── secrets.yaml                 # JWT_SECRET, MongoDB URIs
        ├── mongo-statefulset.yaml       # MongoDB with PVC
        ├── mongo-service.yaml           # Headless service
        ├── redis-deployment.yaml        # Redis cache
        ├── redis-service.yaml           # Redis ClusterIP
        ├── auth-deployment.yaml         # Auth + init container
        ├── auth-service.yaml            # ClusterIP :3001
        ├── appointment-deployment.yaml  # Appointment + init container
        ├── appointment-service.yaml     # ClusterIP :3002
        ├── pharmacy-deployment.yaml     # Pharmacy + init container
        ├── pharmacy-service.yaml        # ClusterIP :3003
        ├── notify-deployment.yaml       # Notify + init container
        ├── notify-service.yaml          # ClusterIP :3004
        ├── frontend-deployment.yaml     # React/nginx
        ├── frontend-service.yaml        # ClusterIP :80
        ├── hpa-frontend.yaml           # HPA (CPU-based, frontend only)
        ├── envoy-gateway.yaml          # Envoy Gateway resource
        ├── httproute.yaml              # Path-based routing rules
        ├── haproxy-deployment.yaml     # HAProxy + ConfigMap + Service
        ├── rbac.yaml                   # ServiceAccount + Role + Binding
        ├── networkpolicy.yaml          # Traffic restriction policies
        ├── pdb.yaml                    # Pod Disruption Budgets
        └── pvc.yaml                    # Persistent Volume Claim
```

---

### Prerequisites

- Kubernetes cluster (kubeadm, EKS, etc.)
- `kubectl` configured
- `helm` 3.x installed
- [Gateway API CRDs](https://gateway-api.sigs.k8s.io/) installed
- [Envoy Gateway](https://gateway.envoyproxy.io/) installed

```bash
# Install Gateway API CRDs
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.0/standard-install.yaml

# Install Envoy Gateway
helm install envoy-gateway oci://docker.io/envoyproxy/gateway-helm --version v1.2.0 -n envoy-gateway-system --create-namespace
```

---

### Deploy with Helm

```bash
# Development environment
helm install carenest ./helm/carenest \
  --set namespace=carenest-dev \
  --set environment=dev

# Production environment (override values)
helm install carenest ./helm/carenest \
  --set namespace=carenest-prod \
  --set environment=prod \
  --set secrets.jwtSecret=$(echo -n "YOUR_PROD_SECRET" | base64) \
  --set replicas.auth=3 \
  --set replicas.appointment=3 \
  --set replicas.frontend=3

# Upgrade after changes
helm upgrade carenest ./helm/carenest

# Uninstall
helm uninstall carenest
```

---

### Verify Deployment

```bash
# Check all pods
kubectl get pods -n carenest-dev

# Check services
kubectl get svc -n carenest-dev

# Check HPA
kubectl get hpa -n carenest-dev

# Check PDB
kubectl get pdb -n carenest-dev

# Check gateway and routes
kubectl get gateway,httproute -n carenest-dev

# View logs
kubectl logs -f deployment/auth -n carenest-dev
kubectl logs -f deployment/notify -n carenest-dev

# Access via HAProxy LoadBalancer
kubectl get svc haproxy-service -n carenest-dev
```

---

### Key Features

| Feature | Implementation |
|---------|---------------|
| **Rolling Updates** | maxUnavailable: 1, maxSurge: 1 for all deployments |
| **Health Probes** | readinessProbe + livenessProbe on `/health` |
| **Init Containers** | All backends wait for MongoDB before starting |
| **HPA** | Frontend auto-scales 2→10 pods at 70% CPU |
| **PDB** | minAvailable: 1 for every service |
| **RBAC** | Minimal ServiceAccount with read-only access |
| **Network Policies** | Default deny + explicit allow rules |
| **Graceful Shutdown** | terminationGracePeriodSeconds: 30 |
| **ConfigMap** | Ports, service URLs, JWT expiry |
| **Secrets** | JWT_SECRET, MongoDB URIs (base64) |
| **Persistent Storage** | MongoDB StatefulSet with dynamic PVC |
| **Caching** | Redis ClusterIP for optional caching |

---

### Storage (MongoDB + PVC)

MongoDB runs as a **StatefulSet** with `volumeClaimTemplates` for persistent storage:
- Data survives pod restarts and rescheduling
- Default storage size: `5Gi` (configurable via `values.yaml`)
- Dynamic provisioning uses the cluster's default StorageClass

---

### Scaling (HPA)

Only the **frontend** has HPA enabled:
- **Min replicas**: 2
- **Max replicas**: 10
- **Target CPU**: 70%
- Requires `metrics-server` in the cluster

```bash
# Install metrics-server if needed
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

---

### Notify Service Flow (Kubernetes)

```
Patient books appointment
  → appointment-service Pod creates record in MongoDB
  → appointment-service calls http://notify-service:3004/api/notifications
    (non-blocking, forwards JWT, fire-and-forget)
  → notify-service extracts userId from JWT, stores in MongoDB
  → Returns success to frontend
  → Frontend shows toast popup
  → Bell icon polls /api/notifications every 30s
```

Internal DNS used: `http://notify-service:3004` (via ConfigMap `NOTIFY_SERVICE_URL`)

---

### Multi-Environment Support

Switch environments by overriding `namespace` and `environment`:

```bash
# Dev
helm install carenest-dev ./helm/carenest --set namespace=carenest-dev --set environment=dev

# Prod
helm install carenest-prod ./helm/carenest --set namespace=carenest-prod --set environment=prod
```

---

## 🔮 Future Enhancements

- [x] **Kubernetes Deployment** — Helm charts with HPA, RBAC, PDB, NetworkPolicy
- [x] **API Gateway** — Envoy Gateway with HTTPRoute path-based routing
- [x] **In-App Notifications** — Real-time notification bell + toast popups
- [ ] **CI/CD Pipeline** — GitHub Actions for automated build, test, and deploy
- [ ] **Observability** — Prometheus metrics, Grafana dashboards, structured logging
- [ ] **Email/SMS Notifications** — External delivery for appointment reminders
- [ ] **File Uploads** — Medical reports and imaging attachments
- [ ] **Search & Filters** — Advanced appointment and prescription search
- [ ] **Testing** — Unit tests, integration tests, and E2E tests

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|---------|
| Pods stuck in `Init` | MongoDB not ready. Check: `kubectl logs <pod> -c wait-for-mongo -n carenest-dev` |
| `CrashLoopBackOff` | Check logs: `kubectl logs <pod> -n carenest-dev` — likely missing env vars or DB connection |
| HPA not scaling | Ensure `metrics-server` is installed: `kubectl top pods -n carenest-dev` |
| Gateway not routing | Verify CRDs: `kubectl get gatewayclasses` and check Envoy Gateway is running |
| NetworkPolicy blocking | Temporarily delete policies to debug: `kubectl delete netpol --all -n carenest-dev` |
| PVC pending | Check StorageClass: `kubectl get sc` — ensure a default class exists |
| Notifications not working | Check notify pod logs and verify `NOTIFY_SERVICE_URL` in ConfigMap |
| HAProxy 503 | Envoy Gateway service not reachable. Check: `kubectl get svc -n carenest-dev` |

---

## 📝 License

This project is licensed under the MIT License.

---

<div align="center">

**Built with ❤️ using microservices architecture**

[⬆ Back to Top](#-carenest)

</div>
