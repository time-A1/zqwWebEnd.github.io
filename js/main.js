// 广东东软学院官网复现 - 主JavaScript文件
// 学生：邹庆伟 学号：25216950217

// 模拟新闻数据（在实际项目中，这里会通过Ajax从后端获取）
const newsData = [
    {
        id: 1,
        title: '我校计算机科学与技术专业通过工程教育认证',
        date: '2026-02-25',
        category: 'notice',
        categoryName: '通知公告',
        summary: '近日，教育部高等教育教学评估中心公布了2025年度工程教育认证结果，我校计算机科学与技术专业顺利通过认证，有效期6年。',
        image: 'images/news1.jpg'
    },
    {
        id: 2,
        title: '东软学院与华为签署全面合作协议',
        date: '2026-02-20',
        category: 'campus',
        categoryName: '校园新闻',
        summary: '2月20日，广东东软学院与华为技术有限公司在深圳华为总部签署全面合作协议，双方将在人才培养、科研创新等方面展开深度合作。',
        image: 'images/news2.jpg'
    },
    {
        id: 3,
        title: '2026年春季学期教学工作会议召开',
        date: '2026-02-18',
        category: 'academic',
        categoryName: '学术动态',
        summary: '学校召开2026年春季学期教学工作会议，部署新学期重点工作，强调要持续推进教学改革，提高人才培养质量。',
        image: 'images/news3.jpg'
    },
    {
        id: 4,
        title: '我校学子在ACM程序设计大赛中荣获金奖',
        date: '2026-02-15',
        category: 'campus',
        categoryName: '校园新闻',
        summary: '在刚刚结束的ACM国际大学生程序设计竞赛中，我校计算机学院代表队表现出色，荣获金奖。',
        image: 'images/news4.jpg'
    },
    {
        id: 5,
        title: '关于2026年清明节放假安排的通知',
        date: '2026-02-10',
        category: 'notice',
        categoryName: '通知公告',
        summary: '根据国务院办公厅通知精神，现将2026年清明节放假安排通知如下：4月4日至6日放假调休，共3天。',
        image: 'images/news5.jpg'
    },
    {
        id: 6,
        title: '人工智能学术研讨会即将举行',
        date: '2026-02-08',
        category: 'academic',
        categoryName: '学术动态',
        summary: '由计算机学院主办的"人工智能前沿技术学术研讨会"将于3月15日在图书馆报告厅举行，欢迎广大师生参加。',
        image: 'images/news6.jpg'
    },
    {
        id: 7,
        title: '校园开放日暨招生咨询会公告',
        date: '2026-02-05',
        category: 'notice',
        categoryName: '通知公告',
        summary: '我校将于3月20日举办校园开放日暨招生咨询会，届时将全面展示办学成果，解答考生疑问。',
        image: 'images/news7.jpg'
    },
    {
        id: 8,
        title: '计算机学院举办就业指导讲座',
        date: '2026-02-01',
        category: 'campus',
        categoryName: '校园新闻',
        summary: '为帮助2026届毕业生更好就业，计算机学院邀请知名企业HR举办就业指导系列讲座。',
        image: 'images/news8.jpg'
    }
];

// 全局变量
let currentPage = 1;
let pageSize = 6;
let currentCategory = 'all';
let filteredNews = [...newsData];

// DOM元素加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成 - 邹庆伟 25216950217');
    
    // 初始化所有功能
    initCarousel();
    initNavigation();
    initSearch();
    initCategories();
    renderNews();
    initPagination();
});

// ==================== 轮播图功能 ====================
function initCarousel() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    // 显示指定幻灯片
    function showSlide(index) {
        // 处理边界情况
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // 隐藏所有幻灯片
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 显示当前幻灯片
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // 下一张
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // 上一张
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // 开始自动轮播
    function startAutoPlay() {
        stopAutoPlay();
        slideInterval = setInterval(nextSlide, 3000);
    }

    // 停止自动轮播
    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // 绑定事件
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    // 绑定点指示器点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // 鼠标悬停时暂停自动轮播
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // 启动自动轮播
    startAutoPlay();
}

// ==================== 导航栏高亮功能 ====================
function initNavigation() {
    const navItems = document.querySelectorAll('.main-nav li');
    const positionIndicator = document.querySelector('.position-indicator');
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有active类
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 为当前点击的项添加active类
            this.classList.add('active');
            
            // 更新当前位置显示
            const linkText = this.querySelector('a').textContent;
            if (positionIndicator) {
                positionIndicator.textContent = `当前位置：${linkText}`;
            }
            
            // 根据点击的导航项滚动到对应区域
            const targetId = this.querySelector('a').getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // 监听滚动事件，自动高亮当前区域对应的导航项
    window.addEventListener('scroll', function() {
        const sections = ['home', 'about', 'news', 'academic', 'admission', 'party', 'service'];
        let currentSection = '';
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentSection = section;
                }
            }
        });
        
        if (currentSection) {
            navItems.forEach(item => {
                const link = item.querySelector('a');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    item.classList.add('active');
                    if (positionIndicator) {
                        positionIndicator.textContent = `当前位置：${link.textContent}`;
                    }
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
}

// 滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==================== 搜索功能 ====================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}

function performSearch(keyword) {
    if (!keyword.trim()) {
        // 如果搜索词为空，显示所有新闻
        filteredNews = [...newsData];
    } else {
        // 根据关键词过滤新闻
        filteredNews = newsData.filter(item => 
            item.title.includes(keyword) || 
            item.summary.includes(keyword)
        );
    }
    
    // 重置为第一页
    currentPage = 1;
    currentCategory = 'all';
    
    // 更新分类按钮状态
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === 'all') {
            btn.classList.add('active');
        }
    });
    
    // 重新渲染新闻和分页
    renderNews();
    initPagination();
    
    // 显示搜索结果数量
    const resultCount = filteredNews.length;
    alert(`搜索"${keyword}"找到 ${resultCount} 条结果`);
}

// ==================== 分类功能 ====================
function initCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 获取分类
            currentCategory = this.dataset.category;
            
            // 过滤新闻
            if (currentCategory === 'all') {
                filteredNews = [...newsData];
            } else {
                filteredNews = newsData.filter(item => item.category === currentCategory);
            }
            
            // 重置为第一页
            currentPage = 1;
            
            // 清空搜索框
            document.getElementById('searchInput').value = '';
            
            // 重新渲染
            renderNews();
            initPagination();
        });
    });
}

// ==================== 新闻渲染功能 ====================
function renderNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    // 计算当前页要显示的数据
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = filteredNews.slice(start, end);
    
    // 如果没有数据，显示提示信息
    if (pageData.length === 0) {
        newsGrid.innerHTML = '<div class="no-news">暂无相关新闻</div>';
        return;
    }
    
    // 生成HTML
    let html = '';
    pageData.forEach(item => {
        // 如果图片加载失败，使用占位图
        const imageUrl = item.image || 'https://via.placeholder.com/350x200?text=广东东软学院';
        
        html += `
            <div class="news-card">
                <img src="${imageUrl}" alt="${item.title}" class="news-image" onerror="this.src='https://via.placeholder.com/350x200?text=新闻图片'">
                <div class="news-content">
                    <span class="news-category">${item.categoryName}</span>
                    <h3 class="news-title">${item.title}</h3>
                    <div class="news-date">📅 ${item.date}</div>
                    <p class="news-summary">${item.summary}</p>
                </div>
            </div>
        `;
    });
    
    newsGrid.innerHTML = html;
}

// ==================== 分页功能 ====================
function initPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredNews.length / pageSize);
    
    // 如果只有一页，不显示分页
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // 上一页按钮
    html += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">上一页</button>`;
    
    // 页码按钮
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }
    
    // 下一页按钮
    html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">下一页</button>`;
    
    pagination.innerHTML = html;
}

// 切换页面（全局函数，供onclick调用）
window.changePage = function(page) {
    const totalPages = Math.ceil(filteredNews.length / pageSize);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderNews();
    initPagination();
    
    // 滚动到新闻区域
    document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
}

// ==================== Ajax示例：模拟从后端获取数据 ====================
// 这个函数展示了如何使用Fetch API从后端获取数据
async function fetchNewsFromServer() {
    try {
        // 实际项目中，这里应该是一个真实的API地址
        // 由于是静态演示，我们使用本地数据
        const response = await fetch('data/news.json');
        if (!response.ok) {
            throw new Error('网络响应失败');
        }
        const data = await response.json();
        console.log('从服务器获取的数据：', data);
        return data;
    } catch (error) {
        console.log('使用本地数据作为备选');
        return newsData; // 如果获取失败，返回本地数据
    }
}