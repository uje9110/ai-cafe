# 🧠 AI Cafe – AI-Powered Promo & POS Intelligence System

AI Cafe is a full-stack web application that combines a modern **Point of Sale (POS)** system with **AI-powered promotional generation** and an **insight-driven chatbot assistant**.

The system transforms structured transactional data into actionable business insights, which are then leveraged by AI to generate targeted promotions and analytical recommendations.

This project demonstrates the integration of relational databases, backend data modeling, and AI-assisted decision support in a real-world business scenario.

---

## 🚀 Core Highlights

- 📊 Insight-driven architecture (not just CRUD)
- 🤖 AI-generated promotional campaigns
- 💬 AI chatbot powered by processed business data
- 🛒 Fully functional POS system
- 🗄 Relational data modeling with PostgreSQL & Prisma
- 🧠 Data-to-AI pipeline using structured insight transformation

---

## 🤖 AI-Generated Promotions

Promotional content is generated dynamically based on processed business insights.

The system:

- Analyzes customer interests
- Identifies product popularity trends
- Evaluates purchase behavior
- Converts structured insights into AI-ready prompts

This ensures that promotions are context-aware rather than generic.

---

## 💬 AI Chatbot (Insight-Aware Assistant)

The AI chatbot provides analytical assistance based on processed internal data.

Powered by `lib/insight.ts`, it can:

- Interpret customer behavior patterns
- Suggest promotional strategies
- Explain product performance
- Answer analytical questions about sales data

Unlike generic chatbots, this assistant operates on structured business insights.

---

## 📊 Insight Engine Architecture

The core of the system is the **Insight Engine**, located in: lib/insight.ts

Responsibilities include:

- Aggregating customer interests
- Tracking product demand frequency
- Analyzing transactional patterns
- Structuring data for AI consumption

This module acts as a bridge between:

1. Raw relational database records
2. Structured insight objects
3. AI prompt generation

This separation keeps business logic independent from the AI layer.

---

## 🛒 POS System (Full CRUD Implementation)

AI Cafe includes a fully implemented POS backend and admin interface.

### 👤 Customers

- Table view with filtering & search
- Create customers via form
- Edit customer data (including favorite products)
- Delete customers
- Structured relational mapping with purchases

### 📦 Products

- Table view with filtering
- Create product records
- Edit product information
- Delete products
- Purchase relationship tracking

### 🧾 Purchases

- Record transactions linked to customers and products
- Table view with filtering & sorting
- Edit and delete purchase records
- Transaction history tracking

---

## 📈 Data Management Features

Each entity includes:

- 📋 Filterable table view
- ➕ Form-based creation
- ✏️ Edit workflows
- 🗑 Delete functionality
- 🔄 Relational consistency via Prisma ORM

---

## 🛠 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM**
- **AI SDK**
- **React**
- **TailwindCSS**
- **shadcn/ui**

---

## 🧪 Technical Growth & Development Process

This project represents my first production-style implementation using **PostgreSQL** and **Prisma ORM**.

Key learning areas:

- Designing relational database schemas
- Modeling one-to-many and many-to-many relationships
- Structuring business logic for data aggregation
- Separating insight processing from presentation logic
- Integrating AI with structured backend data

Parts of the backend implementation were developed with the assistance of AI tools as a productivity accelerator. 

However, all schema design decisions, relational mappings, business logic structure, and insight processing flows were reviewed, tested, and refined manually to ensure correctness, data integrity, and architectural clarity.

The development process was iterative and learning-driven, with a strong emphasis on understanding relational modeling, query behavior, and scalable system design rather than simply generating code.

---

## 🎯 Project Objective

AI Cafe explores how traditional POS systems can evolve into intelligent business tools by:

1. Structuring transactional data
2. Transforming it into meaningful insights
3. Leveraging AI for marketing and decision support

It demonstrates the intersection of:

- Full-stack engineering
- Database design
- AI-assisted automation
- Business-oriented problem solving

---

## 📌 Future Improvements

- Advanced analytics dashboard
- Sales forecasting
- Customer segmentation engine
- Campaign performance tracking
- Query optimization & performance tuning
- Role-based access control

---

Built with a focus on scalable architecture, data integrity, and practical AI integration.
