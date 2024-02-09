document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("game-container");
    const basket = document.getElementById("basket");
    const scoreDisplay = document.getElementById("score");
    let score = 0;

    // Move basket with mouse
    document.addEventListener("mousemove", function(event) {
        const mouseX = event.clientX;
        const gameContainerRect = gameContainer.getBoundingClientRect();
        const minX = gameContainerRect.left;
        const maxX = gameContainerRect.right - basket.offsetWidth;
        const newX = Math.min(Math.max(mouseX - minX - basket.offsetWidth / 2, minX), maxX);
        basket.style.left = newX + "px";
    });

    // Function to create a new chocolate
    function createChocolate() {
        const chocolate = document.createElement("div");
        chocolate.classList.add("chocolate");
        gameContainer.appendChild(chocolate);

        const gameContainerRect = gameContainer.getBoundingClientRect();
        const minX = gameContainerRect.left;
        const maxX = gameContainerRect.right - chocolate.offsetWidth;
        const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        chocolate.style.left = randomX + "px";
        let fallSpeed = 1;

        // Function to handle chocolate falling
        function fall() {
            const chocolateRect = chocolate.getBoundingClientRect();
            const basketRect = basket.getBoundingClientRect();
            if (chocolateRect.bottom >= basketRect.top && chocolateRect.left >= basketRect.left && chocolateRect.right <= basketRect.right) {
                score++;
                scoreDisplay.textContent = "Score: " + score;
                chocolate.remove();
                createHearts();
            } else if (chocolateRect.bottom >= gameContainerRect.bottom) {
                chocolate.remove();
            } else {
                chocolate.style.top = chocolate.offsetTop + fallSpeed + "px";
                fallSpeed += 0.05;
                requestAnimationFrame(fall);
            }
        }

        fall();
    }

    // Function to create hearts
    function createHearts() {
        const numHearts = 10; // Adjust the number of hearts as needed
        for (let i = 0; i < numHearts; i++) {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            const size = Math.random() * 20 + 10; // Random size between 10px and 30px
            heart.style.width = size + "px";
            heart.style.height = size + "px";
            const xPos = Math.random() * gameContainer.offsetWidth;
            const yPos = Math.random() * gameContainer.offsetHeight;
            heart.style.left = xPos + "px";
            heart.style.top = yPos + "px";
            gameContainer.appendChild(heart);
        }
    }

    // Start dropping chocolates at regular intervals
    setInterval(createChocolate, 1000);
});
