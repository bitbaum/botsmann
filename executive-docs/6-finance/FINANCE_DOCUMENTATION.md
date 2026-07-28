# Botsmann Finance Documentation

## Financial Planning, Budgeting & Reporting

**For Finance & Executive Team**

**Version:** 1.0
**Last Updated:** January 16, 2026
**Owner:** Finance Team

---

## Table of Contents

1. [Financial Overview](#1-financial-overview)
2. [Revenue Model](#2-revenue-model)
3. [Cost Structure](#3-cost-structure)
4. [Financial Projections](#4-financial-projections)
5. [Unit Economics](#5-unit-economics)
6. [Cash Flow Management](#6-cash-flow-management)
7. [Pricing Strategy](#7-pricing-strategy)
8. [Budget Management](#8-budget-management)
9. [Financial Reporting](#9-financial-reporting)
10. [Fundraising](#10-fundraising)

---

## 1. Financial Overview

### 1.1 Current Financial Position (January 2026)

**Revenue:**

- MRR (Monthly Recurring Revenue): $0 (Pre-launch)
- ARR (Annual Recurring Revenue): $0
- One-time revenue: $0

**Costs:**

- Infrastructure: $1-5/month
- Development: Bootstrapped (founder time)
- Marketing: $0
- **Monthly Burn:** ~$0 (bootstrapped)

**Runway:** Indefinite (free tier infrastructure)

**Funding Status:**

- Bootstrapped
- Seeking: $1.5M seed round

### 1.2 Financial Goals

**Year 1 (2026):**

- Revenue: $300-400K ARR
- Customers: 1,000 paid users
- Gross Margin: 75%
- Burn: $100K/month (post-fundraise)

**Year 2 (2027):**

- Revenue: $3M ARR
- Customers: 5,000 paid + 50 enterprise
- Gross Margin: 80%
- Break-even on gross margin

**Year 3 (2028):**

- Revenue: $12M ARR
- Customers: 15,000 paid + 150 enterprise
- Gross Margin: 85%
- EBITDA positive

---

## 2. Revenue Model

### 2.1 Revenue Streams

**Primary Revenue:**

**1. Premium Subscriptions**

- Price: $29/month or $290/year (2 months free)
- Target: Individual professionals
- Conversion: 5% of free users
- Churn: 15%/year

**2. Enterprise Licenses**

- Small (5-10 users): $5,000-10,000/year
- Medium (10-50 users): $10,000-25,000/year
- Large (50+ users): $25,000-100,000/year
- Churn: 10%/year

**3. Professional Services**

- Implementation: $10,000-100,000 (one-time)
- Custom bot development: $5,000-50,000 (one-time)
- Consulting: $2,000-20,000 (one-time or retainer)

**Secondary Revenue (Future):**

- API access: $100-1,000/month
- White-label: $50,000-500,000/year
- Marketplace (commission on community bots): 20-30%

### 2.2 Revenue Projections (3 Years)

**Year 1 Breakdown:**

| Month | Free Users | Paid Users | MRR     | ARR   |
| ----- | ---------- | ---------- | ------- | ----- |
| M1    | 500        | 10         | $290    | $3.5K |
| M3    | 2,000      | 50         | $1,450  | $17K  |
| M6    | 5,000      | 150        | $4,350  | $52K  |
| M9    | 8,000      | 400        | $11,600 | $139K |
| M12   | 10,000     | 1,000      | $29,000 | $348K |

**Year 1 Total:**

- Premium: $348K
- Enterprise (3 customers): $30K
- Services: $20K
- **Total ARR: ~$400K**

**Year 2 Breakdown:**

| Quarter | Paid Users | Enterprise | MRR      | ARR    |
| ------- | ---------- | ---------- | -------- | ------ |
| Q1      | 1,500      | 5          | $43,500  | $522K  |
| Q2      | 2,500      | 10         | $72,500  | $870K  |
| Q3      | 4,000      | 20         | $116,000 | $1.39M |
| Q4      | 5,000      | 50         | $145,000 | $1.74M |

**Year 2 Total:**

- Premium: $1.74M
- Enterprise: $1.25M
- Services: $200K
- **Total ARR: ~$3.2M**

**Year 3 Target:**

- Premium: $5.22M (15,000 users × $29 × 12)
- Enterprise: $6M (150 customers × $40K avg)
- Services: $1M
- **Total ARR: ~$12.2M**

### 2.3 Revenue Recognition

**Subscription Revenue:**

- Recognize ratably over subscription period
- Monthly: Recognize in month of service
- Annual: Recognize 1/12th each month

**One-time Revenue:**

- Implementation: Recognize on completion
- Custom development: Milestone-based recognition

**Deferred Revenue:**

- Annual subscriptions paid upfront
- Unearned services revenue

---

## 3. Cost Structure

### 3.1 Cost of Goods Sold (COGS)

**Infrastructure Costs:**

**Per Free User:**

- Compute (Vercel): $0.001/month
- Database (Supabase): $0.002/month
- Storage: $0.001/month
- **Total: ~$0.004/user/month**

**Per Premium User:**

- Compute: $0.50/month
- Database: $2/month
- Storage: $1/month
- LLM (OpenAI credits): $2/month (included in plan)
- **Total: ~$5.50/user/month**

**Per Enterprise User:**

- Self-hosted: $0 (customer pays)
- Managed: $10/user/month

**Total COGS Estimate:**

| Year | Users (Paid) | Monthly COGS | Annual COGS | Gross Margin |
| ---- | ------------ | ------------ | ----------- | ------------ |
| 1    | 1,000        | $5,500       | $66K        | 75%          |
| 2    | 5,000        | $27,500      | $330K       | 80%          |
| 3    | 15,000       | $82,500      | $990K       | 85%          |

### 3.2 Operating Expenses

**Personnel (Year 1, Post-Seed):**

| Role                     | Count   | Annual Salary | Taxes/Benefits (30%) | Total     |
| ------------------------ | ------- | ------------- | -------------------- | --------- |
| **Engineering**          |         |               |                      |           |
| Head of Engineering      | 0.5     | $150K         | $45K                 | $97.5K    |
| Senior Backend Engineer  | 1       | $150K         | $45K                 | $195K     |
| Senior Frontend Engineer | 1       | $140K         | $42K                 | $182K     |
| DevOps Engineer          | 0.5     | $130K         | $39K                 | $84.5K    |
| **Sales & Marketing**    |         |               |                      |           |
| Head of Sales            | 0.5     | $120K         | $36K                 | $78K      |
| Marketing Manager        | 1       | $100K         | $30K                 | $130K     |
| **Operations**           |         |               |                      |           |
| Customer Success Manager | 1       | $80K          | $24K                 | $104K     |
| **Total**                | **5.5** | **$870K**     | **$261K**            | **$871K** |

**Infrastructure (Year 1):**

| Service          | Monthly  | Annual     |
| ---------------- | -------- | ---------- |
| Vercel Pro       | $20      | $240       |
| Supabase Pro     | $25      | $300       |
| AWS SES          | $50      | $600       |
| Sentry           | $26      | $312       |
| Monitoring Tools | $20      | $240       |
| **Total**        | **$141** | **$1,692** |

**Marketing & Sales (Year 1):**

| Item                           | Monthly    | Annual    |
| ------------------------------ | ---------- | --------- |
| Advertising (Google, LinkedIn) | $5,000     | $60K      |
| Conferences                    | -          | $20K      |
| Content Creation               | $2,000     | $24K      |
| Sales Tools (CRM, etc.)        | $500       | $6K       |
| **Total**                      | **$7,500** | **$110K** |

**Operations (Year 1):**

| Item               | Annual   |
| ------------------ | -------- |
| Legal & Accounting | $20K     |
| Insurance          | $10K     |
| Office/Co-working  | $15K     |
| Software & Tools   | $10K     |
| **Total**          | **$55K** |

**Year 1 Total OpEx:**

- Personnel: $871K
- Infrastructure: $1.7K
- Marketing & Sales: $110K
- Operations: $55K
- **Total: ~$1.04M**

### 3.3 Total Cost Summary (3 Years)

| Category              | Year 1    | Year 2    | Year 3    |
| --------------------- | --------- | --------- | --------- |
| **COGS**              | $66K      | $330K     | $990K     |
| **Personnel**         | $871K     | $1.5M     | $3M       |
| **Infrastructure**    | $2K       | $50K      | $150K     |
| **Marketing & Sales** | $110K     | $400K     | $1M       |
| **Operations**        | $55K      | $120K     | $250K     |
| **Total Costs**       | **$1.1M** | **$2.4M** | **$5.4M** |

---

## 4. Financial Projections

### 4.1 Income Statement (3-Year Projection)

**Year 1:**

```
Revenue
  Premium Subscriptions         $348,000
  Enterprise Licenses             $30,000
  Professional Services           $20,000
  ─────────────────────────────────────
  Total Revenue                  $398,000

Cost of Goods Sold                $66,000
  ─────────────────────────────────────
Gross Profit                     $332,000
Gross Margin                          83%

Operating Expenses
  Personnel                      $871,000
  Infrastructure                   $2,000
  Marketing & Sales              $110,000
  Operations                      $55,000
  ─────────────────────────────────────
  Total OpEx                   $1,038,000

EBITDA                          -$706,000
EBITDA Margin                        -177%

Monthly Burn                      $58,833
Runway (with $1.5M)            25 months
```

**Year 2:**

```
Revenue
  Premium Subscriptions       $1,740,000
  Enterprise Licenses         $1,250,000
  Professional Services         $200,000
  ─────────────────────────────────────
  Total Revenue               $3,190,000

Cost of Goods Sold              $330,000
  ─────────────────────────────────────
Gross Profit                  $2,860,000
Gross Margin                          90%

Operating Expenses
  Personnel                   $1,500,000
  Infrastructure                 $50,000
  Marketing & Sales             $400,000
  Operations                    $120,000
  ─────────────────────────────────────
  Total OpEx                  $2,070,000

EBITDA                          $790,000
EBITDA Margin                         25%

Monthly Burn                     $65,833 (Q1-Q2)
                              Cash positive (Q3-Q4)
```

**Year 3:**

```
Revenue
  Premium Subscriptions       $5,220,000
  Enterprise Licenses         $6,000,000
  Professional Services       $1,000,000
  ─────────────────────────────────────
  Total Revenue              $12,220,000

Cost of Goods Sold              $990,000
  ─────────────────────────────────────
Gross Profit                 $11,230,000
Gross Margin                          92%

Operating Expenses
  Personnel                   $3,000,000
  Infrastructure                $150,000
  Marketing & Sales           $1,000,000
  Operations                    $250,000
  ─────────────────────────────────────
  Total OpEx                  $4,400,000

EBITDA                        $6,830,000
EBITDA Margin                         56%

Profitable
```

### 4.2 Cash Flow Statement (Year 1)

```
Operating Activities
  Net Income (Loss)            -$706,000
  Add: Non-cash expenses                0
  Changes in Working Capital    -$50,000
  ─────────────────────────────────────
  Cash from Operations         -$756,000

Investing Activities
  Capital Expenditures          -$20,000
  ─────────────────────────────────────
  Cash from Investing           -$20,000

Financing Activities
  Seed Round                  $1,500,000
  ─────────────────────────────────────
  Cash from Financing         $1,500,000

Net Change in Cash              $724,000
Beginning Cash                       $0
Ending Cash                     $724,000
```

### 4.3 Balance Sheet (Year 1 End)

```
Assets
  Cash                          $724,000
  Accounts Receivable            $50,000
  Prepaid Expenses               $10,000
  ─────────────────────────────────────
  Total Current Assets          $784,000

  Equipment                      $20,000
  ─────────────────────────────────────
  Total Assets                  $804,000

Liabilities
  Accounts Payable               $30,000
  Deferred Revenue               $80,000
  ─────────────────────────────────────
  Total Liabilities             $110,000

Equity
  Common Stock                $1,500,000
  Retained Earnings            -$806,000
  ─────────────────────────────────────
  Total Equity                  $694,000

Total Liabilities + Equity      $804,000
```

---

## 5. Unit Economics

### 5.1 Customer Acquisition Cost (CAC)

**Premium Users:**

- Marketing spend: $7,500/month
- New premium users/month: 150 (avg)
- **CAC = $7,500 / 150 = $50**

**Enterprise Customers:**

- Sales team cost: $200K/year
- New enterprise customers/year: 40
- **CAC = $200K / 40 = $5,000**

### 5.2 Lifetime Value (LTV)

**Premium Users:**

- ARPU (Average Revenue Per User): $29/month
- Gross Margin: 80%
- Churn Rate: 15%/year = 1.25%/month
- **LTV = $29 × 0.80 / 0.0125 = $1,856**

**Enterprise Customers:**

- ARPU: $25,000/year
- Gross Margin: 90%
- Churn Rate: 10%/year
- **LTV = $25,000 × 0.90 / 0.10 = $225,000**

### 5.3 LTV:CAC Ratio

**Premium:**

- LTV: $1,856
- CAC: $50
- **LTV:CAC = 37:1** (Excellent)

**Enterprise:**

- LTV: $225,000
- CAC: $5,000
- **LTV:CAC = 45:1** (Excellent)

**Target:** > 3:1 (Industry standard for healthy SaaS)
**Botsmann:** 37-45:1 (Outstanding, room to invest more in growth)

### 5.4 Payback Period

**Premium:**

- CAC: $50
- Monthly gross profit per user: $29 × 0.80 = $23.20
- **Payback = $50 / $23.20 = 2.2 months**

**Enterprise:**

- CAC: $5,000
- Monthly gross profit: $25,000 × 0.90 / 12 = $1,875
- **Payback = $5,000 / $1,875 = 2.7 months**

**Target:** < 12 months
**Botsmann:** 2-3 months (Excellent)

### 5.5 Cohort Analysis

**Month 0 Cohort (100 premium users sign up):**

| Month | Active Users | Churn | Revenue | Cumulative Revenue |
| ----- | ------------ | ----- | ------- | ------------------ |
| 0     | 100          | 0     | $2,900  | $2,900             |
| 1     | 99           | 1%    | $2,871  | $5,771             |
| 3     | 97           | 3%    | $2,813  | $11,471            |
| 6     | 93           | 7%    | $2,697  | $22,583            |
| 12    | 85           | 15%   | $2,465  | $43,780            |
| 24    | 72           | 28%   | $2,088  | $81,312            |

---

## 6. Cash Flow Management

### 6.1 Cash Flow Forecast (Monthly, Year 1)

**Example Month 6:**

```
Beginning Cash                  $950,000

Cash In
  Premium Subscriptions          $4,350
  Enterprise Contracts          $10,000
  Professional Services          $5,000
  ─────────────────────────────────────
  Total Cash In                 $19,350

Cash Out
  Payroll                       $72,583
  Infrastructure                    $141
  Marketing                      $7,500
  Operations                     $4,583
  ─────────────────────────────────────
  Total Cash Out                $84,807

Net Cash Flow                  -$65,457
Ending Cash                    $884,543
Runway Remaining              13 months
```

### 6.2 Burn Rate Management

**Target Burn Rates:**

- Year 1: $60-70K/month
- Year 2: $40-50K/month (declining)
- Year 3: Cash positive

**Levers to Reduce Burn:**

1. Delay hires (extend runway)
2. Reduce marketing spend (slower growth)
3. Increase prices (higher ARPU)
4. Improve conversion (lower CAC)

### 6.3 Runway Extension Strategies

**If running low on cash (<6 months):**

**Option 1: Cut costs**

- Freeze hiring
- Reduce marketing spend
- Negotiate vendor discounts

**Option 2: Increase revenue**

- Aggressive sales push
- Raise prices
- Offer annual discounts (upfront cash)

**Option 3: Fundraise**

- Series A (if metrics strong)
- Bridge round (if need more time)
- Revenue-based financing

---

## 7. Pricing Strategy

### 7.1 Current Pricing

**Free Tier:** $0

- All features
- Groq LLM (free)
- Community support

**Premium Tier:** $29/month or $290/year

- Everything in Free
- Priority processing
- OpenAI credits ($10/month)
- Email support (48h SLA)

**Enterprise Tier:** Custom (starts at $5K/year)

- Everything in Premium
- Self-hosted option
- Custom integrations
- Dedicated support (24h SLA)
- SLA guarantees

### 7.2 Pricing Analysis

**Competitive Benchmarking:**

| Competitor   | Price/Month | Features                   |
| ------------ | ----------- | -------------------------- |
| ChatGPT Plus | $20         | Generic AI                 |
| Notion AI    | $10         | Knowledge base             |
| Jasper AI    | $39         | Content creation           |
| **Botsmann** | **$29**     | **Specialized bots + RAG** |

**Value-Based Pricing:**

- Legal professionals: $500-5,000/month value (time saved)
- Medical researchers: $200-2,000/month value
- Target: Capture 5-10% of value created

### 7.3 Pricing Optimization

**Potential Changes:**

**Option 1: Add mid-tier**

- Free: $0
- Basic: $19/month (1 bot)
- Pro: $39/month (all bots)
- Enterprise: Custom

**Option 2: Usage-based**

- Base: $19/month
- Per-query: $0.10
- Document uploads: $1/GB

**Option 3: Seat-based (Enterprise)**

- 1-5 users: $1,000/user/year
- 6-50 users: $800/user/year
- 51+ users: $600/user/year

**Recommendation:** Test pricing with A/B test, iterate based on conversion data

---

## 8. Budget Management

### 8.1 Annual Budget (Year 1, Post-Seed)

**Revenue Budget:**

- Premium: $348K
- Enterprise: $30K
- Services: $20K
- **Total: $398K**

**Expense Budget:**

| Category              | Budget    | % of Revenue |
| --------------------- | --------- | ------------ |
| **COGS**              | $66K      | 17%          |
| **Personnel**         | $871K     | 219%         |
| **Infrastructure**    | $2K       | 0.5%         |
| **Marketing & Sales** | $110K     | 28%          |
| **Operations**        | $55K      | 14%          |
| **Total**             | **$1.1M** | **278%**     |

**Net: -$706K** (funded by seed round)

### 8.2 Quarterly Budget Review

**Process:**

1. Review actual vs. budget
2. Analyze variances
3. Adjust forecast
4. Reallocate if needed

**Example Q2 Review:**

```
Q2 Budget vs. Actual

Revenue
  Budget: $75K
  Actual: $68K
  Variance: -$7K (9% below)
  Reason: Slower enterprise sales

Expenses
  Budget: $260K
  Actual: $245K
  Variance: -$15K (6% below)
  Reason: Delayed hire

Action Items:
- Increase sales outreach
- Accelerate hiring to hit growth targets
```

### 8.3 Department Budgets

**Engineering (35% of budget):**

- Personnel: $559K
- Tools & software: $20K
- Infrastructure: $2K

**Sales & Marketing (30% of budget):**

- Personnel: $208K
- Advertising: $60K
- Conferences: $20K
- Content: $24K

**Operations (10% of budget):**

- Personnel: $104K
- Legal & accounting: $20K
- Insurance: $10K
- Office: $15K

---

## 9. Financial Reporting

### 9.1 Key Metrics Dashboard

**Revenue Metrics:**

- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- ARPU (Average Revenue Per User)
- Growth rate (MoM, YoY)

**Customer Metrics:**

- New customers (monthly)
- Churn rate
- Net revenue retention
- CAC payback period

**Profitability Metrics:**

- Gross margin
- EBITDA margin
- Burn rate
- Runway

**Efficiency Metrics:**

- LTV:CAC ratio
- CAC payback period
- Revenue per employee
- Magic number (sales efficiency)

### 9.2 Monthly Financial Report

**Format:**

```
Botsmann Monthly Financial Report
Month: June 2026

Revenue
  MRR: $43,500 (+15% MoM)
  ARR: $522K (+15% MoM)
  New MRR: $7,250
  Churned MRR: $1,450
  Net New MRR: $5,800

Customers
  Paid Users: 1,500 (+250)
  Enterprise: 5 (+2)
  Churn: 1.2% (target: <2%)

Expenses
  COGS: $27,500
  OpEx: $86,667
  Total: $114,167

Cash
  Beginning: $1.05M
  Ending: $979K
  Burn: $71K
  Runway: 14 months

Key Initiatives
  - Launched API marketplace
  - Closed 2 enterprise deals
  - Hired Senior Backend Engineer
```

### 9.3 Board Reporting

**Quarterly Board Meeting Deck:**

**Slide 1: Overview**

- Revenue, customers, cash

**Slide 2: Revenue Deep Dive**

- MRR trend, cohort analysis, churn

**Slide 3: Growth Metrics**

- New signups, conversion, CAC

**Slide 4: Product**

- Feature releases, usage stats

**Slide 5: Team**

- Headcount, hiring pipeline

**Slide 6: Challenges & Risks**

- Key blockers, mitigation plans

**Slide 7: Next Quarter Plan**

- Goals, initiatives, asks

---

## 10. Fundraising

### 10.1 Seed Round ($1.5M)

**Use of Funds:**

- Engineering (40%): $600K
- Sales & Marketing (30%): $450K
- Operations (10%): $150K
- Infrastructure (7%): $100K
- Runway buffer (13%): $200K

**Milestones (18 months):**

- 50,000 free users
- 2,500 premium users
- 20 enterprise customers
- $1.5M ARR

**Valuation:**

- Pre-money: $10M (SAFE cap)
- Post-money: $11.5M
- Dilution: ~13%

### 10.2 Series A ($10M, Target: Year 2)

**Target Metrics:**

- ARR: $3-5M
- Growth: 200%+ YoY
- Gross margin: 80%+
- LTV:CAC: >3:1
- Payback: <12 months

**Use of Funds:**

- Scale sales & marketing (50%)
- Product development (30%)
- International expansion (10%)
- Operations (10%)

**Expected Valuation:** $30-50M

### 10.3 Fundraising Timeline

**Q1 2026:**

- Close seed round ($1.5M)
- Deploy capital, execute plan

**Q4 2026:**

- Begin Series A preparation
- Refine metrics, narrative

**Q1 2027:**

- Raise Series A ($10M)
- Scale aggressively

---

## Appendix

### A1: Financial Model

[Link to Google Sheets: Detailed 5-year financial model with assumptions]

### A2: Pricing Calculator

**Premium User Value:**

```
Time saved: 10 hours/month
Hourly rate: $100/hour
Value created: $1,000/month
Botsmann price: $29/month
Value capture: 2.9%
```

**Enterprise Customer Value:**

```
Team size: 20 lawyers
Time saved per lawyer: 5 hours/month
Hourly rate: $300/hour
Value created: $360K/year
Botsmann price: $20K/year
Value capture: 5.6%
```

### A3: Glossary

**ARR:** Annual Recurring Revenue
**ARPU:** Average Revenue Per User
**CAC:** Customer Acquisition Cost
**Churn:** % customers who cancel
**COGS:** Cost of Goods Sold
**LTV:** Lifetime Value
**MRR:** Monthly Recurring Revenue
**NRR:** Net Revenue Retention

---

**Document Owner:** Finance Team
**Contributors:** CEO, Engineering Lead
**Review Cadence:** Monthly
**Last Review:** January 16, 2026
**Next Review:** February 16, 2026
