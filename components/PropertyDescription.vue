<template>
    <div class="app-background-grey">
        <div class="app-wrapper">
            <div class="app-double-column">
                <div class="app-padded-vertical">
                    <div class="app-subtitle">Description</div>
                    <div class="app-description">{{ home.description }}</div>
                </div>
                <div class="app-padded-vertical">
                    <div
                        v-for="(feature, k) of home.features"
                        :key="k"
                        class="app-tag"
                    >
                        {{ feature }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PropertyDescription",
    props: {
        home: {
            type: Object,
            required: true,
        },
    },
};
</script>
