# Solon Governance Project

This is a Next.js implementation of the Solon decentralized direct democracy platform, showcasing the key features and vision of this governance system.

## Features

- **Open Pay**: Public timeline of all government transactions with social interaction features
- **Open Law**: Laws with problem statements, KPIs, timeframes, and political accountability tracking
- **Open Service**: Competitive bidding system for government functions
- **Open Vote**: Citizen voting on laws, budgets, and policies
- **Portal**: Central hub for citizen interaction with all Solon products

## Implementation Details

### Products
- `page.tsx`: Main landing page component
- `layout.tsx`: Layout component with metadata
- Helper components:
  - `VisionCard`: Displays core vision pillars
  - `RoadmapItem`: Shows implementation timeline phases

### Folder Structure
- `/open-pay`: Open payment and transaction tracking system
- `/open-law`: Open law creation and tracking framework
- `/open-service`: Public service marketplace
- `/open-vote`: Direct democracy voting system
- `/portal`: Unified citizen portal with modular architecture
  - `/components`: Portal-specific component modules
    - `MetricsGrid.tsx`: Dashboard metrics display
    - `ComponentCards.tsx`: Navigation cards for Solon modules
    - `ActivityFeed.tsx`: Recent user activity tracking
    - `TaxFlow.tsx`: Tax allocation visualization
    - `ActionCenter.tsx`: Pending user actions
    - `TabsContainer.tsx`: Tab system with filter capability
    - `ComponentPreview.tsx`: Preview cards for Solon modules
- `/components`: Shared components used across the application
- `/whitepaper`: Documentation and vision
- `/build`: Developer resources and contribution guidelines

### Technical Stack
- Next.js 14.2
- React
- TypeScript
- TailwindCSS

## Future Development
This is a frontend prototype. Future development will include:
- Backend API integration
- Authentication system
- Interactive transaction and voting systems
- Mobile responsiveness enhancements

## TypeScript Interfaces
```typescript
interface VisionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface RoadmapItemProps {
  phase: string;
  title: string;
  description: string;
  timeline: string;
  current?: boolean;
}
``` 