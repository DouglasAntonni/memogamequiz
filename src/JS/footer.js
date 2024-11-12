function createFooter() {
    const footer = document.createElement('div');
    footer.className = 'footer';
    
    const copyright = document.createElement('p');
    copyright.innerHTML = '&copy; Powered by <strong>Douglas Antonni</strong>';
    
    const socialIcons = document.createElement('div');
    socialIcons.className = 'social-icons';
    
    const socialLinks = [
        {
            href: 'https://www.instagram.com/doug.dev.js',
            class: 'instagram',
            imgSrc: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png',
            imgAlt: 'Instagram'
        },
        {
            href: 'https://wa.me/5581983039364',
            class: 'whatsapp',
            imgSrc: 'https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png',
            imgAlt: 'WhatsApp'
        }
    ];
    
    socialLinks.forEach(link => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.target = '_blank';
        anchor.className = `icon ${link.class}`;
        
        const img = document.createElement('img');
        img.src = link.imgSrc;
        img.alt = link.imgAlt;
        
        anchor.appendChild(img);
        socialIcons.appendChild(anchor);
    });
    
    footer.appendChild(copyright);
    footer.appendChild(socialIcons);
    
    document.body.appendChild(footer);
}

// Chama a função para gerar o footer assim que a página carregar
document.addEventListener('DOMContentLoaded', createFooter);