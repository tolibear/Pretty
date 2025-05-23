# Pretty.af - AI-Powered Image Generation Marketplace

**Domain:** [pretty.af](https://pretty.af)  
**Version:** 3.0  
**Status:** In Development

## 🎯 Vision & Mission

**Vision:** Pretty is the premier marketplace for AI-generated imagery, connecting creators who develop unique visual styles with users who need high-quality, on-brand images.

**Mission:** Democratize AI image generation by enabling creators to monetize their artistic vision while providing users with instant access to professional-quality, stylized imagery.

## 🏗️ Platform Architecture

### User Types
- **Visitors** - Unauthenticated browsers discovering content
- **Users** - Authenticated image generators (5 free generations)
- **Creators** - Style developers and publishers (42% revenue share)
- **Admins** - Platform moderators and operators

### Core Entities
- **Styles** - AI image generation templates created by creators
- **Generations** - Individual images created using styles
- **Collections** - User-curated groups of styles or generations
- **Payments** - Crypto transactions for generation services
- **Analytics** - Performance data for creators and platform

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15.2.4 with App Router
- **React:** 19 (latest)
- **Styling:** Tailwind CSS + tailwindcss-animate
- **UI Components:** Radix UI (comprehensive component library)
- **State Management:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Icons:** Lucide React

### Authentication Strategy
- **Primary:** X (Twitter) OAuth (prominently featured)
- **Secondary:** Google OAuth
- **Fallback:** Email + password
- **Philosophy:** Social-first, frictionless onboarding

### Payment & Wallet Integration
- **Cryptocurrencies:** ETH, USDC, PENGU
- **Wallet Support:** MetaMask, WalletConnect, Hardware wallets
- **Philosophy:** Wallet connection only when necessary (after free generations)

## 📁 Project Structure

```
Pretty.af/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── categories/[slug]/        # Category browsing
│   ├── creators/                 # Creator discovery
│   ├── dashboard/                # Creator dashboard
│   │   └── create-style/
│   ├── explore/                  # Style discovery
│   ├── featured/                 # Featured content
│   ├── new/                      # New releases
│   ├── playground/               # Style testing
│   ├── style/[id]/              # Style detail pages
│   ├── trending/                 # Trending content
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Homepage
├── components/
│   ├── auth/                     # Authentication components
│   ├── ui/                       # Reusable UI components
│   ├── user/                     # User-specific components
│   ├── wallet/                   # Wallet integration
│   └── [various components]
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── public/images/                # Static assets
└── styles/                       # Additional styling
```

## 🎨 Key Features

### For Users
- **Free Generations:** 5 free image generations upon signup
- **Style Discovery:** Browse trending, featured, and new styles
- **Social Authentication:** Quick signup with X/Twitter or Google
- **Wallet Integration:** Connect wallet only when purchasing additional generations
- **Personal Gallery:** Showcase and organize generated images
- **Collections:** Curate favorite styles and generations

### For Creators
- **Style Creation:** Advanced style editor with AI model integration
- **Revenue Sharing:** 42% of generation fees (58% to platform)
- **Creator Dashboard:** Analytics, earnings tracking, style management
- **Payout System:** Crypto withdrawals to connected wallets
- **Creator Profile:** Professional portfolio showcase
- **Community Features:** Follower system, creator spotlights

### Platform Features
- **Search & Discovery:** Advanced filtering and semantic search
- **Content Moderation:** Automated NSFW and copyright detection
- **Community Guidelines:** Comprehensive safety and quality standards
- **Analytics:** Detailed performance metrics for creators and platform
- **Mobile Responsive:** Optimized for all device sizes

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- pnpm (preferred package manager)
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/pretty.af.git
cd pretty.af

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Environment Variables
Create a `.env.local` file with:
```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=your-database-url

# AI Services
OPENAI_API_KEY=your-openai-key
STABILITY_API_KEY=your-stability-key

# Blockchain
ETHEREUM_RPC_URL=your-ethereum-rpc
POLYGON_RPC_URL=your-polygon-rpc

# Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
S3_BUCKET_NAME=your-s3-bucket
```

## 🎯 Core User Flows

### 1. Visitor Discovery
- Landing page with trending generations
- Style category showcase
- Creator spotlight section
- Social proof and testimonials

### 2. User Authentication
- **Primary:** X (Twitter) OAuth (one-click signup)
- **Secondary:** Google OAuth
- **Fallback:** Email + password
- Auto-populate profile from social accounts

### 3. Image Generation
- Browse and select styles
- Configure generation parameters
- Free generations (5 per user)
- Wallet connection for additional generations
- Real-time generation progress
- High-quality result delivery

### 4. Creator Journey
- Creator onboarding tutorial
- Style creation with advanced editor
- Publishing and monetization
- Analytics and earnings tracking
- Community building and engagement

## 💰 Monetization Model

### Revenue Sharing
- **Creators:** 42% of generation fees
- **Platform:** 58% of generation fees

### Payment Methods
- **Cryptocurrencies:** ETH, USDC, PENGU
- **Wallet Integration:** MetaMask, WalletConnect
- **Payout System:** Real-time earnings, flexible withdrawals

### Free Tier
- 5 free generations per user
- Full platform access
- No wallet connection required
- Upgrade prompts after free tier exhaustion

## 📊 Success Metrics

### User Metrics
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- User Retention (D1, D7, D30)
- Conversion Rate (visitor → user)
- Generations per user

### Creator Metrics
- Active creators monthly
- Creator retention rate
- Average revenue per creator
- Style publishing rate
- Creator-to-user ratio

### Business Metrics
- Monthly Recurring Revenue (MRR)
- Average Revenue Per User (ARPU)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Platform revenue share

## 🛡️ Security & Compliance

### Security Requirements
- Multi-factor authentication support
- Hardware wallet integration
- End-to-end encryption for sensitive data
- Automated content moderation

### Content Safety
- NSFW detection and filtering
- Copyright violation prevention
- Community guidelines enforcement
- User reporting and moderation tools

### Legal Compliance
- GDPR compliance (EU users)
- CCPA compliance (California users)
- DMCA takedown procedures
- Terms of service and privacy policy

## 🚀 Performance Standards

- **Page Load Time:** < 2 seconds
- **Generation Processing:** < 30 seconds average
- **Search Response:** < 500ms
- **Image Upload:** < 5 seconds for 10MB files
- **Concurrent Users:** 10,000+ simultaneous users
- **Generation Queue:** 1,000+ concurrent generations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

- **Documentation:** [docs.pretty.af](https://docs.pretty.af)
- **Support Email:** support@pretty.af
- **Community:** [Discord](https://discord.gg/pretty-af)
- **Twitter:** [@PrettyAF](https://twitter.com/PrettyAF)

---

**Built with ❤️ for the AI art community** 