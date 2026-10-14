
document.addEventListener("DOMContentLoaded", function () {
    // Get the elements from HTML
    const addButtons = document.querySelectorAll(".add-btn[data-name]");
    const cartCount = document.getElementById("cart-count");
    const cartMessage = document.getElementById("cart-message");
    const clearCart = document.getElementById("clear-cart");

    // Load saved items from localStorage
    let selectedItems = [];

    try {
        const savedItems = JSON.parse(
            localStorage.getItem("flameCart") || "[]"
        );

        if (Array.isArray(savedItems)) {
            selectedItems = savedItems.filter(
                item => typeof item === "string"
            );
        }
    } catch (error) {
        selectedItems = [];
    }

    // Update the cart display
    function updateCart() {
        cartCount.textContent = selectedItems.length;

        if (selectedItems.length === 0) {
            cartMessage.textContent = "Choose your favorite meal!";
        } else {
            cartMessage.textContent =
                "Your selected meals: " + selectedItems.join(", ");
        }
    }

    // Save selected items in the browser
    function saveCart() {
        try {
            localStorage.setItem(
                "flameCart",
                JSON.stringify(selectedItems)
            );
        } catch (error) {
            console.error("Could not save the selections:", error);
        }
    }

    // Add food to the selection
    addButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const foodName = button.dataset.name;

            selectedItems.push(foodName);

            saveCart();
            updateCart();

            button.textContent = "Added ✓";

            setTimeout(function () {
                button.textContent = "Add to Order";
            }, 1000);
        });
    });

    // Clear all selected items
    if (clearCart) {
        clearCart.addEventListener("click", function () {
            selectedItems = [];

            saveCart();
            updateCart();

            addButtons.forEach(function (button) {
                button.textContent = "Add to Order";
            });
        });
    }

    // Show saved selections when the page opens
    updateCart();
});

    // Handle the contact form
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const customerName =
                document.getElementById("customer-name").value.trim();

            formStatus.textContent =
                "Thank you, " + customerName +
                "! The form works, but message delivery is not configured yet.";

            contactForm.reset();
        });
    }
