import { Page } from 'puppeteer'
import extendTouch from '../../util/extendTouch'
import getTranslate from '../../util/getTranslate'

jest.setTimeout(10000000)

describe('Nested horizontal scroll', () => {
  let page = (global as any).page as Page
  extendTouch(page)
  beforeAll(async () => {
    await page.goto('http://0.0.0.0:8932/#/nested-scroll/horizontal')
  })
  beforeEach(async () => {
    await page.reload({
      waitUntil: 'domcontentloaded',
    })
  })

  it('should make outer BScroll scroll when manipulating outerBScroll', async () => {
    await page.waitFor(300)

    await page.dispatchScroll({
      x: 100,
      y: 110,
      xDistance: -70,
      yDistance: 0,
      gestureSourceType: 'touch',
    })

    await page.waitFor(2500)

    const transformText = await page.$eval('.outer-content', (node) => {
      return window.getComputedStyle(node).transform
    })

    const translateX = getTranslate(transformText!, 'x')
    await expect(translateX).toBeLessThan(-30)
  })

  it('should only make innerBScroll scroll', async () => {
    await page.waitFor(300)

    await page.dispatchScroll({
      x: 270,
      y: 110,
      xDistance: -70,
      yDistance: 0,
      gestureSourceType: 'touch',
    })

    await page.waitFor(2500)

    const outerTransformText = await page.$eval('.outer-content', (node) => {
      return window.getComputedStyle(node).transform
    })
    const outerTranslateX = getTranslate(outerTransformText!, 'x')
    await expect(outerTranslateX).toBe(0)

    const innerTransformText = await page.$eval('.inner-content', (node) => {
      return window.getComputedStyle(node).transform
    })
    const innerTranslateY = getTranslate(innerTransformText!, 'x')
    await expect(innerTranslateY).toBeLessThan(-30)
  })

  it('should make outer BScroll scroll when innerScroll reached boundary', async () => {
    await page.waitFor(300)

    await page.dispatchScroll({
      x: 270,
      y: 110,
      xDistance: -600,
      yDistance: 0,
      speed: 1800,
      gestureSourceType: 'touch',
    })

    await page.waitFor(2500)

    const innerTransformText = await page.$eval('.inner-content', (node) => {
      return window.getComputedStyle(node).transform
    })
    const innerTranslateX = getTranslate(innerTransformText!, 'x')
    await expect(innerTranslateX).toBeLessThan(-50)

    await page.dispatchScroll({
      x: 270,
      y: 110,
      xDistance: -50,
      yDistance: 0,
      gestureSourceType: 'touch',
    })

    const outerTransformText = await page.$eval('.outer-content', (node) => {
      return window.getComputedStyle(node).transform
    })
    const outerTranslateX = getTranslate(outerTransformText!, 'x')
    await expect(outerTranslateX).toBeLessThan(-20)
  })

  it('should support click handle when use nestedScroll plugin', async () => {
    const mockOuterHandler = jest.fn()
    const mockInnerHandler = jest.fn()
    page.once('dialog', async (dialog) => {
      mockOuterHandler()
      await dialog.dismiss()
    })

    // outer click
    await page.touchscreen.tap(150, 110)
    expect(mockOuterHandler).toBeCalledTimes(1)

    await page.waitFor(500)

    page.once('dialog', async (dialog) => {
      mockInnerHandler()
      await dialog.dismiss()
    })

    // inner click
    await page.touchscreen.tap(300, 110)
    expect(mockInnerHandler).toBeCalledTimes(1)
  })
})
