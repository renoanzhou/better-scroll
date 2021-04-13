# movable

## 介绍

movable 插件为 BetterScroll 拓展可移动拖拽的能力。

## 安装

```bash
npm install @better-scroll/movable --save

// or

yarn add @better-scroll/movable
```

## 基本使用

首先引入 movable 插件，并通过全局方法 `BScroll.use()` 注册插件

```js
  import BScroll from '@better-scroll/core'
  import Movable from '@better-scroll/movable'

  BScroll.use(Movable)
```

上面步骤完成后，需要在 `options` 中传入正确的配置：

```js
new BScroll('.bs-wrapper', {
  bindToTarget: true,
  scrollX: true,
  scrollY: true,
  freeScroll: true,
  bounce: true
  movable: true // for movable plugin
})
```

以下是移动插件专属以及[ BetterScroll 的配置](../guide/base-scroll-options.html)：

- **movable<插件专属>**

  开启 movable 功能，必须设置为 `true`，若没有该项，则插件不会生效。

- **bindToTarget**

  必须设置为 `true`，主动将 touch 事件绑定在**待移动**的元素上，因为BetterScroll 默认将 touch 事件在绑定容器元素（wrapper）上。

- **freeScroll**

  记录 x 和 y 轴的手指偏移量，设置为 `true`。同时需要设置 scrollX 和 scrollY 均为 true。

- **scrollX**

  开启 x 轴方向滚动能力，设置为 `true`。

- **scrollY**

  开启 y 轴方向滚动能力，设置为 `true`。

- **bounce**

  指定开启边界回弹。

  - **示例**

    ```js
      {
        bounce: true // 开启四个方向,
        bounce: {
          left: true, // 开启左边界回弹
          right: true, // 开启右边界回弹
          top: false,
          bottom: false
        }
      }
    ```
## 示例

  - **只有一个 content**

    通常场景下，只存在一个 content。

    <demo qrcode-url="movable/default" :render-code="true">
      <template slot="code-template">
        <<< @/examples/vue/components/movable/default.vue?template
      </template>
      <template slot="code-script">
        <<< @/examples/vue/components/movable/default.vue?script
      </template>
      <template slot="code-style">
        <<< @/examples/vue/components/movable/default.vue?style
      </template>
      <movable-default slot="demo"></movable-default>
    </demo>

  - **多个 content**

    但是在某些场景下，可能存在多个 content。

    <demo qrcode-url="movable/multi-content">
      <template slot="code-template">
        <<< @/examples/vue/components/movable/multi-content.vue?template
      </template>
      <template slot="code-script">
        <<< @/examples/vue/components/movable/multi-content.vue?script
      </template>
      <template slot="code-style">
        <<< @/examples/vue/components/movable/multi-content.vue?style
      </template>
      <movable-multi-content slot="demo"></movable-multi-content>
    </demo>

## 进阶使用

搭配[ zoom ](./zoom.html#介绍)插件，增加缩放能力。

```js
  import BScroll from '@better-scroll/core'
  import Movable from '@better-scroll/movable'
  import Zoom from '@better-scroll/zoom'
  new BScroll('.bs-wrapper', {
    bindToTarget: true,
    scrollX: true,
    scrollY: true,
    freeScroll: true,
    bounce: true
    movable: true // for movable plugin
    zoom: { // for zoom plugin
      start: 1,
      min: 1,
      max: 3
    }
  })
```

## 示例

  :::warning
  zoom 暂不支持在 pc 端的交互操作，下方 demo 请扫码体验。
  :::

  - **一个 content**

    <demo qrcode-url="movable/scale">
      <template slot="code-template">
        <<< @/examples/vue/components/movable/scale.vue?template
      </template>
      <template slot="code-script">
        <<< @/examples/vue/components/movable/scale.vue?script
      </template>
      <template slot="code-style">
        <<< @/examples/vue/components/movable/scale.vue?style
      </template>
      <movable-scale slot="demo"></movable-scale>
    </demo>

  - **多个 content**

    <demo qrcode-url="movable/multi-content-scale">
      <template slot="code-template">
        <<< @/examples/vue/components/movable/multi-content-scale.vue?template
      </template>
      <template slot="code-script">
        <<< @/examples/vue/components/movable/multi-content-scale.vue?script
      </template>
      <template slot="code-style">
        <<< @/examples/vue/components/movable/multi-content-scale.vue?style
      </template>
      <movable-multi-content-scale slot="demo"></movable-multi-content-scale>
    </demo>

## 实例方法

### putAt(x, y, [time], [easing]) <Badge text='2.0.4' />
  - **参数**
    - `{PositionX} x`： x 坐标
      - `PositionX：'number | 'left' | 'right' | 'center'`
    - `{PositionY} y`： y 坐标
      - `PositionY：'number | 'top' | 'bottom' | 'center'`
    - `{number} [time]<可选>`：滚动的动画时长
    - `{EaseItem} [easing]<可选>`：缓动效果配置，参考 [ease.ts](https://github.com/ustbhuangyi/better-scroll/blob/dev/packages/shared-utils/src/ease.ts)，默认是 `bounce` 效果

    将 content 元素放置在某一个位置。x 与 y 不仅可以是数字，也可以是对应的字符串。

  - **示例**

  ```js
  const bs = new BScroll('.bs-wrapper', {
    bindToTarget: true,
    scrollX: true,
    scrollY: true,
    freeScroll: true,
    movable: true
  })

  bs.putAt('center', 'center', 0) // 放置在 wrapper 的正中心
  bs.putAt('right', 'bottom', 1000) // 放置在 wrapper 的右下角，动画时长 1s
  ```