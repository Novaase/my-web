// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Video Modal Logic & Dynamic Content (Attached to Portfolio Grid Items)
    const gridItems = document.querySelectorAll('.grid-item');
    const modal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const storyboardGrid = document.getElementById('storyboardGrid');

    // Portfolio Data
    const portfolioData = [
        {
            title: "《宝硕流光》",
            videoSrc: "https://raw.githubusercontent.com/Novaase/my-web/master/video/baoshuo.mp4",
            desc: "一只故宫御猫被银杏叶牵引，闯入三百年前的乾隆秘境 —— 当玺印、礼器、文房、佛供等宫廷重器随它的脚步逐一巨型化，小小猫咪化身探险者，在如山般巍峨的文物间穿梭仰望。影片以萌趣治愈的视角，串联清代祭祀、文房、藏传佛教等珍贵文物，在奇幻巨型化的视觉奇观里，既保留文物的庄严与历史厚重，又用轻盈可爱的叙事打破文博题材的传播门槛，让沉睡百年的国宝在光影中 “活” 起来，带观众沉浸式感受乾隆一朝的盛世风华与匠心造物之美。",
            storyboards: [
                "./image/qianlongwenwu/1.png",
                "./image/qianlongwenwu/2.png",
                "./image/qianlongwenwu/4.png",
                "./image/qianlongwenwu/5.png"
            ]
        },
        {
            title: "《大唐生活美学》",
            videoSrc: "https://raw.githubusercontent.com/Novaase/my-web/master/video/datang.mp4",
            desc: "本片为奉贤博物馆年度特展「露华浓深 —— 大唐生活美学展」官方宣传影片，以视觉化叙事，全景呈现唐代生活美学的璀璨风华与当代转译。从服饰妆容、茶酒香食、礼乐诗书三个维度，再现唐人衣食住行、雅趣日常与丝路交融的开放气象。",
            storyboards: [
                "./image/datang/1.jpg",
                "./image/datang/2.jpg",
                "./image/datang/3.jpg",
                "./image/datang/4.jpg"
            ]
        },
        {
            title: "《锅圈有条“龙”》",
            videoSrc: "https://raw.githubusercontent.com/Novaase/my-web/master/video/guoquan.mp4",
            desc: "锅圈食汇推出「烧烤一条龙」主题广告，联动奶龙 IP 合规呈现，通过发布会场景与洗脑口播，传递 “不用买洗切配、不用凑局张罗” 的便捷优势，解锁随时随地的烧烤快乐！",
            storyboards: [
                "./image/guoquan/1.png",
                "./image/guoquan/2.png",
                "./image/guoquan/3.jpg",
                "./image/guoquan/4.png"
            ]
        },
        {
            title: "AIGC改编短剧《镜花缘》轩辕国篇",
            videoSrc: "https://raw.githubusercontent.com/Novaase/my-web/master/video/AIGC.mp4",
            desc: "改编片段旨在通过不同的人物之间的交流，展现不同文化差异和人物个性，使短剧在AIGC画面更加丰富的同时主题更加深刻和有内涵。以现代视角诠释《镜花缘》 ，保留 “现实批判” 内核，用当代叙事和视听语言传递国际关系、平等和谐等思想。创作者以人文底蕴优化内容，实现技术与艺术融合。",
            storyboards: [
                "./image/jinghuayuan/1.png",
                "./image/jinghuayuan/2.png",
                "./image/jinghuayuan/3.png",
                "./image/jinghuayuan/4.png"
            ]
        }
    ];

    gridItems.forEach(panel => {
        panel.addEventListener('click', () => {
            const id = panel.getAttribute('data-id');
            const data = portfolioData[id];
            
            if (data) {
                modalTitle.innerText = data.title;
                modalDesc.innerText = data.desc;
                modalVideo.src = data.videoSrc;
                
                // Render Storyboards
                storyboardGrid.innerHTML = '';
                data.storyboards.forEach(thumb => {
                    const item = document.createElement('div');
                    item.className = 'storyboard-item';
                    item.innerHTML = `<img src="${thumb}" alt="Storyboard">`;
                    storyboardGrid.appendChild(item);
                });

                modal.classList.add('active');
                modalVideo.play().catch(e => console.log("Autoplay prevented"));
            }
        });
    });

    // Close modal functions
    if(closeModal) {
        closeModal.addEventListener('click', () => {
            closeVideoModal();
        });
    }

    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-layout')) {
                closeVideoModal();
            }
        });
    }

    function closeVideoModal() {
        modal.classList.remove('active');
        modalVideo.pause();
        setTimeout(() => {
            modalVideo.currentTime = 0;
        }, 300);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });
});
