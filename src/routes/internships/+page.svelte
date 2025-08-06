<script>
	import TimelineComponent from '$lib/components/TimelineComponent.svelte';
	import SkillsCloud from '$lib/components/SkillsCloud.svelte';

	// Experience data using Svelte 5 runes
	let experiences = $state([
		{
			company: 'Deloitte',
			position: 'Technology Consulting Intern',
			startDate: '2024-06-01',
			endDate: '2024-08-15',
			current: false,
			description: 'Led digital transformation initiatives for Fortune 500 clients, focusing on enterprise software solutions and process automation.',
			skills: ['React', 'Node.js', 'AWS', 'Agile', 'Client Relations'],
			achievements: [
				'Developed automated reporting dashboard that reduced manual work by 60%',
				'Led client presentations to C-suite executives',
				'Implemented CI/CD pipeline improving deployment efficiency by 40%'
			],
			projects: [
				'Enterprise Resource Planning (ERP) system modernization',
				'Cloud migration strategy for retail client',
				'Business process automation suite'
			]
		},
		{
			company: 'Black Pearl Global Investments',
			position: 'Data Analysis & Investment Research Intern',
			startDate: '2023-06-01',
			endDate: '2023-08-15',
			current: false,
			description: 'Conducted quantitative analysis of investment portfolios and developed algorithmic trading models for emerging markets.',
			skills: ['Python', 'SQL', 'Tableau', 'Financial Modeling', 'Statistical Analysis'],
			achievements: [
				'Built predictive model with 85% accuracy for market trend analysis',
				'Streamlined data collection process reducing analysis time by 50%',
				'Created comprehensive market research reports for investment committee'
			],
			projects: [
				'Emerging markets risk assessment framework',
				'Automated portfolio rebalancing algorithm',
				'ESG investment scoring system'
			]
		},
		{
			company: 'TCS (Tata Consultancy Services)',
			position: 'Full-Stack Development Intern',
			startDate: '2022-06-01',
			endDate: '2022-08-15',
			current: false,
			description: 'Developed end-to-end web applications using modern frameworks and collaborated with cross-functional teams on enterprise solutions.',
			skills: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'REST APIs'],
			achievements: [
				'Delivered customer portal used by 10,000+ users',
				'Optimized database queries improving response time by 30%',
				'Received "Outstanding Intern" recognition'
			],
			projects: [
				'Customer relationship management system',
				'Inventory management dashboard',
				'Employee onboarding automation platform'
			]
		}
	]);

	// Technical skills data
	let technicalSkills = $state([
		// Frontend
		{ name: 'React', level: 'expert', category: 'frontend', years: 3 },
		{ name: 'Svelte', level: 'advanced', category: 'frontend', years: 2 },
		{ name: 'TypeScript', level: 'advanced', category: 'frontend', years: 2 },
		{ name: 'Tailwind CSS', level: 'expert', category: 'frontend', years: 2 },
		{ name: 'Angular', level: 'intermediate', category: 'frontend', years: 1 },
		
		// Backend
		{ name: 'Node.js', level: 'expert', category: 'backend', years: 3 },
		{ name: 'Python', level: 'expert', category: 'backend', years: 4 },
		{ name: 'Java', level: 'advanced', category: 'backend', years: 2 },
		{ name: 'SQL', level: 'advanced', category: 'backend', years: 3 },
		{ name: 'MongoDB', level: 'intermediate', category: 'backend', years: 2 },
		
		// Cloud & Tools
		{ name: 'AWS', level: 'advanced', category: 'cloud', years: 2 },
		{ name: 'Docker', level: 'intermediate', category: 'cloud', years: 1 },
		{ name: 'Git', level: 'expert', category: 'tools', years: 4 },
		{ name: 'Figma', level: 'advanced', category: 'tools', years: 2 }
	]);
</script>

<!-- Content Area -->
<div class="w-full max-w-[900px] space-y-12">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">
			Internships
		</h1>
		<p class="font-condensed mb-12 text-[24px] leading-relaxed text-black">
			My professional journey through internships at leading companies, gaining experience in
			tech consulting, data analysis, and full-stack development.
		</p>
	</div>
			<!-- Timeline Component -->
			<TimelineComponent 
				{experiences}
				title="Professional Experience"
			/>
			
			<!-- Skills Section -->
			<div class="mt-16">
				<SkillsCloud 
					skills={technicalSkills}
					title="Technical Skills"
					animated={true}
				/>
			</div>
</div>

<style>
	/* Use Roboto Condensed as Arial Narrow substitute */
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
</style>
