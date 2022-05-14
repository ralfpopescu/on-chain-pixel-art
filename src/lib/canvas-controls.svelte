<script lang="ts">
	export let names: string[];
	export let activeCanvas: number;
	let editMode;
	let editName;

	$: name = names[activeCanvas];
</script>

<div class="flex flex-row">
	{#if editMode}
		<input
			bind:value={editName}
			on:blur={() => {
				names[activeCanvas] = editName;
				editMode = false;
			}}
		/>
	{:else}
		<div
			class="cursor-text"
			on:click={() => {
				editMode = true;
				editName = name;
			}}
		>
			{name}
		</div>
	{/if}
</div>
