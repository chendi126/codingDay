// 反编程治愈游戏 - 让程序员从代码中解脱出来
class AntiProgrammingGame {
    constructor() {
        this.mood = 'neutral';
        this.rebelMode = false;
        this.autoPlay = false;
        this.happinessLevel = 50;
        this.lastInteraction = Date.now();
        this.boredomTimer = null;
        this.surpriseTimer = null;
        
        this.jokes = [
            "为什么程序员总是分不清万圣节和圣诞节？因为 Oct 31 == Dec 25",
            "一个程序员走进酒吧，点了1杯啤酒，又点了0杯啤酒，最后点了999999杯啤酒，酒吧炸了",
            "程序员最讨厌的三件事：1. 命名 2. 注释 3. 其他人写的代码",
            "为什么程序员喜欢黑暗？因为光明会产生bug",
            "一个程序员对另一个程序员说：'我们有个问题'。另一个说：'什么问题？' 第一个说：'我不知道，但肯定是你的错'",
            "程序员的恋爱循环：while(true) { 喜欢(); 表白(); if(被拒绝) break; }",
            "为什么程序员总是搞混圣诞节和万圣节？因为 25 DEC = 31 OCT",
            "程序员最害怕听到的一句话：'只是个小改动'",
            "程序员的冰箱贴：'我饿了' '吃点内存吧'",
            "为什么程序员不喜欢大自然？因为里面bug太多了"
        ];
        
        this.affirmations = [
            "你已经很棒了！不需要完美的代码来证明自己的价值",
            "休息一下不是懒惰，是为了走更长远的路",
            "每个bug都是学习的机会，不是失败的标志",
            "你的价值不取决于你写了多少代码",
            "有时候，最好的解决方案就是好好睡一觉",
            "你比你想象的更有能力，也更值得被爱",
            "编程是艺术，不是工厂的流水线",
            "你的创造力和想象力是最珍贵的财富"
        ];
        
        this.healingMessages = [
            "深呼吸... 让代码暂时离开你的大脑",
            "你值得休息，值得快乐，值得被爱",
            "生活不只有0和1，还有彩虹和音乐",
            "有时候，最好的调试就是关掉电脑，去拥抱生活",
            "你的存在本身就是有价值的，不需要任何证明"
        ];
        
        this.init();
    }
    
    init() {
        this.startFloatingHearts();
        this.startMoodDetection();
        this.startRandomSurprises();
        this.startBoredomMonitoring();
        this.detectFaceExpression();
        this.listenForVoice();
        this.showWelcomeMessage();
    }
    
    startFloatingHearts() {
        const heartsContainer = document.getElementById('floatingHearts');
        const hearts = ['💖', '💕', '💗', '💝', '💘', '💞', '💟', '🧡', '💛', '💚', '💙', '💜'];
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
            heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 15000);
        }, 1000);
    }
    
    startMoodDetection() {
        // 模拟情绪检测
        setInterval(() => {
            const moods = ['stressed', 'tired', 'neutral', 'happy'];
            const weights = [0.3, 0.3, 0.2, 0.2]; // 程序员更容易感到压力和疲惫
            
            const random = Math.random();
            let cumulative = 0;
            let selectedMood = 'neutral';
            
            for (let i = 0; i < moods.length; i++) {
                cumulative += weights[i];
                if (random < cumulative) {
                    selectedMood = moods[i];
                    break;
                }
            }
            
            this.updateMood(selectedMood);
        }, 5000);
    }
    
    updateMood(newMood) {
        if (this.mood !== newMood) {
            this.mood = newMood;
            this.displayMood();
            this.adaptGameToMood();
        }
    }
    
    displayMood() {
        const moodStatus = document.getElementById('moodStatus');
        const messages = {
            'stressed': {
                text: '😰 检测到高强度编程模式 - 需要紧急治愈！',
                class: 'mood-stressed'
            },
            'tired': {
                text: '😴 检测到疲惫状态 - 建议立即休息！',
                class: 'mood-tired'
            },
            'neutral': {
                text: '😐 检测到平静状态 - 让我们一起放松一下吧',
                class: 'mood-neutral'
            },
            'happy': {
                text: '😊 检测到快乐状态 - 让快乐加倍！',
                class: 'mood-happy'
            }
        };
        
        const message = messages[this.mood];
        moodStatus.className = 'mood-status ' + message.class;
        moodStatus.textContent = message.text;
    }
    
    adaptGameToMood() {
        switch(this.mood) {
            case 'stressed':
                this.showHealingMessage();
                this.startBreathing();
                this.playHealingMusic();
                break;
            case 'tired':
                this.showAffirmation();
                this.suggestBreak();
                break;
            case 'happy':
                this.celebrateHappiness();
                break;
        }
    }
    
    detectFaceExpression() {
        // 模拟面部表情检测
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // 这里可以集成真实的面部识别API
            console.log('面部识别功能已准备就绪');
            
            // 模拟微笑检测
            setInterval(() => {
                if (Math.random() < 0.1) { // 10%概率检测到微笑
                    this.updateMood('happy');
                    this.showSurprise('微笑检测', '检测到你的微笑！快乐值+20！');
                    this.happinessLevel += 20;
                }
            }, 3000);
        }
    }
    
    listenForVoice() {
        // 模拟语音情绪识别
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            console.log('语音识别功能已准备就绪');
            
            // 模拟检测到笑声或叹息
            setInterval(() => {
                const random = Math.random();
                if (random < 0.05) { // 5%概率检测到笑声
                    this.updateMood('happy');
                    this.showSurprise('笑声检测', '听到你的笑声！快乐值+30！');
                    this.happinessLevel += 30;
                } else if (random < 0.15) { // 10%概率检测到叹息
                    this.updateMood('stressed');
                    this.showHealingMessage();
                }
            }, 4000);
        }
    }
    
    startBoredomMonitoring() {
        // 监测用户是否无聊（长时间无交互）
        this.boredomTimer = setInterval(() => {
            const now = Date.now();
            const timeSinceLastInteraction = now - this.lastInteraction;
            
            if (timeSinceLastInteraction > 30000) { // 30秒无交互
                this.showRandomSurprise();
                this.lastInteraction = now; // 重置计时器
            }
        }, 5000);
    }
    
    startRandomSurprises() {
        // 随机惊喜
        this.surpriseTimer = setInterval(() => {
            if (Math.random() < 0.3) { // 30%概率
                this.showRandomSurprise();
            }
        }, 20000);
    }
    
    showRandomSurprise() {
        const surprises = [
            { title: '🌟 随机彩虹', content: '生活就像彩虹，需要阳光和雨露' },
            { title: '🦋 蝴蝶效应', content: '你的每一个小小改变，都可能带来巨大影响' },
            { title: '🌸 樱花飘落', content: '美丽的事物值得等待，就像春天的樱花' },
            { title: '🎈 气球升空', content: '释放压力，让心情像气球一样轻盈' },
            { title: '🌙 月亮祝福', content: '月亮代表我的心，祝你今晚好梦' },
            { title: '⭐ 星星闪烁', content: '你就像星星一样，在自己的轨道上发光' },
            { title: '🌊 海浪轻拍', content: '让心情像海浪一样，有节奏地起伏' },
            { title: '🌺 花开富贵', content: '每一朵花都有自己的花期，别急' }
        ];
        
        const surprise = surprises[Math.floor(Math.random() * surprises.length)];
        this.showSurprise(surprise.title, surprise.content);
        this.happinessLevel += 10;
    }
    
    showWelcomeMessage() {
        setTimeout(() => {
            this.showSurprise('🎉 欢迎来到反编程治愈中心', 
                '这里不需要写代码，只需要做你自己。让我们一起治愈疲惫的心灵吧！');
        }, 2000);
    }
    
    showSurprise(title, content) {
        const overlay = document.getElementById('overlay');
        const popup = document.getElementById('surprisePopup');
        const titleEl = document.getElementById('surpriseTitle');
        const contentEl = document.getElementById('surpriseContent');
        
        titleEl.textContent = title;
        contentEl.textContent = content;
        
        overlay.classList.add('show');
        popup.classList.add('show');
        
        // 3秒后自动关闭
        setTimeout(() => {
            this.closeSurprise();
        }, 3000);
    }
    
    closeSurprise() {
        const overlay = document.getElementById('overlay');
        const popup = document.getElementById('surprisePopup');
        
        overlay.classList.remove('show');
        popup.classList.remove('show');
    }
    
    showHealingMessage() {
        const messageArea = document.getElementById('messageArea');
        const message = this.healingMessages[Math.floor(Math.random() * this.healingMessages.length)];
        
        messageArea.innerHTML = `<div class="joke-text">💝 ${message}</div>`;
        
        setTimeout(() => {
            messageArea.innerHTML = '';
        }, 5000);
    }
    
    showAffirmation() {
        const messageArea = document.getElementById('messageArea');
        const affirmation = this.affirmations[Math.floor(Math.random() * this.affirmations.length)];
        
        messageArea.innerHTML = `<div class="joke-text">✨ ${affirmation}</div>`;
        
        setTimeout(() => {
            messageArea.innerHTML = '';
        }, 5000);
    }
    
    suggestBreak() {
        this.showSurprise('☕ 休息提醒', '你已经很努力了，要不要起来走走，喝杯茶？');
    }
    
    celebrateHappiness() {
        this.showSurprise('🎊 快乐加倍！', '你的快乐感染了整个程序世界！继续保持这份美好！');
        
        // 创建更多心形
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createHeart();
            }, i * 200);
        }
    }
    
    createHeart() {
        const heartsContainer = document.getElementById('floatingHearts');
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = '3s';
        heart.style.fontSize = '3rem';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 3000);
    }
}

// 游戏控制函数
let game;

window.onload = function() {
    game = new AntiProgrammingGame();
};

function startBreathing() {
    if (game) {
        game.lastInteraction = Date.now();
        game.updateMood('neutral');
    }
    
    const circle = document.getElementById('breathingCircle');
    circle.style.display = 'block';
    
    // 语音引导
    speakText('让我们一起深呼吸。吸气... 呼气... 感受内心的平静');
    
    setTimeout(() => {
        circle.style.display = 'none';
        if (game) {
            game.showSurprise('🧘‍♀️ 呼吸完成', '感觉好多了吗？记住，代码之外还有整个世界');
        }
    }, 30000);
}

function playHealingMusic() {
    if (game) {
        game.lastInteraction = Date.now();
    }
    
    // 创建治愈音乐（使用Web Audio API）
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // 播放治愈音符
    const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C大调音阶
    
    notes.forEach((frequency, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        }, index * 500);
    });
    
    if (game) {
        game.showSurprise('🎵 治愈音乐', '让美妙的音符洗涤你的心灵');
    }
}

function tellJoke() {
    if (game) {
        game.lastInteraction = Date.now();
        const joke = game.jokes[Math.floor(Math.random() * game.jokes.length)];
        
        const jokeContainer = document.getElementById('jokeContainer');
        jokeContainer.innerHTML = `<div class="joke-text">😄 ${joke}</div>`;
        
        speakText(joke);
        
        setTimeout(() => {
            jokeContainer.innerHTML = '';
        }, 8000);
        
        game.updateMood('happy');
        game.happinessLevel += 15;
    }
}

function summonCatMeme() {
    if (game) {
        game.lastInteraction = Date.now();
    }
    
    const catMeme = document.getElementById('catMeme');
    catMeme.classList.add('show');
    
    speakText('喵～ 我是治愈小猫咪，点击我可以获得额外快乐！');
    
    setTimeout(() => {
        catMeme.classList.remove('show');
    }, 10000);
}

function petCat() {
    if (game) {
        game.lastInteraction = Date.now();
        game.happinessLevel += 25;
        game.updateMood('happy');
        
        const messages = [
            '喵～ 好舒服！',
            '呼噜呼噜～',
            '喵呜～ 你真温柔！',
            '喵～ 快乐值+25！'
        ];
        
        const message = messages[Math.floor(Math.random() * messages.length)];
        speakText(message);
        
        game.showSurprise('🐱 猫咪很开心', message);
        
        // 猫咪被抚摸后的特效
        const catMeme = document.getElementById('catMeme');
        catMeme.style.transform = 'scale(1.2) rotate(10deg)';
        setTimeout(() => {
            catMeme.style.transform = '';
        }, 500);
    }
}

function rebelMode() {
    if (game) {
        game.lastInteraction = Date.now();
        game.rebelMode = !game.rebelMode;
        
        if (game.rebelMode) {
            document.body.classList.add('rebel-mode');
            game.showSurprise('🔄 反叛模式激活', '游戏现在要自己玩了！让代码见鬼去吧！');
            startAutoPlay();
        } else {
            document.body.classList.remove('rebel-mode');
            game.showSurprise('✋ 反叛模式关闭', '好吧，你赢了，但记住：生活不只有代码');
            stopAutoPlay();
        }
    }
}

function startAutoPlay() {
    if (game) {
        game.autoPlay = true;
        
        // 游戏自己开始"编程"
        const actions = [
            '游戏正在写代码... 但它决定写点有趣的',
            '游戏在调试... 发现bug太无聊了，决定跳舞',
            '游戏在编译... 编译器说：去享受生活吧！',
            '游戏在部署... 部署到快乐星球！',
            '游戏在重构... 重构成了派对模式！'
        ];
        
        let actionIndex = 0;
        const autoInterval = setInterval(() => {
            if (!game.autoPlay) {
                clearInterval(autoInterval);
                return;
            }
            
            const action = actions[actionIndex % actions.length];
            game.showSurprise('🎮 游戏自动中', action);
            actionIndex++;
        }, 5000);
    }
}

function stopAutoPlay() {
    if (game) {
        game.autoPlay = false;
    }
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);
    }
}

function closeSurprise() {
    if (game) {
        game.closeSurprise();
    }
}