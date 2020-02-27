<template>
  <Layout>
    <div class="pt-8 md:pt-16">
      <div class="flex flex-col items-center">
        <div class="text-primary flex flex-col items-center mb-2">
          <Logo :width="80" />
          <h2 class="text-3xl text-6xl tracking-tighter font-black border-none">
            DOCC
          </h2>
        </div>
        <h1 class="text-4xl lg:text-5xl text-center">
          Great Documentation starts here.
        </h1>
        <p class="font-medium text-xl text-center">
          Perfect Lighthouse score out of the box. Easy to set-up. Dark mode included.
          <br>
          <strong class="text-primary">Got a minute?</strong>
        </p>

        <div class="py-4">
          <code class="bg-borderColor text-typo block px-4 py-1 select-all">gridsome create your-project https://github.com/mrcrmn/docc</code>
        </div>

        <div class="flex justify-center mt-8">
          <g-link
            to="/docs/"
            class="flex items-center ml-auto text-2xl text-white bg-primary leading-none font-bold px-6 py-4 border border-primary rounded-lg shadow-lg transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
          >
            Get started
            <ArrowRightCircleIcon class="ml-4" size="1x" />
          </g-link>
        </div>

        <div class="mt-8 text-center">
          Open Source. MIT License. <span class="border-b border-dashed border-primary text-primary">Make it your own</span>.
        </div>

      </div>

      <div class="mt-8 md:mt-16 pt-8 md:pt-16 border-top border-t border-borderColor mx-auto max-w-screen-sm"></div>

      <div class="flex justify-center flex-wrap -mx-4">
        <div class="flex flex-col items-center w-full md:w-1/3 text-center px-4 mb-8">
          <ZapIcon size="3x" class="text-primary mb-6" />
          <h3 class="text-primary uppercase font-bold tracking-wide">
            Incredibly Fast
          </h3>
          <p class="text-lg">
            Powered by Gridsome. Built on Vue. Outputs static files. It wont't get any faster than this. <span class="border-b border-dashed border-primary text-primary">No seriously</span>.
          </p>
        </div>

        <div class="flex flex-col items-center w-full md:w-1/3 text-center px-4 mb-8">
          <SearchIcon size="3x" class="text-primary mb-6" />
          <h3 class="text-primary uppercase font-bold tracking-wide">
            Instant Search
          </h3>
          <p class="text-lg">
            All headlines are indexed. Instant search powered by Fuse.js. Find what you are looking for in the <span class="border-b border-dashed border-primary text-primary">blink of an eye</span>.
          </p>
        </div>

        <div class="flex flex-col items-center w-full md:w-1/3 text-center px-4 mb-8">
          <MoonIcon size="3x" class="text-primary mb-6" />
          <h3 class="text-primary uppercase font-bold tracking-wide">
            Lights out
          </h3>
          <p class="text-lg">
            Working late at night again? Enable dark mode with the click of a button.
          </p>
        </div>
      </div>

    </div>
  </Layout>
</template>

<script>
import Logo from '@/components/Logo';
import { ArrowRightCircleIcon, ZapIcon, CodeIcon, MoonIcon, SearchIcon } from 'vue-feather-icons';

export default {
  components: {
    Logo,
    ArrowRightCircleIcon,
    ZapIcon,
    CodeIcon,
    MoonIcon,
    SearchIcon
  },

  metaInfo: {
    title: 'Great Documentation starts here',
    meta: [
      { name: 'description', content: 'DOCC is a starter theme with instant search and dark mode for writing great technical documentation. Based on Gridsome!' }
    ]
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
