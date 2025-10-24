// 音效和视觉特效管理器
class EffectsManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.initAudio();
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('音频上下文初始化失败，游戏将以静音模式运行');
        }
    }
    
    // 创建简单的音效
    createTone(frequency, duration, type = 'sine', volume = 0.1) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    // 移动音效
    playMoveSound() {
        this.createTone(200, 0.1, 'square', 0.05);
    }
    
    // 合并音效
    playMergeSound() {
        this.createTone(400, 0.2, 'sawtooth', 0.08);
        setTimeout(() => this.createTone(600, 0.15, 'sine', 0.06), 50);
    }
    
    // 胜利音效
    playVictorySound() {
        const melody = [
            { freq: 523, duration: 0.2 }, // C
            { freq: 659, duration: 0.2 }, // E
            { freq: 784, duration: 0.2 }, // G
            { freq: 1047, duration: 0.4 } // C
        ];
        
        melody.forEach((note, index) => {
            setTimeout(() => {
                this.createTone(note.freq, note.duration, 'sine', 0.1);
            }, index * 250);
        });
    }
    
    // 彩蛋音效
    playEasterEggSound() {
        const frequencies = [300, 400, 500, 600, 700];
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.createTone(freq, 0.15, 'triangle', 0.06);
            }, index * 100);
        });
    }
    
    // 打字音效
    playTypeSound() {
        this.createTone(800 + Math.random() * 400, 0.05, 'square', 0.03);
    }
    
    // 按钮点击音效
    playClickSound() {
        this.createTone(1000, 0.1, 'sine', 0.04);
    }
    
    // 错误音效
    playErrorSound() {
        this.createTone(200, 0.3, 'sawtooth', 0.08);
    }
}

// 视觉特效管理器
class VisualEffects {
    constructor() {
        this.particles = [];
        this.shakeIntensity = 0;
    }
    
    // 创建粒子效果
    createParticles(x, y, color = '#00ff00', count = 10) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            const angle = (Math.PI * 2 * i) / count;
            const velocity = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(particle);
            
            let opacity = 1;
            let posX = x;
            let posY = y;
            
            const animate = () => {
                posX += vx;
                posY += vy;
                opacity -= 0.02;
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }
            };
            
            requestAnimationFrame(animate);
        }
    }
    
    // 创建波纹效果
    createRipple(x, y, color = '#00ff00') {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = (x - 25) + 'px';
        ripple.style.top = (y - 25) + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        ripple.style.border = `2px solid ${color}`;
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9998';
        
        document.body.appendChild(ripple);
        
        let scale = 1;
        let opacity = 1;
        
        const animate = () => {
            scale += 0.1;
            opacity -= 0.02;
            
            ripple.style.transform = `scale(${scale})`;
            ripple.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // 屏幕震动效果
    shake(intensity = 5, duration = 300) {
        this.shakeIntensity = intensity;
        const gameContainer = document.querySelector('.game-container');
        
        const shakeAnimation = () => {
            if (this.shakeIntensity <= 0) {
                gameContainer.style.transform = 'translate(0, 0)';
                return;
            }
            
            const x = (Math.random() - 0.5) * this.shakeIntensity;
            const y = (Math.random() - 0.5) * this.shakeIntensity;
            
            gameContainer.style.transform = `translate(${x}px, ${y}px)`;
            this.shakeIntensity *= 0.9;
            
            requestAnimationFrame(shakeAnimation);
        };
        
        requestAnimationFrame(shakeAnimation);
        
        setTimeout(() => {
            this.shakeIntensity = 0;
        }, duration);
    }
    
    // 闪光效果
    flash(color = '#ffffff', duration = 200) {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = color;
        flash.style.opacity = '0.5';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '10000';
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            flash.style.transition = 'opacity 0.2s ease-out';
            
            setTimeout(() => {
                if (flash.parentNode) {
                    flash.parentNode.removeChild(flash);
                }
            }, 200);
        }, duration);
    }
    
    // 数字变化动画
    animateNumberChange(element, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        element.style.transform = 'scale(1.2)';
        element.style.transition = 'transform 0.2s ease-out';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
        
        // 创建数字变化效果
        const changeIndicator = document.createElement('div');
        changeIndicator.textContent = `+${newValue - oldValue}`;
        changeIndicator.style.position = 'absolute';
        changeIndicator.style.top = '-20px';
        changeIndicator.style.left = '50%';
        changeIndicator.style.transform = 'translateX(-50%)';
        changeIndicator.style.color = '#00ff00';
        changeIndicator.style.fontSize = '14px';
        changeIndicator.style.fontWeight = 'bold';
        changeIndicator.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.appendChild(changeIndicator);
        
        let opacity = 1;
        let offset = 0;
        
        const animate = () => {
            offset -= 1;
            opacity -= 0.02;
            
            changeIndicator.style.top = (offset - 20) + 'px';
            changeIndicator.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                if (changeIndicator.parentNode) {
                    changeIndicator.parentNode.removeChild(changeIndicator);
                }
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // 打字机效果
    typewriterEffect(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
}

// 将特效集成到主游戏中
let effectsManager, visualEffects;

// 修改主游戏类以集成特效
const originalInit = ProgrammerGame.prototype.init;
ProgrammerGame.prototype.init = function() {
    effectsManager = new EffectsManager();
    visualEffects = new VisualEffects();
    
    originalInit.call(this);
    
    // 添加音效事件监听
    this.setupSoundEvents();
};

ProgrammerGame.prototype.setupSoundEvents = function() {
    // 键盘输入音效
    this.codeInput.addEventListener('keydown', (e) => {
        if (e.key.length === 1) {
            effectsManager.playTypeSound();
        }
    });
    
    // 按钮点击音效
    this.runButton.addEventListener('click', () => {
        effectsManager.playClickSound();
    });
    
    // 为拼图方块添加点击效果
    this.puzzleArea.addEventListener('click', (e) => {
        if (e.target.classList.contains('puzzle-tile')) {
            const rect = e.target.getBoundingClientRect();
            visualEffects.createRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
            effectsManager.playClickSound();
        }
    });
};

// 修改移动方法以添加音效
const originalMove = ProgrammerGame.prototype.move;
ProgrammerGame.prototype.move = function(direction) {
    const oldBoard = this.board.map(row => [...row]);
    originalMove.call(this, direction);
    
    // 检查是否有变化
    let hasChanged = false;
    let hasMerged = false;
    
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            if (this.board[i][j] !== oldBoard[i][j]) {
                hasChanged = true;
                if (this.board[i][j] > oldBoard[i][j] && oldBoard[i][j] !== 0) {
                    hasMerged = true;
                }
            }
        }
    }
    
    if (hasChanged) {
        effectsManager.playMoveSound();
        if (hasMerged) {
            effectsManager.playMergeSound();
            // 创建合并粒子效果
            const tiles = document.querySelectorAll('.puzzle-tile');
            tiles.forEach((tile, index) => {
                const row = Math.floor(index / this.size);
                const col = index % this.size;
                if (this.board[row][col] > oldBoard[row][col] && oldBoard[row][col] !== 0) {
                    const rect = tile.getBoundingClientRect();
                    visualEffects.createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
                }
            });
        }
    }
};

// 修改胜利方法以添加庆祝音效
const originalShowSuccess = ProgrammerGame.prototype.showSuccess;
ProgrammerGame.prototype.showSuccess = function() {
    if (!this.gameWon) {
        originalShowSuccess.call(this);
        effectsManager.playVictorySound();
        visualEffects.flash('#00ff00', 1000);
        visualEffects.shake(10, 500);
    }
};

// 修改彩蛋激活方法以添加音效
const originalCheckSecretCode = EasterEggs.prototype.checkSecretCode;
EasterEggs.prototype.checkSecretCode = function(code) {
    const result = originalCheckSecretCode.call(this, code);
    if (result) {
        effectsManager.playEasterEggSound();
        visualEffects.flash('#ffff00', 300);
    }
    return result;
};

// 修改代码执行方法以添加音效
if (!window.originalExecuteUserCode) {
    window.originalExecuteUserCode = ProgrammerGame.prototype.executeUserCode;
}
ProgrammerGame.prototype.executeUserCode = function() {
    try {
        window.originalExecuteUserCode.call(this);
        // 成功执行时的视觉反馈
        visualEffects.createRipple(window.innerWidth / 2, window.innerHeight / 2, '#00ff00');
    } catch (error) {
        effectsManager.playErrorSound();
        visualEffects.shake(5, 200);
        throw error;
    }
};