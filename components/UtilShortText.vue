<template>
    <span>
        {{ displayText }}
        <button v-if="isTooLong" @click="toggleExpansion" class="shorten-text" :class="{ expanded: isExpanded }">
            {{ isTooLong && isExpanded ? 'Read less' : 'Read more'}}
        </button>
    </span>
</template>

<script>
export default {
    name: 'UtilShortText',
    props: {
        text: {
            type: String,
            required: true
        },
        target: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isExpanded: false,
            chunks: []
        }
    },
    computed: {
        isTooLong() {
            return this.chunks.length === 2
        },
        displayText() {
            return !this.isTooLong || this.isExpanded
                ? this.chunks.join(' ')
                : this.chunks[0] + '...'
        }
    },
    created() {
        this.chunks = this.getChunks()
    },
    methods: {
        getChunks() {
            const position = this.text.indexOf(' ', this.target)
            return this.text.length <= this.target || position === -1
                ? [this.text]
                : [this.text.substring(0, position), this.text.substring(position)]
        },
        toggleExpansion() {
            this.isExpanded = !this.isExpanded
        }
    }
}
</script>

<style scoped>
.shorten-text {
    border: none;
    opacity: .8;
    outline: none;

    background: -webkit-linear-gradient(transparent 90%, var(--col-main-dark, #4db161) 90%);  
    background: -moz-linear-gradient(transparent 90%, var(--col-main-dark, #4db161) 90%);  
    background: -o-linear-gradient(transparent 90%, var(--col-main-dark, #4db161) 90%);  
    background: linear-gradient(transparent 90%, var(--col-main-dark, #4db161) 90%);  
  
    -webkit-transition: background 1s ease-out;  
    -moz-transition: background 1s ease-out;  
    -o-transition: background 1s ease-out;  
    transition: background 1s ease-out;  
}

.shorten-text:hover {

    background: -webkit-linear-gradient( transparent 0%, var(--col-main-dark, #4db161) 0%);  
    background: -moz-linear-gradient( transparent 0%, var(--col-main-dark, #4db161) 0%);  
    background: -o-linear-gradient( transparent 0%, var(--col-main-dark, #4db161) 0%);  
    background: linear-gradient( transparent 0%, var(--col-main-dark, #4db161) 0%);  
    
    opacity: 1;
}

.shorten-text.expanded {

    background: -webkit-linear-gradient( transparent 0%, var(--col-main-light, #aff5bd) 0%);  
    background: -moz-linear-gradient( transparent 0%, var(--col-main-light, #aff5bd) 0%);  
    background: -o-linear-gradient( transparent 0%, var(--col-main-light, #aff5bd) 0%);  
    background: linear-gradient( transparent 0%, var(--col-main-light, #aff5bd) 0%);  
}
.shorten-text.expanded:hover {

    background: -webkit-linear-gradient(transparent 90%, var(--col-main-light, #aff5bd) 90%);  
    background: -moz-linear-gradient(transparent 90%, var(--col-main-light, #aff5bd) 90%);  
    background: -o-linear-gradient(transparent 90%, var(--col-main-light, #aff5bd) 90%);  
    background: linear-gradient(transparent 90%, var(--col-main-light, #aff5bd) 90%);  
}
</style>