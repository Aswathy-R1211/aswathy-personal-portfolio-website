document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Sticky Navbar Shadow
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate Name
            const nameInput = document.getElementById('name');
            const nameGroup = document.getElementById('nameGroup');
            if (nameInput.value.trim() === '') {
                nameGroup.classList.add('error');
                isValid = false;
            } else {
                nameGroup.classList.remove('error');
            }

            // Validate Email
            const emailInput = document.getElementById('email');
            const emailGroup = document.getElementById('emailGroup');
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailGroup.classList.add('error');
                isValid = false;
            } else {
                emailGroup.classList.remove('error');
            }

            // Validate Phone
            const phoneInput = document.getElementById('phone');
            const phoneGroup = document.getElementById('phoneGroup');
            if (phoneInput.value.trim() === '') {
                phoneGroup.classList.add('error');
                isValid = false;
            } else {
                phoneGroup.classList.remove('error');
            }

            // Validate Subject
            const subjectInput = document.getElementById('subject');
            const subjectGroup = document.getElementById('subjectGroup');
            if (subjectInput.value.trim() === '') {
                subjectGroup.classList.add('error');
                isValid = false;
            } else {
                subjectGroup.classList.remove('error');
            }

            // Validate Message (min 20 chars for robustness)
            const messageInput = document.getElementById('message');
            const messageGroup = document.getElementById('messageGroup');
            if (messageInput.value.trim().length < 20) {
                messageGroup.classList.add('error');
                isValid = false;
            } else {
                messageGroup.classList.remove('error');
            }

            // Submit to Formspree
            if (isValid) {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" style="margin-left: 0.5rem;"></i>';
                submitButton.disabled = true;

                const formData = new FormData(contactForm);
                fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        document.getElementById('formSuccess').style.display = 'block';
                        contactForm.reset();
                        setTimeout(() => {
                            document.getElementById('formSuccess').style.display = 'none';
                        }, 5000);
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                alert(data["errors"].map(error => error["message"]).join(", "));
                            } else {
                                alert("Oops! There was a problem submitting your form");
                            }
                        });
                    }
                })
                .catch(error => {
                    alert("Oops! There was a problem submitting your form");
                })
                .finally(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
            }
        });
        
        // Clear error on input
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.closest('.form-group').classList.remove('error');
            });
        });
    }
});
