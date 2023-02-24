<script lang="ts">
	import Add from './graphics/add.svelte';
	import Minus from './graphics/minus.svelte';

	export let paddingX;
	export let paddingY;
	let paddingActive;

	$: {
		if (!paddingActive) {
			paddingX = 0;
			paddingY = 0;
		}
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex justify-between pr-4">
		<div>padding</div>
		<input type="checkbox" on:change={(e) => (paddingActive = e.currentTarget.checked)} />
	</div>
	{#if paddingActive}
		<div class="flex flex-row justify-center align-center text-s">
			<div
				on:click={() => (paddingX > 1 ? (paddingX = paddingX - 1) : (paddingX = 0))}
				class="flex flex-row justify-center align-center mr-4"
				role="button"
			>
				<Minus />
			</div>
			<dix>x({paddingX})</dix>
			<div
				on:click={() => (paddingX = paddingX + 1)}
				class="flex flex-row justify-center align-center ml-4"
				role="button"
			>
				<Add />
			</div>
		</div>
		<div class="flex flex-row justify-center align-center text-s w-full">
			<div
				on:click={() => (paddingY > 1 ? (paddingY = paddingY - 1) : (paddingY = 0))}
				class="flex flex-row justify-start align-center mr-4"
				role="button"
			>
				<Minus />
			</div>
			<dix>y({paddingY})</dix>
			<div
				on:click={() => (paddingY = paddingY + 1)}
				class="flex flex-row justify-end align-center ml-4"
				role="button"
			>
				<Add />
			</div>
		</div>
	{/if}
</div>
