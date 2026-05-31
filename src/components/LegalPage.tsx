"use client";

import { ArrowLeft } from "lucide-react";

type LegalPageType = "privacy" | "terms" | "disclaimer";

interface LegalPageProps {
  type: LegalPageType;
  onBack: () => void;
  onNavigate: (type: LegalPageType) => void;
}

const LAST_UPDATED = "May 26, 2026";
const SITE_NAME = "Emoji Sudoku";
const SITE_URL = "https://emojisudoku.fun";

function LegalShell({
  title,
  children,
  onBack,
  onNavigate,
}: {
  title: string;
  children: React.ReactNode;
  onBack: () => void;
  onNavigate: (type: LegalPageType) => void;
}) {
  return (
    <main className="max-w-3xl mx-auto w-full px-4 py-8 sm:py-10">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to game
      </button>

      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm p-5 sm:p-8">
        <div className="mb-7">
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300 mb-2">
            {SITE_NAME}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="legal-copy space-y-6 text-sm sm:text-base leading-7 text-slate-700 dark:text-slate-300">
          {children}
        </div>
      </article>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <button
          type="button"
          onClick={() => onNavigate("privacy")}
          className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 underline-offset-4 hover:underline"
        >
          Privacy Policy
        </button>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <button
          type="button"
          onClick={() => onNavigate("terms")}
          className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 underline-offset-4 hover:underline"
        >
          Terms of Use
        </button>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <button
          type="button"
          onClick={() => onNavigate("disclaimer")}
          className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 underline-offset-4 hover:underline"
        >
          Disclaimer
        </button>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <Section title="Overview">
        <p>
          This Privacy Policy explains how {SITE_NAME} ("we," "us," or "our") handles information when you use {SITE_URL} and related pages (the "Site"). {SITE_NAME} is a free browser-based puzzle game. We aim to collect as little personal information as possible.
        </p>
      </Section>

      <Section title="Information We Collect">
        <p>
          You can play {SITE_NAME} without creating an account. We do not ask for your name, email address, phone number, payment information, or account password to play the game.
        </p>
        <p>
          The Site may store gameplay information in your browser, such as puzzle progress, daily puzzle completion status, streaks, hints used, theme preference, and similar settings. This information is stored locally on your device through browser storage, such as localStorage, so the game can remember your progress.
        </p>
        <p>
          Like most websites, our hosting provider and basic web infrastructure may automatically process technical information, such as IP address, browser type, device information, pages visited, referring URL, and approximate timestamps, to deliver the Site, maintain security, and troubleshoot errors.
        </p>
      </Section>

      <Section title="Cookies, Local Storage, Analytics, and Ads">
        <p>
          The current game uses browser storage to remember gameplay preferences and progress. You can clear this information through your browser settings, but doing so may reset your stats and streaks.
        </p>
        <p>
          If we add analytics tools, such as Google Analytics, we may use cookies or similar technologies to understand general Site usage, pages viewed, device types, and performance. We will use this information to improve the game and fix issues.
        </p>
        <p>
          If we add advertising, such as Google AdSense or other ad networks, third-party vendors may use cookies, web beacons, IP addresses, device identifiers, or similar technologies to serve ads, measure ad performance, prevent fraud, and personalize or limit ads depending on your settings and applicable law.
        </p>
      </Section>

      <Section title="How We Use Information">
        <p>We may use information to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Operate the game and remember your puzzle progress.</li>
          <li>Maintain streaks, solved counts, theme settings, and daily puzzle status.</li>
          <li>Improve gameplay, layout, speed, and reliability.</li>
          <li>Detect, prevent, and troubleshoot abuse, security issues, or technical errors.</li>
          <li>Measure Site usage if analytics are added.</li>
          <li>Display and measure ads if advertising is added.</li>
        </ul>
      </Section>

      <Section title="Third-Party Services">
        <p>
          The Site may rely on third-party services for hosting, analytics, advertising, fonts, performance, security, or similar functionality. These services may process information under their own privacy policies. We do not control every part of how third-party providers process information.
        </p>
      </Section>

      <Section title="Your Choices">
        <p>You can control or limit some data collection by:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Clearing browser cookies and local storage.</li>
          <li>Blocking cookies or third-party cookies in your browser settings.</li>
          <li>Using privacy settings, ad settings, or opt-out tools offered by your browser, device, or advertising providers.</li>
          <li>Not using optional sharing features if you do not want to share puzzle results.</li>
        </ul>
      </Section>

      <Section title="Children's Privacy">
        <p>
          {SITE_NAME} is a casual puzzle game that may be suitable for a general audience, but it is not directed specifically to children under 13. We do not knowingly collect personal information from children. If you believe a child provided personal information through the Site, contact us so we can review and delete it where appropriate.
        </p>
      </Section>

      <Section title="Data Retention">
        <p>
          Gameplay data stored in your browser remains there until you clear it, reset your browser, or the browser removes it. Technical logs handled by service providers may be retained according to their own retention practices.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. If we make changes, we will update the "Last updated" date above. Your continued use of the Site after changes means you accept the updated policy.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          For privacy questions, contact the site owner through the contact method listed on the Site. If you have not added a dedicated contact email yet, add one before launching advertising, analytics, or user-submitted features.
        </p>
      </Section>
    </>
  );
}

function TermsOfUse() {
  return (
    <>
      <Section title="Acceptance of These Terms">
        <p>
          These Terms of Use govern your access to and use of {SITE_URL} and related pages (the "Site"). By using the Site, you agree to these Terms. If you do not agree, do not use the Site.
        </p>
      </Section>

      <Section title="About the Site">
        <p>
          {SITE_NAME} is a free online puzzle game where players solve Sudoku-style grids using emojis. The Site is provided for entertainment, casual brain-training, and informational purposes only.
        </p>
      </Section>

      <Section title="Permitted Use">
        <p>You may use the Site for personal, non-commercial entertainment. You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Interfere with or disrupt the Site, servers, security, or normal gameplay.</li>
          <li>Attempt to reverse engineer, scrape, overload, copy, or misuse the Site in a way that harms the service.</li>
          <li>Use the Site for unlawful, abusive, fraudulent, or harmful activity.</li>
          <li>Misrepresent your relationship with {SITE_NAME} or imply endorsement without permission.</li>
        </ul>
      </Section>

      <Section title="No Account Required">
        <p>
          The Site currently does not require an account. If account features, leaderboards, comments, payments, or subscriptions are added later, additional terms may apply.
        </p>
      </Section>

      <Section title="Intellectual Property">
        <p>
          The Site design, code, branding, text, original puzzle layouts, and other original materials are owned by or licensed to the Site owner, except for third-party assets, open-source libraries, and emojis controlled by their respective owners. You may not copy, redistribute, sell, or repackage the Site as your own without permission.
        </p>
      </Section>

      <Section title="Emojis and Third-Party Assets">
        <p>
          Emojis may render differently depending on your device, browser, operating system, or emoji font. Emoji artwork and platform-specific emoji designs may be owned by their respective providers. Open-source libraries used by the Site remain subject to their own licenses.
        </p>
      </Section>

      <Section title="Ads, Analytics, and Third-Party Links">
        <p>
          The Site may display ads, use analytics, or link to third-party websites in the future. We are not responsible for third-party websites, services, ads, policies, or content. Your use of third-party services is governed by their own terms and privacy policies.
        </p>
      </Section>

      <Section title="Availability and Changes">
        <p>
          We may update, change, pause, or discontinue any part of the Site at any time. We do not guarantee that the Site will always be available, error-free, secure, or compatible with every browser or device.
        </p>
      </Section>

      <Section title="Disclaimer of Warranties">
        <p>
          The Site is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. We do not guarantee uninterrupted access, perfect puzzle accuracy, or that all defects will be corrected immediately.
        </p>
      </Section>

      <Section title="Limitation of Liability">
        <p>
          To the maximum extent permitted by law, the Site owner will not be liable for indirect, incidental, special, consequential, punitive, or lost-profit damages arising from your use of or inability to use the Site.
        </p>
      </Section>

      <Section title="Changes to These Terms">
        <p>
          We may update these Terms from time to time. If we make changes, we will update the "Last updated" date above. Your continued use of the Site after changes means you accept the updated Terms.
        </p>
      </Section>
    </>
  );
}

function Disclaimer() {
  return (
    <>
      <Section title="General Information Only">
        <p>
          {SITE_NAME} is provided for entertainment and casual puzzle-solving. The Site is not intended to provide professional, medical, legal, educational, psychological, or financial advice.
        </p>
      </Section>

      <Section title="Brain Training and Skill Claims">
        <p>
          The Site may describe puzzles as brain teasers, logic puzzles, or brain-training activities. These phrases are general descriptions of the gameplay experience. We do not guarantee that playing the game will improve memory, intelligence, academic performance, health, or cognitive ability.
        </p>
      </Section>

      <Section title="Puzzle Accuracy">
        <p>
          We work to keep puzzles playable, accurate, and fair. However, bugs, display issues, typo-like puzzle errors, or device-specific problems may occur. If you notice an issue, please report it through the contact method listed on the Site.
        </p>
      </Section>

      <Section title="No Warranties">
        <p>
          The Site is provided "as is" without warranties of any kind. We do not guarantee that the Site will be uninterrupted, error-free, secure, or available on every browser, device, or network.
        </p>
      </Section>

      <Section title="External Links and Ads">
        <p>
          The Site may display ads or link to third-party websites. We do not control and are not responsible for third-party content, claims, offers, downloads, products, services, policies, or security practices.
        </p>
      </Section>

      <Section title="Use at Your Own Risk">
        <p>
          Your use of {SITE_NAME} is at your own risk. If you do not agree with this Disclaimer, the Privacy Policy, or the Terms of Use, please stop using the Site.
        </p>
      </Section>
    </>
  );
}

export default function LegalPage({ type, onBack, onNavigate }: LegalPageProps) {
  if (type === "privacy") {
    return (
      <LegalShell title="Privacy Policy" onBack={onBack} onNavigate={onNavigate}>
        <PrivacyPolicy />
      </LegalShell>
    );
  }

  if (type === "terms") {
    return (
      <LegalShell title="Terms of Use" onBack={onBack} onNavigate={onNavigate}>
        <TermsOfUse />
      </LegalShell>
    );
  }

  return (
    <LegalShell title="Disclaimer" onBack={onBack} onNavigate={onNavigate}>
      <Disclaimer />
    </LegalShell>
  );
}
