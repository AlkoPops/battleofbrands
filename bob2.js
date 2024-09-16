// Define the target position
const targetPosition = new THREE.Vector3(0, 1.8, 0);

window.onload = function() {
  // Initial camera animation
  gsap.from(camera.position, {
    x: 10,
    y: 20,
    z: 5,
    ease: 'power2.inOut', // Use a valid easing function
    duration: 4,
    delay: 0.5,
    onUpdate: () => {
      camera.lookAt(targetPosition);
    }
  });
};



var firstslide = gsap.timeline({
  onUpdate: () => {
    camera.lookAt(targetPosition); // Update camera lookAt on every frame
  }
});

firstslide.to(camera.position, {
    x: 0,
    y: 2,
    z: 3,
    duration: 0.5, // Adjust the duration to make it faster
  })
  .to(camera.position, {
    x: 0,
    y: 15,
    z: 3,
    duration: 2, // Keep the second animation slower if desired
  }, "<1");

ScrollTrigger.create({
  trigger: ".cardsection",
  animation: firstslide,
  markers: true,
  start: "top top",
  end: "+=6500",
  pin: true,
  scrub: 1,
});

