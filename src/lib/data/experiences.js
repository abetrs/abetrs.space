import wmLogo from '$lib/assets/photos/College/WilliamandMary.jpg';
import bpLogo from '$lib/assets/photos/Internships/black_pearl_global_investments_logo-3394222977.jpeg';
import deloitteLogo from '$lib/assets/photos/Internships/us-deloitte-logo-707218455.jpg';
import tcsLogo from '$lib/assets/photos/Internships/TCS-Logo-Tata-consultancy-service-3916172614.png';
import flatHatLogo from '$lib/assets/photos/Internships/flat_hat_logo.png';

export const experiences = [
	{
		id: 'flathat',
		company: 'The Flat Hat',
		logo: flatHatLogo,
		position: 'Data Editor',
		period: '2022 – 2026',
		description:
			"Founded and scaled the Data section of William & Mary's student newspaper from inception, establishing editorial processes and growing output to 20+ published articles annually.",
		storyHref: '/projects/flat-hat',
		bullets: [
			'Founded and scaled the Data section from inception, establishing editorial processes and growing output to 20+ published articles annually through strategic planning and team coordination',
			"Managed cross-functional teams of 5+ writers and collaborated with editorial staff to produce the section's inaugural full-page feature, subsequently expanding to 2 full pages per semester",
			'Developed and implemented data visualization frameworks for Sports and News sections, streamlining inter-sectional collaboration and enhancing analytical storytelling across publications',
			'Award: Region 2 Mark of Excellence Finalist for data journalism, awarded by The Society of Professional Journalists'
		]
	},
	{
		id: 'tcs',
		company: 'TCS',
		logo: tcsLogo,
		position: 'UX Design Intern',
		period: 'May – Aug 2024',
		description:
			'Led end-to-end UX design for a lithium-ion battery supply chain solution, conducting user research and developing a design system for enterprise IT.',
		storyHref: '/projects/tcs-ux',
		bullets: [
			'Conducted user and market research on the lithium-ion battery supply chain to define problem statements',
			'Led end-to-end design; documented design-system components that cut time-to-spec by 25%',
			'Turned supply-chain interviews into a Figma prototype with compliance acceptance criteria, enabling CTO sign-off',
			'Authored and presented a white paper on design rationale, successfully advocating for the solution to the CTO',
			'Reduced rework by 30% in early engineering cycles through improved design handoff'
		]
	},
	{
		id: 'deloitte',
		company: 'Deloitte',
		logo: deloitteLogo,
		position: 'Intern',
		period: 'Jan 2025',
		description:
			'Converted market research into actionable product strategies, focusing on post-pandemic demand signals and stakeholder alignment for new product opportunities.',
		storyHref: null,
		bullets: [
			'Converted post-pandemic demand signals into 3 product opportunity briefs with must-test assumptions',
			'Secured stakeholder alignment in one workshop and green-lighted pilots',
			'Translated research findings into actionable product strategies for SMEs and industry leaders',
			'Standardized the decision pack (market sizing, comps, risks), reducing review cycles across SME groups'
		]
	},
	{
		id: 'bp',
		company: 'Black Pearl Global',
		logo: bpLogo,
		position: 'Venture Capital Intern',
		period: 'Jun – Aug 2025',
		description:
			'Scaled deal flow and shaped investment strategy for a VC firm, focusing on integrating AI into the VC lifecycle and developing strategic partnerships.',
		storyHref: '/projects/black-pearl',
		bullets: [
			'Scaled up deal flow by sourcing a network of 15+ strategic ecosystem partners and 30+ prospective limited partners',
			"Authored the firm's strategic roadmap for integrating Generative and Agentic AI into the VC lifecycle",
			'Engineered a proof-of-concept LLM-based tool to automate due diligence, reducing initial screening time by an estimated 40%',
			'Co-authored a $10M fund thesis with explicit entry & kill signals, shortening IC prep by 25% and improving go/no-go clarity'
		]
	},
	{
		id: 'wm',
		company: 'William & Mary',
		logo: wmLogo,
		position: 'Research Assistant, Software Bill of Materials Tooling',
		period: 'Aug 2025 – May 2026',
		description:
			'A research paper comparing 15+ tools that generate a Software Bill of Materials, the dependency inventory that says what third-party code ships inside a piece of software. Tested across Python, JavaScript, Java and Go for how accurately and completely each tool identifies what is actually in there.',
		storyHref: null,
		bullets: [
			'Built automated frameworks to test each tool across enterprise repositories, identifying coverage gaps and documenting what metadata each one captures.'
		]
	}
];
