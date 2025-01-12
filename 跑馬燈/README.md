# 跑馬燈元件使用說明

## 目錄

-   [基本使用](#基本使用)
-   [配置選項](#配置選項)
-   [方法說明](#方法說明)
-   [使用範例](#使用範例)

## 基本使用

### 1. 引入 JS 文件

```html
<script src="跑馬燈.js"></script>
```

### 2. HTML 結構

跑馬燈支援兩種使用方式：直接使用 HTML 結構或通過 JavaScript 動態添加內容。

> 注意：項目的顯示順序會根據移動方向有所不同：
>
> 向左移動（direction: 'left'）：
>
> ```
> [3] [2] [1] <-- 向左移動
> ```
>
> 向右移動（direction: 'right'）：
>
> ```
> 向右移動 --> [1] [2] [3]
> ```
>
> 向上移動（direction: 'up'）：
>
> ```
> [1]    ↑
> [2]  向上
> [3]  移動
> ```
>
> 向下移動（direction: 'down'）：
>
> ```
> [3]  向下
> [2]  移動
> [1]    ↓
> ```
>
> 所以在 HTML 結構中，項目的順序應該按照想要顯示的順序排列。
> 例如：向左移動時，如果想要 1->2->3 的順序顯示，HTML 結構應該寫成 3->2->1 的順序。

#### 方式一：直接使用 HTML 結構

```html
<!-- 基本結構 -->
<!-- 向左移動時：項目3 -> 項目2 -> 項目1 -->
<!-- 向右移動時：項目1 -> 項目2 -> 項目3 -->
<!-- 向上移動時：項目1 -> 項目2 -> 項目3（由上到下） -->
<!-- 向下移動時：項目3 -> 項目2 -> 項目1（由上到下） -->
<div id="marquee-container">
	<div class="marquee-item">項目1</div>
	<div class="marquee-item">項目2</div>
	<div class="marquee-item">項目3</div>
</div>

<!-- 包含圖片和文字的結構 -->
<div id="marquee-container">
	<div class="marquee-item">
		<img src="image1.jpg" alt="圖片1" />
		<span>說明文字1</span>
	</div>
	<div class="marquee-item">
		<img src="image2.jpg" alt="圖片2" />
		<span>說明文字2</span>
	</div>
</div>

<!-- 自定義內容結構 -->
<div id="marquee-container">
	<div class="marquee-item">
		<div class="custom-content">
			<h3>標題</h3>
			<p>描述文字</p>
		</div>
	</div>
</div>
```

#### 方式二：JavaScript 動態添加

```html
<div id="marquee-container"></div>
```

### 3. 初始化

#### HTML 結構初始化

```javascript
// 使用已有的 HTML 結構
const marquee = new Marquee("#marquee-container");
```

#### JavaScript 動態添加初始化

```javascript
// 動態添加內容
// 向左移動時：items 陣列順序會反轉顯示
// 向右移動時：items 陣列順序就是顯示順序
// 向上移動時：items 陣列由上到下顯示
// 向下移動時：items 陣列順序會反轉，由上到下顯示
const marquee = new Marquee("#marquee-container", {
	items: ["項目1", "項目2", "項目3"],
	direction: "left" // 會顯示為：項目3 -> 項目2 -> 項目1
});

// 向右移動的例子
const marqueeRight = new Marquee("#marquee-container", {
	items: ["項目1", "項目2", "項目3"],
	direction: "right" // 會顯示為：項目1 -> 項目2 -> 項目3
});
```

## 配置選項

| 選項           | 類型    | 預設值              | 說明                                                        |
| -------------- | ------- | ------------------- | ----------------------------------------------------------- |
| direction      | string  | 'left'              | 移動方向：'left'、'right'、'up'、'down'                     |
| speed          | number  | 50                  | 移動速度（像素/秒）                                         |
| interval       | number  | 3000                | 間隔時間（毫秒）                                            |
| items          | array   | []                  | 要顯示的項目陣列                                            |
| itemClass      | string  | 'marquee-item'      | 項目的 CSS class 名稱                                       |
| duplicateClass | string  | 'marquee-duplicate' | 複製項目的 CSS class 名稱                                   |
| loadingClass   | string  | 'marquee-loading'   | 載入中的 CSS class 名稱                                     |
| pauseOnHover   | boolean | true                | 滑鼠懸停時是否暫停                                          |
| mode           | string  | ''                  | 跑馬燈模式：''（預設）、'single'（單項目）、'group'（群組） |
| restartDelay   | number  | 0                   | 重新啟動延遲時間（毫秒）                                    |

## 方法說明

### 控制方法

-   `start()`: 開始跑馬燈動畫
-   `pause()`: 暫停動畫
-   `resume()`: 恢復動畫
-   `togglePause()`: 切換暫停/播放狀態

### 設置方法

-   `setSpeed(speed)`: 設置移動速度
-   `setDirection(direction)`: 設置移動方向
-   `setPauseOnHover(enabled)`: 設置滑鼠懸停行為
-   `updateItems(items)`: 更新顯示項目
-   `reInit(options)`: 重新初始化元件
-   `destroy()`: 銷毀元件實例

## 使用範例

### HTML 結構使用範例

```html
<!-- HTML 結構 -->
<!-- 向左移動時，產品會以 產品2 -> 產品1 的順序顯示 -->
<div id="marquee-container">
	<div class="marquee-item">
		<img src="product1.jpg" alt="產品1" />
		<div class="description">
			<h3>產品名稱1</h3>
			<p>產品描述1</p>
		</div>
	</div>
	<div class="marquee-item">
		<img src="product2.jpg" alt="產品2" />
		<div class="description">
			<h3>產品名稱2</h3>
			<p>產品描述2</p>
		</div>
	</div>
</div>

<script>
	// JavaScript 初始化
	const marquee = new Marquee("#marquee-container", {
		direction: "left", // 產品2 -> 產品1 的順序移動
		speed: 50,
		pauseOnHover: true
	});
</script>
```

### 動態內容範例

```javascript
// 使用 HTML 字符串
const marquee = new Marquee("#marquee-container", {
	items: ['<div class="item">純文字項目</div>', '<div class="item"><img src="image.jpg" alt="圖片">文字說明</div>'],
	direction: "left", // 會以 文字說明 -> 純文字項目 的順序顯示
	speed: 60,
	pauseOnHover: true
});
```

### 單項目模式

```javascript
// 單項目模式，一次只顯示一個項目
const marquee = new Marquee("#marquee-container", {
	items: ["項目3", "項目2", "項目1"],
	mode: "single",
	direction: "left", // 會以 項目1 -> 項目2 -> 項目3 的順序顯示
	restartDelay: 1000 // 切換項目時的延遲時間
});
```

### 群組模式

```javascript
// 群組模式，不進行無限循環
const marquee = new Marquee("#marquee-container", {
	items: ["項目3", "項目2", "項目1"],
	mode: "group",
	direction: "left" // 會以 項目1 -> 項目2 -> 項目3 的順序顯示
});

// 向上移動的群組模式
const marqueeUp = new Marquee("#marquee-container", {
	items: ["項目1", "項目2", "項目3"],
	mode: "group",
	direction: "up" // 會以 項目1 -> 項目2 -> 項目3 的順序從上到下顯示
});
```

### 動態控制

```javascript
// 動態控制範例
const marquee = new Marquee("#marquee-container", {
	items: ["項目2", "項目1"],
	direction: "left" // 會以 項目1 -> 項目2 的順序顯示
});

// 暫停動畫
marquee.pause();

// 更改速度
marquee.setSpeed(100);

// 更改方向為向右
marquee.setDirection("right"); // 會以 項目2 -> 項目1 的順序顯示

// 更新項目
marquee.updateItems(["新項目2", "新項目1"]); // 向左移動時會以 新項目1 -> 新項目2 的順序顯示

// 恢復動畫
marquee.resume();
```
