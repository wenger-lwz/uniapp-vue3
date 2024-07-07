<template>
  <!-- PC端 -->
  <section class="w-full" v-if="datas?.settings?.announcement?.blocks">
    <!-- {{ datas.settings.announcement.settings }} -->
    <div class="w-100% hidden md:block" v-if="datas.settings.announcement.settings.show">
      <div v-if="datas.settings.announcement.settings.pc_display == 'block'">
        <div class="w-full mb-1 block" :id="item.id" v-for="(item, index) in list" :key="index">
          <nuxt-link
            :to="item.settings.link"
            :class="item.settings.disable ? 'flex-center' : 'hidden'"
            :style="`height: 100%;width: 100%;text-align:${item.settings.align};background-color:${item.settings.color}`"
          >
            <n-ellipsis
              :line-clamp="1"
              :style="`width: 100%;line-height: 50px;height: 50px;text-align:${item.settings.align};background-color:${item.settings.color}`"
            >
              {{ item.settings.title }}
            </n-ellipsis>
          </nuxt-link>
        </div>
      </div>

      <div
        v-else-if="datas.settings.announcement.settings.pc_display == 'flex'"
        class="w-full flex-wrap flex gap-2 justify-between"
      >
        <div class="sm:w-49.5% w-full" :id="item.id" v-for="(item, index) in list" :key="index">
          <nuxt-link
            :to="item.settings.link"
            :class="item.settings.disable ? 'flex-center' : 'hidden'"
            :style="`width: 100%;height: 100%;text-align:${item.settings.align};background-color:${item.settings.color}`"
          >
            <n-ellipsis
              :line-clamp="1"
              :style="`width: 100%;line-height: 50px;height: 50px;text-align:${item.settings.align};background-color:${item.settings.color}`"
            >
              {{ item.settings.title }}
            </n-ellipsis>
          </nuxt-link>
        </div>
      </div>
      <div
        v-else-if="datas.settings.announcement.settings.show && datas.settings.announcement.blocks.length"
        class="h-50px line-height-400% w-full"
      >
        <n-carousel
          class="w-full"
          :interval="2000"
          centered-slides
          :direction="datas.settings.announcement.settings.pc_display"
          autoplay
          :show-dots="false"
        >
          <n-carousel-item
            :id="item.id"
            :class="item.settings.disable ? 'block' : 'hidden'"
            v-for="(item, index) in list"
            :key="index"
          >
            <nuxt-link
              :to="item.settings.link"
              class="w-full block"
              :style="`width: 100%;line-height: 50px;height: 50px;text-align:${item.settings.align};background-color:${item.settings.color}`"
            >
              {{ item.settings.title }}
            </nuxt-link>
          </n-carousel-item>
        </n-carousel>
      </div>
    </div>
    <!-- 移动端 -->
    <div class="w-100% block md:hidden" v-if="datas.settings.announcement.settings.show">
      <div v-if="datas.settings.announcement.settings.mob_display == 'block'">
        <div class="w-full mb-1 block" :id="item.id" v-for="(item, index) in list" :key="index">
          <nuxt-link
            :to="item.settings.link"
            :class="item.settings.disable ? 'block' : 'hidden'"
            :style="`width: 100%;height: 100%;text-align:${item.settings.align};background-color:${item.settings.color}`"
          >
            <n-ellipsis
              :line-clamp="1"
              :style="`line-height: 50px;width: 100%;height:50px;text-align:${item.settings.align};background-color:${item.settings.color}`"
            >
              {{ item.settings.title }}
            </n-ellipsis>
          </nuxt-link>
        </div>
      </div>

      <div
        v-else-if="datas.settings.announcement.settings.mob_display == 'flex'"
        class="w-full flex-wrap flex gap-2 justify-between"
      >
        <div class="sm:w-49.5% w-full" :id="item.id" v-for="(item, index) in list" :key="index">
          <nuxt-link
            :to="item.settings.link"
            :class="item.settings.disable ? 'block' : 'hidden'"
            :style="`width: 100%;height: 100%;text-align:${item.settings.align};background-color:${item.settings.color}`"
          >
            <n-ellipsis
              :line-clamp="1"
              :style="`line-height: 50px;width: 100%;height:50px;text-align:${item.settings.align};background-color:${item.settings.color}`"
            >
              {{ item.settings.title }}
            </n-ellipsis>
          </nuxt-link>
        </div>
      </div>
      <div
        v-else-if="datas.settings.announcement.settings.show && datas.settings.announcement.blocks.length"
        class="h-50px line-height-400% w-full"
      >
        <n-carousel
          class="w-full"
          :interval="2000"
          centered-slides
          :direction="datas.settings.announcement.settings.mob_display"
          autoplay
          :show-dots="false"
        >
          <n-carousel-item
            :id="item.id"
            :class="item.settings.disable ? 'block' : 'hidden'"
            v-for="(item, index) in list"
            :key="index"
          >
            <nuxt-link
              :to="item.settings.link"
              class="w-full block"
              :style="`width: 100%;line-height: 50px;height: 50px;text-align:${item.settings.align};background-color:${item.settings.color}`"
            >
              {{ item.settings.title }}
            </nuxt-link>
          </n-carousel-item>
        </n-carousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AnnouncementSection',
})
const props = defineProps<{
  datas?: any
}>()
const list = computed(() => {
  if (props.datas?.settings.announcement?.blocks) {
    return props.datas?.settings.announcement.blocks.filter((i: any) => i.settings.show)
  }
})

//跳转公告详情
const toDetail = (link: string) => {
  if (!link) return
  window.location.href = link
}
</script>
