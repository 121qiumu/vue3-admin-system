<template>
  <div class="layout-settings-panel">
    <section class="layout-settings-panel__section">
      <div class="layout-settings-panel__section-header">
        <div class="layout-settings-panel__section-title">{{ t('layout.header.layoutMode') }}</div>
        <div class="layout-settings-panel__section-desc">
          {{ t('layout.header.layoutModeDesc') }}
        </div>
      </div>

      <div class="layout-settings-panel__option-grid">
        <button
          v-for="item in layoutModeOptions"
          :key="item.value"
          type="button"
          class="layout-settings-panel__option-card"
          :class="{ 'is-active': item.value === layoutMode }"
          :aria-pressed="item.value === layoutMode"
          @click="setLayoutMode(item.value)"
        >
          <div class="layout-settings-panel__option-title-row">
            <span class="layout-settings-panel__option-title">{{ item.label }}</span>
            <el-icon v-if="item.value === layoutMode" class="layout-settings-panel__option-check">
              <IconEpCheck />
            </el-icon>
          </div>
          <div class="layout-settings-panel__option-desc">{{ item.description }}</div>
        </button>
      </div>
    </section>

    <section class="layout-settings-panel__section">
      <div class="layout-settings-panel__section-header">
        <div class="layout-settings-panel__section-title">{{ t('layout.header.theme') }}</div>
        <div class="layout-settings-panel__section-desc">{{ t('layout.header.themeDesc') }}</div>
      </div>

      <div class="layout-settings-panel__option-grid layout-settings-panel__option-grid--theme">
        <button
          v-for="item in themeOptions"
          :key="item.value"
          type="button"
          class="layout-settings-panel__option-card layout-settings-panel__theme-card"
          :class="[
            `layout-settings-panel__theme-card--${item.value}`,
            { 'is-active': item.value === theme }
          ]"
          :aria-pressed="item.value === theme"
          @click="setTheme(item.value)"
        >
          <div class="layout-settings-panel__theme-preview">
            <span
              class="layout-settings-panel__theme-dot layout-settings-panel__theme-dot--primary"
            />
            <span
              class="layout-settings-panel__theme-dot layout-settings-panel__theme-dot--secondary"
            />
            <span
              class="layout-settings-panel__theme-dot layout-settings-panel__theme-dot--accent"
            />
          </div>

          <div class="layout-settings-panel__option-title-row">
            <span class="layout-settings-panel__option-title">{{ item.label }}</span>
            <el-icon v-if="item.value === theme" class="layout-settings-panel__option-check">
              <IconEpCheck />
            </el-icon>
          </div>
          <div class="layout-settings-panel__option-desc">{{ item.description }}</div>
        </button>
      </div>
    </section>

    <section class="layout-settings-panel__section">
      <div class="layout-settings-panel__section-header">
        <div class="layout-settings-panel__section-title">{{ t('layout.header.language') }}</div>
        <div class="layout-settings-panel__section-desc">
          {{ t('layout.header.languageDesc') }}
        </div>
      </div>

      <div class="layout-settings-panel__option-grid layout-settings-panel__option-grid--locale">
        <button
          v-for="item in localeOptions"
          :key="item.value"
          type="button"
          class="layout-settings-panel__option-card"
          :class="{ 'is-active': item.value === language }"
          :aria-pressed="item.value === language"
          @click="changeLocale(item.value)"
        >
          <div class="layout-settings-panel__option-title-row">
            <span class="layout-settings-panel__option-title">{{ item.label }}</span>
            <el-icon v-if="item.value === language" class="layout-settings-panel__option-check">
              <IconEpCheck />
            </el-icon>
          </div>
          <div class="layout-settings-panel__option-desc">{{ item.value }}</div>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { LAYOUT_MODE_OPTIONS } from '@/constants/layout'
import { useLayout } from '@/hooks/useLayout'
import { useLocale } from '@/hooks/useLocale'
import { useTheme } from '@/hooks/useTheme'
import { translate } from '@/locales/helper'

const { t } = useI18n()
const { layoutMode, setLayoutMode } = useLayout()
const { theme, themeOptions, setTheme } = useTheme()
const { language, localeOptions, changeLocale } = useLocale()

const layoutModeOptions = computed(() => {
  return LAYOUT_MODE_OPTIONS.map((item) => ({
    ...item,
    label: translate(item.labelKey, {}, item.fallbackLabel),
    description: translate(item.descriptionKey, {}, item.fallbackDescription)
  }))
})
</script>

<style scoped lang="less">
.layout-settings-panel {
  display: grid;
  gap: var(--app-space-lg);
}

.layout-settings-panel__section {
  display: grid;
  gap: var(--app-space-sm);
}

.layout-settings-panel__section-title {
  font-size: var(--app-font-size-base);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.layout-settings-panel__section-desc {
  margin-top: 4px;
  font-size: var(--app-font-size-small);
  line-height: 1.7;
  color: var(--app-color-text-secondary);
}

.layout-settings-panel__option-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--app-space-sm);
}

.layout-settings-panel__option-grid--theme {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.layout-settings-panel__option-grid--locale {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.layout-settings-panel__option-card {
  display: grid;
  gap: var(--app-space-xs);
  padding: var(--app-space-sm);
  color: inherit;
  text-align: left;
  background-color: var(--app-color-bg-page);
  border: var(--app-border-width) solid var(--app-color-border-light);
  border-radius: var(--app-radius-large);
  cursor: pointer;
  transition:
    border-color var(--app-transition-duration) var(--app-transition-timing),
    background-color var(--app-transition-duration) var(--app-transition-timing),
    box-shadow var(--app-transition-duration) var(--app-transition-timing),
    transform var(--app-transition-duration) var(--app-transition-timing);
}

.layout-settings-panel__option-card:hover {
  border-color: color-mix(in srgb, var(--app-color-primary) 50%, var(--app-color-border-light));
  box-shadow: var(--app-shadow-sm);
  transform: translateY(-1px);
}

.layout-settings-panel__option-card.is-active {
  background-color: color-mix(in srgb, var(--app-color-primary) 10%, var(--app-color-bg-container));
  border-color: var(--app-color-primary);
}

.layout-settings-panel__option-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-xs);
}

.layout-settings-panel__option-title {
  font-size: var(--app-font-size-small);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.layout-settings-panel__option-check {
  color: var(--app-color-primary);
}

.layout-settings-panel__option-desc {
  font-size: var(--app-font-size-extra-small);
  line-height: 1.7;
  color: var(--app-color-text-secondary);
}

.layout-settings-panel__theme-card {
  position: relative;
}

.layout-settings-panel__theme-preview {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 18px;
}

.layout-settings-panel__theme-dot {
  display: inline-flex;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.layout-settings-panel__theme-card--default .layout-settings-panel__theme-dot--primary {
  background-color: #409eff;
}

.layout-settings-panel__theme-card--default .layout-settings-panel__theme-dot--secondary {
  background-color: #67c23a;
}

.layout-settings-panel__theme-card--default .layout-settings-panel__theme-dot--accent {
  background-color: #e6a23c;
}

.layout-settings-panel__theme-card--dark .layout-settings-panel__theme-dot--primary {
  background-color: #79bbff;
}

.layout-settings-panel__theme-card--dark .layout-settings-panel__theme-dot--secondary {
  background-color: #303133;
}

.layout-settings-panel__theme-card--dark .layout-settings-panel__theme-dot--accent {
  background-color: #909399;
}

.layout-settings-panel__theme-card--deep-blue .layout-settings-panel__theme-dot--primary {
  background-color: #1d4ed8;
}

.layout-settings-panel__theme-card--deep-blue .layout-settings-panel__theme-dot--secondary {
  background-color: #0f172a;
}

.layout-settings-panel__theme-card--deep-blue .layout-settings-panel__theme-dot--accent {
  background-color: #38bdf8;
}

@media (max-width: 992px) {
  .layout-settings-panel__option-grid,
  .layout-settings-panel__option-grid--theme,
  .layout-settings-panel__option-grid--locale {
    grid-template-columns: 1fr;
  }
}
</style>
