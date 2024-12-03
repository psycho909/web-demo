// Shared image cache for all CanvasSprite instances
const ImageCache = {
    cache: new Map(),
    get: function(src) {
        return this.cache.get(src);
    },
    set: function(src, img) {
        this.cache.set(src, img);
    },
    has: function(src) {
        return this.cache.has(src);
    }
};

export function CanvasSprite(target, step, speed) {
    this.imgArr = [];
    this.index = 0;
    this.target = target;
    this.el = null;
    this.step = step;
    this.width = 0;
    this.height = 0;
    this.speed = speed || step / 2;
    this.animationFrame = null;
    this.isDestroyed = false;
    this.Init();
}

CanvasSprite.prototype.Init = function () {
    this.el = this.target[0].getContext("2d");
    $(this.el.canvas).addClass("loading");
};

CanvasSprite.prototype.PreLoad = function (path, name = "") {
    var count = 0;
    var _this = this;
    return new Promise((resolve, reject) => {
        for (var i = 0; i < this.step; i++) {
            let currentIndex = i;
            let newName;

            if (name === "" || !/\d/.test(name)) {
                newName = name + currentIndex;
            } else {
                let paddedIndex = (parseInt(name.match(/\d+$/)[0], 10) + currentIndex).toString();
                paddedIndex = paddedIndex.padStart(name.match(/\d+$/)[0].length, "0");
                newName = name.replace(/\d+$/, paddedIndex);
            }

            const imgSrc = path + newName + ".png";
            
            // Check if image is already in cache
            if (ImageCache.has(imgSrc)) {
                this.imgArr[i] = ImageCache.get(imgSrc);
                count++;
                if (count === this.step) {
                    _this.width = _this.imgArr[0].width;
                    _this.height = _this.imgArr[0].height;
                    $(_this.el.canvas).removeClass("loading");
                    _this.Draw(0);
                    resolve(true);
                }
            } else {
                this.imgArr[i] = new Image();
                this.imgArr[i].src = imgSrc;
                
                this.imgArr[i].onload = function () {
                    ImageCache.set(imgSrc, _this.imgArr[i]);
                    if (currentIndex === 0) {
                        _this.width = _this.imgArr[0].width;
                        _this.height = _this.imgArr[0].height;
                    }
                    count++;
                    if (count === _this.step) {
                        $(_this.el.canvas).removeClass("loading");
                        _this.Draw(0);
                        resolve(true);
                    }
                };
                this.imgArr[i].onerror = function () {
                    count++;
                    if (count === _this.step) {
                        $(_this.el.canvas).removeClass("loading");
                        reject(new Error("Image failed to load at index: " + currentIndex));
                    }
                };
            }
        }
    });
};

CanvasSprite.prototype.Run = function (durationInSeconds = 1, callback) {
    clearInterval(this.loop);
    const _this = this;
    let startTime = performance.now();
    let stepInterval = (durationInSeconds * 1000) / this.step;

    return new Promise((resolve, reject) => {
        function runAnimation(now) {
            const elapsed = now - startTime;
            if (typeof callback === "function") {
                callback(_this.index);
            }
            if (elapsed > stepInterval * _this.index) {
                _this.Draw(_this.index);
                _this.index++;
            }

            if (_this.index < _this.step) {
                requestAnimationFrame(runAnimation);
            } else {
                _this.index = 0;
                resolve(); // 當動畫完成時解決 Promise
            }
        }
        requestAnimationFrame(runAnimation);
    });
};

CanvasSprite.prototype.Loop = function (speedMultiplier = 1) {
    if (this.isDestroyed) return;
    
    cancelAnimationFrame(this.animationFrame);
    const _this = this;
    let then = performance.now();
    let fpsInterval = (speedMultiplier * 1000) / this.step;

    function animate(now) {
        if (_this.isDestroyed) return;
        
        _this.animationFrame = requestAnimationFrame(animate);
        const elapsed = now - then;

        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            _this.Draw(_this.index);
            _this.index = (_this.index + 1) % _this.step;
        }
    }

    this.animationFrame = requestAnimationFrame(animate);
};

CanvasSprite.prototype.Stop = function () {
    this.index = 0;
    cancelAnimationFrame(this.animationFrame); // 取消動畫幀請求
    this.Draw(this.index); // 繪製第一幀（或任何應該顯示的幀）
};

CanvasSprite.prototype.Draw = function (index) {
    if (this.isDestroyed || !this.el) return;
    
    this.el.clearRect(0, 0, this.width, this.height);
    if (this.imgArr[index] && this.imgArr[index].complete) {
        this.el.drawImage(this.imgArr[index], 0, 0);
    }
};

// Add destroy method to clean up resources
CanvasSprite.prototype.destroy = function() {
    this.isDestroyed = true;
    this.Stop();
    this.imgArr = [];
    this.el = null;
    $(this.target).remove();
};