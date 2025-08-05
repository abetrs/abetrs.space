<!-- TopBar component - reusable across pages -->

<div class="bg-gray-50 w-full h-[100px] rounded-[5px] sticky top-0 z-50 px-4 pt-4">
	<!-- Left side - Name in Arial Narrow Italics -->
	<div class="absolute left-8 top-1/2 transform -translate-y-1/2">
		<h1 class="text-[68px] text-black italic font-condensed" style="letter-spacing: -6%;">
			Abhayprad Jha
		</h1>
	</div>
	
	<!-- Right side - Barcode -->
	<div class="absolute right-8 top-1/2 transform -translate-y-1/2">
		<div class="text-[52px] text-black text-center font-barcode">
			Abhayprad Jha
		</div>
	</div>
</div>

<style>
	/* Import barcode font */
	@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap');
	
	/* Use Roboto Condensed as Arial Narrow substitute */
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
	
	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
	
	.font-barcode {
		font-family: 'Libre Barcode 128', monospace;
	}
</style>
