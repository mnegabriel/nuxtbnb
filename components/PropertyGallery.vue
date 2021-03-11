<template>
    <div class="app-section">
        <div class="app-wrapper">
            <div class="app-masonry">
                <div 
                    v-for="image of images"
                    :key="image"
                    :style="`background-image: url('${image}');`"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PropertyGallery",
    props: {
        images: {
            type: Array,
            required: true,
        },
    },
};
</script>