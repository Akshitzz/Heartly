# Heartly 🏥

<div align="center">

![Heartly Logo](https://via.placeholder.com/200x200?text=Heartly)

**Making healthcare accessible, one appointment at a time**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![CI/CD](https://github.com/your-org/heartly/workflows/CI/badge.svg)](https://github.com/your-org/heartly/actions)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing) • [Support](#-support)

</div>

---

## 📖 About

Heartly is a secure, production-grade healthcare platform that connects patients with the right doctors. Users can describe their health concerns, discover suitable healthcare providers, and book appointments seamlessly—all while maintaining HIPAA compliance and enterprise-level security.

### Why Heartly?

- 🔍 **Intelligent Matching**: AI-powered doctor recommendations based on symptoms
- 🏥 **Comprehensive Network**: Search across specialties, locations, and availability
- 🔒 **Secure & Compliant**: HIPAA/GDPR compliant with end-to-end encryption
- 📱 **Mobile-First**: Native iOS and Android apps for patients and doctors
- ⚡ **Real-Time Updates**: Instant notifications for appointments and reminders
- 📊 **Analytics Dashboard**: Insights for healthcare providers and administrators

---

## ✨ Features

### For Patients
- Symptom-based doctor search with AI assistance
- Filter by specialty, location, ratings, and insurance
- Real-time availability and instant booking
- Appointment reminders via SMS and email
- Medical history and prescription management
- Secure messaging with healthcare providers

### For Doctors
- Comprehensive schedule management
- Patient profiles and medical history access
- Appointment notifications and confirmations
- Analytics and reporting dashboard
- Revenue tracking and billing integration

### For Administrators
- Platform monitoring and analytics
- User management and access control
- Hospital and doctor onboarding
- Compliance reporting and audit logs

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Backend** | TypeScript, Express, GraphQL |
| **Database** | MongoDB (Replica Set) |
| **Cache** | Redis Cluster |
| **Queue** | BullMQ + Redis |
| **Messaging** | Apache Kafka |
| **Mobile** | Expo (React Native) |
| **Auth** | JWT / Auth0 |
| **Orchestration** | Kubernetes |
| **Monitoring** | Prometheus + Grafana |
| **Logging** | Winston + ELK Stack |
| **CI/CD** | GitHub Actions |

</div>

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- Node.js (v18 or higher)
- Docker and Docker Compose
- MongoDB (v6.0+)
- Redis (v7.0+)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/heartly.git
cd heartly

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Running with Docker Compose

```bash
# Start all services (MongoDB, Redis, Kafka, API)
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f api
```

### Running Locally

```bash
# Start infrastructure services only
docker-compose up -d mongodb redis kafka

# Run database migrations
npm run migrate:up

# Start the API server
npm run dev

# In a new terminal, start the worker
npm run worker:dev
```

### Mobile App

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start Expo development server
npm start

# Scan QR code with Expo Go app (iOS/Android)
```

### Access Points

- **GraphQL Playground**: http://localhost:4000/graphql
- **API Health Check**: http://localhost:4000/health
- **Admin Dashboard**: http://localhost:3000/admin

---


## 🔐 Environment Variables

Create a `.env` file in the root directory:

```bash
# Application
NODE_ENV=development
PORT=4000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/heartly
MONGODB_MAX_POOL_SIZE=10

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=heartly-api

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# External Services
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@heartly.health

# Monitoring (Optional)
SENTRY_DSN=your-sentry-dsn
NEW_RELIC_LICENSE_KEY=your-newrelic-key

# Feature Flags
ENABLE_AI_RECOMMENDATIONS=true
ENABLE_VIDEO_CONSULTATION=false
```

⚠️ **Security Note**: Never commit `.env` files to version control. Use `.env.example` as a template.

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

### Testing Standards

- **Unit Tests**: Minimum 80% code coverage
- **Integration Tests**: All API endpoints
- **E2E Tests**: Critical user journeys
- **Load Tests**: Performance benchmarks with k6

### Example Test

```typescript
describe('Appointment Service', () => {
  it('should create appointment successfully', async () => {
    const appointment = await appointmentService.create({
      patientId: 'patient-123',
      doctorId: 'doctor-456',
      date: new Date('2025-12-01T10:00:00Z'),
      reason: 'Annual checkup'
    });

    expect(appointment).toBeDefined();
    expect(appointment.status).toBe('pending');
  });
});
```

---

## 🚢 Deployment

### Docker Build

```bash
# Build production image
docker build -t heartly-api:latest .

# Run container
docker run -p 4000:4000 --env-file .env heartly-api:latest
```

### Kubernetes Deployment

```bash
# Apply Kubernetes configurations
kubectl apply -f k8s/production/

# Check deployment status
kubectl rollout status deployment/heartly-api

# Scale application
kubectl scale deployment/heartly-api --replicas=5

# View logs
kubectl logs -f deployment/heartly-api
```

### Database Migrations

```bash
# Run pending migrations
npm run migrate:up

# Rollback last migration
npm run migrate:down

# Create new migration
npm run migrate:create add-appointment-notes
```

---

## 📊 Monitoring & Health Checks

### Health Endpoints

```bash
# Application health
GET /health

# Database connectivity
GET /health/db

# Dependencies status
GET /health/dependencies
```

### Monitoring Stack

- **Metrics**: Prometheus for collection, Grafana for visualization
- **Logging**: Winston → Elasticsearch → Kibana
- **Errors**: Sentry for error tracking and alerting
- **Uptime**: Pingdom for external monitoring

### Key Metrics

- Request rate and latency (p50, p95, p99)
- Error rate by endpoint
- Database query performance
- Queue processing times
- Active user sessions

---

## 🔒 Security

### Authentication Flow

1. User logs in with credentials
2. Server validates and returns JWT access token (15min) + refresh token (7 days)
3. Client includes access token in `Authorization` header
4. On token expiry, client uses refresh token to get new access token

### Security Best Practices

- ✅ All passwords hashed with bcrypt (12 rounds)
- ✅ JWT tokens with short expiration
- ✅ Rate limiting on all endpoints
- ✅ Input validation with Joi/Zod
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection with helmet.js
- ✅ CORS configured for specific origins
- ✅ HTTPS enforced in production
- ✅ Secrets stored in environment variables
- ✅ Regular dependency audits with `npm audit`

### Compliance

- **HIPAA**: Encrypted data storage, audit logging, access controls
- **GDPR**: Data portability, right to erasure, consent management
- **SOC 2**: Security controls and monitoring (in progress)

---

## 📚 Documentation

- **API Documentation**: [docs/api/README.md](docs/api/README.md)
- **Architecture Decisions**: [docs/architecture/](docs/architecture/)
- **Deployment Runbooks**: [docs/runbooks/](docs/runbooks/)
- **Contributing Guide**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Code of Conduct**: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

### GraphQL Schema

View the complete GraphQL schema in [GraphQL Playground](http://localhost:4000/graphql) or check [docs/api/schema.graphql](docs/api/schema.graphql).

---

## 🤝 Contributing

We love contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add video consultation feature
fix: resolve appointment booking race condition
docs: update API documentation
chore: upgrade dependencies
test: add unit tests for doctor service
```

### Code Standards

- **Linting**: ESLint with Airbnb TypeScript config
- **Formatting**: Prettier (auto-format on save)
- **Type Safety**: Strict TypeScript mode enabled
- **Testing**: Required for all new features

---

## 🐛 Reporting Issues

Found a bug? Have a feature request? Please check our [issue tracker](https://github.com/your-org/heartly/issues) first.

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 14.0]
- Node.js version: [e.g., 18.17.0]
- Browser: [e.g., Chrome 120]
```

---

## 📞 Support

Need help? We're here for you!

- 📧 **Email**: support@heartly.health
- 💬 **Discord**: [Join our community](https://discord.gg/heartly)
- 📖 **Docs**: https://docs.heartly.health
- 🐦 **Twitter**: [@heartlyhealth](https://twitter.com/heartlyhealth)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Heartly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Acknowledgments

- Healthcare professionals who provided domain expertise
- Open-source community for amazing tools and libraries
- Beta testers for valuable feedback and bug reports
- Contributors who help improve Heartly every day

---

## 🗺️ Roadmap

- [x] Core appointment booking system
- [x] Mobile apps (iOS & Android)
- [x] Real-time notifications
- [ ] AI-powered symptom checker
- [ ] Video consultation feature
- [ ] Prescription management
- [ ] Integration with EHR systems
- [ ] Multi-language support
- [ ] Telemedicine capabilities
- [ ] Insurance verification API

See our [public roadmap](https://github.com/your-org/heartly/projects/1) for more details.

---

## ⭐ Show Your Support

If you find Heartly helpful, please consider:

- ⭐ **Starring** this repository
- 🐦 **Sharing** on social media
- 📝 **Writing** a blog post about your experience
- 💰 **Sponsoring** the project

---

<div align="center">

**Made with ❤️ by the Heartly Team**

[Website](https://heartly.health) • [Documentation](https://docs.heartly.health) • [Blog](https://blog.heartly.health)

</div>
