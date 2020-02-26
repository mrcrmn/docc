<template>
    <div class="py-2">
        <div class="container">
            <div class="-mx-4 flex justify-between items-center">
                <div class="px-4">
                    <g-link
                        to="/"
                        class="font-black italic uppercase tracking-snug text-xl text-primary"
                    >{{ $static.metadata.siteName }}</g-link>
                </div>
                <div class="px-4 w-full max-w-screen-md">
                    <Search />
                </div>
                <div class="px-4 flex justify-end items-center">
                    <ToggleDarkMode>
                        <template slot="default" slot-scope="{ dark }">
                            <MoonIcon v-if="dark" size="1.75x" />
                            <SunIcon v-else size="1.75x" />
                        </template>
                    </ToggleDarkMode>
                </div>
            </div>
        </div>
    </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Search from "@/components/Search";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import { SunIcon, MoonIcon } from "vue-feather-icons";

export default {
    components: {
        Search,
        ToggleDarkMode,
        SunIcon,
        MoonIcon
    }
};
</script>

<style>
</style>