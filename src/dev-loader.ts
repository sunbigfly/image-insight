/** Tampermonkey executes the local @require natively before this entry. */
export function runDevelopmentLoader(): void {
  console.info('[图像深读 DEV] 已通过 Windows 本地文件加载；构建后刷新网页即可更新。');
}
