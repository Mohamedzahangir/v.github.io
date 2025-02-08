document.addEventListener('DOMContentLoaded', () => {
    const bigHeart = document.querySelector('.big-heart');
    let isHovered = false;
    let rotationAngle = 0;
    
    // Smooth rotation animation
    function animateRotation() {
        if (!isHovered) {
            rotationAngle = (rotationAngle + 0.5) % 360;
            bigHeart.style.transform = `translate(-50%, -50%) rotateY(${rotationAngle}deg)`;
        }
        requestAnimationFrame(animateRotation);
    }
    
    // Mouse interaction
    bigHeart.addEventListener('mouseenter', () => {
        isHovered = true;
        bigHeart.style.transition = 'transform 0.3s ease';
    });
    
    bigHeart.addEventListener('mouseleave', () => {
        isHovered = false;
        bigHeart.style.transition = 'transform 0.3s ease';
    });
    
    // Mouse move effect for dynamic lighting
    bigHeart.addEventListener('mousemove', (e) => {
        if (isHovered) {
            const rect = bigHeart.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            bigHeart.style.transform = `
                translate(-50%, -50%)
                rotateY(${x * 20}deg)
                rotateX(${-y * 20}deg)
                scale(1.1)
            `;
        }
    });
    
    // Start animation
    animateRotation();

    // Add click effect
    bigHeart.addEventListener('click', () => {
        const heartPath = bigHeart.querySelector('.heart-path');
        const heartShadow = bigHeart.querySelector('.heart-shadow');
        
        // Add pulse animation
        heartPath.style.transform = 'scale(1.3) translateY(-6px)';
        heartShadow.style.transform = 'translate(4px, 8px) scale(1.3)';
        
        // Create burst effect
        for (let i = 0; i < 8; i++) {
            const miniHeart = document.createElement('div');
            miniHeart.classList.add('mini-heart');
            miniHeart.style.setProperty('--angle', `${i * 45}deg`);
            
            miniHeart.innerHTML = `
                <svg viewBox="0 0 100 100">
                    <path fill="url(#heartGradient)" d="M50 90
                        C50 90, 15 65, 15 40
                        A20 20 0 0 1 50 25
                        A20 20 0 0 1 85 40
                        C85 65, 50 90, 50 90Z" />
                </svg>
            `;
            
            document.querySelector('.hero').appendChild(miniHeart);
            
            setTimeout(() => {
                miniHeart.remove();
            }, 1000);
        }
        
        // Reset heart after animation
        setTimeout(() => {
            heartPath.style.transform = 'scale(1) translateY(0)';
            heartShadow.style.transform = 'translate(2px, 4px)';
        }, 300);
    });

    // Background Hearts Animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        
        // Random starting position
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Random size variation
        const size = Math.random() * 20 + 15; // 15-35px
        heart.style.fontSize = size + 'px';
        
        // Add to document
        document.querySelector('.floating-hearts').appendChild(heart);

        // Remove after animation completes
        setTimeout(() => {
            heart.remove();
        }, 4500); // Slightly longer than animation duration
    }

    // Adjust creation interval
    setInterval(createHeart, 400); // Slightly longer interval

    // Music Player
    const audioElement = new Audio();
    audioElement.src = 'path/to/your/romantic-song.mp3'; // Add your music file
    audioElement.loop = true;

    const musicButton = document.getElementById('toggleMusic');
    let isPlaying = false;

    musicButton.addEventListener('click', () => {
        if (isPlaying) {
            audioElement.pause();
            musicButton.classList.remove('playing');
        } else {
            audioElement.play();
            musicButton.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // Carousel Navigation
    const carousel = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.memory-item');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, items.length - 1);
        updateCarousel();
    });

    // Love Notes
    const loveNotes = [
        "I love the way you smile",
        "You make every day special",
        "You're my favorite person",
        // Add more love notes here
    ];

    const notesContainer = document.querySelector('.notes-container');

    loveNotes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = '💌';
        noteElement.addEventListener('click', () => {
            noteElement.innerHTML = note;
            noteElement.style.fontSize = '1rem';
        });
        notesContainer.appendChild(noteElement);
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});