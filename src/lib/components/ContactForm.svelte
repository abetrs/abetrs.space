<script>
	import { scale, fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Props using Svelte 5 destructuring
	let { 
		title = "Get in Touch",
		showSocialLinks = true 
	} = $props();

	// Svelte 5 reactive state for form management
	let formData = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	let formState = $state({
		isSubmitting: false,
		isSubmitted: false,
		errors: {},
		touchedFields: new Set()
	});

	let isVisible = $state(false);
	let containerRef = $state(null);

	// Derived validations using $derived
	let validations = $derived(() => {
		const errors = {};
		
		if (formState.touchedFields.has('name') && !formData.name.trim()) {
			errors.name = 'Name is required';
		}
		
		if (formState.touchedFields.has('email')) {
			if (!formData.email.trim()) {
				errors.email = 'Email is required';
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
				errors.email = 'Please enter a valid email address';
			}
		}
		
		if (formState.touchedFields.has('subject') && !formData.subject.trim()) {
			errors.subject = 'Subject is required';
		}
		
		if (formState.touchedFields.has('message') && formData.message.trim().length < 10) {
			errors.message = 'Message must be at least 10 characters long';
		}
		
		return errors;
	});

	let isFormValid = $derived(() => {
		return formData.name.trim() && 
			   formData.email.trim() && 
			   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
			   formData.subject.trim() && 
			   formData.message.trim().length >= 10;
	});

	let characterCount = $derived(() => formData.message.length);
	let characterCountColor = $derived(() => {
		if (characterCount < 10) return 'text-red-500';
		if (characterCount < 50) return 'text-yellow-500';
		return 'text-green-500';
	});

	// Effect for intersection observer
	$effect(() => {
		if (containerRef && typeof window !== 'undefined') {
			const observer = new IntersectionObserver(
				([entry]) => {
					isVisible = entry.isIntersecting;
				},
				{ threshold: 0.2 }
			);

			observer.observe(containerRef);
			return () => observer.disconnect();
		}
	});

	function handleFieldBlur(fieldName) {
		formState.touchedFields.add(fieldName);
		formState.errors = validations;
	}

	function handleInput(fieldName, value) {
		formData[fieldName] = value;
		if (formState.touchedFields.has(fieldName)) {
			formState.errors = validations;
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		
		// Mark all fields as touched
		formState.touchedFields = new Set(['name', 'email', 'subject', 'message']);
		formState.errors = validations;

		if (!isFormValid) return;

		formState.isSubmitting = true;

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// Reset form on success
			formData = { name: '', email: '', subject: '', message: '' };
			formState.touchedFields = new Set();
			formState.errors = {};
			formState.isSubmitted = true;
			
			// Reset success message after 5 seconds
			setTimeout(() => {
				formState.isSubmitted = false;
			}, 5000);

		} catch (error) {
			formState.errors.submit = 'Failed to send message. Please try again.';
		} finally {
			formState.isSubmitting = false;
		}
	}

	const socialLinks = [
		{ 
			name: 'LinkedIn', 
			url: 'https://linkedin.com/in/abhaypradjha', 
			icon: '💼'
		},
		{ 
			name: 'GitHub', 
			url: 'https://github.com/abetrs', 
			icon: '💻'
		},
		{ 
			name: 'Email', 
			url: 'mailto:ajha01@wm.edu', 
			icon: '📧'
		},
		{ 
			name: 'Blog', 
			url: 'https://substack.com/@abhaypradjha', 
			icon: '📝'
		}
	];
</script>

<div bind:this={containerRef} class="w-full">
	{#if isVisible}
		<div class="max-w-2xl mx-auto" transition:fly={{ y: 50, duration: 600, easing: quintOut }}>
			<h3 class="text-[32px] font-bold text-black mb-8 tracking-[-1.5px] font-condensed text-center">
				{title}
			</h3>

			{#if formState.isSubmitted}
				<div 
					class="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-lg"
					transition:scale={{ duration: 500, easing: quintOut }}
				>
					<div class="flex items-center">
						<span class="text-2xl mr-3">✅</span>
						<div>
							<h4 class="text-green-800 font-semibold font-condensed">Message Sent Successfully!</h4>
							<p class="text-green-700 font-condensed">Thank you for reaching out. I'll get back to you soon.</p>
						</div>
					</div>
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="space-y-6" novalidate>
					<!-- Name Field -->
					<div transition:fly={{ x: -30, delay: 200, duration: 500 }}>
						<label for="name" class="block text-sm font-medium text-gray-700 mb-2 font-condensed">
							Name <span class="text-red-500">*</span>
						</label>
						<input
							id="name"
							type="text"
							bind:value={formData.name}
							oninput={(e) => handleInput('name', e.target.value)}
							onblur={() => handleFieldBlur('name')}
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 font-condensed
								{formState.errors.name ? 'border-red-500 ring-2 ring-red-200' : ''}"
							placeholder="Your full name"
							disabled={formState.isSubmitting}
						/>
						{#if formState.errors.name}
							<p class="mt-1 text-sm text-red-600 font-condensed" transition:fade={{ duration: 200 }}>
								{formState.errors.name}
							</p>
						{/if}
					</div>

					<!-- Email Field -->
					<div transition:fly={{ x: -30, delay: 300, duration: 500 }}>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-2 font-condensed">
							Email <span class="text-red-500">*</span>
						</label>
						<input
							id="email"
							type="email"
							bind:value={formData.email}
							oninput={(e) => handleInput('email', e.target.value)}
							onblur={() => handleFieldBlur('email')}
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 font-condensed
								{formState.errors.email ? 'border-red-500 ring-2 ring-red-200' : ''}"
							placeholder="your.email@example.com"
							disabled={formState.isSubmitting}
						/>
						{#if formState.errors.email}
							<p class="mt-1 text-sm text-red-600 font-condensed" transition:fade={{ duration: 200 }}>
								{formState.errors.email}
							</p>
						{/if}
					</div>

					<!-- Subject Field -->
					<div transition:fly={{ x: -30, delay: 400, duration: 500 }}>
						<label for="subject" class="block text-sm font-medium text-gray-700 mb-2 font-condensed">
							Subject <span class="text-red-500">*</span>
						</label>
						<input
							id="subject"
							type="text"
							bind:value={formData.subject}
							oninput={(e) => handleInput('subject', e.target.value)}
							onblur={() => handleFieldBlur('subject')}
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 font-condensed
								{formState.errors.subject ? 'border-red-500 ring-2 ring-red-200' : ''}"
							placeholder="What's this about?"
							disabled={formState.isSubmitting}
						/>
						{#if formState.errors.subject}
							<p class="mt-1 text-sm text-red-600 font-condensed" transition:fade={{ duration: 200 }}>
								{formState.errors.subject}
							</p>
						{/if}
					</div>

					<!-- Message Field -->
					<div transition:fly={{ x: -30, delay: 500, duration: 500 }}>
						<label for="message" class="block text-sm font-medium text-gray-700 mb-2 font-condensed">
							Message <span class="text-red-500">*</span>
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							oninput={(e) => handleInput('message', e.target.value)}
							onblur={() => handleFieldBlur('message')}
							rows="5"
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 font-condensed resize-vertical
								{formState.errors.message ? 'border-red-500 ring-2 ring-red-200' : ''}"
							placeholder="Tell me about your project, question, or just say hello..."
							disabled={formState.isSubmitting}
						></textarea>
						<div class="flex justify-between mt-1">
							{#if formState.errors.message}
								<p class="text-sm text-red-600 font-condensed" transition:fade={{ duration: 200 }}>
									{formState.errors.message}
								</p>
							{:else}
								<div></div>
							{/if}
							<p class="text-sm {characterCountColor} font-mono">
								{characterCount} characters
							</p>
						</div>
					</div>

					<!-- Submit Button -->
					<div transition:fly={{ y: 30, delay: 600, duration: 500 }}>
						<button
							type="submit"
							disabled={!isFormValid || formState.isSubmitting}
							class="w-full bg-black text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 font-condensed
								{isFormValid && !formState.isSubmitting 
									? 'hover:bg-gray-800 transform hover:-translate-y-1 hover:shadow-lg' 
									: 'opacity-50 cursor-not-allowed'}"
						>
							{#if formState.isSubmitting}
								<span class="flex items-center justify-center">
									<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Sending Message...
								</span>
							{:else}
								Send Message →
							{/if}
						</button>
					</div>

					{#if formState.errors.submit}
						<p class="text-red-600 text-center font-condensed" transition:fade={{ duration: 200 }}>
							{formState.errors.submit}
						</p>
					{/if}
				</form>
			{/if}

			{#if showSocialLinks}
				<div class="mt-12 text-center" transition:fly={{ y: 30, delay: 800, duration: 500 }}>
					<h4 class="text-lg font-semibold text-gray-800 mb-4 font-condensed">
						Or connect with me directly:
					</h4>
					<div class="flex justify-center gap-4">
						{#each socialLinks as link, index}
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 font-condensed text-sm hover:transform hover:-translate-y-1"
								transition:scale={{ delay: 900 + (index * 100), duration: 300 }}
							>
								<span>{link.icon}</span>
								{link.name}
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div class="h-[600px] w-full"></div>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
	
	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
	
	.font-mono {
		font-family: 'Roboto Mono', 'Courier New', monospace;
	}
</style>
