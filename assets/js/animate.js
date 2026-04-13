/**
 * Animates a set of SVG icons to draw their outlines and fill them in a loop.
 * Targeted specifically for the <center> contained SVGs provided.
 */
function animatePaths() {
    // Select all SVGs inside the center tags
    const svgs = document.querySelectorAll('center svg');
    
    svgs.forEach((svg, index) => {
        const paths = svg.querySelectorAll('path');
        
        paths.forEach(path => {
            // Calculate the length for the dash effect
            const length = path.getTotalLength();
            
            // Determine colors: use the fill attribute for the stroke during drawing
            const finalColor = path.getAttribute('fill') || path.getAttribute('stroke') || 'white';
            const isNoneFill = path.getAttribute('fill') === 'none';

            // Initial Setup: 
            // 1. Hide the path using strokeDashoffset
            // 2. Add a temporary stroke so we can see it being "drawn"
            // 3. Set fill opacity to 0
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                stroke: finalColor === 'currentColor' ? 'white' : finalColor,
                strokeWidth: 0.5,
                fillOpacity: 0
            });



            // Animation Loop
            gsap.to(path, {
                strokeDashoffset: 0,
                fillOpacity: isNoneFill ? 0 : 1, // Only fill if it's not explicitly 'none'
                duration: 1.8,
                delay: index * 0.15, // Stagger icons for a wave effect
                ease: "power2.inOut",
                repeat: -1,         // Loop forever
                yoyo: true,         // Reverse the drawing
                repeatDelay: 1.2    // Pause while fully visible
            });
            
        });
    });
}

// Start animation when the page and GSAP are ready
window.addEventListener('load', animatePaths);