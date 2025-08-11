// GeminixOverview.jsx
import React from "react";

const GeminixOverview = () => {
  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">Geminix Company Overview</h1>
        </div>

        {/* Company Overview */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body space-y-4">
            <p>
              Geminix is an internationally operating cryptocurrency staking and
              wealth-growth platform that leverages the power of blockchain to
              deliver sustainable, high-yield returns. Built as a fully
              decentralized Web3 application on the BNB Smart Chain (BSC),
              Geminix empowers users to grow their digital assets through secure,
              transparent, and efficient staking mechanisms.
            </p>
            <p>
              By deploying funds into carefully selected stablecoin liquidity
              farming pools, Geminix offers investors a daily ROI between 1.2%
              and 2%. Headquartered in Australia, the company prioritizes
              adherence to financial regulations, operational transparency, and
              advanced security measures to foster investor confidence.
            </p>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Mission</h2>
              <p>
                To make profitable crypto staking accessible to individuals
                worldwide by providing a transparent, decentralized platform with
                strong security and regulatory foundations. Geminix is committed
                to ensuring that every investor—regardless of their starting
                capital—can benefit from consistent blockchain-based returns.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Vision</h2>
              <p>
                To become the most trusted name in decentralized staking,
                recognized globally for delivering stable, predictable yields and
                a seamless user experience in the evolving world of digital
                finance.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Commitment */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Regulatory Commitment</h2>
            <p>
              Geminix operates with a strong compliance ethos. As an
              Australian-registered financial entity, it abides by the country’s
              digital asset and anti-money-laundering regulations, aligning with
              global standards to ensure lawful, responsible, and transparent
              operations. This dedication to compliance strengthens Geminix’s
              position as a trustworthy staking partner in both domestic and
              international markets.
            </p>
          </div>
        </div>

        {/* Core Services & Features */}
        <div className="card bg-base-100 shadow-md" id="core-services">
          <div className="card-body">
            <h2 className="card-title">Core Services & Features</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Daily ROI of 1.2%–2%: Earnings are generated via stablecoin
                liquidity farming, with rewards automatically distributed each
                day through audited smart contracts.
              </li>
              <li>
                BNB Smart Chain Web3 Integration: Full compatibility with the
                Binance Chain Wallet and other Web3 wallets ensures effortless
                participation for users across the Binance ecosystem.
              </li>
              <li>
                Low Entry Barrier: Start staking with as little as $10 USD,
                making the platform accessible to both beginners and seasoned
                investors.
              </li>
              <li>
                Stablecoin-Centric Strategy: Investments are deployed exclusively
                in USDT-based liquidity pools, minimizing market volatility risks
                while generating consistent yields.
              </li>
              <li>
                Community Referral Rewards: A single-tier referral program rewards
                users for inviting new participants, promoting organic platform
                growth.
              </li>
              <li>
                On-Chain Transparency: Every transaction and staking activity is
                recorded on the blockchain, ensuring complete public
                accountability and auditability.
              </li>
            </ul>
          </div>
        </div>

        {/* Technology & Security Framework */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Technology & Security Framework</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                BNB Smart Chain Backbone: Low transaction costs, fast processing
                speeds, and Ethereum Virtual Machine compatibility enable a
                scalable and efficient staking environment.
              </li>
              <li>
                Capital Protection Approach: By focusing solely on USDT staking
                in highly liquid pools, Geminix reduces volatility risks and
                safeguards principal investments under normal market conditions.
              </li>
              <li>
                Self-Custody Model: Users retain full control over their funds at
                all times—private keys are never handled by the platform.
              </li>
              <li>
                Security-First Architecture: Audited smart contracts, encrypted
                data handling, and adherence to strict regulatory security
                protocols protect users against fraud and cyber threats.
              </li>
            </ul>
          </div>
        </div>

        {/* Target Audience */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Target Audience</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Worldwide Crypto Investors: Individuals looking for
                decentralized, secure, and reliable returns on their digital
                assets.
              </li>
              <li>
                Binance Ecosystem Participants: BNB holders and Binance Wallet
                users seeking yield on their holdings.
              </li>
              <li>
                Emerging Market Investors: Special focus on fast-growing
                economies where demand for stable, low-entry crypto investment
                products is high.
              </li>
              <li>
                Both Newcomers & Experienced Traders: A user-friendly interface
                and accessible starting amounts make Geminix ideal for all
                experience levels.
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Presence */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Corporate Presence</h2>
            <p>
              Australian Office: Level 10, 85 Castlereagh Street, Sydney, NSW
              2000, Australia.
            </p>
            <p>
              From this base, Geminix coordinates global operations, maintains
              compliance with local financial regulations, and offers customer
              support to its worldwide community.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">In Summary</h2>
            <p>
              Geminix is a regulated, blockchain-powered staking platform
              delivering 1.2%–2% daily ROI through stablecoin liquidity farming
              on the BNB Smart Chain. With a self-custody model, robust security
              practices, and unwavering commitment to transparency, Geminix
              stands as a reliable partner for anyone seeking consistent,
              decentralized crypto income.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminixOverview;
