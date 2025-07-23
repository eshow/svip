
import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const huaweiNote = defineNoteConfig({
  dir: 'huawei',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 
  // 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/huawei',
  // 手动配置侧边栏结构
  sidebar: ['', 'foo', 'bar'],
  // 根据文件结构自动生成侧边栏
  // sidebar: 'auto',
})
/**
 * 导出所有的 note
 * 每一个 note 都应该填入到 `notes.notes` 数组中
 * （DemoNote 为参考示例，如果不需要它，请删除）
 */
export default defineNotesConfig({
  dir: 'huawei',
  link: '/',
  notes: [huaweiNote],
})
