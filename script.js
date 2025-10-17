document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const urlInput = document.getElementById('url-input');
    const shortenBtn = document.getElementById('shorten-btn');
    const customSlugContainer = document.getElementById('custom-slug-container');
    const customSlug = document.getElementById('custom-slug');
    const resultDiv = document.getElementById('result');
    const shortUrlInput = document.getElementById('short-url');
    const copyBtn = document.getElementById('copy-btn');
    const newLinkBtn = document.getElementById('new-link-btn');
    const visitLink = document.getElementById('visit-link');
    const errorDiv = document.getElementById('error');
    const errorMessage = document.getElementById('error-message');
    
    // نمایش/پنهان کردن قسمت نام دلخواه
    urlInput.addEventListener('focus', function() {
        customSlugContainer.classList.remove('hidden');
    });
    
    // تابع کوتاه کردن لینک
    shortenBtn.addEventListener('click', function() {
        const originalUrl = urlInput.value.trim();
        
        // اعتبارسنجی لینک
        if (!isValidUrl(originalUrl)) {
            showError('لطفاً یک آدرس اینترنتی معتبر وارد کنید');
            return;
        }
        
        // تولید لینک کوتاه
        const shortUrl = generateShortUrl(originalUrl, customSlug.value.trim());
        
        // نمایش نتیجه
        showResult(shortUrl);
    });
    
    // کپی کردن لینک کوتاه
    copyBtn.addEventListener('click', function() {
        shortUrlInput.select();
        document.execCommand('copy');
        
        // تغییر متن دکمه به صورت موقت
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'کپی شد!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
    
    // ایجاد لینک جدید
    newLinkBtn.addEventListener('click', function() {
        resetForm();
    });
    
    // تابع اعتبارسنجی URL
    function isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }
    
    // تابع تولید لینک کوتاه
    function generateShortUrl(originalUrl, customSlugValue) {
        // در یک پیاده‌سازی واقعی، اینجا باید با سرور ارتباط برقرار شود
        // اما در این نمونه، ما یک لینک کوتاه شبیه‌سازی شده تولید می‌کنیم
        
        const baseUrl = window.location.origin; // آدرس دامنه فعلی
        
        if (customSlugValue) {
            // اگر نام دلخواه وارد شده باشد
            return `${baseUrl}/${customSlugValue}`;
        } else {
            // تولید یک رشته تصادفی ۶ کاراکتری
            const randomString = Math.random().toString(36).substring(2, 8);
            return `${baseUrl}/${randomString}`;
        }
    }
    
    // نمایش نتیجه
    function showResult(shortUrl) {
        shortUrlInput.value = shortUrl;
        resultDiv.classList.remove('hidden');
        visitLink.href = shortUrl;
        visitLink.classList.remove('hidden');
        errorDiv.classList.add('hidden');
        
        // اسکرول به قسمت نتیجه
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    // نمایش خطا
    function showError(message) {
        errorMessage.textContent = message;
        errorDiv.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        
        // اسکرول به قسمت خطا
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    // بازنشانی فرم
    function resetForm() {
        urlInput.value = '';
        customSlug.value = '';
        resultDiv.classList.add('hidden');
        errorDiv.classList.add('hidden');
        customSlugContainer.classList.add('hidden');
        urlInput.focus();
    }
});
