'use client';

import { AgencyData, AgencyTeamMember, AgencyRegulation } from '../components/AgencyProfile';
import { EnhancedTransaction } from '../components/TransactionWithTraceability';
import { CitizenData, TaxPayment, CitizenContribution, CitizenBenefit } from '../components/CitizenProfile';

// Sample Team Members
export const sampleTeamMembers: AgencyTeamMember[] = [
  {
    id: 'tm1',
    name: 'Eleanor Rodriguez',
    position: 'Director',
    department: 'Executive Office',
    imageUrl: '/images/avatars/eleanor.jpg',
    bio: 'Public servant with 15 years of experience in government administration and policy implementation.',
    yearsOfService: 15,
    salary: 175000,
    transparency: 92,
    responsibilities: [
      'Agency oversight',
      'Strategic planning',
      'Interdepartmental coordination',
      'Budget approval'
    ],
    contact: {
      email: 'eleanor.rodriguez@gov.example',
      phone: '(555) 123-4567',
      office: 'HQ - Suite 400'
    }
  },
  {
    id: 'tm2',
    name: 'Marcus Johnson',
    position: 'Deputy Director',
    department: 'Operations',
    imageUrl: '/images/avatars/marcus.jpg',
    bio: 'Former private sector executive with expertise in organizational efficiency and process improvement.',
    yearsOfService: 7,
    salary: 155000,
    transparency: 88,
    responsibilities: [
      'Daily operations management',
      'Staff supervision',
      'Process improvement',
      'Performance metrics'
    ],
    contact: {
      email: 'marcus.johnson@gov.example',
      phone: '(555) 123-4568',
      office: 'HQ - Suite 320'
    }
  },
  {
    id: 'tm3',
    name: 'Sarah Chen',
    position: 'Chief Financial Officer',
    department: 'Finance',
    imageUrl: '/images/avatars/sarah.jpg',
    bio: 'CPA with background in public finance and government accounting standards.',
    yearsOfService: 9,
    salary: 160000,
    transparency: 95,
    responsibilities: [
      'Budget management',
      'Financial reporting',
      'Audit coordination',
      'Financial compliance'
    ],
    contact: {
      email: 'sarah.chen@gov.example',
      phone: '(555) 123-4569',
      office: 'HQ - Suite 280'
    }
  },
  {
    id: 'tm4',
    name: 'James Wilson',
    position: 'Chief Technology Officer',
    department: 'IT Services',
    imageUrl: '/images/avatars/james.jpg',
    bio: 'Technology leader with experience in government systems modernization and cybersecurity.',
    yearsOfService: 5,
    salary: 165000,
    transparency: 91,
    responsibilities: [
      'Technology infrastructure',
      'Digital services',
      'Cybersecurity',
      'Data management'
    ],
    contact: {
      email: 'james.wilson@gov.example',
      phone: '(555) 123-4570',
      office: 'Tech Center - Floor 3'
    }
  },
  {
    id: 'tm5',
    name: 'Maria Gonzalez',
    position: 'Community Relations Manager',
    department: 'Public Affairs',
    imageUrl: '/images/avatars/maria.jpg',
    bio: 'Community organizer with strong connections to local neighborhoods and advocacy groups.',
    yearsOfService: 11,
    salary: 125000,
    transparency: 93,
    responsibilities: [
      'Community outreach',
      'Public meetings',
      'Citizen feedback',
      'Partnership development'
    ],
    contact: {
      email: 'maria.gonzalez@gov.example',
      phone: '(555) 123-4571',
      office: 'Community Center - Room 104'
    }
  }
];

// Sample Enhanced Transactions
export const sampleTransactions: EnhancedTransaction[] = [
  {
    id: 'tx1',
    date: '2023-06-15',
    department: 'Transportation',
    departmentId: 'dept2',
    recipient: 'Metro Construction Co.',
    description: 'Road Repair Project - Downtown District',
    amount: 450000,
    status: 'Completed',
    metrics: {
      costPerUnit: '$150/sq meter',
      timeline: 'On schedule',
      qualityScore: 95,
      contractCompliance: 100
    },
    transparencyScore: 92,
    socialData: {
      publicComments: 18,
      likes: 35,
      concerns: 3,
      shares: 12
    },
    enablingLaws: [
      { id: 'law3', name: 'Infrastructure Maintenance Act' },
      { id: 'law7', name: 'Public Works Contracting Standards' }
    ],
    documents: [
      { id: 'doc1', name: 'Contract Agreement', url: '/documents/tx1/contract.pdf' },
      { id: 'doc2', name: 'Environmental Impact', url: '/documents/tx1/impact.pdf' },
      { id: 'doc3', name: 'Completion Certificate', url: '/documents/tx1/completion.pdf' }
    ],
    timeline: [
      { date: '2023-01-10', event: 'Project Approved', description: 'Budget allocation confirmed' },
      { date: '2023-02-05', event: 'Bidding Process', description: '5 contractors submitted bids' },
      { date: '2023-03-20', event: 'Contract Awarded', description: 'Metro Construction selected' },
      { date: '2023-04-15', event: 'Work Commenced', description: 'Initial road closures and setup' },
      { date: '2023-06-12', event: 'Final Inspection', description: 'Project passed all quality checks' },
      { date: '2023-06-15', event: 'Payment Issued', description: 'Final payment for completed work' }
    ]
  },
  {
    id: 'tx2',
    date: '2023-07-02',
    department: 'Education',
    departmentId: 'dept3',
    recipient: 'Scholastic Tech Solutions',
    description: 'Classroom Technology Upgrade - District Schools',
    amount: 325000,
    status: 'Completed',
    metrics: {
      costPerUnit: '$1300/classroom',
      timeline: '2 weeks ahead of schedule',
      qualityScore: 98,
      contractCompliance: 100
    },
    transparencyScore: 96,
    socialData: {
      publicComments: 42,
      likes: 156,
      concerns: 5,
      shares: 37
    },
    enablingLaws: [
      { id: 'law5', name: 'Education Technology Advancement Act' },
      { id: 'law12', name: 'Digital Literacy Initiative' }
    ],
    documents: [
      { id: 'doc4', name: 'Equipment Specifications', url: '/documents/tx2/specs.pdf' },
      { id: 'doc5', name: 'School Distribution Plan', url: '/documents/tx2/distribution.pdf' },
      { id: 'doc6', name: 'Training Schedule', url: '/documents/tx2/training.pdf' }
    ],
    timeline: [
      { date: '2023-03-05', event: 'Needs Assessment', description: 'Evaluation of classroom requirements' },
      { date: '2023-04-12', event: 'Procurement Approval', description: 'School board approved technology plan' },
      { date: '2023-05-20', event: 'Vendor Selection', description: 'Scholastic Tech chosen as provider' },
      { date: '2023-06-15', event: 'Installation Begins', description: 'First phase of schools upgraded' },
      { date: '2023-06-30', event: 'Teacher Training', description: 'Professional development sessions held' },
      { date: '2023-07-02', event: 'Project Completion', description: 'All classrooms upgraded and verified' }
    ]
  },
  {
    id: 'tx3',
    date: '2023-05-18',
    department: 'Parks & Recreation',
    departmentId: 'dept4',
    recipient: 'Green Spaces Landscaping',
    description: 'Community Park Renovation - Westside',
    amount: 275000,
    status: 'Completed',
    metrics: {
      costPerUnit: '$55/sq meter',
      timeline: '1 week delayed (weather)',
      qualityScore: 93,
      contractCompliance: 98
    },
    transparencyScore: 90,
    socialData: {
      publicComments: 87,
      likes: 215,
      concerns: 12,
      shares: 45
    },
    enablingLaws: [
      { id: 'law8', name: 'Public Spaces Enhancement Act' },
      { id: 'law15', name: 'Community Recreation Standards' }
    ],
    documents: [
      { id: 'doc7', name: 'Design Plans', url: '/documents/tx3/design.pdf' },
      { id: 'doc8', name: 'Community Feedback', url: '/documents/tx3/feedback.pdf' },
      { id: 'doc9', name: 'Sustainability Report', url: '/documents/tx3/sustainability.pdf' }
    ],
    timeline: [
      { date: '2023-02-10', event: 'Community Input', description: 'Public meetings to gather design ideas' },
      { date: '2023-03-15', event: 'Design Approval', description: 'Final plans approved by Parks Board' },
      { date: '2023-04-01', event: 'Construction Begins', description: 'Site preparation and old equipment removal' },
      { date: '2023-05-10', event: 'Weather Delay', description: 'Heavy rain caused one week delay' },
      { date: '2023-05-17', event: 'Final Inspection', description: 'Safety certification completed' },
      { date: '2023-05-18', event: 'Park Reopening', description: 'Ribbon cutting ceremony with residents' }
    ]
  },
  {
    id: 'tx4',
    date: '2023-07-20',
    department: 'Public Health',
    departmentId: 'dept5',
    recipient: 'Medical Supplies Direct',
    description: 'Vaccine Distribution Program',
    amount: 520000,
    status: 'In Progress',
    metrics: {
      costPerUnit: '$26/resident served',
      timeline: 'On schedule',
      qualityScore: 99,
      contractCompliance: 100
    },
    transparencyScore: 98,
    socialData: {
      publicComments: 132,
      likes: 267,
      concerns: 45,
      shares: 89
    },
    enablingLaws: [
      { id: 'law2', name: 'Public Health Emergency Response Act' },
      { id: 'law9', name: 'Vaccine Access Initiative' }
    ],
    documents: [
      { id: 'doc10', name: 'Distribution Strategy', url: '/documents/tx4/strategy.pdf' },
      { id: 'doc11', name: 'Cold Chain Verification', url: '/documents/tx4/coldchain.pdf' },
      { id: 'doc12', name: 'Community Access Points', url: '/documents/tx4/access.pdf' }
    ],
    timeline: [
      { date: '2023-05-01', event: 'Emergency Declaration', description: 'Health emergency triggered response' },
      { date: '2023-05-15', event: 'Supplier Contract', description: 'Expedited procurement process completed' },
      { date: '2023-06-10', event: 'First Delivery', description: 'Initial vaccine supply received' },
      { date: '2023-06-15', event: 'Distribution Begins', description: 'Priority populations served first' },
      { date: '2023-07-01', event: 'Phase 2 Rollout', description: 'General population access points opened' },
      { date: '2023-07-20', event: 'Interim Payment', description: '60% of program completed, interim payment made' }
    ]
  },
  {
    id: 'tx5',
    date: '2023-04-05',
    department: 'Public Safety',
    departmentId: 'dept1',
    recipient: 'First Responder Equipment Co.',
    description: 'Emergency Services Equipment Upgrade',
    amount: 380000,
    status: 'Completed',
    metrics: {
      costPerUnit: '$12,500/unit',
      timeline: 'On schedule',
      qualityScore: 97,
      contractCompliance: 100
    },
    transparencyScore: 94,
    socialData: {
      publicComments: 56,
      likes: 189,
      concerns: 7,
      shares: 42
    },
    enablingLaws: [
      { id: 'law1', name: 'Emergency Services Modernization Act' },
      { id: 'law11', name: 'First Responder Safety Standards' }
    ],
    documents: [
      { id: 'doc13', name: 'Equipment Specifications', url: '/documents/tx5/specs.pdf' },
      { id: 'doc14', name: 'Training Certification', url: '/documents/tx5/training.pdf' },
      { id: 'doc15', name: 'Deployment Plan', url: '/documents/tx5/deployment.pdf' }
    ],
    timeline: [
      { date: '2023-01-20', event: 'Needs Assessment', description: 'Evaluation of current equipment status' },
      { date: '2023-02-10', event: 'Budget Approval', description: 'City council approved emergency funding' },
      { date: '2023-02-28', event: 'Vendor Selection', description: 'Competitive bid process completed' },
      { date: '2023-03-15', event: 'Equipment Delivery', description: 'All ordered items received and inventoried' },
      { date: '2023-03-20', event: 'Staff Training', description: 'All shifts completed equipment training' },
      { date: '2023-04-05', event: 'Full Deployment', description: 'New equipment in service across all stations' }
    ]
  }
];

// Sample Agency Regulations
export const sampleRegulations: AgencyRegulation[] = [
  {
    id: 'reg1',
    title: 'Public Safety Response Time Standards',
    description: 'Establishes maximum response times for emergency services based on incident type and location.',
    dateEnacted: '2022-09-15',
    lastUpdated: '2023-01-20',
    status: 'active',
    purpose: 'To ensure timely emergency service response to all areas of the jurisdiction.',
    kpis: [
      {
        metric: 'Urban Response Time',
        target: '< 4 minutes',
        current: '3.8 minutes',
        status: 'achieved'
      },
      {
        metric: 'Suburban Response Time',
        target: '< 6 minutes',
        current: '5.5 minutes',
        status: 'achieved'
      },
      {
        metric: 'Rural Response Time',
        target: '< 12 minutes',
        current: '13.2 minutes',
        status: 'at-risk'
      }
    ],
    enablingLawId: 'law1',
    enablingLawName: 'Emergency Services Modernization Act'
  },
  {
    id: 'reg2',
    title: 'Road Maintenance Quality Standards',
    description: 'Defines requirements for road repairs, including materials, durability, and environmental considerations.',
    dateEnacted: '2021-11-30',
    lastUpdated: '2023-02-10',
    status: 'active',
    purpose: 'To ensure consistent quality in road construction and maintenance projects.',
    kpis: [
      {
        metric: 'Materials Compliance',
        target: '100%',
        current: '98%',
        status: 'on-track'
      },
      {
        metric: 'Repair Durability',
        target: '5+ years',
        current: '4.7 years avg.',
        status: 'on-track'
      },
      {
        metric: 'Project Documentation',
        target: '100%',
        current: '100%',
        status: 'achieved'
      }
    ],
    enablingLawId: 'law3',
    enablingLawName: 'Infrastructure Maintenance Act'
  },
  {
    id: 'reg3',
    title: 'Educational Technology Implementation',
    description: 'Guidelines for technology deployment in educational settings, including accessibility requirements.',
    dateEnacted: '2022-07-15',
    lastUpdated: '2023-03-05',
    status: 'active',
    purpose: 'To standardize technology implementation and ensure equal access across all schools.',
    kpis: [
      {
        metric: 'Student Device Ratio',
        target: '1:1',
        current: '1:1.2',
        status: 'on-track'
      },
      {
        metric: 'Teacher Training',
        target: '100%',
        current: '87%',
        status: 'at-risk'
      },
      {
        metric: 'Accessibility Compliance',
        target: '100%',
        current: '100%',
        status: 'achieved'
      }
    ],
    enablingLawId: 'law5',
    enablingLawName: 'Education Technology Advancement Act'
  },
  {
    id: 'reg4',
    title: 'Park Sustainability Standards',
    description: 'Requirements for water conservation, native plants, and sustainable maintenance in public parks.',
    dateEnacted: '2022-02-28',
    lastUpdated: '2022-10-15',
    status: 'active',
    purpose: 'To ensure environmental sustainability in public park spaces.',
    kpis: [
      {
        metric: 'Water Usage Reduction',
        target: '30%',
        current: '25%',
        status: 'on-track'
      },
      {
        metric: 'Native Plant Coverage',
        target: '75%',
        current: '68%',
        status: 'on-track'
      },
      {
        metric: 'Chemical-Free Maintenance',
        target: '90%',
        current: '85%',
        status: 'on-track'
      }
    ],
    enablingLawId: 'law8',
    enablingLawName: 'Public Spaces Enhancement Act'
  },
  {
    id: 'reg5',
    title: 'Health Emergency Response Protocol',
    description: 'Procedures for coordinating public health responses to emergencies, including resource allocation.',
    dateEnacted: '2022-05-10',
    lastUpdated: '2023-04-20',
    status: 'active',
    purpose: 'To establish clear protocols for responding to public health emergencies.',
    kpis: [
      {
        metric: 'Response Activation Time',
        target: '< 24 hours',
        current: '18 hours',
        status: 'achieved'
      },
      {
        metric: 'Resource Distribution Equity',
        target: '100%',
        current: '94%',
        status: 'on-track'
      },
      {
        metric: 'Public Communication',
        target: '12 hour updates',
        current: '24 hour updates',
        status: 'failed'
      }
    ],
    enablingLawId: 'law2',
    enablingLawName: 'Public Health Emergency Response Act'
  }
];

// Sample Agencies
export const sampleAgencies: AgencyData[] = [
  {
    id: 'dept1',
    name: 'Department of Public Safety',
    description: 'Responsible for emergency services, law enforcement, and disaster response coordination throughout the jurisdiction.',
    transparencyScore: 87,
    establishment: 'January 15, 1965',
    budget: {
      total: 38500000,
      allocated: 36750000,
      spent: 28125000,
      fiscalYear: '2023-2024'
    },
    metrics: [
      {
        name: 'Emergency Response Time',
        value: '4.2 min',
        change: '-0.3 min from last year',
        trend: 'up'
      },
      {
        name: 'Public Safety Index',
        value: '86/100',
        change: '+4 points from last year',
        trend: 'up'
      },
      {
        name: 'Staff Training Hours',
        value: '12,450',
        change: '+15% from last year',
        trend: 'up'
      },
      {
        name: 'Incident Resolution Rate',
        value: '94%',
        change: '+2% from last year',
        trend: 'up'
      }
    ],
    transactions: sampleTransactions.filter(t => t.department === 'Public Safety'),
    regulations: sampleRegulations.filter(r => r.enablingLawName.includes('Emergency') || r.enablingLawName.includes('First Responder')),
    team: sampleTeamMembers.filter((_, index) => [0, 3].includes(index)),
    citizenImpact: {
      servicesProvided: 15680,
      citizensServed: 180450,
      satisfactionScore: 89,
      avgResponseTime: '4.2 minutes'
    }
  },
  {
    id: 'dept2',
    name: 'Department of Transportation',
    description: 'Oversees public transportation systems, road maintenance, traffic management, and infrastructure development.',
    transparencyScore: 92,
    establishment: 'March 28, 1972',
    budget: {
      total: 42750000,
      allocated: 41500000,
      spent: 32450000,
      fiscalYear: '2023-2024'
    },
    metrics: [
      {
        name: 'Road Condition Index',
        value: '78/100',
        change: '+6 points from last year',
        trend: 'up'
      },
      {
        name: 'Public Transit Ridership',
        value: '9.2M',
        change: '+8% from last year',
        trend: 'up'
      },
      {
        name: 'Traffic Congestion',
        value: '32%',
        change: '-5% from last year',
        trend: 'up'
      },
      {
        name: 'Infrastructure Projects',
        value: '24',
        change: '+3 from last year',
        trend: 'up'
      }
    ],
    transactions: sampleTransactions.filter(t => t.department === 'Transportation'),
    regulations: sampleRegulations.filter(r => r.enablingLawName.includes('Infrastructure')),
    team: sampleTeamMembers.filter((_, index) => [1, 4].includes(index)),
    citizenImpact: {
      servicesProvided: 8760,
      citizensServed: 230000,
      satisfactionScore: 82,
      avgResponseTime: '3.5 days'
    }
  },
  {
    id: 'dept3',
    name: 'Department of Education',
    description: 'Manages public education, school programs, teacher professional development, and educational policy implementation.',
    transparencyScore: 94,
    establishment: 'September 5, 1968',
    budget: {
      total: 65250000,
      allocated: 64100000,
      spent: 48750000,
      fiscalYear: '2023-2024'
    },
    metrics: [
      {
        name: 'Graduation Rate',
        value: '89%',
        change: '+3% from last year',
        trend: 'up'
      },
      {
        name: 'Student-Teacher Ratio',
        value: '18:1',
        change: '-1 from last year',
        trend: 'up'
      },
      {
        name: 'Digital Access',
        value: '96%',
        change: '+5% from last year',
        trend: 'up'
      },
      {
        name: 'Test Score Average',
        value: '78/100',
        change: '+2 points from last year',
        trend: 'up'
      }
    ],
    transactions: sampleTransactions.filter(t => t.department === 'Education'),
    regulations: sampleRegulations.filter(r => r.enablingLawName.includes('Education')),
    team: sampleTeamMembers.filter((_, index) => [2, 4].includes(index)),
    citizenImpact: {
      servicesProvided: 350,
      citizensServed: 42500,
      satisfactionScore: 87,
      avgResponseTime: '5.2 days'
    }
  },
  {
    id: 'dept4',
    name: 'Department of Parks & Recreation',
    description: 'Responsible for maintaining public parks, recreational facilities, and community programs for citizens of all ages.',
    transparencyScore: 90,
    establishment: 'June 12, 1975',
    budget: {
      total: 28500000,
      allocated: 27900000,
      spent: 21350000,
      fiscalYear: '2023-2024'
    },
    metrics: [
      {
        name: 'Park Access',
        value: '92%',
        change: '+4% from last year',
        trend: 'up'
      },
      {
        name: 'Program Participation',
        value: '38,450',
        change: '+12% from last year',
        trend: 'up'
      },
      {
        name: 'Green Space',
        value: '1,245 acres',
        change: '+35 acres from last year',
        trend: 'up'
      },
      {
        name: 'Facility Condition',
        value: '84/100',
        change: '+5 points from last year',
        trend: 'up'
      }
    ],
    transactions: sampleTransactions.filter(t => t.department === 'Parks & Recreation'),
    regulations: sampleRegulations.filter(r => r.enablingLawName.includes('Public Spaces')),
    team: sampleTeamMembers.filter((_, index) => [0, 4].includes(index)),
    citizenImpact: {
      servicesProvided: 1250,
      citizensServed: 156000,
      satisfactionScore: 91,
      avgResponseTime: '2.8 days'
    }
  },
  {
    id: 'dept5',
    name: 'Department of Public Health',
    description: 'Manages public health initiatives, disease prevention programs, health education, and emergency health responses.',
    transparencyScore: 96,
    establishment: 'November 3, 1970',
    budget: {
      total: 56750000,
      allocated: 55900000,
      spent: 42650000,
      fiscalYear: '2023-2024'
    },
    metrics: [
      {
        name: 'Vaccination Rate',
        value: '87%',
        change: '+6% from last year',
        trend: 'up'
      },
      {
        name: 'Health Screenings',
        value: '45,320',
        change: '+18% from last year',
        trend: 'up'
      },
      {
        name: 'Community Health Score',
        value: '82/100',
        change: '+3 points from last year',
        trend: 'up'
      },
      {
        name: 'Response Time',
        value: '1.8 hours',
        change: '-0.5 hours from last year',
        trend: 'up'
      }
    ],
    transactions: sampleTransactions.filter(t => t.department === 'Public Health'),
    regulations: sampleRegulations.filter(r => r.enablingLawName.includes('Health')),
    team: sampleTeamMembers.filter((_, index) => [2, 3].includes(index)),
    citizenImpact: {
      servicesProvided: 32450,
      citizensServed: 210000,
      satisfactionScore: 88,
      avgResponseTime: '2.2 hours'
    }
  }
];

// Sample Tax Payments
export const sampleTaxPayments: TaxPayment[] = [
  {
    id: 'tax1',
    year: '2023',
    amount: 5250,
    date: '2023-04-15',
    status: 'Paid',
    type: 'Income',
    reference: 'TX-2023-04152'
  },
  {
    id: 'tax2',
    year: '2023',
    amount: 3200,
    date: '2023-03-15',
    status: 'Paid',
    type: 'Property',
    reference: 'TX-2023-03122'
  },
  {
    id: 'tax3',
    year: '2022',
    amount: 4950,
    date: '2022-04-10',
    status: 'Paid',
    type: 'Income',
    reference: 'TX-2022-04105'
  },
  {
    id: 'tax4',
    year: '2022',
    amount: 3050,
    date: '2022-03-12',
    status: 'Paid',
    type: 'Property',
    reference: 'TX-2022-03118'
  },
  {
    id: 'tax5',
    year: '2021',
    amount: 4600,
    date: '2021-04-12',
    status: 'Paid',
    type: 'Income',
    reference: 'TX-2021-04120'
  },
  {
    id: 'tax6',
    year: '2021',
    amount: 2900,
    date: '2021-03-10',
    status: 'Paid',
    type: 'Property',
    reference: 'TX-2021-03101'
  },
  {
    id: 'tax7',
    year: '2023',
    amount: 1200,
    date: '2023-06-15',
    status: 'Pending',
    type: 'Other',
    reference: 'TX-2023-06158'
  }
];

// Sample Contributions
export const sampleContributions: CitizenContribution[] = [
  {
    agencyId: 'dept1',
    agencyName: 'Department of Public Safety',
    amount: 2040,
    percentage: 22,
    transparencyScore: 87,
    contributionHistory: [
      { year: '2021', amount: 1770 },
      { year: '2022', amount: 1890 },
      { year: '2023', amount: 2040 }
    ]
  },
  {
    agencyId: 'dept2',
    agencyName: 'Department of Transportation',
    amount: 1670,
    percentage: 18,
    transparencyScore: 92,
    contributionHistory: [
      { year: '2021', amount: 1480 },
      { year: '2022', amount: 1550 },
      { year: '2023', amount: 1670 }
    ]
  },
  {
    agencyId: 'dept3',
    agencyName: 'Department of Education',
    amount: 2780,
    percentage: 30,
    transparencyScore: 94,
    contributionHistory: [
      { year: '2021', amount: 2430 },
      { year: '2022', amount: 2580 },
      { year: '2023', amount: 2780 }
    ]
  },
  {
    agencyId: 'dept4',
    agencyName: 'Department of Parks & Recreation',
    amount: 740,
    percentage: 8,
    transparencyScore: 90,
    contributionHistory: [
      { year: '2021', amount: 650 },
      { year: '2022', amount: 690 },
      { year: '2023', amount: 740 }
    ]
  },
  {
    agencyId: 'dept5',
    agencyName: 'Department of Public Health',
    amount: 2040,
    percentage: 22,
    transparencyScore: 96,
    contributionHistory: [
      { year: '2021', amount: 1770 },
      { year: '2022', amount: 1890 },
      { year: '2023', amount: 2040 }
    ]
  }
];

// Sample Benefits
export const sampleBenefits: CitizenBenefit[] = [
  {
    id: 'ben1',
    name: 'Healthcare Subsidy',
    description: 'Partial coverage for essential healthcare services',
    amount: 1200,
    frequency: 'Annual',
    provider: 'Department of Public Health',
    providerId: 'dept5',
    dateReceived: '2023-01-15',
    status: 'Active'
  },
  {
    id: 'ben2',
    name: 'Education Grant - Children',
    description: 'Support for educational materials and activities',
    amount: 500,
    frequency: 'Annual',
    provider: 'Department of Education',
    providerId: 'dept3',
    dateReceived: '2023-02-20',
    status: 'Active'
  },
  {
    id: 'ben3',
    name: 'Public Transit Pass',
    description: 'Reduced fare transit card for public transportation',
    amount: 75,
    frequency: 'Monthly',
    provider: 'Department of Transportation',
    providerId: 'dept2',
    dateReceived: '2023-07-01',
    status: 'Active'
  },
  {
    id: 'ben4',
    name: 'Recreation Program Discount',
    description: '50% discount on community center programs',
    amount: 120,
    frequency: 'Quarterly',
    provider: 'Department of Parks & Recreation',
    providerId: 'dept4',
    dateReceived: '2023-04-10',
    status: 'Active'
  },
  {
    id: 'ben5',
    name: 'Senior Wellness Program',
    description: 'Preventative health services for senior household members',
    amount: 350,
    frequency: 'Annual',
    provider: 'Department of Public Health',
    providerId: 'dept5',
    dateReceived: '2023-05-15',
    status: 'Pending'
  }
];

// Sample Citizen
export const sampleCitizen: CitizenData = {
  id: 'cit1',
  name: 'Jordan Smith',
  address: '123 Main Street, Cityville',
  district: 'North Central',
  registeredSince: '2015-06-10',
  avatarUrl: '/images/avatars/jordan.jpg',
  taxHistory: sampleTaxPayments,
  contributions: sampleContributions,
  benefits: sampleBenefits,
  representativeId: 'tm5',
  representativeName: 'Maria Gonzalez',
  totalTaxContribution: 9270,
  votingDistricts: {
    local: 'District 3',
    state: 'State District 8',
    federal: 'Federal District 2'
  },
  participationScore: 78
};

const sampleData = {
  agencies: sampleAgencies,
  transactions: sampleTransactions,
  citizen: sampleCitizen
};

export default sampleData; 