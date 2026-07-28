# Botsmann Operations Documentation

## Infrastructure, Monitoring & Support

**For Operations Team**

**Version:** 1.0
**Last Updated:** January 16, 2026
**Owner:** Operations Team

---

## Table of Contents

1. [Infrastructure Overview](#1-infrastructure-overview)
2. [Monitoring & Alerting](#2-monitoring--alerting)
3. [Incident Management](#3-incident-management)
4. [Customer Support](#4-customer-support)
5. [System Maintenance](#5-system-maintenance)
6. [Backup & Recovery](#6-backup--recovery)
7. [Performance Management](#7-performance-management)
8. [Security Operations](#8-security-operations)
9. [Runbooks](#9-runbooks)
10. [On-Call Procedures](#10-on-call-procedures)

---

## 1. Infrastructure Overview

### 1.1 System Architecture

**Production Stack:**

```
┌─────────────────────────────────────────────────────────┐
│                    USERS / CLIENTS                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Vercel Edge Network (CDN)                   │
│  - Global distribution                                   │
│  - DDoS protection                                       │
│  - SSL/TLS termination                                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│           Next.js 14 Application (Serverless)            │
│  Region: US East (iad1)                                  │
│  Functions: 10s timeout (Hobby), 60s (Pro)               │
└────┬───────────────────────────┬────────────────────────┘
     │                           │
     ▼                           ▼
┌────────────────┐    ┌──────────────────────────┐
│  Supabase      │    │  External APIs           │
│  - PostgreSQL  │    │  - Groq (LLM)            │
│  - pgvector    │    │  - OpenAI (BYOK)         │
│  - Auth        │    │  - AWS SES (Email)       │
│  - Storage     │    │  - Giscus (Comments)     │
└────────────────┘    └──────────────────────────┘
```

### 1.2 Infrastructure Components

| Component         | Provider         | Tier        | Region       | Purpose               |
| ----------------- | ---------------- | ----------- | ------------ | --------------------- |
| **Hosting**       | Vercel           | Hobby/Pro   | US East      | Application hosting   |
| **Database**      | Supabase         | Free/Pro    | US East      | PostgreSQL + pgvector |
| **Storage**       | Supabase Storage | Free/Pro    | US East      | File uploads          |
| **Auth**          | Supabase Auth    | Free/Pro    | US East      | User authentication   |
| **Email**         | AWS SES          | Pay-per-use | EU Central 1 | Transactional email   |
| **LLM (Primary)** | Groq             | Free        | US           | AI inference          |
| **LLM (Premium)** | OpenAI           | BYOK        | US           | AI inference          |
| **CDN**           | Vercel Edge      | Included    | Global       | Content delivery      |
| **Monitoring**    | Vercel Analytics | Included    | -            | Basic metrics         |

### 1.3 Current Limits & Quotas

**Vercel (Hobby Tier):**

- Function execution: 10 seconds max
- Bandwidth: 100GB/month
- Builds: 6,000 minutes/month
- Serverless functions: 12

**Supabase (Free Tier):**

- Database: 500MB
- Storage: 1GB
- Auth users: 50,000
- API requests: Unlimited (with rate limits)

**Groq (Free Tier):**

- Requests: 14,400/day
- Tokens: 30/sec rate limit

**AWS SES:**

- Free tier: 62,000 emails/month
- Beyond: $0.10 per 1,000 emails

### 1.4 Scaling Strategy

**Current State:** Hobby/Free tiers (MVP)

**Near-term (0-1,000 users):**

- Upgrade to Vercel Pro: $20/month
  - 60s function timeout
  - Higher bandwidth
- Stay on Supabase Free tier

**Medium-term (1,000-10,000 users):**

- Supabase Pro: $25/month
  - 8GB database
  - 100GB storage
  - Daily backups
- Consider Groq Pro tier (if available)

**Long-term (10,000+ users):**

- Vercel Enterprise
- Supabase Team/Enterprise
- Dedicated infrastructure for enterprise customers
- Multi-region deployment

---

## 2. Monitoring & Alerting

### 2.1 Monitoring Stack

**Current Tools:**

| Tool                   | Purpose                       | Access      |
| ---------------------- | ----------------------------- | ----------- |
| **Vercel Dashboard**   | Deployment, errors, analytics | Team        |
| **Supabase Dashboard** | Database, auth, storage       | Team        |
| **Browser Console**    | Client-side errors            | Development |
| **Git Logs**           | Application logs              | Development |

**Recommended (To Be Implemented):**

| Tool            | Purpose                    | Tier                |
| --------------- | -------------------------- | ------------------- |
| **Sentry**      | Error tracking             | Free (5K errors/mo) |
| **Plausible**   | Privacy-friendly analytics | $9/mo               |
| **UptimeRobot** | Uptime monitoring          | Free (50 monitors)  |
| **CloudWatch**  | AWS SES metrics            | Included            |

### 2.2 Key Metrics to Monitor

**Application Health:**

- ✅ Uptime percentage
- ✅ Response time (p50, p95, p99)
- ✅ Error rate (4xx, 5xx)
- ✅ Build success rate

**User Metrics:**

- ✅ Daily active users (DAU)
- ✅ Monthly active users (MAU)
- ✅ New signups
- ✅ Churn rate

**Performance:**

- ✅ API latency
- ✅ Embedding generation time
- ✅ Database query time
- ✅ LLM response time

**Business:**

- ✅ Conversion rate (free → premium)
- ✅ Document uploads
- ✅ Chat queries
- ✅ Premium MRR

### 2.3 Alerting Rules

**Critical (Immediate):**

- Production down (uptime < 95%)
- Error rate > 5%
- Database connection failures
- Authentication service down

**High (15 min):**

- Error rate > 1%
- Response time > 5s (p95)
- Build failures
- Embedding generation failing

**Medium (1 hour):**

- Response time > 2s (p95)
- Increased 4xx errors
- Low disk space (>80% used)

**Notification Channels:**

- **Critical:** SMS + Slack (#incidents)
- **High:** Slack (#incidents)
- **Medium:** Email

### 2.4 Dashboard Setup

**Recommended Dashboards:**

**1. System Health Dashboard**

```
┌─────────────────────────────────────────┐
│ Uptime: 99.9%      Status: 🟢 Healthy  │
│ Error Rate: 0.3%   Alerts: 0           │
├─────────────────────────────────────────┤
│ Response Time (p95): 1.2s               │
│ [──────▓▓▓──────────────────] 2s        │
├─────────────────────────────────────────┤
│ Active Users (24h): 142                 │
│ API Requests (24h): 3,421               │
└─────────────────────────────────────────┘
```

**2. Business Metrics Dashboard**

```
┌─────────────────────────────────────────┐
│ MRR: $1,450           Churn: 3%        │
│ New Signups: 23       Conversions: 2   │
├─────────────────────────────────────────┤
│ Document Uploads: 145                   │
│ Chat Queries: 1,234                     │
│ Avg Session: 12 min                     │
└─────────────────────────────────────────┘
```

---

## 3. Incident Management

### 3.1 Incident Severity Levels

**P0 - Critical**

- Impact: Complete service outage
- Example: Production down, database unavailable
- Response: Immediate (< 15 min)
- Notification: SMS + Slack
- Who: On-call engineer + manager

**P1 - High**

- Impact: Major feature broken, significant degradation
- Example: Document uploads failing, auth broken
- Response: < 1 hour
- Notification: Slack
- Who: On-call engineer

**P2 - Medium**

- Impact: Minor feature broken, limited users affected
- Example: Blog comments broken, email delays
- Response: < 4 hours
- Notification: Slack
- Who: Assigned engineer

**P3 - Low**

- Impact: Cosmetic issues, no functional impact
- Example: Styling bugs, typos
- Response: < 1 day
- Notification: GitHub issue
- Who: Next sprint

### 3.2 Incident Response Process

**1. Detection (0-5 min)**

```
Incident Detected
    │
    ├─ Automated alert (monitoring)
    ├─ User report (support)
    └─ Internal discovery
    ↓
Post in #incidents channel
```

**2. Acknowledgment (5-10 min)**

```
On-call engineer acknowledges
    │
    ├─ Assess severity (P0-P3)
    ├─ Assign incident commander
    └─ Create incident doc
    ↓
Update #incidents with status
```

**3. Investigation (10-30 min)**

```
Diagnose root cause
    │
    ├─ Check recent deployments
    ├─ Review error logs
    ├─ Check external services
    └─ Reproduce issue
    ↓
Document findings in incident doc
```

**4. Mitigation (30-60 min)**

```
Apply immediate fix
    │
    ├─ Rollback deployment
    ├─ Disable feature flag
    ├─ Scale infrastructure
    └─ Apply hotfix
    ↓
Verify mitigation worked
```

**5. Resolution (1-2 hours)**

```
Permanent fix deployed
    │
    ├─ Test thoroughly
    ├─ Monitor for 30 min
    └─ Confirm stable
    ↓
Close incident
```

**6. Post-Mortem (24 hours)**

```
Document learnings
    │
    ├─ Timeline
    ├─ Root cause
    ├─ Impact assessment
    ├─ Prevention measures
    └─ Action items
    ↓
Share with team
```

### 3.3 Incident Communication

**Internal Updates:**

- Post in #incidents every 15 minutes
- Include: status, ETA, next steps

**External Communication (If Needed):**

**Template: Status Page Update**

```
🔴 INVESTIGATING
We're currently investigating reports of [issue].
Posted: 10:15 AM EST

🟡 IDENTIFIED
We've identified the issue as [cause]. Working on a fix.
Posted: 10:30 AM EST

🟢 RESOLVED
The issue has been resolved. Monitoring for stability.
Posted: 11:00 AM EST
```

---

## 4. Customer Support

### 4.1 Support Tiers

**Free Tier Users:**

- Support: Community forum (when available)
- Response SLA: None
- Channels: GitHub Discussions, email

**Premium Tier Users:**

- Support: Email
- Response SLA: 48 hours
- Channels: support@botsmann.com

**Enterprise Tier Users:**

- Support: Dedicated Slack channel
- Response SLA: 24 hours (P2), 4 hours (P1), 1 hour (P0)
- Channels: Dedicated Slack, email, phone

### 4.2 Support Request Process

**1. Ticket Creation:**

```
User submits request
    │
    ├─ Email → Zendesk/Helpscout
    ├─ Slack → Private channel
    └─ Forum → GitHub Discussions
    ↓
Auto-tagged by tier & category
```

**2. Triage:**

```
Support engineer reviews
    │
    ├─ Categorize (bug, question, feature)
    ├─ Prioritize (P0-P3)
    └─ Assign to appropriate person
```

**3. Resolution:**

```
Support engineer responds
    │
    ├─ Troubleshoot issue
    ├─ Provide solution/workaround
    ├─ Escalate to engineering (if needed)
    └─ Follow up
```

**4. Closure:**

```
Issue resolved
    │
    ├─ Confirm with user
    ├─ Document solution (knowledge base)
    └─ Close ticket
```

### 4.3 Common Support Issues

**Issue: "Document upload failing"**

- **Cause:** File too large (>10MB) or unsupported format
- **Solution:** Ask for file size/format, guide on compression
- **Escalate if:** Server-side upload errors

**Issue: "Chat response taking too long"**

- **Cause:** Embedding generation (5-15s normal)
- **Solution:** Explain expected duration, suggest upgrade to Pro
- **Escalate if:** >30s consistently

**Issue: "Can't log in"**

- **Cause:** Forgotten password, email not verified
- **Solution:** Password reset link, resend verification
- **Escalate if:** Supabase Auth issue

**Issue: "Embeddings not generating"**

- **Cause:** Model cold start, Vercel timeout
- **Solution:** Retry, explain cold start delay
- **Escalate if:** Persistent failures

### 4.4 Knowledge Base

**Categories:**

1. **Getting Started**
   - How to sign up
   - How to upload documents
   - How to chat with bots

2. **Troubleshooting**
   - Login issues
   - Upload errors
   - Slow responses

3. **Billing**
   - How to upgrade
   - How to cancel
   - Refund policy

4. **Privacy & Security**
   - Data storage location
   - GDPR compliance
   - Self-hosted setup

---

## 5. System Maintenance

### 5.1 Regular Maintenance Tasks

**Daily:**

- [ ] Check error monitoring (Sentry)
- [ ] Review deployment logs
- [ ] Monitor uptime status
- [ ] Check API quotas (Groq, Supabase)

**Weekly:**

- [ ] Review performance metrics
- [ ] Check database size (Supabase dashboard)
- [ ] Review support tickets
- [ ] Update status page (if incidents)

**Monthly:**

- [ ] Security patch review (`npm audit`)
- [ ] Dependency updates
- [ ] Access review (remove offboarded users)
- [ ] Backup verification
- [ ] Cost review (Vercel, Supabase, AWS)

**Quarterly:**

- [ ] Disaster recovery drill
- [ ] Security audit
- [ ] Capacity planning
- [ ] Documentation review

### 5.2 Dependency Management

**Process:**

1. **Weekly Scan:**

   ```bash
   npm outdated
   npm audit
   ```

2. **Categorize Updates:**
   - **Security:** Apply immediately
   - **Major:** Test thoroughly, schedule
   - **Minor/Patch:** Batch update monthly

3. **Update Process:**

   ```bash
   # Update specific package
   npm update <package-name>

   # Update all patch/minor
   npm update

   # Run tests
   npm test

   # Build & deploy to staging
   npm run build
   git push origin develop

   # Test on staging for 24 hours
   # If stable, deploy to production
   ```

### 5.3 Database Maintenance

**Weekly:**

- Check database size (Supabase dashboard)
- Review slow queries (pgAdmin)
- Vacuum database (automatic in Supabase)

**Monthly:**

- Analyze table growth
- Review indexes
- Check for unused tables

**Queries to Monitor:**

```sql
-- Database size
SELECT pg_size_pretty(pg_database_size('postgres'));

-- Table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 10;

-- Slow queries (requires pg_stat_statements)
SELECT
  query,
  mean_exec_time,
  calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

---

## 6. Backup & Recovery

### 6.1 Backup Strategy

**Database (Supabase):**

- **Automatic:** Daily backups (Supabase Pro)
- **Retention:** 7 days (Free), 30 days (Pro)
- **Manual:** Weekly export to S3

**Code (GitHub):**

- **Automatic:** Git version control
- **Retention:** Infinite
- **Redundancy:** GitHub cloud + local clones

**Configuration:**

- **Automatic:** Vercel environment variables backed up
- **Manual:** Quarterly export to secure storage

### 6.2 Disaster Recovery Plan

**Scenarios:**

**1. Database Corruption/Loss**

- **Detection:** Database unavailable, data integrity issues
- **Recovery:**
  1. Restore from latest Supabase backup
  2. Verify data integrity
  3. Resume operations
- **RTO (Recovery Time Objective):** 1 hour
- **RPO (Recovery Point Objective):** 24 hours

**2. Complete Vercel Account Loss**

- **Detection:** Cannot access Vercel dashboard
- **Recovery:**
  1. Deploy to new Vercel account from GitHub
  2. Restore environment variables from backup
  3. Update DNS
- **RTO:** 4 hours
- **RPO:** 0 (code in Git)

**3. Supabase Account Loss**

- **Detection:** Cannot access Supabase dashboard
- **Recovery:**
  1. Create new Supabase project
  2. Restore from latest backup
  3. Update environment variables
  4. Redeploy application
- **RTO:** 8 hours
- **RPO:** 24 hours

### 6.3 Disaster Recovery Drill

**Quarterly Exercise:**

1. **Simulate Failure:** Delete test database
2. **Execute Recovery:** Restore from backup
3. **Verify:** Check data integrity
4. **Document:** Time taken, issues encountered
5. **Improve:** Update DR plan

---

## 7. Performance Management

### 7.1 Performance Targets

| Metric                 | Target  | Current | Status |
| ---------------------- | ------- | ------- | ------ |
| **Page Load (p95)**    | < 2s    | 1.5s    | ✅     |
| **API Response (p95)** | < 1s    | 0.8s    | ✅     |
| **Embedding Gen**      | < 10s   | 5-15s   | ⚠️     |
| **Chat Response**      | < 30s   | 20-40s  | ⚠️     |
| **Uptime**             | > 99.5% | 99.8%   | ✅     |

### 7.2 Performance Optimization

**Application:**

- Server Components by default (reduce JS)
- Code splitting (automatic in Next.js 14)
- Image optimization (next/image)
- Caching (Vercel Edge, ISR)

**Database:**

- Indexes on frequently queried columns
- Connection pooling (Supabase built-in)
- Query optimization (avoid N+1)

**LLM:**

- Streaming responses (real-time display)
- Provider selection (Groq for speed, OpenAI for quality)
- Caching common queries

### 7.3 Capacity Planning

**Current Capacity:**

- **Concurrent users:** ~1,000 (Vercel Hobby)
- **Database size:** 500MB (Supabase Free)
- **File storage:** 1GB (Supabase Free)

**Scaling Triggers:**

- Database > 80% full → Upgrade Supabase
- Bandwidth > 80GB/month → Upgrade Vercel
- Function timeouts frequent → Upgrade Vercel Pro

---

## 8. Security Operations

### 8.1 Security Checklist

**Weekly:**

- [ ] Review failed login attempts (Supabase Auth logs)
- [ ] Check for suspicious API activity
- [ ] Review Dependabot alerts (GitHub)

**Monthly:**

- [ ] Run security scan (`npm audit`)
- [ ] Review access logs
- [ ] Update dependencies with security patches
- [ ] Check SSL certificate expiry

**Quarterly:**

- [ ] Access review (revoke unused credentials)
- [ ] Penetration testing (if budget allows)
- [ ] Security training for team

### 8.2 Incident Response (Security)

**1. Detection:**

- Automated alerts (unusual activity)
- User report (phishing, spam)
- Security researcher disclosure

**2. Containment:**

- Disable affected accounts
- Rotate credentials
- Block malicious IPs

**3. Investigation:**

- Review logs
- Identify scope
- Assess impact

**4. Remediation:**

- Patch vulnerability
- Deploy fix
- Notify affected users

**5. Recovery:**

- Restore normal operations
- Monitor for recurrence

**6. Post-Incident:**

- Document findings
- Improve security measures
- Notify stakeholders (if required by law)

### 8.3 Compliance

**GDPR:**

- Data export functionality (user request)
- Account deletion (right to be forgotten)
- Privacy policy (on website)
- Data processing agreement (for enterprise)

**SOC2 (Supabase certified):**

- Access controls
- Audit trails
- Encryption at rest and in transit

**HIPAA (Self-hosted only):**

- Business Associate Agreement (BAA)
- Encryption
- Access logs
- Secure deployment on customer infrastructure

---

## 9. Runbooks

### 9.1 Production Deployment

**Pre-Deployment:**

1. [ ] All tests pass (`npm test`)
2. [ ] Build succeeds (`npm run build`)
3. [ ] Code reviewed & approved
4. [ ] Staging tested for 24 hours

**Deployment:**

1. [ ] Merge to `main` branch
2. [ ] Vercel auto-deploys (watch logs)
3. [ ] Verify deployment success

**Post-Deployment:**

1. [ ] Smoke test production
2. [ ] Check error monitoring
3. [ ] Monitor for 30 minutes
4. [ ] Announce in #deploys

### 9.2 Emergency Rollback

**When to Rollback:**

- Critical bug in production
- Performance degradation >50%
- Security vulnerability introduced

**Process:**

```bash
# Option 1: Vercel CLI
vercel rollback

# Option 2: Vercel Dashboard
# Deployments → Previous deployment → Promote to Production
```

**Post-Rollback:**

1. [ ] Verify production stable
2. [ ] Announce in #incidents
3. [ ] Create hotfix branch
4. [ ] Fix issue
5. [ ] Re-deploy

### 9.3 Database Failover

**Supabase Automatic Failover:**

- Automatic for Pro tier
- Manual restoration for Free tier

**Manual Process (if needed):**

1. [ ] Create new Supabase project
2. [ ] Restore from latest backup
3. [ ] Update `NEXT_PUBLIC_SUPABASE_URL` in Vercel
4. [ ] Update `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. [ ] Redeploy application

---

## 10. On-Call Procedures

### 10.1 On-Call Schedule

**Rotation:** Weekly (Monday to Monday)

**Responsibilities:**

- Respond to alerts (P0/P1)
- Monitor #incidents channel
- Escalate if needed
- Document incidents

**Compensation:**

- On-call pay: $500/week
- Incident response: $100/incident (P0/P1)

### 10.2 On-Call Handoff

**Monday 9am:**

1. Outgoing engineer posts summary in #oncall:
   - Incidents handled
   - Open issues
   - Things to watch
2. Incoming engineer acknowledges
3. Update PagerDuty/oncall schedule

### 10.3 Escalation Path

```
On-Call Engineer
       ↓ (if unable to resolve in 1 hour)
Engineering Lead
       ↓ (if critical & ongoing)
CTO/CEO
       ↓ (if requires executive decision)
All Hands On Deck
```

---

## Appendix

### A1: Useful Links

**Production:**

- Website: https://www.botsmann.com
- Vercel Dashboard: https://vercel.com/botsmann
- Supabase Dashboard: https://app.supabase.com

**Monitoring:**

- Sentry: (to be set up)
- UptimeRobot: (to be set up)

**Documentation:**

- GitHub Repo: (internal)
- Technical Docs: /docs
- API Docs: /api-docs

### A2: Contact Information

**On-Call Engineer:** Check #oncall channel

**Escalation Contacts:**

- Engineering Lead: [Name, Phone]
- CTO: [Name, Phone]
- CEO: REDACTED_EMAIL

**External Vendors:**

- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.com
- AWS Support: (account-specific)

---

**Document Owner:** Operations Team
**Review Cadence:** Quarterly
**Last Review:** January 16, 2026
**Next Review:** April 16, 2026
